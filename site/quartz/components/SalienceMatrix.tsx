import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/salienceMatrix.inline"
import style from "./styles/salienceMatrix.scss"
import { classNames } from "../util/lang"

interface SalienceMatrixOptions {
  height?: number
}

const defaultOptions: SalienceMatrixOptions = {
  height: 500,
}

export default ((opts?: Partial<SalienceMatrixOptions>) => {
  const SalienceMatrix: QuartzComponent = ({
    fileData,
    displayClass,
    allFiles,
  }: QuartzComponentProps) => {
    const slug = fileData.slug

    const graphQuerySlug = `queries/graph/${slug}`
    const graphQueryExists = (allFiles as Array<{ slug?: string }>).some(
      (f) => f.slug === graphQuerySlug,
    )

    if (!graphQueryExists) {
      return null
    }

    const frontmatter = fileData.frontmatter as Record<string, unknown> | undefined
    const projectTitle = (frontmatter?.title as string) ?? fileData.frontmatter?.title ?? "Project"
    const height = opts?.height ?? defaultOptions.height

    const config = JSON.stringify({
      projectId: slug,
      projectTitle,
      height,
    })

    return (
      <div class={classNames(displayClass, "salience-matrix-wrapper")}>
        <div class="salience-matrix" data-cfg={config}>
          <div class="salience-matrix-header">
            <h3>Stakeholder Salience Matrix</h3>
            <div class="salience-matrix-controls">
              <label class="salience-matrix-view-toggle">
                <span>View:</span>
                <select class="view-select" data-role="view-toggle">
                  <option value="plu">PLU Matrix</option>
                  <option value="actionability">Actionability Grid</option>
                </select>
              </label>
              <label class="salience-matrix-label-toggle">
                <span>Labels:</span>
                <select class="label-select" data-role="label-toggle">
                  <option value="name">Name</option>
                  <option value="name-class">Name + Class</option>
                  <option value="name-lifecycle">Name + Lifecycle</option>
                  <option value="name-posture">Name + Posture</option>
                  <option value="off">Off</option>
                </select>
              </label>
              <label class="salience-matrix-size-toggle">
                <span>Size:</span>
                <select class="size-select" data-role="size-toggle">
                  <option value="harmful">Harmful Potential</option>
                  <option value="reciprocity">Reciprocity Index</option>
                </select>
              </label>
              <button class="salience-matrix-reset" data-role="reset-zoom" title="Reset zoom">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 1 .908-.418A6 6 0 1 1 8 2v1z" />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966a.25.25 0 0 1 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="lifecycle-slider" data-role="lifecycle-slider">
            <button data-lifecycle="all" class="active">
              All
            </button>
            <button data-lifecycle="Scouting">Scouting</button>
            <button data-lifecycle="Negotiation">Negotiation</button>
            <button data-lifecycle="Commitment">Commitment</button>
            <button data-lifecycle="Execution">Execution</button>
            <button data-lifecycle="Repair">Repair</button>
            <button data-lifecycle="Dissolution">Dissolution</button>
          </div>
          <div
            class="salience-matrix-chart"
            style={{ height: `${height}px`, minHeight: "350px" }}
          ></div>
          <div class="salience-matrix-legend"></div>
        </div>
      </div>
    )
  }

  SalienceMatrix.css = style
  SalienceMatrix.afterDOMLoaded = script

  return SalienceMatrix
}) satisfies QuartzComponentConstructor<SalienceMatrixOptions>
