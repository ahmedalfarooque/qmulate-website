'use client'

// Floating 3D geometry (glass blocks, diamonds, cubes) removed per design
// decision. Kept as a no-op mount point so app/layout.tsx doesn't need
// changes if the effect is ever reintroduced.
export function CrystalScene() {
  return <div style={{ display: 'none' }} aria-hidden="true" />
}
