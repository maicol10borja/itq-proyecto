import { Routes, Route, Navigate } from 'react-router-dom'
import AuthGuard from './guards/AuthGuard'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import ObrasPage from './pages/ObrasPage'
import InventarioPage from './pages/InventarioPage'
import CostosPage from './pages/CostosPage'
import ValidacionPage from './pages/ValidacionPage'
import RankingPage from './pages/RankingPage'
import UsuariosPage from './pages/UsuariosPage'
import ReportesPage from './pages/ReportesPage'
import PublicObraPage from './pages/PublicObraPage'
import Layout from './components/Layout'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/obra/:isbn" element={<PublicObraPage />} />
      <Route path="/" element={
        <AuthGuard>
          <Layout />
        </AuthGuard>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard"   element={<Dashboard />} />
        <Route path="obras"       element={<ObrasPage />} />
        <Route path="inventario"  element={<InventarioPage />} />
        <Route path="costos"      element={<CostosPage />} />
        <Route path="validacion"  element={<ValidacionPage />} />
        <Route path="ranking"     element={<RankingPage />} />
        <Route path="usuarios"    element={<UsuariosPage />} />
        <Route path="reportes"    element={<ReportesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
