import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import { zoom, zoomIdentity, select, scaleLinear, axisBottom, axisLeft } from "d3"
import { removeAllChildren } from "./util"
import { FullSlug, SimpleSlug, getFullSlug, simplifySlug } from "../../util/path"
import { SALIENCE_COLORS } from "../../util/salience"

interface MatrixConfig {
  projectId: string
  projectTitle: string
  height: number
}

interface StakeholderData {
  id: string
  title: string
  slug: SimpleSlug
  power: number
  legitimacy: number
  urgency: number
  salience_class: string
  posture: string
  lifecycle_stage: string
  cooperative_potential: number | null
  harmful_potential: number | null
  reciprocity_index: number | null
  engagement_basis: string
  profile_tier: string
  totalSalience: number
  isEstimated: boolean
}

interface ViewConfig {
  xAccessor: (d: StakeholderData) => number
  yAccessor: (d: StakeholderData) => number
  xLabel: string
  yLabel: string
  xDomain: [number, number]
  yDomain: [number, number]
  xDivider: number
  yDivider: number
  colorFn: (d: StakeholderData) => string
  quadrants: Array<{ x: number; y: number; text: string }>
  gridValues: number[]
}

const POSTURE_VALUES: Record<string, number> = {
  Defensive: -5,
  Hold: 0,
  Swing: 2,
  Offensive: 5,
}

const ENGAGEMENT_COLORS: Record<string, string> = {
  Normative: "#94e2d5",
  Instrumental: "#f9e2af",
  Contractual: "#fab387",
  Descriptive: "#6c7086",
}

const PLU_VIEW: ViewConfig = {
  xAccessor: (d) => d.legitimacy,
  yAccessor: (d) => d.power,
  xLabel: "Legitimacy →",
  yLabel: "Power →",
  xDomain: [0, 10],
  yDomain: [0, 10],
  xDivider: 5,
  yDivider: 5,
  colorFn: (d) => urgencyToColor(d.urgency),
  quadrants: [
    { x: 2.5, y: 8.5, text: "DORMANT / DANGEROUS" },
    { x: 7.5, y: 8.5, text: "DOMINANT / DEFINITIVE" },
    { x: 2.5, y: 1.5, text: "LATENT / DEMANDING" },
    { x: 7.5, y: 1.5, text: "DISCRETIONARY / DEPENDENT" },
  ],
  gridValues: [2, 4, 6, 8],
}

const ACTIONABILITY_VIEW: ViewConfig = {
  xAccessor: (d) => POSTURE_VALUES[d.posture] ?? 0,
  yAccessor: (d) => d.totalSalience,
  xLabel: "Posture →",
  yLabel: "Total Salience →",
  xDomain: [-6, 6],
  yDomain: [0, 32],
  xDivider: 0,
  yDivider: 15,
  colorFn: (d) => ENGAGEMENT_COLORS[d.engagement_basis] ?? "#6c7086",
  quadrants: [
    { x: -3, y: 25, text: "BLOCKERS" },
    { x: 3, y: 25, text: "CHAMPIONS" },
    { x: -3, y: 7, text: "WATCH LIST" },
    { x: 3, y: 7, text: "MOVEABLE PIECES" },
  ],
  gridValues: [-4, -2, 0, 2, 4],
}

function deriveSalienceClass(power: number, legitimacy: number, urgency: number): string {
  const p = power >= 5
  const l = legitimacy >= 5
  const u = urgency >= 5
  if (p && l && u) return "Definitive"
  if (p && l && !u) return "Dominant"
  if (p && !l && u) return "Dangerous"
  if (!p && l && u) return "Dependent"
  if (p && !l && !u) return "Dormant"
  if (!p && l && !u) return "Discretionary"
  if (!p && !l && u) return "Demanding"
  return "Latent"
}

