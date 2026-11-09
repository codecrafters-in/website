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
  {
    slug: 'odoo-gst-setup-india',
    title: 'Odoo GST setup for India: taxes, HSN codes, e-invoicing, e-way bills and returns',
    excerpt:
      'How GST works in Odoo for an Indian business: the India localisation, GST treatment per customer, intra- and inter-state taxes, HSN codes, e-invoicing, e-way bills and GSTR reports, with a setup checklist.',
    date: '2026-11-09',
    updated: '2026-11-09',
    tags: ['Odoo', 'GST', 'Accounting', 'India'],
    readingTime: '8 min',
    author: 'CodeCrafters',
    seo: {
      title: 'Odoo GST Setup for India: E-Invoicing, E-Way Bills & GSTR Reports',
      description:
        'Set up GST in Odoo for an Indian business: India localisation, GST treatment, CGST/SGST/IGST, HSN codes, e-invoicing, e-way bills and GSTR-1/3B reports. Checklist included.',
    },
    body: [
      {
        type: 'p',
        text: "Odoo handles Indian GST through its **India localisation**, a set of modules that adds Indian taxes, reports and government-portal connections to Odoo Accounting. Set up properly, every invoice carries the right tax and HSN code, and your GST reports come straight from the books. Set up badly, it creates as much clean-up as it saves.",
      },
      {
        type: 'callout',
        title: 'Before you start',
        text: "Which GST features are available depends on your Odoo version and edition, and e-invoicing and e-way bills need API credentials from the government portals. Check both for your setup before you plan go-live.",
      },
      { type: 'h2', text: 'What the India localisation adds', id: 'what-it-adds' },
      {
        type: 'ul',
        items: [
          "**Indian chart of accounts and GST taxes:** CGST, SGST, IGST and cess rates.",
          "**Fiscal positions:** Odoo picks intra-state (CGST + SGST) or inter-state (IGST) tax from the customer's state.",
          "**GST treatment per contact:** for example regular, composition, unregistered, consumer, overseas or SEZ.",
          "**HSN and SAC codes** on products, printed on invoices.",
          "**GST reports** such as GSTR-1 and GSTR-3B summaries from posted entries.",
          "**E-invoicing and e-way bills** through Odoo's connection to the government portals, where your version supports it.",
        ],
      },
      { type: 'h2', text: 'Setup checklist', id: 'checklist' },
      {
        type: 'table',
        head: ['Step', 'Where in Odoo', 'What to check'],
        rows: [
          ['1. Company GSTIN and state', 'Settings → Companies', 'GSTIN, state and address match your registration'],
          ['2. India localisation', 'Accounting → Settings (fiscal localisation)', 'India package installed with the GST taxes'],
          ['3. Customers and vendors', 'Contacts', 'GSTIN, state and GST treatment on every party'],
          ['4. Products', 'Inventory / Sales → Products', 'HSN or SAC code, GST rate and unit of measure on every product'],
          ['5. Fiscal positions', 'Accounting → Configuration', 'Intra- vs inter-state mapping, exports and SEZ'],
          ['6. Invoice layout', 'Settings → Document layout', 'GSTIN, HSN, place of supply and tax breakdown printed'],
          ['7. E-invoicing and e-way bill', 'Accounting settings (India)', 'Portal API credentials added and tested before go-live'],
          ['8. Reports', 'Accounting → Reporting', 'GSTR-1 and GSTR-3B figures match a test month'],
        ],
        caption: 'Menu names vary slightly between Odoo versions.',
      },
      { type: 'h2', text: 'Intra-state vs inter-state, automatically', id: 'intra-inter' },
      {
        type: 'p',
        text: "You do not choose CGST + SGST or IGST by hand. Odoo compares your company's state with the customer's state (or place of supply) and applies the right fiscal position. That is why the **state on every contact** matters more than anything else in a GST setup: a wrong state means a wrong tax on every invoice.",
      },
      { type: 'h2', text: 'E-invoicing and e-way bills', id: 'e-invoicing' },
      {
        type: 'p',
        text: "If your turnover requires e-invoicing, Odoo can send invoices to the Invoice Registration Portal and print the IRN and signed QR code on the invoice. E-way bills can be generated from invoices or deliveries. Both need API credentials created on the government portals, and both should be tested on sample documents before the first live invoice.",
      },
      { type: 'h2', text: 'Common GST mistakes in Odoo', id: 'mistakes' },
      {
        type: 'ul',
        items: [
          "Missing or wrong state on customers, so every invoice gets the wrong tax type.",
          "Products without HSN codes, which leaves gaps in GSTR-1.",
          "Customers imported from Tally without GST treatment, so B2B invoices are reported as B2C.",
          "E-invoicing switched on without testing, and the first live invoice is rejected.",
          "Credit notes created outside Odoo, so returns never match the books.",
        ],
      },
      { type: 'h2', text: 'Coming from Tally?', id: 'from-tally' },
      {
        type: 'p',
        text: "Most GST problems after a move come from the masters, not from Odoo. Clean GSTINs, states and HSN codes in Tally before you export. The [Tally to Odoo migration guide](/insights/tally-to-odoo-migration) covers the full process.",
      },
      {
        type: 'p',
        text: "We set up GST, e-invoicing and e-way bills as part of [Odoo accounting and billing](/solutions/odoo-accounting-billing) projects, and test them against a real month before go-live.",
      },
    ],
  },
  {
    slug: 'odoo-vs-zoho',
    title: 'Odoo vs Zoho for a growing Indian business: which should you choose?',
    excerpt:
      'Odoo is one ERP on one database; Zoho is a suite of separate apps. How they compare on accounting, inventory, manufacturing, customization and hosting, and which fits which business.',
    date: '2026-11-09',
    updated: '2026-11-09',
    tags: ['Odoo', 'Zoho', 'Comparison', 'India'],
    readingTime: '7 min',
    author: 'CodeCrafters',
    seo: {
      title: 'Odoo vs Zoho (One, Books, Inventory): Which Is Better for an Indian SME?',
      description:
        'Odoo vs Zoho compared for Indian SMEs: one ERP vs an app suite, accounting and GST, inventory and manufacturing, customization, hosting and cost. Which to choose and when.',
    },
    body: [
      {
        type: 'p',
        text: "Odoo and Zoho are the two names most Indian SMEs shortlist when they outgrow Tally and spreadsheets. Both cover accounting, CRM and inventory, and both are sold per user. The real difference is architecture: **Odoo is one ERP on one database**, while **Zoho is a suite of separate apps** (Books, Inventory, CRM and others) connected to each other.",
      },
      {
        type: 'callout',
        title: 'The short version',
        text: "Zoho suits service and trading businesses that want quick, simple cloud apps. Odoo suits businesses that manufacture, hold a lot of stock, or need their own workflows, because everything runs on one database and can be customised.",
      },
      { type: 'h2', text: 'Side by side', id: 'comparison' },
      {
        type: 'table',
        head: ['', 'Odoo', 'Zoho'],
        rows: [
          ['Architecture', 'One ERP, one database, many apps', 'Separate apps (Books, Inventory, CRM, People…) connected to each other'],
          ['Accounting and GST', "Odoo Accounting with the India localisation", 'Zoho Books, widely used in India'],
          ['Inventory', 'Multi-warehouse, routes, lots and serials, barcodes', 'Zoho Inventory for stock and orders'],
          ['Manufacturing', 'Full MRP: BOMs, work orders, costing, quality', 'Limited compared with a dedicated MRP'],
          ['Customization', 'Custom modules for any workflow; open source core', 'Settings, custom fields, Deluge scripts and integrations'],
          ['Hosting', 'Odoo Online, Odoo.sh or your own server', 'Zoho cloud'],
          ['Open source option', 'Yes (Community)', 'No'],
          ['Best fit', 'Manufacturers, distributors, multi-warehouse, custom processes', 'Service firms, simple trading, teams wanting fast setup'],
        ],
        caption: 'Product scope as of November 2026. Both products change often; check current features and plans before deciding.',
      },
      { type: 'h2', text: 'Where Odoo is stronger', id: 'odoo-stronger' },
      {
        type: 'ul',
        items: [
          "**Manufacturing:** bills of materials, work orders, costing and subcontracting in the same system as stock and accounts.",
          "**Complex inventory:** multiple warehouses, routes, lots, serial numbers and barcode operations.",
          "**Your own workflows:** approvals, commissions, portals and integrations built as proper modules.",
          "**No lock-in:** the open-source core means you can move host or partner and keep your system.",
        ],
      },
      { type: 'h2', text: 'Where Zoho is stronger', id: 'zoho-stronger' },
      {
        type: 'ul',
        items: [
          "**Speed to start:** sign up and begin invoicing the same day.",
          "**Simple service businesses:** if you sell time, not stock, Zoho Books and CRM may be all you need.",
          "**Breadth of small apps:** many lightweight apps for specific jobs.",
        ],
      },
      { type: 'h2', text: 'Cost: compare the whole picture', id: 'cost' },
      {
        type: 'p',
        text: "Both charge per user, and both have cheaper entry plans. Odoo Standard costs ₹580 per user per month billed yearly in India (see [Odoo price in India](/insights/odoo-price-india)). For a fair comparison, add up every Zoho app you would need (Books, Inventory, CRM and so on) for the same users, then add implementation for each option. Businesses with manufacturing or complex stock usually find Odoo cheaper overall because it replaces several apps.",
      },
      { type: 'h2', text: 'Questions that decide it', id: 'decide' },
      {
        type: 'ol',
        items: [
          "Do you manufacture, or plan to? If yes, lean to Odoo.",
          "How many warehouses and how much stock movement? More means Odoo.",
          "Do you need workflows no off-the-shelf app has? Odoo can be extended properly.",
          "Is speed and simplicity more important than depth? Zoho.",
          "Do you want the option to self-host or change vendor later? Odoo.",
        ],
      },
      {
        type: 'p',
        text: "Already on Zoho and outgrowing it? We move businesses from Zoho, Tally and spreadsheets into Odoo. See [Odoo implementation services](/solutions/odoo) or [Odoo migration](/solutions/odoo-migration).",
      },
    ],
  },
  {
    slug: 'odoo-upgrade-17-to-19-custom-modules',
    title: 'Upgrading Odoo 17 to 19 with custom modules: what breaks and how to plan it',
    excerpt:
      'Why version upgrades get stuck on custom modules, what Odoo\'s upgrade service does and does not cover, what usually breaks between versions, and a step-by-step upgrade plan.',
    date: '2026-11-09',
    updated: '2026-11-09',
    tags: ['Odoo', 'Upgrade', 'Migration', 'Custom modules'],
    readingTime: '8 min',
    author: 'CodeCrafters',
    seo: {
      title: 'Odoo 17 to 19 Upgrade with Custom Modules: What Breaks and How to Plan',
      description:
        'Plan an Odoo upgrade from 17 (or older) to 19 with custom modules: what the upgrade service covers, what breaks, testing, timeline and how to avoid data loss.',
    },
    body: [
      {
        type: 'p',
        text: "Odoo releases a new major version every year, and each one changes the code underneath. Upgrading standard Odoo is mostly routine. Upgrading Odoo **with custom modules** is where projects stall, because every custom module has to be rewritten for the new version and tested against your real data.",
      },
      {
        type: 'callout',
        title: 'The short version',
        text: "Inventory every custom module, decide which to keep, rewrite the ones you keep for the target version, run a full test upgrade on a copy of your database, fix what breaks, then switch over in a planned window. Skipping several versions is possible, but each skipped version adds changes to absorb.",
      },
      { type: 'h2', text: 'What Odoo\'s upgrade service covers, and what it does not', id: 'upgrade-service' },
      {
        type: 'table',
        head: ['Part of the system', 'Who upgrades it'],
        rows: [
          ['Standard Odoo data (Enterprise)', "Odoo's upgrade service migrates the database for standard modules"],
          ['Standard Odoo data (Community)', 'You or your partner, typically with community tools such as OpenUpgrade'],
          ['Your custom modules', 'You or your partner: code must be rewritten for the new version'],
          ['Third-party apps from the Odoo Apps Store', 'Their authors, if they publish a new version; otherwise you or your partner'],
          ['Studio customizations', "Mostly carried by Odoo's upgrade; check them in testing"],
        ],
      },
      { type: 'h2', text: 'What usually breaks between versions', id: 'what-breaks' },
      {
        type: 'ul',
        items: [
          "**Views:** XML views that inherit standard screens break when Odoo changes those screens.",
          "**Front-end code:** JavaScript widgets need updating as Odoo's OWL framework evolves.",
          "**Fields and models:** renamed, moved or removed fields that custom code depends on.",
          "**Python APIs:** deprecated methods and changed behaviour in core models.",
          "**Reports:** QWeb invoice and document templates that relied on old structures.",
          "**Integrations:** external API calls and connectors written against old endpoints.",
        ],
      },
      { type: 'h2', text: 'A step-by-step upgrade plan', id: 'plan' },
      {
        type: 'ol',
        items: [
          "**Inventory:** list every custom and third-party module, who uses it and what it does.",
          "**Prune:** drop modules nobody uses, and replace custom code where the new Odoo version now does the job natively.",
          "**Rewrite:** port the remaining modules to the target version.",
          "**Test upgrade:** upgrade a copy of the production database and run your key processes end to end.",
          "**Reconcile:** compare record counts, stock values, balances and open documents between old and new.",
          "**Fix and repeat:** usually two or three test rounds.",
          "**Cutover:** a planned window (often a weekend), with the old system kept read-only as a fallback.",
        ],
      },
      { type: 'h2', text: 'How long it takes', id: 'timeline' },
      {
        type: 'table',
        head: ['Situation', 'Typical duration'],
        rows: [
          ['Standard Odoo, few or no custom modules', '1 to 3 weeks'],
          ['10 to 30 custom modules', '4 to 8 weeks'],
          ['Many custom modules, several versions behind, integrations', '2 to 4 months'],
        ],
        caption: 'Typical ranges, not a quote: testing time grows with the number of custom modules, integrations and versions skipped.',
      },
      { type: 'h2', text: 'Should you skip versions?', id: 'skip-versions' },
      {
        type: 'p',
        text: "Staying on an old version gets more expensive every year: fewer security fixes, more changes to absorb later, and new features you cannot use. Jumping several versions at once is common and often cheaper than upgrading every year, provided the custom modules are rewritten directly for the target version rather than stepped through each one.",
      },
      {
        type: 'p',
        text: "We have upgraded clients across five major versions (v14 to v19) while they kept trading, with zero data loss. See [Odoo migration and upgrades](/solutions/odoo-migration) and [Odoo customization](/solutions/odoo-customization).",
      },
    ],
  },
  {
    slug: 'odoo-for-textile-wholesale',
    title: 'Odoo for textile and wholesale businesses: price lists, agents, catalogues and stock',
    excerpt:
      'How Odoo handles the way textile wholesalers actually trade (customer price lists, agent commissions, B2B ordering, barcode selling and catalogues), with a real 17-module example.',
    date: '2026-11-09',
    updated: '2026-11-09',
    tags: ['Odoo', 'Textile', 'Wholesale', 'Case study'],
    readingTime: '6 min',
    author: 'CodeCrafters',
    seo: {
      title: 'Odoo for Textile & Wholesale: Price Lists, Agents, B2B Orders & Stock',
      description:
        'Odoo for textile wholesalers: customer-specific price lists, agent commissions, B2B ordering, barcode tablet sales and watermarked catalogues, with a real 17-module example.',
    },
    body: [
      {
        type: 'p',
        text: "Textile and wholesale businesses trade in ways most software ignores: every customer has their own price, sales come through agents who earn commission, catalogues travel over WhatsApp, and stock moves in rolls, pieces and designs. Odoo handles most of this out of the box, and the rest can be built as custom modules.",
      },
      { type: 'h2', text: 'What a textile wholesaler needs, and how Odoo does it', id: 'needs' },
      {
        type: 'table',
        head: ['Need', 'In Odoo'],
        rows: [
          ['A different price for every customer', 'Price lists per customer or customer group, with rules by product, category or quantity'],
          ['Sales through agents with commission', 'Salesperson or agent on each order, with commission rules; custom modules for complex slabs and batch payouts'],
          ['Designs, colours and sizes', 'Product variants with attributes, each with its own stock and barcode'],
          ['Selling from the godown floor', 'Barcode scanning on tablets, orders created on the spot'],
          ['B2B customers ordering themselves', 'Customer portal or B2B storefront that shows only their prices'],
          ['Catalogues', 'Product catalogues generated from Odoo; custom watermarking to stop price leaks'],
          ['GST on every invoice', "India localisation: HSN codes, GST rates and reports"],
        ],
      },
      { type: 'h2', text: 'A real example: 17 modules for one wholesaler', id: 'example' },
      {
        type: 'p',
        text: "For **Yash Handicraft**, a textile wholesaler in India, pricing lived in people's heads, commissions in spreadsheets, and stock in a system nobody trusted. We built a 17-module Odoo ERP with a gated B2B storefront on top.",
      },
      {
        type: 'ul',
        items: [
          "**Customer-specific pricing** behind a login, so each buyer sees only their own prices.",
          "**Agent commission tracking** with batch payout runs instead of spreadsheets.",
          "**Barcode-driven tablet sales** on the floor, from live stock.",
          "**Watermarked digital catalogues**, so pricing stays with the customers it was meant for.",
          "**One source of truth** for stock and pricing across sales, inventory and accounting.",
        ],
      },
      {
        type: 'p',
        text: "Agents now sell from live stock and live prices, and commissions calculate themselves. Read the [textile wholesale case study](/work/textile-wholesale-erp-b2b).",
      },
      { type: 'h2', text: 'Where to start', id: 'start' },
      {
        type: 'ol',
        items: [
          "Get products, variants and barcodes right first: everything else depends on them.",
          "Move customer price lists out of people's heads into Odoo.",
          "Set up agents and commission rules, then automate payouts.",
          "Open the B2B portal to your biggest customers once stock and prices are trusted.",
        ],
      },
      {
        type: 'p',
        text: "We are based in Ahmedabad and work with textile and wholesale businesses across Gujarat. See [Odoo in Ahmedabad and Gandhinagar](/solutions/odoo-ahmedabad) and [Odoo for retail and eCommerce](/solutions/odoo-retail).",
      },
    ],
  },
  {
    slug: 'odoo-partner-vs-independent',
    title: 'Official Odoo partner vs independent Odoo company: how to choose in India',
    excerpt:
      'What an official Odoo partner is, what the Ready, Silver and Gold levels mean, what an independent Odoo company does differently, and the questions that matter more than the badge.',
    date: '2026-11-09',
    updated: '2026-11-09',
    tags: ['Odoo', 'Choosing a partner', 'India'],
    readingTime: '6 min',
    author: 'CodeCrafters',
    seo: {
      title: 'Official Odoo Partner vs Independent Odoo Company: How to Choose (India)',
      description:
        'How to choose an Odoo implementation company in India: what official partner levels mean, how independent Odoo firms differ, and 8 questions that matter more than the badge.',
    },
    body: [
      {
        type: 'p',
        text: "Search for an Odoo company in India and you will see Gold, Silver and Ready partners, and independent firms with no badge at all. This guide explains what the badge means, and how to pick the right team for your project. In the interest of transparency: CodeCrafters is an independent Odoo company, not an official partner.",
      },
      { type: 'h2', text: 'What an official Odoo partner is', id: 'official-partner' },
      {
        type: 'p',
        text: "Official partners are enrolled in Odoo S.A.'s partner programme. They can resell Odoo licences and are listed in the partner directory on odoo.com. Partner levels (Ready, Silver, Gold) reflect mainly the volume of licences a partner has sold and the number of certified consultants, alongside customer references and retention.",
      },
      { type: 'h2', text: 'What an independent Odoo company is', id: 'independent' },
      {
        type: 'p',
        text: "Independent Odoo companies implement, migrate and customise Odoo without being part of the partner programme. You buy licences directly from Odoo (or use free Community), and pay the independent company only for the work. Many independents are former Odoo or partner employees.",
      },
      {
        type: 'table',
        head: ['', 'Official partner', 'Independent company'],
        rows: [
          ['Sells Odoo licences', 'Yes, resells and earns on licences', 'No: you buy directly from Odoo'],
          ['Listed on odoo.com partner directory', 'Yes', 'No'],
          ['Level shows', 'Licence volume, certified staff, references', 'Nothing: judge by work and references'],
          ['Implementation, migration, custom modules', 'Yes', 'Yes'],
          ['Typical strength', 'Licence bundles, large teams, Odoo relationship', 'Senior engineers, flexibility, no licence agenda'],
        ],
      },
      { type: 'h2', text: '8 questions that matter more than the badge', id: 'questions' },
      {
        type: 'ol',
        items: [
          "Who will actually do the work, and will we talk to them directly?",
          "Can you show a project like ours (industry, size, apps)?",
          "Will you use standard Odoo first and justify every custom module?",
          "Is the quote fixed, and what exactly is in scope?",
          "How will you move our data from Tally or Excel, and how do we check it?",
          "What does support cost after go-live, and how fast do you respond?",
          "Do we own the code and the database, with no lock-in?",
          "Can we speak to two clients from the last year?",
        ],
      },
      { type: 'h2', text: 'When a partner badge matters', id: 'when-it-matters' },
      {
        type: 'ul',
        items: [
          "You want one company to sell you licences and implement, with a single invoice.",
          "Your procurement rules require an official vendor.",
          "You need a very large team for a multi-country rollout.",
        ],
      },
      { type: 'h2', text: 'When an independent company is a good fit', id: 'when-independent' },
      {
        type: 'ul',
        items: [
          "You want to talk to the engineers building your system, not an account manager.",
          "Your project depends on custom modules, migrations or AI on top of Odoo.",
          "You want licences billed by Odoo directly, with no markup.",
          "You have an Odoo setup another vendor left half-finished and need it fixed.",
        ],
      },
      {
        type: 'p',
        text: "CodeCrafters is an independent Odoo team in Ahmedabad; our engineers include ex-Odoo developers, and we have shipped 120+ custom Odoo modules. See [Odoo implementation services](/solutions/odoo), or read about [what implementation costs in India](/insights/odoo-implementation-cost-india).",
      },
    ],
  },
]

export default odooGuides
