# OpenStakeholderWiki: Architecture and Design

## Goal Description
The **openStakeholderWiki** is a persistent, compounding knowledge base designed for innovation workgroups to map and manage stakeholder relationships. Unlike traditional RAG systems, it uses an LLM to incrementally build a structured wiki that synthesizes "Names and Faces" individuals, organizations, and their interconnections based on deep Stakeholder Theory and Relational Management principles.

**Key Design Objectives:**
1. **Resilience** — Prevent and detect LLM error propagation through structured auditing, canary ingests, regression testing, and field-level change ledgers.
2. **Accessibility** — Reduce cognitive overhead with progressive schema disclosure and tiered (Lite vs. Full) stakeholder profiles.
3. **Actionability** — Move beyond passive dashboards with proactive contradiction resolution workflows, query-based knowledge promotion loops, and generated stakeholder communication templates.

---

## Architecture
We follow a **Linked Network** approach where the LLM maintains a directory of interrelated markdown and YAML files. All cross-references, contradictions, and theoretical metrics are kept current through automated workflows, ensuring the system functions as a true compounding intelligence base.

### Directory Structure
```text
/sources/                              # Immutable raw data (PDFs, transcripts, articles, images)
/sources/inbox/                        # Staging area for new signals (Change Radar auto-deposits)

/wiki/groups/                          # Profiles for institutions, startups, businesses
/wiki/personas/                        # Profiles for specific individuals ("Names and Faces")
/wiki/personas/natural-environment.md  # Reserved primordial stakeholder (Starik, 1995)
/wiki/relationships/                   # Dyadic analysis files (firm-to-stakeholder)
/wiki/coalitions/                      # S-S ties and coalition files (Rowley, 1997)
/wiki/history/                         # Timestamped snapshots before each Reconciliation pass
/wiki/drafts/                          # Staged updates with confidence_score < 85 awaiting approval
/wiki/drafts/contradictions/           # Structured contradiction resolution files
/wiki/drafts/comms/                    # Generated communication engagement templates
/wiki/queries/                         # Promoted query outputs filed as wiki pages
/wiki/logs/                            # Append-only chronological record of ingests & reconciliation passes
/wiki/logs/change_ledger.jsonl         # Field-level change log enabling surgical rollback
/wiki/index.md                         # Central catalog including computed network metric summary table
/wiki/canary_baseline/                 # Golden outputs for drift-detection re-ingests

/tests/                                # AGENTS.md regression test fixtures
/tests/golden_sources/                 # Known source files with pre-defined expected outputs
/tests/golden_outputs/                 # Baseline ingest results for semantic diffing

AGENTS.md                              # "Source of Truth" for LLM operations, schema rules, and scoring logic
```

---

## The Relational Schema
The wiki uses a multi-modular, **progressively disclosed** schema. Workgroups enable modules over time rather than adopting the full theoretical weight on day one, avoiding cognitive overload.

### Profile Tiering: Lite vs. Full
Not every stakeholder requires exhaustive profiling on first contact.
- **Lite Profile:** Created on first mention of a stakeholder. Contains minimal routing details (Name, Class, Engagement Basis, Posture, and simple notes).
- **Full Profile:** Triggered when the stakeholder's salience reaches Expectant or Definitive, or when manually escalated by the workgroup. Contains the full 4-module Relational Schema logic.

*Note on Calibration:* To prevent false precision, every scored metric must carry an evidence string tag (`Strong | Moderate | Weak`) and the total number of independent sources backing that score.

### Module 1: Identification (Salience)
Detects which stakeholders command attention using the Power, Legitimacy, and Urgency framework *(Mitchell, Agle & Wood, 1997)*.
- **Power Sources**: Economic (resource dependence), Political, Social, and Institutional.
- **Legitimacy Type**: Contractual/Legal vs. Moral/Normative.
- **Urgency & Proximity**: Time-sensitive claim immediacy and shared physical/ecological space markers.
- **Engagement Basis**: Required field — `Normative | Instrumental | Contractual | Descriptive`. Flags normative stakeholders placed on `Hold` as a theoretical contradiction.
- **Salience Trajectory**: A `salience_history` list tracks class migrations (Latent → Expectant → Definitive) with dates and documented triggers.
- **Managerial Perception Log**: Tracks independent per-manager PLU scores. Reconciliation calculates a `perception_divergence_score`; any score > 0.5 triggers an internal alignment review.

