import LegalPage from '../components/LegalPage.jsx'
import { termsSections } from './legalContent.js'

export function Component() {
  return <LegalPage title="Terms of Service" description="Terms and conditions governing the use of CodeCrafters services." path="/terms" sections={termsSections} />
}

export default Component
