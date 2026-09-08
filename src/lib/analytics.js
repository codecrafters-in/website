// GA4 via Google Tag Manager, with Consent Mode v2.
//
// Nothing loads until VITE_GTM_ID is set AND the visitor has accepted — so the
// privacy policy's description of analytics stays true either way, and the
// consent banner actually gates something.
//
// Every export is safe to call during SSG (no window) and safe to call before
// GTM exists; events queued on dataLayer are picked up when the container loads.

const env = (typeof import.meta !== 'undefined' && import.meta.env) || {}

export const GTM_ID = env.VITE_GTM_ID || ''
export const CONSENT_KEY = 'cc_consent'

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'

function dataLayer() {
  if (!isBrowser()) return null
  window.dataLayer = window.dataLayer || []
  return window.dataLayer
}

/** GTM's documented shape: arguments object, not an array. */
function gtag(...args) {
  const dl = dataLayer()
  if (dl) dl.push(args)
}

/** 'accepted' | 'declined' | null (undecided). Never throws on blocked storage. */
export function getConsent() {
  if (!isBrowser()) return null
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === 'accepted' || v === 'declined' ? v : null
  } catch {
    return null
  }
}

function setConsent(value) {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* private mode — the session still works, the choice just is not remembered */
  }
}

let containerInjected = false

function injectContainer() {
  if (containerInjected || !GTM_ID || !isBrowser()) return
  containerInjected = true
  const dl = dataLayer()
  dl.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
  document.head.appendChild(s)
}

/**
 * Call once on mount. Declares Consent Mode defaults (everything denied) and
 * loads the container only if the visitor has already accepted.
 */
export function initAnalytics() {
  if (!GTM_ID || !isBrowser()) return
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  })
  if (getConsent() === 'accepted') {
    gtag('consent', 'update', { analytics_storage: 'granted' })
    injectContainer()
  }
}

export function grantConsent() {
  setConsent('accepted')
  if (!GTM_ID || !isBrowser()) return
  gtag('consent', 'update', { analytics_storage: 'granted' })
  injectContainer()
}

export function denyConsent() {
  setConsent('declined')
  if (!GTM_ID || !isBrowser()) return
  gtag('consent', 'update', { analytics_storage: 'denied' })
}

/**
 * Push a conversion event. Safe to call anywhere, any time.
 *
 *   track('whatsapp_click', { location: 'hero' })
 */
export function track(event, params = {}) {
  const dl = dataLayer()
  if (!dl) return
  dl.push({ event, ...params })
}
