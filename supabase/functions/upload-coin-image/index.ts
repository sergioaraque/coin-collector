// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const VALID_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  // Maneja preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verificamos que es admin
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No autorizado' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Token inválido' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (roleData?.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Solo admins pueden usar esta función' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Leemos el body
    const { coinId, imageUrl } = await req.json()

    if (!coinId || !imageUrl) {
      return new Response(
        JSON.stringify({ error: 'coinId e imageUrl son obligatorios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Descargamos la imagen
    const res = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': new URL(imageUrl).origin,
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      }
    })

    if (!res.ok) {
      throw new Error(`Error descargando imagen: HTTP ${res.status}`)
    }

    const contentType = res.headers.get('content-type') || ''
    const mimeBase = contentType.split(';')[0].trim()

    if (!VALID_MIMES.includes(mimeBase)) {
      throw new Error(`Tipo de archivo no válido: ${mimeBase}`)
    }

    const buffer = await res.arrayBuffer()
    const ext = mimeBase.includes('png') ? 'png' : 'jpg'
    const filename = `${coinId}.${ext}`

    // Subimos a Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('coins')
      .upload(filename, buffer, { contentType: mimeBase, upsert: true })

    if (uploadError) throw new Error(`Error subiendo a Storage: ${uploadError.message}`)

    const { data: urlData } = supabase.storage.from('coins').getPublicUrl(filename)

    // Actualizamos coin_images
    await supabase.from('coin_images').upsert({
      coin_id: coinId,
      supabase_url: urlData.publicUrl,
      status: 'ok',
      rejected_at: null,
      notes: `Subida manualmente desde ${imageUrl}`
    })

    return new Response(
      JSON.stringify({ ok: true, url: urlData.publicUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})