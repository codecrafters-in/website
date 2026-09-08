// First-touch attribution for form submissions.
//
// Captured once per session on the first page the visitor lands on, then held
// in sessionStorage so it survives client-side navigation. Without this every
// lead arrives with no idea where it came from.

const KEY = 'cc_attribution'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
const CLICK_IDS = ['gclid', 'fbclid', 'msclkid', 'li_fat_id']

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'

function read() {
  if (!isBrowser()) return null
  try {
    const raw = window.sessionStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(data) {
  if (!isBrowser()) return
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    /* private mode — attribution is best-effort, never block the form */
  }
}

/**
 * Call once, as early as possible. Records only the FIRST touch: if a session
 * already has attribution, later pages do not overwrite it.
 */
export function captureAttribution() {
  if (!isBrowser() || read()) return
  const params = new URLSearchParams(window.location.search)
  const data = { landing_page: window.location.pathname }

  for (const k of UTM_KEYS) {
    const v = params.get(k)
    if (v) data[k] = v.slice(0, 120)
  }
  for (const k of CLICK_IDS) {
    const v = params.get(k)
    if (v) data[k] = v.slice(0, 200)
  }

  // Referrer only when it is genuinely external.
  const ref = document.referrer
  if (ref) {
    try {
      const host = new URL(ref).hostname
      if (host && host !== window.location.hostname) data.referrer = ref.slice(0, 200)
    } catch {
      /* malformed referrer — skip it */
    }
  }
  write(data)
}

/** Flat object suitable for merging straight into a form payload. Never throws. */
export function getAttribution() {
  return read() || {}
}
