import { useEffect, useState } from 'react'
import HeroFocus from './HeroFocus.jsx'
import HeroSystem from './HeroSystem.jsx'
import HeroProblem from './HeroProblem.jsx'
import HeroProof from './HeroProof.jsx'
import HeroContrarian from './HeroContrarian.jsx'
import { track } from '../../lib/analytics.js'

/**
 * Hero variants, switchable with `?hero=` so they can be compared on the real
 * page rather than described in the abstract.
 *
 *   ?hero=system      the default — two-column: message left, live system
 *                     panel right. Preferred on review.
 *   ?hero=focus       centred copy with the pipeline full-width below,
 *                     cropped against the fold. Kept for comparison.
 *   ?hero=problem     leads with the buyer's symptoms instead of our claim.
 *   ?hero=proof       leads with the verifiable numbers, centred.
 *   ?hero=contrarian  self-disqualifying. Filters hard; highest variance.
 *
 * The default renders on the server, so SSG output and SEO are unaffected —
 * a variant only appears after hydration, for whoever asked for it. When one
 * wins, promote it to DEFAULT and delete the rest; this is a comparison tool,
 * not a permanent abstraction.
 */
const VARIANTS = {
  focus: HeroFocus,
  system: HeroSystem,
  problem: HeroProblem,
  proof: HeroProof,
  contrarian: HeroContrarian,
}

const DEFAULT = 'system'

export default function Hero() {
  const [variant, setVariant] = useState(DEFAULT)

  useEffect(() => {
    let chosen = DEFAULT
    try {
      const q = new URLSearchParams(window.location.search).get('hero')
      if (q && VARIANTS[q]) chosen = q
    } catch {
      /* no-op */
    }
    if (chosen !== DEFAULT) setVariant(chosen)
    track('hero_variant_view', { variant: chosen })
  }, [])

  const Chosen = VARIANTS[variant] || VARIANTS[DEFAULT]
  return <Chosen />
}
