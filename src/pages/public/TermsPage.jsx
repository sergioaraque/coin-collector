import { Link } from 'react-router-dom'
import { useSEO } from '../../hooks/useSEO'

export default function TermsPage() {
  useSEO({ title: 'Términos y condiciones · EuroCollector' })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

      {/* Header */}
      <header className="bg-blue-800 dark:bg-gray-800 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/landing" className="flex items-center gap-2">
            <span className="text-2xl">🪙</span>
            <span className="font-bold text-lg">EuroCollector</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-blue-200 hover:text-white transition">
              Iniciar sesión
            </Link>
            <Link to="/register" className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold text-sm px-4 py-2 rounded-lg transition">
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Términos y condiciones
          </h1>
          <p className="text-sm text-gray-400 mt-2">Última actualización: marzo 2026</p>
        </div>

        {/* Intro */}
        <Section>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            EuroCollector es un proyecto personal creado por <strong>Sergio</strong> con un único objetivo:
            ofrecer una herramienta gratuita y sin ánimo de lucro para que cualquier persona pueda
            registrar y organizar su colección de monedas conmemorativas de 2€.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Al usar EuroCollector, aceptas estos términos. Si tienes alguna duda, puedes contactar
            a través del muro de la comunidad dentro de la aplicación.
          </p>
        </Section>

        {/* Proyecto gratuito */}
        <Section title="1. Proyecto 100% gratuito">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            EuroCollector es completamente gratuito. No existe ningún plan de pago, suscripción
            ni compra dentro de la aplicación. Todas las funcionalidades están disponibles para
            cualquier usuario registrado sin coste alguno.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            La plataforma no muestra publicidad ni obtiene ingresos de ningún tipo. Los costes
            de infraestructura son asumidos íntegramente por el autor del proyecto.
          </p>
        </Section>

        {/* Uso libre */}
        <Section title="2. Uso libre y sin restricciones">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Cualquier persona puede registrarse y usar EuroCollector libremente para gestionar
            su colección personal de monedas de 2€. No se requiere ningún tipo de afiliación,
            conocimiento previo ni compra para acceder a la plataforma.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            El usuario se compromete a hacer un uso adecuado de la plataforma, respetando
            a otros miembros de la comunidad y evitando publicar contenido inapropiado,
            ofensivo o spam en el muro de mensajes.
          </p>
        </Section>

        {/* Datos personales */}
        <Section title="3. Datos personales y privacidad">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Para crear una cuenta solo se solicita una dirección de correo electrónico y una
            contraseña. EuroCollector no recopila ni comparte datos personales con terceros.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Los datos de tu colección (monedas añadidas, notas, progreso) se almacenan de forma
            segura en servidores de Supabase y son accesibles únicamente por ti, salvo los datos
            que voluntariamente compartes en el ranking público o el muro de la comunidad.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Puedes solicitar la eliminación de tu cuenta y todos tus datos en cualquier momento
            contactando con el administrador desde la sección de comunidad.
          </p>
        </Section>

        {/* Imágenes */}
        <Section title="4. Imágenes de las monedas">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Las imágenes de las monedas utilizadas en EuroCollector han sido obtenidas de
            <strong> Wikimedia Commons</strong> y del <strong> Banco Central Europeo</strong>, repositorio de contenido libre bajo licencias
            Creative Commons. Las imágenes están sujetas a sus respectivas licencias originales,
            que en su mayoría corresponden a <strong>CC BY-SA 3.0</strong> o similares.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            EuroCollector no reclama ningún derecho de propiedad sobre dichas imágenes.
            Si eres autor de alguna imagen y consideras que su uso no es correcto, puedes
            contactar con el administrador para revisarlo.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            Las imágenes se almacenan en nuestro propio servidor de almacenamiento para mejorar
            el rendimiento de la plataforma, respetando siempre las condiciones de las licencias originales.
          </p>
        </Section>

        {/* Disponibilidad */}
        <Section title="5. Disponibilidad del servicio">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            EuroCollector se ofrece "tal cual", sin garantías de disponibilidad continua.
            Al ser un proyecto personal, pueden producirse interrupciones ocasionales por
            mantenimiento o mejoras. El autor hará su mejor esfuerzo para mantener el
            servicio disponible, pero no puede garantizar un uptime del 100%.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
            El autor se reserva el derecho de modificar, pausar o discontinuar el servicio
            en cualquier momento, notificándolo con la mayor antelación posible a través
            del muro de la comunidad.
          </p>
        </Section>

        {/* Cambios */}
        <Section title="6. Cambios en los términos">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Estos términos pueden actualizarse ocasionalmente. Los cambios relevantes se
            comunicarán a través de la plataforma. El uso continuado de EuroCollector
            tras la publicación de cambios implica la aceptación de los nuevos términos.
          </p>
        </Section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-6 text-center text-white">
          <p className="font-bold text-lg mb-1">¿Listo para empezar?</p>
          <p className="text-blue-200 text-sm mb-4">
            Únete a la comunidad de coleccionistas — gratis, siempre
          </p>
          <Link
            to="/register"
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-2.5 rounded-xl transition inline-block"
          >
            Crear cuenta gratis →
          </Link>
        </div>

      </main>

      <footer className="bg-blue-900 dark:bg-gray-900 text-blue-200 text-center py-4 text-xs">
        EuroCollector · Hecho con ❤️ para coleccionistas · Proyecto de Sergio
      </footer>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-1">
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{title}</h2>
      )}
      {children}
    </div>
  )
}