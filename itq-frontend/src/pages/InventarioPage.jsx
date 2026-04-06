import { useState, useEffect } from 'react'
import { inventarioService } from '../services/inventarioService'
import { obraService } from '../services/obraService'
import { useAuth } from '../context/AuthContext'

export default function InventarioPage() {
  const [obras, setObras] = useState([])
  const [transacciones, setTransacciones] = useState([])
  const [tab, setTab] = useState('compra')
  const { user } = useAuth()
  const [form, setForm] = useState({ idObra:'', cantidad:1, monto:0 })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = () => {
    obraService.listar().then(r => setObras(r.data))
    inventarioService.transacciones().then(r => setTransacciones(r.data))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      if(tab === 'compra') {
        await inventarioService.registrarCompra(form.idObra, user.idUsuario, form.cantidad, form.monto)
        setMsg('Compra registrada ✓ Stock actualizado en bodega.')
      } else {
        await inventarioService.registrarVenta(form.idObra, user.idUsuario, form.cantidad, form.monto)
        setMsg('Venta registrada ✓ Stock deducido correctamente.')
      }
      cargarDatos()
      setForm({ ...form, cantidad: 1, monto: 0 })
    } catch(err) {
      setMsg(err.response?.data?.error || 'Error transversal en la transacción.')
    }
  }

  return (
    <div style={{ padding:40 }} className="animate-fade">
      <div style={{ marginBottom:32 }}>
        <h1 className="serif" style={{ fontSize:32, color:'#fff', marginBottom:8 }}>Bodega e Inventario</h1>
        <p style={{ color:'#888', fontSize:14 }}>Registro de entradas y salidas de obras</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(360px, 1fr))', gap:32 }}>
        
        <div className="card" style={{ padding:0, alignSelf:'start' }}>
          <div style={{ display:'flex', borderBottom:'1px solid #222' }}>
            <button className={`btn-ghost ${tab==='compra' ? 'active-tab' : ''}`} onClick={()=>setTab('compra')} style={{ flex:1, padding:16, border:'none', borderRadius:0, borderBottom: tab==='compra' ? '2px solid #fff' : '2px solid transparent', color: tab==='compra'?'#fff':'#666', background: tab==='compra'?'#111':'transparent' }}>Ingreso (Compra)</button>
            <button className={`btn-ghost ${tab==='venta' ? 'active-tab' : ''}`} onClick={()=>setTab('venta')} style={{ flex:1, padding:16, border:'none', borderLeft:'1px solid #222', borderRadius:0, borderBottom: tab==='venta' ? '2px solid #fff' : '2px solid transparent', color: tab==='venta'?'#fff':'#666', background: tab==='venta'?'#111':'transparent' }}>Salida (Venta)</button>
          </div>
          
          <div style={{ padding:24 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom:16 }}>
                <label className="styled-label">Obra Literaria Catalogada</label>
                <select className="styled-input" value={form.idObra} onChange={e=>setForm({...form, idObra:e.target.value})} required>
                  <option value="">— Seleccionar Obra —</option>
                  {obras.map(o=><option key={o.idObra} value={o.idObra}>{o.titulo} (Stock local: {o.stock})</option>)}
                </select>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
                <div>
                  <label className="styled-label">Cantidad (Uds.)</label>
                  <input className="styled-input" type="number" min="1" value={form.cantidad} onChange={e=>setForm({...form, cantidad:e.target.value})} required />
                </div>
                <div>
                  <label className="styled-label">{tab === 'compra' ? 'Costo de Adquisición' : 'Cobro Cliente'}</label>
                  <input className="styled-input" type="number" step="0.01" value={form.monto} onChange={e=>setForm({...form, monto:e.target.value})} required />
                </div>
              </div>
              
              <button type="submit" className="btn" style={{ width:'100%', padding:14 }}>
                {tab === 'compra' ? 'Registrar Lote Entrante' : 'Procesar Venta'}
              </button>
              
              {msg && (
                <div className={msg.includes('Error') ? 'alert-error animate-fade' : 'alert-success animate-fade'} style={{ marginTop:20 }}>
                  {msg}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="card" style={{ padding:0 }}>
           <div style={{ padding:'20px 24px', borderBottom:'1px solid #222', background:'#111' }}>
             <h3 className="serif" style={{ fontSize:18, color:'#fff' }}>Bitácora de Movimientos</h3>
           </div>
           <div style={{ overflowX:'auto', maxHeight:'600px' }}>
             <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
               <thead style={{ position:'sticky', top:0, background:'#0a0a0a', zIndex:1 }}>
                 <tr style={{ borderBottom:'1px solid #222' }}>
                   {['Transacción', 'Obra', 'Volumen', 'Monto'].map(h =>(
                     <th key={h} style={{ padding:'12px 16px', fontSize:11, fontWeight:600, color:'#888', textTransform:'uppercase', letterSpacing:1 }}>{h}</th>
                   ))}
                 </tr>
               </thead>
               <tbody>
                 {transacciones.map(t=>(
                   <tr key={t.idTransaccion} style={{ borderBottom:'1px solid #1a1a1a' }}>
                     <td style={{ padding:'16px' }}>
                       <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                         <span className={`badge ${t.tipo==='Compra'?'success':'warning'}`}>{t.tipo}</span>
                         <span style={{ fontSize:11, color:'#555', fontFamily:'monospace' }}>#{t.idTransaccion}</span>
                       </div>
                       <div style={{ fontSize:11, color:'#666', marginTop:4 }}>{new Date(t.fecha).toLocaleString()}</div>
                     </td>
                     <td style={{ padding:'16px', fontSize:13, color:'#e5e5e5' }}>{obras.find(o=>o.idObra===t.idObra)?.titulo || t.idObra}</td>
                     <td style={{ padding:'16px', fontSize:14 }}>{t.cantidad} <span style={{fontSize:10, color:'#666'}}>ud.</span></td>
                     <td style={{ padding:'16px', fontSize:13, fontFamily:'monospace', color:'#fff' }}>${parseFloat(t.precioUnitario).toFixed(2)}</td>
                   </tr>
                 ))}
                 {transacciones.length===0 && <tr><td colSpan={4} style={{padding:40, textAlign:'center', color:'#555', fontSize:14}}>Bodega sin movimientos.</td></tr>}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  )
}
