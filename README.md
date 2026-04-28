# OpenCoreStakeHoldersWiki

The **OpenCoreStakeHoldersWiki** is a persistent, compounding knowledge base for innovation workgroups to map and manage stakeholder relationships. It was born from the intersection of stakeholder theory and the emerging LLM wiki pattern — a synthesis that makes sophisticated stakeholder analysis accessible to AI-augmented teams.

---

## The Origin Story

This project has three roots:

### 1. The Agalmic Commons Discussion

The project began in a conversation within the Agalmic Commons — a group exploring how to accelerate innovation for the public good. A recurring challenge surfaced: teams struggle to systematically map and track stakeholder relationships. Most stakeholder analysis happens in spreadsheets, slide decks, or consultant reports that become obsolete the moment they're created. The group saw a need for a **persistent, compounding** knowledge base that grows more valuable over time — not a point-in-time snapshot, but an evolving understanding of who matters, why they matter, and how to engage them.

### 2. Andrej Karpathy's LLM Wiki Pattern

Around the same time, Andrej Karpathy shared an idea that would become the project's architectural foundation: the **LLM Wiki** pattern (see [`core/books/LLMWiki/idea.md`](https://github.com/andrejkarpathy/llm-wiki)). The core insight is that LLMs can do what humans abandon — the tedious bookkeeping of maintaining a knowledge base. Instead of retrieving from raw documents at query time (the RAG model), an LLM incrementally builds and maintains a persistent wiki: updating entity pages, noting contradictions, strengthening synthesis. The knowledge is compiled once and kept current.

Karpathy's vision spans contexts: personal knowledge building, research, competitive analysis, team wikis. Stakeholder management is a natural fit — every new article, interaction, and data point should update the stakeholder picture, not start from scratch.

### 3. Stakeholder Theory as the Frame

Both threads needed a theoretical anchor. The project draws on established stakeholder theory:

- **PLU Salience** *(Mitchell, Agle & Wood 1997)* — Power, Legitimacy, Urgency classification
- **Posture Framework** — Strategic stance (Offensive/Defensive/Swing/Hold)
- **Relationship Lifecycle** — Scouting → Negotiation → Commitment → Execution → Repair
- **Coalition Typology** *(Frooman 1997)* — Direct/Indirect × Use/Withhold

This is what makes the wiki a stakeholder knowledge base, not just a general-purpose wiki. The LLM doesn't just file information — it scores, classifies, and reasons about stakeholder dynamics.

---

## Two Integrated Components

The project has two components that work together:

### 1. The LLM Wiki (`wiki/`)

The compounding intelligence layer. An AI agent of your choice reads raw documents, evaluates evidence, and incrementally builds structured stakeholder profiles. The schema rules, scoring logic, and workflow are defined in `AGENTS.md` (machine-readable) and `OPENCODE.md` (human-readable).

### 2. The Quartz 4 Site (`site/`)

The published face of the wiki — a browsable, graph-navigable web interface. It renders the stakeholder knowledge base as a static site using [Quartz](https://quartz.jzhao.xyz) v4.

We chose Quartz 4 for three reasons: it's open source, built in JavaScript/TypeScript (easy to extend), and has a vibrant plugin ecosystem. You can customize components, add plugins, and build on the community's work.

---

## LLM Agnostic

This project is **LLM agnostic**. You bring your own LLM:

- **Cloud LLMs**: OpenAI, Anthropic, Google Gemini, xAI, Mistral, etc.
- **Local LLMs**: Ollama, LM Studio,GPT4All, llama.cpp, etc.
- **CLI Agents**: OpenCode, Claude Code, OpenAI Codex, etc.

To switch LLMs, update the reference in `AGENTS.md` and `OPENCODE.md` to point to your chosen LLM's documentation. The schema is LLM-agnostic — any LLM that can read/write markdown and follow instructions can power the wiki.

The LLM reads the schema, ingests sources, writes profiles, and maintains the wiki. You choose the LLM; the workflow stays the same.

---

## Directory Structure

```
OpenCoreStakeHoldersWiki/
├── site/                        # Quartz 4 static site
│   ├── content/                # Published knowledge base
│   │   ├── concepts/         # PLU salience, posture, lifecycle
│   │   ├── personas/        # Sample persona profiles
│   │   ├── groups/         # Sample organization profiles
│   │   ├── queries/        # Query templates
│   │   └── index.md       # Site homepage
│   ├── quartz/               # Quartz framework + custom components
│   ├── quartz.config.ts    # Site configuration
│   ├── quartz.layout.ts   # Layout + component placement
│   └── package.json
│
├── wiki/                        # LLM-generated profiles (live wiki)
├── raw/                         # Source documents for ingestion
├── AGENTS.md                     # LLM governance rules
├── OPENCODE.md                   # Human-readable schema + workflows
└── README.md (this file)
```

---

## The Quartz Site

### What It Does

The Quartz site renders stakeholder knowledge as a browsable, interactive web interface:

- **Graph view** — visual map of stakeholder relationships
- **StakeholderCard** — sidebar showing PLU salience class, posture, engagement basis, lifecycle stage
- **Full-text search** — find any stakeholder or concept instantly
- **Tag explorer** — navigate by category, concept, or salience class
- **Dark mode** — built-in light/dark theme
- **Backlinks** — see which profiles reference a given entity

### Graph Salience Colors

Graph nodes are colored by salience class:

| Class | Color | Hex |
|---|---|---|
| Definitive | pink | `#f38ba8` |
| Dominant | orange | `#fab387` |
| Dangerous | mauve | `#cba6f7` |
| Dependent | teal | `#94e2d5` |
| Dormant | blue | `#89b4fa` |
| Discretionary | yellow | `#f9e2af` |
| Demanding | rosewater | `#eba0ac` |
| Latent | gray | `#6c7086` |

### Profile Frontmatter

Each stakeholder note uses structured YAML frontmatter:

```yaml
---
title: "Name"
type: persona | group
salience_class: Definitive | Dominant | Dangerous | Dependent | Dormant | Discretionary | Demanding | Latent
posture: Offensive | Defensive | Swing | Hold
engagement_basis: Normative | Instrumental | Contractual | Descriptive
lifecycle_stage: Scouting | Negotiation | Commitment | Execution | Repair
profile_tier: Lite | Full
---
```

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

## Key Stakeholder Theory Concepts

- **PLU Salience** *(Mitchell, Agle & Wood 1997)* — Power, Legitimacy, Urgency
- **Posture Framework** — Strategic stance from cooperative/harmful potential
- **Relationship Lifecycle** — Scouting → Negotiation ��� Commitment → Execution → Repair
- **Coalition Typology** *(Frooman 1997)* — S-S ties (Direct/Indirect × Use/Withhold)

See `site/content/concepts/` for full documentation.

---

## Documentation

- **Project governance**: `AGENTS.md`, `OPENCODE.md`
- **LLM Wiki pattern**: [`core/books/LLMWiki/idea.md`](https://github.com/andrejkarpathy/llm-wiki)
- **Quartz setup**: `site/README.md`
- **Quartz docs**: [quartz.jzhao.xyz](https://quartz.jzhao.xyz)

---

## Contributing

Open to contributions. Propose improvements to `AGENTS.md`, `OPENCODE.md`, or the Quartz site components. This is a community-driven effort to make stakeholder analysis compounding and AI-augmented.