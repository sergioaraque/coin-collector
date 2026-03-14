// src/hooks/useCoins.js
// Drop-in replacement de '../data/coins'
// Exporta ALL_COINS, COUNTRIES y YEARS igual que antes, pero desde Supabase

import { useState, useEffect, useMemo, useCallback } from 'react'
import { supabase } from '../supabase'

// Caché en memoria para la sesión (evita refetches entre navegaciones)
let _cache = null
// Listeners registrados por cada instancia del hook
const _listeners = new Set()

// Notifica a todos los componentes que usan useCoins que recarguen
function notifyListeners() {
  _listeners.forEach(fn => fn())
}

export function useCoins() {
  const [coins, setCoins]     = useState(_cache || [])
  const [loading, setLoading] = useState(!_cache)
  const [error, setError]     = useState(null)
  // Contador interno para forzar re-fetch cuando se invalida la caché
  const [version, setVersion] = useState(0)

  // Registrar este componente como listener al montar, desregistrar al desmontar
  useEffect(() => {
    const reload = () => setVersion(v => v + 1)
    _listeners.add(reload)
    return () => _listeners.delete(reload)
  }, [])

  useEffect(() => {
    if (_cache && version === 0) return  // primera carga con caché válida

    let cancelled = false

    async function fetchCoins() {
      setLoading(true)
      setError(null)

      const PAGE = 1000
      let all = []
      let from = 0

      while (true) {
        const { data, error } = await supabase
          .from('coins')
          .select('*')
          .order('country', { ascending: true })
          .order('year',    { ascending: true })
          .range(from, from + PAGE - 1)

        if (error) {
          if (!cancelled) {
            setError(error.message)
            setLoading(false)
          }
          return
        }

        all = [...all, ...data]
        if (data.length < PAGE) break
        from += PAGE
      }

      if (!cancelled) {
        const normalized = all.map(normalizeRow)
        _cache = normalized
        setCoins(normalized)
        setLoading(false)
      }
    }

    fetchCoins()
    return () => { cancelled = true }
  }, [version])

  const ALL_COINS = coins

  const COUNTRIES = useMemo(
    () => [...new Set(coins.map(c => c.country))].sort(),
    [coins]
  )

  const YEARS = useMemo(
    () => [...new Set(coins.map(c => c.year))].sort(),
    [coins]
  )

  return { ALL_COINS, COUNTRIES, YEARS, loading, error }
}

// Convierte snake_case de Supabase → camelCase que usa la app
function normalizeRow(row) {
  return {
    id:           row.id,
    country:      row.country,
    year:         row.year,
    description:  row.description,
    imageUrl:     row.image_url,
    mintage:      row.mintage,
    commemorates: row.commemorates,
  }
}

// Llama esto tras aprobar una propuesta para que todos los componentes
// que usen useCoins recarguen el catálogo desde Supabase
export function invalidateCoinsCache() {
  _cache = null
  notifyListeners()
}