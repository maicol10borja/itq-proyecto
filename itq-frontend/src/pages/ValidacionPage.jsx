import { useState } from 'react'
import { validacionService } from '../services/validacionService'

export default function ValidacionPage() {
  const [isbn, setIsbn] = useState('')
  const [isbnRes, setIsbnRes] = useState(null)
  const [apa, setApa] = useState({ autor:'', anio:'', titulo:'', editorial:'', isbn:'' })
  const [apaRes, setApaRes] = useState(null)

  const validarISBN = async () => {
    const res = await validacionService.validarISBN(isbn)
    setIsbnRes(res.data)
  }

  const validarAPA = async (e) => {
    e.preventDefault()
    const res = await validacionService.validarAPA(apa.autor, apa.anio, apa.titulo, apa.editorial, apa.isbn)
    setApaRes(res.data)
  }

  return (
    <div style={{ maxWidth:1200, margin:'0 auto' }} className="animate-fade page-padding">
      <div style={{ marginBottom:32 }}>
        <h1 className="serif" style={{ fontSize:32, color:'#fff', marginBottom:8 }}>Validación Académica</h1>
        <p style={{ color:'#888', fontSize:14 }}>Sistemas de validación estructural para publicaciones y registros literarios.</p>
      </div>
      
      <div className="responsive-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(400px, 1fr))', gap:32 }}>

        {/* ISBN */}
        <div className="card" style={{ padding:32 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <div style={{ width:40, height:40, background:'#111', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #333' }}>📚</div>
            <div>
              <h3 className="serif" style={{ fontSize:20, color:'#fff' }}>Validador ISBN-13</h3>
              <p style={{ fontSize:12, color:'#666' }}>Algoritmo checksum ponderado (13 dígitos)</p>
            </div>
          </div>
          
          <div style={{ marginBottom:16 }}>
            <label className="styled-label">Código ISBN-13</label>
            <input className="styled-input" value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="Ej. 9780133943030" maxLength={17} />
          </div>
          <button className="btn" onClick={validarISBN} style={{ width:'100%' }}>Validar Checksum del ISBN</button>
          
          {isbnRes && (
            <div className={isbnRes.valido ? 'alert-success animate-fade' : 'alert-error animate-fade'} style={{ marginTop:20 }}>
              <div style={{ fontWeight:600, marginBottom:4 }}>{isbnRes.valido ? '✓ Validación Exitosa' : '✕ Error de Checksum'}</div>
              <div style={{ opacity:0.8 }}>{isbnRes.mensaje}</div>
            </div>
          )}
        </div>

        {/* APA */}
        <div className="card" style={{ padding:32 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <div style={{ width:40, height:40, background:'#111', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #333' }}>✍️</div>
            <div>
              <h3 className="serif" style={{ fontSize:20, color:'#fff' }}>Generador Norma APA</h3>
              <p style={{ fontSize:12, color:'#666' }}>Estructura APA 7ª Edición</p>
            </div>
          </div>
          
          <form onSubmit={validarAPA}>
            <div className="responsive-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
              <div>
                <label className="styled-label">Autor (Apellido, N.)</label>
                <input className="styled-input" value={apa.autor} onChange={e => setApa({...apa, autor:e.target.value})} required />
              </div>
              <div>
                <label className="styled-label">Año</label>
                <input className="styled-input" type="number" value={apa.anio} onChange={e => setApa({...apa, anio:e.target.value})} required />
              </div>
            </div>
            <div style={{ marginBottom:12 }}>
              <label className="styled-label">Título de la Obra</label>
              <input className="styled-input" value={apa.titulo} onChange={e => setApa({...apa, titulo:e.target.value})} required />
            </div>
            <div className="responsive-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
              <div>
                <label className="styled-label">Editorial</label>
                <input className="styled-input" value={apa.editorial} onChange={e => setApa({...apa, editorial:e.target.value})} />
              </div>
              <div>
                <label className="styled-label">ISBN</label>
                <input className="styled-input" value={apa.isbn} onChange={e => setApa({...apa, isbn:e.target.value})} />
              </div>
            </div>
            <button type="submit" className="btn btn-ghost" style={{ width:'100%', borderColor:'#555', color:'#fff' }}>Generar Cita Formal</button>
          </form>

          {apaRes && (
            <div className={`animate-fade ${apaRes.valido ? 'alert-success' : 'alert-error'}`} style={{ marginTop:20 }}>
              <div style={{ fontWeight:600, marginBottom:8 }}>{apaRes.mensaje}</div>
              {apaRes.cita && (
                <div style={{ background:'#000', border:'1px solid #333', padding:'12px', borderRadius:6, fontFamily:'monospace', color:'#aaa', fontSize:12, lineHeight:1.5 }}>
                  {apaRes.cita}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
