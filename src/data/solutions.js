// Solution lines: five Odoo-first core services plus three other services. `icon` values map to a separate Icon component (lucide names).
import { odooUseCases } from './odooUseCases.js'

const baseSolutions = [
  {
    slug: 'odoo',
    core: true,
    order: 1,
    num: '01',
    eyebrow: 'Odoo implementation',
    title: 'Odoo Implementation',
    short: 'Odoo set up around how your business really works, and a team that actually uses it.',
    headline: 'Odoo implementation for growing businesses.',
    intro:
      'We set up Odoo for growing businesses with 20 to 500 people: sales, stock, purchase, accounting, manufacturing and invoicing in one system. We map how you work first, move your data across, train your team, and stay until the spreadsheets are gone.',
    icon: 'grid',
    bullets: [
      'Odoo setup for sales, CRM, inventory, purchase, accounting and manufacturing',
      'Moving off Tally, spreadsheets or an old ERP, with every record checked',
      'Multi-company and multi-warehouse setups',
      'Customer portals and B2B ordering on top of Odoo',
      'Training and support until your team runs it without us',
      'Fixed-price projects from $5,000',
    ],
    deliverables: [
      {
        title: 'Sales and CRM',
        desc: 'Leads, quotations, sales orders and customer-specific pricing in one place, so nothing lives in someone’s head.',
      },
      {
        title: 'Inventory and purchase',
        desc: 'Stock that matches the shelf: multiple warehouses, barcodes, reordering rules and supplier purchase orders.',
      },
      {
        title: 'Accounting and invoicing',
        desc: 'Invoices created from orders, not retyped. Payments, reconciliation and tax reports from the same data.',
      },
      {
        title: 'Manufacturing',
        desc: 'Bills of materials, work orders and costing for businesses that make what they sell.',
      },
      {
        title: 'Portals and B2B ordering',
        desc: 'Customers and agents order online with their own prices, approvals and commissions built in.',
      },
      {
        title: 'Training and adoption',
        desc: 'Staged rollout, hands-on training and support until your team uses Odoo every day.',
      },
    ],
    process: [
      { num: '01', title: 'Understand', desc: 'We sit with your team and map how orders, stock and money actually move today.' },
      { num: '02', title: 'Plan', desc: 'Which Odoo apps you need, what to configure, what (if anything) needs a custom module.' },
      { num: '03', title: 'Set up', desc: 'We build it in a test copy. Your team tries it with real examples before go-live.' },
      { num: '04', title: 'Move your data', desc: 'Customers, products, stock and opening balances moved across and checked.' },
      { num: '05', title: 'Go live', desc: 'One team or one warehouse at a time. No big-bang switchover.' },
      { num: '06', title: 'Improve', desc: 'We fix what slows people down in the first weeks and keep improving it.' },
    ],
    stats: [
      { value: '120+', label: 'Custom Odoo modules' },
      { value: '15+', label: 'ERP migrations delivered' },
      { value: '96%', label: 'Faster order processing' },
    ],
    tech: ['Odoo 14–19', 'Community', 'Enterprise', 'Sales', 'CRM', 'Inventory', 'Purchase', 'Accounting', 'Manufacturing', 'eCommerce', 'Helpdesk'],
    related: ['textile-wholesale-erp-b2b', 'portal-order-approval-engine', 'erp-migration-v14-v19'],
    faq: ['odoo-edition', 'odoo-rescue', 'pricing', 'timelines'],
    faqItems: [
      { q: 'How long does an Odoo implementation take for a small business?', a: 'A focused setup (sales, inventory, invoicing) for a small business usually takes 3 to 6 weeks. Manufacturing, multi-company or a migration with years of history takes 2 to 4 months. First working results usually land within 14 business days.' },
      { q: 'Which Odoo apps does a typical SME start with?', a: 'Most start with Sales, Inventory, Purchase and Invoicing or Accounting, then add CRM, Manufacturing, POS or eCommerce as needed. We recommend only the apps you will use in the first six months.' },
    ],
    bodyTitle: 'Odoo implementation for Indian SMEs, explained.',
    body: [
      { type: 'h2', text: 'What an Odoo implementation includes', id: 'what-it-includes' },
      {
        type: 'p',
        text: "An Odoo implementation turns standard Odoo into the system your business runs on. It covers choosing the apps, configuring them to your process, moving your data in, building anything Odoo does not do out of the box, training your team and supporting you after go-live. Buying Odoo licences is separate and paid to Odoo directly.",
      },
      { type: 'h2', text: 'Which Odoo apps fit which business', id: 'apps-by-business' },
      {
        type: 'table',
        head: ['Business type', 'Typical starting apps', 'Often added later'],
        rows: [
          ['Trading and distribution', 'Sales, Purchase, Inventory, Invoicing or Accounting', 'CRM, customer portal, barcode, eCommerce'],
          ['Manufacturing', 'Manufacturing (MRP), Inventory, Purchase, Sales, Accounting', 'Quality, Maintenance, PLM, subcontracting'],
          ['Retail', 'Point of Sale, Inventory, Accounting', 'eCommerce, loyalty, multi-store'],
          ['Textile and wholesale', 'Sales with customer price lists, Inventory, Accounting', 'Agent commissions, B2B portal, catalogues'],
          ['Services', 'CRM, Sales, Project, Timesheets, Invoicing', 'Helpdesk, field service, subscriptions'],
        ],
        caption: 'Starting points, not rules. We recommend only the apps you will use in the first six months.',
      },
      { type: 'h2', text: 'What is different about Odoo in India', id: 'india' },
      {
        type: 'ul',
        items: [
          "**GST from day one:** taxes, HSN codes, GSTR reports, e-invoicing and e-way bills through Odoo's India localisation.",
          "**Moving off Tally:** most Indian SMEs start on Tally and Excel. See the [Tally to Odoo migration guide](/insights/tally-to-odoo-migration).",
          "**Multiple GSTINs and branches:** separate books per registration, consolidated reports for the owner.",
          "**Licence cost in rupees:** from ₹580 per user per month on Standard, billed yearly. See [Odoo price in India](/insights/odoo-price-india).",
        ],
      },
      { type: 'h2', text: 'Guides before you decide', id: 'guides' },
      {
        type: 'ul',
        items: [
          "[Odoo implementation cost in India](/insights/odoo-implementation-cost-india): what drives the quote and what to ask before you sign.",
          "[Odoo Community vs Enterprise](/insights/odoo-community-vs-enterprise): which edition fits an SME.",
          "[Odoo vs Tally Prime](/insights/odoo-vs-tally): when Tally is enough and when to move.",
        ],
      },
    ],
    seo: {
      title: 'Odoo Implementation Services for Growing Businesses | CodeCrafters',
      description:
        'Odoo implementation in Ahmedabad, India for businesses with 20 to 500 people: sales, stock, accounting and manufacturing set up so your team uses it.',
    },
  },
  {
    slug: 'odoo-migration',
    core: true,
    order: 2,
    num: '02',
    eyebrow: 'Odoo migration',
    title: 'Odoo Migration & Upgrades',
    short: 'Upgrade to the latest Odoo, or move from Tally or another system, without losing data.',
    headline: 'Upgrade Odoo without stopping the business.',
    intro:
      'Stuck on an old Odoo version, or still running on Tally and spreadsheets? We move you to current Odoo (up to v19), rewrite custom modules that would break, and check every record before you switch. 15+ migrations delivered with zero data loss.',
    icon: 'refresh',
    bullets: [
      'Odoo version upgrades, v14 to v19',
      'Custom modules rewritten for the new version',
      'Moving from Tally, spreadsheets or another ERP into Odoo',
      'Community to Enterprise moves',
      'Every record reconciled before go-live',
    ],
    deliverables: [
      {
        title: 'Version upgrades',
        desc: 'From older Odoo versions to the current one, including the jumps that change how modules are built.',
      },
      {
        title: 'Custom module rewrites',
        desc: 'Your custom features rebuilt for the new version, with deprecated code replaced, not patched.',
      },
      {
        title: 'Moving off Tally and spreadsheets',
        desc: 'Customers, products, stock and balances moved into Odoo, with the numbers checked against your books.',
      },
      {
        title: 'Data checks',
        desc: 'Every record counted and reconciled on a repeatable migration framework before anyone switches over.',
      },
      {
        title: 'Business keeps running',
        desc: 'We plan the cutover around your trading, so orders and invoicing do not stop.',
      },
    ],
    process: [
      { num: '01', title: 'Audit', desc: 'We list every module, customization and integration you run today.' },
      { num: '02', title: 'Plan', desc: 'What upgrades cleanly, what needs rewriting, and the cutover date.' },
      { num: '03', title: 'Test run', desc: 'A full trial migration on a copy, checked by your team.' },
      { num: '04', title: 'Switch', desc: 'The real move, timed around your business, with a fallback ready.' },
    ],
    stats: [
      { value: '15+', label: 'ERP migrations delivered' },
      { value: 'v14→v19', label: 'Across five Odoo versions' },
      { value: '0', label: 'Records lost in migration to date' },
    ],
    tech: ['Odoo 14–19', 'OWL', 'Python', 'PostgreSQL', 'Tally', 'Excel / CSV', 'ETL'],
    related: ['erp-migration-v14-v19', 'textile-wholesale-erp-b2b', 'multi-vendor-ecommerce'],
    faq: ['odoo-rescue', 'odoo-edition', 'timelines'],
    faqItems: [
      { q: 'Can you upgrade Odoo with our custom modules?', a: 'Yes. Custom modules are the hard part of every upgrade. We list each one, rewrite what breaks for the new version, and test it on a copy of your database before switching.' },
      { q: 'How do you migrate data from Tally to Odoo?', a: 'We export masters (customers, suppliers, products, ledgers) and balances from Tally, map them to Odoo, load open invoices so receivables carry over, and run both systems for one month-end until the numbers match.' },
      { q: 'Will we lose data during an Odoo upgrade?', a: 'Not if it is done properly. Every record is counted and reconciled on a test run first. Across 15+ migrations we have had zero data loss.' },
    ],
    seo: {
      title: 'Odoo Migration & Upgrade Services (v14 to v19) | CodeCrafters',
      description:
        'Odoo version upgrades and migrations from Tally or spreadsheets. Custom modules rewritten, every record reconciled. 15+ migrations, zero data loss.',
    },
  },
  {
    slug: 'odoo-customization',
    core: true,
    order: 3,
    num: '03',
    eyebrow: 'Odoo customization',
    title: 'Odoo Customization & Modules',
    short: 'Custom Odoo modules when standard Odoo does not fit how you work.',
    headline: 'When standard Odoo does not fit, we build what does.',
    intro:
      'Most businesses need a few things Odoo does not do out of the box: an approval step, a commission rule, a portal, a link to another system. We build them as proper Odoo modules that survive upgrades. 120+ shipped.',
    icon: 'puzzle',
    bullets: [
      'Custom Odoo modules and workflows',
      'Approval engines and credit control',
      'Customer, agent and vendor portals',
      'Integrations with payments, carriers and other software',
      'Odoo Studio clean-up and rebuilds',
    ],
    deliverables: [
      {
        title: 'Approvals and credit control',
        desc: 'Multi-step order approvals and credit checks that run inside Odoo, with alerts to the right person.',
      },
      {
        title: 'Portals',
        desc: 'Customer, agent and vendor portals with their own prices, orders and documents.',
      },
      {
        title: 'Helpdesk and service',
        desc: 'Ticket routing by team and workload, so requests reach someone who can act.',
      },
      {
        title: 'Integrations',
        desc: 'Payments (Stripe, GoCardless), carriers, accounting and industry systems connected to Odoo.',
      },
      {
        title: 'Reports and documents',
        desc: 'The invoices, delivery notes, catalogues and reports your business actually needs.',
      },
      {
        title: 'Built to upgrade',
        desc: 'Written as standard Odoo modules, so your next version upgrade does not break them.',
      },
    ],
    stats: [
      { value: '120+', label: 'Custom Odoo modules' },
      { value: '17', label: 'Modules in one wholesale build' },
      { value: '30+', label: 'Projects delivered' },
    ],
    tech: ['Odoo 14–19', 'Python', 'OWL', 'QWeb', 'PostgreSQL', 'REST APIs', 'Stripe', 'GoCardless'],
    related: ['portal-order-approval-engine', 'multi-team-helpdesk', 'textile-wholesale-erp-b2b'],
    faq: ['odoo-rescue', 'existing-systems', 'pricing'],
    faqItems: [
      { q: 'Studio or custom module: which should we use?', a: 'Odoo Studio is fine for adding fields, simple views and basic automations. Anything with business logic, integrations or heavy use belongs in a proper custom module, which survives upgrades and can be tested.' },
      { q: 'How much does Odoo customization cost?', a: 'It depends on scope. Small changes are quoted by the task; custom modules start from US$5,000 as fixed-price projects after a free scoping call.' },
    ],
    seo: {
      title: 'Odoo Customization & Custom Module Development | CodeCrafters',
      description:
        'Custom Odoo modules for approvals, portals, commissions and integrations, built to survive upgrades. 120+ modules shipped from Ahmedabad, India.',
    },
  },
  {
    slug: 'ai',
    core: true,
    order: 4,
    num: '04',
    eyebrow: 'AI on Odoo',
    title: 'Odoo AI Integration',
    short: 'Ask Odoo questions in plain English, read invoices automatically, cut manual entry.',
    headline: 'AI that saves hours inside your Odoo.',
    intro:
      'Once Odoo is working, AI can take the repetitive work off your team. Ask your ERP questions in plain English, let AI read supplier invoices and order emails, and get reports written for you. It only sees what each user is allowed to see, and it never touches your database directly.',
    icon: 'brain',
    bullets: [
      'Reading invoices, order emails and PDFs into Odoo automatically',
      'Ask Odoo questions in plain English',
      'Answers grounded in your own documents and Odoo data',
      'AI-powered reporting and analytics',
      'LLM integration into the tools you already run',
    ],
    deliverables: [
      {
        title: 'Automated executive reporting',
        desc: 'Before: analysts hand-writing monthly reports. After: board-ready reports generated on a schedule, straight from live data.',
      },
      {
        title: 'Autonomous support resolution',
        desc: 'Before: every ticket read by a human. After: routine tickets resolved automatically, humans take the escalations.',
      },
      {
        title: 'Zero-touch data entry',
        desc: 'Before: manual entry from emails and PDFs into the ERP. After: AI extracts, validates and syncs in real time. Zero manual entry.',
      },
      {
        title: 'Continuous compliance monitoring',
        desc: 'Before: weekly checks taking two days each. After: violations flagged in under 5 minutes. Always audit-ready.',
      },
      {
        title: 'Conversational data access',
        desc: 'Plain-English questions against live business data. ORM-safe, role-gated, tested against prompt injection.',
      },
      {
        title: 'Document intelligence',
        desc: 'OCR with confidence scoring and human-in-the-loop review for edge cases. 80% less manual entry on invoices.',
      },
    ],
    stats: [
      { value: '80%', label: 'Less manual entry on invoices (OCR build)' },
      { value: 'Plain English', label: 'Questions answered from live Odoo data' },
      { value: '5', label: 'AI providers unified in one pipeline' },
    ],
    tech: ['Odoo', 'Claude', 'OpenAI', 'Gemini', 'Python', 'OCR', 'Email & PDF reading'],
    related: ['conversational-ai-agent-erp', 'email-intelligence-saas', 'ocr-invoice-engine'],
    faq: ['ai-accuracy', 'existing-systems', 'timelines'],
    faqItems: [
      { q: 'What AI agents can you add to Odoo?', a: 'The ones we build most: a finance agent that reads supplier invoices and matches them to purchase orders, a sales agent that drafts quotations and follow-ups from Odoo data, an inventory agent that flags low stock and suggests purchase orders, and a management assistant that answers questions about sales and margins in plain English.' },
      { q: 'Is it safe to connect AI to our Odoo?', a: 'Yes, when it is built properly. The AI never gets direct database access: every request goes through Odoo, which checks that user\'s permissions first, and every action is logged. Unclear cases go to a person.' },
      { q: 'Does this work with Odoo 19 AI features?', a: 'Yes. Odoo 19 includes its own AI features; we use them where they fit and build custom agents where you need your own workflows, data sources or approval rules.' },
    ],
    seo: {
      title: 'Odoo AI Integration: AI Agents, Chatbots & Invoice Reading | CodeCrafters',
      description:
        'AI added to your Odoo: ask questions in plain English, read invoices and order emails automatically, and cut manual entry. Role-checked and safe.',
    },
  },
  {
    slug: 'data-dashboards',
    core: true,
    order: 5,
    num: '05',
    eyebrow: 'Odoo reports',
    title: 'Odoo Reports & Dashboards',
    short: 'Live sales, stock and cash numbers from your Odoo, without waiting for month-end.',
    headline: 'Stop waiting for end-of-month reports.',
    intro:
      'Live dashboards on your Odoo data that surface problems early, track the KPIs your team actually cares about, and alert the right people. Our forecasting work lifted inventory planning accuracy by 45% and cut stock discrepancies by 60%.',
    icon: 'chart-line',
    bullets: [
      'Real-time operational dashboards',
      'Sales and inventory forecasting',
      'End-to-end stock traceability',
      'Anomaly detection and alerting',
      'Board-ready automated reporting',
    ],
    deliverables: [
      {
        title: 'Real-time dashboards',
        desc: 'Live KPIs across every business unit, embedded in the tools your team already opens.',
      },
      {
        title: 'Forecasting models',
        desc: 'Time-series forecasting for sales and inventory. +45% planning accuracy in production.',
      },
      {
        title: 'Traceability',
        desc: 'Follow every unit from supplier to customer. 60% fewer stock discrepancies.',
      },
      {
        title: 'Anomaly alerts',
        desc: 'Thresholds and pattern detection that page the right person, not a weekly spreadsheet.',
      },
      {
        title: 'Automated reporting',
        desc: 'Daily board summaries generated from raw telemetry. No analyst required.',
      },
    ],
    stats: [
      { value: '+45%', label: 'Inventory planning accuracy' },
      { value: '−60%', label: 'Stock discrepancies' },
      { value: '30s', label: 'To generate a daily report' },
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Time-series ML', 'Chart.js', 'OWL', 'PostgreSQL', 'React', 'SQL'],
    related: ['forecasting-traceability-dashboards', 'stock-prediction-research', 'ai-meeting-intelligence'],
    faq: ['existing-systems', 'timelines', 'pricing'],
    seo: {
      title: 'Odoo Reports, Dashboards & Stock Forecasting | CodeCrafters',
      description:
        'Live Odoo dashboards, sales and stock forecasting and traceability. +45% planning accuracy and 60% fewer stock discrepancies in production.',
    },
  },
  {
    slug: 'cloud-devops',
    core: false,
    order: 3,
    num: '06',
    eyebrow: 'Infrastructure',
    title: 'Cloud & DevOps',
    short: 'Kubernetes on AWS, GCP or Azure with zero-downtime pipelines and a monitored retainer.',
    headline: 'Infrastructure that scales before you need it.',
    intro:
      'Auto-scaling Kubernetes clusters on AWS, GCP or Azure. Zero-downtime deployment pipelines. Provisioning automated end to end, so a new environment takes minutes, not a ticket. Uptime targets and response windows are agreed per engagement and written into the retainer.',
    icon: 'cloud',
    bullets: [
      'Uptime target agreed and written into the retainer',
      'Kubernetes on AWS, GCP or Azure',
      'Zero-downtime deployment pipelines',
      'Automated provisioning and environment isolation',
      '24/7 monitoring and alerting',
    ],
    deliverables: [
      {
        title: 'Cloud architecture',
        desc: 'Right-sized, auto-scaling infrastructure designed around your traffic, not a vendor reference diagram.',
      },
      {
        title: 'CI/CD pipelines',
        desc: 'Zero-downtime deploys with staged rollouts and automatic rollback.',
      },
      {
        title: 'Provisioning automation',
        desc: 'Droplet and container lifecycle, multi-instance onboarding, environment isolation. Scripted and repeatable.',
      },
      {
        title: 'Observability',
        desc: 'Metrics, logs and alerts routed to the right people. Bot notifications for what matters at 2am.',
      },
      {
        title: 'Managed operations',
        desc: 'Patching, backups, cost reviews and incident response under a retainer SLA.',
      },
    ],
    stats: [
      { value: 'Agreed', label: 'Uptime target, per engagement' },
      { value: '0', label: 'Downtime deployments' },
      { value: '24/7', label: 'Monitoring coverage' },
    ],
    tech: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker', 'DigitalOcean', 'Vercel', 'PostgreSQL', 'GitHub Actions', 'Terraform'],
    related: ['saaskit-automation-devops', 'multi-vendor-ecommerce', 'quotemaker'],
    faq: ['support', 'security-nda', 'engagement-models'],
    seo: {
      title: 'Cloud & DevOps: Kubernetes, CI/CD & Managed Ops | CodeCrafters',
      description:
        'Auto-scaling Kubernetes on AWS, GCP or Azure, zero-downtime pipelines and automated provisioning, with monitoring and incident response under retainer.',
    },
  },
  {
    slug: 'security',
    core: false,
    order: 4,
    num: '07',
    eyebrow: 'Protection',
    title: 'Security',
    short: 'Zero-trust architecture, pen testing and compliance for systems that hold real money.',
    headline: 'Zero-trust security for systems that matter.',
    intro:
      'We secure your perimeter like it holds your most valuable asset, because it does. Zero-trust architecture, penetration testing, compliance auditing and incident response, plus the hardening we ship in every build: AES-256-GCM at rest, OAuth with PKCE, row-level security.',
    icon: 'shield-check',
    bullets: [
      'Zero-trust architecture',
      'Penetration testing',
      'Compliance auditing',
      'Incident response',
      'Encryption and auth hardening',
    ],
    deliverables: [
      {
        title: 'Zero-trust architecture',
        desc: 'Every request authenticated, every role scoped. Row-level security enforced at the database.',
      },
      {
        title: 'Penetration testing',
        desc: 'Application and infrastructure testing with a prioritised findings report and remediation plan.',
      },
      {
        title: 'Compliance auditing',
        desc: 'Audit trails on every transaction, access reviews, and readiness for SOC 2-style controls.',
      },
      {
        title: 'Encryption and auth',
        desc: 'Server-side AES-256-GCM token encryption, OAuth 2.0 with PKCE, secrets management. We replaced a browser-side E2EE model with this in production.',
      },
      {
        title: 'AI safety hardening',
        desc: 'Prompt-injection safeguards, ORM-safe query execution and role gating on every LLM feature we ship.',
      },
      {
        title: 'Incident response',
        desc: 'A runbook, a contact and a response window. Not a scramble.',
      },
    ],
    stats: [
      { value: 'AES-256', label: 'GCM encryption at rest' },
      { value: 'Layered', label: 'Prompt-injection defences on every agent' },
      { value: '0', label: 'Client-side key exposure' },
    ],
    tech: ['AES-256-GCM', 'OAuth 2.0 / PKCE', 'Supabase RLS', 'JWT', 'Zero-trust', 'OWASP', 'Role-based access', 'PostgreSQL'],
    related: ['email-intelligence-saas', 'conversational-ai-agent-erp', 'line-of-credit-platform'],
    faq: ['security-nda', 'ai-accuracy', 'team'],
    seo: {
      title: 'Zero-Trust Security & Pen Testing | CodeCrafters',
      description:
        'Zero-trust architecture, penetration testing, compliance auditing and incident response. AES-256-GCM encryption and OAuth/PKCE from real production work.',
    },
  },
  {
    slug: 'brand-design',
    core: false,
    order: 6,
    num: '08',
    eyebrow: 'Identity',
    title: 'Brand & Design',
    short: 'Identity systems, design systems and decks that make buyers trust you first.',
    headline: 'Your brand is the first filter. Pass it.',
    intro:
      'We design brand identities that make enterprise buyers trust you before you say a word, and keep your team aligned long after the project ends. Built by a technical team that understands product, so the design system ships, not just the logo.',
    icon: 'pen-tool',
    bullets: [
      'Logo and identity system',
      'Brand guidelines',
      'UI and design system',
      'Pitch deck and sales collateral',
      'Social media kit',
    ],
    deliverables: [
      {
        title: 'Logo & identity system',
        desc: 'Primary logo, variations, icon mark and usage guidelines. Delivered in every format: SVG, PNG, PDF.',
      },
      {
        title: 'Brand guidelines',
        desc: 'Typography system, colour palette, spacing rules, tone of voice. One source of truth your whole team can use.',
      },
      {
        title: 'UI & design system',
        desc: 'Component library, design tokens and Figma files. Ready to hand to any developer.',
      },
      {
        title: 'Pitch deck design',
        desc: 'Investor-ready slide templates that match your brand and make the right impression in the room.',
      },
      {
        title: 'Social media kit',
        desc: 'LinkedIn banners, post templates, story formats and profile assets. Consistent across every channel.',
      },
      {
        title: 'Brand collateral',
        desc: 'Business cards, email signatures, letterheads and proposal templates.',
      },
    ],
    process: [
      { num: '01', title: 'Discovery', desc: 'We learn your business, your market, your competitors and who you are trying to reach. Strategy before pixels.' },
      { num: '02', title: 'Three concepts', desc: 'Three distinct brand directions, not variations of one idea. You pick the one that resonates.' },
      { num: '03', title: 'Refinement', desc: 'One direction, refined until it is right. Two rounds of revisions included.' },
      { num: '04', title: 'Final delivery', desc: 'Complete asset pack, brand guidelines PDF and Figma source files. Everything you need, nothing you do not.' },
    ],
    stats: [
      { value: '2–3 wks', label: 'Average delivery' },
      { value: '3', label: 'Initial concepts' },
      { value: '2', label: 'Revision rounds' },
      { value: '100%', label: 'Source files included' },
    ],
    tech: ['Figma', 'Design tokens', 'SVG / PNG / PDF', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    related: ['quotemaker', 'email-intelligence-saas'],
    faq: ['timelines', 'pricing', 'engagement-models'],
    seo: {
      title: 'Brand & Identity Design | CodeCrafters',
      description:
        'Logo systems, brand guidelines, UI design systems, pitch decks and social kits. Built for enterprise credibility by a team that understands product.',
    },
  },
]

export const solutions = [...baseSolutions, ...odooUseCases]

export const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s]))

// Odoo-first services shown in the menu, homepage and contact form. The rest stay
// reachable (and indexed) but are listed as "Other services".
export const coreSolutions = solutions.filter((s) => s.core === true)
export const otherSolutions = solutions.filter((s) => s.core === false)
// "Odoo for your business": use-case and location pages.
export const useCaseSolutions = solutions.filter((s) => s.group === 'usecase')

export default solutions
