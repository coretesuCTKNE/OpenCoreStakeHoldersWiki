# OpenCoreStakeHoldersWiki

The **OpenCoreStakeHoldersWiki** is a persistent, compounding knowledge base for innovation workgroups to map and manage stakeholder relationships. It was born from the intersection of stakeholder theory and the emerging LLM wiki pattern — a synthesis that makes sophisticated stakeholder analysis accessible to AI-augmented teams.

---

## The Origin Story

This project has three roots:

### 1. The Agalmic Commons Discussion

The project began in a conversation within the Agalmic Commons — a group exploring how to accelerate innovation for the public good. A recurring challenge surfaced: teams struggle to systematically map and track stakeholder relationships. Most stakeholder analysis happens in spreadsheets, slide decks, or consultant reports that become obsolete the moment they're created. The group saw a need for a **persistent, compounding** knowledge base that grows more valuable over time — not a point-in-time snapshot, but an evolving understanding of who matters, why they matter, and how to engage them.

### 2. Andrej Karpathy's LLM Wiki Pattern

Around the same time, Andrej Karpathy shared an idea that would become the project's architectural foundation: the **LLM Wiki** pattern (see [karpathy/llm-wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)). The core insight is that LLMs can do what humans abandon — the tedious bookkeeping of maintaining a knowledge base. Instead of retrieving from raw documents at query time (the RAG model), an LLM incrementally builds and maintains a persistent wiki: updating entity pages, noting contradictions, strengthening synthesis. The knowledge is compiled once and kept current.

Karpathy's vision spans contexts: personal knowledge building, research, competitive analysis, team wikis. Stakeholder management is a natural fit — every new article, interaction, and data point should update the stakeholder picture, not start from scratch.

### 3. Stakeholder Theory as the Frame

Both threads needed a theoretical anchor. The project draws on established stakeholder theory:

- **PLU Salience** *(Mitchell, Agle & Wood 1997)* — Power, Legitimacy, Urgency classification
- **Posture Framework** — Strategic stance (Offensive/Defensive/Swing/Hold)
- **Relationship Lifecycle** — Scouting → Negotiation → Commitment → Execution → Repair
- **Coalition Typology** *(Frooman 1997)* — Direct/Indirect × Use/Withhold

This is what makes the wiki a stakeholder knowledge base, not just a general-purpose wiki. The LLM doesn't just file information — it scores, classifies, and reasons about stakeholder dynamics.

---

## Key Design Objectives

1. **Resilience** — Prevent and detect LLM error propagation through structured auditing, canary ingests, regression testing, and field-level change ledgers.
2. **Accessibility** — Reduce cognitive overhead with progressive schema disclosure and tiered (Lite vs. Full) stakeholder profiles.
3. **Actionability** — Move beyond passive dashboards with proactive contradiction resolution workflows, query-based knowledge promotion loops, and generated stakeholder communication templates.

---

## Architecture

We follow a **Linked Network** approach where the LLM maintains a directory of interrelated markdown and YAML files. All cross-references, contradictions, and theoretical metrics are kept current through automated workflows, ensuring the system functions as a true compounding intelligence base.

### Directory Structure

```
OpenCoreStakeHoldersWiki/
├── site/                        # Quartz 4 static site
│   ├── content/                # Published knowledge base
│   ├── quartz/                 # Quartz framework + custom components
│   ├── quartz.config.ts    # Site configuration
│   ├── quartz.layout.ts   # Layout + component placement
│   └── package.json
│
├── wiki/                        # LLM-generated profiles (live wiki)
│   ├── projects/              # Internal projects and initiatives
│   ├── personas/              # Individual/entity profiles
│   ├── groups/                # Organization profiles
│   ├── relationships/         # Dyadic relationship files
│   ├── coalitions/            # S-S coalition files
│   ├── concepts/             # Theory/concept pages
│   ├── summaries/            # Source summaries
│   ├── queries/              # Promoted query outputs
│   └── history/              # Timestamped pre-reconciliation snapshots
│
├── raw/                         # Source documents for ingestion
├── AGENTS.md                     # Machine-readable LLM governance rules
├── OPENCODE.md                   # Human-readable workflow guide + schema
└── README.md (this file)
```

---

## The Relational Schema

The wiki uses a multi-modular, **progressively disclosed** schema. Workgroups enable modules over time rather than adopting the full theoretical weight on day one.

### Profile Tiering: Lite vs. Full

Not every stakeholder requires exhaustive profiling on first contact.

- **Lite Profile:** Created on first mention. Contains minimal routing details (Name, Class, Engagement Basis, Posture, and notes).
- **Full Profile:** Triggered when the stakeholder's salience reaches Expectant or Definitive, or when manually escalated. Contains the full 4-module schema.

Every scored metric must carry an evidence string tag (`Strong | Moderate | Weak`) and the total number of independent sources backing that score.

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

