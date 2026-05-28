#!/usr/bin/env python3
"""
LinkedIn Profile Scraper
Extracts profile data using Playwright with authenticated cookies and stealth mode.

Usage:
    python linkedin_scraper.py <profile_url> [--cookies <path>] [--output <path>]

Output:
    JSON with name, headline, location, about, experience, education, skills
"""

import json
import sys
import os
import re
import argparse
import time
import random
from pathlib import Path
from playwright.sync_api import sync_playwright

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
]

VIEWPORTS = [
    {"width": 1366, "height": 768},
    {"width": 1440, "height": 900},
    {"width": 1280, "height": 720},
    {"width": 1920, "height": 1080},
]


def load_cookies(path: str) -> list[dict]:
    with open(path, "r") as f:
        cookies = json.load(f)
    if not cookies:
        raise ValueError("Cookie file is empty")
    names = {c.get("name") for c in cookies}
    if "li_at" not in names:
        raise ValueError("Missing 'li_at' cookie — authentication token required")
    return cookies


def normalize_cookie(c: dict) -> dict:
    result = {
        "name": c["name"],
        "value": c["value"],
        "domain": c.get("domain", ".linkedin.com"),
        "path": c.get("path", "/"),
    }
    if "httpOnly" in c:
        result["httpOnly"] = c["httpOnly"]
    if "secure" in c:
        result["secure"] = c["secure"]
    if "expires" in c:
        result["expires"] = c["expires"]
    if "sameSite" in c:
        result["sameSite"] = c["sameSite"]
    return result


def stealth_init_script() -> str:
    return """
        Object.defineProperty(navigator, 'webdriver', {get: () => false});

        window.chrome = {
            runtime: {},
            loadTimes: function() {},
            csi: function() {},
            app: {}
        };

        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en', 'es']
        });

        Object.defineProperty(navigator, 'plugins', {
            get: () => [
                {name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer'},
                {name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai'},
                {name: 'Native Client', filename: 'internal-nacl-plugin'}
            ]
        });

        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) =>
            parameters.name === 'notifications'
                ? Promise.resolve({state: Notification.permission})
                : originalQuery(parameters);

        (() => {
            const elementDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerText');
            const originalGetter = elementDescriptor.get;
            elementDescriptor.get = function() {
                return originalGetter.call(this);
            };
            Object.defineProperty(HTMLElement.prototype, 'innerText', elementDescriptor);
        })();

        delete window.__playwright;
        delete window.__pw_manual;
        delete window.__PW_inspect;

        const getParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(parameter) {
            if (parameter === 37445) return 'Google Inc. (NVIDIA)';
            if (parameter === 37446) return 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1080 Direct3D11 vs_5_0 ps_5_0)';
            return getParameter.call(this, parameter);
        };
    """


def human_delay(min_ms: float = 1000, max_ms: float = 3000):
    time.sleep(random.uniform(min_ms, max_ms) / 1000)


def scroll_page(page):
    viewport = page.viewport_size
    height = viewport["height"] if viewport else 720
    scroll_steps = random.randint(5, 10)
    for _ in range(scroll_steps):
        page.evaluate(f"window.scrollBy(0, {height * random.uniform(0.3, 0.7)})")
        human_delay(300, 800)

    for btn_text in ["Show all", "Show more", "Show less"]:
        try:
            buttons = page.query_selector_all(f"button:has-text('{btn_text}')")
            for btn in buttons[:3]:
                try:
                    btn.click()
                    human_delay(500, 1000)
                except Exception:
                    pass
        except Exception:
            pass

    page.evaluate("window.scrollTo(0, 0)")
    human_delay(200, 500)


