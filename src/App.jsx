import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShootingPage from './pages/ShootingPage'

// Componente de barra de navegación reutilizable
const Layout = ({ children }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <nav style={{ 
        display: 'flex', 
        gap: '1rem', 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        borderBottom: '1px solid #dee2e6',
        alignItems: 'center'
      }}>
        <Link to="/dashboard" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>🏀 HoopID</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/shooting">Sesiones de Tiro</Link>
        <button 
          onClick={handleLogout} 
          style={{ marginLeft: 'auto', padding: '0.4rem 0.8rem', cursor: 'pointer' }}
        >
          Cerrar Sesión
        </button>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

const Dashboard = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>🏀 Dashboard Principal</h2>
    <p>¡Bienvenido! Utiliza el menú superior para navegar entre tu perfil y tus sesiones de tiro.</p>
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
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/shooting" element={<Layout><ShootingPage /></Layout>} />
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
      </Route>
    </Routes>
  )
}

export default App