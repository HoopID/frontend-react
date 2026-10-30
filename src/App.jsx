import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Componente temporal para el Dashboard
const Dashboard = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>🏀 Dashboard Principal (Protegido)</h2>
    <p>¡Bienvenido! Has ingresado correctamente con tu token.</p>
    <button 
      onClick={() => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }}
      style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
    >
      Cerrar Sesión
    </button>
  </div>
)

function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App