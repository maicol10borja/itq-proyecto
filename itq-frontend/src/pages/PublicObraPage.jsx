import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obraService } from '../services/obraService'

export default function PublicObraPage() {
  const { isbn } = useParams()
  const [obra, setObra] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    obraService.buscarPorIsbn(isbn)
      .then(r => {
        if (r.data) setObra(r.data)
        else setError('La obra no se encuentra en el repositorio oficial.')
      })
      .catch(() => setError('Error al consultar el repositorio.'))
      .finally(() => setLoading(false))
  }, [isbn])

  if (loading) return <div style={{ padding:40, textAlign:'center', color:'#fff', background:'#050505', minHeight:'100vh' }}>Verificando en Blockchain del Repositorio...</div>
  if (error) return (
    <div style={{ padding:40, textAlign:'center', background:'#050505', minHeight:'100vh' }}>
      <div className="card" style={{ maxWidth:500, margin:'0 auto', padding:40 }}>
        <h2 className="serif" style={{ color:'var(--danger)', fontSize:24, marginBottom:16 }}>Registro Inválido</h2>
        <p style={{ color:'#888' }}>{error}</p>
        <Link to="/login" className="btn btn-ghost" style={{ marginTop:24 }}>Volver al portal principal</Link>
      </div>
    </div>
  )

  return (
    <div style={{ padding:40, background:'#050505', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="card animate-fade page-padding" style={{ maxWidth:600, width:'100%', padding:40, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:0, left:0, height:4, width:'100%', background: obra.estadoActual === 'Publicado' ? 'var(--success)' : 'var(--warning)' }}></div>
        
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div className="serif" style={{ fontSize:28, color:'#fff' }}>CERTIFICADO DE OBRA</div>
          <p style={{ fontSize:12, color:'#666', letterSpacing:2 }}>Instituto Superior Tecnológico Quito</p>
        </div>

        <div style={{ border:'1px solid #222', borderRadius:8, padding:24, background:'#111', marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'space-between', borderBottom:'1px solid #222', paddingBottom:16, marginBottom:16 }}>
            <div>
              <div style={{ fontSize:10, color:'#666', textTransform:'uppercase', letterSpacing:1 }}>Título Oficial</div>
              <div className="serif" style={{ fontSize:20, color:'#fff', marginTop:4 }}>{obra.titulo}</div>
            </div>
          </div>
          
          <div className="responsive-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div>
              <div style={{ fontSize:10, color:'#666', textTransform:'uppercase', letterSpacing:1 }}>Autor</div>
              <div style={{ fontSize:14, color:'#e5e5e5', marginTop:4 }}>{obra.autor}</div>
            </div>
            <div>
              <div style={{ fontSize:10, color:'#666', textTransform:'uppercase', letterSpacing:1 }}>Año de Publicación</div>
              <div style={{ fontSize:14, color:'#e5e5e5', marginTop:4 }}>{obra.anioPublicacion}</div>
            </div>
            <div>
              <div style={{ fontSize:10, color:'#666', textTransform:'uppercase', letterSpacing:1 }}>Registro ISBN-13</div>
              <div style={{ fontSize:14, color:'#e5e5e5', fontFamily:'monospace', marginTop:4 }}>{obra.isbn}</div>
            </div>
            <div>
              <div style={{ fontSize:10, color:'#666', textTransform:'uppercase', letterSpacing:1 }}>Estado de Auditoría</div>
              <div style={{ marginTop:4 }}><span className={`badge ${obra.estadoActual === 'Publicado' ? 'success' : 'warning'}`}>{obra.estadoActual}</span></div>
            </div>
          </div>
        </div>

        <div style={{ textAlign:'center' }}>
          <Link to="/login" className="btn btn-ghost">Ingresar al Sistema Privado</Link>
        </div>
      </div>
    </div>
  )
}
