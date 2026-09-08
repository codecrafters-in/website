import useMediaQuery from './useMediaQuery.js'
import useReducedMotion from './useReducedMotion.js'

/**
 * true only for precise pointers (mouse / trackpad) when reduced motion is
 * NOT requested. Used to gate the custom cursor, magnetic buttons, etc.
 * SSR default: false.
 */
export default function usePointerFine() {
  const fine = useMediaQuery('(pointer: fine)', false)
  const reduced = useReducedMotion()
  return fine && !reduced
}
