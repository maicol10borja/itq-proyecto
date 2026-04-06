import api from './api'

export const validacionService = {
  validarISBN: (codigo) => api.get('/validacion/isbn', { params: { codigo } }),
  validarAPA: (autor, anio, titulo, editorial, isbn) =>
    api.post('/validacion/apa', { autor, anio, titulo, editorial, isbn })
}
