// src/pages/AdminProposalsPage.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { invalidateCoinsCache } from '../hooks/useCoins'

const STATUS_LABELS = {
  pending:  { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' },
  approved: { label: 'Aprobada',  color: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' },
  rejected: { label: 'Rechazada', color: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' },
}

export default function AdminProposalsPage() {
  const [proposals, setProposals] = useState([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState('pending')
  const [selected, setSelected]   = useState(null)   // propuesta abierta en detalle

  useEffect(() => { fetchProposals() }, [filter])

  async function fetchProposals() {
    setLoading(true)
    const query = supabase
      .from('coin_proposals')
      .select('*')
      .order('created_at', { ascending: false })

    if (filter !== 'all') query.eq('status', filter)

    const { data, error } = await query
    if (!error) setProposals(data || [])
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          📬 Propuestas de monedas
        </h1>

        {/* Filtro de estado */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          {[
            { value: 'pending',  label: '⏳ Pendientes' },
            { value: 'approved', label: '✅ Aprobadas' },
            { value: 'rejected', label: '❌ Rechazadas' },
            { value: 'all',      label: 'Todas' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-3 py-2 transition ${
                filter === value
                  ? 'bg-blue-700 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : proposals.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-4xl">📭</span>
          <p className="mt-2">No hay propuestas {filter !== 'all' ? STATUS_LABELS[filter]?.label.toLowerCase() + 's' : ''}</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-300 font-medium">Moneda</th>
                <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-300 font-medium hidden md:table-cell">Usuario</th>
                <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-300 font-medium hidden sm:table-cell">Fecha</th>
                <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-300 font-medium">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {proposals.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800 dark:text-white">{p.country} · {p.year}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{p.description}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                    {p.user_email || '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">
                    {new Date(p.created_at).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_LABELS[p.status]?.color}`}>
                      {STATUS_LABELS[p.status]?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelected(p)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-xs font-semibold"
                    >
                      Ver detalle →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal detalle */}
      {selected && (
        <ProposalDetailModal
          proposal={selected}
          onClose={() => setSelected(null)}
          onRefresh={() => { fetchProposals(); setSelected(null) }}
        />
      )}
    </div>
  )
}

// ── Modal detalle + edición + aprobar/rechazar ───────────────────────────────
function ProposalDetailModal({ proposal, onClose, onRefresh }) {
  const [form, setForm] = useState({
    country:      proposal.country,
    year:         String(proposal.year),
    description:  proposal.description,
    commemorates: proposal.commemorates || '',
    mintage:      proposal.mintage ? String(proposal.mintage) : '',
    admin_notes:  proposal.admin_notes || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState(null)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  // Genera un ID limpio a partir de país y año
  function generateId() {
    const countryMap = {
      'Alemania': 'de', 'Andorra': 'ad', 'Austria': 'at', 'Bélgica': 'be',
      'Chipre': 'cy', 'Croacia': 'hr', 'Eslovaquia': 'sk', 'Eslovenia': 'si',
      'España': 'es', 'Estonia': 'ee', 'Finlandia': 'fi', 'Francia': 'fr',
      'Grecia': 'gr', 'Irlanda': 'ie', 'Italia': 'it', 'Letonia': 'lv',
      'Lituania': 'lt', 'Luxemburgo': 'lu', 'Malta': 'mt', 'Mónaco': 'mc',
      'Países Bajos': 'nl', 'Portugal': 'pt', 'San Marino': 'sm', 'Vaticano': 'va',
    }
    const code = countryMap[form.country] || form.country.toLowerCase().slice(0, 2)
    return `${code}_${form.year}`
  }

  async function handleApprove() {
    setError(null)
    setSaving(true)
    try {
      const coinId = generateId()

      // 1. Insertar en la tabla coins
      const { error: coinError } = await supabase
        .from('coins')
        .insert({
          id:           coinId,
          country:      form.country,
          year:         parseInt(form.year),
          description:  form.description,
          commemorates: form.commemorates || null,
          mintage:      form.mintage ? parseInt(form.mintage) : null,
          image_url:    proposal.image_url || null,
        })

      if (coinError) throw new Error('Error al crear moneda: ' + coinError.message)

      // 2. Actualizar propuesta a aprobada
      const { error: propError } = await supabase
        .from('coin_proposals')
        .update({
          status:      'approved',
          admin_notes: form.admin_notes || null,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', proposal.id)

      if (propError) throw new Error('Error al actualizar propuesta: ' + propError.message)

      // 3. Invalidar caché para que la app recargue el catálogo
      invalidateCoinsCache()
      onRefresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleReject() {
    setError(null)
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from('coin_proposals')
        .update({
          status:      'rejected',
          admin_notes: form.admin_notes || null,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', proposal.id)
        .select()

      if (error) throw new Error(error.message)
      onRefresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const isPending = proposal.status === 'pending'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">

        {/* Cabecera */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Propuesta de moneda
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {/* Foto si la hay */}
        {proposal.image_url && (
          <div className="mb-5 flex justify-center">
            <img
              src={proposal.image_url}
              alt="foto propuesta"
              className="h-36 w-36 object-contain rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            />
          </div>
        )}

        {/* Info del usuario */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 mb-5 text-xs text-gray-500 dark:text-gray-400 flex justify-between flex-wrap gap-1">
          <span>👤 {proposal.user_email || 'Anónimo'}</span>
          <span>📅 {new Date(proposal.created_at).toLocaleString('es-ES')}</span>
          <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${STATUS_LABELS[proposal.status]?.color}`}>
            {STATUS_LABELS[proposal.status]?.label}
          </span>
        </div>

        {/* Campos editables */}
        <div className="space-y-3">
          {[
            { name: 'country',      label: 'País' },
            { name: 'year',         label: 'Año' },
            { name: 'description',  label: 'Descripción' },
            { name: 'commemorates', label: 'Conmemora' },
            { name: 'mintage',      label: 'Acuñación' },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                disabled={!isPending}
                className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          ))}

          {/* ID que se generará */}
          {isPending && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-2 text-xs text-blue-700 dark:text-blue-300">
              ID generado: <code className="font-mono font-bold">{generateId()}</code>
              <span className="text-blue-500 ml-1">(puedes cambiarlo manualmente si es necesario)</span>
            </div>
          )}

          {/* Nota admin */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
              Nota admin {isPending ? '(opcional)' : ''}
            </label>
            <textarea
              name="admin_notes"
              value={form.admin_notes}
              onChange={handleChange}
              disabled={!isPending}
              rows={2}
              placeholder="Motivo del rechazo, correcciones realizadas..."
              className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
            ⚠️ {error}
          </p>
        )}

        {/* Acciones */}
        {isPending && (
          <div className="mt-5 flex gap-3">
            <button
              onClick={handleReject}
              disabled={saving}
              className="flex-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 font-semibold py-2.5 rounded-xl transition disabled:opacity-60"
            >
              {saving ? '...' : '❌ Rechazar'}
            </button>
            <button
              onClick={handleApprove}
              disabled={saving}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-60"
            >
              {saving ? '...' : '✅ Aprobar y añadir'}
            </button>
          </div>
        )}

        {!isPending && (
          <div className="mt-5 text-center text-sm text-gray-400">
            Esta propuesta ya fue {proposal.status === 'approved' ? 'aprobada' : 'rechazada'} el{' '}
            {proposal.reviewed_at ? new Date(proposal.reviewed_at).toLocaleDateString('es-ES') : '—'}
          </div>
        )}
      </div>
    </div>
  )
}