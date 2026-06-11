import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene from './components/HeroScene'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Marquee from './components/Marquee'

gsap.registerPlugin(ScrollTrigger)

function Navbar() {
  return (
    <nav id="navbar"
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4
                 bg-[#0d0400]/80 backdrop-blur-md border-b border-amber-900/20 opacity-0 -translate-y-full">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-amber-400 font-bold text-lg tracking-[.2em]">BURGER HOUSE</span>
        <div className="flex gap-8 text-sm text-amber-200/70">
          {[['#about','Historia'],['#menu','Carta'],['#contact','Reservas']].map(([href,label]) => (
            <a key={href} href={href} className="hover:text-amber-400 transition-colors">{label}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  const heroRef  = useRef()
  const textRef  = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger:'#about', start:'top 80%',
        onEnter:     () => gsap.to('#navbar', { opacity:1, y:0, duration:0.6 }),
        onLeaveBack: () => gsap.to('#navbar', { opacity:0, y:'-100%', duration:0.4 }),
      })

      // Hero — entrada escalonada sin split (evita bugs)
      gsap.timeline({ delay:0.4 })
        .from('.hero-tag',   { y:30, opacity:0, duration:0.6, ease:'power3.out' })
        .from('.hero-h1',    { y:60, opacity:0, duration:1.0, ease:'power3.out' }, '-=0.3')
        .from('.hero-sub',   { y:25, opacity:0, duration:0.7, ease:'power2.out' }, '-=0.4')
        .from('.hero-cta',   { y:20, opacity:0, duration:0.5, stagger:0.15 }, '-=0.3')

      // Ken Burns — zoom lento continuo en la foto del hero
      gsap.fromTo('.hero-bg', { scale:1.0 },
        { scale:1.12, duration:18, ease:'none', yoyo:true, repeat:-1 })

      // Parallax texto
      const onMouse = e => {
        const cx = window.innerWidth/2, cy = window.innerHeight/2
        gsap.to(textRef.current, { x:(e.clientX-cx)/cx*20, y:(e.clientY-cy)/cy*12, duration:1.2, ease:'power1.out' })
      }
      window.addEventListener('mousemove', onMouse)

      // Hero scroll out
      gsap.to(heroRef.current, {
        opacity:0, scale:0.9,
        scrollTrigger:{ trigger:'#about', start:'top bottom', end:'top 30%', scrub:1.5 },
      })

      // Secciones (la animación de .about-glb vive en About.jsx — no duplicar aquí)
      gsap.from('#menu .project-card', {
        y:80, opacity:0, duration:1, stagger:0.18, ease:'back.out(1.2)',
        scrollTrigger:{ trigger:'#menu .project-card', start:'top 82%' },
      })
      gsap.from('.contact-img', {
        x:-80, opacity:0, duration:1.2, ease:'power3.out',
        scrollTrigger:{ trigger:'#contact', start:'top 70%' },
      })
      gsap.from('.contact-content', {
        x:80, opacity:0, duration:1.2, ease:'power3.out',
        scrollTrigger:{ trigger:'#contact', start:'top 70%' },
      })

      return () => window.removeEventListener('mousemove', onMouse)
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
          <HeroScene />

          {/* Texto — encima del canvas */}
          <div ref={textRef} className="relative z-10 px-8 md:px-16 max-w-2xl">
            <p className="hero-tag text-amber-400 text-sm font-mono mb-5 tracking-[.3em] uppercase">
              Artesanal · Desde 1987
            </p>
            <h1 className="hero-h1 leading-none mb-6 text-white">
              <span className="block text-6xl md:text-8xl font-bold">El sabor</span>
              <span className="block text-6xl md:text-8xl font-bold text-transparent
                               bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">
                que recuerdas
              </span>
            </h1>
            <p className="hero-sub text-white/70 text-xl mb-10 leading-relaxed max-w-md">
              Ingredientes frescos, recetas propias y el fuego justo.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#menu"
                className="hero-cta px-8 py-4 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold
                           text-white shadow-xl shadow-amber-900/50 hover:-translate-y-1.5 transition-all">
                Ver carta
              </a>
              <a href="#contact"
                className="hero-cta px-8 py-4 border-2 border-white/25 hover:border-amber-400
                           rounded-xl text-white backdrop-blur-sm bg-white/5 hover:-translate-y-1.5 transition-all">
                Reservar mesa
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 z-10">
            <span className="text-xs font-mono tracking-widest">SCROLL</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent animate-pulse"/>
          </div>
        </section>

        <div className="marquee-wrap"><Marquee /></div>
        <About />
        <div className="marquee-wrap"><Marquee reverse /></div>
        <Projects />
        <div className="marquee-wrap"><Marquee /></div>
        <Contact />
      </main>
    </>
  )
}
