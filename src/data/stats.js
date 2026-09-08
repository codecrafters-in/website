// Measured outcomes from delivered work. Every number here traces to a project,
// a publication or a repo. If a figure cannot be stood behind, it does not ship.
export const stats = [
  { id: 'projects', value: 30, suffix: '+', label: 'Projects delivered', icon: 'circle-check' },
  { id: 'modules', value: 120, suffix: '+', label: 'Odoo modules shipped', icon: 'database' },
  { id: 'migrations', value: 15, suffix: '+', label: 'ERP migrations delivered', icon: 'workflow' },
  { id: 'mentored', value: 8, label: 'Developers mentored', icon: 'users' },
  { id: 'publications', value: 2, label: 'Peer-reviewed publications', icon: 'book-open' },
  { id: 'planning-accuracy', value: 45, prefix: '+', suffix: '%', label: 'Inventory planning accuracy', icon: 'trending-up' },
  { id: 'discrepancies', value: 60, prefix: '\u2212', suffix: '%', label: 'Stock discrepancies', icon: 'trending-down' },
  { id: 'manual-entry', value: 80, suffix: '%', label: 'Less manual data entry', icon: 'clock' },
  { id: 'nifty-accuracy', value: 92, suffix: '%', label: 'Nifty50 prediction accuracy', icon: 'chart-line' },
  { id: 'emg-accuracy', value: 95, suffix: '%', label: 'EMG gesture accuracy', icon: 'heart-pulse' },
  { id: 'records', value: 10, suffix: 'K+', label: 'Records auto-populated', icon: 'file-text' },
]

export const statById = Object.fromEntries(stats.map((s) => [s.id, s]))

export default stats
