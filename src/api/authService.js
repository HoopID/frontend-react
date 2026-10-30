import apiClient from './axios'

export const authService = {
  async register(email, password) {
    const response = await apiClient.post('/auth/register', { email, password })
    return response.data
  },

  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password })
    return response.data
  }
}