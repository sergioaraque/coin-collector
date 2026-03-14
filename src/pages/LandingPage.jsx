import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { supabase } from '../supabase'
import { useCoins } from '../hooks/useCoins'
import { usePWAInstall } from '../hooks/usePWAInstall'
import { useSEO } from '../hooks/useSEO'

const GEO_URL = 'https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson'

const EUROZONE = [
  'Germany','Austria','Belgium','Cyprus','Slovakia','Slovenia','Spain',
  'Estonia','Finland','France','Greece','Ireland','Italy','Latvia',
  'Lithuania','Luxembourg','Malta','Monaco','Netherlands','Portugal',
  'San Marino','Vatican','Andorra','Croatia'
]

// Hook para scroll reveal
function useScrollReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

// Contador animado
function AnimatedCounter({ target, duration = 1500, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, visible] = useScrollReveal()
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [visible, target, duration])
  return <span ref={ref}>{count.toLocaleString('es')}{suffix}</span>
}

// Sección con reveal
function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

const FEATURES = [
  {
    icon: '🗺️',
    title: 'Mapa interactivo',
    desc: 'Visualiza tu progreso en un mapa de Europa coloreado según las monedas que tienes de cada país. Un vistazo y sabes exactamente dónde estás.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: '📋',
    title: 'Catálogo completo',
    desc: 'Más de 290 monedas conmemorativas de 2€ con imágenes, acuñación, valor estimado y descripción de cada emisión.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: '📊',
    title: 'Estadísticas detalladas',
    desc: 'Valor estimado de tu colección, monedas más raras, progreso por país y año. Conoce tu colección como nunca antes.',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: '🏆',
    title: 'Insignias y logros',
    desc: 'Desbloquea insignias al alcanzar hitos. Primera moneda, países completos, monedas raras... ¿cuántas puedes conseguir?',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: '🏅',
    title: 'Ranking de coleccionistas',
    desc: 'Compite con otros coleccionistas de toda Europa. Sube posiciones completando tu colección y hazte con el oro.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: '📱',
    title: 'App instalable',
    desc: 'Instálala en tu móvil y lleva tu colección siempre contigo. Funciona sin conexión y con notificaciones.',
    color: 'from-cyan-500 to-cyan-600',
  },
]

const TESTIMONIALS = [
  { text: 'Por fin una app que hace lo que necesito. El mapa es una pasada.', author: 'carlos_numismatico', coins: 187 },
  { text: 'Llevo años coleccionando y nunca había podido ver mi progreso tan claro.', author: 'euro_hunter', coins: 143 },
  { text: 'Las insignias me tienen enganchada. Ya he completado España y Portugal.', author: 'maria_coins', coins: 98 },
]

