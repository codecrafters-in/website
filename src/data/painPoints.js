// "Sound familiar?" cards. Vendor-neutral by design.
// `cost` states a consequence, never an invented industry statistic — if we cannot
// cite a figure, we describe what it costs the business instead.
export const painPoints = [
  {
    id: 'manual-work',
    icon: 'clock',
    title: 'Manual work killing margins',
    body: 'Skilled people spending their day on copy-paste between systems. That is salary paying for data entry.',
    cost: 'Salary spent on work software should do',
  },
  {
    id: 'silos',
    icon: 'database',
    title: 'Data trapped in silos',
    body: 'Finance cannot see ops. Sales cannot see stock. Six-figure decisions made on half the picture.',
    cost: 'Decisions made on half the picture',
  },
  {
    id: 'wont-scale',
    icon: 'server-crash',
    title: 'Tech that will not scale',
    body: 'Every new customer or SKU adds friction. Built for where you were, not where you are going.',
    cost: 'Growth capped at current infra',
  },
  {
    id: 'billing',
    icon: 'receipt',
    title: 'Invoicing and billing chaos',
    body: 'Manual invoices, missed follow-ups, no reconciliation. Money owed sits uncollected for weeks.',
    cost: 'Cash collected later than it should be',
  },
  {
    id: 'unused-software',
    icon: 'trending-down',
    title: 'Software nobody actually uses',
    body: 'You bought the platform. Half the team still lives in spreadsheets because it was never configured for them.',
    cost: 'Full licence cost, zero ROI',
  },
  {
    id: 'key-person',
    icon: 'user-x',
    title: 'Key-person dependency',
    body: 'Critical processes live in one head. When that person is out, operations stall. No docs, no safety net.',
    cost: 'Single point of failure',
  },
  {
    id: 'visibility',
    icon: 'eye-off',
    title: 'No real-time visibility',
    body: 'You learn about problems after they cost you. Weekly spreadsheets instead of live alerts.',
    cost: 'Decisions on stale data',
  },
  {
    id: 'tickets',
    icon: 'inbox',
    title: 'Support tickets piling up',
    body: 'Customer, internal and vendor requests handled by hand. No routing, no SLAs, no accountability.',
    cost: 'Churn from slow response',
  },
]

export default painPoints
