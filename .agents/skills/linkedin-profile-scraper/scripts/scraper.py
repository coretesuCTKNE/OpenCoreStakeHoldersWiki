#!/usr/bin/env python3
"""LinkedIn Profile Scraper - Reads cookies from config file"""

import json
import sys
import re
from playwright.sync_api import sync_playwright

import os
from pathlib import Path

# Try to find the local workspace .config folder, fallback to ~/.config
workspace_root = os.getcwd()
CONFIG_PATH = os.path.join(workspace_root, ".config", "linkedin-cookies.json")
if not os.path.exists(CONFIG_PATH):
    CONFIG_PATH = os.path.expanduser("~/.config/linkedin-cookies.json")


def load_cookies():
    with open(CONFIG_PATH, "r") as f:
        cookies = json.load(f)

    normalized = []
    for cookie in cookies:
        nc = {
            "name": cookie["name"],
            "value": cookie["value"],
            "domain": cookie["domain"],
            "path": cookie.get("path", "/"),
            "secure": cookie.get("secure", True),
            "httpOnly": cookie.get("httpOnly", False),
        }
        if "expirationDate" in cookie:
            nc["expirationDate"] = cookie["expirationDate"]
        normalized.append(nc)
    return normalized


def scrape_profile(profile_url):
    cookies = load_cookies()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        context.add_cookies(cookies)

        page = context.new_page()
        page.goto(profile_url, timeout=60000)
        page.wait_for_load_state("domcontentloaded", timeout=60000)
        page.wait_for_timeout(3000)

        content = page.content()
        body_text = page.locator("body").text_content()

        # Extract name from title
        title_match = re.search(r"<title>([^|]+)\|", content)
        name = title_match.group(1).strip() if title_match else "Unknown"

        browser.close()

        # Create ingest JSON
        profile_id = profile_url.split("/in/")[-1].strip("/")
        ingest = {
            "source": "linkedin",
            "source_url": profile_url,
            "extracted_text": body_text[:5000],
            "name": name,
        }

        output_path = f"/tmp/{profile_id}_ingest.json"
        with open(output_path, "w") as f:
            json.dump(ingest, f, indent=2)

        print(f"Ingest saved to {output_path}")
        return output_path


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: linkedin_scraper.py <profile_url>")
        sys.exit(1)

    profile_url = sys.argv[1]
    scrape_profile(profile_url)
