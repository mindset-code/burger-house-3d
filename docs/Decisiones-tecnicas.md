# Decisiones técnicas

Registro de los problemas reales encontrados durante el desarrollo y cómo se resolvieron. Sirve como referencia para futuros proyectos 3D web.

## 1. Las primitivas 3D parecían "de juguete"

**Problema:** construir la hamburguesa con geometrías de Three.js (cilindros, esferas) nunca se veía realista, por más texturas procedurales que se añadieran.

**Solución:** usar **modelos GLB reales** de Sketchfab con texturas PBR. La diferencia visual es enorme. Lección: para fotorrealismo, modelo real > geometría procedural.

## 2. Foto plana vs profundidad 3D

**Intento intermedio:** convertir una foto en 3D con un *depth map* sintético (desplazamiento de vértices + alpha mask). Funcionó pero seguía pareciendo "una foto que se mueve".

**Solución final:** modelo GLB real con rotación controlada. El depth map quedó descartado para el producto final.

## 3. `useGLTF` comparte una sola instancia (bug crítico)

**Síntoma:** una tarjeta de la carta salía **vacía** y otra con el modelo **diminuto**, usando el mismo `.glb`.

**Causa:** `useGLTF` cachea y devuelve **el mismo objeto**. Un objeto 3D solo puede montarse una vez, y los dos `useEffect` de escala se pisaban.

**Solución:** clonar la escena por instancia → `scene.clone(true)` en un `useMemo`. Ver [Modelos 3D](Modelos-3D).

## 4. Hamburguesas de distinto tamaño

**Síntoma:** unas se veían grandes, otras pequeñas.

**Causa:** cada modelo viene a distinta escala; algunos incluyen plato/papas que inflan el bounding box.

**Solución:** normalizar con `Box3` a un `targetSize` común + usar modelos de solo hamburguesa.

## 5. Modelos mostrando su base/interior

**Síntoma:** una hamburguesa giraba y enseñaba su corte/parte de abajo.

**Causa:** rotación continua de 360°.

**Solución:** balanceo suave (`sin(t)·sway`) alrededor de la vista frontal, nunca giro completo.

## 6. El navegador traducía mal el texto

**Síntoma:** "Hechas con obsesión" aparecía como "Hechas estafa obsesión".

**Causa:** `index.html` tenía `lang="en"`; el navegador detectaba español, lo "traducía" y lo corrompía.

**Solución:** `<html lang="es" translate="no">` + `<meta name="google" content="notranslate">`.

## 7. Animaciones GSAP duplicadas

**Síntoma:** el modelo de About no aparecía (opacity 0 permanente).

**Causa:** `gsap.from({opacity:0})` sobre el mismo elemento en dos archivos.

**Solución:** animar cada elemento en un único lugar.

## 8. Verificación visual sin navegador automatizado

Durante el desarrollo no había acceso a un navegador automatizado para inspeccionar el render. La estrategia fue: aplicar **solo cambios robustos por construcción** (correcciones de bugs confirmados en código), desplegar, y pedir **una** captura al usuario antes de ajustar encuadres que requieren verla. Evita iterar a ciegas.
