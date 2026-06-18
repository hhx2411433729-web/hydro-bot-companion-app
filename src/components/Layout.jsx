import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, User } from 'lucide-react'

export default function Layout() {
  return (
    <div className="app-layout">
      <main className="main-content">
        <Outlet />
      </main>
      <nav className="bottom-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={22} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/encyclopedia" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BookOpen size={22} />
          <span>Encyclopedia</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <User size={22} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  )
}
