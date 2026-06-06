# Arquitectura

## Árbol de componentes

```
App.jsx                      ← layout + Navbar + animaciones GSAP globales
├── HeroScene.jsx            ← hero (foto + gradientes, sin 3D)
├── Marquee.jsx              ← banda de texto en bucle (×3, alterna dirección)
├── About.jsx                ← historia + GLBScene + contadores animados
│   └── GLBScene.jsx
├── Projects.jsx             ← carta; 3 tarjetas con GLBScene + 3 extras
│   └── GLBScene.jsx (×3)
└── Contact.jsx              ← contacto + foto con tilt 3D
```

## GLBScene — el componente clave

`GLBScene.jsx` es el loader 3D reutilizable. Encapsula toda la complejidad de Three.js:

- Crea un `<Canvas>` de react-three-fiber.
- Carga el modelo con `useGLTF(path)`.
- **Clona** la escena (`scene.clone(true)`) — imprescindible para reutilizar el mismo modelo.
- **Normaliza** el tamaño con `THREE.Box3` para que todos los modelos se vean igual.
- Aplica iluminación cálida (direccional + 2 point lights naranjas) y un `Environment` HDRI.
- Balanceo suave del modelo (no giro completo).
- Fallback visible mientras carga (anillo wireframe naranja).

### Props principales

| Prop | Default | Descripción |
|---|---|---|
| `path` | — | ruta al `.glb` en `/public` |
| `targetSize` | `2.5` | tamaño normalizado del modelo |
| `cameraZ` | `4` | distancia de cámara |
| `fov` | `50` | campo de visión |
| `baseRotateY` | `0` | orientación frontal base |
| `sway` | `0.18` | amplitud del balanceo |
| `env` | `warehouse` | preset de iluminación HDRI |
| `exposure` | `1.5` | exposición del tone mapping |

## Flujo de renderizado 3D

```
useGLTF(path)  →  scene (instancia cacheada compartida)
        │
        ▼
scene.clone(true)  →  copia independiente por tarjeta
        │
        ▼
Box3.setFromObject  →  centra + calcula maxDim
        │
        ▼
scale = targetSize / maxDim  →  tamaño visual uniforme
        │
        ▼
<primitive object={clon}>  →  montado en su propio Canvas
```

## WebGL: múltiples canvas

El sitio usa varios `<Canvas>` independientes (About + 3 tarjetas de la carta). Está dentro del límite de contextos WebGL del navegador (~16). El hero **no** usa canvas (es una foto), lo que reduce la carga.