### Module 2: Strategizing (Posture & Behavior)
Guides engagement modes based on strategic orientation.
- **Posture Tags**: Offensive (High Potential / Low Threat), Defensive (High Threat / Low Potential), Swing (High Both), or Hold (Low Both).
- **Behavior Tracking**: Monitoring Cooperative Potential vs. Harmful Potential.

### Module 3: Value Creation & Utility
Measures the "total value" co-created in the relationship.
- **Utility Factors**: Economic Value, Affiliation (pride), and Opportunity Costs.
- **Justice Metrics**: Distributional (fair outcomes), Procedural (opinion counts), and Interactional (respectful treatment).
- **Reciprocity Index & Trend**: Monitors how firm investments lead to loyal stakeholder behaviors, paired with a directional indicator (rising, stable, declining).

### Module 4: Network & Contextual
- **Coalition Files** (`/wiki/coalitions/`): First-class Stakeholder-to-Stakeholder (S-S) ties built heavily on Frooman's typology (Direct/Indirect × Use/Withhold strategies). This captures power amplification and coalition risks.
- **Relationship Lifecycle Stage**: Granular tracking on the exact stage of the relationship (e.g., *Negotation, Commitment, Execution*), governed by strict transition rules (see next section).
- **Institutional Environment**: Contextual indicators tracking differences like "Varieties of Capitalism" (Liberal vs. Coordinated).
- **Primordial Stakeholder (Nature)**: Reserved entity at `/wiki/personas/natural-environment.md` with `type: Primordial`. Every system ingest inherently validates if new actions affect ecological metrics.

---

## Lifecycle Transition Rules
Transitions between relationship lifecycle stages are strictly governed by explicitly defined, machine-readable evidence requirements located in `AGENTS.md`.

| Transition | Trigger Criteria | Required Evidence |
|---|---|---|
| **Scouting → Negotiation** | First formal meeting, proporsal, or direct outreach. | Transcript, email, calendar entry |
| **Negotiation → Commitment** | Signed agreement, MOU, or public partnership statement. | Document signature, announcement |
| **Commitment → Execution** | First joint activity completed or resource transacted. | Activity log, delivery receipt |
| **Execution → Repair** | Breach of agreement, public conflict, or Index drops > 30%. | Incident report, news article |
| **Repair → Dissolution** | No logged interaction for 180 days after a Repair logged. | Absence of logs, termination note |
| *(Any)* **→ Dissolution** | Stakeholder ceases operation (bankruptcy, acquisition). | Broad public record |

---

