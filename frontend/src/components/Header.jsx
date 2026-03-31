import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/AuthContext";
import {
  ChefHat,
  Cookie,
  CookingPot,
  Home,
  LayoutDashboard,
  Menu,
  Refrigerator,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserDropdown from "./UserDropdown";

function Header() {
  const { user } = useUser();

  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          {/* logo */}
          <Link to={user ? "/dashboard" : "/"} className="shrink-0">
            <img
              src="/orange_logo.png"
              alt="ChefSense"
              className="w-14 sm:w-18 md:w-20"
            />
          </Link>

          {/* desktop nav */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {user ? (
              <>
                {[
                  { to: "/dashboard", icon: LayoutDashboard, label: "Explore" },
                  { to: "/saved-recipes", icon: Cookie, label: "My Recipes" },
                  { to: "/pantry", icon: Refrigerator, label: "My Pantry" },
                  {
                    to: "/pantry-recipes",
                    icon: CookingPot,
                    label: "Pantry Recipes",
                  },
                ].map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs sm:text-sm font-medium transition ${
                        isActive
                          ? "text-brand-600 bg-brand-50"
                          : "text-stone-600 hover:bg-stone-100"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </NavLink>
                ))}
              </>
            ) : (
              <>
                {[
                  { to: "/", icon: Home, label: "Home" },
                  { to: "/how-it-works", icon: Cookie, label: "How it works" },
                  { to: "/about", icon: ChefHat, label: "About" },
                ].map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs sm:text-sm font-medium transition ${
                        isActive
                          ? "text-brand-600 bg-brand-50"
                          : "text-stone-600 hover:bg-stone-100"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </NavLink>
                ))}
              </>
            )}
          </div>

          {user && (
            <div className="hidden md:flex items-center ml-2">
              <SearchBar
                variant="compact"
                value={search}
                onChange={setSearch}
                placeholder="Search recipes..."
              />
            </div>
          )}

          {/* right side */}
          <div className="flex items-center gap-1 sm:gap-2">
            {user ? (
              <UserDropdown />
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/sign-in">
                  <Button
                    variant="secondary"
                    className="text-xs sm:text-sm rounded-full border-2 border-brand-300 px-3 sm:px-4 py-1.5"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button
                    variant="primary"
                    className="rounded-full px-4 sm:px-5 text-xs sm:text-sm py-1.5"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
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
          <div className="px-3 py-2 space-y-1">
            {user ? (
              <>
                {[
                  { to: "/dashboard", icon: LayoutDashboard, label: "Explore" },
                  { to: "/saved-recipes", icon: Cookie, label: "My Recipes" },
                  { to: "/pantry", icon: Refrigerator, label: "My Pantry" },
                  {
                    to: "/pantry-recipes",
                    icon: CookingPot,
                    label: "Pantry Recipes",
                  },
                ].map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "text-brand-600 bg-brand-50"
                          : "text-stone-700 hover:bg-stone-100"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </NavLink>
                ))}

                <div className="px-1 pt-1">
                  <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search recipes..."
                  />
                </div>
              </>
            ) : (
              <>
                {[
                  { to: "/", icon: Home, label: "Home" },
                  { to: "/how-it-works", icon: Cookie, label: "How it works" },
                  { to: "/about", icon: ChefHat, label: "About" },
                ].map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "text-brand-600 bg-brand-50"
                          : "text-stone-700 hover:bg-stone-100"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </NavLink>
                ))}
              </>
            )}

            {!user && (
              <div className="pt-2 mt-1 border-t border-stone-100 flex flex-col gap-2">
                <Link to="/sign-in">
                  <Button variant="secondary" className="w-full text-sm py-2">
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="primary" className="w-full text-sm py-2">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
