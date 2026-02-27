import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, Cookie, Refrigerator, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/dashboard", label: "Explore", icon: LayoutDashboard, authOnly: true },
  { to: "/recipes", label: "My Recipes", icon: Cookie },
  { to: "/pantry", label: "My Pantry", icon: Refrigerator },
];

function Header() {
  const isSignedIn = false;
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleLinks = navLinks.filter((link) => !link.authOnly || isSignedIn);

  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-white/90 backdrop-blur-md z-50">
      <nav className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={isSignedIn ? "/dashboard" : "/"} className="shrink-0">
          <img
            src="/orange-logo.png"
            alt="ChefSense Logo"
            className="w-16 sm:w-20 lg:w-24"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 transition-colors ${
                  isActive ? "text-brand-600" : "hover:text-brand-600"
                }`
              }
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/sign-in">
              <Button
                variant="ghost"
                className="text-stone-600 hover:text-brand-600 font-medium"
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

          {/* Mobile menu button */}
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
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white">
          <div className="px-5 py-3 space-y-1">
            {visibleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-600 bg-brand-50"
                      : "text-stone-700 hover:bg-stone-100"
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            ))}

            {/* Mobile auth buttons */}
            <div className="pt-3 mt-2 border-t border-stone-200 flex flex-col gap-2">
              <Link to="/sign-in" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
