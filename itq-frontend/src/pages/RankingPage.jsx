import { useState, useEffect } from 'react'
import { obraService } from '../services/obraService'

export default function RankingPage() {
  const [obras, setObras] = useState([])

  useEffect(() => {
    // Simulamos un ranking basado en stock y precio
    obraService.listar().then(r => {
      const arr = r.data.sort((a,b) => (b.stock * b.precio) - (a.stock * a.precio))
      setObras(arr)
    })
  }, [])

  return (
    <div style={{ maxWidth:900, margin:'0 auto' }} className="animate-fade page-padding">
      <div style={{ textAlign:'center', marginBottom:48 }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🏆</div>
        <h1 className="serif" style={{ fontSize:36, color:'#fff', marginBottom:8 }}>Ranking Literario ITQ</h1>
        <p style={{ fontSize:14, color:'#888' }}>Las obras de mayor relevancia por índice de demanda y rotación</p>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
        {obras.map((o, idx) => (
          <div key={o.idObra} className="card responsive-card" style={{
            transform: idx === 0 ? 'scale(1.03)' : 'none', 
            background: idx === 0 ? 'rgba(255,255,255,0.02)' : 'var(--bg-card)',
            borderLeft: idx === 0 ? '4px solid #fff' : (idx === 1 ? '4px solid #aaa' : (idx === 2 ? '4px solid #666' : '1px solid var(--border)')),
            zIndex: idx === 0 ? 10 : 1
          }}>
            <div className="serif" style={{ fontSize: idx === 0 ? 42 : 28, fontWeight:900, color: idx < 3 ? '#fff' : '#444', width:60, textAlign:'center' }}>
              #{idx + 1}
            </div>
            
            <div style={{ flex:1, marginLeft:24 }}>
              <h3 className="serif" style={{ fontSize: idx === 0 ? 24 : 18, color:'#fff', marginBottom:6 }}>{o.titulo}</h3>
              <p style={{ fontSize:13, color:'#888', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color:'#ccc' }}>{o.autor}</span> • <span className="badge" style={{ background:'#111', border:'1px solid #333', color:'#888' }}>{o.carreraRelacionada || 'General'}</span>
              </p>
            </div>
            
            <div style={{ textAlign:'right' }}>
              <div style={{ color:'#fff', fontSize:18, letterSpacing:4, marginBottom:6, textShadow:'0 0 10px rgba(255,255,255,0.4)' }}>
                {'★'.repeat(Math.max(1, 5 - Math.floor(idx/2)))}
                <span style={{color:'#222'}}>{'★'.repeat(Math.max(0, Math.floor(idx/2)))}</span>
              </div>
              <div style={{ fontSize:12, color:'#666', background:'#111', padding:'4px 10px', borderRadius:20, display:'inline-block' }}>
                Índice Valor: <strong>{o.stock * 10}</strong>
              </div>
            </div>
          </div>
        ))}
        
        {obras.length === 0 && (
          <div style={{ textAlign:'center', padding:60, color:'#555', border:'1px dashed #333', borderRadius:8 }}>
            Evaluando el repositorio... no hay obras registrables aún.
          </div>
        )}
      </div>
    </div>
  )
}
