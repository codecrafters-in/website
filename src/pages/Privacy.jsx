import LegalPage from '../components/LegalPage.jsx'
import { privacySections } from './legalContent.js'

export function Component() {
  return <LegalPage title="Privacy Policy" description="How CodeCrafters collects, uses, and protects your personal information." path="/privacy" sections={privacySections} />
}

export default Component
