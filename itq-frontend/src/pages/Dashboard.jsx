import { useState, useEffect } from 'react'
import { obraService } from '../services/obraService'
import { inventarioService } from '../services/inventarioService'

export default function Dashboard() {
  const [obras, setObras] = useState([])
  const [transacciones, setTransacciones] = useState([])

  useEffect(() => {
    obraService.listar().then(r => setObras(r.data))
    inventarioService.transacciones().then(r => setTransacciones(r.data))
  }, [])

  const totalStock = obras.reduce((a, o) => a + (o.stock || 0), 0)
  const publicadas = obras.filter(o => o.estadoActual === 'Publicado').length
  const ventas = transacciones.filter(t => t.tipo === 'Venta').length
  const sinStock = obras.filter(o => o.stock === 0)

  return (
    <div className="animate-fade page-padding">
      <div style={{ marginBottom: 32 }}>
        <h1 className="serif" style={{ fontSize: 32, color: '#fff', marginBottom: 8 }}>General</h1>
        <p style={{ color: '#888', fontSize: 14 }}>Instituto Superior Tecnológico Quito — Control Global</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
        {[
          { label: 'Obras Registradas', value: obras.length, hint: 'En Base de Datos' },
          { label: 'Obras Publicadas', value: publicadas, hint: 'Aprobadas formalmente' },
          { label: 'Inventario Total', value: totalStock, hint: 'Unidades disponibles' },
          { label: 'Transacciones', value: ventas, hint: 'Movimientos externos' },
        ].map((s, idx) => (
          <div key={s.label} className="card" style={{ padding: '24px', borderTop: idx === 0 ? '3px solid #fff' : '1px solid #222' }}>
            <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>{s.label}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#555', marginTop: 12 }}>↳ {s.hint}</div>
          </div>
        ))}
      </div>

      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #222', background: '#111' }}>
            <h3 className="serif" style={{ fontSize: 18, color: '#fff' }}>Catálogo Reciente</h3>
          </div>
          <div style={{ padding: 20 }}>
            {obras.slice(-4).reverse().map(o => (
              <div key={o.idObra} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #222' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#e5e5e5' }}>{o.titulo}</div>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{o.autor} • {o.carreraRelacionada}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${o.estadoActual === 'Publicado' ? 'success' : 'warning'}`}>{o.estadoActual}</span>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginTop: 6 }}>${(parseFloat(o.precio || 0) * 1.3).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #222', background: '#111' }}>
            <h3 className="serif" style={{ fontSize: 18, color: '#fff' }}>Alertas de Stock</h3>
          </div>
          <div style={{ padding: 20 }}>
            {sinStock.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                Toda la biblioteca cuenta con stock disponible.
              </div>
            ) : sinStock.map(o => (
              <div key={o.idObra} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #222' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--danger)' }}></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#e5e5e5' }}>{o.titulo}</div>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Ref: {o.isbn || 'Sin ISBN'}</div>
                  </div>
                </div>
                <span className="badge danger">Agotado (0)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