def parse_raw_text(raw_text: str) -> dict:
    result = {
        "name": None,
        "headline": None,
        "location": None,
        "about": None,
        "experience": [],
        "education": [],
        "skills": [],
    }

    if not raw_text:
        return result

    lines = raw_text.split("\n")
    lines = [l.strip() for l in lines if l.strip()]

    if lines:
        result["name"] = lines[0]

    section_indices = {}
    for i, line in enumerate(lines):
        lower = line.lower().strip()
        if lower == "about":
            section_indices["about"] = i
        elif lower == "experience":
            section_indices["experience"] = i
        elif lower == "education":
            section_indices["education"] = i
        elif lower == "skills" or lower == "top skills":
            section_indices["skills"] = i
        elif lower.startswith("activity") or lower.startswith("featured"):
            if "activity" not in section_indices:
                section_indices["activity"] = i
        elif "more profiles for you" in lower or "explore premium" in lower:
            if "end" not in section_indices:
                section_indices["end"] = i

    if len(lines) > 1:
        headline_candidates = []
        for i in range(1, min(5, len(lines))):
            line = lines[i]
            if any(kw in line.lower() for kw in ["followers", "connections", "contact info", "palo alto", "california", "united states"]):
                break
            if line and line != result["name"]:
                headline_candidates.append(line)
        if headline_candidates:
            result["headline"] = " ".join(headline_candidates)

    for line in lines[:10]:
        if re.search(r"[A-Z][a-z]+, [A-Z]{2,}|[A-Z][a-z]+, [A-Z][a-z]+, [A-Z]{2}", line):
            result["location"] = line
            break
    if not result["location"]:
        for line in lines[1:10]:
            if line in ("Colombia", "United States", "Brazil", "Mexico", "Argentina", "Spain", "France", "Germany", "United Kingdom", "Canada", "India", "Japan", "Australia"):
                result["location"] = line
                break

    if "about" in section_indices:
        about_start = section_indices["about"] + 1
        about_end_candidates = [
            section_indices.get("experience"),
            section_indices.get("education"),
            section_indices.get("skills"),
            section_indices.get("activity"),
            section_indices.get("featured"),
            section_indices.get("end"),
        ]
        about_end = min((e for e in about_end_candidates if e is not None), default=len(lines))
        about_lines = lines[about_start:about_end]
        about_lines = [l for l in about_lines if not l.startswith("\u2026 more") and l.lower() not in ("show more", "show less")]
        about_text = "\n".join(about_lines).strip()
        if about_text:
            result["about"] = about_text

    if "experience" in section_indices:
        exp_start = section_indices["experience"] + 1
        exp_end = section_indices.get("education", section_indices.get("skills", section_indices.get("activity", len(lines))))
        exp_lines = lines[exp_start:exp_end]
        result["experience"] = _parse_experience_block(exp_lines)

    if "education" in section_indices:
        edu_start = section_indices["education"] + 1
        edu_end = section_indices.get("skills", section_indices.get("activity", len(lines)))
        edu_lines = lines[edu_start:edu_end]
        result["education"] = _parse_education_block(edu_lines)

    if "skills" in section_indices:
        skills_start = section_indices["skills"] + 1
        skills_end = section_indices.get("activity", section_indices.get("featured", section_indices.get("end", len(lines))))
        skills_lines = lines[skills_start:skills_end]
        for line in skills_lines:
            if "\u2022" in line:
                result["skills"] = [s.strip() for s in line.split("\u2022") if s.strip()]
                break
            elif line and not line.startswith("More"):
                result["skills"].append(line)

    return result


def _parse_experience_block(lines: list[str]) -> list[dict]:
    entries = []
    current = {}
    date_pattern = re.compile(r"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s*-\s*(Present|\d{4}|\w+\s+\d{4})")

    for line in lines:
        if date_pattern.search(line):
            if current:
                current["duration"] = line
                entries.append(current)
                current = {}
            else:
                current["duration"] = line
        elif line and not current.get("title"):
            current["title"] = line
        elif line and not current.get("company"):
            current["company"] = line

    if current:
        entries.append(current)

    return entries


