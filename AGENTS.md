---
schema_version: 1.1.0
last_updated: "2026-04-15"
companion_doc: OPENCODE.md
---

# AGENTS.md — Machine-Readable Governance

This file is the authoritative source of truth for LLM scoring logic, schema rules, lifecycle transitions, and operational thresholds. **Do not edit without incrementing `schema_version`.**

OPENCODE.md is the human-facing workflow guide. This document is the machine-enforced ruleset.

---

## Confidence Thresholds

```yaml
confidence:
  auto_merge: 85          # >= 85: LLM writes directly to wiki/
  draft_threshold: 85     # < 85: stage to wiki/drafts/ for human review
  change_radar_ceiling: 70  # Change Radar signals capped at 70 regardless of LLM confidence
  internal_crm_ceiling: 80  # Internal CRM/email signals capped at 80
```

---

## Evidence Tags

Every scored field must carry one of:

```yaml
evidence_tags:
  Strong: "≥2 independent sources explicitly stating the claim"
  Moderate: "1 strong source or 2+ sources implying the claim"
  Weak: "inferred from context; no direct source"
```

---

## PLU Scoring Rules

```yaml
plu_levels:
  High: "≥2 independent sources tagged Strong, or 1 Strong + 2 Moderate"
  Medium: "1 Strong source, or 2+ Moderate sources"
  Low: "1 Moderate source only, or Weak evidence only"

plu_dimensions:
  power:
    sources: [Economic, Political, Social, Institutional]
    note: "Assess resource dependence, network reach, institutional authority"
  legitimacy:
    types: [Contractual_Legal, Moral_Normative]
    note: "Contractual = agreements/law; Normative = ethical standing, peer recognition"
  urgency:
    factors: [Time_Sensitivity, Proximity]
    note: "Urgency requires both immediacy AND relevance to the firm's current operations"
```

---

## Salience Classes

Derived from PLU combination (Mitchell, Agle & Wood 1997):

```yaml
salience_classes:
  Definitive:    { power: true,  legitimacy: true,  urgency: true  }
  Dominant:      { power: true,  legitimacy: true,  urgency: false }
  Dangerous:     { power: true,  legitimacy: false, urgency: true  }
  Dependent:     { power: false, legitimacy: true,  urgency: true  }
  Dormant:       { power: true,  legitimacy: false, urgency: false }
  Discretionary: { power: false, legitimacy: true,  urgency: false }
  Demanding:     { power: false, legitimacy: false, urgency: true  }
  Latent:        { power: false, legitimacy: false, urgency: false }
```

---

## Profile Tiering

```yaml
profile_tiers:
  Lite:
    description: "Created on first mention. Contains Name, Class, Engagement Basis, Posture, and basic notes."
    trigger: "Any first ingest mentioning the stakeholder"
  Full:
    description: "Contains all 4 schema modules (Identification, Strategizing, Value, Network)."
    upgrade_triggers:
      - salience_class in [Dominant, Dangerous, Dependent, Definitive]
      - manual_escalation: true
    warning: "Normative stakeholder with posture == Hold is a theoretical contradiction — flag for review"
```

---

## Engagement Basis

```yaml
engagement_basis_types:
  Normative: "Ethical or moral obligation; firm has intrinsic duty to this stakeholder"
  Instrumental: "Stakeholder is a means to achieving the firm's goals"
  Contractual: "Legally binding agreement defines the relationship"
  Descriptive: "Observational — stakeholder exists in the firm's environment; no active relationship"
  contradiction_rule: "Normative stakeholder with posture == Hold must be flagged as a contradiction in wiki/drafts/contradictions/"
```

---

## Posture Framework

```yaml
posture_types:
  Offensive:  { cooperative_potential: High, harmful_potential: Low,  strategy: "Proactive partnership, invest in the relationship" }
  Defensive:  { cooperative_potential: Low,  harmful_potential: High, strategy: "Minimal engagement, monitor closely" }
  Swing:      { cooperative_potential: High, harmful_potential: High, strategy: "Careful cultivation, contingency planning" }
  Hold:       { cooperative_potential: Low,  harmful_potential: Low,  strategy: "Re-evaluate; insufficient data or low priority" }
```

---

## Module 2 — Strategizing: Behavior Scoring

Explicit numeric scores for Cooperative and Harmful Potential, required for Full profiles. At Scouting stage these are estimates; recalibrate at each Reconciliation pass.

```yaml
module_2_behavior:
  cooperative_potential:
    scale: "1–10 integer"
    note: "1 = no cooperation possible; 10 = fully aligned, maximum synergy"
    evidence_tag: required  # Strong | Moderate | Weak

  harmful_potential:
    scale: "1–10 integer"
    note: "1 = no threat; 10 = existential threat to firm's goals"
    evidence_tag: required

  behavior_notes: "free text — describe specific cooperative or threatening behaviors observed"

  posture_derivation:
    Offensive:  "cooperative_potential >= 6 AND harmful_potential <= 4"
    Defensive:  "cooperative_potential <= 4 AND harmful_potential >= 6"
    Swing:      "cooperative_potential >= 6 AND harmful_potential >= 6"
    Hold:       "cooperative_potential <= 4 AND harmful_potential <= 4"
```

