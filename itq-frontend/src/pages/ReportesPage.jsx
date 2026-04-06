import { useState, useEffect } from 'react'
import { inventarioService } from '../services/inventarioService'

export default function ReportesPage() {
  const [tab, setTab] = useState('swot')
  const [transacciones, setTransacciones] = useState([])

  useEffect(() => {
    inventarioService.transacciones().then(r => setTransacciones(r.data))
  }, [])

  return (
    <div style={{ padding:40, background: '#050505' }}>
      <div style={{ marginBottom:32, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <div>
          <h1 className="serif" style={{ fontSize:32, color:'#fff', marginBottom:8 }}>Reportes Gerenciales y Análisis</h1>
          <p style={{ color:'#888', fontSize:14 }}>Instituto Superior Tecnológico Quito</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button className={`btn ${tab==='swot'?'':'btn-ghost'}`} onClick={()=>setTab('swot')}>Análisis SWOT</button>
          <button className={`btn ${tab==='inv'?'':'btn-ghost'}`} onClick={()=>setTab('inv')}>Inventarios y Demandas</button>
        </div>
      </div>

      {tab === 'swot' && (
        <div className="animate-fade">
          <div className="card" style={{ padding:32, marginBottom:32 }}>
            <h2 className="serif" style={{ fontSize:24, color:'#fff', marginBottom:12 }}>Contexto del Negocio (Digitalización del ITQ)</h2>
            <p style={{ color:'#aaa', fontSize:14, lineHeight:1.6 }}>
              La necesidad técnica fundamental es centralizar las obras literarias, unificar validación académica con ISBN/APA y aplicar una contabilidad de costos automatizada para 
              el re-stocaje. Requisitos: Despliegue en World Wide Web (Vercel/AWS), Arquitectura MVC (React+Spring), API Segura con JWT y Base de datos Relacional Normalizada.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            <div className="card" style={{ padding:24, borderTop:'3px solid var(--success)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                <div style={{ background:'rgba(46, 213, 115, 0.1)', color:'var(--success)', padding:'8px 12px', borderRadius:8, fontWeight:700 }}>S</div>
                <h3 className="serif" style={{ fontSize:18, color:'#fff' }}>Fortalezas (Strengths)</h3>
              </div>
              <ul style={{ color:'#888', fontSize:13, paddingLeft:20, lineHeight:1.8 }}>
                <li>Automatización de motor de PVP por Costo Ponderado.</li>
                <li>Validaciones rigurosas normativas incorporadas.</li>
                <li>Control de acceso granular por roles ITQ.</li>
              </ul>
            </div>

            <div className="card" style={{ padding:24, borderTop:'3px solid var(--warning)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                <div style={{ background:'rgba(255, 165, 2, 0.1)', color:'var(--warning)', padding:'8px 12px', borderRadius:8, fontWeight:700 }}>W</div>
                <h3 className="serif" style={{ fontSize:18, color:'#fff' }}>Debilidades (Weaknesses)</h3>
              </div>
              <ul style={{ color:'#888', fontSize:13, paddingLeft:20, lineHeight:1.8 }}>
                <li>Alta curva de aprendizaje para gestores no técnicos.</li>
                <li>Dependencia total de conexión hacia la API en la nube.</li>
              </ul>
            </div>

            <div className="card" style={{ padding:24, borderTop:'3px solid #3498db' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                <div style={{ background:'rgba(52, 152, 219, 0.1)', color:'#3498db', padding:'8px 12px', borderRadius:8, fontWeight:700 }}>O</div>
                <h3 className="serif" style={{ fontSize:18, color:'#fff' }}>Oportunidades (Opportunities)</h3>
              </div>
              <ul style={{ color:'#888', fontSize:13, paddingLeft:20, lineHeight:1.8 }}>
                <li>Implementación de QRs para venta directa al estudiante.</li>
                <li>Escalabilidad a repositorio inter-institucional.</li>
                <li>Minado de datos de inventario predictivo.</li>
              </ul>
            </div>

            <div className="card" style={{ padding:24, borderTop:'3px solid var(--danger)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                <div style={{ background:'rgba(255, 71, 87, 0.1)', color:'var(--danger)', padding:'8px 12px', borderRadius:8, fontWeight:700 }}>T</div>
                <h3 className="serif" style={{ fontSize:18, color:'#fff' }}>Amenazas (Threats)</h3>
              </div>
              <ul style={{ color:'#888', fontSize:13, paddingLeft:20, lineHeight:1.8 }}>
                <li>Vulnerabilidad de los certificados QR a falsificación externa si no se firma con cifrado.</li>
                <li>Cambios constantes en la normativa APA internacional.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {tab === 'inv' && (
        <div className="card animate-fade" style={{ padding:32 }}>
          <h2 className="serif" style={{ fontSize:22, color:'#fff', marginBottom:20 }}>Reporte Analítico: Costos e Inventario Restock</h2>
          <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left', color:'#aaa', fontSize:14 }}>
            <thead>
              <tr style={{ borderBottom:'1px solid #222', color:'#fff' }}>
                <th style={{ padding:12 }}>Fecha</th>
                <th style={{ padding:12 }}>Obra (Referencia ID)</th>
                <th style={{ padding:12 }}>Rol Movimiento</th>
                <th style={{ padding:12 }}>Cant</th>
                <th style={{ padding:12 }}>Análisis Costo U.</th>
                <th style={{ padding:12 }}>Ponderado Total</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.map(t => (
                <tr key={t.idTransaccion} style={{ borderBottom:'1px solid #1a1a1a', background: t.tipo === 'Venta' ? 'rgba(46, 213, 115, 0.05)' : 'rgba(255, 255, 255, 0.02)' }}>
                  <td style={{ padding:12 }}>{new Date(t.fecha).toLocaleDateString()}</td>
                  <td style={{ padding:12 }}>Registro #{t.obra?.idObra || t.idObra || '?'}</td>
                  <td style={{ padding:12 }}><span className={`badge ${t.tipo==='Venta'?'success':'warning'}`}>{t.tipo}</span></td>
                  <td style={{ padding:12 }}>{t.cantidad}</td>
                  <td style={{ padding:12 }}>${parseFloat(t.costoUnitario).toFixed(2)}</td>
                  <td style={{ padding:12 }}>${parseFloat(t.costoTotal).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {transacciones.length===0 && <div style={{padding:20, textAlign:'center'}}>Sin data para reporte.</div>}
          <div style={{ marginTop:24, textAlign:'right' }}>
             <button className="btn btn-ghost" onClick={()=>window.print()}>🖨️ Exportar Documento PDF</button>
          </div>
        </div>
      )}
    </div>
  )
}
