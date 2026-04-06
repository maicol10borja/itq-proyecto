import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ email:'', password:'', nombre:'', rol:'ESTUDIANTE' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales incorrectas')
    }
  }

  const quickLogin = async (rol) => {
    const mapa = {
      ADMIN: { email:'admin@itq.edu.ec', password:'123456' },
      ACADEMICO: { email:'academico@itq.edu.ec', password:'123456' },
      GESTOR: { email:'gestor@itq.edu.ec', password:'123456' },
      ESTUDIANTE: { email:'estudiante@itq.edu.ec', password:'123456' }
    }
    try {
      await login(mapa[rol].email, mapa[rol].password)
      navigate('/dashboard')
    } catch (err) {
      setError('Error de acceso rápido')
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#050505', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
      
      {/* Cool background gradients */}
      <div style={{ position:'absolute', top:'-10%', left:'-10%', width:'50%', height:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)', filter:'blur(60px)', zIndex:0 }}></div>
      <div style={{ position:'absolute', bottom:'-10%', right:'-10%', width:'50%', height:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 70%)', filter:'blur(60px)', zIndex:0 }}></div>

      <div className="card animate-fade" style={{ width:420, padding:'48px 40px', zIndex:1, background:'rgba(10,10,10,0.8)', backdropFilter:'blur(20px)' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div className="serif" style={{ fontSize:42, color:'#fff', lineHeight:1 }}>ITQ<span style={{color:'#666'}}>.</span></div>
          <div style={{ fontSize:10, color:'#888', letterSpacing:3, textTransform:'uppercase', marginTop:8 }}>
            Repositorio Ultra · V2.0
          </div>
        </div>

        {error && <div className="alert-error" style={{ marginBottom:20 }}>{error}</div>}

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom:16 }}>
              <label className="styled-label">Dirección Email</label>
              <input className="styled-input" type="email" placeholder="usuario@itq.edu.ec" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
            </div>
            <div style={{ marginBottom:24 }}>
              <label className="styled-label">Contraseña de red</label>
              <input className="styled-input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required />
            </div>
            <button type="submit" className="btn" style={{ width:'100%', padding:'14px' }}>
              Autenticar Sesión <span style={{marginLeft:4}}>→</span>
            </button>
          </form>
        ) : (
          <RegisterForm onSuccess={() => setTab('login')} />
        )}

        <div style={{ marginTop:28, paddingTop:24, borderTop:'1px solid #222' }}>
          <p style={{ fontSize:10, color:'#666', textAlign:'center', marginBottom:12, letterSpacing:1 }}>ACCESO RÁPIDO DEVELOPER</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {['ADMIN','ACADEMICO','GESTOR','ESTUDIANTE'].map(r => (
              <button key={r} onClick={() => quickLogin(r)} className="btn btn-ghost" style={{ fontSize:10, padding:'8px', boxSizing:'border-box' }}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div style={{ textAlign:'center', marginTop:24 }}>
          <button onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
            style={{ background:'none', border:'none', cursor:'pointer', fontSize:12, color:'#888', transition:'0.2s', textDecoration:'underline', textUnderlineOffset:4 }}>
            {tab === 'login' ? 'Solicitar nueva cuenta' : 'Volver al acceso principal'}
          </button>
        </div>
      </div>
    </div>
  )
}

function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({ nombre:'', email:'', password:'', rol:'ESTUDIANTE' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const api = (await import('../services/api')).default
      await api.post('/auth/register', form)
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el sistema de registro')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade">
      {error && <div className="alert-error" style={{marginBottom:16}}>{error}</div>}
      
      <div style={{ marginBottom:12 }}>
        <label className="styled-label">Nombre Completo</label>
        <input className="styled-input" value={form.nombre} onChange={e => setForm({...form, nombre:e.target.value})} required />
      </div>
      <div style={{ marginBottom:12 }}>
        <label className="styled-label">Email ITQ</label>
        <input className="styled-input" type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
      </div>
      <div style={{ marginBottom:12 }}>
        <label className="styled-label">Contraseña Segura</label>
        <input className="styled-input" type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required />
      </div>
      <div style={{ marginBottom:20 }}>
        <label className="styled-label">Nivel de Acceso</label>
        <select className="styled-input" value={form.rol} onChange={e => setForm({...form, rol:e.target.value})}>
          <option value="ESTUDIANTE">ESTUDIANTE (Base)</option>
          <option value="ACADEMICO">ACADÉMICO (Revisor)</option>
          <option value="GESTOR">GESTOR (Bodega)</option>
          <option value="ADMIN">ADMINISTRADOR IT</option>
        </select>
      </div>

      <button type="submit" className="btn" style={{ width:'100%', padding:'12px' }}>
        Registrar en Blockchain Interna
      </button>
    </form>
  )
}
