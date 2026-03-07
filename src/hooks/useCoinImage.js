import { useState, useEffect } from 'react'

const CDN_URL = 'https://euro-collector-images.sergio-araque-97.workers.dev'

function getCDNUrl(originalUrl) {
  if (!originalUrl) return null
  if (!originalUrl.includes('supabase.co')) return originalUrl
  const filename = originalUrl.split('/').pop().split('?')[0]
  return `${CDN_URL}/${filename}`
}

export function useCoinImage(coin) {
  const cdnUrl = getCDNUrl(coin.imageUrl)
  const [src, setSrc] = useState(cdnUrl || null)
  const [status, setStatus] = useState(cdnUrl ? 'loading' : 'error')

  useEffect(() => {
    const cdnUrl = getCDNUrl(coin.imageUrl)

    if (!cdnUrl) {
      setSrc(null)
      setStatus('error')
      return
    }

    setSrc(cdnUrl)
    setStatus('loading')

    let cancelled = false

    fetch(cdnUrl, { method: 'HEAD' })
      .then(res => {
        if (cancelled) return
        if (res.ok) setStatus('ok')
        else { setSrc(null); setStatus('error') }
      })
      .catch(() => {
        if (!cancelled) { setSrc(null); setStatus('error') }
      })

    return () => { cancelled = true }
  }, [coin.id, coin.imageUrl])

  return { src, status }
}