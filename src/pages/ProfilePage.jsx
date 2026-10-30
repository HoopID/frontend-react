import { useState, useEffect } from 'react'
import { profileService } from '../api/profileService'

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    altura: '',
    peso: '',
    envergadura: '',
    posicion: '',
    mano_habil: '',
    salto_vertical: '',
    club_actual: ''
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    profileService.getProfile()
      .then(data => {
        if (data) {
          setFormData({
            altura: data.altura ?? '',
            peso: data.peso ?? '',
            envergadura: data.envergadura ?? '',
            posicion: data.posicion ?? '',
            mano_habil: data.mano_habil ?? '',
            salto_vertical: data.salto_vertical ?? '',
            club_actual: data.club_actual ?? ''
          })
        }
      })
      .catch((err) => {
        console.error('Error al cargar perfil:', err)
        setMessage({ type: 'error', text: 'Error al cargar el perfil' })
      })
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    const payload = {
      altura: formData.altura !== '' ? Number(formData.altura) : null,
      peso: formData.peso !== '' ? Number(formData.peso) : null,
      envergadura: formData.envergadura !== '' ? Number(formData.envergadura) : null,
      posicion: formData.posicion || null,
      mano_habil: formData.mano_habil || null,
      salto_vertical: formData.salto_vertical !== '' ? Number(formData.salto_vertical) : null,
      club_actual: formData.club_actual || null
    }

    try {
      const updated = await profileService.updateProfile(payload)
      if (updated) {
        setFormData({
          altura: updated.altura ?? '',
          peso: updated.peso ?? '',
          envergadura: updated.envergadura ?? '',
          posicion: updated.posicion ?? '',
          mano_habil: updated.mano_habil ?? '',
          salto_vertical: updated.salto_vertical ?? '',
          club_actual: updated.club_actual ?? ''
        })
      }
      setMessage({ type: 'success', text: 'Perfil actualizado con éxito' })
    } catch (err) {
      console.error('Error al actualizar perfil:', err.response?.data || err)
      setMessage({ type: 'error', text: 'Error al actualizar el perfil' })
    }
  }

  if (loading) return <p style={{ padding: '2rem' }}>Cargando perfil...</p>

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Perfil del Jugador</h2>
      
      {message.text && (
        <div style={{ 
          color: message.type === 'error' ? '#721c24' : '#155724', 
          backgroundColor: message.type === 'error' ? '#f8d7da' : '#d4edda',
          padding: '0.75rem', 
          borderRadius: '4px',
          marginBottom: '1rem' 
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label htmlFor="altura">Altura (cm):</label>
          <input
            id="altura"
            type="number"
            name="altura"
            value={formData.altura}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div>
          <label htmlFor="peso">Peso (kg):</label>
          <input
            id="peso"
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div>
          <label htmlFor="envergadura">Envergadura (cm):</label>
          <input
            id="envergadura"
            type="number"
            name="envergadura"
            value={formData.envergadura}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div>
          <label htmlFor="posicion">Posición:</label>
          <select
            id="posicion"
            name="posicion"
            value={formData.posicion}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="">Seleccionar posición</option>
            <option value="Base">Base (PG)</option>
            <option value="Escolta">Escolta (SG)</option>
            <option value="Alero">Alero (SF)</option>
            <option value="Ala-Pívot">Ala-Pívot (PF)</option>
            <option value="Pívot">Pívot (C)</option>
          </select>
        </div>

        <div>
          <label htmlFor="mano_habil">Mano Hábil:</label>
          <select
            id="mano_habil"
            name="mano_habil"
            value={formData.mano_habil}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="">Seleccionar mano</option>
            <option value="Derecha">Derecha</option>
            <option value="Izquierda">Izquierda</option>
            <option value="Ambidiestro">Ambidiestro</option>
          </select>
        </div>

        <div>
          <label htmlFor="salto_vertical">Salto Vertical (cm):</label>
          <input
            id="salto_vertical"
            type="number"
            name="salto_vertical"
            value={formData.salto_vertical}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div>
          <label htmlFor="club_actual">Club Actual:</label>
          <input
            id="club_actual"
            type="text"
            name="club_actual"
            value={formData.club_actual}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <button type="submit" style={{ padding: '0.75rem', cursor: 'pointer', marginTop: '1rem' }}>
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}

export default ProfilePage