def _parse_education_block(lines: list[str]) -> list[dict]:
    entries = []
    current = {}
    year_pattern = re.compile(r"\d{4}\s*-\s*(Present|\d{4})")

    for line in lines:
        if year_pattern.search(line):
            if current:
                current["years"] = line
                entries.append(current)
                current = {}
            else:
                current["years"] = line
        elif line and not current.get("school"):
            current["school"] = line
        elif line and not current.get("degree"):
            current["degree"] = line

    if current:
        entries.append(current)

    return entries


def extract_profile_text(page) -> dict:
    data = {
        "name": None,
        "headline": None,
        "location": None,
        "about": None,
        "experience": [],
        "education": [],
        "skills": [],
        "raw_text": None,
    }

    try:
        page.wait_for_load_state("networkidle", timeout=15000)
    except Exception:
        pass
    human_delay(2000, 4000)

    scroll_page(page)
    human_delay(1000, 2000)

    try:
        for selector in ["h1.text-heading-xlarge", "h1", "div.pv-top-card__name"]:
            el = page.query_selector(selector)
            if el:
                data["name"] = el.inner_text().strip()
                break
    except Exception:
        pass

    try:
        for selector in ["div.text-body-medium", "div.pv-top-card__headline", "p[class*='headline']"]:
            el = page.query_selector(selector)
            if el:
                text = el.inner_text().strip()
                if text and text != data["name"]:
                    data["headline"] = text
                    break
    except Exception:
        pass

    try:
        for selector in ['a[href*="currentLocation"]', 'span[class*="location"]', 'div.pv-top-card__location']:
            el = page.query_selector(selector)
            if el:
                data["location"] = el.inner_text().strip()
                break
    except Exception:
        pass

    try:
        for selector in ['div[id*="about"]', 'section[id*="about"]', 'div.pv-about__summary']:
            el = page.query_selector(selector)
            if el:
                text = el.inner_text().strip()
                if text.lower().startswith("about"):
                    text = text[5:].strip()
                data["about"] = text if len(text) > 10 else None
                break
    except Exception:
        pass

    try:
        exp_section = page.query_selector('section[id*="experience"]')
        if exp_section:
            items = exp_section.query_selector_all("li")
            for item in items:
                try:
                    title_el = item.query_selector("h3")
                    if not title_el:
                        title_el = item.query_selector("a[role=link]")
                    company_el = item.query_selector("span[class*='company']")
                    if not company_el:
                        company_el = item.query_selector("div[class*='company']")
                    date_el = item.query_selector("span[class*='date']")
                    if not date_el:
                        date_el = item.query_selector("div[class*='date']")
                    entry = {}
                    if title_el:
                        entry["title"] = title_el.inner_text().strip()
                    if company_el:
                        entry["company"] = company_el.inner_text().strip()
                    if date_el:
                        entry["duration"] = date_el.inner_text().strip()
                    if entry:
                        data["experience"].append(entry)
                except Exception:
                    continue
    except Exception:
        pass

    try:
        edu_section = page.query_selector('section[id*="education"]')
        if edu_section:
            items = edu_section.query_selector_all("li")
            for item in items:
                try:
                    school_el = item.query_selector("h3")
                    if not school_el:
                        school_el = item.query_selector("a[role=link]")
                    degree_el = item.query_selector("span[class*='degree']")
                    if not degree_el:
                        degree_el = item.query_selector("div[class*='degree']")
                    date_el = item.query_selector("span[class*='date']")
                    if not date_el:
                        date_el = item.query_selector("div[class*='date']")
                    entry = {}
                    if school_el:
                        entry["school"] = school_el.inner_text().strip()
                    if degree_el:
                        entry["degree"] = degree_el.inner_text().strip()
                    if date_el:
                        entry["years"] = date_el.inner_text().strip()
                    if entry:
                        data["education"].append(entry)
                except Exception:
                    continue
    except Exception:
        pass

    try:
        skills_section = page.query_selector('section[id*="skills"]')
        if skills_section:
            items = skills_section.query_selector_all("span[class*='skill']")
            for item in items:
                text = item.inner_text().strip()
                if text:
                    data["skills"].append(text)
    except Exception:
        pass

    content_text = ""
    try:
        main_el = page.query_selector("main")
        if main_el:
            content_text = main_el.inner_text().strip()
    except Exception:
        pass
    data["raw_text"] = content_text

    if not data["experience"] and content_text:
        parsed = parse_raw_text(content_text)
        for key in ["name", "headline", "location", "about", "experience", "education", "skills"]:
            if not data[key] and parsed[key]:
                data[key] = parsed[key]

    return data


