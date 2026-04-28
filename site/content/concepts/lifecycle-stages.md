---
title: Lifecycle Stages
tags: [concept, process, lifecycle]
---

# Relationship Lifecycle Stages

Each stakeholder relationship moves through defined lifecycle stages. Transitions require explicit evidence — the LLM must not advance a stage without a matching source file.

## Stage Definitions

```
Scouting → Negotiation → Commitment → Execution → Repair → Dissolution
              ↓
           Dissolution (early exit)
```

### Scouting

Initial identification and information gathering. No active relationship exists.

**Upgrade triggers:**
- First formal meeting or proposal
- Direct outreach from the stakeholder
- Substantial new information that upgrades the profile tier

**Required evidence:** web search, public records, news articles

### Negotiation

Active discussions toward an agreement or partnership.

**Upgrade triggers:**
- Signed agreement, MOU, or public partnership statement
- First contract exchange

**Required evidence:** transcript, email, calendar entry, document

### Commitment

Legally or formally binding agreement in place.

**Upgrade triggers:**
- First joint activity completed
- Resource transacted (funds, information, deliverables)

**Required evidence:** activity log, delivery receipt, transaction record

### Execution

Actively working together. Regular interactions and deliverables.

**Repair triggers:**
- Breach of agreement, public conflict
- Reciprocity Index drops > 30%
- Sustained non-response to outreach

**Required evidence:** incident report, news article, communication log

### Repair

Relationship has been damaged and is being restored.

**Dissolution triggers:**
- No logged interaction for 180 days after Repair logged
- Stakeholder explicitly ends relationship
- Firm formally terminates agreement

**Required evidence:** absence of logs, termination note

## Stalled Negotiation Check

> **Health check rule:** A stakeholder with lifecycle_stage == Negotiation AND days_since_last_interaction > 90 should be staged to `wiki/drafts/` for human review.

This catches relationships that have gone quiet before reaching a natural conclusion.

## Lifecycle and Posture

Posture may shift across lifecycle stages. A Swing stakeholder during Execution may become Defensive if the partnership underdelivers. Recalibrate posture at each Reconciliation pass.

## See Also

- [[concepts/posture-framework]] — Posture assessment across lifecycle stages
- [[queries/queries-template]] — Query template following the lifecycle structure