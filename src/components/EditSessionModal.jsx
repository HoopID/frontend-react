import { useState } from 'react'

const EditSessionModal = ({ session, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fecha: session.fecha || '',
    zona: session.zona || '',
    aciertos: session.aciertos || 0,
    intentos: session.intentos || 0
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(session.id, formData)
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: '300px' }}>
        <h3>Editar Sesión</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="date" value={formData.fecha} onChange={e => setFormData({ ...formData, fecha: e.target.value })} required />
          <input type="text" value={formData.zona} onChange={e => setFormData({ ...formData, zona: e.target.value })} required />
          <input type="number" value={formData.aciertos} onChange={e => setFormData({ ...formData, aciertos: parseInt(e.target.value) })} required />
          <input type="number" value={formData.intentos} onChange={e => setFormData({ ...formData, intentos: parseInt(e.target.value) })} required />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditSessionModal