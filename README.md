# Burger House — Sitio web 3D para restaurante de hamburguesas

> **Web inmersiva 3D** · React + Vite + Three.js (R3F) + GSAP · Modelos 3D reales con interacción en tiempo real
> **Status:** Deployed to production · 2026-06

[![Live Demo](https://img.shields.io/badge/Live-portfolio--3d--operador.web.app-f59e0b?style=for-the-badge&logo=firebase&logoColor=white)](https://burger-house-3d.web.app)
[![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Three.js-61dafb?style=for-the-badge&logo=react&logoColor=black)](.)
[![Animation](https://img.shields.io/badge/Animation-GSAP%20ScrollTrigger-88ce02?style=for-the-badge&logo=greensock&logoColor=white)](.)

---

## Project Status

| Phase | Status |
|---|---|
| Diseño y maquetación (Tailwind, tema cálido) | Done |
| Integración de modelos 3D (GLB) con React Three Fiber | Done |
| Animaciones de scroll y microinteracciones (GSAP) | Done |
| Deploy a producción (Firebase Hosting) | Done |

**Current phase:** En producción — sitio completo con hero, historia, carta 3D y contacto.

---

## Project Overview

**Burger House** es una landing page de demostración para un restaurante de hamburguesas artesanas, construida como pieza de portafolio para mostrar **diseño web 3D moderno**.

El reto técnico central: integrar modelos 3D reales (`.glb` de Sketchfab) en una web rápida y visualmente coherente, con animaciones de scroll de nivel agencia, sin recurrir a plantillas genéricas.

Cada hamburguesa de la carta es un **modelo 3D real** que rota suavemente en su tarjeta, normalizado para que todas se vean del mismo tamaño independientemente de su geometría original.

---

## Key Features

- **Modelos 3D reales (GLB):** carga con `useGLTF`, clonado por instancia y autoescalado vía `THREE.Box3` para tamaño visual consistente.
- **Hero cinematográfico:** foto a pantalla completa con zoom Ken Burns + texto con entrada escalonada.
- **Carta 3D interactiva:** cada plato es un modelo que flota y se balancea (vista frontal fija, sin giros que muestren la base).
- **Animaciones GSAP ScrollTrigger:** revelados al hacer scroll, contadores animados, tilt 3D en tarjetas, marquees de texto.
- **Tema visual propio:** paleta cálida (ámbar/naranja/rojo brasa) sobre fondo oscuro, tipografía serif editorial.
- **Optimización:** solo se incluyen los modelos GLB realmente usados; fallback visible mientras cargan.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| 3D | Three.js · @react-three/fiber · @react-three/drei |
| Animación | GSAP + ScrollTrigger |
| Estilos | Tailwind CSS v4 |
| Modelos 3D | Sketchfab (formato GLB, licencias CC) |
| Deployment | Firebase Hosting (plan Spark) |

---

## Repository Structure

```
burger-house-3d/
├── public/
│   ├── hamburger__food_big-hamburger.glb
│   ├── hamburger__game_asset.glb
│   └── tripo-hamburgers_generated_by_ai.glb
├── src/
│   ├── components/
│   │   ├── HeroScene.jsx     # Hero — foto + Ken Burns
│   │   ├── About.jsx         # Historia + modelo 3D + contadores
│   │   ├── Projects.jsx      # Carta — tarjetas con modelos 3D
│   │   ├── Contact.jsx       # Contacto + foto con tilt 3D
│   │   ├── GLBScene.jsx      # Loader 3D reutilizable (clona + autoescala)
│   │   └── Marquee.jsx       # Banda de texto en bucle
│   ├── App.jsx               # Layout + animaciones GSAP globales
│   ├── main.jsx
│   └── index.css
├── firebase.json
├── index.html
└── vite.config.js
```

---

## How to Run

```bash
git clone https://github.com/mindset-code/burger-house-3d.git
cd burger-house-3d
npm install
npm run dev          # http://localhost:5173
```

Build de producción:

```bash
npm run build        # genera dist/
```

---

## Deployment

Desplegado en Firebase Hosting (plan gratuito Spark):

```bash
npm run build
firebase deploy --only hosting
```

`firebase.json` apunta a `dist` con SPA rewrite a `index.html`.

---

## Decisiones técnicas destacadas

- **Clonado de escena GLB:** `useGLTF` cachea una única instancia; reutilizar el mismo modelo en varias tarjetas dejaba una vacía. La solución es `scene.clone(true)` por instancia.
- **Tamaño consistente:** cada modelo se normaliza a un `targetSize` fijo calculando su bounding box, así modelos de distinta geometría se ven del mismo tamaño.
- **Sin giro 360°:** los modelos usan balanceo suave en lugar de rotación completa, evitando mostrar la base o el interior.
- **`lang="es"`** en el HTML para impedir que el traductor del navegador altere los textos.

---

## Links

- **Live demo:** [burger-house-3d.web.app](https://burger-house-3d.web.app)
- **LinkedIn:** [Mindset & Code](https://www.linkedin.com/company/mindset-code)
- **Email:** contacto@mindset-code.com

---

*Built by [Mindset & Code](https://github.com/mindset-code) · Data & BI Analyst · MBA · ISC2 CC*
