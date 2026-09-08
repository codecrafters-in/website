// Six solution lines. `icon` values map to a separate Icon component (lucide names).
export const solutions = [
  {
    slug: 'enterprise-platforms',
    order: 2,
    num: '01',
    eyebrow: 'Operations',
    title: 'Enterprise Platforms',
    short: 'ERP, CRM, B2B commerce and custom platforms your team actually adopts.',
    headline: 'One platform. Zero silos. Total control.',
    intro:
      '80% of ERP rollouts fail on adoption, not software. We re-engineer workflows around the platform, migrate every record, and stay until 90% of your team uses it daily. Odoo, NetSuite-class ERPs or fully custom platforms — we build on what your operations already run on.',
    icon: 'layers',
    bullets: [
      'Full ERP and CRM implementation',
      'B2B commerce with gated pricing and approvals',
      'Custom modules and workflow engines',
      'Legacy and version migrations with zero data loss',
      'Third-party API integrations',
    ],
    deliverables: [
      {
        title: 'ERP implementation',
        desc: 'CRM, inventory, accounting, manufacturing, HR. Configured to how your business actually works, not to a template.',
      },
      {
        title: 'B2B commerce platforms',
        desc: 'Gated storefronts, customer-specific pricing, agent commissions, barcode tablet sales and batch payouts.',
      },
      {
        title: 'Custom modules',
        desc: '120+ shipped. Approval engines, credit control, helpdesks, portals, built inside the platform you run.',
      },
      {
        title: 'Migrations',
        desc: 'Version upgrades and legacy transitions on a reusable ETL framework. 15+ delivered. Every record validated and reconciled.',
      },
      {
        title: 'Integrations',
        desc: 'Payments (Stripe, Plaid, GoCardless), healthcare APIs, accounting systems, carriers. All talking to one source of truth.',
      },
      {
        title: 'Adoption and training',
        desc: 'Stakeholder interviews before design, staged rollout, and training until the spreadsheets disappear.',
      },
    ],
    process: [
      { num: '01', title: 'Audit', desc: 'We map your current state: tools, workflows, data, pain points.' },
      { num: '02', title: 'Blueprint', desc: 'A custom architecture plan. Every module, every integration, every workflow.' },
      { num: '03', title: 'Configure', desc: 'We build the system in staging. You test it before it goes live.' },
      { num: '04', title: 'Migrate', desc: 'Clean, validated data migration. Every record accounted for.' },
      { num: '05', title: 'Launch', desc: 'Phased rollout with your team. No big-bang launches. Zero disruption.' },
      { num: '06', title: 'Optimize', desc: 'Ongoing improvements. The system gets better as you use it.' },
    ],
    stats: [
      { value: '96%', label: 'Faster order processing' },
      { value: '120+', label: 'Custom modules shipped' },
      { value: '0', label: 'Records lost in migration to date' },
    ],
    tech: ['Odoo', 'Python', 'OWL', 'PostgreSQL', 'React', 'Stripe', 'Plaid', 'GoCardless', 'REST APIs', 'ETL'],
    related: ['textile-wholesale-erp-b2b', 'line-of-credit-platform', 'erp-migration-v14-v19'],
    faq: ['existing-systems', 'timelines', 'support'],
    seo: {
      title: 'Enterprise ERP, CRM & B2B Platforms | CodeCrafters',
      description:
        'ERP and CRM implementation, B2B commerce and custom platforms built for adoption. 120+ modules, 15+ migrations, zero data loss. Book a free diagnostic.',
    },
  },
  {
    slug: 'ai',
    order: 1,
    num: '02',
    eyebrow: 'Intelligence',
    title: 'AI Solutions',
    short: 'Agents, RAG and LLM pipelines grounded in your data, built to run unattended.',
    headline: 'AI that runs your operations, not a demo.',
    intro:
      'We build production AI, not prompt wrappers. Agents that execute multi-step workflows end to end, RAG systems grounded in your documents and databases, fine-tuned models deployed in your own environment — sitting on top of the ERP we already know how to extend.',
    icon: 'brain',
    bullets: [
      'Custom LLM pipelines and fine-tuning',
      'Autonomous agent workflows',
      'RAG systems on proprietary data',
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
        desc: 'Plain-English questions against live business data. ORM-safe, role-gated, prompt-injection hardened.',
      },
      {
        title: 'Document intelligence',
        desc: 'OCR with confidence scoring and human-in-the-loop review for edge cases. 80% less manual entry on invoices.',
      },
    ],
    stats: [
      { value: '80%', label: 'Less manual entry on invoices (OCR build)' },
      { value: 'NL\u2192SQL', label: 'Plain English against live ERP data' },
      { value: '5', label: 'AI providers unified in one pipeline' },
    ],
    tech: ['Claude MCP', 'OpenAI', 'Gemini Vision', 'Vercel AI Gateway', 'Python', 'TensorFlow', 'Zod', 'Supabase', 'Next.js', 'Flask'],
    related: ['conversational-ai-agent-erp', 'email-intelligence-saas', 'ocr-invoice-engine'],
    faq: ['ai-accuracy', 'existing-systems', 'timelines'],
    seo: {
      title: 'AI Solutions: Agents, RAG & LLM Pipelines | CodeCrafters',
      description:
        'Production AI on top of your ERP: autonomous agents, RAG systems and LLM pipelines grounded in your own data. Founder-led builds. Free diagnostic.',
    },
  },
  {
    slug: 'data-dashboards',
    order: 5,
    num: '03',
    eyebrow: 'Visibility',
    title: 'Data & Dashboards',
    short: 'Real-time dashboards, forecasting and traceability. See problems before they cost you.',
    headline: 'Stop waiting for end-of-month reports.',
    intro:
      'Live dashboards that surface anomalies before they become problems, track the KPIs your team actually cares about, and alert the right people. Our forecasting work lifted inventory planning accuracy by 45% and cut stock discrepancies by 60%.',
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
      title: 'Real-Time Dashboards & Forecasting | CodeCrafters',
      description:
        'Real-time dashboards, forecasting and stock traceability built on your live data. +45% planning accuracy and 60% fewer discrepancies in production.',
    },
  },
  {
    slug: 'cloud-devops',
    order: 3,
    num: '04',
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
    order: 4,
    num: '05',
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
    order: 6,
    num: '06',
    eyebrow: 'Identity',
    title: 'Brand & Design',
    short: 'Identity systems, design systems and decks that make enterprise buyers trust you first.',
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

export const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s]))

export default solutions
