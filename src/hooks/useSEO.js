import { useEffect } from 'react'

export function useSEO({ title, description } = {}) {
  useEffect(() => {
    if (title) {
      document.title = `${title} — EuroCollector`
    }
    if (description) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', description)
    }
    return () => {
      document.title = 'EuroCollector — Gestiona tu colección de monedas de 2€'
    }
  }, [title, description])
}