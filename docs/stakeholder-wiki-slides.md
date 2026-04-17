---
marp: true
theme: default
paginate: true
footer: 'MINDTEMPLE · STAKEHOLDER WIKI'
style: |
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

  :root {
    --orange: #ff6b1a;
    --orange-hover: #ff8c4a;
    --dark: #000000;
    --card: #0a0a0a;
    --border: #1a1a1a;
    --muted: #888;
    --light: #ffffff;
    --green: #22c55e;
    --red: #ef4444;
    --yellow: #f5a623;
  }

  section {
    background: var(--dark);
    color: var(--light);
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    padding: 60px 80px;
    line-height: 1.6;
  }

  h1 {
    font-family: 'Outfit', sans-serif;
    font-weight: 900;
    font-size: 3.2em;
    color: var(--orange);
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 0.2em;
  }

  h2 {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 1.9em;
    color: var(--light);
    margin-bottom: 0.4em;
  }

  h3 {
    font-family: 'Outfit', sans-serif;
    font-weight: 500;
    font-size: 0.8em;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 0.1em;
  }

  strong { color: var(--orange); font-weight: 600; }

  blockquote {
    border-left: 3px solid var(--orange);
    padding: 16px 24px;
    background: var(--card);
    border-radius: 0 8px 8px 0;
    color: var(--muted);
    font-size: 0.85em;
    margin-top: 20px;
  }

  ul, ol {
    color: var(--muted);
    font-size: 0.88em;
    line-height: 1.9;
    padding-left: 1.4em;
  }

  li::marker { color: var(--orange); }

  table {
    width: 100%;
    font-size: 0.78em;
    border-collapse: collapse;
  }

  thead th {
    font-weight: 600;
    font-size: 0.72em;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #555;
    border-bottom: 1px solid var(--border);
    padding: 8px 14px;
    text-align: left;
  }

  tbody td {
    color: var(--muted);
    padding: 10px 14px;
    border-bottom: 1px solid #0d0d0d;
  }

  tbody tr:last-child td { border-bottom: none; }

  section.lead {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: radial-gradient(ellipse at 60% 45%, #1c0a00 0%, #000 65%);
  }

  footer {
    font-family: 'Outfit', sans-serif;
    font-size: 0.48em;
    font-weight: 600;
    letter-spacing: 0.25em;
    color: #333;
    text-transform: uppercase;
  }

  .pill-row {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 22px;
  }

  .pill {
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 0.58em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 100px;
    border: 1px solid #ff6b1a33;
    color: var(--orange);
    background: #ff6b1a0a;
  }

  .card-row {
    display: flex;
    gap: 16px;
    margin-top: 24px;
  }

  .card {
    flex: 1;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px 20px;
  }

  details {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 18px;
    margin-top: 10px;
  }

  details summary {
    color: var(--orange);
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 0.78em;
    cursor: pointer;
  }

  details p {
    color: #666;
    font-size: 0.76em;
    margin-top: 8px;
    line-height: 1.7;
  }

  .tag {
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 0.55em;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 4px;
  }
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: '' -->

# Stakeholder<br>Intelligence Wiki

## An LLM-maintained knowledge graph<br>for strategic relationship management

<div class="pill-row">
  <span class="pill">mindTemple</span>
  <span class="pill">Stakeholder Theory</span>
  <span class="pill">LLM-Native</span>
  <span class="pill">2026</span>
</div>

---

### The Problem

## Stakeholder knowledge lives in people's heads

<div style="display: flex; gap: 28px; margin-top: 28px;">
  <div style="flex: 1; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 16px; padding: 28px 24px;">
    <div style="font-weight: 600; font-size: 0.7em; color: #444; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">Traditional Approach</div>
    <ul style="color: #444; font-size: 0.82em; line-height: 2.1; padding-left: 1.2em;">
      <li>CRM spreadsheets that go stale</li>
      <li>Static PowerPoints each quarter</li>
      <li>No theory — pure gut feel</li>
      <li>Context lost when people leave</li>
      <li>No audit trail of decisions</li>
    </ul>
  </div>
  <div style="flex: 1; background: #0d0500; border: 1px solid #ff6b1a22; border-radius: 16px; padding: 28px 24px;">
    <div style="font-weight: 600; font-size: 0.7em; color: #ff6b1a; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">Stakeholder Wiki</div>
    <ul style="color: #888; font-size: 0.82em; line-height: 2.1; padding-left: 1.2em;">
      <li>Linked markdown files — never stale</li>
      <li>LLM ingests and updates on demand</li>
      <li>Grounded in PLU salience theory</li>
      <li>Context is the file system</li>
      <li>JSONL change ledger — full audit</li>
    </ul>
  </div>
</div>

> Intelligence should **compound over time** — not reset with every meeting.

---

### Theoretical Foundation

## Built on Mitchell, Agle & Wood (1997)

<div class="card-row" style="margin-top: 28px;">
  <div class="card" style="text-align: center;">
    <div style="font-size: 2.4em; font-weight: 900; color: #ff6b1a; line-height: 1; margin-bottom: 12px;">P</div>
    <div style="font-weight: 700; font-size: 0.82em; margin-bottom: 8px;">Power</div>
    <p style="font-size: 0.72em; color: #555; line-height: 1.6; margin: 0;">Ability to influence the firm's decisions or outcomes</p>
  </div>
  <div class="card" style="text-align: center;">
    <div style="font-size: 2.4em; font-weight: 900; color: #ff6b1a; line-height: 1; margin-bottom: 12px;">L</div>
    <div style="font-weight: 700; font-size: 0.82em; margin-bottom: 8px;">Legitimacy</div>
    <p style="font-size: 0.72em; color: #555; line-height: 1.6; margin: 0;">Socially accepted standing in the relationship</p>
  </div>
  <div class="card" style="text-align: center;">
    <div style="font-size: 2.4em; font-weight: 900; color: #ff6b1a; line-height: 1; margin-bottom: 12px;">U</div>
    <div style="font-weight: 700; font-size: 0.82em; margin-bottom: 8px;">Urgency</div>
    <p style="font-size: 0.72em; color: #555; line-height: 1.6; margin: 0;">Time sensitivity and criticality of claims on the firm</p>
  </div>
</div>

<div style="margin-top: 20px; background: #0d0500; border: 1px solid #ff6b1a22; border-radius: 12px; padding: 16px 22px; font-size: 0.8em; color: #666; line-height: 1.7;">
  Combinations of P, L, U produce <strong>8 salience classes</strong> — Latent (0 attributes) to <strong>Definitive</strong> (all 3). Class determines profile tier, engagement posture, and monitoring frequency.
</div>

---

### Four-Module Architecture

## One relational schema. Four lenses.

<div class="card-row">
  <div class="card">
    <div style="font-weight: 900; font-size: 1.8em; color: #ff6b1a; margin-bottom: 10px;">01</div>
    <div style="font-weight: 700; font-size: 0.8em; margin-bottom: 8px;">Identification</div>
    <p style="font-size: 0.7em; color: #555; line-height: 1.6; margin: 0;">PLU scoring · salience class · profile tier (Lite → Full) · lifecycle stage</p>
  </div>
  <div class="card">
    <div style="font-weight: 900; font-size: 1.8em; color: #ff6b1a; margin-bottom: 10px;">02</div>
    <div style="font-weight: 700; font-size: 0.8em; margin-bottom: 8px;">Strategizing</div>
    <p style="font-size: 0.7em; color: #555; line-height: 1.6; margin: 0;">Posture (Offensive/Defensive/Swing/Hold) · cooperative & harmful potential · behavior scoring</p>
  </div>
  <div class="card">
    <div style="font-weight: 900; font-size: 1.8em; color: #ff6b1a; margin-bottom: 10px;">03</div>
    <div style="font-weight: 700; font-size: 0.8em; margin-bottom: 8px;">Value Creation</div>
    <p style="font-size: 0.7em; color: #555; line-height: 1.6; margin: 0;">Reciprocity index · utility scoring (economic, affiliation, opportunity cost) · justice dimensions</p>
  </div>
  <div class="card">
    <div style="font-weight: 900; font-size: 1.8em; color: #ff6b1a; margin-bottom: 10px;">04</div>
    <div style="font-weight: 700; font-size: 0.8em; margin-bottom: 8px;">Network</div>
    <p style="font-size: 0.7em; color: #555; line-height: 1.6; margin: 0;">Coalition membership · institutional environment · ecological impact · betweenness centrality</p>
  </div>
</div>

---

### File Structure

## Intelligence lives in linked markdown files

<div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 14px; padding: 26px 30px; margin-top: 20px; font-family: 'Outfit', monospace; font-size: 0.74em; line-height: 2; color: #555;">
  <div style="color: #ff6b1a; margin-bottom: 6px; font-size: 0.88em; letter-spacing: 0.08em; font-weight: 600;">stakeholdersLLMWiki / wiki /</div>
  <div style="padding-left: 20px;"><span style="color: #444;">├─</span> <span style="color: #777;">index.md</span> <span style="color: #2a2a2a; font-size: 0.85em;">— retrieval layer, not a RAG index</span></div>
  <div style="padding-left: 20px;"><span style="color: #555;">├─ <span style="color: #ff6b1a;">personas/</span></span> <span style="color: #2a2a2a; font-size: 0.85em;">— Full Profile YAML + body sections</span></div>
  <div style="padding-left: 20px;"><span style="color: #444;">├─ groups/</span> <span style="color: #2a2a2a; font-size: 0.85em;">— organization profiles</span></div>
  <div style="padding-left: 20px;"><span style="color: #444;">├─ relationships/</span> <span style="color: #2a2a2a; font-size: 0.85em;">— mindTemple ↔ stakeholder dyads</span></div>
  <div style="padding-left: 20px;"><span style="color: #444;">├─ coalitions/</span> <span style="color: #2a2a2a; font-size: 0.85em;">— stakeholder cluster tracking</span></div>
  <div style="padding-left: 20px;"><span style="color: #444;">├─ concepts/</span> <span style="color: #2a2a2a; font-size: 0.85em;">— theory definitions</span></div>
  <div style="padding-left: 20px;"><span style="color: #555;">├─ <span style="color: #ff6b1a;">logs/change_ledger.jsonl</span></span> <span style="color: #2a2a2a; font-size: 0.85em;">— field-level audit trail</span></div>
  <div style="padding-left: 20px;"><span style="color: #444;">├─ canary_baseline/</span> <span style="color: #2a2a2a; font-size: 0.85em;">— frozen snapshots for drift detection</span></div>
  <div style="padding-left: 20px;"><span style="color: #555;">└─ <span style="color: #ff6b1a;">AGENTS.md</span></span> <span style="color: #2a2a2a; font-size: 0.85em;">— machine-readable governance (schema 1.1.0)</span></div>
</div>

<p style="margin-top: 16px; font-size: 0.75em; color: #444; line-height: 1.7;">Not a database. Not a RAG system. The <strong>LLM is the writer</strong> — it ingests sources, extracts structure, and links entities into a coherent graph. The index is the only retrieval layer needed.</p>

---

### Workflow

## Three verbs. Infinite depth.

<div style="margin-top: 28px; position: relative; padding-left: 32px; border-left: 2px solid #1a1a1a;">
  <div style="margin-bottom: 28px; position: relative;">
    <div style="position: absolute; left: -39px; top: 3px; width: 12px; height: 12px; background: #ff6b1a; border-radius: 50%; border: 2px solid #000;"></div>
    <div style="font-weight: 700; font-size: 0.88em; color: #ff6b1a; letter-spacing: 0.08em;">INGEST</div>
    <div style="color: #666; font-size: 0.82em; margin-top: 4px; line-height: 1.7;">Fetch raw sources (web, LinkedIn, Wikipedia). LLM extracts YAML fields + body sections across all 4 modules. Write persona, summary, and source files. Log every field to change ledger.</div>
  </div>
  <div style="margin-bottom: 28px; position: relative;">
    <div style="position: absolute; left: -39px; top: 3px; width: 12px; height: 12px; background: #ff6b1a; border-radius: 50%; border: 2px solid #000;"></div>
    <div style="font-weight: 700; font-size: 0.88em; color: #ff6b1a; letter-spacing: 0.08em;">QUERY</div>
    <div style="color: #666; font-size: 0.82em; margin-top: 4px; line-height: 1.7;">Ask cross-cutting questions across the graph. LLM synthesizes from linked files and creates a durable query page — answers are preserved, not lost to context windows.</div>
  </div>
  <div style="position: relative;">
    <div style="position: absolute; left: -39px; top: 3px; width: 12px; height: 12px; background: #ff6b1a; border-radius: 50%; border: 2px solid #000;"></div>
    <div style="font-weight: 700; font-size: 0.88em; color: #ff6b1a; letter-spacing: 0.08em;">RECONCILE</div>
    <div style="color: #666; font-size: 0.82em; margin-top: 4px; line-height: 1.7;">Periodic conflict pass. Cross-check personas ↔ relationships. Validate lifecycle transitions. Flag PLU drift vs canary baseline. Stage contradictions. The LLM self-audits its own graph.</div>
  </div>
</div>

---

### Current State — April 2026

## The network at a glance

<div style="display: flex; gap: 14px; margin-top: 22px;">
  <div style="flex: 1; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 16px; padding: 22px 16px; text-align: center;">
    <div style="font-size: 2.6em; font-weight: 900; color: #ff6b1a; line-height: 1;">3</div>
    <div style="font-weight: 600; font-size: 0.62em; color: #444; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Active Personas</div>
    <div style="font-size: 0.6em; color: #333; margin-top: 8px; line-height: 1.6;">Ng · Karpathy<br>Kurzweil</div>
  </div>
  <div style="flex: 1; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 16px; padding: 22px 16px; text-align: center;">
    <div style="font-size: 2.6em; font-weight: 900; color: #ff6b1a; line-height: 1;">5</div>
    <div style="font-weight: 600; font-size: 0.62em; color: #444; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Group Profiles</div>
    <div style="font-size: 0.6em; color: #333; margin-top: 8px; line-height: 1.6;">DL.AI · OpenAI<br>G-Brain · Coursera · Eureka</div>
  </div>
  <div style="flex: 1; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 16px; padding: 22px 16px; text-align: center;">
    <div style="font-size: 2.6em; font-weight: 900; color: #ff6b1a; line-height: 1;">4</div>
    <div style="font-weight: 600; font-size: 0.62em; color: #444; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Relationships</div>
    <div style="font-size: 0.6em; color: #333; margin-top: 8px; line-height: 1.6;">mindTemple ↔<br>each key node</div>
  </div>
  <div style="flex: 1; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 16px; padding: 22px 16px; text-align: center;">
    <div style="font-size: 2.6em; font-weight: 900; color: #ff6b1a; line-height: 1;">21</div>
    <div style="font-weight: 600; font-size: 0.62em; color: #444; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Ledger Entries</div>
    <div style="font-size: 0.6em; color: #333; margin-top: 8px; line-height: 1.6;">JSONL field-level<br>audit trail</div>
  </div>
</div>

<div style="margin-top: 16px; display: flex; gap: 12px;">
  <div style="flex: 1; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; gap: 12px;">
    <span class="tag" style="background: #22c55e12; color: #22c55e; border: 1px solid #22c55e22; white-space: nowrap;">Definitive</span>
    <div style="font-size: 0.72em; color: #555;">All 3 active personas at highest salience class — Full Profile tier, Scouting lifecycle stage</div>
  </div>
  <div style="flex: 1; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; gap: 12px;">
    <span class="tag" style="background: #ff6b1a12; color: #ff6b1a; border: 1px solid #ff6b1a22; white-space: nowrap;">1 Coalition</span>
    <div style="font-size: 0.72em; color: #555;">AI Education Coalition — Ng + Karpathy + DL.AI + Coursera + Eureka Labs</div>
  </div>
</div>

---

### Salience Classes

## Eight outcomes from three attributes

<table>
  <thead>
    <tr>
      <th>Class</th>
      <th>P</th>
      <th>L</th>
      <th>U</th>
      <th>Profile Tier</th>
      <th>In Wiki</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Definitive</strong></td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #ff6b1a;">Full</td>
      <td style="color: #22c55e; font-size: 0.88em;">Ng · Karpathy · Kurzweil · DL.AI · OpenAI</td>
    </tr>
    <tr>
      <td style="color: #aaa;">Dominant</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #555;">—</td>
      <td style="color: #888;">Full</td>
      <td style="color: #888; font-size: 0.88em;">Google Brain · Coursera</td>
    </tr>
    <tr>
      <td style="color: #aaa;">Dangerous</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #555;">—</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #888;">Full</td>
      <td style="color: #444; font-size: 0.88em;">None identified</td>
    </tr>
    <tr>
      <td style="color: #aaa;">Dependent</td>
      <td style="color: #555;">—</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #888;">Full</td>
      <td style="color: #444; font-size: 0.88em;">None identified</td>
    </tr>
    <tr>
      <td style="color: #555;">Dormant</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #555;">—</td>
      <td style="color: #555;">—</td>
      <td style="color: #555;">Lite</td>
      <td style="color: #333; font-size: 0.88em;">—</td>
    </tr>
    <tr>
      <td style="color: #555;">Discretionary</td>
      <td style="color: #555;">—</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #555;">—</td>
      <td style="color: #555;">Lite</td>
      <td style="color: #666; font-size: 0.88em;">Eureka Labs</td>
    </tr>
    <tr>
      <td style="color: #555;">Demanding</td>
      <td style="color: #555;">—</td>
      <td style="color: #555;">—</td>
      <td style="color: #22c55e;">✓</td>
      <td style="color: #555;">Lite</td>
      <td style="color: #333; font-size: 0.88em;">—</td>
    </tr>
    <tr>
      <td style="color: #333;">Latent</td>
      <td style="color: #333;">—</td>
      <td style="color: #333;">—</td>
      <td style="color: #333;">—</td>
      <td style="color: #333;">—</td>
      <td style="color: #2a2a2a; font-size: 0.88em;">Not tracked</td>
    </tr>
  </tbody>
</table>

---

### Posture Framework

## How we engage — a 2×2 decision

<div style="display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 14px; margin-top: 20px; height: 370px;">
  <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 14px; padding: 22px 20px; position: relative;">
    <div style="font-weight: 700; font-size: 0.82em; color: #888; margin-bottom: 8px;">SWING</div>
    <p style="font-size: 0.72em; color: #555; margin: 0; line-height: 1.6;">High cooperative + High harmful. Engage carefully — mutual dependency cuts both ways.</p>
    <div style="position: absolute; bottom: 14px; right: 16px; font-size: 0.6em; color: #333; font-weight: 600;">OpenAI</div>
  </div>
  <div style="background: #0d0500; border: 1px solid #ff6b1a33; border-radius: 14px; padding: 22px 20px; position: relative;">
    <div style="font-weight: 700; font-size: 0.82em; color: #ff6b1a; margin-bottom: 8px;">OFFENSIVE</div>
    <p style="font-size: 0.72em; color: #777; margin: 0; line-height: 1.6;">High cooperative + Low harmful. Lean in. Maximize overlap, reach, and access.</p>
    <div style="position: absolute; bottom: 14px; right: 16px; font-size: 0.6em; color: #ff6b1a77; font-weight: 600;">Ng · Karpathy · Kurzweil</div>
  </div>
  <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 14px; padding: 22px 20px; position: relative;">
    <div style="font-weight: 700; font-size: 0.82em; color: #444; margin-bottom: 8px;">HOLD</div>
    <p style="font-size: 0.72em; color: #444; margin: 0; line-height: 1.6;">Low cooperative + Low harmful. Monitor passively. No active investment warranted.</p>
    <div style="position: absolute; bottom: 14px; right: 16px; font-size: 0.6em; color: #333; font-weight: 600;">Google Brain</div>
  </div>
  <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 14px; padding: 22px 20px;">
    <div style="font-weight: 700; font-size: 0.82em; color: #ef4444; margin-bottom: 8px;">DEFENSIVE</div>
    <p style="font-size: 0.72em; color: #444; margin: 0; line-height: 1.6;">Low cooperative + High harmful. Protect against. Manage risk exposure actively.</p>
  </div>
</div>

---

### Governance

## AGENTS.md — the machine-readable rulebook

<div style="display: flex; gap: 20px; margin-top: 22px;">
  <div style="flex: 3;">
    <details>
      <summary>Health Check Rules (7 rules, 4 severity tiers)</summary>
      <p>orphan · stalled_negotiation · at_risk_repair · coalition_risk · upgrade_prompt · normative_hold_contradiction · pii_stale. Severity P1 (critical, 24h) → P2 (7d) → P3 (30d) → P4 (informational).</p>
    </details>
    <details>
      <summary>Lifecycle Transition Evidence</summary>
      <p>Scouting → Negotiation → Commitment → Execution → Repair → Dissolution. Each transition requires documented evidence before the LLM may update lifecycle_stage. No forward-skipping without proof.</p>
    </details>
    <details>
      <summary>Canary Drift Detection</summary>
      <p>Frozen baseline copies of all Full Profiles stored in canary_baseline/. Delta > 15% on any scored field triggers P1 alert — forces explicit re-assessment before the update is accepted.</p>
    </details>
    <details>
      <summary>Primordial Stakeholder Rule</summary>
      <p>natural-environment.md is immutable. Every Full Profile ingest must assess ecological_impact (positive | negative | neutral | unknown). Per Starik (1995) and Driscoll & Starik (2004).</p>
    </details>
  </div>
  <div style="flex: 2; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 14px; padding: 24px 20px;">
    <div style="font-weight: 600; font-size: 0.62em; color: #444; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px;">Schema Version</div>
    <div style="font-weight: 900; font-size: 2.2em; color: #ff6b1a; line-height: 1; margin-bottom: 4px;">1.1.0</div>
    <div style="font-size: 0.68em; color: #333; margin-bottom: 22px;">Modules 1–4 defined</div>
    <div style="font-weight: 600; font-size: 0.62em; color: #444; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px;">Auto-merge Threshold</div>
    <div style="font-weight: 900; font-size: 2em; color: #fff; line-height: 1; margin-bottom: 4px;">85%</div>
    <div style="font-size: 0.68em; color: #333;">confidence required</div>
  </div>
</div>

---

### Why Not RAG

## Intelligence that writes itself

<div style="display: flex; gap: 32px; margin-top: 30px; align-items: flex-start;">
  <div style="flex: 1;">
    <div style="font-weight: 600; font-size: 0.68em; color: #444; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">RAG System</div>
    <ul style="color: #3a3a3a; font-size: 0.82em; line-height: 1; list-style: none; padding: 0;">
      <li style="padding: 10px 0; border-bottom: 1px solid #0d0d0d;">LLM retrieves at query time</li>
      <li style="padding: 10px 0; border-bottom: 1px solid #0d0d0d;">Documents are passive inputs</li>
      <li style="padding: 10px 0; border-bottom: 1px solid #0d0d0d;">Embeddings infra required</li>
      <li style="padding: 10px 0; border-bottom: 1px solid #0d0d0d;">Synthesis happens at query time</li>
      <li style="padding: 10px 0;">Context resets each session</li>
    </ul>
  </div>
  <div style="width: 1px; background: #1a1a1a; align-self: stretch; flex-shrink: 0; margin-top: 36px;"></div>
  <div style="flex: 1;">
    <div style="font-weight: 600; font-size: 0.68em; color: #ff6b1a; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px;">Stakeholder Wiki</div>
    <ul style="color: #888; font-size: 0.82em; line-height: 1; list-style: none; padding: 0;">
      <li style="padding: 10px 0; border-bottom: 1px solid #0d0d0d;"><strong>LLM writes and maintains</strong></li>
      <li style="padding: 10px 0; border-bottom: 1px solid #0d0d0d;"><strong>Files are structured knowledge</strong></li>
      <li style="padding: 10px 0; border-bottom: 1px solid #0d0d0d;"><strong>Plain markdown — zero infra</strong></li>
      <li style="padding: 10px 0; border-bottom: 1px solid #0d0d0d;"><strong>Synthesis is the ingest step</strong></li>
      <li style="padding: 10px 0;"><strong>Intelligence accumulates over time</strong></li>
    </ul>
  </div>
</div>

> Every ingest **adds a node**. Every reconciliation pass **sharpens the edges**. The wiki gets smarter without any embeddings infrastructure.

---

### Roadmap

## What comes next

<div style="display: flex; gap: 16px; margin-top: 22px;">
  <div style="flex: 1;">
    <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 14px; padding: 20px 18px; margin-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <span class="tag" style="background: #22c55e12; color: #22c55e; border: 1px solid #22c55e22;">Done</span>
        <div style="font-weight: 700; font-size: 0.8em;">Foundations</div>
      </div>
      <p style="font-size: 0.7em; color: #444; margin: 0; line-height: 1.6;">AGENTS.md governance · change_ledger.jsonl · Full Profile schema (Modules 1–4) · Primordial Stakeholder</p>
    </div>
    <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 14px; padding: 20px 18px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <span class="tag" style="background: #22c55e12; color: #22c55e; border: 1px solid #22c55e22;">Done</span>
        <div style="font-weight: 700; font-size: 0.8em;">Network Layer</div>
      </div>
      <p style="font-size: 0.7em; color: #444; margin: 0; line-height: 1.6;">5 group profiles · 4 relationship files · 1 coalition · index updated</p>
    </div>
  </div>
  <div style="flex: 1;">
    <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 14px; padding: 20px 18px; margin-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <span class="tag" style="background: #f5a62312; color: #f5a623; border: 1px solid #f5a62322;">Next</span>
        <div style="font-weight: 700; font-size: 0.8em;">First Contact</div>
      </div>
      <p style="font-size: 0.7em; color: #555; margin: 0; line-height: 1.6;">Initiate with DeepLearning.AI (highest urgency) · document evidence · advance lifecycle_stage to Negotiation</p>
    </div>
    <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 14px; padding: 20px 18px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <span class="tag" style="background: #33333312; color: #555; border: 1px solid #33333322;">Later</span>
        <div style="font-weight: 700; font-size: 0.8em; color: #555;">Expand & Reconcile</div>
      </div>
      <p style="font-size: 0.7em; color: #444; margin: 0; line-height: 1.6;">Ingest Anthropic · 2nd coalition · first full Reconciliation pass · activate reciprocity scoring</p>
    </div>
  </div>
</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: '' -->

# One wiki.<br>Every relationship.

## mindTemple knows its stakeholders the way it should —<br>structurally, theoretically, and cumulatively.

<div class="pill-row">
  <span class="pill">stakeholdersLLMWiki</span>
  <span class="pill">schema v1.1.0</span>
  <span class="pill">2026-04-15</span>
</div>
