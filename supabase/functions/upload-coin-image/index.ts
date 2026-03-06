// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const VALID_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

Deno.serve(async (req) => {
  // Verificamos que es admin
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return new Response('Unauthorized', { status: 401 })

  const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { data: role } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (role?.role !== 'admin') return new Response('Forbidden', { status: 403 })

  const { coinId, imageUrl } = await req.json()
  if (!coinId || !imageUrl) {
    return new Response(JSON.stringify({ error: 'coinId e imageUrl son obligatorios' }), { status: 400 })
  }

  try {
    // Descargamos la imagen
    const res = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      }
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const contentType = res.headers.get('content-type') || ''
    const mimeBase = contentType.split(';')[0].trim()

    if (!VALID_MIMES.includes(mimeBase)) {
      throw new Error(`Tipo no válido: ${mimeBase}`)
    }

    const buffer = await res.arrayBuffer()
    const ext = mimeBase.includes('png') ? 'png' : 'jpg'
    const filename = `${coinId}.${ext}`

    // Subimos a Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('coins')
      .upload(filename, buffer, { contentType: mimeBase, upsert: true })

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from('coins').getPublicUrl(filename)

    // Actualizamos coin_images
    await supabase.from('coin_images').upsert({
      coin_id: coinId,
      supabase_url: data.publicUrl,
      status: 'ok',
      rejected_at: null,
      notes: `Subida manualmente desde ${imageUrl}`
    })

    return new Response(JSON.stringify({ ok: true, url: data.publicUrl }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
})