import { useState, useEffect } from 'react'
import { costosService } from '../services/costosService'
import { obraService } from '../services/obraService'

export default function CostosPage() {
  const [obras, setObras] = useState([])
  const [form, setForm] = useState({ idObra:'', stockActual:0, costoAnterior:120, nuevoCosto:80, cantidadNueva:10, margen:30 })
  const [resultado, setResultado] = useState(null)
  const [historial, setHistorial] = useState([])

  useEffect(() => {
    obraService.listar().then(r => setObras(r.data))
  }, [])

  const preCargar = (idObra) => {
    const obra = obras.find(o => o.idObra === parseInt(idObra))
    if (obra) setForm(f => ({ ...f, idObra, stockActual: obra.stock, costoAnterior: parseFloat(obra.precio) || 0 }))
  }

  const calcular = async (e) => {
    e.preventDefault()
    if(!form.idObra) return;
    const res = await costosService.calcularPVP(
      form.idObra || null, parseInt(form.stockActual),
      parseFloat(form.costoAnterior), parseFloat(form.nuevoCosto),
      parseInt(form.cantidadNueva), parseFloat(form.margen)
    )
    setResultado(res.data)
    const obra = obras.find(o => o.idObra === parseInt(form.idObra))
    setHistorial(h => [{ obra: obra?.titulo || '—', ant: form.costoAnterior,
                          nuevo: form.nuevoCosto, pvp: res.data.pvp, fecha: new Date().toLocaleDateString() }, ...h])
  }

  return (
    <div className="animate-fade page-padding">
      <div style={{ marginBottom:32 }}>
        <h1 className="serif" style={{ fontSize:32, color:'#fff', marginBottom:8 }}>Contabilidad de Costos</h1>
        <p style={{ color:'#888', fontSize:14 }}>Método Costo Promedio Ponderado · Motor Analítico</p>
      </div>

      <div className="responsive-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(400px, 1fr))', gap:32 }}>
        <div className="card" style={{ padding:32 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <div style={{ width:40, height:40, background:'#111', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #333' }}>📈</div>
            <div>
              <h3 className="serif" style={{ fontSize:20, color:'#fff' }}>Calculadora PVP</h3>
              <p style={{ fontSize:12, color:'#666' }}>Optimización matemática de precios unitarios</p>
            </div>
          </div>
          
          <form onSubmit={calcular}>
            <div style={{ marginBottom:16 }}>
              <label className="styled-label">Seleccionar obra literaria</label>
              <select className="styled-input" value={form.idObra} onChange={e => { setForm({...form, idObra:e.target.value}); preCargar(e.target.value) }} required>
                <option value="">— Seleccionar —</option>
                {obras.map(o => <option key={o.idObra} value={o.idObra}>{o.titulo} (Stock: {o.stock})</option>)}
              </select>
            </div>

            <div className="responsive-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
              {[
                ['Stock actual', 'stockActual', 'number'],
                ['Costo anterior ($)', 'costoAnterior', 'number'],
                ['Nuevo costo ($)', 'nuevoCosto', 'number'],
                ['Cantidad ingresada', 'cantidadNueva', 'number'],
                ['Margen utilidad (%)', 'margen', 'number'],
              ].map(([label, key, type]) => (
                <div key={key}>
                  <label className="styled-label">{label}</label>
                  <input className="styled-input" type={type} step="0.01" value={form[key]}
                    onChange={e => setForm({...form, [key]: e.target.value})} required />
                </div>
              ))}
            </div>

            <button type="submit" className="btn" style={{ width:'100%', padding:14 }}>Calcular Nuevo PVP Ajustado</button>
          </form>

          {resultado && (
            <div className="alert-success animate-fade" style={{ marginTop:24, background:'#111', borderLeft:'3px solid #fff', color:'#fff' }}>
              <div style={{ fontSize:10, textTransform:'uppercase', letterSpacing:1, color:'#888', marginBottom:4 }}>
                Nuevo Precio de Venta al Público Generado
              </div>
              <div className="serif" style={{ fontSize:32, color:'#fff', marginBottom:8 }}>
                ${parseFloat(resultado.pvp).toFixed(2)}
              </div>
              <div style={{ fontSize:12, color:'#666', fontFamily:'monospace', lineHeight:1.5 }}>
                {resultado.detalle}
              </div>
            </div>
          )}
        </div>

        <div className="card" style={{ padding:0 }}>
           <div style={{ padding:'20px 24px', borderBottom:'1px solid #222', background:'#111' }}>
             <h3 className="serif" style={{ fontSize:18, color:'#fff' }}>Historial de Ajustes</h3>
           </div>
           <div style={{ overflowX:'auto' }}>
             <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
               <thead>
                 <tr style={{ background:'#0a0a0a', borderBottom:'1px solid #222' }}>
                   {['Obra / Título','Antiguo','Ingreso', 'PVP Nuevo', 'Fecha'].map(h => (
                     <th key={h} style={{ padding:'12px 16px', fontSize:11, fontWeight:600, color:'#888', textTransform:'uppercase', letterSpacing:1 }}>{h}</th>
                   ))}
                 </tr>
               </thead>
               <tbody>
                 {historial.length === 0 ? (
                   <tr>
                     <td colSpan={5} style={{ padding:40, textAlign:'center', color:'#555', fontSize:14 }}>
                       Sin registros contables hoy.
                     </td>
                   </tr>
                 ) : historial.map((h, i) => (
                   <tr key={i} style={{ borderBottom:'1px solid #1a1a1a', transition:'background 0.2s', ':hover':{background:'#111'} }}>
                     <td style={{ padding:'16px', fontSize:13, color:'#e5e5e5' }}>{h.obra}</td>
                     <td style={{ padding:'16px', fontSize:12, color:'#888', fontFamily:'monospace' }}>${parseFloat(h.ant).toFixed(2)}</td>
                     <td style={{ padding:'16px', fontSize:12, color:'#888', fontFamily:'monospace' }}>${parseFloat(h.nuevo).toFixed(2)}</td>
                     <td style={{ padding:'16px', fontSize:14, color:'#fff', fontWeight:600 }}>${parseFloat(h.pvp).toFixed(2)}</td>
                     <td style={{ padding:'16px', fontSize:12, color:'#666' }}>{h.fecha}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  )
}
