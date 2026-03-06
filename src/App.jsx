import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CollectionProvider } from './context/CollectionContext'
import { ThemeProvider } from './context/ThemeContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CollectionPage from './pages/CollectionPage'
import StatsPage from './pages/StatsPage'
import AdminPage from './pages/AdminPage'
import Layout from './components/Layout'
import { ToastContainer } from './components/Toast'
import MapPage from './pages/MapPage'
import CoinDetailPage from './pages/CoinDetailPage'
import ProfilePage from './pages/ProfilePage'
import ActivityPage from './pages/ActivityPage'
import RankingPage from './pages/RankingPage'
import LandingPage from './pages/LandingPage'
import PublicStatsPage from './pages/public/PublicStatsPage'
import PublicCatalogPage from './pages/public/PublicCatalogPage'
import PublicRankingPage from './pages/public/PublicRankingPage'
import { useTranslation } from 'react-i18next'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
    const { t } = useTranslation()
  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-500">{t('loading_session')}</p>
      </div>
    </div>
  )

  return user ? children : <Navigate to="/landing" replace />
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CollectionProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route index element={<Navigate to="/mapa" replace />} />
              <Route path="coleccion" element={<CollectionPage />} />
              <Route path="estadisticas" element={<StatsPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="mapa" element={<MapPage />} />
              <Route path="moneda/:coinId" element={<CoinDetailPage />} />
              <Route path="perfil" element={<ProfilePage />} />
              <Route path="actividad" element={<ActivityPage />} />
              <Route path="ranking" element={<RankingPage />} />
            </Route>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/estadisticas-publicas" element={<PublicStatsPage />} />
            <Route path="/catalogo" element={<PublicCatalogPage />} />
            <Route path="/ranking-publico" element={<PublicRankingPage />} />
          </Routes>
        <ToastContainer />
        </CollectionProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}