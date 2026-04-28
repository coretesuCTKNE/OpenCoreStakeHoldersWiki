---
title: Queries Template
tags: [query, template]
---

# Stakeholder Query Template

Use this template when creating a new stakeholder query. Queries are questions or hypotheses that require research before they become confirmed knowledge in a profile.

## Query Structure

Every query file should contain:

1. **The Question** — What specific question are you trying to answer?
2. **Hypothesis** — What do you suspect the answer is?
3. **Evidence** — What sources have you checked?
4. **Resolution Plan** — What steps will confirm or refute the hypothesis?

## Template

```markdown
---
title: "[QUERY] [Short title]"
status: Open | In_Progress | Resolved | Superseded
created: YYYY-MM-DD
tags: [query]
---

# Query

[State the question in one sentence]

## Background

[Context — why is this question important?]

## Hypothesis

[What do you think the answer is?]

## Evidence Checked

- [ ] Source 1
- [ ] Source 2

## Resolution Plan

1. [ ] Step 1
2. [ ] Step 2

## Notes

[Working notes — update as you research]
```

## Query Lifecycle

- **Open** — Question raised, not yet researched
- **In_Progress** — Actively researching
- **Resolved** — Sufficient evidence to answer; update the relevant profile
- **Superseded** — Question is no longer relevant

## See Also

- [[personas/sample-persona]] — Example profile
- [[concepts/lifecycle-stages]] — Query resolution may trigger lifecycle upgrade