---

## Module 3 — Value Creation & Utility

Tracks total value co-created in the relationship. Most fields are `null` at Scouting stage — this is correct. Populate as the relationship advances to Negotiation and beyond.

```yaml
module_3_value:
  reciprocity_index:
    scale: "0–100 float"
    note: "Composite score of firm investment vs. stakeholder loyalty/behaviors. 50 = balanced; >50 = net positive; <50 = net negative"
    default_at_scouting: null

  reciprocity_trend:
    values: [rising, stable, declining, null]
    note: "Directional indicator updated at each Reconciliation pass"

  utility_factors:
    utility_economic:
      values: [High, Moderate, Low, null]
      note: "Economic value the stakeholder delivers or controls (resources, revenue, access)"
    utility_affiliation:
      values: [High, Moderate, Low, null]
      note: "Reputational or pride value of association with this stakeholder"
    utility_opportunity_cost:
      values: [High, Medium, Low, null]
      note: "Cost of NOT engaging — what is foregone if this stakeholder is neglected"

  justice_metrics:
    justice_distributional:
      values: [High, Medium, Low, null]
      note: "Are outcomes fairly distributed? Does the stakeholder receive equitable results?"
    justice_procedural:
      values: [High, Medium, Low, null]
      note: "Does the stakeholder have voice in decisions that affect them?"
    justice_interactional:
      values: [High, Medium, Low, null]
      note: "Are interactions respectful, transparent, and dignified?"
```

---

## Module 4 — Network & Contextual

Contextual positioning data. Coalition count is derived from `/wiki/coalitions/` files. Institutional environment classifies the stakeholder's operating context per "Varieties of Capitalism" (Hall & Soskice 2001).

```yaml
module_4_network:
  coalition_count:
    type: integer
    note: "Number of coalition files that include this stakeholder. Derived from wiki/coalitions/."

  institutional_environment:
    values: [LME, CME, mixed, null]
    definitions:
      LME: "Liberal Market Economy — US, UK, Canada, Australia. Shareholder-first, fluid labor, market coordination."
      CME: "Coordinated Market Economy — Germany, Japan, Nordics. Stakeholder-inclusive, long-term orientation, consensus coordination."
      mixed: "Characteristics of both systems"

  primordial_check:
    rule: "Every Full Profile ingest must note whether the stakeholder's activities have a measurable positive, negative, or neutral effect on ecological metrics (Starik 1995)"
    values: [positive, negative, neutral, unknown]

  network_notes: "free text — broker relationships, gatekeeping roles, coalition dynamics, structural position"
```

---

## Lifecycle Transition Rules

Transitions require explicit evidence. LLM must not advance a lifecycle stage without a matching source file.

```yaml
lifecycle_transitions:
  - from: Scouting
    to: Negotiation
    criteria: "First formal meeting, proposal, or direct outreach"
    required_evidence: [transcript, email, calendar_entry]

  - from: Negotiation
    to: Commitment
    criteria: "Signed agreement, MOU, or public partnership statement"
    required_evidence: [document_signature, announcement]

  - from: Commitment
    to: Execution
    criteria: "First joint activity completed or resource transacted"
    required_evidence: [activity_log, delivery_receipt]

  - from: Execution
    to: Repair
    criteria: "Breach of agreement, public conflict, or Reciprocity Index drops > 30%"
    required_evidence: [incident_report, news_article]

  - from: Repair
    to: Dissolution
    criteria: "No logged interaction for 180 days after Repair logged"
    required_evidence: [absence_of_logs, termination_note]

  - from: any
    to: Dissolution
    criteria: "Stakeholder ceases operation (bankruptcy, acquisition)"
    required_evidence: [public_record]
```

---

## Health Check Rules

LLM runs these checks when the `/lint` workflow is triggered (see OPENCODE.md).

```yaml
health_check_rules:
  orphan:
    condition: "persona has no relationship file in wiki/relationships/"
    severity: P3
    action: "Flag in health check report"

  stalled_negotiation:
    condition: "lifecycle_stage == Negotiation AND days_since_last_interaction > 90"
    severity: P2
    action: "Stage to wiki/drafts/ with note"

  at_risk_repair:
    condition: "lifecycle_stage == Repair AND reciprocity_trend == declining"
    severity: P2
    action: "Stage to wiki/drafts/ with note"

  coalition_risk:
    condition: "posture == Defensive AND coalition_count >= 2"
    severity: P2
    action: "Flag in health check report"

  upgrade_prompt:
    condition: "profile_tier == Lite AND salience_class in [Dominant, Dangerous, Dependent, Definitive]"
    severity: P4
    action: "Notify workgroup to escalate to Full profile"

  normative_hold_contradiction:
    condition: "engagement_basis == Normative AND posture == Hold"
    severity: P1
    action: "Create contradiction file in wiki/drafts/contradictions/"

  pii_stale:
    condition: "pii_classification == Private_Individual AND days_since_last_ingest > 180"
    severity: P2
    action: "Flag as pii_review_required in health check report"
```

