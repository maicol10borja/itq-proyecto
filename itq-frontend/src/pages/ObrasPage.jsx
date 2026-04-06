import { useState, useEffect } from 'react'
import { obraService } from '../services/obraService'
import { useAuth } from '../context/AuthContext'
import { QRCodeSVG } from 'qrcode.react'

export default function ObrasPage() {
  const [obras, setObras] = useState([])
  const [carrera, setCarrera] = useState('')
  const { hasRole } = useAuth()

  useEffect(() => {
    cargarObras()
  }, [carrera])

  const cargarObras = () => obraService.listar(carrera).then(r => setObras(r.data))

  const cambiarEstado = async (id, est) => {
    await obraService.cambiarEstado(id, est)
    cargarObras()
  }

  return (
    <div style={{ padding:40 }} className="animate-fade">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32 }}>
        <div>
          <h1 className="serif" style={{ fontSize:32, color:'#fff', marginBottom:8 }}>Auditoría de Obras</h1>
          <p style={{ color:'#888', fontSize:14 }}>Gestión técnica del repositorio literario</p>
        </div>
        <div style={{ width: 200 }}>
          <select className="styled-input" value={carrera} onChange={e => setCarrera(e.target.value)}>
            <option value="">Filtro: Todo</option>
            <option value="Sistemas">Ing. Sistemas</option>
            <option value="Administracion">Administración</option>
          </select>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:24 }}>
        {obras.map(o => (
          <div key={o.idObra} className="card" style={{ display:'flex', flexDirection:'column' }}>
            <div style={{ padding:24, flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
                <span className={`badge ${o.estadoActual === 'Publicado' ? 'success' : 'warning'}`}>{o.estadoActual}</span>
                {o.isbn && <div style={{ fontSize:11, fontFamily:'monospace', color:'#666', background:'#111', padding:'4px 8px', borderRadius:4 }}>{o.isbn}</div>}
              </div>
              
              <h3 className="serif" style={{ fontSize:22, lineHeight:1.3, marginBottom:8, color:'#fff' }}>{o.titulo}</h3>
              <p style={{ fontSize:13, color:'#888', marginBottom:24 }}>
                Autoría: <span style={{ color:'#ccc' }}>{o.autor}</span> ({o.anioPublicacion})
              </p>
              
              <div style={{ display:'flex', gap:24, marginBottom:24, padding:'16px 0', borderTop:'1px solid #222', borderBottom:'1px solid #222' }}>
                <div>
                  <div style={{ fontSize:10, color:'#666', textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>Disponibilidad</div>
                  <div style={{ fontSize:18, fontWeight:600, color:'#fff' }}>{o.stock} <span style={{fontSize:12, fontWeight:400, color:'#666'}}>uds.</span></div>
                </div>
                <div>
                  <div style={{ fontSize:10, color:'#666', textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>Costo Base</div>
                  <div style={{ fontSize:18, fontWeight:600, color:'#fff' }}>${parseFloat(o.precio).toFixed(2)}</div>
                </div>
              </div>

              {o.isbn && (
                <div style={{ display:'flex', alignItems:'center', gap:16, background:'#111', padding:16, borderRadius:8 }}>
                  <div style={{ padding:4, background:'#fff', borderRadius:4 }}>
                    <QRCodeSVG value={`${window.location.origin}/obra/${o.isbn}`} size={46} />
                  </div>
                  <div style={{ fontSize:11, color:'#888', lineHeight:1.5 }}>
                    Escanea este código<br/>para auditoría externa.
                  </div>
                </div>
              )}
            </div>

            {hasRole('ADMIN', 'ACADEMICO', 'GESTOR') && (
              <div style={{ padding:'16px 24px', background:'#111', borderTop:'1px solid #222', display:'flex', gap:12 }}>
                {o.estadoActual === 'Borrador' && (
                  <button className="btn" onClick={() => cambiarEstado(o.idObra, 'Publicado')} style={{ flex:1 }}>Certificar / Publicar</button>
                )}
                {hasRole('ADMIN') && (
                  <button className="btn btn-ghost" onClick={() => cambiarEstado(o.idObra, 'Borrador')} style={{ flex:1, color:'var(--danger)', borderColor:'rgba(255,71,87,0.3)' }}>Revocar</button>
                )}
              </div>
            )}
          </div>
        ))}
        {obras.length === 0 && <div style={{gridColumn:'1/-1', textAlign:'center', color:'#555', padding:60, fontSize:14}}>No hay obras registradas en este segmento.</div>}
      </div>
    </div>
  )
}
