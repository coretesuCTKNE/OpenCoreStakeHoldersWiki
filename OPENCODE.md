# OPENCODE.md — LLM Wiki Schema

This file defines how the OpenCode agent builds and maintains the stakeholder wiki.

---

## Directory Structure

```
stakeholdersLLMWiki/
├── raw/                           # Immutable sources (read-only)
│   └── sources/
│       └── *.md                  # Source documents
├── wiki/                         # LLM-generated content
│   ├── projects/               # Internal projects and initiatives
│   ├── personas/               # Individual/entity profiles
│   ├── groups/                # Organization profiles
│   ├── relationships/         # Dyadic relationship files
│   ├── coalitions/            # S-S coalition files
│   ├── concepts/             # Theory/concept pages
│   ├── summaries/            # Source summaries
│   ├── queries/              # Promoted query outputs
│   ├── index.md              # Content catalog
│   └── log.md               # Activity log
└── qmd/                     # Search config (future)
```

---

## Page Templates

### Persona Profile
```markdown
---
id: persona-name
type: persona
created: YYYY-MM-DD
tags: [stakeholder, individual]
---

# Name

## Summary
Brief one-liner.

## PLU Assessment
- **Power**: [level] — [sources]
- **Legitimacy**: [type] — [sources]
- **Urgency**: [level] — [sources]

## Engagement Basis
[Normative | Instrumental | Contractual | Descriptive]

## Posture
[Offensive | Defensive | Swing | Hold]

## Notes
-

## Sources
- [[sources/doc-name]]
```

### Full Profile (Lite + Modules 2–4)

Used when `salience_class` is Definitive, Dominant, Dangerous, or Dependent. Extends the Lite template with Value Creation and Network sections.

```markdown
---
id: persona-name
type: persona
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
pii_classification: Public Figure | Semi-Public | Private Individual
salience_class: Definitive | Dominant | ...
engagement_basis: Normative | Instrumental | Contractual | Descriptive
posture: Offensive | Defensive | Swing | Hold
posture_evidence: Strong | Moderate | Weak
posture_source_count: N
lifecycle_stage: Scouting | Negotiation | Commitment | Execution | Repair | Dissolution
profile_tier: Full
salience_history:
  - date: "YYYY-MM-DD"
    class: Definitive
    trigger: initial_assessment
cooperative_potential: N        # 1–10
cooperative_evidence: Strong | Moderate | Weak
harmful_potential: N            # 1–10
harmful_evidence: Strong | Moderate | Weak
behavior_notes: ""
reciprocity_index: null         # 0–100, null at Scouting
reciprocity_trend: null         # rising | stable | declining | null
utility_economic: null          # High | Moderate | Low | null
utility_affiliation: null
utility_opportunity_cost: null
justice_distributional: null
justice_procedural: null
justice_interactional: null
coalition_count: N
institutional_environment: LME | CME | mixed | null
ecological_impact: positive | negative | neutral | unknown
network_notes: ""
---

# Name

## Summary
Brief one-liner.

## PLU Assessment
- **Power**: [High | Medium | Low] — [sources] — evidence: [Strong | Moderate | Weak]
- **Legitimacy**: [High | Medium | Low] — [sources] — evidence: [Strong | Moderate | Weak]
- **Urgency**: [High | Medium | Low] — [sources] — evidence: [Strong | Moderate | Weak]

## Engagement Basis
[Normative | Instrumental | Contractual | Descriptive] — [rationale]

## Posture
[Offensive | Defensive | Swing | Hold] — [rationale]

## Strategizing (Module 2)
- **Cooperative Potential**: N/10 ([evidence tag]) — [what behaviors support this]
- **Harmful Potential**: N/10 ([evidence tag]) — [what risks exist]

## Value Creation (Module 3)
- **Reciprocity Index**: null (Scouting — no interaction history yet)
- **Reciprocity Trend**: null
- **Utility — Economic**: null — [estimated value once relationship advances]
- **Utility — Affiliation**: null — [reputational value]
- **Utility — Opportunity Cost**: null — [cost of neglecting this stakeholder]
- **Justice — Distributional**: null
- **Justice — Procedural**: null
- **Justice — Interactional**: null

## Network Context (Module 4)
- **Coalitions**: N (see [[coalitions/...]])
- **Institutional Environment**: [LME | CME | mixed]
- **Ecological Impact**: [positive | negative | neutral | unknown]
- **Network Notes**: [broker roles, structural position, key ties]

## Sources
- [[sources/doc-name]]
```

### Project Profile

```markdown
---
id: project-name
type: project
created: YYYY-MM-DD
status: [Active | Paused | Completed | Proposed]
tags: [project, internal]
---

# Project Name

## Summary
Brief one-liner describing the project.

## Goals & Scope
What the project aims to achieve.

## Key Stakeholders
- [[groups/group-name]] — [Role/Interest]
- [[personas/person-name]] — [Role/Interest]

## Related Concepts
- [[concepts/concept-name]]
```

### Group Profile

```markdown
---
id: group-name
type: group
created: YYYY-MM-DD
tags: [stakeholder, organization]
---

# Organization Name

## Summary
Brief one-liner.

## Classification
[Industry | Government | NGO | Media | etc.]

## Key People
- [[personas/person-name]]

## Relationships
- [[relationships/org-person]]
```

### Concept Page
```markdown
---
id: concept-name
type: concept
created: YYYY-MM-DD
tags: [theory, framework]
---

# Concept Name

## Definition
What it means.

## Source Theory
Author (Year)

## Key Components
1. 
2. 

## Application
How it maps to stakeholder analysis.

## Related Concepts
- [[concepts/other-concept]]
```