def scrape_profile(url: str, cookies_path: str, output_path: str | None = None) -> dict:
    cookies = load_cookies(cookies_path)
    user_agent = random.choice(USER_AGENTS)
    viewport = random.choice(VIEWPORTS)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-extensions",
                "--disable-gpu",
                "--disable-setuid-sandbox",
                "--disable-web-security",
                "--disable-features=IsolateOrigins,site-per-process",
                "--window-size={},{}".format(viewport["width"], viewport["height"]),
            ],
        )
        context = browser.new_context(
            user_agent=user_agent,
            viewport=viewport,
            locale="en-US",
            timezone_id="America/New_York",
            java_script_enabled=True,
        )

        normalized = [normalize_cookie(c) for c in cookies]
        context.add_cookies(normalized)

        page = context.new_page()

        page.add_init_script(stealth_init_script())

        print(f"Navigating to: {url}")
        response = page.goto(url, wait_until="domcontentloaded", timeout=30000)

        if not response:
            raise RuntimeError("No response from LinkedIn")

        status = response.status

        if status == 999:
            raise RuntimeError(
                "LinkedIn blocked the request (HTTP 999). "
                "This usually means: (1) cookies are expired, "
                "(2) LinkedIn detected automation, or (3) rate limited. "
                "Try re-exporting fresh cookies and waiting 5 minutes."
            )

        if status == 401 or "checkpoint" in page.url or "login" in page.url:
            raise RuntimeError(
                "Authentication failed — cookies may be expired. "
                "Re-export cookies from your browser session."
            )

        if status == 429 or "restricted" in page.url:
            raise RuntimeError(
                "Rate limited by LinkedIn. Wait 5-10 minutes and try again."
            )

        if status >= 400:
            raise RuntimeError(f"HTTP {status} — LinkedIn returned an error")

        print(f"Page loaded (status {status}). Extracting data...")
        data = extract_profile_text(page)
        browser.close()

    result = {
        "source": "linkedin",
        "source_url": url,
        "profile": data,
    }

    if output_path:
        with open(output_path, "w") as f:
            json.dump(result, f, indent=2)
        print(f"Output saved to: {output_path}")

    return result


def main():
    parser = argparse.ArgumentParser(description="LinkedIn Profile Scraper")
    parser.add_argument("url", help="LinkedIn profile URL")
    parser.add_argument(
        "--cookies",
        default=str(Path(__file__).resolve().parent.parent / ".config" / "linkedin-cookies.json"),
        help="Path to cookies JSON file (default: .config/linkedin-cookies.json)",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Output JSON file path (default: /tmp/{username}_linkedin.json)",
    )
    args = parser.parse_args()

    if not os.path.exists(args.cookies):
        print(f"Error: Cookie file not found at {args.cookies}", file=sys.stderr)
        print("Export cookies using a browser extension and save to .config/linkedin-cookies.json", file=sys.stderr)
        sys.exit(1)

    output = args.output
    if not output:
        slug = args.url.rstrip("/").split("/")[-1]
        output = f"/tmp/{slug}_linkedin.json"

    try:
        result = scrape_profile(args.url, args.cookies, output)
        print(json.dumps(result, indent=2))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
