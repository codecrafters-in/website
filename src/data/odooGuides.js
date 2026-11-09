// Odoo buyer guides (India-first). Same block format as insights.js.
// Licence figures come from odoo.com/pricing as checked on 8 Nov 2026 and are
// repeated in src/data/pricing.js; keep both in step when Odoo changes prices.

export const odooGuides = [
  {
    slug: 'odoo-price-india',
    title: 'Odoo price in India (2026): per-user licence cost in rupees, explained',
    excerpt:
      'What Odoo costs per user in India on the Free, Standard and Custom plans, yearly vs monthly billing, worked examples for 5 to 50 users, and the costs that are not on the pricing page.',
    date: '2026-11-09',
    updated: '2026-11-09',
    tags: ['Odoo', 'Pricing', 'India'],
    readingTime: '7 min',
    author: 'CodeCrafters',
    seo: {
      title: 'Odoo Price in India (2026): Per-User Licence Cost in ₹ Explained',
      description:
        'Odoo price in India: One App Free ₹0, Standard ₹580 and Custom ₹1,080 per user per month billed yearly. Worked examples for 5 to 50 users and the hidden costs.',
    },
    body: [
      {
        type: 'p',
        text: "Odoo prices in India are per user, per month. There are three plans: One App Free, Standard and Custom. On top of the licence you pay for implementation, which is a separate cost from whoever sets Odoo up for you. This guide covers the licence; our [Odoo implementation cost in India](/insights/odoo-implementation-cost-india) guide covers the rest.",
      },
      {
        type: 'callout',
        title: 'The short answer',
        text: "Billed yearly, Odoo Standard costs ₹580 per user per month and Odoo Custom costs ₹1,080 per user per month. One App Free costs ₹0 for a single app with unlimited users. Monthly billing costs more: ₹725 and ₹1,350. These are Odoo's introductory prices for India as listed on odoo.com/pricing on 8 November 2026.",
      },
      { type: 'h2', text: 'Odoo plans and prices in India', id: 'plans-and-prices' },
      {
        type: 'table',
        head: ['Plan', 'Per user / month (billed yearly)', 'Per user / month (billed monthly)', 'What you get'],
        rows: [
          ['One App Free', '₹0', '₹0', 'One app of your choice (for example Invoicing or CRM), unlimited users, Odoo Online hosting'],
          ['Standard', '₹580', '₹725', 'All Odoo apps, Odoo Online hosting'],
          ['Custom', '₹1,080', '₹1,350', 'All apps plus Odoo Studio, multi-company, external API, and Odoo.sh or on-premise hosting'],
        ],
        caption: 'Source: odoo.com/pricing, checked 8 November 2026. Odoo shows these as discounted prices for the first 12 months for the users you order first; the list prices are higher. Check the current page and whether GST is added at checkout.',
      },
      { type: 'h2', text: 'What Odoo costs for 5, 10, 25 and 50 users', id: 'worked-examples' },
      {
        type: 'p',
        text: "Multiply users × monthly price × 12. Billed yearly:",
      },
      {
        type: 'table',
        head: ['Users', 'Standard (₹580)', 'Custom (₹1,080)'],
        rows: [
          ['5 users', '₹34,800 a year', '₹64,800 a year'],
          ['10 users', '₹69,600 a year', '₹1,29,600 a year'],
          ['25 users', '₹1,74,000 a year', '₹3,24,000 a year'],
          ['50 users', '₹3,48,000 a year', '₹6,48,000 a year'],
        ],
        caption: 'Calculated from the yearly-billing prices above, before any tax. Monthly billing costs about 25% more.',
      },
      { type: 'h2', text: 'Standard or Custom: which plan do you need?', id: 'standard-or-custom' },
      {
        type: 'ul',
        items: [
          "**Standard is enough** when one company uses Odoo's apps as they are, hosted by Odoo (Odoo Online). Most small businesses start here.",
          "**You need Custom** if you have more than one company or GSTIN to run in one database, need Odoo Studio, need to connect other software through Odoo's external API, or need custom modules. Custom modules cannot run on Odoo Online; they need Odoo.sh or your own server, and that requires the Custom plan.",
          "**One App Free** works if you only need one app, for example Invoicing for GST invoices or CRM for leads. You can add apps later, which moves you to a paid plan.",
        ],
      },
      { type: 'h2', text: 'What about Odoo Community (free)?', id: 'community' },
      {
        type: 'p',
        text: "Odoo Community is the open-source edition. There is no licence fee, but you host it yourself, and some apps (including full Accounting and Studio) are only in the paid edition. Your costs move from licences to a server, maintenance and upgrades. See [Odoo Community vs Enterprise](/insights/odoo-community-vs-enterprise) for when that trade makes sense.",
      },
      { type: 'h2', text: 'Costs that are not on the pricing page', id: 'hidden-costs' },
      {
        type: 'ul',
        items: [
          "**Implementation:** setting up apps, moving your data from Tally or Excel, training. Usually the biggest cost in year one.",
          "**Custom modules:** anything Odoo does not do out of the box.",
          "**Hosting outside Odoo Online:** Odoo.sh is billed separately; on-premise means your own server and someone to run it.",
          "**Support after go-live:** fixes, small changes and help for your team.",
          "**Your team's time:** testing, data clean-up and learning the new system.",
        ],
      },
      { type: 'h2', text: 'How to keep the licence cost down', id: 'keep-cost-down' },
      {
        type: 'ul',
        items: [
          "Count users properly: only people who log in need a licence. Portal users (customers or vendors who see their orders) do not.",
          "Start on Standard and move to Custom only when you need multi-company, Studio or custom modules.",
          "Pay yearly if you are sure about the user count; monthly billing costs about 25% more.",
          "Use standard Odoo features before paying for custom development.",
        ],
      },
      {
        type: 'p',
        text: "Not sure which plan fits? We look at your process on a free 45-minute diagnostic call and recommend the plan and apps, whether or not you build with us. See [Odoo implementation services](/solutions/odoo).",
      },
    ],
  },
  {
    slug: 'odoo-implementation-cost-india',
    title: 'Odoo implementation cost in India: what drives the quote, and how to compare partners',
    excerpt:
      'The two costs of an Odoo project in India (licence and implementation), what makes implementation quotes vary so much, the costs people forget, and the questions to ask before you sign.',
    date: '2026-11-09',
    updated: '2026-11-09',
    tags: ['Odoo', 'Pricing', 'Implementation', 'India'],
    readingTime: '8 min',
    author: 'CodeCrafters',
    seo: {
      title: 'Odoo Implementation Cost in India (2026): What Drives the Quote',
      description:
        'What an Odoo implementation costs in India: licence vs implementation, the 7 factors that move the quote, hidden costs, and the questions to ask an Odoo company before you sign.',
    },
    body: [
      {
        type: 'p',
        text: "An Odoo project in India has two costs. The **licence** is paid to Odoo S.A. per user per month (or nothing, on Community). The **implementation** is paid to the company that sets Odoo up for you: configuration, data migration, custom modules, training and support. Quotes for the second part vary more than anything else, so this guide explains why.",
      },
      {
        type: 'callout',
        title: 'Quick numbers',
        text: "Licence, billed yearly: Standard ₹580 and Custom ₹1,080 per user per month, so 10 users on Standard is about ₹69,600 a year (see [Odoo price in India](/insights/odoo-price-india)). Implementation is quoted on scope. Our fixed-price projects start from US$5,000 for a focused setup or a single custom module.",
      },
      { type: 'h2', text: 'The 7 things that move an implementation quote', id: 'cost-drivers' },
      {
        type: 'table',
        head: ['Factor', 'Lower cost', 'Higher cost'],
        rows: [
          ['Apps', 'Sales, Inventory, Invoicing', 'Adding Manufacturing, Accounting, POS, eCommerce, HR'],
          ['Companies and locations', 'One company, one warehouse', 'Several companies or GSTINs, multiple warehouses'],
          ['Data migration', 'Fresh start with masters and opening balances', 'Years of history from Tally or an old ERP'],
          ['Customization', 'Standard Odoo, configured', 'Custom modules, approval flows, portals'],
          ['Integrations', 'None, or a payment gateway', 'Marketplaces, logistics, banks, other software'],
          ['Process clarity', 'Documented, one decision-maker', 'Undocumented, many stakeholders'],
          ['Training and support', 'Train-the-trainer, light support', 'Department-by-department training, ongoing support'],
        ],
      },
      {
        type: 'p',
        text: "Two companies with the same number of users can get quotes that differ several times over. Most of the difference is migration and customization, not the number of people logging in.",
      },
      { type: 'h2', text: 'Fixed price or time and materials?', id: 'fixed-or-hourly' },
      {
        type: 'p',
        text: "A fixed price after a proper scoping session protects you from open-ended bills and makes the vendor own the estimate. Hourly billing suits small, unclear changes after go-live. For the main implementation, ask for a fixed price with a written scope of apps, data, customizations and training.",
      },
      { type: 'h2', text: 'Costs people forget', id: 'forgotten-costs' },
      {
        type: 'ul',
        items: [
          "**Data clean-up:** duplicate customers, missing GSTINs and HSN codes. Cheaper to fix before migration than after.",
          "**Hosting:** free on Odoo Online, but custom modules need Odoo.sh (billed separately) or your own server.",
          "**Version upgrades:** Odoo releases a new version every year. Custom modules need updating when you upgrade.",
          "**Support after go-live:** the first months always need fixes and small changes.",
          "**Your team's time:** someone has to test, decide and learn.",
        ],
      },
      { type: 'h2', text: '10 questions to ask before you sign', id: 'questions-to-ask' },
      {
        type: 'ol',
        items: [
          "Is the quote fixed, and what exactly is in scope (apps, data, customizations, training)?",
          "Which costs are licence (paid to Odoo) and which are implementation? Do you mark up licences?",
          "Will you use standard Odoo first, and justify every custom module?",
          "How will you move our data from Tally or Excel, and how do we check it?",
          "Have you set up GST, e-invoicing and e-way bills for a business like ours?",
          "Who will actually do the work, and will we talk to them directly?",
          "What does support cost after go-live?",
          "What happens to our custom modules when Odoo releases a new version?",
          "Can we speak to a client of similar size and industry?",
          "Do we get access to the code and the database, with no lock-in?",
        ],
      },
      { type: 'h2', text: 'How we price Odoo projects', id: 'how-we-price' },
      {
        type: 'p',
        text: "We start with a free 45-minute diagnostic, then send a fixed-price proposal with the scope written down. Focused setups and single custom modules start from US$5,000; full implementations with data migration are quoted on scope, in rupees for Indian clients. Licences are paid to Odoo directly; we do not resell or mark them up. See [Odoo implementation services](/solutions/odoo) and [Tally to Odoo migration](/insights/tally-to-odoo-migration).",
      },
    ],
  },
  {
    slug: 'odoo-vs-tally',
    title: 'Odoo vs Tally Prime: which fits a growing Indian business?',
    excerpt:
      'Tally is the accountant\'s tool; Odoo runs the whole business. A plain comparison of scope, GST, inventory, users, hosting and cost, and the signs it is time to move.',
    date: '2026-11-09',
    updated: '2026-11-09',
    tags: ['Odoo', 'Tally', 'Comparison', 'India'],
    readingTime: '7 min',
    author: 'CodeCrafters',
    seo: {
      title: 'Odoo vs Tally Prime: Which Is Better for a Growing Indian Business?',
      description:
        'Odoo vs Tally Prime compared for Indian businesses: GST, inventory, manufacturing, sales, users and hosting. When Tally is enough, when to move to Odoo, and how to switch.',
    },
    body: [
      {
        type: 'p',
        text: "Tally Prime and Odoo are often compared, but they solve different problems. Tally is accounting and inventory software that most Indian accountants know well. Odoo is a full ERP where accounting is one app among sales, CRM, purchase, inventory, manufacturing, POS and eCommerce, all on one database.",
      },
      {
        type: 'callout',
        title: 'The short version',
        text: "If your main need is GST-compliant books and your CA works in Tally, Tally is fine. Move to Odoo when sales, stock, purchase and production need to run in the same system as the accounts, or when more than a few people need to work in it at once.",
      },
      { type: 'h2', text: 'Side by side', id: 'comparison' },
      {
        type: 'table',
        head: ['', 'Tally Prime', 'Odoo'],
        rows: [
          ['What it is', 'Accounting and inventory software', 'Full ERP: accounting plus sales, CRM, purchase, inventory, manufacturing, POS, eCommerce, HR'],
          ['GST', 'Strong GST compliance, widely used by CAs', "GST taxes, HSN codes, GSTR reports, e-invoicing and e-way bills through Odoo's India localisation"],
          ['Inventory', 'Stock items, godowns, batches', 'Multi-warehouse, barcodes, reordering rules, lots and serial numbers, routes'],
          ['Manufacturing', 'Bill of materials and manufacturing vouchers', 'Full MRP: BOMs, work orders, work centres, costing, quality, subcontracting'],
          ['Sales and CRM', 'Sales vouchers', 'Leads, quotations, sales orders, customer portal, online store'],
          ['Customization', 'TDL customization', 'Custom Odoo modules for any workflow'],
          ['Where it runs', 'Desktop, with remote access options', 'In the browser: Odoo Online, Odoo.sh or your own server'],
          ['Typical users', 'Accountants and a few operators', 'Everyone: sales, warehouse, purchase, production, accounts, management'],
        ],
        caption: 'Product scope as of November 2026. Both products change often; check current features before deciding.',
      },
      { type: 'h2', text: 'Signs it is time to move from Tally to Odoo', id: 'signs' },
      {
        type: 'ul',
        items: [
          "Stock in Tally rarely matches the shelf because sales and dispatch happen elsewhere.",
          "Sales orders are taken in Excel or WhatsApp and typed into Tally later.",
          "You need production planning, costing or job work tracking.",
          "Several people need to work in the system at the same time, from different places.",
          "The owner wants live numbers on a phone, not a month-end report.",
        ],
      },
      { type: 'h2', text: 'When Tally is still the better choice', id: 'when-tally' },
      {
        type: 'ul',
        items: [
          "Accounting is the only process you need to digitise.",
          "One or two people do all the data entry, and the CA is happy.",
          "You do not hold much stock or manufacture anything.",
        ],
      },
      { type: 'h2', text: 'Cost: how to compare fairly', id: 'cost' },
      {
        type: 'p',
        text: "Tally is usually bought as a licence for a number of users. Odoo is paid per user per month, from ₹580 billed yearly on Standard (see [Odoo price in India](/insights/odoo-price-india)), plus implementation. Odoo costs more than Tally alone, so compare it with Tally plus everything else you pay for: spreadsheets, a separate CRM or billing app, and the hours spent re-entering data between them.",
      },
      { type: 'h2', text: 'Can you use both?', id: 'both' },
      {
        type: 'p',
        text: "Some businesses run Odoo for operations and keep Tally for the accounts their CA files. It works, but every sync is a place for numbers to drift. Most companies we work with move accounting into Odoo too, and keep Tally read-only for past years.",
      },
      {
        type: 'p',
        text: "Ready to move? Read the step-by-step [Tally to Odoo migration guide](/insights/tally-to-odoo-migration), or see [Odoo accounting and billing](/solutions/odoo-accounting-billing).",
      },
    ],
  },
  {
    slug: 'odoo-community-vs-enterprise',
    title: 'Odoo Community vs Enterprise: which edition should an SME choose?',
    excerpt:
      'Community is free and open source; Enterprise is paid per user. What each includes, what Community leaves out, the real total cost of each, and how to decide.',
    date: '2026-11-09',
    updated: '2026-11-09',
    tags: ['Odoo', 'Editions', 'Comparison'],
    readingTime: '7 min',
    author: 'CodeCrafters',
    seo: {
      title: 'Odoo Community vs Enterprise: Differences, Cost and Which to Choose',
      description:
        'Odoo Community vs Enterprise for small and mid-sized businesses: what each edition includes, what Community leaves out, total cost in India, hosting, upgrades and how to choose.',
    },
    body: [
      {
        type: 'p',
        text: "Odoo comes in two editions. **Odoo Community** is open source and free to use. **Odoo Enterprise** is the paid edition, licensed per user, and is built on top of Community with extra apps, hosting options, version upgrades and support from Odoo. In Odoo's pricing, the Standard and Custom plans are Enterprise.",
      },
      {
        type: 'callout',
        title: 'The short version',
        text: "Choose Community if you have a technical team (or a partner) to host and maintain it and you do not need Enterprise-only apps such as full Accounting or Studio. Choose Enterprise if you want Odoo to host it, upgrade it and support it, or you need those apps.",
      },
      { type: 'h2', text: 'What both editions include', id: 'both-include' },
      {
        type: 'p',
        text: "The core business apps are in both: Sales, CRM, Purchase, Inventory, Invoicing, Manufacturing, Point of Sale, Website, eCommerce, Project and Employees, among others. Community is a real ERP, not a demo.",
      },
      { type: 'h2', text: 'What is Enterprise-only', id: 'enterprise-only' },
      {
        type: 'ul',
        items: [
          "**Full Accounting:** Community has Invoicing; full accounting (bank reconciliation, financial reports and more) is in Enterprise.",
          "**Odoo Studio:** build fields, screens and automations without code.",
          "**Apps such as** Helpdesk, Field Service, Planning, PLM, Quality and Payroll.",
          "**Official mobile apps** for Android and iOS.",
          "**Hosting by Odoo** (Odoo Online and Odoo.sh), **version upgrades** and **functional support** from Odoo S.A.",
        ],
      },
      {
        type: 'p',
        text: "Odoo publishes the full feature-by-feature comparison on its editions page, and it changes with each version, so check it for the apps you care about.",
      },
      { type: 'h2', text: 'Total cost: Community is not zero', id: 'total-cost' },
      {
        type: 'table',
        head: ['Cost', 'Community', 'Enterprise'],
        rows: [
          ['Licence', '₹0', 'Per user per month: ₹580 (Standard) or ₹1,080 (Custom), billed yearly'],
          ['Hosting', 'Your own server or cloud, plus someone to run it', 'Free on Odoo Online; Odoo.sh or on-premise on Custom'],
          ['Upgrades to new versions', 'You or your partner do the work', "Odoo's upgrade service is included"],
          ['Support', 'Your partner or your team', 'Functional support from Odoo, plus your partner'],
          ['Missing apps', 'Third-party modules or custom development', 'Included'],
        ],
        caption: "Enterprise prices from odoo.com/pricing for India, checked 8 November 2026. See [Odoo price in India](/insights/odoo-price-india) for worked examples.",
      },
      { type: 'h2', text: 'How to choose', id: 'how-to-choose' },
      {
        type: 'ul',
        items: [
          "**Need full accounting in Odoo?** Enterprise, or plan for third-party accounting modules on Community.",
          "**No in-house IT and no wish to run servers?** Enterprise on Odoo Online.",
          "**Heavy custom development and a strong technical partner?** Either works; Community saves licence fees but you own hosting and upgrades.",
          "**Many users who only need basic apps?** Compare Community's hosting and maintenance cost with Enterprise licences for your user count.",
        ],
      },
      { type: 'h2', text: 'Can you switch later?', id: 'switching' },
      {
        type: 'p',
        text: "Yes. Moving from Community to Enterprise is common as a business grows: Enterprise is installed on top of the same data. Moving back from Enterprise to Community is harder if you rely on Enterprise-only apps. We handle both directions as part of [Odoo migration and upgrades](/solutions/odoo-migration).",
      },
      {
        type: 'p',
        text: "Still unsure? On a free 45-minute diagnostic we look at your processes and tell you which edition fits, with a cost estimate for both. See [Odoo implementation services](/solutions/odoo).",
      },
    ],
  },
]

export default odooGuides
