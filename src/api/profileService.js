import apiClient from './axios'

export const profileService = {
  async getProfile() {
    const response = await apiClient.get('/profile/')
    return response.data
  },

  async updateProfile(profileData) {
    const response = await apiClient.put('/profile/', profileData)
    return response.data
  }
}