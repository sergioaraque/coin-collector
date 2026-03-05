# 🪙 EuroCollector

Aplicación web para coleccionar y gestionar monedas conmemorativas de 2€ de la Unión Europea.
Es una aplicación en la que se ha utilizado la IA para hacer pruebas con ella.

---

## 🚀 Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Estilos | Tailwind CSS |
| Routing | React Router v6 |
| Backend / Auth | Supabase (PostgreSQL + Auth) |
| Almacenamiento imágenes | Supabase Storage |
| Gráficos | Recharts |
| Mapa | react-simple-maps |
| Internacionalización | i18next + react-i18next |
| PWA | vite-plugin-pwa |
| Notificaciones | Discord Webhooks |

---

## 📁 Estructura del proyecto

```
coin-collector/
├── public/
│   ├── icon-192.png          # Icono PWA
│   ├── icon-512.png          # Icono PWA
│   └── manifest.json         # Configuración PWA
├── scripts/
│   ├── download-coins.cjs    # Descarga imágenes de Wikimedia y las sube a Supabase Storage
│   ├── update-coins.cjs      # Actualiza coins.js con las URLs de Supabase
│   └── image-results.json    # Progreso de la descarga (generado automáticamente)
├── src/
│   ├── context/
│   │   ├── AuthContext.jsx       # Autenticación con Supabase, notificación Discord al login
│   │   ├── CollectionContext.jsx # Estado global de monedas poseídas, toggle, historial
│   │   └── ThemeContext.jsx      # Modo oscuro / claro, persistido en localStorage
│   ├── components/
│   │   ├── Layout.jsx            # Estructura principal: header, nav, outlet
│   │   ├── CoinCard.jsx          # Tarjeta de moneda (vista cuadrícula)
│   │   ├── CoinRow.jsx           # Fila de moneda (vista lista)
│   │   ├── GlobalSearch.jsx      # Buscador global en el header con dropdown
│   │   └── Toast.jsx             # Sistema de notificaciones in-app
│   ├── pages/
│   │   ├── MapPage.jsx           # Mapa de Europa interactivo con progreso por país
│   │   ├── CollectionPage.jsx    # Catálogo con filtros (país, rareza, tengo/faltan, grid/lista)
│   │   ├── StatsPage.jsx         # Estadísticas: valor estimado, rareza, gráficos por país y año
│   │   ├── CoinDetailPage.jsx    # Detalle de moneda: imagen grande, valor, emisiones comunes
│   │   ├── ActivityPage.jsx      # Historial de actividad del usuario
│   │   ├── RankingPage.jsx       # Ranking público de coleccionistas por username
│   │   ├── ProfilePage.jsx       # Perfil: cambiar username, email y contraseña
│   │   ├── AdminPage.jsx         # Panel de administración (solo admins)
│   │   ├── LoginPage.jsx         # Login con email y contraseña
│   │   └── RegisterPage.jsx      # Registro con username, email y contraseña
│   ├── hooks/
│   │   ├── useCoinImage.js       # Fallback inteligente para cargar imágenes de monedas
│   │   └── useAdmin.js           # Comprueba si el usuario tiene rol admin
│   ├── data/
│   │   └── coins.js              # Catálogo completo de ~290 monedas con URLs de imágenes
│   ├── lib/
│   │   └── discord.js            # Helpers para enviar notificaciones a Discord
│   ├── i18n.js                   # Configuración i18next (ES/EN)
│   ├── supabase.js               # Cliente Supabase
│   ├── App.jsx                   # Rutas principales
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Estilos globales + animaciones
├── .env                          # Variables de entorno (no subir a Git)
├── .gitignore
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🗄️ Base de datos (Supabase)

### Tablas

| Tabla | Descripción |
|-------|-------------|
| `collection` | Monedas poseídas por cada usuario (`user_id`, `coin_id`) |
| `profiles` | Perfil público del usuario (`user_id`, `username`) |
| `user_roles` | Roles de usuario (`user_id`, `role`: `user` / `admin`) |
| `activity_log` | Historial de acciones (`add`, `remove`, `complete_country`) |

### Funciones RPC

| Función | Descripción |
|---------|-------------|
| `get_ranking()` | Devuelve ranking de usuarios con username y conteo de monedas |
| `get_users_admin()` | Devuelve lista de usuarios con email (solo accesible por admins) |
| `get_collection_counts()` | Devuelve conteo de monedas por usuario |

### Storage

- Bucket `coins` (público): imágenes de las monedas en formato `{coin_id}.jpg`

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tuproyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_KEY=tu_service_role_key   # Solo para los scripts
VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

## 🛠️ Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build de producción
npm run build
```

---

## 🖼️ Scripts de imágenes

Las imágenes de las monedas se descargan de Wikimedia Commons y se almacenan en Supabase Storage.

```bash
# Instalar dependencias de los scripts
npm install node-fetch@2 dotenv

# Descargar imágenes (procesa en lotes, guarda progreso)
node scripts/download-coins.cjs

# Actualizar coins.js con las URLs de Supabase
node scripts/update-coins.cjs
```

> El script de descarga respeta el rate limit de Wikimedia con pausas entre peticiones.
> Si se interrumpe, al relanzarlo continúa desde donde se quedó.
> Las monedas con `null` en `image-results.json` se reintentan automáticamente.

---

## 📱 PWA

La app es instalable en móvil como PWA. Los iconos se generan con:

```bash
node gen-icons.cjs
```

---

## 🌍 Internacionalización

Disponible en **español** e **inglés**. El toggle 🇬🇧/🇪🇸 está en el header.
Las traducciones se gestionan en `src/i18n.js`.

---

## 📊 Funcionalidades principales

- **Mapa de Europa** interactivo con progreso por país (coloreado según % completado)
- **Catálogo de ~290 monedas** con filtros por país, año, rareza y estado (tengo/faltan)
- **Vista cuadrícula y lista** con imágenes cargadas desde Supabase Storage
- **Detalle de moneda** con valor estimado de mercado, emisiones comunes y monedas del mismo país
- **Estadísticas** con valor total de la colección, moneda más rara, gráficos por país y año
- **Historial de actividad** con timestamps
- **Ranking público** por username (anónimo, sin emails)
- **Notificaciones Discord** al hacer login y al completar un país al 100%
- **Panel de admin** con lista de usuarios, roles y progreso de cada uno
- **Modo oscuro** persistido en localStorage
- **Buscador global** en el header con resultados instantáneos
- **PWA instalable** en móvil con iconos y manifest

---

## 🚀 Despliegue en Vercel

```bash
npm install -g vercel
vercel
```

Añade las variables de entorno en el panel de Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_DISCORD_WEBHOOK_URL`