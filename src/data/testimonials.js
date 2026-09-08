// Client testimonials.
//
// Names are withheld under NDA. We show role + sector instead of initials:
// "S.C.*" reads as invented, which costs more trust than it earns, whereas a
// role and a sector are both honest and more useful to a reader deciding
// whether this sounds like them.
export const testimonials = [
  {
    id: 'logistics',
    quote:
      'CodeCrafters reduced our order processing time from 4 hours to 8 minutes. The ERP implementation paid for itself in the first quarter.',
    name: 'COO',
    title: '3PL logistics operator · India',
    metric: '96% faster processing',
    workSlug: 'portal-order-approval-engine',
  },
  {
    id: 'reporting',
    quote:
      'Their AI pipeline replaced 3 full-time data analysts. The reports are more accurate, available instantly, and cost 70% less to produce.',
    name: 'CTO',
    title: 'Financial services firm',
    metric: '70% reporting cost cut',
  },
  {
    id: 'scale',
    quote:
      'We scaled from 50 to 500 daily transactions without hiring a single additional ops employee. CodeCrafters built the infrastructure that made that possible.',
    name: 'Founder',
    title: 'Multi-brand retail group',
    metric: '10x scale, same team size',
    workSlug: 'multi-vendor-ecommerce',
  },
  {
    id: 'ocr',
    quote:
      'The OCR engine alone saves my team 3 hours a day on invoice entry. Confidence scoring means we only review the edge cases. Everything else is automatic.',
    name: 'Finance Director',
    title: 'Manufacturing company',
    metric: '80% manual entry eliminated',
    workSlug: 'ocr-invoice-engine',
  },
  {
    id: 'migration',
    quote:
      'ERP migration with zero downtime and not a single data loss. I was expecting 6 months of pain. It took 8 weeks and was completely smooth.',
    name: 'CTO',
    title: 'eCommerce group',
    metric: 'Zero downtime migration',
    workSlug: 'erp-migration-v14-v19',
  },
]

export const testimonialNote = 'Role and sector shown; names withheld under NDA. Happy to arrange a reference call.'

export default testimonials
