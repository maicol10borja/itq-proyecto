import api from './api'

export const costosService = {
  calcularPVP: (idObra, stockActual, costoAnterior, nuevoCosto, cantidadNueva, margen = 30) =>
    api.post('/costos/calcular-pvp', {
      idObra, stockActual, costoAnterior, nuevoCosto, cantidadNueva, margen
    })
}
