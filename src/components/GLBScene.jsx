import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'

function Model({ path, targetSize, baseRotateY, sway }) {
  const group  = useRef()
  const { scene } = useGLTF(path)

  // Clonar la escena: useGLTF cachea UNA instancia compartida.
  // Sin clonar, usar el mismo GLB en 2 sitios deja uno vacío y la escala se pisa.
  const model = useMemo(() => {
    const cloned = scene.clone(true)
    // Centrar y normalizar tamaño sobre el CLON (no sobre el original cacheado)
    const box    = new THREE.Box3().setFromObject(cloned)
    const center = new THREE.Vector3()
    const sizeV  = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(sizeV)
    cloned.position.sub(center)
    const maxDim = Math.max(sizeV.x, sizeV.y, sizeV.z)
    if (maxDim > 0) cloned.scale.setScalar(targetSize / maxDim)
    return cloned
  }, [scene, targetSize])

  // Balanceo suave alrededor de la orientación base — NUNCA gira 360°
  // (evita mostrar la base/interior del modelo)
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = baseRotateY + Math.sin(state.clock.elapsedTime * 0.5) * sway
  })

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  )
}

// Fallback visible mientras carga el GLB (en vez de pantalla negra)
function LoadingFallback() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 1.5
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.6, 0.18, 16, 48]} />
      <meshBasicMaterial color="#ff8800" wireframe />
    </mesh>
  )
}

export default function GLBScene({
  path, className = '',
  targetSize = 2.5,
  baseRotateY = 0,
  sway = 0.18,
  cameraZ = 4,
  fov = 50,
  shadows = false,
  env = 'warehouse',
  exposure = 1.5,
  ambientIntensity = 0.7,
}) {
  return (
    <div className={`relative ${className}`}>
      <Canvas shadows={shadows}
        camera={{ position:[0, targetSize * 0.25, cameraZ], fov }}
        className="!w-full !h-full"
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias:true, powerPreference:'high-performance', toneMapping:THREE.ACESFilmicToneMapping, toneMappingExposure:exposure }}>

        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[4,8,5]} intensity={3} castShadow={shadows}
          shadow-mapSize={[1024,1024]} color="#fff5e0" />
        <pointLight position={[-3,3,4]} intensity={1.5} color="#ff8800" />
        <pointLight position={[3,-2,3]} intensity={0.8} color="#ffcc44" />
        <Environment preset={env} />

        <Suspense fallback={<LoadingFallback />}>
          <Float speed={1.4} floatIntensity={0.16} rotationIntensity={0}>
            <Model path={path} targetSize={targetSize} baseRotateY={baseRotateY} sway={sway} />
          </Float>
        </Suspense>

        {shadows && (
          <ContactShadows position={[0, -targetSize*0.75, 0]} opacity={0.5}
            scale={targetSize*3} blur={2} far={targetSize*2} />
        )}
      </Canvas>
    </div>
  )
}
