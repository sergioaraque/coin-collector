import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CollectionProvider } from './context/CollectionContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CollectionPage from './pages/CollectionPage'
import StatsPage from './pages/StatsPage'
import Layout from './components/Layout'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen text-gray-500">Cargando...</div>
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <CollectionProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/coleccion" replace />} />
            <Route path="coleccion" element={<CollectionPage />} />
            <Route path="estadisticas" element={<StatsPage />} />
          </Route>
        </Routes>
      </CollectionProvider>
    </AuthProvider>
  )
}