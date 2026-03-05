import { useState } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'
import { useCollection } from '../context/CollectionContext'
import { ALL_COINS } from '../data/coins'
import { showToast } from '../components/Toast'

export default function ProfilePage() {
  const { user } = useAuth()
  const { owned } = useCollection()

  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)

  const totalCoins = ALL_COINS.length
  const ownedCount = owned.size
  const pct = Math.round((ownedCount / totalCoins) * 100)

  // Países completados al 100%
  const completedCountries = [...new Set(ALL_COINS.map(c => c.country))].filter(country => {
    const coins = ALL_COINS.filter(c => c.country === country)
    return coins.every(c => owned.has(c.id))
  })

  const handleEmailChange = async () => {
    if (!newEmail) return
    setLoadingEmail(true)
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    if (error) showToast(error.message, 'error')
    else {
      showToast('Revisa tu nuevo email para confirmar el cambio', 'info')
      setNewEmail('')
    }
    setLoadingEmail(false)
  }

  const handlePasswordChange = async () => {
    if (!newPassword) return
    if (newPassword !== confirmPassword) {
      showToast('Las contraseñas no coinciden', 'error')
      return
    }
    if (newPassword.length < 6) {
      showToast('Mínimo 6 caracteres', 'error')
      return
    }
    setLoadingPassword(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) showToast(error.message, 'error')
    else {
      showToast('Contraseña actualizada correctamente', 'success')
      setNewPassword('')
      setConfirmPassword('')
    }
    setLoadingPassword(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">👤 Mi perfil</h1>

      {/* Resumen colección */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Resumen de tu colección
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{ownedCount}</p>
            <p className="text-xs text-gray-500 mt-1">Monedas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{pct}%</p>
            <p className="text-xs text-gray-500 mt-1">Completado</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-500">{completedCountries.length}</p>
            <p className="text-xs text-gray-500 mt-1">Países 100%</p>
          </div>
        </div>

        {/* Barra progreso */}
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-green-500 h-3 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Países completados */}
        {completedCountries.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Países completados:</p>
            <div className="flex flex-wrap gap-2">
              {completedCountries.map(c => (
                <span key={c} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-medium">
                  ✓ {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cambiar email */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">Cambiar email</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Email actual: <span className="font-medium text-gray-700 dark:text-gray-200">{user?.email}</span>
        </p>
        <div className="flex gap-3">
          <input
            type="email"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            placeholder="nuevo@email.com"
            className="flex-1 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleEmailChange}
            disabled={loadingEmail || !newEmail}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
          >
            {loadingEmail ? 'Guardando...' : 'Cambiar'}
          </button>
        </div>
      </div>

      {/* Cambiar contraseña */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">Cambiar contraseña</h2>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="Nueva contraseña (mínimo 6 caracteres)"
          className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirmar nueva contraseña"
          className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handlePasswordChange}
          disabled={loadingPassword || !newPassword || !confirmPassword}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          {loadingPassword ? 'Guardando...' : 'Actualizar contraseña'}
        </button>
      </div>
    </div>
  )
}