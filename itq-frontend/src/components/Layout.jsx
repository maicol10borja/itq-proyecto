import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RoleGuard from '../guards/RoleGuard'
import { useState } from 'react'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const actMenu = () => {
    setIsOpen(false) // Close sidebar when navigating on mobile
  }

  return (
    <div className="layout-container">
      {/* OVERLAY PARA CELULARES */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(false)}
      ></div>

      {/* SIDEBAR ULTRA PREMIUM (MOBILE & DESKTOP) */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div style={{ position:'absolute', top:0, left:0, width:'100%', height:100, background:'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)', pointerEvents:'none' }} />

        <div style={{ padding: '32px 24px', zIndex:1 }}>
          <div className="serif" style={{ fontSize:28, color: '#fff', letterSpacing:-1 }}>
            ITQ<span style={{ color:'#888' }}>/</span>APP
          </div>
        </div>

        <div style={{ padding:'0 20px', margin:'0 16px 20px', background:'#111', border:'1px solid #222', borderRadius:8 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0' }}>
            <div style={{ width:32, height:32, borderRadius:16, background:'#fff', color:'#000', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14 }}>
              {user?.nombre?.charAt(0) || 'U'}
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>{user?.nombre}</div>
              <div style={{ fontSize:10, color:'#888', letterSpacing:1, textTransform:'uppercase' }}>{user?.rol}</div>
            </div>
          </div>
        </div>

        <nav style={{ flex:1, padding:'10px 12px', display:'flex', flexDirection:'column', gap:4, zIndex:1 }}>
          <div style={{ fontSize:10, fontWeight:600, color:'#555', letterSpacing:1.5, padding:'10px 12px', marginTop:10 }}>MAIN MENU</div>
          {[
            { to:'/dashboard',  label:'Dashboard',          icon:'⊞' },
            { to:'/obras',      label:'Obras & Catálogo',   icon:'📚' },
            { to:'/ranking',    label:'Ranking Global',     icon:'⭐' },
            { to:'/inventario', label:'Inventario',         icon:'📦', roles:['ADMIN','GESTOR'] },
            { to:'/costos',     label:'Motor de Costos',    icon:'📈', roles:['ADMIN','GESTOR'] },
            { to:'/validacion', label:'Validación APA',     icon:'✓', roles:['ADMIN','ACADEMICO'] },
            { to:'/usuarios',   label:'Usuarios',           icon:'👥', roles:['ADMIN'] },
            { to:'/reportes',   label:'Reportes',           icon:'📄', roles:['ADMIN','GESTOR'] },
          ].map(item => {
            if (item.roles) {
              return (
                <RoleGuard key={item.to} roles={item.roles}>
                  <NavItem to={item.to} icon={item.icon} label={item.label} onClick={actMenu} />
                </RoleGuard>
              )
            }
            return <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} onClick={actMenu} />
          })}
        </nav>

        <div style={{ padding: 24, zIndex:1 }}>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ width:'100%', border:'1px solid #333' }}>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        
        {/* HAMBURGUESA SOLO PARA CELULARES */}
        <div className="mobile-toggle">
          <button className="btn btn-ghost" style={{ padding: '8px 12px', background: '#111', border: '1px solid #333' }} onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
          <div className="serif" style={{ fontSize: 20, color: '#fff', marginLeft: 16 }}>
            ITQ<span style={{ color:'#888' }}>/</span>APP
          </div>
        </div>

        {/* Subtle noise/gradient background */}
        <div style={{ position:'absolute', top:'-10%', right:'-10%', width:'60%', height:'60%', background:'radial-gradient(circle, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 70%)', filter:'blur(80px)', zIndex:0, pointerEvents:'none' }}></div>
        
        <div style={{ position:'relative', zIndex:1, minHeight:'100vh', padding: '16px' }}>
          <div style={{ background:'#0A0A0A', border:'1px solid #1a1a1a', borderRadius:16, minHeight:'calc(100vh - 32px)', overflow:'hidden' }}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

function NavItem({ to, icon, label, onClick }) {
  return (
    <NavLink to={to} onClick={onClick} style={({ isActive }) => ({
      display:'flex', alignItems:'center', gap:12,
      padding:'10px 14px', fontSize:13, fontWeight:500,
      textDecoration:'none', borderRadius: 6,
      color: isActive ? '#fff' : '#888',
      background: isActive ? '#1a1a1a' : 'transparent',
      transition: 'all 0.2s ease',
      border: isActive ? '1px solid #333' : '1px solid transparent'
    })}>
      <span style={{ fontSize:15, opacity:0.8 }}>{icon}</span> {label}
    </NavLink>
  )
}