function estimateFromSalienceClass(cls: string): {
  power: number
  legitimacy: number
  urgency: number
} {
  const centers: Record<string, { power: number; legitimacy: number; urgency: number }> = {
    Definitive: { power: 7.5, legitimacy: 7.5, urgency: 7.5 },
    Dominant: { power: 7.5, legitimacy: 7.5, urgency: 2.5 },
    Dangerous: { power: 7.5, legitimacy: 2.5, urgency: 7.5 },
    Dependent: { power: 2.5, legitimacy: 7.5, urgency: 7.5 },
    Dormant: { power: 7.5, legitimacy: 2.5, urgency: 2.5 },
    Discretionary: { power: 2.5, legitimacy: 7.5, urgency: 2.5 },
    Demanding: { power: 2.5, legitimacy: 2.5, urgency: 7.5 },
    Latent: { power: 2.5, legitimacy: 2.5, urgency: 2.5 },
  }
  const center = centers[cls] ?? centers.Latent
  const noise = () => (Math.random() - 0.5) * 2
  return {
    power: Math.max(0, Math.min(10, center.power + noise())),
    legitimacy: Math.max(0, Math.min(10, center.legitimacy + noise())),
    urgency: Math.max(0, Math.min(10, center.urgency + noise())),
  }
}

function urgencyToColor(urgency: number): string {
  const t = Math.max(0, Math.min(1, urgency / 10))
  const r = Math.round(137 + (243 - 137) * t)
  const g = Math.round(180 + (139 - 180) * t)
  const b = Math.round(250 + (168 - 250) * t)
  return `rgb(${r},${g},${b})`
}

function buildStakeholder(
  id: string,
  title: string,
  slug: SimpleSlug,
  persona: ContentDetails,
): StakeholderData | null {
  const plu = persona.plu_scores
  let power: number, legitimacy: number, urgency: number, isEstimated: boolean

  if (
    plu &&
    typeof plu.power === "number" &&
    typeof plu.legitimacy === "number" &&
    typeof plu.urgency === "number"
  ) {
    power = plu.power
    legitimacy = plu.legitimacy
    urgency = plu.urgency
    isEstimated = false
  } else if (persona.salience_class) {
    const estimated = estimateFromSalienceClass(persona.salience_class)
    power = estimated.power
    legitimacy = estimated.legitimacy
    urgency = estimated.urgency
    isEstimated = true
  } else {
    return null
  }

  return {
    id,
    title,
    slug,
    power,
    legitimacy,
    urgency,
    salience_class: persona.salience_class ?? deriveSalienceClass(power, legitimacy, urgency),
    posture: persona.posture ?? "Hold",
    lifecycle_stage: persona.lifecycle_stage ?? "Scouting",
    cooperative_potential: persona.cooperative_potential ?? null,
    harmful_potential: persona.harmful_potential ?? null,
    reciprocity_index: null,
    engagement_basis: persona.engagement_basis ?? "Descriptive",
    profile_tier: persona.profile_tier ?? "Lite",
    totalSalience: power + legitimacy + urgency,
    isEstimated,
  }
}

function resolveStakeholders(
  data: Map<SimpleSlug, ContentDetails>,
  projectId: string,
): StakeholderData[] {
  const stakeholders: StakeholderData[] = []
  const seen = new Set<string>()

  for (const [slug, details] of data.entries()) {
    if (details.type !== "relationship") continue
    const firmMatch = details.firm === projectId || slug.includes(projectId)
    if (!firmMatch) continue

    const stakeholderId = details.stakeholder
    if (!stakeholderId || seen.has(stakeholderId)) continue
    seen.add(stakeholderId)

    const personaSlug = `personas/${stakeholderId}` as SimpleSlug
    const groupSlug = `groups/${stakeholderId}` as SimpleSlug
    const persona = data.get(personaSlug) ?? data.get(groupSlug)
    if (!persona) continue

    const s = buildStakeholder(stakeholderId, persona.title ?? stakeholderId, personaSlug, persona)
    if (s) stakeholders.push(s)
  }

  const projectPage = data.get(projectId as SimpleSlug)
  if (projectPage) {
    for (const link of projectPage.links ?? []) {
      const linkStr = link as string
      if (!linkStr.startsWith("personas/") && !linkStr.startsWith("groups/")) continue

      const stakeholderId = linkStr.split("/")[1]
      if (!stakeholderId || seen.has(stakeholderId)) continue
      seen.add(stakeholderId)

      const persona = data.get(link as SimpleSlug)
      if (!persona) continue

      const s = buildStakeholder(
        stakeholderId,
        persona.title ?? stakeholderId,
        link as SimpleSlug,
        persona,
      )
      if (s) stakeholders.push(s)
    }
  }

  return stakeholders
}

