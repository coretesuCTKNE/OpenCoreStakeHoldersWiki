# AGENTS.md Changelog

---

## 1.3.0 — 2026-05-28

- **Added PLU Numeric Scoring** (`plu_scores`) section with 0-10 float scoring, weighted sub-factor rubric for Power/Legitimacy/Urgency, derivation heuristics from existing fields, and Graph Rendering Rules for the interactive SalienceMatrix visualization.
- **Added `research_session` event type** to `change_ledger_schema.event_types` enum.
- **Added `missing_plu_scores` health check rule** — flags Full profiles lacking `plu_scores` (severity P3).
- **Added `plu_scores` to persona YAML fields** — optional for Lite (derived on upgrade), required for Full profiles.
- **Added Quartz-based interactive SalienceMatrix component** (D3 scatter plot with PLU/Actionability views, lifecycle filters, zoom/pan, profile overlays).
- **Added Graph Workflow section** to OPENCODE.md documenting how to create stakeholder salience matrices.

---

## 1.2.0 — 2026-05-13

- **Added `research_session` event type** to `change_ledger_schema.event_types` enum.
  - Captures full research lifecycle as a single audit trail entry for the `core_research_agents` skill.
  - Notes field carries session metrics: tier counts, lead counts, output path, confidence, contradictions, relationships, hidden stakeholders.
  - Profile/relationship writes continue to use standard `ingest`/`update` events.

---

## 1.1.0 — 2026-04-15

- Initial structured release.
- Confidence thresholds, evidence tags, PLU scoring rules, salience classes, posture framework, profile tiering, lifecycle transitions, health check rules, change ledger schema, canary drift detection.
