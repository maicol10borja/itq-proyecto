import api from './api'

export const authService = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    localStorage.setItem('itq_token', res.data.token)
    localStorage.setItem('itq_user', JSON.stringify(res.data))
    return res.data
  },

  register: async (nombre, email, password, rol) => {
    const res = await api.post('/auth/register', { nombre, email, password, rol })
    return res.data
  },

  logout: () => {
    localStorage.removeItem('itq_token')
    localStorage.removeItem('itq_user')
  },

  getCurrentUser: () => {
    const u = localStorage.getItem('itq_user')
    return u ? JSON.parse(u) : null
  },

  isAuthenticated: () => !!localStorage.getItem('itq_token')
}