---

## Severity Tiers (Triage Inbox)

```yaml
severity_tiers:
  P1_Critical:
    criteria: ["Contradiction on Definitive stakeholder", "Canary drift > 15%"]
    sla: "Review within 24h"
    auto_resolve: false

  P2_Important:
    criteria: ["Low-confidence update on Expectant stakeholder", "Stalled Negotiation path"]
    sla: "Review within 7 days"
    auto_resolve: false

  P3_Routine:
    criteria: ["Lite profile on Latent stakeholder", "Orphan with no relationships"]
    sla: "Review within 30 days"
    auto_resolve: true
    ttl_action: "Auto-archive with disposition: timed_out"

  P4_Informational:
    criteria: ["Upgrade prompts", "Completed canary passes", "Index refreshes"]
    sla: null
    auto_resolve: true
    ttl_days: 14
```

---

## Change Ledger Schema

Every ingest, update, or resolution must append a line to `wiki/logs/change_ledger.jsonl`.

```yaml
change_ledger_schema:
  required_fields:
    - timestamp       # ISO 8601, UTC
    - event_type      # see enum below
    - entity_id       # e.g. "andrew-ng"
    - entity_type     # persona | group | relationship | coalition | concept
    - field           # field changed, or "*" for initial creation
    - old_value       # null for creation events
    - new_value       # new value, or "initial_creation"
    - source_file     # path to the source that triggered the change
    - agents_version  # value of schema_version at time of change
    - filed_by        # "system" for automated, or user identifier

  event_types:
    - ingest
    - update
    - delete
    - reconciliation
    - contradiction_opened
    - contradiction_resolved
    - query_promoted
    - lifecycle_transition
    - canary_pass
    - canary_drift_alert
```

---

## Required Persona YAML Fields

### Lite Profile (all personas)

```yaml
persona_lite_required_fields:
  # Identity
  - id                    # hyphenated-lowercase, matches filename
  - type                  # always "persona"
  - created               # ISO date YYYY-MM-DD
  - updated               # ISO date YYYY-MM-DD
  - tags                  # list of descriptive tags
  - pii_classification    # "Public Figure" | "Semi-Public" | "Private Individual"

  # Module 1 — Salience
  - salience_class        # one of the 8 classes
  - engagement_basis      # Normative | Instrumental | Contractual | Descriptive
  - salience_history      # list: [{date, class, trigger}]

  # Module 2 — Posture (qualitative)
  - posture               # Offensive | Defensive | Swing | Hold
  - posture_evidence      # Strong | Moderate | Weak
  - posture_source_count  # integer: number of independent sources

  # Lifecycle
  - lifecycle_stage       # Scouting | Negotiation | Commitment | Execution | Repair | Dissolution

  # Profile Tier
  - profile_tier          # Lite | Full
```

### Full Profile (all fields above PLUS)

```yaml
persona_full_additional_fields:
  # Module 2 — Behavior Scoring
  - cooperative_potential   # 1–10 integer
  - cooperative_evidence    # Strong | Moderate | Weak
  - harmful_potential       # 1–10 integer
  - harmful_evidence        # Strong | Moderate | Weak
  - behavior_notes          # free text

  # Module 3 — Value Creation
  - reciprocity_index       # 0–100 float or null
  - reciprocity_trend       # rising | stable | declining | null
  - utility_economic        # High | Moderate | Low | null
  - utility_affiliation     # High | Moderate | Low | null
  - utility_opportunity_cost  # High | Medium | Low | null
  - justice_distributional  # High | Medium | Low | null
  - justice_procedural      # High | Medium | Low | null
  - justice_interactional   # High | Medium | Low | null

  # Module 4 — Network & Contextual
  - coalition_count         # integer (derived from coalitions/ files)
  - institutional_environment  # LME | CME | mixed | null
  - ecological_impact       # positive | negative | neutral | unknown
  - network_notes           # free text
```

---

## Canary Drift Detection

```yaml
canary:
  baseline_path: "wiki/canary_baseline/"
  drift_threshold: 15     # % semantic delta that triggers a Drift Alert
  frequency: "every 20 ingest operations"
  on_drift: "Stage P1 alert to wiki/drafts/ and log to change_ledger.jsonl as canary_drift_alert"
```

---

## AGENTS.md Change Control

| Control | Rule |
| --- | --- |
| Semantic versioning | Increment minor for changes to rules; increment major for breaking changes to schema |
| Approval | Edits require review by Admin role before applying |
| Regression | Any change must be validated against golden samples in `/tests/` once test suite exists |
| Changelog | Append to `AGENTS_changelog.md` with date, version, author, and plain-language summary |
| Ledger tracking | Every `change_ledger.jsonl` entry includes the `agents_version` active at time of ingest |
