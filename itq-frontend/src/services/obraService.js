import api from './api'

export const obraService = {
  listar: (carrera) => api.get('/obras', { params: carrera ? { carrera } : {} }),
  buscar: (id) => api.get(`/obras/${id}`),
  buscarPorIsbn: (isbn) => api.get(`/obras/isbn/${isbn}`),
  crear: (data) => api.post('/obras/crear', data),
  actualizar: (id, data) => api.put(`/obras/${id}`, data),
  cambiarEstado: (id, estado) => api.patch(`/obras/${id}/estado`, { estado }),
  eliminar: (id) => api.delete(`/obras/${id}`),
  stockBajo: (umbral = 5) => api.get('/obras/stock-bajo', { params: { umbral } }),
  ranking: (carrera) => api.get('/ranking', { params: carrera ? { carrera } : {} })
}
