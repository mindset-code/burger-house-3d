# Guía de desarrollo

## Requisitos

- Node.js 18+
- npm
- (Opcional) Firebase CLI para desplegar

## Arranque local

```bash
git clone https://github.com/mindset-code/burger-house-3d.git
cd burger-house-3d
npm install
npm run dev          # http://localhost:5173
```

## Tareas comunes

### Añadir un plato a la carta

1. Descargar un `.glb` de solo hamburguesa y copiarlo a `public/`.
2. En `src/components/Projects.jsx`, añadir un objeto al array `menu`:

```js
{ title:'La Nueva', tag:'Novedad', price:'14,90€',
  desc:'Descripción del plato.',
  model:'/mi-nuevo-modelo.glb', color:'#ff8800', baseRotateY:0 }
```

3. Si el modelo aparece mal orientado, ajustar `baseRotateY` (en radianes).

### Cambiar el modelo de una sección

Editar la prop `path` / `model` del componente correspondiente:
- Hero → es una foto (`HeroScene.jsx`), no un modelo.
- About → `src/components/About.jsx`, prop `path` de `<GLBScene>`.
- Carta → `src/components/Projects.jsx`, campo `model` del array.

### Ajustar tamaño o encuadre de un modelo

En el `<GLBScene>` correspondiente:
- `targetSize` → tamaño del modelo (mayor = más grande).
- `cameraZ` → distancia de cámara (menor = más cerca).
- `fov` → campo de visión.

### Cambiar textos

Los textos están en los componentes (`HeroScene.jsx`, `About.jsx`, `Projects.jsx`, `Contact.jsx`). Recordar que el HTML está en `lang="es"` para que el navegador no traduzca.

## Build y deploy

```bash
npm run build        # genera dist/
firebase deploy --only hosting   # el proyecto se elige una vez con `firebase use --add`
```

`firebase.json` está configurado con `"public": "dist"` y SPA rewrite a `/index.html`.

## Buenas prácticas del proyecto

- **Un modelo = un clon.** Nunca montar el mismo objeto `useGLTF` dos veces sin clonar.
- **Animar cada elemento en un solo sitio** (evita el bug de opacity 0).
- **Modelos de solo hamburguesa** (sin plato/papas) para tamaño consistente.
- **Mantener el repo ligero:** borrar del `public/` los `.glb` que no se usen.
- **Modelos < 100 MB** (límite de GitHub). Idealmente < 10 MB cada uno por rendimiento web.
