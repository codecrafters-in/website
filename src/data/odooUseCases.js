// Odoo use-case and location pages. Each one answers a distinct search
// ("Odoo POS", "Odoo for retail", "Odoo in Ahmedabad") with its own content,
// not a template with the keyword swapped in. They render through the same
// /solutions/:slug template and are listed under "Odoo for your business".
// Claims here are limited to what Odoo itself does and work we have shipped.
export const odooUseCases = [
  {
    slug: 'odoo-ahmedabad',
    group: 'usecase',
    order: 10,
    num: 'AMD',
    eyebrow: 'Ahmedabad · Gandhinagar · Gujarat',
    title: 'Odoo in Ahmedabad & Gandhinagar',
    navTitle: 'Odoo in Ahmedabad',
    short: 'An Odoo team based in Ahmedabad, working with businesses across Gujarat and India.',
    headline: 'Odoo implementation in Ahmedabad and Gandhinagar.',
    intro:
      'CodeCrafters is an Odoo implementation and development team based in Ahmedabad. We set up, migrate and customise Odoo for manufacturers, traders, wholesalers and retailers in Ahmedabad, Gandhinagar and across Gujarat, and for clients elsewhere in India and abroad. You work directly with the engineers who build your system, in your time zone.',
    icon: 'map-pin',
    areaServed: ['Ahmedabad', 'Gandhinagar', 'Gujarat', 'India'],
    bullets: [
      'Odoo implementation for Gujarat manufacturers, traders and retailers',
      'Moving from Tally or spreadsheets to Odoo',
      'Odoo version upgrades and fixes to existing setups',
      'Custom modules for textile, wholesale and B2B businesses',
      'Same time zone, English, Hindi and Gujarati',
    ],
    deliverables: [
      {
        title: 'Local, not outsourced',
        desc: 'The team that scopes your project is the team in Ahmedabad that builds it. No reseller in between.',
      },
      {
        title: 'Built for how Gujarat businesses trade',
        desc: 'Wholesale price lists, agent commissions, B2B ordering and multi-warehouse stock, as in our textile wholesale build.',
      },
      {
        title: 'Tally to Odoo',
        desc: 'Customers, products, stock and opening balances moved from Tally or Excel into Odoo and checked against your books.',
      },
      {
        title: 'Support after go-live',
        desc: 'Fixes, training and small improvements once you are live, by the people who know your setup.',
      },
    ],
    stats: [
      { value: '120+', label: 'Custom Odoo modules' },
      { value: '15+', label: 'ERP migrations delivered' },
      { value: '30+', label: 'Projects delivered' },
    ],
    tech: ['Odoo 14–19', 'Community', 'Enterprise', 'Tally migration', 'Sales', 'Inventory', 'Accounting', 'Manufacturing', 'POS'],
    related: ['textile-wholesale-erp-b2b', 'portal-order-approval-engine', 'erp-migration-v14-v19'],
    faq: ['gujarat-local', 'odoo-official-partner', 'odoo-edition', 'pricing', 'odoo-rescue'],
    seo: {
      title: 'Odoo Implementation Company in Ahmedabad & Gandhinagar | CodeCrafters',
      description:
        'Odoo implementation, migration and customization from an Ahmedabad-based team, for businesses in Ahmedabad, Gandhinagar, Gujarat and across India. From $5,000.',
    },
  },
  {
    slug: 'odoo-pos',
    group: 'usecase',
    order: 11,
    num: 'POS',
    eyebrow: 'Odoo Point of Sale',
    title: 'Odoo POS Setup',
    navTitle: 'Odoo POS',
    short: 'Odoo Point of Sale for shops and counters, linked to your stock and accounts.',
    headline: 'Odoo POS that keeps the shop and the books in step.',
    intro:
      'Odoo Point of Sale runs your billing counter in a browser or on a tablet, works offline when the internet drops, and updates stock and accounts as you sell. We set it up for single shops and multi-store retailers: products and barcodes, price lists, payment methods, receipt formats, and the link back to inventory and accounting.',
    icon: 'store',
    bullets: [
      'Odoo POS setup for single and multiple stores',
      'Barcode scanners, receipt printers and cash drawers',
      'Price lists, discounts, loyalty and gift cards',
      'Stock and accounting updated as you sell',
      'Custom POS screens and receipts when you need them',
    ],
    deliverables: [
      {
        title: 'Counter setup',
        desc: 'Products, barcodes, taxes and payment methods configured so the first day of billing just works.',
      },
      {
        title: 'Multi-store',
        desc: 'Each shop with its own stock and cash register, with the owner seeing all stores in one place.',
      },
      {
        title: 'Tablet and barcode selling',
        desc: 'Sell from a tablet on the shop floor with barcode scanning, as we built for a textile wholesaler.',
      },
      {
        title: 'Stock and accounts in sync',
        desc: 'Every sale reduces stock and posts to accounting, so month-end is not a reconciliation project.',
      },
      {
        title: 'Custom POS features',
        desc: 'Extra fields, custom receipts or a special discount rule, built as a proper Odoo module.',
      },
    ],
    stats: [
      { value: '120+', label: 'Custom Odoo modules' },
      { value: 'Offline', label: 'Odoo POS keeps selling without internet' },
      { value: 'v14–v19', label: 'Odoo versions we work with' },
    ],
    tech: ['Odoo POS', 'Inventory', 'Accounting', 'Barcode', 'Loyalty', 'eCommerce', 'OWL'],
    related: ['textile-wholesale-erp-b2b', 'multi-vendor-ecommerce', 'erp-migration-v14-v19'],
    faq: ['odoo-edition', 'pricing', 'timelines'],
    faqItems: [
      { q: 'Does Odoo POS work for restaurants?', a: 'Yes. Odoo POS has a restaurant mode with floor plans and tables, splitting bills, sending orders to kitchen printers or a kitchen screen, and tips. We set it up for cafes, restaurants and cloud kitchens as well as shops.' },
      { q: 'Does Odoo POS work without internet?', a: 'Yes. Odoo POS keeps billing offline and syncs orders, stock and payments when the connection returns.' },
      { q: 'What hardware does Odoo POS need?', a: 'Any device with a modern browser (PC, tablet or touchscreen), plus optional barcode scanners, receipt printers, cash drawers and weighing scales. We help you pick compatible hardware before go-live.' },
      { q: 'Can Odoo POS print GST invoices?', a: "Yes. With Odoo's India localisation, POS receipts and invoices carry GST details, and sales flow into your GST reports in Odoo Accounting." },
    ],
    seo: {
      title: 'Odoo POS Setup for Retail Stores & Restaurants | CodeCrafters',
      description:
        'Odoo POS software set up for shops and restaurants in India: barcodes, tables and kitchen printing, offline billing, GST receipts, and stock and accounts updated as you sell.',
    },
  },
  {
    slug: 'odoo-retail',
    group: 'usecase',
    order: 12,
    num: 'RTL',
    eyebrow: 'Odoo for retail',
    title: 'Odoo for Retail & eCommerce',
    navTitle: 'Odoo for retail',
    short: 'Shops, online store and warehouse on one Odoo, with stock that matches.',
    headline: 'One Odoo for your shops, your online store and your stock.',
    intro:
      'Retailers usually run the counter, the website and the warehouse on three different tools, and the stock never matches. Odoo puts POS, eCommerce, inventory, purchase and accounting on one database. We set it up for retail and eCommerce businesses and build what is missing, from product configurators to marketplace-style vendor portals.',
    icon: 'shopping-bag',
    bullets: [
      'Odoo POS, eCommerce and inventory on one system',
      'Product variants, barcodes and multi-warehouse stock',
      'Online store linked to live stock and pricing',
      'Payment gateways and delivery partners',
      'Reordering rules so best-sellers do not run out',
    ],
    deliverables: [
      {
        title: 'Online store on Odoo',
        desc: 'An Odoo eCommerce site that sells from the same stock as your shops, with custom themes when needed.',
      },
      {
        title: 'Multi-vendor and configurators',
        desc: 'Product configurators and multi-vendor support, as in our multi-vendor eCommerce build.',
      },
      {
        title: 'Stock you can trust',
        desc: 'Warehouses, transfers and reordering rules, so stock on the screen matches stock on the shelf.',
      },
      {
        title: 'Upgrades without downtime',
        desc: 'We moved a retail and eCommerce client across five Odoo versions while they kept trading.',
      },
    ],
    stats: [
      { value: '50→500', label: 'Daily transactions, same ops team (retail client)' },
      { value: 'v14→v19', label: 'Retail upgrade across five versions' },
      { value: '120+', label: 'Custom Odoo modules' },
    ],
    tech: ['Odoo POS', 'eCommerce', 'Inventory', 'Purchase', 'Accounting', 'Stripe', 'GoCardless', 'OWL'],
    related: ['multi-vendor-ecommerce', 'erp-migration-v14-v19', 'textile-wholesale-erp-b2b'],
    faq: ['odoo-edition', 'pricing', 'odoo-rescue'],
    faqItems: [
      { q: 'Can one Odoo run our shops and our online store?', a: 'Yes. Odoo POS and Odoo eCommerce share the same products, prices and stock, so a sale in the shop or online updates the same inventory.' },
      { q: 'Can Odoo connect to Amazon or other marketplaces?', a: 'Marketplace connectors exist for Odoo (some official, some from the Odoo Apps Store). We check which fits your marketplaces and volume, or build the integration.' },
    ],
    seo: {
      title: 'Odoo for Retail & eCommerce: POS, Online Store & Stock | CodeCrafters',
      description:
        'Odoo for retailers: POS, online store, inventory and accounting on one system, set up and customised by an Odoo team in India.',
    },
  },
  {
    slug: 'odoo-manufacturing',
    group: 'usecase',
    order: 13,
    num: 'MRP',
    eyebrow: 'Odoo Manufacturing',
    title: 'Odoo Manufacturing (MRP)',
    navTitle: 'Odoo Manufacturing',
    short: 'Bills of materials, work orders, costing and stock for businesses that make what they sell.',
    headline: 'Odoo Manufacturing set up for your shop floor.',
    intro:
      'Odoo Manufacturing (MRP) plans production from sales orders, tracks raw material and finished stock, and shows what each product really costs to make. We set it up around your actual process (bills of materials, routings, work centres, quality checks and subcontracting) and add forecasting so you buy materials before you run out.',
    icon: 'factory',
    bullets: [
      'Bills of materials, variants and routings',
      'Work orders, work centres and shop-floor tablets',
      'Raw material planning and purchase suggestions',
      'Product costing and quality checks',
      'Sales and stock forecasting on top of Odoo',
    ],
    deliverables: [
      {
        title: 'Production planning',
        desc: 'Manufacturing orders created from sales, with material availability checked before you start.',
      },
      {
        title: 'Costing',
        desc: 'Material, labour and overhead rolled into a real cost per product, not a guess in a spreadsheet.',
      },
      {
        title: 'Traceability',
        desc: 'Lots and serial numbers from supplier to customer. Our traceability work cut stock discrepancies by 60%.',
      },
      {
        title: 'Forecasting',
        desc: 'Demand forecasts on your Odoo data; our forecasting build lifted inventory planning accuracy by 45%.',
      },
    ],
    stats: [
      { value: '+45%', label: 'Inventory planning accuracy' },
      { value: '−60%', label: 'Stock discrepancies' },
      { value: '80%', label: 'Less manual data entry (manufacturing client)' },
    ],
    tech: ['Odoo MRP', 'Inventory', 'Purchase', 'Quality', 'PLM', 'Maintenance', 'Forecasting'],
    related: ['forecasting-traceability-dashboards', 'textile-wholesale-erp-b2b', 'ocr-invoice-engine'],
    faq: ['odoo-edition', 'pricing', 'timelines'],
    faqItems: [
      { q: 'Can Odoo handle job work and subcontracting?', a: 'Yes. Odoo Manufacturing supports subcontracting: sending raw material to a job worker, tracking what they hold, and receiving finished goods back against the order. We configure it to match how your job workers operate.' },
      { q: 'Is Odoo suitable for a small manufacturer?', a: 'Yes. Many of our manufacturing clients are small and mid-sized. Start with bills of materials, manufacturing orders and stock, and add work centres, quality and maintenance later.' },
      { q: 'Can Odoo calculate the real cost of each product?', a: 'Yes. Odoo rolls up material, labour (work centre time) and overheads into a product cost, and compares planned with actual cost per manufacturing order.' },
    ],
    seo: {
      title: 'Odoo Manufacturing (MRP) Implementation for Manufacturers | CodeCrafters',
      description:
        'Odoo Manufacturing set up for Indian manufacturers: bills of materials, work orders, costing, traceability and forecasting. +45% planning accuracy in production.',
    },
  },
  {
    slug: 'odoo-accounting-billing',
    group: 'usecase',
    order: 14,
    num: 'ACC',
    eyebrow: 'Odoo Accounting & Invoicing',
    title: 'Odoo Accounting & Billing',
    navTitle: 'Odoo accounting & billing',
    short: 'Invoices from orders, payments reconciled, and AI that reads supplier bills.',
    headline: 'Odoo accounting services and GST billing, set up properly.',
    intro:
      'In Odoo, invoices come straight from sales orders and deliveries, payments match automatically against bank statements, and reports come from the same data. Odoo also has an India localisation for GST invoices. We set up invoicing and accounting, connect payment gateways, and add AI that reads supplier bills and order emails so nobody types them in.',
    icon: 'receipt',
    bullets: [
      'Invoices created from sales orders and deliveries',
      'Bank reconciliation and payment follow-ups',
      'Odoo India localisation for GST invoices',
      'Payment gateways (Stripe, GoCardless) connected to Odoo',
      'AI that reads supplier invoices into Odoo',
    ],
    deliverables: [
      {
        title: 'Invoicing from orders',
        desc: 'No retyping: delivery confirmed, invoice ready, customer reminded when it is overdue.',
      },
      {
        title: 'Credit control and approvals',
        desc: 'Credit limits and multi-step order approvals, as in our portal order approval engine.',
      },
      {
        title: 'Automatic invoice reading',
        desc: 'AI reads supplier bills and PDFs into Odoo, with unclear ones sent to a person. 80% less manual entry.',
      },
      {
        title: 'Billing for lenders and subscriptions',
        desc: 'Statements, interest and repayments automated, as in our credit management platform.',
      },
    ],
    stats: [
      { value: '80%', label: 'Less manual entry on invoices' },
      { value: '4h→8m', label: 'Order processing time (3PL client)' },
      { value: '120+', label: 'Custom Odoo modules' },
    ],
    tech: ['Odoo Accounting', 'Invoicing', 'India localisation', 'Stripe', 'GoCardless', 'Plaid', 'OCR'],
    related: ['ocr-invoice-engine', 'portal-order-approval-engine', 'line-of-credit-platform'],
    faq: ['odoo-edition', 'pricing', 'ai-accuracy'],
    bodyTitle: 'Odoo accounting for Indian businesses, explained.',
    body: [
      { type: 'h2', text: 'What Odoo Accounting does for an Indian business', id: 'what-odoo-accounting-does' },
      {
        type: 'p',
        text: "Odoo Accounting keeps your books in the same system as sales, purchase and stock. When a delivery is confirmed, the invoice is ready; when a supplier bill arrives, it matches the purchase order; when the bank statement comes in, payments reconcile against open invoices. Your accountant stops retyping and starts reviewing.",
      },
      {
        type: 'ul',
        items: [
          "**GST built in:** Odoo's India localisation sets up CGST, SGST and IGST taxes, HSN and SAC codes, and GST reports such as GSTR-1 and GSTR-3B.",
          "**E-invoicing and e-way bills:** Odoo connects to the government portals to generate the IRN and QR code on invoices and to create e-way bills. Availability depends on your Odoo edition and version, so we confirm it for your setup before we start.",
          "**Invoices from orders:** sales orders and deliveries become invoices without retyping, with automatic payment reminders.",
          "**Bank reconciliation:** bank statements imported or synced, with rules that match recurring payments for you.",
          "**Multi-company and branches:** separate books per company or GSTIN, with consolidated reports for the owner (Custom plan).",
          "**Reports:** profit and loss, balance sheet, aged receivables and payables, cash flow, all live.",
        ],
      },
      { type: 'h2', text: 'Odoo vs Tally Prime vs Zoho Books', id: 'odoo-vs-tally-vs-zoho-books' },
      {
        type: 'p',
        text: "All three handle GST accounting. The difference is how much of the business they run. Tally is the accountant's tool; Zoho Books is cloud accounting inside the Zoho suite; Odoo is a full ERP where accounting is one app among sales, stock, purchase, manufacturing and POS.",
      },
      {
        type: 'table',
        head: ['', 'Odoo', 'Tally Prime', 'Zoho Books'],
        rows: [
          ['Best fit', 'Businesses that want accounting, stock, sales and manufacturing in one system', 'Accounting-led businesses whose CA works in Tally', 'Service and trading businesses that want simple cloud accounting'],
          ['Inventory and manufacturing', 'Full inventory, multi-warehouse, manufacturing (MRP) in the same database', 'Inventory and basic manufacturing vouchers', 'Inventory via Zoho Inventory; no full manufacturing'],
          ['Sales, CRM, POS, eCommerce', 'Built-in apps on the same data', 'Not included', 'Separate Zoho apps'],
          ['Customisation', 'Custom modules for any workflow', 'TDL customisation', 'Limited to settings and integrations'],
          ['Where it runs', 'Cloud (Odoo Online, Odoo.sh) or your own server', 'Desktop, with remote access options', 'Cloud'],
          ['Typical trigger to move to Odoo', 'Already there', 'Stock, sales and accounts no longer match', 'Need manufacturing or deeper stock control'],
        ],
        caption: 'Summary of product scope as of November 2026. Each product changes often; check current features before deciding.',
      },
      { type: 'h2', text: 'How we set up Odoo accounting', id: 'how-we-set-up-odoo-accounting' },
      {
        type: 'ol',
        items: [
          "**Map your current books:** chart of accounts, GSTINs, tax rates, cost centres and how your CA closes the month.",
          "**Configure Odoo:** chart of accounts, GST taxes and fiscal positions, HSN codes, invoice and credit note formats.",
          "**Move opening balances:** customers, suppliers, ledgers and open invoices from Tally or Excel, checked against your trial balance.",
          "**Connect money:** bank statement import or sync, reconciliation rules, and payment gateways such as Stripe or GoCardless.",
          "**Automate the routine:** invoices from deliveries, payment reminders, recurring bills, and AI that reads supplier invoices.",
          "**Train and hand over:** your accountant runs one month-end in Odoo with us beside them, then on their own.",
        ],
      },
      {
        type: 'callout',
        title: 'Your CA stays',
        text: "We set up and support the system; your chartered accountant keeps filing returns and signing off the books. Odoo exports the reports they need, and they can be given their own login.",
      },
      { type: 'h2', text: 'Moving from Tally to Odoo', id: 'moving-from-tally' },
      {
        type: 'p',
        text: "Most of our accounting projects start on Tally. We export masters and balances, map Tally ledgers to the Odoo chart of accounts, load open invoices so receivables carry over, and run Tally and Odoo side by side for one month-end until the numbers match. Then Tally becomes read-only history. Read the full [Tally to Odoo migration guide](/insights/tally-to-odoo-migration).",
      },
      { type: 'h2', text: 'Where AI helps in accounting', id: 'ai-in-accounting' },
      {
        type: 'p',
        text: "The repetitive part of accounting is reading documents. We add AI that reads supplier invoices, receipts and order emails into Odoo as draft bills, checks them against purchase orders, and sends anything unclear to a person. On one build this removed 80% of manual invoice entry.",
      },
    ],
    faqItems: [
      {
        q: 'Can Odoo replace Tally for GST?',
        a: "For most growing businesses, yes. Odoo's India localisation handles GST taxes, HSN codes, GSTR reports, e-invoicing and e-way bills (depending on edition and version). Many companies keep Tally read-only for past years after moving.",
      },
      {
        q: 'Do we need Odoo Enterprise for accounting?',
        a: 'Odoo Community includes invoicing and payments. Full accounting (bank reconciliation, financial reports, budgets, assets) is part of the paid Odoo plans. We recommend the plan after looking at your process on the free diagnostic call.',
      },
      {
        q: 'Can our chartered accountant work in Odoo?',
        a: 'Yes. Your CA can have their own Odoo login with access to the reports and ledgers they need, or receive exported reports. We train them during go-live.',
      },
      {
        q: 'How long does an Odoo accounting setup take?',
        a: 'A focused invoicing and accounting setup with opening balances usually takes 2 to 4 weeks. Adding inventory, multi-company or a Tally migration with years of history takes longer; you get a milestone plan before we start.',
      },
    ],
    seo: {
      title: 'Odoo Accounting Services & GST Billing Software Setup in India | CodeCrafters',
      description:
        'Odoo accounting and billing set up for Indian businesses: GST, e-invoicing, bank reconciliation, Tally migration and AI invoice reading. Odoo vs Tally vs Zoho Books compared.',
    },
  },
]

export default odooUseCases
