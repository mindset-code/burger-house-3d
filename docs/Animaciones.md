# Animaciones

Todo el movimiento usa **GSAP** + el plugin **ScrollTrigger**. Las animaciones globales viven en `App.jsx` dentro de un `gsap.context()`; cada sección añade las suyas en su propio componente.

## Catálogo de animaciones

### Hero
- **Entrada escalonada:** tag → título → subtítulo → botones, con `power3.out`.
- **Ken Burns:** zoom lento e infinito de la foto (`scale 1 → 1.12`, `yoyo`, 18 s).
- **Scroll out:** el hero se desvanece y encoge al hacer scroll hacia About.

### Navbar
- Aparece con slide-down al llegar a la sección About; desaparece al volver arriba.

### About
- **Split text:** el título se divide en palabras que suben desde abajo (efecto cortina).
- **Contadores animados:** los números suben de 0 al valor real al entrar en viewport (una sola vez).
- **Modelo 3D:** entra deslizándose desde la derecha.

### Carta (Menu)
- **Tarjetas:** entran desde abajo con rebote (`back.out`), escalonadas.
- **Tilt 3D al hover:** la tarjeta rota en X/Y siguiendo el cursor (`transformPerspective`), con retorno elástico.
- **Glow de color:** al hover aparece un resplandor del color de cada hamburguesa.

### Contacto
- Foto entra desde la izquierda, texto desde la derecha.
- **Tilt 3D** en la foto siguiendo el ratón.

### Marquees
- Bandas de texto en bucle infinito entre secciones, alternando dirección.

## Patrón clave: evitar tweens duplicados

⚠️ **Bug real encontrado:** tener `gsap.from(..., {opacity:0})` sobre el **mismo elemento** en dos sitios (App.jsx y el componente) deja el elemento **invisible** (opacity 0 permanente), porque los dos `from` se pisan.

✅ **Regla:** cada elemento se anima en **un solo lugar**. Si la animación vive en el componente, no duplicarla en `App.jsx`.

## Patrón clave: balanceo, no giro

Los modelos 3D **no giran 360°** — eso mostraría su base o interior. En su lugar:

```js
group.rotation.y = baseRotateY + Math.sin(t * 0.5) * sway
```

Un balanceo suave (`sway ≈ 0.25 rad`) alrededor de la orientación frontal.
