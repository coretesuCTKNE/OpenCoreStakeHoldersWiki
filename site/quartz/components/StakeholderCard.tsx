import { QuartzComponent, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { SALIENCE_COLORS } from "../util/salience"
import style from "./styles/stakeholderCard.scss"

type StakeholderFrontmatter = {
  salience_class?: string
  plu_score?: number
  posture?: string
  engagement_basis?: string
  lifecycle_stage?: string
  profile_tier?: string
  title?: string
}

const StakeholderCard: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter as StakeholderFrontmatter | undefined

  const salienceClass = frontmatter?.salience_class
  const pluScore = frontmatter?.plu_score
  const posture = frontmatter?.posture
  const engagementBasis = frontmatter?.engagement_basis
  const lifecycleStage = frontmatter?.lifecycle_stage
  const profileTier = frontmatter?.profile_tier

  if (!salienceClass && !pluScore && !posture) {
    return null
  }

  const getSalienceColor = (cls: string): string => {
    return SALIENCE_COLORS[cls] || SALIENCE_COLORS["Latent"]
  }

  return (
    <aside class={classNames(displayClass, "stakeholder-card")}>
      <table class="infobox">
        <tbody>
          {frontmatter?.title && (
            <tr class="infobox-header">
              <th colspan={2}>{frontmatter.title}</th>
            </tr>
          )}
          {profileTier && (
            <tr>
              <th scope="row">Profile Tier</th>
              <td>
                <span class={`tag tier-${profileTier.toLowerCase()}`}>{profileTier}</span>
              </td>
            </tr>
          )}
          {salienceClass && (
            <tr>
              <th scope="row">Salience</th>
              <td>
                <span
                  class="tag salience"
                  style={{
                    backgroundColor: getSalienceColor(salienceClass),
                    color: "#1e1e2e",
                  }}
                >
                  {salienceClass}
                </span>
              </td>
            </tr>
          )}
          {pluScore !== undefined && (
            <tr>
              <th scope="row">PLU Score</th>
              <td>
                <span class="plu-score">{pluScore}</span>
              </td>
            </tr>
          )}
          {posture && (
            <tr>
              <th scope="row">Posture</th>
              <td>{posture}</td>
            </tr>
          )}
          {engagementBasis && (
            <tr>
              <th scope="row">Engagement</th>
              <td>{engagementBasis}</td>
            </tr>
          )}
          {lifecycleStage && (
            <tr>
              <th scope="row">Lifecycle</th>
              <td>{lifecycleStage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </aside>
  )
}

StakeholderCard.css = style

export default StakeholderCard
