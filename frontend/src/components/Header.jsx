import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext'
import { Cookie, LayoutDashboard, Menu, Refrigerator, X } from 'lucide-react'
import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserDropdown from './UserDropdown'

const PUBLIC_NAV_LINKS = [
  { id: 1, to: '/', icon: LayoutDashboard, label: 'Explore' },
  { id: 2, to: '/sign-in', icon: Cookie, label: 'My Recipes' },
  { id: 3, to: '/sign-in', icon: Refrigerator, label: 'My Pantry' },
]

const PRIVATE_NAV_LINKS = [
  { id: 1, to: '/dashboard', icon: LayoutDashboard, label: 'Explore' },
  { id: 2, to: '/saved-recipes', icon: Cookie, label: 'My Recipes' },
  { id: 3, to: '/pantry', icon: Refrigerator, label: 'My Pantry' },
]

function Header() {
  const { user } = useContext(AuthContext)

  const [mobileOpen, setMobileOpen] = useState(false)

  const currentNavLinks = user ? PRIVATE_NAV_LINKS : PUBLIC_NAV_LINKS

  return (
    <header className="fixed top-0 w-full z-50">
      {/* main bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* logo */}
          <Link to={user ? '/dashboard' : '/'} className="shrink-0">
            <img
              src="/orange-logo.png"
              alt="ChefSense"
              className="w-16 sm:w-20"
            />
          </Link>

          {/* desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {currentNavLinks.map(({ id, to, icon: Icon, label }) => (
              <NavLink
                key={id}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>

          {/* right side */}
          <div className="flex items-center gap-2">
            {user ? (
              <UserDropdown />
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/sign-in">
                  <Button
                    variant="ghost"
                    className="text-stone-600 hover:text-stone-900 font-medium"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="primary" className="rounded-full px-5">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {currentNavLinks.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}

            {!user && (
              <div className="pt-3 mt-1 border-t border-stone-100 flex flex-col gap-2">
                <Link to="/sign-in" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-brand-50"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
