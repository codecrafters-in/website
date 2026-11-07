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
    seo: {
      title: 'Odoo POS Setup & Customization for Retail Stores | CodeCrafters',
      description:
        'Odoo Point of Sale set up for single and multi-store retailers: barcodes, price lists, offline billing, and stock and accounts updated as you sell.',
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
    navTitle: 'Odoo billing & accounting',
    short: 'Invoices from orders, payments reconciled, and AI that reads supplier bills.',
    headline: 'Billing and accounting that run themselves in Odoo.',
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
    seo: {
      title: 'Odoo Accounting & Billing Setup, with AI Invoice Reading | CodeCrafters',
      description:
        'Odoo invoicing and accounting set up for growing businesses: invoices from orders, bank reconciliation, GST invoices via Odoo India, and AI that reads supplier bills.',
    },
  },
]

export default odooUseCases
