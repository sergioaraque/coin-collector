import { useState, useEffect } from 'react'

// Genera todas las variantes posibles del nombre de archivo para una moneda
function getImageCandidates(coin) {
  const { country, year, description } = coin

  // Mapa de nombres de país en inglés para Wikimedia
  const countryMap = {
    'Alemania': 'Germany',
    'Austria': 'Austria',
    'Bélgica': 'Belgium',
    'Chipre': 'Cyprus',
    'Eslovaquia': 'Slovakia',
    'Eslovenia': 'Slovenia',
    'España': 'Spain',
    'Estonia': 'Estonia',
    'Finlandia': 'Finland',
    'Francia': 'France',
    'Grecia': 'Greece',
    'Irlanda': 'Ireland',
    'Italia': 'Italy',
    'Letonia': 'Latvia',
    'Lituania': 'Lithuania',
    'Luxemburgo': 'Luxembourg',
    'Malta': 'Malta',
    'Mónaco': 'Monaco',
    'Países Bajos': 'Netherlands',
    'Portugal': 'Portugal',
    'San Marino': 'San_Marino',
    'Vaticano': 'Vatican',
    'Andorra': 'Andorra',
  }

  const en = countryMap[country] || country
  const thumb = (f) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${f}/200px-${f}`
  const direct = (f) => `https://upload.wikimedia.org/wikipedia/commons/${f}`

  // Variantes comunes que usa Wikimedia para estas monedas
  return [
    // La URL que ya tenemos en coins.js (se intenta primero desde el padre)
    thumb(`2_euro_${en}_${year}.png`),
    thumb(`2_euro_${en}_${year}.jpg`),
    thumb(`2_euro_${en}_${year}.JPG`),
    thumb(`2_euro_coin_${en}_${year}.png`),
    thumb(`2_euro_coin_${en}_${year}.jpg`),
    thumb(`2_%E2%82%AC_${en}_${year}.png`),
    // Sin año
    thumb(`2_euro_${en}.png`),
    // Con guiones bajos en descripción
    thumb(`2_euro_${en}_${year}_${description.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')}.png`),
    // Búsqueda dinámica vía API de Wikimedia (último recurso)
    null, // señal para usar la API
  ]
}

const API_CACHE = {}

async function searchWikimediaAPI(coin) {
  const cacheKey = coin.id
  if (API_CACHE[cacheKey] !== undefined) return API_CACHE[cacheKey]

  const countryMap = {
    'Alemania': 'Germany', 'Austria': 'Austria', 'Bélgica': 'Belgium',
    'Chipre': 'Cyprus', 'Eslovaquia': 'Slovakia', 'Eslovenia': 'Slovenia',
    'España': 'Spain', 'Estonia': 'Estonia', 'Finlandia': 'Finland',
    'Francia': 'France', 'Grecia': 'Greece', 'Irlanda': 'Ireland',
    'Italia': 'Italy', 'Letonia': 'Latvia', 'Lituania': 'Lithuania',
    'Luxemburgo': 'Luxembourg', 'Malta': 'Malta', 'Mónaco': 'Monaco',
    'Países Bajos': 'Netherlands', 'Portugal': 'Portugal',
    'San Marino': 'San Marino', 'Vaticano': 'Vatican', 'Andorra': 'Andorra',
  }

  const en = countryMap[coin.country] || coin.country
  const query = `2 euro ${en} ${coin.year}`

  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=5&format=json&origin=*`
    const res = await fetch(url)
    const data = await res.json()
    const results = data?.query?.search || []

    for (const result of results) {
      const title = result.title // e.g. "File:2 euro Germany 2007.png"
      const filename = title.replace('File:', '').replace(/ /g, '_')
      const imageUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${filename}/200px-${filename}`
      // Verificamos que la imagen existe
      const check = await fetch(imageUrl, { method: 'HEAD' })
      if (check.ok) {
        API_CACHE[cacheKey] = imageUrl
        return imageUrl
      }
    }
  } catch (e) {
    // silencioso
  }

  API_CACHE[cacheKey] = null
  return null
}

export function useCoinImage(coin) {
  const [src, setSrc] = useState(coin.imageUrl)
  const [status, setStatus] = useState('loading') // loading | ok | error

  useEffect(() => {
    let cancelled = false
    setSrc(coin.imageUrl)
    setStatus('loading')

    const candidates = [coin.imageUrl, ...getImageCandidates(coin).filter(
      (c) => c !== null && c !== coin.imageUrl
    )]

    let index = 0

    const tryNext = async () => {
      if (cancelled) return

      if (index < candidates.length) {
        const url = candidates[index]
        index++
        // Verificamos con HEAD si la imagen existe
        try {
          const res = await fetch(url, { method: 'HEAD' })
          if (res.ok) {
            if (!cancelled) { setSrc(url); setStatus('ok') }
          } else {
            tryNext()
          }
        } catch {
          tryNext()
        }
      } else {
        // Último recurso: API de Wikimedia
        const apiResult = await searchWikimediaAPI(coin)
        if (!cancelled) {
          if (apiResult) { setSrc(apiResult); setStatus('ok') }
          else setStatus('error')
        }
      }
    }

    tryNext()
    return () => { cancelled = true }
  }, [coin.id])

  return { src, status }
}