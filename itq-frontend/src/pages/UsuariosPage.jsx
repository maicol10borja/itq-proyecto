import { useState, useEffect } from 'react'
import api from '../services/api'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [form, setForm] = useState({ nombre:'', email:'', password:'', rol:'ESTUDIANTE' })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    try {
      const res = await api.get('/auth/usuarios')
      setUsuarios(res.data)
    } catch(err) {
      console.error(err)
    }
  }

  const crearUsuario = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/usuarios', form)
      setMsg('✅ Usuario creado exitosamente.')
      setForm({ nombre:'', email:'', password:'', rol:'ESTUDIANTE' })
      cargarUsuarios()
    } catch(err) {
      setMsg('❌ Error al crear usuario.')
    }
  }

  return (
    <div style={{ padding:40 }} className="animate-fade">
      <div style={{ marginBottom:32 }}>
        <h1 className="serif" style={{ fontSize:32, color:'#fff', marginBottom:8 }}>Gestión de Personal y Cuentas</h1>
        <p style={{ color:'#888', fontSize:14 }}>Administración de Accesos al Repositorio TI</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(360px, 1fr))', gap:32 }}>
        
        <div className="card" style={{ padding:32, alignSelf:'start' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <div style={{ width:40, height:40, background:'#111', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #333' }}>👤</div>
            <div>
              <h3 className="serif" style={{ fontSize:20, color:'#fff' }}>Registrar Nuevo Acceso</h3>
              <p style={{ fontSize:12, color:'#666' }}>Las contraseñas se encriptarán automáticamente</p>
            </div>
          </div>
          
          <form onSubmit={crearUsuario}>
            <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:24 }}>
              <div>
                <label className="styled-label">Nombre Completo</label>
                <input className="styled-input" required value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} />
              </div>
              <div>
                <label className="styled-label">Correo Institucional</label>
                <input className="styled-input" type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div>
                  <label className="styled-label">Contraseña</label>
                  <input className="styled-input" type="password" required value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
                </div>
                <div>
                  <label className="styled-label">Asignar Rol</label>
                  <select className="styled-input" value={form.rol} onChange={e=>setForm({...form, rol:e.target.value})}>
                    <option value="ESTUDIANTE">ESTUDIANTE</option>
                    <option value="ACADEMICO">ACADEMICO</option>
                    <option value="GESTOR">GESTOR BODEGA</option>
                    <option value="ADMIN">ADMINISTRADOR</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button type="submit" className="btn" style={{ width:'100%', padding:12 }}>Autorizar Cuenta</button>
            {msg && <div style={{marginTop:16, fontSize:13, color:msg.includes('❌')?'#ff4757':'#2ed573'}}>{msg}</div>}
          </form>
        </div>

        <div className="card" style={{ padding:0 }}>
           <div style={{ padding:'20px 24px', borderBottom:'1px solid #222', background:'#111' }}>
             <h3 className="serif" style={{ fontSize:18, color:'#fff' }}>Usuarios Activos</h3>
           </div>
           <div style={{ padding:20, display:'flex', flexDirection:'column', gap:12 }}>
             {usuarios.map(u => (
               <div key={u.idUsuario} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px', background:'rgba(255,255,255,0.02)', border:'1px solid #222', borderRadius:8 }}>
                 <div>
                   <h4 style={{ margin:0, color:'#fff', fontSize:14 }}>{u.nombre}</h4>
                   <p style={{ margin:0, color:'#888', fontSize:12, marginTop:4 }}>{u.email}</p>
                 </div>
                 <div className="badge" style={{ background: u.rol==='ADMIN'?'var(--danger)':'#111', color: u.rol==='ADMIN'?'#fff':'#888' }}>
                   {u.rol}
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  )
}
