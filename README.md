# openStakeholderWiki

**openStakeholderWiki** is an LLM-powered, compounding knowledge base framework designed to manage and map stakeholder relationships using Stakeholder Theory and Relational Management principles.

Unlike traditional RAG systems that passively retrieve chunks, this framework acts as a continuous engine: it incrementally builds a structured, interlinked wiki of individual personas, organizations, and their dynamic relationships.

## Features

- **Progressive Schema Disclosures**: Profiles grow from "Lite" to "Full" based on continued interactions.
- **PLU Assessment**: Encodes Power, Legitimacy, and Urgency as theoretical metrics mapped from evidence.
- **Data Resilience**: Mitigates LLM hallucinations and error propagation using confidence thresholds, evidence tags, and strict schema versioning.
- **Actionable Knowledge**: Provides contradiction resolution workflows, knowledge promotion loops, and generation of communication templates.

## Directory Structure

- `raw/`: Immutable raw source data (PDFs, text, articles)
- `wiki/`: LLM-generated outputs, segregated into personas, groups, relationships, coalitions, and more
- `AGENTS.md`: The machine-readable "Source of Truth" governing LLM rules, schema scoring logic, and workflows.
- `OPENCODE.md`: The human-readable workflow guide and schema definitions.
- `docs/`: Design documentation and presentation slides detailing the underlying architecture.

## Getting Started

1. Set up your raw data inputs in the `raw/inbox/` folder.
2. Provide your chosen LLM agent with the instructions from `AGENTS.md`.
3. The LLM agent will process the sources, evaluate evidence, and incrementally generate structured profiles in the `wiki/` directory.

## Contributing

We welcome contributions! Please feel free to open issues, submit pull requests, and propose improvements to the `AGENTS.md` instructions or the relational schema.

## License

MIT License. See the [LICENSE](LICENSE) file for more details.
