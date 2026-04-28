---
title: Project Overview
id: open-core-stakeholders-wiki
type: project
created: 2026-04-17
status: Active
tags: [project, internal, open-source, llm, wiki]
---

# OpenCoreStakeHoldersWiki

A persistent, compounding knowledge base designed for innovation workgroups to map and manage stakeholder relationships using an LLM.

## Summary

Acts as a continuous engine to incrementally build a structured, interlinked wiki synthesizing entities, organizations, and their interconnections based on deep Stakeholder Theory and Relational Management principles. Prevents LLM error propagation through structured auditing, relies on progressive schema disclosure (Lite vs. Full profiles), and moves beyond passive dashboards with query-based knowledge loops.

## Architecture

### Schema Modules

The wiki uses a 4-module profile structure for each stakeholder:

1. **Module 1 — Identification & Salience** — Identity fields, PLU salience classification, engagement basis
2. **Module 2 — Strategizing** — Cooperative/harmful potential scores, behavior notes
3. **Module 3 — Value Creation** — Reciprocity index, utility factors, justice metrics
4. **Module 4 — Network & Contextual** — Coalition position, institutional environment, ecological impact

### Profile Tiering

- **Lite** — Created on first mention. Contains Name, Class, Engagement Basis, Posture.
- **Full** — Contains all 4 modules. Triggered by high salience class or manual escalation.

## Key Concepts

- [[concepts/plu-salience]] — PLU salience classification framework
- [[concepts/posture-framework]] — Strategic posture derivation
- [[concepts/lifecycle-stages]] — Relationship lifecycle progression
- [[queries/queries-template]] — Query-driven knowledge building

## Content Organization

```
content/
├── concepts/          # Framework concepts
│   ├── plu-salience.md
│   ├── posture-framework.md
│   └── lifecycle-stages.md
├── personas/          # Individual stakeholder profiles
├── groups/            # Organizational stakeholder profiles
├── queries/           # Open research questions
├── relationships/     # Relationship mappings
├── coalitions/        # Coalition memberships
├── summaries/        # Periodic reconciliation summaries
└── index.md          # Wiki homepage
```

## Technology

Built on [Quartz](https://quartz.jzhao.xyz) v4.5.2 — a static site generator for digital gardens. Extended with custom components:

- **StakeholderCard** — Sidebar card showing PLU salience, posture, lifecycle from frontmatter
- **Graph salience colors** — Graph nodes colored by salience class (Catppuccin palette)
- **Comments (giscus)** — GitHub Discussions-powered comments

## See Also

- [GitHub Repository](https://github.com/coretesuCTKNE/OpenCoreStakeHoldersWiki)
- [[personas/sample-persona]] — Example persona profile
- [[groups/sample-company]] — Example group profile