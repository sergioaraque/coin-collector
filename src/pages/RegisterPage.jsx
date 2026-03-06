import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import { useTranslation } from 'react-i18next'
import { notifyDiscord } from '../lib/discord'

export default function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim()) { setError('El nombre de usuario es obligatorio'); return }
    if (username.length < 3) { setError('El nombre debe tener al menos 3 caracteres'); return }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) { setError('Solo letras, números y guión bajo'); return }
    if (password !== confirm) { setError(t('passwordsNoMatch')); return }
    if (password.length < 6) { setError(t('minChars')); return }

    setLoading(true)

    // Verificamos que el username no esté en uso
    const { data: existing } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username.trim())
      .maybeSingle()

    if (existing) {
      setError('Ese nombre de usuario ya está en uso')
      setLoading(false)
      return
    }

    const { data, error: signUpError } = await signUp(email, password)
    if (signUpError) {
      if (signUpError.message.toLowerCase().includes('rate limit') || 
          signUpError.message.toLowerCase().includes('email rate limit')) {
        setError('Actualmente estamos recibiendo más solicitudes. Por favor, inténtalo de nuevo en unos minutos. ¡Gracias por tu paciencia!')
        await notifyDiscord(
          `⚠️ **Rate limit en registro** — \`${email}\`\n` +
          `📅 ${new Date().toLocaleString('es')}\n` +
          `💬 El usuario ha visto el mensaje de "intentarlo en unos minutos"`
        )
      } else {
        setError(signUpError.message)
      }
      setLoading(false)
      return
    }

    // Creamos el perfil con el username
    if (data?.user) {
      await supabase.from('profiles').insert({
        user_id: data.user.id,
        username: username.trim()
      })
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <span className="text-5xl">✅</span>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-4">¡Cuenta creada!</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Revisa tu email para confirmar la cuenta.
        </p>
        <Link to="/login" className="mt-6 inline-block bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
          {t('login')}
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl">🪙</span>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-3">
            {t('register')}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ej: coleccionista42"
            />
            <p className="text-xs text-gray-400 mt-1">Solo letras, números y guión bajo. Visible en el ranking.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('confirmPassword')}
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Repite la contraseña"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {loading ? '...' : t('register')}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          <Link to="/landing" className="hover:underline">{t('back')}</Link>
        </p>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          {t('haveAccount')}{' '}
          <Link to="/login" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  )
}