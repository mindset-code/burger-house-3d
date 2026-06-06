# Burger House — Wiki

Bienvenido a la documentación técnica de **Burger House**, un sitio web 3D de demostración para un restaurante de hamburguesas artesanas.

🔗 **Demo en vivo:** https://burger-house-3d.web.app

## Índice

- **[Arquitectura](Arquitectura)** — estructura de componentes y flujo de datos
- **[Modelos 3D](Modelos-3D)** — cómo se cargan, clonan y normalizan los GLB
- **[Animaciones](Animaciones)** — sistema GSAP + ScrollTrigger
- **[Decisiones técnicas](Decisiones-tecnicas)** — bugs encontrados y cómo se resolvieron
- **[Guía de desarrollo](Guia-de-desarrollo)** — cómo añadir un plato, cambiar un modelo o desplegar

## Resumen del proyecto

| | |
|---|---|
| **Tipo** | Landing page de restaurante (demo de portafolio) |
| **Stack** | React 19 · Vite · Three.js (R3F) · GSAP · Tailwind v4 |
| **3D** | Modelos GLB reales de Sketchfab |
| **Hosting** | Firebase Hosting (Spark, gratuito) |
| **Estado** | En producción |

## Secciones del sitio

1. **Hero** — foto a pantalla completa con zoom Ken Burns y texto animado.
2. **Historia (About)** — texto editorial + modelo 3D + contadores animados.
3. **Carta (Menu)** — tarjetas con modelos 3D interactivos de cada hamburguesa.
4. **Contacto** — datos del local + foto con efecto tilt 3D.

Entre secciones hay bandas de texto (marquees) en bucle que refuerzan el tema "fuego / artesanal".
