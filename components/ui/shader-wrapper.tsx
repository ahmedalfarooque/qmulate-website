'use client'
import { Component, ReactNode } from 'react'
import dynamic from 'next/dynamic'

const CrystalSceneDynamic = dynamic(
  () => import('./CrystalScene').then(m => ({ default: m.CrystalScene })),
  {
    ssr: false,
    loading: () => null,
  }
)

export class ShaderWrapper extends Component<
  { children?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn('Shader background failed gracefully:', error.message)
  }

  render() {
    if (this.state.hasError) return null
    return <CrystalSceneDynamic />
  }
}
