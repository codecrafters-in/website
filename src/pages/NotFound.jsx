import SEO from '../components/SEO.jsx'
import NotFoundView from '../components/NotFoundView.jsx'

export function Component() {
  return (
    <>
      <SEO title="404 — Game Over" description="This page does not exist. Continue to the homepage or insert a coin." path="/404" noindex includeOrg={false} />
      <NotFoundView />
    </>
  )
}

export default Component
