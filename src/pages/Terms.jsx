import SEO from '../components/SEO'

const LAST_UPDATED = 'March 2025'
const CONTACT_EMAIL = 'legal@codecrafters.in'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms and conditions governing the use of CodeCrafters services."
        path="/terms"
      />
      <div className="min-h-screen bg-background pt-32 pb-24 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-[#F5C518] text-xs uppercase tracking-widest mb-4 font-black">Legal</div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4">Terms of Service</h1>
          <p className="text-[#4E4633] text-sm mb-16">Last updated: {LAST_UPDATED}</p>

          <div className="space-y-12">
            {[
              {
                title: '1. Acceptance of Terms',
                body: `By accessing or using CodeCrafters services, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services. These terms apply to all visitors, clients, and users of our website and services.`,
              },
              {
                title: '2. Services',
                body: `CodeCrafters provides AI automation engineering, Odoo ERP implementation, cloud infrastructure, and related digital transformation services. Specific deliverables, timelines, and pricing are defined in individual project proposals and service agreements signed between CodeCrafters and the client.`,
              },
              {
                title: '3. Intellectual Property',
                body: `Upon full payment, clients receive ownership of all custom-developed code and deliverables specific to their project. CodeCrafters retains ownership of all pre-existing tools, frameworks, libraries, and methodologies used in delivery. We reserve the right to display work in our portfolio unless a confidentiality agreement states otherwise.`,
              },
              {
                title: '4. Payment Terms',
                body: `Payment terms are defined per engagement. Project-based work typically requires a deposit before commencement. Retainer agreements are billed monthly in advance. Late payments incur a 1.5% monthly interest charge. CodeCrafters reserves the right to pause delivery on overdue accounts.`,
              },
              {
                title: '5. Confidentiality',
                body: `CodeCrafters treats all client information as confidential. We will not disclose client data, project details, or proprietary information to third parties without written consent, except as required by law. Clients may request a mutual NDA prior to project commencement.`,
              },
              {
                title: '6. Limitation of Liability',
                body: `CodeCrafters' total liability for any claim arising from our services is limited to the amount paid for the specific engagement giving rise to the claim. We are not liable for indirect, incidental, or consequential damages including lost profits, data loss, or business interruption.`,
              },
              {
                title: '7. Warranties',
                body: `We warrant that services will be performed professionally and in accordance with agreed specifications. We do not guarantee specific business outcomes (e.g., revenue increases). Clients are responsible for ensuring their use of delivered systems complies with applicable laws.`,
              },
              {
                title: '8. Termination',
                body: `Either party may terminate an engagement with 30 days written notice. Upon termination, the client pays for all work completed to date. CodeCrafters will deliver all completed work product and documentation. Provisions relating to IP, confidentiality, and liability survive termination.`,
              },
              {
                title: '9. Governing Law',
                body: `These terms are governed by applicable law. Any disputes shall be resolved through good-faith negotiation first, followed by binding arbitration if necessary. The prevailing party in any dispute is entitled to reasonable legal fees.`,
              },
              {
                title: '10. Contact',
                body: `For questions about these terms or to report a concern, contact us at: ${CONTACT_EMAIL}`,
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
