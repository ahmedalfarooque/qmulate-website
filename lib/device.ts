export const isBrowser = typeof window !== 'undefined'

export function getDeviceClass(): 'mobile' | 'tablet' | 'desktop' {
  if (!isBrowser) return 'desktop'
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

export function isIOS(): boolean {
  if (!isBrowser) return false
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function isAndroid(): boolean {
  if (!isBrowser) return false
  return /Android/i.test(navigator.userAgent)
}

export function isMobileDevice(): boolean {
  return isIOS() || isAndroid() || getDeviceClass() !== 'desktop'
}

export function isSafariBrowser(): boolean {
  if (!isBrowser) return false
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

export function isLowEndDevice(): boolean {
  if (!isBrowser) return false
  const cores = navigator.hardwareConcurrency ?? 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  return cores <= 2 || memory <= 2
}

export function supportsWebGL(): boolean {
  if (!isBrowser) return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl')
      || canvas.getContext('experimental-webgl')
    return !!gl
  } catch {
    return false
  }
}

export function getAnimationLevel(): 'none' | 'css' | 'canvas' | 'webgl' {
  if (!isBrowser) return 'none'

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  if (prefersReduced) return 'none'

  if (isIOS() || isSafariBrowser()) return 'css'
  if (isMobileDevice() || isLowEndDevice()) return 'css'
  if (!supportsWebGL()) return 'canvas'
  return 'canvas'
}
