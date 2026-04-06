import api from './api'

export const inventarioService = {
  registrarCompra: (idObra, idUsuario, cantidad, costo) =>
    api.post('/inventario/compra', { idObra, idUsuario, cantidad, costo }),

  registrarVenta: (idObra, idUsuario, cantidad, pvp) =>
    api.post('/inventario/venta', { idObra, idUsuario, cantidad, pvp }),

  reporteStock: () => api.get('/inventario/reporte-stock'),
  transacciones: () => api.get('/inventario/transacciones')
}
