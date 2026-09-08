import useMediaQuery from './useMediaQuery.js'

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/** true when the user prefers reduced motion. SSR default: false. */
export default function useReducedMotion() {
  return useMediaQuery(REDUCED_MOTION_QUERY, false)
}
