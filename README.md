# OpenCoreStakeHoldersWiki

The **OpenCoreStakeHoldersWiki** is a persistent, compounding knowledge base designed for innovation workgroups to map and manage stakeholder relationships. 

Unlike traditional RAG systems that passively retrieve chunks, this framework acts as a continuous engine: it uses an LLM to incrementally build a structured, interlinked wiki synthesizing "Names and Faces" individuals, organizations, and their interconnections based on deep **Stakeholder Theory** and **Relational Management** principles.

---

## 🎯 Key Design Objectives

1. **Resilience** — Prevent and detect LLM error propagation through structured auditing, canary ingests, regression testing, and field-level change ledgers.
2. **Accessibility** — Reduce cognitive overhead with progressive schema disclosure and tiered (Lite vs. Full) stakeholder profiles.
3. **Actionability** — Move beyond passive dashboards with proactive contradiction resolution workflows, query-based knowledge promotion loops, and generated stakeholder communication templates.

---

## 🏗 Architecture

We follow a **Linked Network** approach where the LLM maintains a directory of interrelated markdown and YAML files. All cross-references, contradictions, and theoretical metrics are kept current through automated workflows, ensuring the system functions as a true compounding intelligence base.

### Directory Structure

```text
/raw/inbox/                            # Staging area for new signals (auto-deposits)
/wiki/groups/                          # Profiles for institutions, startups, businesses
/wiki/personas/                        # Profiles for specific individuals ("Names and Faces")
/wiki/relationships/                   # Dyadic analysis files (firm-to-stakeholder)
/wiki/coalitions/                      # Stakeholder-to-Stakeholder ties and coalitions
/wiki/history/                         # Timestamped snapshots before each Reconciliation pass
/wiki/drafts/                          # Staged updates awaiting human approval
/wiki/queries/                         # Promoted query outputs filed as wiki pages
/wiki/logs/                            # Append-only chronological record of ingests
/wiki/canary_baseline/                 # Golden outputs for drift-detection re-ingests

/tests/golden_sources/                 # Known source files with pre-defined expected outputs
/tests/golden_outputs/                 # Baseline ingest results for semantic diffing

AGENTS.md                              # "Source of Truth" for LLM operations and schema rules
OPENCODE.md                            # Human-readable workflow guide and schema definitions
```

---

## 🧩 The Relational Schema

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
- **Salience Trajectory**: A `salience_history` list tracks class migrations (Latent → Expectant → Definitive).

### Module 2: Strategizing (Posture & Behavior)
Guides engagement modes based on strategic orientation.
- **Posture Tags**: Offensive (High Potential / Low Threat), Defensive (High Threat / Low Potential), Swing (High Both), or Hold (Low Both).

### Module 3: Value Creation & Utility
Measures the "total value" co-created in the relationship.
- **Utility Factors**: Economic Value, Affiliation (pride), and Opportunity Costs.
- **Justice Metrics**: Distributional (fair outcomes), Procedural (opinion counts), and Interactional (respectful treatment).

### Module 4: Network & Contextual
- **Coalition Files** (`/wiki/coalitions/`): First-class Stakeholder-to-Stakeholder (S-S) ties built heavily on Frooman's typology (Direct/Indirect × Use/Withhold strategies).
- **Institutional Environment**: Contextual indicators tracking differences like "Varieties of Capitalism".
- **Primordial Stakeholder (Nature)**: Reserved entity tracking ecological impact (`/wiki/personas/natural-environment.md`).

---

## 🔄 Lifecycle Transition Rules

Transitions between relationship lifecycle stages are strictly governed by explicitly defined, machine-readable evidence requirements located in `AGENTS.md`.

| Transition | Trigger Criteria | Required Evidence |
|---|---|---|
| **Scouting → Negotiation** | First formal meeting, proposal, or direct outreach. | Transcript, email, calendar entry |
| **Negotiation → Commitment** | Signed agreement, MOU, or public partnership. | Document signature, announcement |
| **Commitment → Execution** | First joint activity completed or resource transacted. | Activity log, delivery receipt |
| **Execution → Repair** | Breach of agreement, public conflict, or drop in KPIs. | Incident report, news article |
| **Repair → Dissolution** | No logged interaction for 180 days after a Repair logged. | Absence of logs, termination note |

---

## 🚀 Getting Started

1. Place your raw data inputs (PDFs, transcripts, articles) into the `/raw/inbox/` folder.
2. Provide your chosen LLM agent with the instructions from `AGENTS.md`.
3. The LLM agent will process the sources, evaluate evidence, and incrementally generate structured profiles in the `/wiki/` directory.

## 🛠 Bundled AI Agent Skills

To augment the workflow, this repository bundles four custom LLM agent skills in the `.agents/skills/` directory. If your agent supports local workspace skills (like Pi or Claude Desktop), these will load automatically to assist you:

1. **core_intelligence_researcher**: Automates the search and extraction of deep stakeholder data from the web, formatting it perfectly for the `raw/inbox/`.
2. **linkedin-profile-scraper**: Pulls structured professional histories and organizational data for targeted personas.
3. **pdf-to-markdown**: Cleans and transforms complex policy PDFs, reports, or contracts into semantic markdown for high-accuracy agent ingestion.
4. **marp-slide**: Synthesizes the generated wiki profiles into beautiful, ready-to-present Markdown presentation slides for stakeholder briefings.

---

## 🤝 Contributing

We welcome contributions! Please feel free to open issues, submit pull requests, and propose improvements to the `AGENTS.md` instructions or the relational schema.

## 📄 License

This project is licensed under the **Agalmic Commons License v1.0 (ACL-1.0)**. 

It is free and open for public good, non-profits, and small businesses, but strictly prohibits extractive, military, and human rights abuses. See the [LICENSE](./LICENSE) directory for full details in English and Spanish.
