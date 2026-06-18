import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, User } from 'lucide-react'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-dvh bg-nordic-cream">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/90 backdrop-blur-xl border-t border-nordic-stone/40 flex justify-around py-2 pb-[max(8px,env(safe-area-inset-bottom))] z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-[10px] font-medium transition-all duration-200 ${
              isActive
                ? 'text-nordic-moss bg-nordic-moss/8 scale-105'
                : 'text-nordic-slate hover:text-nordic-charcoal'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/encyclopedia"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-[10px] font-medium transition-all duration-200 ${
              isActive
                ? 'text-nordic-moss bg-nordic-moss/8 scale-105'
                : 'text-nordic-slate hover:text-nordic-charcoal'
            }`
          }
        >
          <BookOpen size={20} />
          <span>Encyclopedia</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-[10px] font-medium transition-all duration-200 ${
              isActive
                ? 'text-nordic-moss bg-nordic-moss/8 scale-105'
                : 'text-nordic-slate hover:text-nordic-charcoal'
            }`
          }
        >
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  )
}
