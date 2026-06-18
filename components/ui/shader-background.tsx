'use client'
import { useEffect, useRef } from 'react'
import { isIOS, isMobileDevice, isSafariBrowser } from '@/lib/device'

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `

  const fsSource = `
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;

    const float overallSpeed       = 0.08;
    const float gridSmoothWidth    = 0.015;
    const float axisWidth          = 0.03;
    const float majorLineWidth     = 0.018;
    const float minorLineWidth     = 0.008;
    const float majorLineFrequency = 5.0;
    const float minorLineFrequency = 1.0;
    const float scale              = 5.0;
    const float minLineWidth       = 0.006;
    const float maxLineWidth       = 0.10;
    const float lineSpeed          = 1.0 * overallSpeed;
    const float lineAmplitude      = 1.0;
    const float lineFrequency      = 0.2;
    const float warpSpeed          = 0.2 * overallSpeed;
    const float warpFrequency      = 0.5;
    const float warpAmplitude      = 1.0;
    const float offsetFrequency    = 0.5;
    const float offsetSpeed        = 1.33 * overallSpeed;
    const float minOffsetSpread    = 0.6;
    const float maxOffsetSpread    = 2.0;
    const int   linesPerGroup      = 10;

    #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
    #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
    #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
    #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

    float drawGridLines(float axis) {
      return drawCrispLine(0.0, axisWidth, axis)
           + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
           + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
    }

    float drawGrid(vec2 space) {
      return min(1.0, drawGridLines(space.x) + drawGridLines(space.y));
    }

    float random(float t) {
      return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
    }

    float getPlasmaY(float x, float horizontalFade, float offset) {
      return random(x * lineFrequency + iTime * lineSpeed)
             * horizontalFade * lineAmplitude + offset;
    }

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      vec2 uv        = fragCoord / iResolution.xy;
      vec2 space     = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

      float horizontalFade = 1.0 - (cos(uv.x * 6.28318) * 0.5 + 0.5);
      float verticalFade   = 1.0 - (cos(uv.y * 6.28318) * 0.5 + 0.5);

      space.y += random(space.x * warpFrequency + iTime * warpSpeed)
                 * warpAmplitude * (0.5 + horizontalFade);
      space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0)
                 * warpAmplitude * horizontalFade;

      // QMULATE brand colors:
      // Primary blue:  #5B7CFA = vec3(0.357, 0.486, 0.980)
      // Cyan accent:   #00C4CC = vec3(0.000, 0.769, 0.800)
      // Soft white:    #A8B8FF = vec3(0.659, 0.722, 1.000) — thin highlight lines
      vec4 colorBlue  = vec4(0.357, 0.486, 0.980, 1.0);
      vec4 colorCyan  = vec4(0.000, 0.769, 0.800, 1.0);
      vec4 colorWhite = vec4(0.659, 0.722, 1.000, 1.0);

      vec4 lines = vec4(0.0);

      for (int l = 0; l < linesPerGroup; l++) {
        float nli            = float(l) / float(linesPerGroup);
        float offsetTime     = iTime * offsetSpeed;
        float offsetPosition = float(l) + space.x * offsetFrequency;
        float rand           = random(offsetPosition + offsetTime) * 0.5 + 0.5;
        float halfWidth      = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
        float offset         = random(offsetPosition + offsetTime * (1.0 + nli))
                               * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
        float linePosition   = getPlasmaY(space.x, horizontalFade, offset);
        float line           = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0
                             + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

        float circleX   = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
        vec2  circlePos = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
        float circle    = drawCircle(circlePos, 0.01, space) * 4.0;
        line += circle;

        // Blend between blue, cyan, and white based on line index
        vec4 lc = nli < 0.33
          ? mix(colorBlue,  colorCyan,  nli * 3.0)
          : nli < 0.66
            ? mix(colorCyan,  colorWhite, (nli - 0.33) * 3.0)
            : mix(colorWhite, colorBlue,  (nli - 0.66) * 3.0);

        lines += line * lc * rand;
      }

      // Background: deep ink #0A0B0D → midnight navy #0B1120
      // With subtle glassmorphism depth: slightly lighter in center
      vec4 bgBase   = vec4(0.039, 0.043, 0.051, 1.0); // #0A0B0D
      vec4 bgAccent = vec4(0.043, 0.067, 0.125, 1.0); // #0B1120

      // Radial vignette — darker edges, slightly lighter center (glass depth)
      float vignette = 1.0 - length(uv - 0.5) * 1.2;
      vignette = clamp(vignette, 0.0, 1.0);

      vec4 fragColor = mix(bgBase, bgAccent, vignette * 0.5);
      fragColor *= verticalFade * 0.9 + 0.1;
      fragColor.a = 1.0;

      // Glass surface shimmer — faint horizontal light band
      float shimmer = smoothstep(0.48, 0.52, uv.y) * 0.03;
      fragColor.rgb += shimmer;

      // Lines at low opacity — subtle, not overpowering
      lines *= 0.40;
      fragColor += lines;

      // Final: clamp to prevent overblown whites
      fragColor = clamp(fragColor, 0.0, 1.0);

      gl_FragColor = fragColor;
    }
  `

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Skip WebGL on iOS, mobile, Safari, low-end, or reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shouldSkip = isIOS() || isMobileDevice() || isSafariBrowser() || prefersReduced

    if (shouldSkip) {
      canvas.style.display = 'none'
      return
    }

    // WEBGL SAFETY — wrap everything in try/catch
    let gl: WebGLRenderingContext | null = null
    try {
      gl = canvas.getContext('webgl', {
        powerPreference: 'low-power',      // critical for mobile GPU
        antialias: false,                   // saves memory
        depth: false,                       // not needed
        stencil: false,                     // not needed
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: true, // bail if GPU is too slow
      })
    } catch (e) {
      canvas.style.display = 'none'
      return
    }

    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    const loadShader = (type: number, source: string) => {
      const shader = gl!.createShader(type)!
      gl!.shaderSource(shader, source)
      gl!.compileShader(shader)
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl!.getShaderInfoLog(shader))
        gl!.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = loadShader(gl.VERTEX_SHADER, vsSource)
    const fs = loadShader(gl.FRAGMENT_SHADER, fsSource)
    if (!vs || !fs) return

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const attribPos   = gl.getAttribLocation(program, 'aVertexPosition')
    const uResolution = gl.getUniformLocation(program, 'iResolution')
    const uTime       = gl.getUniformLocation(program, 'iTime')

    // FRAME RATE LIMITER — max 30fps instead of 60fps
    let lastFrame = 0
    const FPS_LIMIT = 30
    const FRAME_MIN = 1000 / FPS_LIMIT

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width  = Math.floor(window.innerWidth  * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width  = window.innerWidth  + 'px'
      canvas.style.height = window.innerHeight + 'px'
      gl!.viewport(0, 0, canvas.width, canvas.height)
    }
    window.addEventListener('resize', resize)
    resize()

    const startTime = Date.now()
    let rafId: number

    const render = (timestamp: number) => {
      // Throttle to 30fps
      if (timestamp - lastFrame < FRAME_MIN) {
        rafId = requestAnimationFrame(render)
        return
      }
      lastFrame = timestamp

      const t = (Date.now() - startTime) / 1000
      gl!.clearColor(0.039, 0.043, 0.051, 1.0)
      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.useProgram(program)
      gl!.uniform2f(uResolution, canvas.width, canvas.height)
      gl!.uniform1f(uTime, t)
      gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuffer)
      gl!.vertexAttribPointer(attribPos, 2, gl!.FLOAT, false, 0, 0)
      gl!.enableVertexAttribArray(attribPos)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    // VISIBILITY API — pause shader when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId)
      } else {
        rafId = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
      try {
        gl!.deleteProgram(program)
      } catch (e) {}
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  )
}

export default ShaderBackground