export default function LandingPage() {
  const [globalStats, setGlobalStats] = useState({ users: 0, collections: 0 })
  const { canInstall, install } = usePWAInstall()
  const { ALL_COINS, COUNTRIES, loading } = useCoins()
  const [floatingCoins] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
      size: 16 + Math.random() * 24,
    }))
  )
  useSEO({ title: 'EuroCollector - Tu colección de monedas de 2€ en un solo lugar', description: 'Gestiona tu colección de monedas conmemorativas de 2€, descubre las más raras y compite con coleccionistas de toda Europa.' })

  useEffect(() => {
    supabase.rpc('get_global_stats').then(({ data }) => {
      if (data) setGlobalStats({
        users: data.total_users || 0,
        collections: data.total_collections || 0
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.3; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #fbbf24 40%, #fff 60%, #fbbf24 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .hero-animate { animation: slide-up 0.8s ease forwards; }
        .hero-animate-2 { animation: slide-up 0.8s ease 0.2s both; }
        .hero-animate-3 { animation: slide-up 0.8s ease 0.4s both; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(30,64,175,0.15); }
      `}</style>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-base">🪙</span>
            </div>
            <span className="font-bold text-blue-900 text-lg" style={{ fontFamily: "'DM Serif Display', serif" }}>
              EuroCollector
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {[['#features', 'Funciones'], ['#stats', 'Estadísticas'], ['#testimonials', 'Comunidad']].map(([href, label]) => (
              <a key={href} href={href} className="text-sm text-gray-500 hover:text-blue-800 transition font-medium">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-blue-800 font-medium hover:text-blue-600 transition">
              Entrar
            </Link>
            <Link
              to="/register"
              className="bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-lg shadow-blue-200"
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center overflow-hidden pt-16">

        {/* Monedas flotantes de fondo */}
        {floatingCoins.map(coin => (
          <div
            key={coin.id}
            className="absolute pointer-events-none select-none"
            style={{
              left: coin.left,
              top: `${10 + Math.random() * 80}%`,
              fontSize: `${coin.size}px`,
              animation: `float ${coin.duration}s ease-in-out ${coin.delay}s infinite`,
            }}
          >
            🪙
          </div>
        ))}

        {/* Círculos decorativos */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Texto */}
          <div>
            <div className="hero-animate inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Gratis · Sin publicidad · Para siempre
            </div>

            <h1 className="hero-animate-2 text-5xl md:text-6xl font-black text-white leading-tight mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Tu colección de{' '}
              <span className="shimmer-text">monedas de 2€</span>
              {' '}en un solo lugar
            </h1>

            <p className="hero-animate-3 text-blue-100 text-lg mb-8 leading-relaxed max-w-lg">
              Gestiona tus monedas conmemorativas, descubre las más raras de la eurozona
              y compite con coleccionistas de toda Europa.
            </p>

            <div className="hero-animate-3 flex flex-col sm:flex-row gap-3">
              <Link
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-2xl text-lg transition shadow-2xl shadow-yellow-400/30 text-center"
              >
                Crear cuenta gratis →
              </Link>
              <Link
                to="/catalogo"
                className="border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition text-center backdrop-blur"
              >
                Ver catálogo
              </Link>
            </div>

            {/* Mini stats */}
            <div className="hero-animate-3 flex gap-8 mt-10">
              {[
                { value: '290+', label: 'Monedas' },
                { value: '24', label: 'Países' },
                { value: '2004', label: 'Desde' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-blue-300 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur rounded-3xl p-5 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white font-semibold text-sm">🗺️ Mapa de la eurozona</p>
              </div>
              <ComposableMap
                projection="geoAzimuthalEqualArea"
                projectionConfig={{ rotate: [-10, -52, 0], scale: 700 }}
                width={800} height={500}
                style={{ width: '100%', height: 'auto' }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const name = geo.properties.NAME || geo.properties.name
                      const isEurozone = EUROZONE.includes(name)
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isEurozone ? '#FBBF24' : '#1e3a8a'}
                          stroke="#1e40af"
                          strokeWidth={0.5}
                          style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
                        />
                      )
                    })
                  }
                </Geographies>
              </ComposableMap>
              <Link
                to="/mapa-global"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl border border-white/20 transition mt-3"
              >
                🌍 Ver mapa de calor de la comunidad →
              </Link>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-yellow-400" />
                    <span className="text-xs text-blue-200">Eurozona</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-blue-900" />
                    <span className="text-xs text-blue-200">Otros</span>
                  </div>
                </div>
                <p className="text-xs text-blue-200">{ALL_COINS.length} monedas en catálogo</p>
              </div>
            </div>

            {/* Badge flotante */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-blue-900 rounded-2xl px-4 py-2 shadow-xl font-bold text-sm rotate-3">
              ¡Gratis! 🎉
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-2 shadow-xl text-sm font-semibold text-blue-900 -rotate-2">
              📱 Instálala en móvil
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 20C1200 80 960 0 720 20C480 40 240 0 0 20L0 80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* STATS EN TIEMPO REAL */}
      <section id="stats" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <RevealSection className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: ALL_COINS.length, label: 'Monedas en catálogo', suffix: '+', icon: '🪙' },
              { value: 24, label: 'Países de la eurozona', suffix: '', icon: '🌍' },
              { value: globalStats.users, label: 'Coleccionistas', suffix: '', icon: '👥' },
              { value: globalStats.collections, label: 'Monedas registradas', suffix: '', icon: '📦' },
            ].map(({ value, label, suffix, icon }) => (
              <div key={label} className="group">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-4xl font-black text-blue-900">
                  <AnimatedCounter target={value} suffix={suffix} />
                </p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mx-8" />

      {/* FEATURES */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <RevealSection className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Funcionalidades
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Todo lo que necesitas
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Diseñado específicamente para coleccionistas de monedas de 2€ conmemorativas
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <RevealSection key={feature.title} delay={i * 80}>
                <div className="card-hover bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4">
          <RevealSection className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Así de fácil
            </p>
            <h2 className="text-4xl font-black text-blue-900" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Empieza en 3 pasos
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '✍️', title: 'Regístrate gratis', desc: 'Crea tu cuenta en menos de 30 segundos. Sin tarjeta, sin compromisos.' },
              { step: '02', icon: '✅', title: 'Marca tus monedas', desc: 'Navega el catálogo y marca cada moneda que tienes. El mapa se actualiza al instante.' },
              { step: '03', icon: '🏆', title: 'Compite y colecciona', desc: 'Sube en el ranking, desbloquea insignias y completa tu colección.' },
            ].map((item, i) => (
              <RevealSection key={item.step} delay={i * 150}>
                <div className="relative text-center">
                  <div className="text-7xl font-black text-blue-100 absolute -top-4 left-1/2 -translate-x-1/2 select-none" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {item.step}
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl mx-auto mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <RevealSection className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Comunidad
            </p>
            <h2 className="text-4xl font-black text-blue-900" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Lo que dicen los coleccionistas
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <RevealSection key={t.author} delay={i * 100}>
                <div className="card-hover bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-blue-900 text-sm">@{t.author}</p>
                      <p className="text-xs text-gray-400">{t.coins} monedas</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {t.author[0].toUpperCase()}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {floatingCoins.map(coin => (
            <div key={coin.id} className="absolute text-4xl"
              style={{ left: coin.left, top: `${Math.random() * 100}%`, animation: `float ${coin.duration}s ease-in-out ${coin.delay}s infinite` }}>
              🪙
            </div>
          ))}
        </div>
        <RevealSection className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <span className="text-6xl block mb-6">🪙</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
            ¿Listo para empezar?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Únete a la comunidad de coleccionistas. Gratis, siempre.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-10 py-4 rounded-2xl text-lg transition shadow-2xl shadow-yellow-400/20"
            >
              Crear cuenta gratis →
            </Link>
            <Link
              to="/catalogo"
              className="border border-white/30 hover:bg-white/10 text-white font-semibold px-10 py-4 rounded-2xl text-lg transition"
            >
              Ver el catálogo
            </Link>
          </div>
          <p className="text-blue-300 text-sm mt-6">
            Sin tarjeta · Sin publicidad · Sin límites
          </p>

          {/* Banner PWA */}
          {canInstall && (
            <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-5 py-3">
              <span className="text-2xl">📱</span>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">¿Usas el móvil?</p>
                <p className="text-blue-300 text-xs">Instala la app para acceso rápido</p>
              </div>
              <button
                onClick={install}
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-sm px-4 py-2 rounded-xl transition ml-2"
              >
                Instalar
              </button>
            </div>
          )}
        </RevealSection>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-blue-300 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪙</span>
            <span className="font-bold text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>EuroCollector</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/catalogo" className="hover:text-white transition">Catálogo</Link>
            <Link to="/estadisticas-publicas" className="hover:text-white transition">Estadísticas</Link>
            <Link to="/terminos" className="hover:text-white transition">Términos y condiciones</Link>
            <Link to="/ranking-publico" className="hover:text-white transition">Ranking</Link>
          </div>
          <p className="text-xs text-blue-400">Hecho con ❤️ para coleccionistas</p>
        </div>
      </footer>
    </div>
  )
}