import { Link } from 'react-router-dom'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { ALL_COINS } from '../data/coins'

const GEO_URL = 'https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson'

const EUROZONE_COUNTRIES = [
  'Germany', 'Austria', 'Belgium', 'Cyprus', 'Slovakia', 'Slovenia',
  'Spain', 'Estonia', 'Finland', 'France', 'Greece', 'Ireland',
  'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Monaco',
  'Netherlands', 'Portugal', 'San Marino', 'Vatican', 'Andorra', 'Croatia'
]

const FEATURES = [
  {
    icon: '🗺️',
    title: 'Mapa interactivo',
    desc: 'Visualiza tu progreso en un mapa de Europa coloreado según las monedas que tienes de cada país.'
  },
  {
    icon: '📋',
    title: 'Catálogo completo',
    desc: 'Más de 290 monedas conmemorativas de 2€ de todos los países de la eurozona desde 2004.'
  },
  {
    icon: '📊',
    title: 'Estadísticas detalladas',
    desc: 'Conoce el valor estimado de tu colección, tus monedas más raras y tu progreso por país y año.'
  },
  {
    icon: '🏆',
    title: 'Ranking de coleccionistas',
    desc: 'Compite con otros coleccionistas y escala posiciones completando tu colección.'
  },
  {
    icon: '🔍',
    title: 'Búsqueda instantánea',
    desc: 'Encuentra cualquier moneda por país, año o descripción en segundos.'
  },
  {
    icon: '📱',
    title: 'Disponible en móvil',
    desc: 'Instálala en tu móvil como app y lleva tu colección siempre contigo.'
  },
]

const STATS = [
  { value: '290+', label: 'Monedas en el catálogo' },
  { value: '24',   label: 'Países de la eurozona' },
  { value: '2004', label: 'Desde el año' },
]

export default function LandingPage() {
  const totalCoins = ALL_COINS.length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

      {/* Header */}
      <header className="bg-blue-800 dark:bg-gray-800 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪙</span>
            <span className="font-bold text-lg">EuroCollector</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-blue-200 hover:text-white transition"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold text-sm px-4 py-2 rounded-lg transition"
            >
              Registrarse gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-900 dark:from-gray-800 dark:to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">

          {/* Texto */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-700/50 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
              <span>✨</span> Gratis y sin publicidad
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Tu colección de monedas de{' '}
              <span className="text-yellow-400">2€ conmemorativas</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-lg">
              Gestiona tu colección, descubre las monedas más raras de la eurozona
              y compite con otros coleccionistas de toda Europa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-3 rounded-xl text-lg transition shadow-lg"
              >
                Empezar gratis →
              </Link>
              <Link
                to="/login"
                className="border border-blue-400 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg transition"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>

          {/* Mapa demo */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-blue-700/30 rounded-2xl p-4 backdrop-blur">
              <p className="text-xs text-blue-200 text-center mb-2 uppercase tracking-wide">
                Países de la eurozona
              </p>
              <ComposableMap
                projection="geoAzimuthalEqualArea"
                projectionConfig={{ rotate: [-10, -52, 0], scale: 700 }}
                width={800}
                height={500}
                style={{ width: '100%', height: 'auto' }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const name = geo.properties.NAME || geo.properties.name
                      const isEurozone = EUROZONE_COUNTRIES.includes(name)
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isEurozone ? '#FBBF24' : '#1e3a5f'}
                          stroke="#1e40af"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { outline: 'none' },
                            pressed: { outline: 'none' }
                          }}
                        />
                      )
                    })
                  }
                </Geographies>
              </ComposableMap>
              <p className="text-xs text-blue-200 text-center mt-1">
                {totalCoins} monedas de 24 países
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-3 gap-6 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400">
                {value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Todo lo que necesitas para gestionar tu colección
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition"
            >
              <span className="text-3xl">{icon}</span>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-3 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-900 dark:from-gray-800 dark:to-gray-900 text-white mt-auto">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <span className="text-5xl">🪙</span>
          <h2 className="text-3xl font-extrabold mt-4 mb-3">
            ¿Listo para empezar?
          </h2>
          <p className="text-blue-100 mb-8">
            Únete a la comunidad de coleccionistas. Es gratis y siempre lo será.
          </p>
          <Link
            to="/register"
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-10 py-3 rounded-xl text-lg transition shadow-lg inline-block"
          >
            Crear cuenta gratis →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 dark:bg-gray-900 text-blue-200 text-center py-4 text-xs">
        EuroCollector · Hecho con ❤️ para coleccionistas
      </footer>
    </div>
  )
}