- **Coalition Files** (`/wiki/coalitions/`): First-class Stakeholder-to-Stakeholder (S-S) ties built on Frooman's typology (Direct/Indirect × Use/Withhold strategies).
- **Institutional Environment**: Contextual indicators tracking "Varieties of Capitalism".
- **Primordial Stakeholder (Nature)**: Reserved entity tracking ecological impact.

---

## Two Integrated Components

### 1. The LLM Wiki (`wiki/`)

The compounding intelligence layer. An AI agent of your choice reads raw documents, evaluates evidence, and incrementally builds structured stakeholder profiles. The schema rules, scoring logic, and workflow are defined in `AGENTS.md` (machine-readable) and `OPENCODE.md` (human-readable).

### 2. The Quartz 4 Site (`site/`)

The published face of the wiki — a browsable, graph-navigable web interface. It renders the stakeholder knowledge base as a static site using [Quartz](https://quartz.jzhao.xyz) v4.

---

## LLM Agnostic

This project is **LLM agnostic**. You bring your own LLM:

- **Cloud LLMs**: OpenAI, Anthropic, Google Gemini, xAI, Mistral, etc.
- **Local LLMs**: Ollama, LM Studio, GPT4All, llama.cpp, etc.
- **CLI Agents**: OpenCode, Claude Code, OpenAI Codex, etc.

To switch LLMs, update the reference in `AGENTS.md` and `OPENCODE.md` to point to your chosen LLM's documentation. The schema is LLM-agnostic — any LLM that can read/write markdown and follow instructions can power the wiki.

---

## Lifecycle Transition Rules

Transitions between relationship lifecycle stages are strictly governed by explicitly defined, machine-readable evidence requirements located in `AGENTS.md`.

| Transition                   | Trigger Criteria                                          | Required Evidence                 |
| ---------------------------- | --------------------------------------------------------- | --------------------------------- |
| **Scouting → Negotiation**   | First formal meeting, proposal, or direct outreach.       | Transcript, email, calendar entry |
| **Negotiation → Commitment** | Signed agreement, MOU, or public partnership.             | Document signature, announcement  |
| **Commitment → Execution**   | First joint activity completed or resource transacted.    | Activity log, delivery receipt    |
| **Execution → Repair**       | Breach of agreement, public conflict, or drop in KPIs.    | Incident report, news article     |
| **Repair → Dissolution**     | No logged interaction for 180 days after a Repair logged. | Absence of logs, termination note |

---

## Running the Site

```bash
cd site
npm install
npm run dev      # serve locally at localhost:8080
npm run build   # build for production → public/
```

The `site/public/` directory is the production build output (gitignored).

---

## Relationship: LLM Wiki ↔ Quartz Site

The LLM wiki and Quartz site are **separate but related**:

- **LLM wiki** (`wiki/`): The live, agent-maintained knowledge base. The `AGENTS.md` schema governs how the LLM ingests sources, evaluates evidence, and writes profiles.
- **Quartz site** (`site/`): A static snapshot rendered as a web interface.

The Quartz site does **not** run the LLM. It is a static site generator. To keep them in sync, run periodic ingests to update `site/content/` from `wiki/`, then rebuild.

See `OPENCODE.md` for the full workflow documentation.

---

## Bundled AI Agent Skills

This repository bundles custom LLM agent skills in the `.agents/skills/` directory. If your agent supports local workspace skills, these will load automatically:

1. **core_intelligence_researcher**: Automates search and extraction of deep stakeholder data from the web, formatting it for the `raw/inbox/`.
2. **linkedin-profile-scraper**: Pulls structured professional histories and organizational data for targeted personas.
3. **pdf-to-markdown**: Cleans and transforms complex policy PDFs, reports, or contracts into semantic markdown for high-accuracy agent ingestion.
4. **marp-slide**: Synthesizes wiki profiles into ready-to-present Markdown presentation slides for stakeholder briefings.

---

## Documentation

- **Project governance**: `AGENTS.md`, `OPENCODE.md`
- **LLM Wiki pattern**: [karpathy/llm-wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- **Quartz setup**: `site/README.md`
- **Quartz docs**: [quartz.jzhao.xyz](https://quartz.jzhao.xyz)

---

## License

This project is open source licensed under the **Agalmic Commons License (ACL) v1.0**.

See [`LICENSE_DIR/agalmic_commons_license_v1.0_en.md`](LICENSE_DIR/agalmic_commons_license_v1.0_en.md) for the full license text.

The ACL is designed to accelerate innovation for the public good while actively preventing the extraction and exploitation of people, knowledge, and territories. It bridges the gap between permissive open source development and ethical, commons-based usage.

---

## Contributing

Open to contributions. Propose improvements to `AGENTS.md`, `OPENCODE.md`, or the Quartz site components. This is a community-driven effort to make stakeholder analysis compounding and AI-augmented.