## Network Metrics Specification
Network variables are computed globally to inform broader organizational positioning. Each Relationship profile serves as a directed edge. The script relies on standard algorithms (e.g., Python's `networkx`) and outputs results directly to `wiki/index.md`.

- **Degree centrality (normalized):** Total direct connections a single stakeholder has.
- **Betweenness centrality:** Detects system brokers and coalition gatekeepers.
- **Eigenvector centrality:** Represents the primary Firm's overarching influence score.
- **Network density:** Understand ecosystem interconnectedness.
- **Clustering coefficient:** Quickly identify tight-knit stakeholder subgroups.

---

## Operational Workflows

### 1. Ingest
The Multi-Agent NLP pipeline reads new sources, logs the event, and updates files across Groups, Personas, and Relationships. It functions via distinct, sequentially piped sub-agents:
- **Extraction Agent:** Captures raw, structured facts, direct quotes, and immediate affiliations.
- **Scoring Agent:** Extrapolates variables using theoretical models, assigning standard explicit tags like `posture_evidence` and `posture_source_count`.
- **Metadata Agent:** Translates output into valid YAML schemas and markdown nodes.
- **Validation Agent:** An integrity guard enforcing semantic rules and YAML validation, blocking faulty schemas from reaching persistent storage.

### 2. Query Loop (Knowledge Promotion)
Only approved workgroup members can query the wiki. Over time, answers to powerful questions can be permanently **Promoted**.
- If a query generates deep comparative insight, strategic synthesis, or uncovers a critical gap, a member promotes it directly to a standing `/wiki/` page or files it as a newly synthesized source to be re-ingested.
- Stale query outputs left unpromoted longer than 30 days are automatically archived.

### 3. Reconciliation (Equilibration)
A periodic LLM administrative task serving as a "Conflict Pass":
1. Triggers deep snapshots to `/wiki/history/` before overwrites.
2. Identifies contradictions and stages them using the Contradiction Resolution Protocol.
3. Automatically evaluates PLU score shifts across the portfolio, conditionally adding events to `salience_history`.
4. Calculates global variance factors like `perception_divergence_score`.
5. Re-evaluates all known Relationship ties against explicit Lifecycle Triggers.
6. Stages any low-confidence updates (`< 85`) directly to `/wiki/drafts/` demanding a human eye.

### 4. Health Check (Linting)
An automated, proactive scanner flagging data inconsistencies:
- Orphans, unengaged Defensive blocks, contested categorical boundaries.
- **Stalled Paths:** Negotiation channels frozen for > 90 days.
- **At-Risk Paths:** Repair pipelines showing catastrophic drops in the `Reciprocity Index`.
- **Coalition Risk:** Highly Defensive nodes forming 2+ peripheral S-S coalitions.
- **Upgrade Prompts:** Notification to trigger 'Lite' to 'Full' upgrades upon hitting saturation criteria thresholds.

### 5. Contradiction Resolution Protocol
Whenever multiple ingests dispute a core fact (e.g. Stakeholder Posture is categorized as *Offensive* vs *Defensive* in two separate sources):
1. The conflicting details are extracted to `/wiki/drafts/contradictions/`.
2. Direct references to both immutable PDFs/documents are kept intact.
3. The LLM presents a "Proposed Resolution" based on recency and contextual trust, alongside an accompanying logic abstract.
4. Final workgroup approval locks the updated fact to the permanent `change_ledger.jsonl`.

### 6. Stakeholder Change Radar & Canary Ingestion
- **Change Radar:** An ongoing signal aggregator tracking RSS, News APIs, and tracked LinkedIn pages focused precisely on recognized profile identifiers. These automated nodes undergo strict relevance filters and cap outputs at a 70% max confidence value, requiring humans to vet signals before formally polluting curated data.
- **Canary Ingests:** Periodically (e.g. every 20 operations), the LLM must blindly process a known 'Canary Source' without explicit prompting. If the output varies significantly (> 15% delta) from the locked 'Golden Baseline,' the system triggers a **Drift Alert** warning of model degradation or systemic context pollution.

---

## Actionability Layer
The platform aims not just to map, but to guide relationships:
- **Presentation Export:** Simple integrations pushing the platform into boardroom-ready visual materials. This includes Marp auto-deck builders focused strictly on Top-5 Salient nodes, rapid Mermaid/D3 relationship charting, and matrix-focused CSV dumps.
- **Communication Templates:** When viewing Profiles during specific phases, dynamic AI suggestions can formulate draft emails utilizing psychological boundaries. E.g. A *Defensive* stakeholder trapped in *Negotiation* will auto-load templates framing active listening and de-escalation; an *Offensive* partner in *Execution* will trigger celebration and long-term joint opportunity frameworks.

---

## Verification & Deployment
**Progressive Onboarding Wizard**: A CLI or dynamic `setup.md` script that scales complexity dynamically for new users. Over `Week 1`, `Week 3`, and `Week 6`, complex nodes like "Value Utility Models" remain hidden unless toggled, slowly unlocking deep theoretical mapping strictly when the team is ready to comprehend them.

**AGENTS.md Regression Control**: Core prompt templates dictating LLM logic behavior are treated like code. Revisions to `AGENTS.md` force immediate unit tests against Golden Samples kept safely isolated in `/tests/`.

---

## Theoretical Grounding
This architectural design is stringently built upon peer-reviewed organizational management logic:

| Theory Foundation | Authors | Internal Schema Representation |
|---|---|---|
| Power-Legitimacy-Urgency Salience | Mitchell, Agle & Wood (1997) | Identification Module + `salience_history` |
| Dynamic Salience Evolution | Mitchell et al. (1997) | `salience_trajectory` triggers |
| Density & Firm Centrality | Rowley (1997) | `/wiki/coalitions/` + global metrics package |
| Direct/Indirect Influence Strategy | Frooman (1999) | `type` routing on distinct Coalition blocks |
| Normative vs. Instrumental | Freeman, Harrison & Wicks (2007) | Strict `engagement_basis` mapping |
| Physical Environment as Actor | Starik (1995); Driscoll (2004) | Immutable `/wiki/personas/natural-environment.md` |
| Lifecycle Contract Stages | Ring & Van de Ven (1994) | `lifecycle_stage` + formal transitions |
| Internal Dominant Tensions | Cyert & March (1963) | Differential `perception_divergence_score` |
| Deep Organizational Justice | Donaldson & Preston (1995) | Tripartite Fairness Metrics *(Dist, Proc, Int)* |
| Communal / Reciprocal Tracking | Huxham & Vangen (2005) | Moving `Reciprocity Index` value model |

---

## Product Layer (Missing Sections)

The preceding sections define a world-class data and theoretical architecture. The following sections define what is required to make that architecture a **viable, innovative product**. These sections address the gaps between a well-designed knowledge system and something a workgroup can actually deploy, scale, and trust.

---

### Section A: Interface & User Experience (UX)

The design must specify *how* users interact with the wiki. Without an interface definition, the system remains a research prototype inaccessible to non-technical strategists or executives.

**Recommended Interface Model:** A lightweight web application (or VS Code / Obsidian plugin as a fallback) with three primary views:

| View | Purpose |
|---|---|
| **Network Graph** | Interactive D3/Mermaid visualization of all stakeholder nodes and relationship edges. Filterable by posture, salience class, lifecycle stage, and coalition. |
| **Triage Inbox** | A prioritized review queue for `confidence < 85` drafts, contradiction files, and canary drift alerts. Surfaces only items requiring human decision. |
| **Query Interface** | A chat-style window for workgroup queries against the wiki. Displays source citations and includes a one-click "Promote to `/wiki/queries/`" action. |

**Guiding UX Principle:** Every destructive action (merge, archive, approve) must display the delta — what is changing and what it was before — before confirmation. The UI is the last line of defense against rubber-stamp approvals.

---

### Section B: Retrieval Strategy — Index-Guided, Not Embedding-Based

**This system is not a RAG system.** The pre-synthesized wiki *replaces* embedding-based retrieval. Rather than re-deriving knowledge from raw chunks at query time, the LLM navigates the wiki through a structured index — reading `wiki/index.md` first to locate relevant persona, relationship, and coalition files, then loading only those files into context. The synthesis is already done; the LLM is navigating a compiled knowledge base, not reconstructing one on every call.

This is the design's core differentiator. Embedding infrastructure adds complexity and reintroduces the "chunk retrieval" dynamic the wiki architecture deliberately avoids. At the target workgroup scale (~50–150 stakeholder profiles, ~100 source documents), `wiki/index.md` is the retrieval layer — and it's domain-meaningful rather than cosine-similar.

**Retrieval flow per workflow:**

| Workflow | How the LLM Finds Relevant Files |
|---|---|
| **Ingest** | Reads `wiki/index.md` to identify existing personas matching the new source. Loads only those files + their direct relationship files. |
| **Reconciliation** | Reads the `change_ledger.jsonl` recency log to scope to recently-modified profiles + all active contradiction files. |
| **Query** | Reads `wiki/index.md` catalog, selects relevant pages by salience class and topic match, loads them into context. High-value answers are promoted back to the wiki. |
| **Health Check / Lint** | Rule-based script scan over the full wiki directory — no LLM context required. |

**How `qmd` Scales the Search**
The index-guided approach works well for initial scaling. However, when the wiki expands beyond what a single index file can manage, [`qmd`](https://github.com/tobi/qmd) is introduced as a local search engine specifically designed for markdown files. It replaces generic RAG systems with several specific features:

- **Hybrid Search:** It combines BM25 (keyword-based) and vector search (semantic-based) to find relevant pages more accurately than simple embedding lookups.
- **LLM Re-ranking:** It uses an LLM to re-rank search results, ensuring the most contextually relevant information is presented for the final answer.
- **On-Device Operation:** Unlike many cloud-based RAG platforms, `qmd` runs entirely on-device, maintaining the privacy and local nature of the wiki.
- **Native Tool Integration:** Rather than a user manually uploading files to a "black box" RAG system, `qmd` provides a CLI (Command Line Interface) and an MCP server. This allows the LLM agent to "shell out" to the tool or use it as a native function to search the wiki codebase itself.

In summary, while traditional RAG treats documents as static data to be fetched, `qmd` acts as a high-performance search layer over a persistent, compounding codebase that the LLM has already organized and cross-referenced.

---

### Section C: Data Governance, Privacy & Compliance

Mapping named individuals — their posture, influence scores, interpersonal standing, and manager perceptions — constitutes personal data under GDPR Art. 4(1) and analogous frameworks (CCPA, UK DPA). The wiki cannot be deployed in any organizational context without an explicit governance model.

#### C.1 Role-Based Access Control (RBAC)

| Role | Permissions |
|---|---|
| **Admin** | Full read/write. Can approve contradictions, run Reconciliation, edit `AGENTS.md`. |
| **Analyst** | Read all profiles. Can initiate Ingests. Cannot approve contradiction resolutions or view `perception_divergence_score`. |
| **Executive / Viewer** | Read-only. Sees only Lite profiles and the top-level network graph. `Managerial Perception Log` is hidden. |
| **System Agent** | Write access scoped strictly to `confidence ≥ 85` auto-merge targets. All others staged to `/wiki/drafts/`. |

RBAC rules must be declared in `AGENTS.md` and enforced at the interface and API layers.

#### C.2 PII Handling Rules

- Every persona file must carry a `pii_classification` field: `Public Figure | Semi-Public | Private Individual`.
- `Private Individual` profiles require explicit legal basis documentation (Art. 6 GDPR) stored in `/wiki/personas/<id>/legal_basis.md`.
- The Health Check Linter flags any `Private Individual` profile that has been stale (no ingest event) for more than **180 days** as a `pii_review_required` item.

#### C.3 Data Retention & Deletion

- **Right to Erasure (GDPR Art. 17):** A `DELETE <persona-id>` workflow must cascade through all relationship files, coalition files, change ledger entries, and source cross-references. A tombstone entry must be written to `change_ledger.jsonl` confirming deletion.
- **Retention Policy:** All source files in `/sources/` must carry an `expires_on` metadata tag. The Health Check Linter surfaces expired sources for archival or deletion.

---

### Section D: CRM & External System Integration

A stakeholder wiki that only consumes public signals (RSS, news) misses the most critical data: internal emails, CRM meeting notes, deal stage shifts, and support ticket sentiment. Without integration into systems of record, the wiki's intelligence remains permanently disconnected from operational reality.

**Recommended Integration Architecture:**

```text
CRM (Salesforce / HubSpot)  ──→  Ingestion API (webhook endpoint)
Internal Email / Calendar    ──→  Ingestion API
Slack / Teams Channels       ──→  Ingestion API (opt-in channels only)
                                        ↓
                              /sources/inbox/  (staged, not auto-merged)
                                        ↓
                              Standard Ingest Pipeline
```

**Outbound push** (optional, high-value): After Reconciliation, write the top-level `posture`, `salience_class`, and `lifecycle_stage` back to the CRM contact record as custom fields. This embeds wiki intelligence where field teams already work.

**Trust Tier:** All CRM and email-sourced signals must be tagged `source_type: internal_crm` and capped at a default confidence ceiling of **80** (below the auto-merge threshold of 85), requiring human validation before finalizing. This prevents unvetted internal speculation from polluting the permanent profile.

---

### Section E: Human Inbox Prioritization & Alert Fatigue Prevention

The current design surfaces multiple alert classes to the workgroup: low-confidence drafts, contradictions, canary drift alerts, orphans, stalled lifecycle paths, coalition risks, and Lite-to-Full upgrade prompts. At scale, this inbox becomes overwhelming. Users will start approving blindly, defeating the entire human-in-the-loop rationale.

**Solution: Tiered Severity Model**

Assign every pending item in `/wiki/drafts/` and the triage inbox a severity tier on creation:

| Tier | Criteria | SLA | Auto-Resolution |
|---|---|---|---|
| **P1 — Critical** | Contradiction on a `Definitive` stakeholder. Canary drift > 15%. | Review within 24h. No auto-resolution. | ❌ |
| **P2 — Important** | Low-confidence update on an `Expectant` stakeholder. Stalled Negotiation path. | Review within 7 days. | ❌ |
| **P3 — Routine** | Lite-profile on a `Latent` stakeholder. Orphan with no relationships. | Review within 30 days. | ✅ Auto-archive on expiry. |
| **P4 — Informational** | Upgrade prompts, completed canary passes, index refreshes. | No SLA. | ✅ Auto-dismiss after 14 days. |

The triage inbox **defaults to P1/P2 view only**. P3/P4 items are accessible but collapsed. This ensures the human eye sees only what genuinely requires strategic judgment.

**TTL Auto-Resolution Rules** (written to `AGENTS.md`):
- P3 items unreviewed after 30 days → auto-archive with `disposition: timed_out` logged to `change_ledger.jsonl`.
- Contradiction files where both conflicting sources are `source_type: Change_Radar` (auto-deposited) and confidence delta < 5% → auto-resolve to the more recent source, log as P4.

---

### Section F: Multi-Tenancy & Team Collaboration

The design references a single workgroup operating a single wiki. Real deployments require a team collaboration model.

**Recommended Model:**

- **Namespace Isolation:** Each workgroup (e.g., "Product Strategy", "Government Affairs") operates a separate wiki namespace. Shared stakeholders (e.g., a major regulator) can be linked across namespaces as `cross-namespace references` but owned by the primary namespace.
- **Attribution:** Every ingest event, contradiction resolution, and manual edit is attributed to a named user in `change_ledger.jsonl`. This is non-optional — anonymous wiki edits undermine accountability.
- **AGENTS.md Inheritance:** A global `AGENTS.md` defines organization-wide scoring rules. Workgroups can maintain a local override file (`AGENTS.local.md`) for namespace-specific thresholds, but cannot override the global PII or RBAC rules.
- **Collaborative Contradiction Resolution:** Multiple team members can comment on a contradiction file before the Admin locks a final resolution. Comments are stored in the contradiction file and preserved in `change_ledger.jsonl`.

---

### Section G: Temporal View & Relationship Health Dashboard

The `salience_history` list, `change_ledger.jsonl`, and `Reciprocity Index` trend field collectively constitute a rich time-series. The current design does not surface this data as a visual layer, which leaves one of the most compelling insights — *how relationships evolve over time* — invisible.

**Required Output: Relationship Health Timeline**

A per-stakeholder timeline chart (generated on query or export) showing:
- `salience_class` migrations plotted over months.
- `Reciprocity Index` as a continuous line graph.
- `lifecycle_stage` transitions as labeled markers.
- Ingest events as vertical tick marks (with hover detail linking to source file).

This timeline is the single most compelling boardroom artifact the system can produce: it shows *why* a relationship is where it is, not just *where* it is. It also provides the evidentiary backbone for any strategic recommendation.

**Implementation:** Generate as a standalone SVG/HTML chart from `change_ledger.jsonl` using a lightweight script (e.g., Python + `altair` or `plotly`). Output path: `/wiki/personas/<id>/timeline.html`.

---

### Section H: Outcome Feedback Loop

The Communication Templates layer generates draft engagement communications based on current posture and lifecycle stage. The design stops there. Without closing the loop — recording what was actually sent and what the outcome was — the system cannot evaluate whether its recommendations are working. It generates intelligence it can never learn from.

**Required: Outcome Tagging Workflow**

After an engagement action (meeting held, email sent, proposal delivered), a workgroup member files a brief outcome record:

```yaml
# /sources/outcomes/2026-04-10-meeting-jane-doe.yaml
stakeholder_id: jane-doe
date: "2026-04-10"
action_type: "Meeting"
template_used: "defensive-negotiation-deescalation"
outcome: "Positive — stakeholder agreed to extend timeline"
outcome_class: "Cooperative_Signal"  # Cooperative_Signal | Neutral | Conflict_Signal
filed_by: "analyst@firm.com"
```

This outcome file is fed into the standard Ingest Pipeline. The Scoring Agent uses `outcome_class` as a high-trust signal for updating `Reciprocity Index` and `Cooperative Potential`. Over time, the system accumulates a dataset of its own recommendations vs. real-world outcomes — the foundation of genuine compounding intelligence.

---

### Section I: AGENTS.md Governance

`AGENTS.md` governs all LLM scoring logic, transition rules, RBAC definitions, and confidence thresholds. A single unreviewed edit can silently corrupt every future ingest. The document that governs the system must itself be governed.

**Required Controls:**

| Control | Implementation |
|---|---|
| **Semantic Versioning** | `AGENTS.md` carries a `schema_version: 2.1.0` header. Every substantive change increments the minor version. Breaking changes increment the major version. |
| **Change-Approval Gate** | Edits to `AGENTS.md` require a pull-request approved by at least one Admin role holder. No direct commits to main. |
| **Automatic Regression Test** | Every merge to `AGENTS.md` triggers the full golden-sample test suite in `/tests/`. A failing test blocks the merge. |
| **Changelog** | An append-only `AGENTS_changelog.md` records the date, author, version, and plain-language summary of every change. |
| **Version Tracking in Ledger** | Every `change_ledger.jsonl` entry includes the `agents_version` active at the time of the ingest. This enables forensic auditing: "did the scoring change after the v2.1 update?" |

---

### Section J: Minimum Viable Product (MVP) Scope

The full design is the destination, not the launch point. Without a defined MVP, the project risks permanent design-phase paralysis. The following scopes the smallest version that delivers real, demonstrable value to a workgroup.

**MVP: The Ingest-First Wiki (Target: Week 4)**

| Component | Included in MVP |
|---|---|
| Directory structure (`/sources/`, `/wiki/`, `AGENTS.md`) | ✅ |
| Ingest pipeline (Extraction + Scoring + Metadata + Validation agents) | ✅ |
| **Module 1 only** (Identification: Power, Legitimacy, Urgency + Posture) | ✅ |
| Lite Profile schema | ✅ |
| `change_ledger.jsonl` + `/wiki/history/` snapshots | ✅ |
| CLI trigger for manual ingest | ✅ |
| Plain-text `wiki/index.md` output | ✅ |
| Health Check linter (orphan + stalled path detection) | ✅ |
| Modules 2, 3, 4 (Value, Network, Coalitions) | ❌ Post-MVP |
| Full Profile schema | ❌ Post-MVP |
| Reconciliation / Conflict Pass | ❌ Post-MVP |
| `qmd` local search integration | ❌ Post-MVP (required for scale beyond index limits) |
| Web UI / Network Graph | ❌ Post-MVP |
| CRM Integration | ❌ Post-MVP |
| Multi-tenancy / RBAC | ❌ Post-MVP (required before any shared deployment) |

**MVP Success Criterion:** A workgroup can ingest 10 source documents, review the resulting Lite profiles in plaintext, and trust that contradictions are staged for review rather than silently merged. The system is boring and correct before it is smart and complete.

**Post-MVP Priority Order:**
1. `qmd` local search integration (unlocks scale using hybrid search)
2. RBAC + PII governance (unlocks enterprise/team deployment)
3. Modules 2–4 + Full Profile (unlocks deeper intelligence)
4. Reconciliation pass (unlocks compounding)
5. Web UI + Timeline view (unlocks adoption)
6. CRM integration + Outcome feedback loop (unlocks compounding intelligence loop)

