---
name: core_intelligence_researcher
description: Research any stakeholder (persona, group, concept) — existing in wiki or new — and produce a detailed markdown document in raw/sources/ for later wiki ingestion. Uses web search with academic priority and auto-invokes LinkedIn scraper when relevant URLs are detected.
trigger: /research [entity-name] | natural language "research [entity]"
---

# core intelligence researcher

Research a stakeholder entity and produce a detailed, source-cited markdown document for wiki ingestion.

## Configuration

- `research_duration_minutes`: default 10, user-configurable

## Workflow

### Step 1: Check Wiki Status

Search the stakeholder wiki for existing entry:
- Check `wiki/personas/[entity-name].md`
- Check `wiki/groups/[entity-name].md`
- Check `wiki/concepts/[entity-name].md`

If entity exists:
- Note current profile_tier (Lite/Full)
- Note salience_class if applicable
- Note lifecycle_stage
- Identify gaps (missing modules, stale data)

If entity is new:
- Mark as first research

### Step 2: Determine Research Scope

If existing:
- Focus on filling gaps (e.g., Module 2-4 for Lite profiles)
- Note any stale data (>90 days since last update)

If new:
- Full comprehensive research covering all dimensions

### Step 3: Run Web Research

**Source Priority Order** (highest to lowest):
1. Academic: Google Scholar, arXiv, ResearchGate, university publications
2. News: New York Times, Wall Street Journal, Financial Times, TechCrunch, Wired, The Verge
3. Industry: McKinsey/BCG/Gartner reports, AI Index annual report, industry newsletters
4. Official: Company filings (SEC, regulatory), press releases, conference keynotes, official websites
5. Professional: LinkedIn, Twitter/X, personal blogs, professional profiles

Search queries should include:
- Entity name + role/title
- Entity name + organization
- Entity name + "AI" or relevant industry terms
- For groups: entity name + "news", "funding", "partnerships"

### Step 4: LinkedIn Detection & Scraping

If any search returns a LinkedIn profile URL:
- Automatically invoke the `linkedin-profile-scraper` skill
- Merge scraped profile data into research findings
- Note: LinkedIn data is marked as "Professional" source type

### Step 5: Generate Output

Write to: `core/projects/stakeholdersLLMWiki/raw/sources/[entity-name]-[YYYY-MM-DD].md`

File format:

```markdown
---
researched: YYYY-MM-DD
duration_minutes: {configurable, default 10}
entity_type: persona | group | concept
wiki_status: new | existing | existing_with_gaps
existing_wiki_data:
  profile_tier: Lite | Full | null
  salience_class: [class] | null
  lifecycle_stage: [stage] | null
  last_updated: YYYY-MM-DD | null
sources_searched:
  - {url, type, quality}
---

# Research: [Entity Name]

## Overview
[2-3 paragraph summary of entity based on gathered sources]

## Source Summary

| Source | Type | Quality | Key Information |
|--------|------|---------|-----------------|
| [Name](url) | Academic/News/Industry/Official/Professional | Strong/Moderate/Weak | [What this source provides] |

## Key Findings

### Power (PLU Dimension)
- Assessment: High | Medium | Low
- Evidence: [specific findings]
- Sources: [cite sources]

### Legitimacy (PLU Dimension)
- Type: Contractual_Legal | Moral_Normative
- Assessment: High | Medium | Low
- Evidence: [specific findings]
- Sources: [cite sources]

### Urgency (PLU Dimension)
- Assessment: High | Medium | Low
- Factors: Time_Sensitivity | Proximity (or null)
- Evidence: [specific findings]
- Sources: [cite sources]

### Engagement Basis
- Type: Normative | Instrumental | Contractual | Descriptive
- Rationale: [why this classification]

### Posture (if sufficient evidence)
- Type: Offensive | Defensive | Swing | Hold
- Evidence strength: Strong | Moderate | Weak
- Rationale: [reasoning]

### Behavior Scores (if Full profile research)
- Cooperative Potential: 1-10
- Harmful Potential: 1-10
- Evidence: [behaviors observed in sources]

## Conflicts with Existing Wiki

[If research contradicts existing wiki data, document here:
- Field: [field name]
- Wiki says: [what wiki states]
- Research says: [what sources indicate]
- Resolution: pending_human_review
]

## Notes

[Any additional context, gaps in research, follow-up needed]

## Research Duration
[Actual time spent on research]
```

## Quality Guidelines

1. Every claim must be tied to a source
2. Use evidence tags: Strong (2+ independent sources), Moderate (1 strong or 2+ implied), Weak (inferred)
3. Academic sources weighted highest in credibility
4. If research duration expires, note "incomplete_research" and list remaining gaps
5. Preserve all source URLs for human verification

## Post-Research

After completion:
- Summarize findings for user
- Ask if they want to: (a) view the research file, (b) ingest to wiki, (c) continue with additional research
- Do NOT auto-ingest — user must explicitly request wiki update