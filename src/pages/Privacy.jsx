import SEO from '../components/SEO'

const LAST_UPDATED = 'March 2025'
const CONTACT_EMAIL = 'legal@codecrafters.ai'

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How CodeCrafters collects, uses, and protects your personal information."
        path="/privacy"
      />
      <div className="min-h-screen bg-background pt-32 pb-24 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-[#F5C518] text-xs uppercase tracking-widest mb-4 font-black">Legal</div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4">Privacy Policy</h1>
          <p className="text-[#4E4633] text-sm mb-16">Last updated: {LAST_UPDATED}</p>

          <div className="prose-custom space-y-12">
            {[
              {
                title: '1. Information We Collect',
                body: `We collect information you provide directly — such as name, email address, company name, and project details submitted through our contact forms. We also collect usage data (page views, session duration, referrer) via analytics to improve our services. We do not collect sensitive personal data without explicit consent.`,
              },
              {
                title: '2. How We Use Your Information',
                body: `We use collected information to: respond to your enquiries and proposals; deliver contracted services; send newsletters you've opted into; improve website performance and user experience; comply with legal obligations. We do not sell, rent, or trade your personal data to third parties.`,
              },
              {
                title: '3. Legal Basis for Processing (GDPR)',
                body: `For users in the European Economic Area, we process personal data under the following legal bases: contract performance (when we've agreed to provide services); legitimate interests (improving our services, fraud prevention); consent (marketing communications and analytics). You may withdraw consent at any time.`,
              },
              {
                title: '4. Cookies',
                body: `We use strictly necessary cookies (session management) and optional analytics cookies. You can control cookie preferences through the consent banner shown on your first visit. Declining analytics cookies will not affect site functionality.`,
              },
              {
                title: '5. Data Retention',
                body: `We retain personal data only as long as necessary for the purposes collected or as required by law. Contact enquiry data is retained for 3 years. Newsletter subscriber data is retained until unsubscription. You may request deletion at any time.`,
              },
              {
                title: '6. Your Rights',
                body: `You have the right to: access your personal data; correct inaccurate data; request deletion ("right to be forgotten"); restrict or object to processing; data portability; withdraw consent at any time. To exercise these rights, contact us at ${CONTACT_EMAIL}.`,
              },
              {
                title: '7. Data Security',
                body: `We implement industry-standard security measures: TLS encryption for data in transit, encrypted storage, access controls, and regular security audits. While we take all reasonable precautions, no transmission over the internet is 100% secure.`,
              },
              {
                title: '8. Third-Party Services',
                body: `We use carefully vetted third-party services including: analytics platforms, email delivery services, and cloud infrastructure providers. Each is bound by data processing agreements and GDPR-compliant practices. We do not use advertising networks.`,
              },
              {
                title: '9. Changes to This Policy',
                body: `We may update this policy periodically. We'll notify you of significant changes via email (if subscribed) or a notice on this page. Continued use of our services after changes constitutes acceptance.`,
              },
              {
                title: '10. Contact',
                body: `For privacy-related enquiries, data access requests, or complaints, contact our data controller at: ${CONTACT_EMAIL} — CodeCrafters, forge@codecrafters.ai`,
              },
            ].map((section) => (
              <section key={section.title}>
                <h2 className="text-white font-black text-lg tracking-tight mb-3">{section.title}</h2>
                <p className="text-[#D1C5AC] leading-relaxed text-sm">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
