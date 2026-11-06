import { useState, useEffect } from 'react'
import { shootingService } from '../api/shootingService'
import EditSessionModal from '../components/EditSessionModal'

const ShootingPage = () => {
  const [sessions, setSessions] = useState([])
  const [editingSession, setEditingSession] = useState(null)
  const [formData, setFormData] = useState({ fecha: '', zona: '', aciertos: '', intentos: '' })
  const [error, setError] = useState(null)

  const loadSessions = async () => {
    try {
      const data = await shootingService.getSessions()
      const list = Array.isArray(data) ? data : (data?.sessions || [])
      setSessions(list)
    } catch (err) {
      console.error('Error al obtener sesiones:', err)
      setSessions([])
    }
  }

  useEffect(() => {
    loadSessions()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      await shootingService.createSession(formData)
      setFormData({ fecha: '', zona: '', aciertos: '', intentos: '' })
      await loadSessions()
    } catch (err) {
      console.error('Error al crear sesión:', err.response?.data)
      const detail = err.response?.data?.detail || err.response?.data?.message
      setError(typeof detail === 'string' ? detail : 'Error al guardar la sesión de tiro.')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta sesión?')) {
      try {
        await shootingService.deleteSession(id)
        await loadSessions()
      } catch (err) {
        console.error('Error al eliminar sesión:', err)
      }
    }
  }

  const handleUpdate = async (id, updatedData) => {
    try {
      await shootingService.updateSession(id, updatedData)
      setEditingSession(null)
      await loadSessions()
    } catch (err) {
      console.error('Error al actualizar sesión:', err)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Sesiones de Tiro</h2>

      {error && (
        <div style={{ color: '#721c24', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input 
          type="date" 
          value={formData.fecha} 
          onChange={e => setFormData({ ...formData, fecha: e.target.value })} 
          required 
          style={{ padding: '0.5rem' }}
        />
        <input 
          type="text" 
          placeholder="Zona" 
          value={formData.zona} 
          onChange={e => setFormData({ ...formData, zona: e.target.value })} 
          required 
          style={{ padding: '0.5rem' }}
        />
        <input 
          type="number" 
          placeholder="Aciertos" 
          value={formData.aciertos} 
          onChange={e => setFormData({ ...formData, aciertos: e.target.value })} 
          required 
          style={{ padding: '0.5rem' }}
        />
        <input 
          type="number" 
          placeholder="Intentos" 
          value={formData.intentos} 
          onChange={e => setFormData({ ...formData, intentos: e.target.value })} 
          required 
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Agregar</button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} border="1" cellPadding="8">
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Fecha</th>
            <th>Zona</th>
            <th>Aciertos</th>
            <th>Intentos</th>
            <th>% Efectividad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>No hay sesiones registradas.</td>
            </tr>
          ) : (
            sessions.map((s) => {
              // Al iterar sobre las sesiones en el map:
              const fecha = s.session_date || s.fecha
              const zona = s.shot_zone || s.zona
              const aciertos = s.made ?? s.aciertos ?? 0
              const intentos = s.attempts ?? s.intentos ?? 0
              const porcentaje = intentos > 0 ? ((aciertos / intentos) * 100).toFixed(1) : '0.0'

              return (
                <tr key={s.id}>
                  <td>{fecha}</td>
                  <td>{zona}</td>
                  <td>{aciertos}</td>
                  <td>{intentos}</td>
                  <td>{s.shooting_percentage ?? porcentaje}%</td>
                  <td>
                    <button 
                      onClick={() => setEditingSession({
                        id: s.id,
                        fecha,
                        zona,
                        aciertos,
                        intentos
                      })} 
                      style={{ marginRight: '0.5rem' }}
                    >
                      Editar
                    </button>
                    <button onClick={() => handleDelete(s.id)}>Eliminar</button>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>

      {editingSession && (
        <EditSessionModal 
          session={editingSession} 
          onClose={() => setEditingSession(null)} 
          onSave={handleUpdate} 
        />
      )}
    </div>
  )
}

export default ShootingPage