### Relationship File
```markdown
---
id: relationship-firm-stakeholder
type: relationship
created: YYYY-MM-DD
---

# Firm ↔ Stakeholder

## Lifecycle Stage
[Scouting | Negotiation | Commitment | Execution | Repair | Dissolution]

## Last Updated
YYYY-MM-DD

## Summary
-

## Source
- [[sources/doc-name]]
```

---

## Workflows

### Ingest Workflow

When given a new source:

1. **Read** the source document
2. **Discuss** key takeaways with user (if substantive)
3. **Create summary** in `wiki/summaries/[source-name].md`
4. **Extract entities**: Create/update persona or group pages
5. **Extract concepts**: Create/update concept pages
6. **Extract relationships**: Create relationship files if mentioned
7. **Update index**: Add new pages to `wiki/index.md`
8. **Log action**: Append to `wiki/log.md`

### Query Workflow

When asked a question:

1. **Read index.md** to find relevant pages
2. **Load relevant pages** into context
3. **Synthesize answer**
4. **Offer to promote**: "Would you like me to file this as a wiki page?"

### Lint Workflow

Periodically check for:

- Orphan pages (no inbound links)
- Stale content (needs updating)
- Missing cross-references
- Contradictions between pages
- Concepts without their own page

### Reconciliation Workflow

A periodic "Conflict Pass" that keeps the wiki internally consistent. Run after every 5+ ingests or whenever a structural conflict is suspected.

1. **Snapshot** — Copy all modified persona and group files since the last Reconciliation to `wiki/history/YYYY-MM-DD/`
2. **Cross-check personas ↔ relationships** — Confirm each active persona has a relationship file; confirm lifecycle stages are consistent across both files
3. **Validate lifecycle evidence** — For any persona NOT at Scouting, verify a source file exists meeting the transition criteria defined in `AGENTS.md`
4. **PLU drift check** — Re-read source documents for any persona whose `salience_history` has not been updated in 90+ days; flag if PLU assessment may have changed
5. **Contradiction scan** — If two sources conflict on a core fact (posture, salience class, lifecycle stage), extract both to `wiki/drafts/contradictions/YYYY-MM-DD-entity-field.md` using the contradiction template
6. **Low-confidence staging** — Any claim with `confidence < 85` goes to `wiki/drafts/` with the entity ID and field noted
7. **Log the pass** — Append a `reconciliation` event to `wiki/logs/change_ledger.jsonl` and a summary entry to `wiki/log.md`

**Contradiction file template:**

```markdown
---
id: contradiction-YYYY-MM-DD-entity-field
type: contradiction
entity_id: [entity]
field: [field in dispute]
severity: P1 | P2
created: YYYY-MM-DD
status: open
---

# Contradiction: [entity] — [field]

## Source A
- File: [[sources/source-a]]
- Claim: [what source A says]

## Source B
- File: [[sources/source-b]]
- Claim: [what source B says]

## Proposed Resolution
[LLM reasoning — recency, trust, context]

## Decision
[ ] Approve Source A  [ ] Approve Source B  [ ] Manual override
Filed by: [user] on [date]
```

---

## Naming Conventions

- **Projects**: `wiki/projects/[project-name].md`
- **Personas**: `wiki/personas/[firstname-lastname].md`
- **Groups**: `wiki/groups/[org-name].md`
- **Relationships**: `wiki/relationships/[org-stakeholder].md`
- **Concepts**: `wiki/concepts/[concept-name].md`
- **Summaries**: `wiki/summaries/[source-name].md`
- **Queries**: `wiki/queries/[question-slug].md`

---

## Links

Use wiki-links: `[[page-name]]` or `[Label](../path/to/page.md)`

---

## Tags

Add YAML frontmatter to every page:
```yaml
---
id: unique-id
type: [persona|group|relationship|concept|summary]
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
---
```

---

## Index Format

`wiki/index.md` should be:
```markdown
# Index

## Projects
- [[projects/name]] — Summary

## Personas
- [[personas/name]] — Summary

## Groups
- [[groups/name]] — Summary

## Concepts
- [[concepts/name]] — Summary

## Summaries
- [[summaries/source]] — Summary

## Sources
- [[sources/filename]] — Original source
```

---

## Log Format

`wiki/log.md` should use:
```markdown
## [YYYY-MM-DD] action | detail
```

Examples:
```markdown
## [2026-04-13] ingest | stakeholder-wiki-design-final.md
## [2026-04-13] query | Initial synthesis
## [2026-04-14] lint | Health check complete
```

---

## Quality Guidelines

1. **Every claim needs a source** — cite `[[sources/doc]]`
2. **Evidence tags** — mark claims as Strong/Moderate/Weak
3. **Don't skip updates** — if source contradicts wiki, note the contradiction
4. **Cross-link generously** — related concepts should link to each other
5. **Keep pages focused** — one concept per page preferred

---

## Notes for Stakeholder Theory

Key frameworks to use:
- **PLU Salience**: Power, Legitimacy, Urgency (Mitchell, Agle & Wood 1997)
- **Posture**: Offensive/Defensive/Swing/Hold
- **Lifecycle**: Scouting → Negotiation → Commitment → Execution → Repair → Dissolution
- **Coalition Types**: Direct/Indirect × Use/Withhold (Frooman 1997)

Always use proper citations for theoretical frameworks.
