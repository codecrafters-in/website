// Case studies. Featured entries carry problem/approach/outcome and a block-based body.
// Clients are anonymised by agreement; the systems and stack are not.
//
// `challenge` and `hardPart` lead the card instead of the project name. A name
// like "QuoteMaker" means nothing to a buyer; the problem it solved does.
//   challenge — the business problem, in the words the client would use
//   hardPart  — why it was not trivial. This is the line that proves competence.
// Both are condensed from this file's own problem/approach/summary/metrics.
//
// `facts` renders the small icon chips on cards and case-study pages (see
// components/FactChips.jsx). Region, org type, year and platform are derived
// automatically from `client`/`year`/`stack` — only add a fact here when it is
// something a reader cannot infer. Never invent one: a fabricated spec is worse
// than a missing one. Useful kinds: duration, scale, integrations, status, org.
//
// TODO(owner): the highest-trust chips are the ones only you know —
//   team size on the client side ("40-person wholesaler")
//   how long it has been running ("Live since 2023")
//   seats/users on the system ("120 daily users")
// Add those as facts and they will render ahead of the derived ones.

export const workCategories = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'data', label: 'Data' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'research', label: 'Research' },
  { id: 'product', label: 'Product' },
]

export const work = [
  // ── Featured ─────────────────────────────────────────────────────────────
  {
    slug: 'conversational-ai-agent-erp',
    challenge: 'Every business question needed a developer, and answers arrived days late.',
    hardPart: 'Letting non-technical staff query live ERP data without ever giving the model database access.',
    flow: [
      { kind: 'input', step: 'Plain-English question', note: 'Asked by non-technical staff' },
      { kind: 'llm', step: 'Intent → query', note: 'Claude MCP translates' },
      { kind: 'guard', step: 'Role validated', note: 'Checked before execution' },
      { kind: 'code', step: 'ORM-safe execution', note: 'No raw SQL reaches the DB' },
      { kind: 'data', step: 'Live ERP', note: 'Scoped to what they could already see' },
      { kind: 'llm', step: 'Answer + report', note: 'Generated from results' },
    ],
    facts: [
      { kind: 'integrations', label: 'Claude MCP over live ERP' },
    ],
    image: '/images/work/conversational-ai-agent-erp.jpg',
    imageCredit: 'Behnam Norouzi / Unsplash',
    title: 'Conversational AI Agent for Live ERP Data',
    client: 'Enterprise ERP client',
    industry: 'Enterprise operations',
    category: ['ai', 'platforms'],
    featured: true,
    year: '2025',
    summary:
      'A natural-language interface over live ERP data. Non-technical staff ask plain-English questions and get ORM-safe, role-gated answers in seconds.',
    metrics: [
      { value: 'NL→SQL', label: 'Plain English to live data' },
      { value: '100%', label: 'Prompt-injection hardened' },
      { value: 'Seconds', label: 'From question to answer' },
    ],
    tags: ['LLM', 'Claude MCP', 'Odoo', 'Python', 'AI Agents'],
    stack: ['Python', 'Claude MCP', 'Odoo', 'PostgreSQL'],
    services: ['ai', 'security'],
    problem:
      'Every business question needed a developer. Operators queued report requests, waited days, and made decisions on stale numbers.',
    approach:
      'We built an agent that translates plain-English questions into ORM-safe queries against the live database. Role-based access is validated before execution. Prompt-injection safeguards, retry queues and async processing make it safe to expose to non-technical staff. Delivered through Claude MCP for real-time interaction.',
    outcome:
      'Answers in seconds instead of days. Developers off the report queue. No raw SQL ever touches the database.',
    body: [
      { type: 'p', text: 'Business operators were drowning in manual report requests. Every insight required a developer query, a ticket, and a wait.' },
      { type: 'h2', text: 'What we built' },
      { type: 'p', text: 'A natural-language interface over live ERP data, delivered through Claude MCP. Staff type a question. The agent translates it into an ORM-safe query, validates the caller’s role, executes it, and returns an answer or a generated report.' },
      {
        type: 'ul',
        items: [
          'ORM-safe query execution: no raw SQL reaches the database',
          'Role-based access validated before every call',
          'Prompt-injection safeguards on every input',
          'Retry queues, conflict handling and async processing for reliability',
          'AI-driven report generation from query results',
        ],
      },
      { type: 'stat', items: [{ value: 'NL→SQL', label: 'Plain English to live data' }, { value: '100%', label: 'Prompt-injection hardened' }] },
      { type: 'h2', text: 'Why it is safe to hand to non-technical staff' },
      { type: 'p', text: 'The model never gets direct database access. It proposes, the ORM layer disposes. Every query is scoped to what the user could already see in the UI, and adversarial inputs are caught before they reach the runtime.' },
      { type: 'p', text: 'Result: answers in seconds, developers off the report queue, and an audit trail on every question asked.' },
    ],
  },
  {
    slug: 'healthcare-insurance-automation',
    challenge: 'A Canadian health platform was keying every OHIP claim, eligibility check and reconciliation by hand.',
    hardPart: 'Three government interfaces — OHIP, MCEDT and EDI — each with its own failure modes, running unattended overnight.',
    flow: [
      { kind: 'input', step: 'Claim created', note: 'From the platform' },
      { kind: 'code', step: 'OHIP eligibility', note: 'Real-time API verification' },
      { kind: 'guard', step: 'Rule validation', note: 'Before every submission' },
      { kind: 'code', step: 'XML/EDI batch', note: 'Generated and submitted overnight' },
      { kind: 'code', step: 'MCEDT reconciliation', note: 'Payments matched automatically' },
      { kind: 'human', step: 'Exception queue', note: 'The few that need a person' },
    ],
    facts: [
      { kind: 'integrations', label: 'OHIP + MCEDT' },
      { kind: 'status', label: 'Runs overnight, unattended' },
    ],
    image: '/images/work/healthcare-insurance-automation.jpg',
    imageCredit: 'Koen Sweers / Unsplash',
    title: 'Healthcare Insurance Claims Automation',
    client: 'Healthcare platform, Canada',
    industry: 'Healthcare',
    category: ['ai', 'platforms'],
    featured: true,
    year: '2024',
    summary:
      'OHIP real-time eligibility checks, MCEDT payment reconciliation and automated XML/EDI batch claims. What took a team days now runs overnight without oversight.',
    metrics: [
      { value: '100%', label: 'Claims processed automatically' },
      { value: '80%+', label: 'Manual data entry eliminated' },
      { value: 'Overnight', label: 'Batch cycle, zero oversight' },
    ],
    tags: ['OHIP API', 'EDI', 'Odoo', 'Python', 'Healthcare'],
    stack: ['Python', 'Odoo', 'OHIP API', 'MCEDT / WSDL', 'XML / EDI'],
    services: ['enterprise-platforms', 'ai'],
    problem:
      'A Canadian healthcare platform was processing OHIP insurance claims by hand. Eligibility checks, payment reconciliation and EDI batch submissions each needed a person in the loop.',
    approach:
      'We integrated OHIP APIs for real-time eligibility verification, built MCEDT/WSDL payment reconciliation, and automated XML/EDI batch claim generation with rule-based validation. Exceptions route to a review queue; everything else submits itself.',
    outcome:
      'Claims validate, batch and submit overnight. Reconciliation runs on its own. The team reviews exceptions instead of typing claims.',
    body: [
      { type: 'p', text: 'A Canadian healthcare platform was processing OHIP insurance claims by hand. Eligibility checks, payment reconciliation and EDI batch submissions each needed a person in the loop.' },
      { type: 'h2', text: 'The build' },
      {
        type: 'ul',
        items: [
          'Real-time OHIP eligibility verification via API',
          'MCEDT/WSDL integration for payment reconciliation',
          'Automated XML/EDI batch claim generation',
          'Rule-based validation before every submission',
          'Exception queue for the few claims that need a human',
        ],
      },
      { type: 'stat', items: [{ value: '100%', label: 'Claims processed automatically' }, { value: '80%+', label: 'Manual data entry eliminated' }] },
      { type: 'h2', text: 'Outcome' },
      { type: 'p', text: 'Claims are validated, batched and submitted overnight. Reconciliation runs on its own. What took a team days now finishes before the office opens, and the team reviews exceptions instead of typing claims.' },
      { type: 'p', text: 'Integrated directly into the platform’s ERP, so billing, patient records and payments share one source of truth.' },
    ],
  },
  {
    slug: 'line-of-credit-platform',
    challenge: 'A lending book run out of spreadsheets, where one person understood the formulas.',
    hardPart: 'Removing every manual step from a credit lifecycle while keeping a complete audit trail on each state change.',
    flow: [
      { kind: 'input', step: 'Application', note: 'Borrower submits' },
      { kind: 'code', step: 'Credit lifecycle', note: 'Zero manual steps' },
      { kind: 'guard', step: 'Audit trail', note: '100% coverage, every state change' },
      { kind: 'code', step: 'Payment rails', note: '2 integrated' },
      { kind: 'output', step: 'Disbursed', note: 'Traceable end to end' },
    ],
    facts: [
      { kind: 'integrations', label: '2 payment rails' },
    ],
    image: '/images/work/line-of-credit-platform.jpg',
    imageCredit: 'Himmel S / Unsplash',
    title: 'Line of Credit Lending Platform',
    client: 'Lending enterprise',
    industry: 'Financial services',
    category: ['platforms'],
    featured: true,
    year: '2024',
    summary:
      'Full lending lifecycle built from scratch: Plaid bank verification, Stripe disbursements and repayments, multi-location credit rules, automated statements and interest.',
    metrics: [
      { value: '0', label: 'Manual steps in the credit lifecycle' },
      { value: '100%', label: 'Audit trail coverage' },
      { value: '2', label: 'Payment rails integrated' },
    ],
    tags: ['Plaid', 'Stripe', 'FinTech', 'Odoo', 'Accounting'],
    stack: ['Odoo', 'Python', 'Plaid', 'Stripe', 'React', 'PostgreSQL'],
    services: ['enterprise-platforms', 'security'],
    problem:
      'The client was running a lending business out of spreadsheets. Disbursements, repayments, statements and interest lived in cells that only one person understood.',
    approach:
      'We built the full lifecycle on an accounting core: Plaid for bank verification at onboarding, Stripe for disbursements and repayments, multi-location credit rules, automated statement generation and an interest and fee engine. Every movement is logged.',
    outcome:
      'The platform runs the entire credit lifecycle with zero manual intervention. Finance sees every balance in real time. Auditors get a trail instead of a spreadsheet.',
    body: [
      { type: 'p', text: 'The client was running a lending business out of spreadsheets. Disbursements, repayments, statements and interest all lived in cells that only one person understood.' },
      { type: 'h2', text: 'What we built' },
      {
        type: 'ul',
        items: [
          'Plaid bank account verification at onboarding',
          'Stripe-powered disbursements and repayments',
          'Multi-location credit rules and limits',
          'Automated statement generation',
          'Interest and fee calculation engine',
          'Complete audit trail on every movement',
        ],
      },
      { type: 'stat', items: [{ value: '0', label: 'Manual steps in the credit lifecycle' }, { value: '100%', label: 'Audit trail coverage' }] },
      { type: 'h2', text: 'Outcome' },
      { type: 'p', text: 'The platform runs the entire credit lifecycle without manual intervention. Finance sees every balance in real time. Auditors get a trail instead of a spreadsheet.' },
      { type: 'p', text: 'Built on the ERP’s accounting core, so ledgers reconcile automatically instead of by export.' },
    ],
  },
  {
    slug: 'quotemaker',
    challenge: 'Quotes sent as WhatsApp messages and Google Docs, with no idea whether the client ever opened them.',
    hardPart: 'A public quote portal that stays branded and trackable without asking the recipient to sign in.',
    facts: [
      { kind: 'status', label: 'Live product' },
    ],
    image: '/images/work/quotemaker.jpg',
    imageCredit: 'Ionela Mat / Unsplash',
    title: 'QuoteMaker',
    client: 'In-house product',
    industry: 'SaaS',
    category: ['product'],
    featured: true,
    year: '2025',
    summary:
      'Our own quote and proposal builder. Branded quotes in minutes, shared by a single link with no client login, and instant notifications on view or accept.',
    metrics: [
      { value: '1 link', label: 'No client login needed' },
      { value: 'Instant', label: 'View and accept alerts' },
      { value: '1 click', label: 'Quote to invoice' },
    ],
    tags: ['Next.js', 'Supabase', 'Flask', 'SaaS', 'Tailwind CSS'],
    stack: ['Next.js', 'React', 'Supabase', 'Flask', 'Tailwind CSS'],
    services: ['enterprise-platforms', 'cloud-devops'],
    problem:
      'Sales teams and freelancers lose deals to quotes sent as WhatsApp messages and Google Docs. They look unprofessional, and nobody knows if the client opened them.',
    approach:
      'We built QuoteMaker as a standalone SaaS with auth, billing and a public quote portal. Line items, taxes and discounts in a branded layout. One shareable link, no client account. View and accept events push notifications the moment they happen.',
    outcome:
      'Quotes go out in minutes and look the part. Follow-ups land at the right moment because you know when the client opened it. Accepted quotes become invoices in one click.',
    body: [
      { type: 'p', text: 'Sales teams and freelancers lose deals to quotes sent as WhatsApp messages and Google Docs. They look unprofessional, and nobody knows if the client opened them.' },
      { type: 'h2', text: 'What QuoteMaker does' },
      {
        type: 'ul',
        items: [
          'Build branded quotes in minutes: line items, taxes, discounts',
          'Share via a single link. No client login, no app, any device',
          'Instant notification when the client views the quote',
          'One-click accept for clients, with an immediate alert to you',
          'Convert an accepted quote to an invoice in one click',
          'Product catalogue and templates with autocomplete',
        ],
      },
      { type: 'h2', text: 'Three steps to a closed deal' },
      { type: 'p', text: 'Build the quote. Send the link. Get notified when they open it, and again when they accept.' },
      { type: 'stat', items: [{ value: '1 link', label: 'No client login' }, { value: 'Instant', label: 'View and accept alerts' }, { value: '1 click', label: 'Quote to invoice' }] },
      { type: 'h2', text: 'Built because we needed it' },
      { type: 'p', text: 'We quote enterprise work every week. QuoteMaker started as our internal tool and shipped as a standalone SaaS with auth, billing and a public quote portal. Available on request for teams that want it deployed around their own process.' },
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'QuoteMaker',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      // Route moved from /products/quotemaker to /work/quotemaker (see redirects.js).
      url: 'https://codecrafters.in/work/quotemaker',
      description:
        'Create professional quotes in minutes. Share via link, no client login needed. Get notified when clients view or accept.',
      author: {
        '@type': 'Organization',
        name: 'CodeCrafters',
        url: 'https://codecrafters.in',
      },
      featureList: [
        'Professional quote builder',
        'Share via link, no client login',
        'Real-time view and accept notifications',
        'Convert quote to invoice',
        'Product catalog and templates',
      ],
    },
  },
  {
    slug: 'email-intelligence-saas',
    challenge: 'Turning a Gmail inbox into structured, actionable events — at scale, without leaking a single token.',
    hardPart: 'Five AI providers behind one registry, structured outputs schema-checked before anything downstream trusts them.',
    flow: [
      { kind: 'input', step: 'Inbox scan', note: '5-min, 2-hour and daily cadences' },
      { kind: 'code', step: 'AI Gateway routing', note: '5 providers, one model registry' },
      { kind: 'llm', step: 'Classification', note: 'Structured output' },
      { kind: 'guard', step: 'Zod validation', note: 'Schema-checked before it is trusted' },
      { kind: 'guard', step: 'AES-256-GCM', note: 'Server-side, no browser key exposure' },
      { kind: 'data', step: 'Supabase RLS', note: 'Row-level isolation per tenant' },
    ],
    facts: [
      { kind: 'integrations', label: '5 AI providers unified' },
    ],
    image: '/images/work/email-intelligence-saas.jpg',
    imageCredit: 'Faraaz Zuberi / Unsplash',
    title: 'Email Intelligence SaaS Platform',
    client: 'SaaS startup, Australia',
    industry: 'Consumer SaaS',
    category: ['ai', 'cloud'],
    featured: true,
    year: '2026',
    summary:
      'LLM pipeline that classifies Gmail into structured life events with Zod-validated outputs. Five AI providers behind one gateway, AES-256-GCM token storage, three-tier monetisation.',
    metrics: [
      { value: '5', label: 'AI providers unified' },
      { value: '3', label: 'Scan cadences: 5-min, 2-hr, daily' },
      { value: 'AES-256', label: 'GCM server-side encryption' },
    ],
    tags: ['Next.js', 'LLM', 'Supabase', 'Vercel AI Gateway', 'SaaS', 'OAuth'],
    stack: ['Next.js App Router', 'React Server Components', 'Supabase RLS', 'Vercel AI Gateway', 'Zod', 'Google OAuth (PKCE)'],
    services: ['ai', 'security', 'cloud-devops'],
    problem:
      'A consumer SaaS needed to turn a Gmail inbox into structured, actionable life events at scale, across multiple AI providers, without leaking a single token.',
    approach:
      'We built the pipeline on Next.js App Router with Supabase RLS: LLM classification with Zod-validated structured outputs, multi-tier scanning with concurrency controls, and Vercel AI Gateway as unified routing across five providers. Auth moved from browser-passphrase E2EE to server-side AES-256-GCM.',
    outcome:
      'Emails become structured events on 5-minute, 2-hour and daily cadences. A class of client-side key exposure is gone. Free, Plus and Pro tiers earn from day one.',
    body: [
      { type: 'p', text: 'A consumer SaaS needed to turn a Gmail inbox into structured, actionable life events at scale, across multiple AI providers, without leaking a single token.' },
      { type: 'h2', text: 'Pipeline' },
      {
        type: 'ul',
        items: [
          'LLM classification with Zod-validated structured outputs',
          'Multi-tier scanning with concurrency controls across 5-minute, 2-hour and daily cadences',
          'Vercel AI Gateway as unified routing across five providers with a central model registry',
          'Next.js App Router with React Server Components and Supabase RLS',
          'PKCE-based Google OAuth',
        ],
      },
      { type: 'h2', text: 'Security' },
      { type: 'p', text: 'We replaced a browser-passphrase E2EE model with server-side AES-256-GCM token encryption, eliminating a class of client-side key exposure vulnerabilities without changing the user experience.' },
      { type: 'stat', items: [{ value: '5', label: 'AI providers unified' }, { value: '3', label: 'Scan cadences' }, { value: '3', label: 'SaaS tiers' }] },
      { type: 'h2', text: 'Monetisation' },
      { type: 'p', text: 'Free, Plus and Pro tiers with scan quotas, AdSense and rewarded-ad credit top-ups. The product earns from day one instead of waiting for a pricing page.' },
    ],
  },
  {
    slug: 'textile-wholesale-erp-b2b',
    challenge: 'Pricing lived in people’s heads, commissions in spreadsheets, and stock in a system nobody trusted.',
    hardPart: 'Seventeen modules and a gated B2B storefront reconciled onto one source of truth for stock and price.',
    facts: [
      { kind: 'integrations', label: '17 modules, one platform' },
    ],
    image: '/images/work/textile-wholesale-erp-b2b.jpg',
    imageCredit: 'Arum Visuals / Unsplash',
    title: 'Textile Wholesale ERP & B2B Commerce',
    client: 'Textile wholesaler, India',
    industry: 'Textiles & wholesale',
    category: ['platforms'],
    featured: true,
    summary:
      'A 17-module ERP with B2B storefront, customer-specific pricing, agent commissions, barcode tablet sales, watermarked catalogues and batch payouts.',
    metrics: [
      { value: '17', label: 'Modules on one platform' },
      { value: '1', label: 'Source of truth for stock and pricing' },
      { value: 'Batch', label: 'Agent payouts, automated' },
    ],
    tags: ['Odoo', 'Python', 'B2B', 'ERP', 'OWL'],
    stack: ['Odoo', 'Python', 'OWL', 'PostgreSQL'],
    services: ['enterprise-platforms', 'data-dashboards'],
    problem:
      'A textile wholesaler ran sales through agents, catalogues and phone calls. Pricing lived in heads, commissions in spreadsheets, and stock in a system nobody trusted.',
    approach:
      'We built a 17-module ERP with a gated B2B storefront on top: customer-specific pricing, agent commission tracking with batch payouts, barcode-driven tablet sales on the floor, and watermarked digital catalogues to stop price leakage.',
    outcome:
      'Agents sell from live stock and live prices. Commissions calculate themselves. Catalogues go out watermarked, so pricing stays with the customers it was meant for.',
    body: [
      { type: 'p', text: 'A textile wholesaler ran sales through agents, catalogues and phone calls. Pricing lived in heads, commissions in spreadsheets, and stock in a system nobody trusted.' },
      { type: 'h2', text: 'The platform' },
      {
        type: 'ul',
        items: [
          '17 modules on one ERP: inventory, pricing, sales, accounting and more',
          'B2B storefront with customer-specific pricing and gated access',
          'Agent commission tracking with batch payout runs',
          'Barcode-driven tablet sales on the floor',
          'Watermarked digital catalogues to stop price leakage',
        ],
      },
      { type: 'stat', items: [{ value: '17', label: 'Modules' }, { value: '1', label: 'Source of truth' }] },
      { type: 'h2', text: 'Outcome' },
      { type: 'p', text: 'Agents sell from live stock and live prices. Commissions calculate themselves. Catalogues go out watermarked, so pricing stays with the customers it was meant for.' },
    ],
  },
  {
    slug: 'forecasting-traceability-dashboards',
    challenge: 'Multi-warehouse inventory planned on last month’s numbers, with discrepancies found only at count time.',
    hardPart: 'Forecasting that stays honest when the underlying stock data has been wrong for years.',
    facts: [
      { kind: 'scale', label: 'Multi-warehouse' },
    ],
    image: '/images/work/forecasting-traceability-dashboards.jpg',
    imageCredit: 'Luke Chesser / Unsplash',
    title: 'Forecasting & Traceability Dashboards',
    client: 'Multi-warehouse distributor, India',
    industry: 'Distribution & inventory',
    category: ['data', 'ai'],
    featured: true,
    year: '2023',
    summary:
      'Time-series sales forecasting and end-to-end stock traceability dashboards. Inventory planning accuracy up 45%, stock discrepancies down 60%.',
    metrics: [
      { value: '+45%', label: 'Inventory planning accuracy' },
      { value: '−60%', label: 'Stock discrepancies' },
      { value: 'Real-time', label: 'Stock tracking' },
    ],
    tags: ['Python', 'OWL', 'Odoo', 'BI', 'Time-Series ML', 'Chart.js'],
    stack: ['Python', 'OWL', 'Chart.js', 'Odoo', 'PostgreSQL'],
    services: ['data-dashboards', 'ai'],
    problem:
      'Multi-warehouse operations were planning inventory on last month’s numbers and discovering discrepancies at count time.',
    approach:
      'We built a time-series forecasting dashboard integrated with the sales and inventory modules, and a traceability dashboard that follows stock from supplier receipt to customer delivery, both in Python and OWL with Chart.js visualisation and variance alerts.',
    outcome:
      'Planners order against a forecast instead of a hunch. Discrepancies surface the day they happen, not at quarter-end. +45% planning accuracy, 60% fewer discrepancies.',
    body: [
      { type: 'p', text: 'Multi-warehouse operations were planning inventory on last month’s numbers and discovering discrepancies at count time.' },
      { type: 'h2', text: 'What we built' },
      {
        type: 'ul',
        items: [
          'Time-series sales forecasting integrated with sales and inventory modules',
          'Stock traceability from supplier receipt to customer delivery',
          'Real-time dashboards in Python and OWL with Chart.js visualisation',
          'Alerts on variance thresholds',
        ],
      },
      { type: 'stat', items: [{ value: '+45%', label: 'Inventory planning accuracy' }, { value: '−60%', label: 'Stock discrepancies' }] },
      { type: 'h2', text: 'Outcome' },
      { type: 'p', text: 'Planners order against a forecast instead of a hunch. Discrepancies surface the day they happen, not at quarter-end.' },
    ],
  },

  // ── Also built ───────────────────────────────────────────────────────────
  {
    slug: 'ocr-invoice-engine',
    challenge: 'A finance team retyping supplier invoices into the ERP, three hours a day.',
    hardPart: 'Confidence scoring calibrated so humans see only the edge cases — and never miss a bad extraction.',
    flow: [
      { kind: 'input', step: 'Invoice arrives', note: 'Email or PDF' },
      { kind: 'llm', step: 'Extraction', note: 'Fields read from the document' },
      { kind: 'guard', step: 'Confidence scoring', note: 'Low-confidence rows flagged' },
      { kind: 'human', step: 'Edge-case review', note: 'Humans see only the exceptions' },
      { kind: 'code', step: 'ERP sync', note: 'Validated rows written through' },
    ],
    image: '/images/work/ocr-invoice-engine.jpg',
    imageCredit: 'Wesley Tingey / Unsplash',
    title: 'OCR Invoice Processing Engine',
    client: 'Manufacturing company',
    industry: 'Manufacturing',
    category: ['ai', 'platforms'],
    featured: false,
    year: '2024',
    summary:
      'Automated invoice and bill processing with intelligent field matching and confidence scoring. Low-confidence extractions route to a human. Everything else posts itself.',
    metrics: [
      { value: '80%', label: 'Manual entry eliminated' },
      { value: '3 hrs/day', label: 'Saved per finance team' },
    ],
    tags: ['OCR', 'Odoo', 'Python', 'ML'],
    stack: ['Python', 'Odoo', 'OCR'],
    services: ['ai', 'enterprise-platforms'],
    testimonialId: 'ocr',
  },
  {
    slug: 'ai-meeting-intelligence',
    challenge: 'Decisions made in meetings that nobody could find again a week later.',
    hardPart: 'Retrieval over every transcript, accurate enough that the answer can be trusted without replaying the call.',
    image: '/images/work/ai-meeting-intelligence.jpg',
    imageCredit: 'Nastuh Abootalebi / Unsplash',
    title: 'AI Meeting Intelligence Assistant',
    client: 'Productivity startup',
    industry: 'Productivity SaaS',
    category: ['ai'],
    featured: false,
    summary:
      'Audio capture to AI summarisation to action items. Mind-maps, conversational Q&A over transcripts and a searchable knowledge base of every meeting.',
    metrics: [
      { value: 'RAG', label: 'Q&A over every transcript' },
      { value: 'Auto', label: 'TODOs and mind-maps' },
    ],
    tags: ['LLM', 'Audio AI', 'RAG', 'React', 'Flask'],
    stack: ['Python', 'Flask', 'React', 'LLM'],
    services: ['ai', 'data-dashboards'],
  },
  {
    slug: 'ai-screen-assistant',
    challenge: 'Guiding someone through unfamiliar software without taking over their screen.',
    hardPart: 'Vision, voice and session memory kept in sync at low enough latency to feel like a conversation.',
    image: '/images/work/ai-screen-assistant.jpg',
    imageCredit: 'Nikita Kachanovsky / Unsplash',
    title: 'AI Real-Time Screen Assistant',
    client: 'Internal R&D',
    industry: 'AI tooling',
    category: ['ai'],
    featured: false,
    summary:
      'Live screen analysis through Gemini Vision with voice interaction, session memory and low-latency streaming. Copilot-style guidance for whatever is on screen.',
    metrics: [
      { value: 'Live', label: 'Screen analysis via Gemini Vision' },
      { value: 'Low-latency', label: 'Voice in, voice out' },
    ],
    tags: ['Gemini Vision', 'Voice AI', 'Python', 'Streaming'],
    stack: ['Python', 'Gemini Vision', 'WebSockets'],
    services: ['ai'],
  },
  {
    slug: 'multi-vendor-ecommerce',
    challenge: 'A retail group growing faster than the ops team it could afford to hire.',
    hardPart: 'Multi-vendor configurators and two payment rails wired straight into live inventory and fulfilment.',
    image: '/images/work/multi-vendor-ecommerce.jpg',
    imageCredit: 'Luke Heibert / Unsplash',
    title: 'Multi-Vendor eCommerce Platform',
    client: 'Retail group',
    industry: 'Retail & eCommerce',
    category: ['platforms'],
    featured: false,
    year: '2024',
    summary:
      'Product configurators, multi-vendor support, GoCardless and Stripe payments, and custom OWL and Bootstrap themes, connected directly to inventory and fulfilment.',
    metrics: [
      { value: '10x', label: 'Transaction volume, same team' },
      { value: '2', label: 'Payment gateways' },
    ],
    tags: ['Odoo', 'OWL', 'GoCardless', 'Stripe', 'eCommerce'],
    stack: ['Odoo', 'OWL', 'Bootstrap', 'Stripe', 'GoCardless'],
    services: ['enterprise-platforms', 'cloud-devops'],
    testimonialId: 'scale',
  },
  {
    slug: 'erp-migration-v14-v19',
    challenge: 'Five ERP versions behind, on deprecated APIs, and unable to stop trading for the upgrade.',
    hardPart: 'Rewriting business logic across accounting, helpdesk and eCommerce with zero downtime and zero records lost.',
    facts: [
      { kind: 'duration', label: '8 weeks to cutover' },
      { kind: 'status', label: 'Zero downtime' },
    ],
    image: '/images/work/erp-migration-v14-v19.jpg',
    imageCredit: 'Scott Rodgerson / Unsplash',
    title: 'ERP Migration & Modernisation',
    client: 'eCommerce group',
    industry: 'Retail & eCommerce',
    category: ['platforms'],
    featured: false,
    year: '2025',
    summary:
      'Full-stack migration across five major ERP versions. Business logic rewritten, OWL components modernised, deprecated APIs replaced across accounting, helpdesk and eCommerce. Zero data loss.',
    metrics: [
      { value: '0', label: 'Downtime' },
      { value: '0', label: 'Records lost' },
      { value: '8 wks', label: 'Start to cutover' },
    ],
    tags: ['Odoo v14–v19', 'OWL', 'PostgreSQL', 'ETL'],
    stack: ['Odoo', 'Python', 'OWL', 'PostgreSQL', 'ETL framework'],
    services: ['enterprise-platforms'],
    testimonialId: 'migration',
  },
  {
    slug: 'ai-customer-engagement-crm',
    challenge: 'Customer conversations answered slowly, and follow-ups booked by hand.',
    hardPart: 'Drafting replies and booking against live calendar availability from inside the CRM the team already uses.',
    image: '/images/work/ai-customer-engagement-crm.jpg',
    imageCredit: 'Vitaly Gariev / Unsplash',
    title: 'AI Customer Engagement for CRM',
    client: 'Services business',
    industry: 'Professional services',
    category: ['ai', 'platforms'],
    featured: false,
    year: '2024',
    summary:
      'Analyses customer conversations, generates response suggestions and books appointments against live calendar availability, inside the CRM the team already uses.',
    metrics: [
      { value: 'Auto', label: 'Response drafting' },
      { value: 'Live', label: 'Calendar-aware scheduling' },
    ],
    tags: ['LLM', 'Odoo CRM', 'Python'],
    stack: ['Python', 'Odoo', 'LLM'],
    services: ['ai', 'enterprise-platforms'],
  },
  {
    slug: 'portal-order-approval-engine',
    challenge: 'Orders taking four hours to clear credit control, held up in inboxes.',
    hardPart: 'Multi-stage approvals that keep orders editable without breaking workflow integrity mid-flight.',
    flow: [
      { kind: 'input', step: 'Order placed', note: 'Through the portal' },
      { kind: 'code', step: 'Approval routing', note: 'Rules, not inboxes' },
      { kind: 'guard', step: 'Policy check', note: 'Before anything commits' },
      { kind: 'data', step: 'ERP write', note: 'Single source of truth' },
      { kind: 'output', step: '4h → 8min', note: 'Same order, same people' },
    ],
    image: '/images/work/portal-order-approval-engine.jpg',
    imageCredit: 'Razvan Mirel / Unsplash',
    title: 'Portal Order Approval Engine',
    client: 'Logistics enterprise',
    industry: 'Logistics & supply chain',
    category: ['platforms'],
    featured: false,
    year: '2025',
    summary:
      'Multi-stage credit control checks, manager validations and real-time notifications. Orders stay editable without breaking workflow integrity.',
    metrics: [
      { value: '96%', label: 'Faster order processing' },
      { value: '4h → 8min', label: 'Per order' },
    ],
    tags: ['Odoo', 'Python', 'OWL', 'Workflow'],
    stack: ['Odoo', 'Python', 'OWL', 'PostgreSQL'],
    services: ['enterprise-platforms'],
    testimonialId: 'logistics',
  },
  {
    slug: 'multi-team-helpdesk',
    challenge: 'Tickets bouncing between teams before reaching anyone who could act.',
    hardPart: 'Workload-aware auto-assignment with routing boundaries teams cannot accidentally cross.',
    image: '/images/work/multi-team-helpdesk.jpg',
    imageCredit: 'Nevin Ruttanaboonta / Unsplash',
    title: 'Multi-Team Helpdesk System',
    client: 'Enterprise services provider',
    industry: 'Enterprise operations',
    category: ['platforms'],
    featured: false,
    year: '2025',
    summary:
      'Role-based visibility, workload-aware auto-assignment and enforced routing boundaries across teams. Tickets land with the right person the first time.',
    metrics: [
      { value: 'Auto', label: 'Workload-aware assignment' },
      { value: 'Role-gated', label: 'Visibility per team' },
    ],
    tags: ['Odoo', 'Python', 'OWL', 'Helpdesk'],
    stack: ['Odoo', 'Python', 'OWL'],
    services: ['enterprise-platforms'],
  },
  {
    slug: 'saaskit-automation-devops',
    challenge: 'Every new tenant needing a manual server build before they could start.',
    hardPart: 'Droplet provisioning, container lifecycle and environment isolation reduced to minutes per tenant.',
    image: '/images/work/saaskit-automation-devops.jpg',
    imageCredit: 'Kevin Ache / Unsplash',
    title: 'SaaSKit Provisioning & DevOps Framework',
    client: 'SaaS operator',
    industry: 'SaaS infrastructure',
    category: ['cloud'],
    featured: false,
    summary:
      'DigitalOcean droplet provisioning, Docker container lifecycle, Telegram bot monitoring and multi-instance onboarding with environment isolation. A new tenant in minutes.',
    metrics: [
      { value: 'Minutes', label: 'Per new instance' },
      { value: 'Isolated', label: 'Environment per tenant' },
    ],
    tags: ['DigitalOcean', 'Docker', 'Telegram', 'DevOps'],
    stack: ['DigitalOcean', 'Docker', 'Python', 'Telegram Bot API'],
    services: ['cloud-devops'],
  },
  {
    slug: 'claude-mcp-erp-integration',
    challenge: 'Getting a language model to work against a production ERP database safely, in real time.',
    hardPart: 'Retry queues, conflict handling and async pipelines so a failed call never corrupts a live record.',
    image: '/images/work/claude-mcp-erp-integration.jpg',
    imageCredit: 'K. K. / Unsplash',
    title: 'Claude MCP Integration for Live ERP Data',
    client: 'Enterprise ERP client',
    industry: 'Enterprise operations',
    category: ['ai', 'platforms'],
    featured: false,
    year: '2025',
    summary:
      'Claude MCP connected to a production ERP database for real-time interaction, with retry queues, conflict handling and async processing pipelines.',
    metrics: [
      { value: 'Real-time', label: 'Database interaction' },
      { value: 'Async', label: 'Retry queues and conflict handling' },
    ],
    tags: ['Claude MCP', 'Odoo', 'Python', 'Async'],
    stack: ['Python', 'Claude MCP', 'Odoo', 'PostgreSQL'],
    services: ['ai', 'enterprise-platforms'],
  },
  {
    slug: 'stock-prediction-research',
    challenge: 'Whether hybrid deep learning genuinely beats classical models on Indian equities.',
    hardPart: 'LSTM, CNN and ARIMA combined with sentiment, held to peer review at 92% on Nifty50.',
    facts: [
      { kind: 'status', label: 'Published, Elsevier' },
    ],
    image: '/images/work/stock-prediction-research.jpg',
    imageCredit: 'Nick Chong / Unsplash',
    title: 'Hybrid Deep Learning for Stock Prediction',
    client: 'Peer-reviewed research',
    industry: 'Research',
    category: ['research', 'ai'],
    featured: false,
    year: '2022',
    link: 'https://doi.org/10.1016/j.iswa.2022.200111',
    summary:
      'Hybrid LSTM, CNN and ARIMA models with sentiment analysis, reaching 92% accuracy on Nifty50 prediction. Published in Intelligent Systems with Applications (Elsevier).',
    metrics: [
      { value: '92%', label: 'Nifty50 prediction accuracy' },
      { value: 'Elsevier', label: 'Peer-reviewed publication' },
    ],
    tags: ['LSTM', 'CNN', 'ARIMA', 'TensorFlow', 'Research'],
    stack: ['Python', 'TensorFlow', 'Keras', 'Pandas'],
    services: ['ai', 'data-dashboards'],
  },
  {
    slug: 'emg-bionic-arm',
    challenge: 'Reading hand gestures from muscle signals noisy enough to defeat naive classifiers.',
    hardPart: 'Noise-filtered EMG into a CNN classifier reaching 95% gesture accuracy.',
    facts: [
      { kind: 'status', label: 'Peer-reviewed' },
    ],
    image: '/images/work/emg-bionic-arm.jpg',
    imageCredit: 'Getty Images / Unsplash',
    title: 'EMG-Controlled Bionic Arm',
    client: 'Thesis research',
    industry: 'Research',
    category: ['research', 'ai'],
    featured: false,
    year: '2022',
    summary:
      'Noise-filtered EMG signal processing and a CNN classifier for hand-gesture recognition at 95% accuracy. Thesis project on bionic arm control with machine learning.',
    metrics: [
      { value: '95%', label: 'Gesture recognition accuracy' },
      { value: 'CNN', label: 'On noise-filtered EMG' },
    ],
    tags: ['CNN', 'Signal Processing', 'Embedded', 'TensorFlow'],
    stack: ['Python', 'TensorFlow', 'Signal processing', 'Embedded'],
    services: ['ai'],
  },
]

export const workBySlug = Object.fromEntries(work.map((w) => [w.slug, w]))

export const featuredWork = work.filter((w) => w.featured)

export default work
