import apiClient from './axios'

export const shootingService = {
  async getSessions() {
    const response = await apiClient.get('/shooting-sessions/')
    return response.data.sessions || response.data
  },

  async createSession(sessionData) {
    const payload = {
      session_date: sessionData.fecha,
      zone: sessionData.zona,
      shot_zone: sessionData.zona,
      attempts: Number(sessionData.intentos),
      made: Number(sessionData.aciertos)
    }

    const response = await apiClient.post('/shooting-sessions/', payload)
    return response.data
  },

  async updateSession(id, sessionData) {
    const payload = {
      session_date: sessionData.fecha,
      zone: sessionData.zona,
      shot_zone: sessionData.zona,
      attempts: Number(sessionData.intentos),
      made: Number(sessionData.aciertos)
    }

    const response = await apiClient.put(`/shooting-sessions/${id}/`, payload)
    return response.data
  },

  async deleteSession(id) {
    const response = await apiClient.delete(`/shooting-sessions/${id}/`)
    return response.data
  }
}