import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Depth map genérico — bulto central que se eleva
function makeDepthMap(cx = 0.5, cy = 0.46, rx = 0.50, ry = 0.44) {
  const size = 512
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, size, size)
  const g = ctx.createRadialGradient(size*cx, size*cy, 0, size*cx, size*0.5, size*Math.max(rx,ry))
  g.addColorStop(0,    '#ffffff')
  g.addColorStop(0.25, '#eeeeee')
  g.addColorStop(0.50, '#aaaaaa')
  g.addColorStop(0.72, '#444444')
  g.addColorStop(1,    '#000000')
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  // Cúpula superior
  const g2 = ctx.createRadialGradient(size*cx, size*0.28, 0, size*cx, size*0.33, size*0.26)
  g2.addColorStop(0, 'rgba(255,255,255,.7)'); g2.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g2; ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

// Alpha mask — elipse suave que CUBRE casi todo el plano (sin marco visible)
function makeAlphaMask(cx = 0.5, cy = 0.5) {
  const size = 512
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, size, size)
  // Gradiente que llega casi al borde completo del plano
  const g = ctx.createRadialGradient(size*cx, size*cy, size*0.02, size*cx, size*cy, size*0.52)
  g.addColorStop(0,    '#ffffff')  // opaco desde el centro
  g.addColorStop(0.70, '#ffffff')  // sigue opaco hasta el 70%
  g.addColorStop(0.86, '#cccccc')  // transición gradual
  g.addColorStop(0.94, '#444444')  // casi transparente
  g.addColorStop(1,    '#000000')  // borde completamente transparente
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

function DepthMesh({ url, w, h, dispScale, sparkles, sparkleColor }) {
  const meshRef   = useRef()
  const { camera, size } = useThree()
  const target    = useRef({ x:0, y:0 })
  const photoTex  = useTexture(url)
  const depthMap  = useMemo(() => makeDepthMap(), [])
  const alphaMask = useMemo(() => makeAlphaMask(), [])

  useEffect(() => {
    const onMove = (e) => {
      target.current.x =  (e.clientX / size.width  - 0.5) * 2.2
      target.current.y = -(e.clientY / size.height - 0.5) * 1.5
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [size])

  /* eslint-disable react-hooks/immutability --
     useFrame de R3F corre por frame fuera del render de React; mutar la
     cámara/mesh aquí es el patrón canónico de react-three-fiber. */
  useFrame(() => {
    camera.position.x += (target.current.x - camera.position.x) * 0.04
    camera.position.y += (target.current.y - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
    if (meshRef.current) meshRef.current.rotation.z = Math.sin(Date.now()*.0004)*.006
  })
  /* eslint-enable react-hooks/immutability */

  return (
    <Float speed={1.2} floatIntensity={0.15} rotationIntensity={0}>
      <mesh ref={meshRef}>
        <planeGeometry args={[w, h, 256, 256]} />
        <meshStandardMaterial
          map={photoTex}
          displacementMap={depthMap}
          displacementScale={dispScale}
          displacementBias={-dispScale * 0.3}
          alphaMap={alphaMask}
          transparent
          roughness={0.65}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Glow detrás */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[w*0.85, h*0.85, 1, 1]} />
        <meshBasicMaterial color={sparkleColor} transparent opacity={0.06}
          blending={THREE.AdditiveBlending} />
      </mesh>
      {sparkles && (
        <Sparkles count={30} scale={[w*1.5, h*1.8, 3]} size={1.5}
          speed={0.3} color={sparkleColor} opacity={0.3} />
      )}
    </Float>
  )
}

export default function DepthPhoto({
  url,
  className = '',
  w = 5.4, h = 3.65,
  dispScale = 0.85,
  sparkles = true,
  sparkleColor = '#ff8800',
  cameraZ = 3.8,
}) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position:[0, 0, cameraZ], fov:50 }}
        className="!w-full !h-full"
        gl={{ antialias:true, toneMapping:THREE.ACESFilmicToneMapping,
              toneMappingExposure:1.3, alpha:true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} color="#fff5e0" />
        <pointLight position={[-3, 2, 3]} intensity={1.0} color="#ff7700" />
        <DepthMesh url={url} w={w} h={h} dispScale={dispScale}
          sparkles={sparkles} sparkleColor={sparkleColor} />
      </Canvas>
    </div>
  )
}
