export async function notifyDiscord(message) {
  const url = import.meta.env.VITE_DISCORD_WEBHOOK_URL
  if (!url) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    })
  } catch (e) {
    console.error('Discord webhook error:', e)
  }
}

export async function notifyLogin(email, username, ownedCount, totalCount) {
  const pct = Math.round((ownedCount / totalCount) * 100)
  const bar = buildProgressBar(pct)
  const displayName = username || email
  await notifyDiscord(
    `🪙 **Nuevo acceso** — \`${displayName}\`\n` +
    `📊 Colección: **${ownedCount}/${totalCount}** monedas (${pct}%)\n` +
    `${bar}`
  )
}

export async function notifyCountryComplete(email, username, country, total) {
  const displayName = username || email
  await notifyDiscord(
    `🏆 **¡País completado!** — \`${displayName}\`\n` +
    `🎉 Ha completado **${country}** al 100% (${total} monedas)`
  )
}

function buildProgressBar(pct) {
  const filled = Math.round(pct / 10)
  const empty = 10 - filled
  return '`' + '█'.repeat(filled) + '░'.repeat(empty) + `\` ${pct}%`
}