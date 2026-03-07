import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'
import { useCollection } from '../context/CollectionContext'
import { ALL_COINS } from '../data/coins'
import { showToast } from '../components/Toast'
import { useTranslation } from 'react-i18next'
import { useSEO } from '../hooks/useSEO'

export default function ProfilePage() {
  useSEO({ title: 'Mi perfil' })
  const { user } = useAuth()
  const { owned } = useCollection()
  const { t } = useTranslation()

  const [newUsername, setNewUsername] = useState('')
  const [currentUsername, setCurrentUsername] = useState('')
  const [loadingUsername, setLoadingUsername] = useState(false)

  const [newEmail, setNewEmail] = useState('')
  const [loadingEmail, setLoadingEmail] = useState(false)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loadingPassword, setLoadingPassword] = useState(false)

  const totalCoins = ALL_COINS.length
  const ownedCount = owned.size
  const pct = Math.round((ownedCount / totalCoins) * 100)

  const completedCountries = [...new Set(ALL_COINS.map(c => c.country))].filter(country => {
    const coins = ALL_COINS.filter(c => c.country === country)
    return coins.every(c => owned.has(c.id))
  })

  // Carga el username actual
  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('username')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setCurrentUsername(data.username)
      })
  }, [user])

  const handleUsernameChange = async () => {
    if (!newUsername.trim()) return
    if (newUsername.length < 3) { showToast(t('minChars'), 'error'); return }
    if (!/^[a-zA-Z0-9_]+$/.test(newUsername)) {
      showToast('Solo letras, números y guión bajo', 'error'); return
    }

    setLoadingUsername(true)

    const { data: existing } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', newUsername.trim())
      .maybeSingle()

    if (existing) {
      showToast('Ese nombre ya está en uso', 'error')
      setLoadingUsername(false)
      return
    }

    const { error } = await supabase
      .from('profiles')
      .upsert({ user_id: user.id, username: newUsername.trim() })

    if (error) showToast(error.message, 'error')
    else {
      showToast('Nombre de usuario actualizado', 'success')
      setCurrentUsername(newUsername.trim())
      setNewUsername('')
    }
    setLoadingUsername(false)
  }

  const handleEmailChange = async () => {
    if (!newEmail) return
    setLoadingEmail(true)
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    if (error) showToast(error.message, 'error')
    else {
      showToast(t('emailChangeSuccess'), 'info')
      setNewEmail('')
    }
    setLoadingEmail(false)
  }

  const handlePasswordChange = async () => {
    if (!newPassword) return
    if (newPassword !== confirmPassword) {
      showToast(t('passwordsNoMatch'), 'error'); return
    }
    if (newPassword.length < 6) {
      showToast(t('minChars'), 'error'); return
    }
    setLoadingPassword(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) showToast(error.message, 'error')
    else {
      showToast(t('passwordChangeSuccess'), 'success')
      setNewPassword('')
      setConfirmPassword('')
    }
    setLoadingPassword(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('profile')}</h1>

      {/* Resumen colección */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
          {t('collectionSummary')}
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{ownedCount}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('coins')}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{pct}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('completed')}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-500">{completedCountries.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('countriesCompleted')}</p>
          </div>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-green-500 h-3 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>

        {completedCountries.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {t('completedCountries')}
            </p>
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

      {/* Cambiar username */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">Nombre de usuario</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Nombre actual:{' '}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {currentUsername || '—'}
          </span>
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            placeholder="nuevo_username"
            className="flex-1 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleUsernameChange}
            disabled={loadingUsername || !newUsername}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
          >
            {loadingUsername ? '...' : t('save')}
          </button>
        </div>
        <p className="text-xs text-gray-400">
          Solo letras, números y guión bajo. Visible en el ranking.
        </p>
      </div>

      {/* Cambiar email */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">{t('changeEmail')}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('currentEmail')}:{' '}
          <span className="font-medium text-gray-700 dark:text-gray-200">{user?.email}</span>
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
            {loadingEmail ? '...' : t('save')}
          </button>
        </div>
      </div>

      {/* Cambiar contraseña */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">{t('changePassword')}</h2>
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
          {loadingPassword ? '...' : t('changePassword')}
        </button>
      </div>
    </div>
  )
}