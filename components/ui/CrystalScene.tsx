'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CrystalScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  // Floating 3D geometry (glass blocks, diamonds, cubes) removed per design decision.
  return <div ref={mountRef} style={{ display: 'none' }} aria-hidden="true" />

  // eslint-disable-next-line no-unreachable
  useEffect(() => {
    // Skip WebGL on mobile, tablet, and smaller laptops — MeshPhysicalMaterial with
    // transmission requires a full GPU render-target per frame and exhausts
    // iOS/iPadOS GPU memory (iPad Mini=1024px, iPad Air=1180px, iPad Pro=1366px).
    // 1280px threshold skips all iPad form factors while keeping full desktops.
    if (window.innerWidth < 1280) return

    const mount = mountRef.current
    if (!mount) return

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'default',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = false
    mount.appendChild(renderer.domElement)

    // ── SCENE + CAMERA ──
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60, window.innerWidth / window.innerHeight, 0.1, 200
    )
    camera.position.set(0, 0, 30)

    // ── BRAND COLORS ──
    const BLUE   = 0x5B7CFA
    const CYAN   = 0x00C4CC
    const CYAN2  = 0x00D4FF
    const WHITE  = 0xFFFFFF
    const VIOLET = 0x8A5CFF

    // ── SHARED MATERIAL FACTORY ──
    const makeMat = (color: number, opacity: number, transmission = 0.88, roughness = 0.04): THREE.MeshPhysicalMaterial =>
      new THREE.MeshPhysicalMaterial({
        color,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0,
        transparent: true,
        opacity,
        roughness,
        metalness: 0.08,
        transmission,
        thickness: 1.4,
        ior: 1.52,
        reflectivity: 0.65,
        side: THREE.DoubleSide,
        wireframe: false,
      })

    const pickMat = (i: number) => {
      const r = i % 4
      if (r === 0) return makeMat(BLUE,  rnd(0.07, 0.24))
      if (r === 1) return makeMat(CYAN,  rnd(0.06, 0.20))
      if (r === 2) return makeMat(WHITE, rnd(0.04, 0.14))
      return              makeMat(VIOLET,rnd(0.05, 0.18))
    }

    // ── LIGHTS ──
    const ambientLight = new THREE.AmbientLight(BLUE, 0.35)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(BLUE,  3.5, 90)
    pointLight1.position.set(-18, 12, 22)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(CYAN,  2.5, 90)
    pointLight2.position.set(18, -12, 16)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(WHITE, 1.2, 55)
    pointLight3.position.set(0, 22, 12)
    scene.add(pointLight3)

    const pointLight4 = new THREE.PointLight(VIOLET, 1.8, 70)
    pointLight4.position.set(-22, -18, 18)
    scene.add(pointLight4)

    // ── ENERGY BEAM LIGHT (moves) ──
    const beamLight = new THREE.SpotLight(CYAN2, 10, 110, Math.PI / 7, 0.28)
    beamLight.position.set(0, 30, 22)
    scene.add(beamLight)
    scene.add(beamLight.target)

    // ── VERTICAL SCAN LIGHT (mirrors CSS energy beam 5.5s cycle) ──
    const scanLight = new THREE.PointLight(CYAN2, 0, 55)
    scanLight.position.set(0, 24, 16)
    scene.add(scanLight)

    // ── CLEANUP FLAG — stops recursive gsap.delayedCall chains after unmount ──
    let killed = false

    // ── HELPER ──
    const rnd = (min: number, max: number) => Math.random() * (max - min) + min
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

    // ── RESPONSIVE COUNTS ──
    const isMobile  = window.innerWidth < 768
    const isTablet  = window.innerWidth < 1024

    // ── LAYER 1: GLASS FACADE BLOCKS ──
    const blockCount   = isMobile ? 100 : isTablet ? 180 : 300
    const diamondCount = isMobile ?  18 : isTablet ?  30 :  48
    const cubeCount    = isMobile ?  15 : isTablet ?  24 :  38

    type BlockData = {
      mesh: THREE.Mesh
      baseX: number; baseY: number; baseZ: number
      rotSpeed: THREE.Vector3
      floatAmp: number; floatSpeed: number; floatOffset: number
      isZooming: boolean
      baseMat: { opacity: number }
    }

    const blocks: BlockData[] = []

    for (let i = 0; i < blockCount; i++) {
      const w   = rnd(0.6, 3.2)
      const h   = rnd(0.25, 1.4)
      const d   = rnd(0.08, 0.5)
      const geo = new THREE.BoxGeometry(w, h, d)
      const mat = pickMat(i)
      const baseOpacity = mat.opacity

      const mesh = new THREE.Mesh(geo, mat)
      const bx = rnd(-38, 38)
      const by = rnd(-24, 24)
      const bz = rnd(-28, 6)
      mesh.position.set(bx, by, bz)
      mesh.rotation.set(
        rnd(0, Math.PI * 2),
        rnd(0, Math.PI * 2),
        rnd(0, Math.PI * 2)
      )
      scene.add(mesh)

      blocks.push({
        mesh,
        baseX: bx, baseY: by, baseZ: bz,
        rotSpeed: new THREE.Vector3(
          rnd(-0.005, 0.005),
          rnd(-0.005, 0.005),
          rnd(-0.004, 0.004)
        ),
        floatAmp: rnd(0.25, 1.4),
        floatSpeed: rnd(0.25, 1.0),
        floatOffset: rnd(0, Math.PI * 2),
        isZooming: false,
        baseMat: { opacity: baseOpacity },
      })
    }

    // ── RANDOM BLOCK ZOOM ──
    const triggerBlockZoom = (b: BlockData) => {
      if (b.isZooming || killed) return
      b.isZooming = true
      const mat = b.mesh.material as THREE.MeshPhysicalMaterial
      const baseOp = b.baseMat.opacity
      gsap.timeline({
        onComplete: () => {
          if (killed) return
          b.isZooming = false
          gsap.delayedCall(rnd(3, 16), () => { if (!killed) triggerBlockZoom(b) })
        }
      })
        .to(b.mesh.scale, { x: 1.8, y: 1.8, z: 2.5, duration: 0.9, ease: 'power2.out' })
        .to(mat, { opacity: Math.min(baseOp * 4.5, 0.85), emissiveIntensity: 0.45, duration: 0.55, ease: 'power2.out' }, '<')
        .to(b.mesh.scale, { x: 1, y: 1, z: 1, duration: 1.4, ease: 'power2.inOut' })
        .to(mat, { opacity: baseOp, emissiveIntensity: 0, duration: 0.9, ease: 'power2.inOut' }, '<')
    }

    blocks.forEach(b => {
      gsap.delayedCall(rnd(0, 14), () => triggerBlockZoom(b))
    })

    // ── RANDOM BLOCK LIGHTING PULSE ──
    const pulseLighting = (b: BlockData) => {
      if (killed) return
      const mat = b.mesh.material as THREE.MeshPhysicalMaterial
      const base = b.baseMat.opacity
      gsap.timeline({
        onComplete: () => {
          if (killed) return
          gsap.delayedCall(rnd(1.5, 9), () => { if (!killed) pulseLighting(b) })
        }
      })
        .to(mat, { opacity: base * rnd(2.5, 5), emissiveIntensity: rnd(0.1, 0.3), duration: rnd(0.35, 1.1), ease: 'sine.inOut' })
        .to(mat, { opacity: base * rnd(0.2, 0.6), emissiveIntensity: 0, duration: rnd(0.5, 1.7), ease: 'sine.inOut' })
        .to(mat, { opacity: base, duration: rnd(0.3, 0.9), ease: 'sine.inOut' })
    }
    blocks.forEach(b => {
      gsap.delayedCall(rnd(0, 8), () => pulseLighting(b))
    })

    // ── LAYER 2: CRYSTAL DIAMONDS ──
    const dGeoSmall = new THREE.OctahedronGeometry(0.28, 0)
    const dGeoMed   = new THREE.OctahedronGeometry(0.58, 0)
    const dGeoLarge = new THREE.OctahedronGeometry(1.05, 0)
    const dGeoHero  = new THREE.OctahedronGeometry(1.75, 0)
    const dGeos = [
      dGeoSmall, dGeoSmall, dGeoSmall, dGeoSmall,
      dGeoMed,   dGeoMed,   dGeoMed,
      dGeoLarge, dGeoLarge,
      dGeoHero,
    ]

    const diamonds: { mesh: THREE.Mesh; vx: number; vy: number; vz: number; baseOp: number }[] = []

    for (let i = 0; i < diamondCount; i++) {
      const geo = pick(dGeos)
      const mat = makeMat(
        pick([CYAN2, BLUE, WHITE, VIOLET]),
        rnd(0.22, 0.58)
      )
      mat.roughness = 0.0
      mat.transmission = 0.92
      mat.ior = 1.6
      const baseOp = mat.opacity
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(rnd(-32, 32), rnd(-22, 22), rnd(-12, 16))
      mesh.rotation.set(rnd(0, Math.PI), rnd(0, Math.PI), rnd(0, Math.PI))
      scene.add(mesh)

      const speed = rnd(0.018, 0.09)
      diamonds.push({
        mesh,
        vx: rnd(-speed, speed),
        vy: rnd(-speed, speed),
        vz: rnd(-speed * 0.3, speed * 0.3),
        baseOp,
      })
    }

    // ── LAYER 3: CRYSTAL CUBES ──
    const cGeoSmall = new THREE.BoxGeometry(0.38, 0.38, 0.38)
    const cGeoMed   = new THREE.BoxGeometry(0.85, 0.85, 0.85)
    const cGeoLarge = new THREE.BoxGeometry(1.55, 1.55, 1.55)
    const cGeoHero  = new THREE.BoxGeometry(2.3,  2.3,  2.3)
    const cGeos = [
      cGeoSmall, cGeoSmall, cGeoSmall, cGeoSmall,
      cGeoMed,   cGeoMed,   cGeoMed,
      cGeoLarge, cGeoLarge,
      cGeoHero,
    ]

    const cubes: { mesh: THREE.Mesh; vx: number; vy: number; baseOp: number }[] = []

    for (let i = 0; i < cubeCount; i++) {
      const geo = pick(cGeos)
      const mat = makeMat(
        pick([BLUE, CYAN, VIOLET, WHITE]),
        rnd(0.10, 0.42)
      )
      mat.roughness = 0.04
      const baseOp = mat.opacity
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(rnd(-30, 30), rnd(-20, 20), rnd(-10, 14))
      mesh.rotation.set(rnd(0, Math.PI), rnd(0, Math.PI), rnd(0, Math.PI))
      scene.add(mesh)

      const speed = rnd(0.012, 0.058)
      cubes.push({ mesh, vx: rnd(-speed, speed), vy: rnd(-speed, speed), baseOp })
    }

    // ── LAYER 4: 3D ENERGY BEAM (horizontal, cross-sweeper) ──
    const beamGeo    = new THREE.CylinderGeometry(0.05, 0.05, 65, 8)
    const beamMat    = new THREE.MeshBasicMaterial({ color: CYAN2, transparent: true, opacity: 0.0 })
    const beam       = new THREE.Mesh(beamGeo, beamMat)
    beam.rotation.z  = Math.PI / 2
    beam.position.set(0, 0, 9)
    scene.add(beam)

    const beamGlowGeo  = new THREE.CylinderGeometry(0.22, 0.22, 65, 8)
    const beamGlowMat  = new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.0 })
    const beamGlow     = new THREE.Mesh(beamGlowGeo, beamGlowMat)
    beamGlow.rotation.z = Math.PI / 2
    beamGlow.position.set(0, 0, 8.8)
    scene.add(beamGlow)

    const sweepBeam = () => {
      if (killed) return
      const targetY = rnd(-16, 16)
      gsap.timeline({ onComplete: () => { if (!killed) gsap.delayedCall(rnd(3, 10), sweepBeam) } })
        .to(beamMat,     { opacity: 0.75, duration: 0.4, ease: 'power2.out' })
        .to(beamGlowMat, { opacity: 0.22, duration: 0.4, ease: 'power2.out' }, '<')
        .to(beam.position,     { y: targetY, duration: rnd(1.8, 4.5), ease: 'power1.inOut' })
        .to(beamGlow.position, { y: targetY, duration: rnd(1.8, 4.5), ease: 'power1.inOut' }, '<')
        .to(beamMat,     { opacity: 0.0, duration: 0.55, ease: 'power2.in' })
        .to(beamGlowMat, { opacity: 0.0, duration: 0.55, ease: 'power2.in' }, '<')
    }
    gsap.delayedCall(0.8, sweepBeam)

    // ── ADVANCED LIGHTNING SYSTEM ──
    const addLightningStreak = () => {
      const startX = rnd(-42, 42)
      const startY = rnd(-26, 26)
      const startZ = rnd(-6, 12)
      const endX   = rnd(-42, 42)
      const endY   = rnd(-26, 26)

      // Zigzag segments for realistic lightning
      const segments = Math.floor(rnd(3, 9))
      const points: THREE.Vector3[] = [new THREE.Vector3(startX, startY, startZ)]
      for (let s = 1; s < segments; s++) {
        const t  = s / segments
        const mx = startX + (endX - startX) * t + rnd(-10, 10)
        const my = startY + (endY - startY) * t + rnd(-7,  7)
        points.push(new THREE.Vector3(mx, my, rnd(-5, 12)))
      }
      points.push(new THREE.Vector3(endX, endY, rnd(-5, 12)))

      const geo  = new THREE.BufferGeometry().setFromPoints(points)
      const color = Math.random() > 0.5 ? BLUE : CYAN2
      const mat  = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0 })
      const line = new THREE.Line(geo, mat)
      scene.add(line)

      gsap.timeline({
        onComplete: () => {
          scene.remove(line)
          geo.dispose()
          mat.dispose()
          if (!killed) gsap.delayedCall(rnd(1.5, 7), addLightningStreak)
        }
      })
        .to(mat, { opacity: rnd(0.55, 0.95), duration: 0.06, ease: 'power4.out' })
        .to(mat, { opacity: rnd(0.15, 0.45), duration: 0.12, ease: 'sine.inOut' })
        .to(mat, { opacity: rnd(0.4, 0.8),   duration: 0.06, ease: 'power4.out' })
        .to(mat, { opacity: 0, duration: rnd(0.25, 0.85), ease: 'power2.in' })
    }

    for (let i = 0; i < 8; i++) {
      gsap.delayedCall(rnd(0, 5), addLightningStreak)
    }

    // ── MOUSE INTERACTION ──
    const mouse = new THREE.Vector2(0, 0)
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // ── SCROLL PARALLAX ──
    let scrollProgress = 0
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => { scrollProgress = self.progress },
    })

    // ── RESIZE ──
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // ── ANIMATION LOOP ──
    const startTime = performance.now()
    let   rafId: number

    const BEAM_CYCLE = 5.5  // matches CSS EnergyBeam animation

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const elapsed = (performance.now() - startTime) / 1000

      // ── Vertical scan beam Y (synced to CSS EnergyBeam 5.5s cycle) ──
      const cyclePos   = (elapsed % BEAM_CYCLE) / BEAM_CYCLE      // 0→1
      const scanY      = 25 - cyclePos * 50                        // 25→-25
      const scanFade   = Math.sin(cyclePos * Math.PI)              // 0→1→0
      scanLight.position.y   = scanY
      scanLight.intensity    = scanFade * 7
      scanLight.position.x   = Math.sin(elapsed * 0.18) * 4       // slight horizontal drift

      // ── Blocks float + beam illumination ──
      blocks.forEach(b => {
        b.mesh.rotation.x += b.rotSpeed.x
        b.mesh.rotation.y += b.rotSpeed.y
        b.mesh.rotation.z += b.rotSpeed.z
        b.mesh.position.y  = b.baseY + Math.sin(elapsed * b.floatSpeed + b.floatOffset) * b.floatAmp

        if (!isMobile) {
          b.mesh.position.x = b.baseX + mouse.x * (b.baseZ * -0.14)
          b.mesh.position.z = b.baseZ + mouse.y * 0.5
        }

        // Beam illumination
        if (!b.isZooming) {
          const dist = Math.abs(b.mesh.position.y - scanY)
          const influence = Math.max(0, 1 - dist / 14) * scanFade
          const mat = b.mesh.material as THREE.MeshPhysicalMaterial
          mat.emissiveIntensity = influence * 0.35
        }
      })

      // ── Diamonds bounce + beam sparkle ──
      diamonds.forEach(d => {
        d.mesh.position.x += d.vx
        d.mesh.position.y += d.vy
        d.mesh.position.z += d.vz
        d.mesh.rotation.x += 0.009
        d.mesh.rotation.y += 0.013
        d.mesh.rotation.z += 0.006

        if (Math.abs(d.mesh.position.x) > 34) d.vx *= -1
        if (Math.abs(d.mesh.position.y) > 23) d.vy *= -1
        if (d.mesh.position.z > 18 || d.mesh.position.z < -13) d.vz *= -1

        if (!isMobile) {
          d.mesh.position.x += mouse.x * 0.014
          d.mesh.position.y += mouse.y * 0.009
        }

        // Sparkle near beam
        const dDist = Math.abs(d.mesh.position.y - scanY)
        const dInfluence = Math.max(0, 1 - dDist / 10) * scanFade
        const dMat = d.mesh.material as THREE.MeshPhysicalMaterial
        dMat.emissiveIntensity = dInfluence * 0.55
        if (dInfluence > 0.5) {
          d.mesh.scale.setScalar(1 + dInfluence * 0.12)
        } else {
          d.mesh.scale.setScalar(1)
        }
      })

      // ── Cubes bounce + beam brighten ──
      cubes.forEach(c => {
        c.mesh.position.x += c.vx
        c.mesh.position.y += c.vy
        c.mesh.rotation.x += 0.007
        c.mesh.rotation.y += 0.010
        c.mesh.rotation.z += 0.004

        if (Math.abs(c.mesh.position.x) > 32) c.vx *= -1
        if (Math.abs(c.mesh.position.y) > 21) c.vy *= -1

        if (!isMobile) {
          c.mesh.position.x += mouse.x * 0.011
          c.mesh.position.y += mouse.y * 0.008
        }

        const cDist = Math.abs(c.mesh.position.y - scanY)
        const cInfluence = Math.max(0, 1 - cDist / 12) * scanFade
        const cMat = c.mesh.material as THREE.MeshPhysicalMaterial
        cMat.emissiveIntensity = cInfluence * 0.42
      })

      // ── Beam light follows horizontal beam mesh ──
      beamLight.target.position.copy(beam.position)
      beamLight.target.updateMatrixWorld()

      // ── Scroll camera shift ──
      camera.position.y = scrollProgress * -4.5
      camera.position.z = 30 + scrollProgress * 3.5

      // ── Ambient light pulse ──
      ambientLight.intensity = 0.35 + Math.sin(elapsed * 0.45) * 0.12

      // ── Colored lights gentle drift ──
      pointLight1.intensity = 3.5 + Math.sin(elapsed * 0.6) * 0.8
      pointLight2.intensity = 2.5 + Math.cos(elapsed * 0.5) * 0.7
      pointLight4.intensity = 1.8 + Math.sin(elapsed * 0.35 + 1.2) * 0.5

      renderer.render(scene, camera)
    }

    animate()

    // ── CLEANUP ──
    return () => {
      killed = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(t => t.kill())
      gsap.globalTimeline.clear()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