async function renderMatrix(container: HTMLElement, _fullSlug: FullSlug) {
  const cfg: MatrixConfig = JSON.parse(container.dataset["cfg"]!)
  const chartContainer = container.querySelector(".salience-matrix-chart") as HTMLElement
  const legendContainer = container.querySelector(".salience-matrix-legend") as HTMLElement
  removeAllChildren(chartContainer)
  removeAllChildren(legendContainer)

  const data: Map<SimpleSlug, ContentDetails> = new Map(
    Object.entries<ContentDetails>(await fetchData).map(([k, v]) => [
      simplifySlug(k as FullSlug),
      v,
    ]),
  )

  const stakeholders = resolveStakeholders(data, cfg.projectId)

  if (stakeholders.length === 0) {
    chartContainer.innerHTML = `<div class="salience-matrix-empty">No scored stakeholders found for this project.</div>`
    return
  }

  const width = chartContainer.clientWidth
  const height = cfg.height
  const margin = { top: 30, right: 30, bottom: 50, left: 60 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  let currentSizeMode: "harmful" | "reciprocity" = "harmful"
  let currentLabelMode = "name"
  let currentView: "plu" | "actionability" = "plu"
  let currentLifecycleFilter: string | null = null

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svgEl.setAttribute("width", String(width))
  svgEl.setAttribute("height", String(height))
  svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`)
  chartContainer.appendChild(svgEl)

  const svgSel = select<SVGSVGElement, unknown>(chartContainer.querySelector("svg")!)
  const g = svgSel.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

  const xScale = scaleLinear().domain(PLU_VIEW.xDomain).range([0, innerWidth])
  const yScale = scaleLinear().domain(PLU_VIEW.yDomain).range([innerHeight, 0])

  const gridGroup = g.append("g").attr("class", "grid-group")
  const dividerGroup = g.append("g").attr("class", "divider-group")
  const quadrantGroup = g.append("g").attr("class", "quadrant-group")
  const axisXGroup = g
    .append("g")
    .attr("class", "axis-x-group")
    .attr("transform", `translate(0,${innerHeight})`)
  const axisYGroup = g.append("g").attr("class", "axis-y-group")
  const labelXGroup = g
    .append("text")
    .attr("class", "label-x")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "middle")
    .attr("fill", "var(--dark)")
    .attr("font-size", "12px")
  const labelYGroup = g
    .append("text")
    .attr("class", "label-y")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", -45)
    .attr("text-anchor", "middle")
    .attr("fill", "var(--dark)")
    .attr("font-size", "12px")
  const nodesGroup = g.append("g").attr("class", "nodes-group")

  const tooltip = select(chartContainer)
    .append("div")
    .attr("class", "salience-matrix-tooltip")
    .style("opacity", "0")

  let activeCard: HTMLElement | null = null
  let activePrompt: HTMLElement | null = null

  function removeOverlays() {
    if (activeCard) {
      activeCard.remove()
      activeCard = null
    }
    if (activePrompt) {
      activePrompt.remove()
      activePrompt = null
    }
  }

  function showProfileCard(d: StakeholderData, _event: MouseEvent) {
    removeOverlays()
    const card = document.createElement("div")
    card.className = "profile-card-overlay"
    card.addEventListener("click", (e) => {
      if (e.target === card) removeOverlays()
    })

    const inner = document.createElement("div")
    inner.className = "profile-card"
    inner.innerHTML = `
      <div class="card-header">
        <span class="card-name">${d.title}</span>
        <span class="card-badge" style="background:${SALIENCE_COLORS[d.salience_class]}">${d.salience_class}</span>
        <span class="card-badge card-badge-posture">${d.posture}</span>
      </div>
      <div class="card-module">
        <h4>Module 1: Identification</h4>
        <div class="card-field"><span>Engagement</span><span>${d.engagement_basis}</span></div>
        <div class="card-field"><span>Lifecycle</span><span>${d.lifecycle_stage}</span></div>
        <div class="card-field"><span>Power</span><span>${d.power.toFixed(1)}</span></div>
        <div class="card-field"><span>Legitimacy</span><span>${d.legitimacy.toFixed(1)}</span></div>
        <div class="card-field"><span>Urgency</span><span>${d.urgency.toFixed(1)}</span></div>
      </div>
      <div class="card-module">
        <h4>Module 2: Strategizing</h4>
        <div class="card-field"><span>Cooperative</span><span>${d.cooperative_potential !== null ? d.cooperative_potential + "/10" : "No data yet"}</span></div>
        <div class="card-field"><span>Harmful</span><span>${d.harmful_potential !== null ? d.harmful_potential + "/10" : "No data yet"}</span></div>
      </div>
      <div class="card-module">
        <h4>Module 3: Value Creation</h4>
        <div class="card-field"><span>Reciprocity</span><span>${d.reciprocity_index !== null ? d.reciprocity_index : "No data yet"}</span></div>
        <div class="card-field"><span>Total Salience</span><span>${d.totalSalience.toFixed(1)}</span></div>
      </div>
      <div class="card-module">
        <h4>Module 4: Network</h4>
        <div class="card-field"><span>Tier</span><span>${d.profile_tier}</span></div>
      </div>
    `
    card.appendChild(inner)
    document.body.appendChild(card)
    activeCard = card
  }

  function showUpgradePrompt(_d: StakeholderData) {
    removeOverlays()
    const prompt = document.createElement("div")
    prompt.className = "upgrade-prompt"
    prompt.innerHTML = `
      <strong>Incomplete Lite Profile</strong><br/>
      Ask the LLM to upgrade to Full for detailed analysis.
    `
    chartContainer.appendChild(prompt)
    activePrompt = prompt

    prompt.style.left = "50%"
    prompt.style.top = "50%"
    prompt.style.transform = "translate(-50%, -50%)"

    setTimeout(() => {
      if (activePrompt === prompt) removeOverlays()
    }, 4000)
    document.addEventListener(
      "click",
      function handler() {
        removeOverlays()
        document.removeEventListener("click", handler)
      },
      { once: true },
    )
  }

  function getNodeRadius(s: StakeholderData): number {
    const base =
      currentSizeMode === "reciprocity" ? (s.reciprocity_index ?? 8) : (s.harmful_potential ?? 12)
    const size =
      currentSizeMode === "reciprocity"
        ? 8 + ((base as number) / 100) * 16
        : 8 + (((base as number) - 1) / 9) * 16
    return s.profile_tier === "Lite" ? size * 0.85 : size
  }

  function getLabel(d: StakeholderData): string {
    switch (currentLabelMode) {
      case "name-class":
        return `${d.title} [${d.salience_class}]`
      case "name-lifecycle":
        return `${d.title} (${d.lifecycle_stage})`
      case "name-posture":
        return `${d.title} [${d.posture}]`
      case "off":
        return ""
      default:
        return d.title
    }
  }

  function getViewCfg(): ViewConfig {
    return currentView === "actionability" ? ACTIONABILITY_VIEW : PLU_VIEW
  }

  function drawChart() {
    const vc = getViewCfg()

    xScale.domain(vc.xDomain)
    yScale.domain(vc.yDomain)

    gridGroup.selectAll("*").remove()
    for (const v of vc.gridValues) {
      if (vc.xDomain[0] < 0 || v > vc.xDomain[0]) {
        gridGroup
          .append("line")
          .attr("x1", xScale(v))
          .attr("y1", 0)
          .attr("x2", xScale(v))
          .attr("y2", innerHeight)
          .attr("stroke", "var(--lightgray)")
          .attr("stroke-dasharray", "2,4")
      }
      gridGroup
        .append("line")
        .attr("x1", 0)
        .attr("y1", yScale(v))
        .attr("x2", innerWidth)
        .attr("y2", yScale(v))
        .attr("stroke", "var(--lightgray)")
        .attr("stroke-dasharray", "2,4")
    }

    dividerGroup.selectAll("*").remove()
    dividerGroup
      .append("line")
      .attr("x1", xScale(vc.xDivider))
      .attr("y1", 0)
      .attr("x2", xScale(vc.xDivider))
      .attr("y2", innerHeight)
      .attr("stroke", "var(--darkgray)")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "6,4")
    dividerGroup
      .append("line")
      .attr("x1", 0)
      .attr("y1", yScale(vc.yDivider))
      .attr("x2", innerWidth)
      .attr("y2", yScale(vc.yDivider))
      .attr("stroke", "var(--darkgray)")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "6,4")

    quadrantGroup.selectAll("*").remove()
    for (const q of vc.quadrants) {
      quadrantGroup
        .append("text")
        .attr("x", xScale(q.x))
        .attr("y", yScale(q.y))
        .attr("text-anchor", "middle")
        .attr("fill", "var(--darkgray)")
        .attr("opacity", 0.25)
        .attr("font-size", "10px")
        .attr("font-weight", "600")
        .text(q.text)
    }

    axisXGroup.call(axisBottom(xScale).ticks(6).tickSize(0).tickPadding(8))
    // @ts-ignore
    axisXGroup.call((g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      g.select(".domain").remove(),
    )
    axisYGroup.call(axisLeft(yScale).ticks(6).tickSize(0).tickPadding(8))
    // @ts-ignore
    axisYGroup.call((g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      g.select(".domain").remove(),
    )

    labelXGroup.text(vc.xLabel)
    labelYGroup.text(vc.yLabel)
  }

  function renderNodes() {
    const vc = getViewCfg()
    nodesGroup.selectAll("*").remove()

    const nodes = nodesGroup
      .selectAll("g")
      .data(stakeholders)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${xScale(vc.xAccessor(d))},${yScale(vc.yAccessor(d))})`)
      .style("cursor", "pointer")
      .style("opacity", (d) => {
        if (currentLifecycleFilter && d.lifecycle_stage !== currentLifecycleFilter) return 0.2
        return d.isEstimated ? 0.6 : 0.9
      })

    nodes
      .append("circle")
      .attr("r", (d) => getNodeRadius(d))
      .attr("fill", (d) => {
        if (d.profile_tier === "Lite") return "none"
        return vc.colorFn(d)
      })
      .attr("stroke", (d) => vc.colorFn(d))
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", (d) => (d.profile_tier === "Lite" ? "4,3" : "none"))

    nodes
      .filter((d) => d.isEstimated)
      .append("circle")
      .attr("r", (d) => getNodeRadius(d) + 4)
      .attr("fill", "none")
      .attr("stroke", "var(--darkgray)")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3")
      .attr("opacity", 0.4)

    nodes
      .append("text")
      .attr("dy", (d) => getNodeRadius(d) + 14)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--dark)")
      .attr("font-size", "10px")
      .text((d) => getLabel(d))

    nodes
      .on("mouseenter", function (event: MouseEvent, d: StakeholderData) {
        const sizeLabel =
          currentSizeMode === "reciprocity"
            ? `Reciprocity: ${d.reciprocity_index ?? "N/A"}`
            : `Harmful: ${d.harmful_potential ?? "N/A"}/10`

        const viewSpecific =
          currentView === "actionability"
            ? `<div class="tooltip-row"><span>Posture Val:</span><span>${POSTURE_VALUES[d.posture] ?? "?"}</span></div>
             <div class="tooltip-row"><span>Total Salience:</span><span>${d.totalSalience.toFixed(1)}</span></div>`
            : `<div class="tooltip-row"><span>Power:</span><span>${d.power.toFixed(1)}</span></div>
             <div class="tooltip-row"><span>Legitimacy:</span><span>${d.legitimacy.toFixed(1)}</span></div>
             <div class="tooltip-row"><span>Urgency:</span><span>${d.urgency.toFixed(1)}</span></div>`

        const colorLabel =
          currentView === "actionability"
            ? `<div class="tooltip-row"><span>Basis:</span><span style="color:${ENGAGEMENT_COLORS[d.engagement_basis]}">${d.engagement_basis}</span></div>`
            : `<div class="tooltip-row"><span>Salience:</span><span style="color:${SALIENCE_COLORS[d.salience_class]}">${d.salience_class}</span></div>`

        tooltip
          .html(
            `
            <div class="tooltip-header">${d.title}</div>
            ${colorLabel}
            <div class="tooltip-row"><span>Posture:</span><span>${d.posture}</span></div>
            <div class="tooltip-row"><span>Lifecycle:</span><span>${d.lifecycle_stage}</span></div>
            <div class="tooltip-row"><span>Tier:</span><span>${d.profile_tier}</span></div>
            <div class="tooltip-divider"></div>
            ${viewSpecific}
            <div class="tooltip-divider"></div>
            <div class="tooltip-row"><span>Cooperative:</span><span>${d.cooperative_potential ?? "N/A"}/10</span></div>
            <div class="tooltip-row"><span>${sizeLabel.split(":")[0]}:</span><span>${sizeLabel.split(":")[1]}</span></div>
            ${d.isEstimated ? '<div class="tooltip-estimated">Estimated from salience class</div>' : ""}
          `,
          )
          .style("opacity", "1")
          .style("left", `${(event as MouseEvent & { offsetX: number }).offsetX + 15}px`)
          .style("top", `${(event as MouseEvent & { offsetY: number }).offsetY - 10}px`)
      })
      .on("mouseleave", function () {
        tooltip.style("opacity", "0")
      })
      .on("click", function (event: MouseEvent, d: StakeholderData) {
        tooltip.style("opacity", "0")
        if (d.profile_tier === "Full") {
          showProfileCard(d, event)
        } else {
          showUpgradePrompt(d)
        }
      })
  }

  function renderLegend() {
    removeAllChildren(legendContainer)
    const legendDiv = document.createElement("div")
    legendDiv.className = "salience-matrix-legend-content"

    if (currentView === "actionability") {
      const basisLabel = document.createElement("span")
      basisLabel.className = "legend-label"
      basisLabel.textContent = "Engagement: "
      legendDiv.appendChild(basisLabel)

      for (const [basis, color] of Object.entries(ENGAGEMENT_COLORS)) {
        const swatch = document.createElement("span")
        swatch.className = "legend-swatch"
        swatch.style.display = "inline-flex"
        swatch.style.alignItems = "center"
        swatch.style.gap = "3px"
        swatch.style.marginRight = "8px"
        swatch.innerHTML = `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color}"></span><span style="font-size:0.7rem">${basis}</span>`
        legendDiv.appendChild(swatch)
      }
    } else {
      const gradientLabel = document.createElement("span")
      gradientLabel.className = "legend-label"
      gradientLabel.textContent = "Urgency: "
      legendDiv.appendChild(gradientLabel)

      const gradientBar = document.createElement("div")
      gradientBar.className = "legend-gradient"
      gradientBar.style.background = `linear-gradient(to right, #89b4fa, #f38ba8)`
      legendDiv.appendChild(gradientBar)

      const gradientLow = document.createElement("span")
      gradientLow.className = "legend-value"
      gradientLow.textContent = "0"
      legendDiv.appendChild(gradientLow)

      const gradientHigh = document.createElement("span")
      gradientHigh.className = "legend-value"
      gradientHigh.textContent = "10"
      legendDiv.appendChild(gradientHigh)
    }

    const sizeLabel = document.createElement("span")
    sizeLabel.className = "legend-label"
    sizeLabel.textContent = `  |  Size: ${currentSizeMode === "reciprocity" ? "Reciprocity" : "Harmful"}`
    legendDiv.appendChild(sizeLabel)

    const tierLabel = document.createElement("span")
    tierLabel.className = "legend-label legend-ghost"
    tierLabel.textContent = "  |  ◌ = Lite (hollow) / ● = Full (solid)"
    legendDiv.appendChild(tierLabel)

    legendContainer.appendChild(legendDiv)
  }

  function setLifecycleFilter(stage: string | null) {
    currentLifecycleFilter = stage
    nodesGroup
      .selectAll<SVGGElement, StakeholderData>("g")
      .transition()
      .duration(300)
      .style("opacity", (d) => {
        if (!stage) return d.isEstimated ? 0.6 : 0.9
        return d.lifecycle_stage === stage ? (d.isEstimated ? 0.6 : 0.9) : 0.15
      })

    const slider = container.querySelector('[data-role="lifecycle-slider"]') as HTMLElement
    if (slider) {
      slider.querySelectorAll("button").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-lifecycle") === (stage ?? "all"))
      })
    }
  }

  drawChart()
  renderNodes()
  renderLegend()

  const zoomBehavior = zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.5, 5])
    .on("zoom", (event: { transform: { x: number; y: number; k: number } }) => {
      g.attr(
        "transform",
        `translate(${margin.left + event.transform.x},${margin.top + event.transform.y}) scale(${event.transform.k})`,
      )
    })
  svgSel.call(zoomBehavior)

  const labelSelect = container.querySelector('[data-role="label-toggle"]') as HTMLSelectElement
  const sizeSelect = container.querySelector('[data-role="size-toggle"]') as HTMLSelectElement
  const viewSelect = container.querySelector('[data-role="view-toggle"]') as HTMLSelectElement
  const resetBtn = container.querySelector('[data-role="reset-zoom"]') as HTMLButtonElement

  labelSelect?.addEventListener("change", () => {
    currentLabelMode = labelSelect.value
    renderNodes()
  })
  sizeSelect?.addEventListener("change", () => {
    currentSizeMode = sizeSelect.value as "harmful" | "reciprocity"
    renderNodes()
    renderLegend()
  })

  viewSelect?.addEventListener("change", () => {
    currentView = viewSelect.value as "plu" | "actionability"
    removeOverlays()
    drawChart()
    renderNodes()
    renderLegend()
    svgSel.transition().duration(300).call(zoomBehavior.transform, zoomIdentity)
  })

  resetBtn?.addEventListener("click", () => {
    svgSel.transition().duration(500).call(zoomBehavior.transform, zoomIdentity)
  })

  const lifecycleSlider = container.querySelector('[data-role="lifecycle-slider"]') as HTMLElement
  if (lifecycleSlider) {
    lifecycleSlider.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const stage = btn.getAttribute("data-lifecycle")
        setLifecycleFilter(stage === "all" ? null : stage)
      })
    })
  }
}

declare const fetchData: Promise<Record<string, ContentDetails>>

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.getElementsByClassName("salience-matrix")
  Array.from(containers).forEach((container) => {
    const el = container as HTMLElement
    const slug = getFullSlug(window)
    renderMatrix(el, slug)
  })
})
