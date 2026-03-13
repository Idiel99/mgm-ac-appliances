import { useEffect, useState } from 'react'

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)'

export const usePrefersReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false
    }
    return window.matchMedia(MEDIA_QUERY).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia(MEDIA_QUERY)
    const handler = () => setReducedMotion(mediaQuery.matches)

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return reducedMotion
}
