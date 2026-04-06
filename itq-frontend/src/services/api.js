import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
})

// Interceptor: agrega el token JWT en cada request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('itq_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Interceptor: si 401 → logout automático
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('itq_token')
      localStorage.removeItem('itq_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
