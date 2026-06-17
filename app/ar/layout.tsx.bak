'use client'
import { useEffect } from 'react'

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  // Set RTL direction on the root <html> element while on Arabic pages,
  // then restore when navigating away. The root layout cannot be overridden
  // in Next.js App Router nested layouts, so we apply it via the DOM.
  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('lang', 'ar')
    html.setAttribute('dir', 'rtl')
    return () => {
      html.setAttribute('lang', 'en')
      html.removeAttribute('dir')
    }
  }, [])

  return (
    <div lang="ar" dir="rtl" style={{ direction: 'rtl' }}>
      {children}
    </div>
  )
}
