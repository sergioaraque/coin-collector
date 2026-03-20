import { useState, useRef, useCallback, useEffect } from 'react'

// Texto que suele aparecer en la cara nacional de monedas conmemorativas → país en español
const COUNTRY_HINTS = [
  { hints: ['DEUTSCHLAND', 'BUNDESREPUBLIK', 'BUNDESLAND'], country: 'Alemania' },
  { hints: ['ÖSTERREICH', 'OESTERREICH'], country: 'Austria' },
  { hints: ['BELGIQUE', 'BELGIE', 'BELGIEN'], country: 'Bélgica' },
  { hints: ['KYPROS', 'KIBRIS'], country: 'Chipre' },
  { hints: ['SLOVENSKO'], country: 'Eslovaquia' },
  { hints: ['SLOVENIJA'], country: 'Eslovenia' },
  { hints: ['ESPAÑA', 'ESPANA', 'HISPANIA'], country: 'España' },
  { hints: ['EESTI'], country: 'Estonia' },
  { hints: ['SUOMI', 'FINLAND'], country: 'Finlandia' },
  { hints: ['REPUBLIQUE FRANCAISE', 'LIBERTE', 'EGALITE', 'FRATERNITE'], country: 'Francia' },
  { hints: ['HELLAS', 'ELLADA'], country: 'Grecia' },
  { hints: ['EIRE', 'IRELAND'], country: 'Irlanda' },
  { hints: ['ITALIA', 'REPVBBLICA', 'REPUBBLICA ITALIANA'], country: 'Italia' },
  { hints: ['LATVIJA'], country: 'Letonia' },
  { hints: ['LIETUVA'], country: 'Lituania' },
  { hints: ['LUXEMBOURG', 'LETZEBUERG'], country: 'Luxemburgo' },
  { hints: ['MALTA'], country: 'Malta' },
  { hints: ['MONACO'], country: 'Mónaco' },
  { hints: ['NEDERLAND', 'NEDERLANDEN'], country: 'Países Bajos' },
  { hints: ['PORTUGAL', 'PORTUGUESA'], country: 'Portugal' },
  { hints: ['HRVATSKA'], country: 'Croacia' },
]

function detectCountry(text) {
  const upper = text.toUpperCase()
  for (const { hints, country } of COUNTRY_HINTS) {
    if (hints.some(h => upper.includes(h))) return country
  }
  return null
}

function extractYears(text) {
  const currentYear = new Date().getFullYear()
  const matches = text.match(/\b(19[0-9]{2}|20[0-9]{2})\b/g) || []
  return [...new Set(matches.map(Number))].filter(y => y >= 1999 && y <= currentYear + 1)
}

export function scoreAndRankCoins(ocrText, allCoins) {
  const years = extractYears(ocrText)
  const country = detectCountry(ocrText)
  const upper = ocrText.toUpperCase()

  if (years.length === 0 && !country) return []

  return allCoins
    .map(coin => {
      let score = 0
      if (years.includes(coin.year)) score += 10
      if (country && country === coin.country) score += 5
      const coinWords = [
        ...(coin.description?.split(/\s+/) ?? []),
        ...(coin.commemorates?.split(/\s+/) ?? []),
      ].filter(w => w.length > 4)
      for (const word of coinWords) {
        if (upper.includes(word.toUpperCase())) score += 1
      }
      return { coin, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ coin }) => coin)
}

async function runOcr(imageDataUrl) {
  const { createWorker } = await import('tesseract.js')
  const worker = await createWorker('eng', 1, { logger: () => {} })
  const { data: { text } } = await worker.recognize(imageDataUrl)
  await worker.terminate()
  return text
}

export function useCoinScanner(allCoins) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [phase, setPhase] = useState('idle') // 'idle' | 'camera' | 'processing' | 'results'
  const [capturedImage, setCapturedImage] = useState(null)
  const [matches, setMatches] = useState([])
  const [ocrText, setOcrText] = useState('')
  const [ocrError, setOcrError] = useState(null)

  // Conecta el stream al <video> después de que React renderice el elemento (phase === 'camera')
  useEffect(() => {
    if (phase === 'camera' && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current
      videoRef.current.play().catch(() => {})
    }
  }, [phase])

  const startCamera = useCallback(async () => {
    setOcrError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      streamRef.current = stream
      // setPhase dispara el re-render que monta el <video>, y el useEffect de arriba conecta el stream
      setPhase('camera')
    } catch {
      setOcrError('No se pudo acceder a la cámara. Comprueba los permisos del navegador.')
    }
  }, [])

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
  }, [])

  const processImage = useCallback(async (imageDataUrl) => {
    setCapturedImage(imageDataUrl)
    setPhase('processing')
    setOcrError(null)

    try {
      const text = await runOcr(imageDataUrl)
      setOcrText(text)
      const found = scoreAndRankCoins(text, allCoins)
      setMatches(found)
      if (found.length === 0) {
        setOcrError(
          'No se encontraron coincidencias. ' +
          (text.trim().length > 0
            ? `Texto leído: "${text.trim().slice(0, 100)}"`
            : 'No se detectó texto. Prueba con mejor iluminación y enfoque.')
        )
      }
    } catch (e) {
      console.error('OCR error:', e)
      setOcrError('Error al procesar la imagen. Inténtalo de nuevo.')
      setMatches([])
    }

    setPhase('results')
  }, [allCoins])

  const captureAndRecognize = useCallback(async () => {
    if (!videoRef.current) return
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    canvas.getContext('2d').drawImage(video, 0, 0)
    stopCamera()
    await processImage(canvas.toDataURL('image/jpeg', 0.9))
  }, [stopCamera, processImage])

  const recognizeFromFile = useCallback(async (file) => {
    stopCamera()
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => resolve(e.target.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    await processImage(dataUrl)
  }, [stopCamera, processImage])

  const reset = useCallback(() => {
    stopCamera()
    setPhase('idle')
    setCapturedImage(null)
    setMatches([])
    setOcrText('')
    setOcrError(null)
  }, [stopCamera])

  return { videoRef, phase, capturedImage, matches, ocrText, ocrError, startCamera, stopCamera, captureAndRecognize, recognizeFromFile, reset }
}
