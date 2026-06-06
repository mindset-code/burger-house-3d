# Modelos 3D

## Modelos incluidos

Solo se incluyen los modelos realmente usados (el repo se mantiene ligero, ~17 MB):

| Archivo | Uso | Tamaño |
|---|---|---|
| `hamburger__food_big-hamburger.glb` | La Picante + About | 6.3 MB |
| `hamburger__game_asset.glb` | La Veggie | 3.4 MB |
| `tripo-hamburgers_generated_by_ai.glb` | La Clásica | 7.1 MB |

Todos en formato **GLB** (glTF binario, con texturas embebidas), descargados de [Sketchfab](https://sketchfab.com) bajo licencias Creative Commons.

## Cómo conseguir más modelos

1. Cuenta gratuita en Sketchfab.
2. Buscar el modelo → filtrar por **Downloadable** + **Free**.
3. Descargar en formato **GLB**.
4. Copiar a `public/`.
5. Referenciar la ruta en el componente (`/mi-modelo.glb`).

Otras fuentes: [poly.pizza](https://poly.pizza), [Fab](https://fab.com), [Khronos glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Assets).

## Por qué clonar la escena

`useGLTF` **cachea y devuelve una única instancia** del modelo. Un objeto 3D de Three.js solo puede montarse en un punto del grafo de escena.

❌ **Sin clonar:** si dos tarjetas usan el mismo `.glb`, comparten el objeto → una queda **vacía** y los cálculos de escala se pisan.

✅ **Con clonar:**

```js
const { scene } = useGLTF(path)
const model = useMemo(() => scene.clone(true), [scene])
```

Cada instancia tiene su propia copia → se puede reutilizar el mismo modelo sin conflictos.

## Por qué normalizar el tamaño

Cada modelo viene en una escala distinta y a veces incluye geometría extra (un plato, papas, una base). Para que todas las hamburguesas se vean **del mismo tamaño**:

```js
const box = new THREE.Box3().setFromObject(cloned)
box.getCenter(center); box.getSize(sizeV)
cloned.position.sub(center)                  // centrar
const maxDim = Math.max(sizeV.x, sizeV.y, sizeV.z)
cloned.scale.setScalar(targetSize / maxDim)  // normalizar
```

⚠️ **Cuidado:** modelos con plato/papas/bandeja hacen que la hamburguesa se vea pequeña, porque la normalización mide el conjunto completo. Usar modelos de **solo hamburguesa**.
