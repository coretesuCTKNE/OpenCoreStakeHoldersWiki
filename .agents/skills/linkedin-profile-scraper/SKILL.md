---
name: linkedin-profile-scraper
description: |
  Scrapes and extracts data from LinkedIn profile pages. Use when user provides a linkedin.com/in/URL and wants profile data extracted - includes name, headline, about, experience, education from the profile. Requires authenticated session cookies stored in .config/linkedin-cookies.json. Outputs JSON with extracted profile text for stakeholder analysis or CRM ingestion. Do NOT use for unauthorized data collection - only with user's own authenticated LinkedIn session.
compatibility:
  - playwright
---

# LinkedIn Profile Scraper

## Overview

This skill scrapes LinkedIn profiles using Playwright with authenticated cookies. It extracts:
- Name, headline, location
- About section
- Experience and education
- Connection count

## Prerequisites

1. **Cookie file** must exist at `.config/linkedin-cookies.json`
2. **Playwright** must be installed: `pip install playwright && playwright install chromium`

## Workflow

### Step 1: Validate cookie file exists
Read `.config/linkedin-cookies.json`. If missing, error: "Cookie file not found. Export cookies from LinkedIn using a browser extension."

### Step 2: Load cookies
Parse the JSON. Validate required fields: `li_at` (primary auth token).

### Step 3: Build scraper script
Write `/tmp/linkedin_scraper.py` with:
- Load cookies from config path
- Launch headless Chromium with cookies
- Navigate to profile URL
- Extract text content from page
- Output JSON with `source`, `source_url`, `extracted_text`

### Step 4: Run scraper
Execute: `python /tmp/linkedin_scraper.py`

### Step 5: Parse results
The script outputs JSON to `/tmp/{profile_name}_ingest.json`. Read and present extracted data to user.

## Usage

```
User: "ingest https://www.linkedin.com/in/username"
→ Extract profile URL → Run workflow → Present extracted data
```

## Output Format

```json
{
  "source": "linkedin",
  "source_url": "https://www.linkedin.com/in/username",
  "extracted_text": "Full profile text..."
}
```

## Notes

- Cookies expire ~1 year. Re-export if 401 errors occur.
- LinkedIn rate-limits heavy usage. Space out requests.
- Headless mode may fail if LinkedIn updates anti-bot measures.