import React from "react";
import { Link } from "react-router-dom";
import { Img as Image } from "@/components/ui/img";
// import { useState } from "react";
import { LayoutDashboard, Cookie, Refrigerator } from "lucide-react";
import { Button } from "@/components/ui/button";

function Header() {
  //   const [isSignedIn, setIsSignedIn] = useState(false);

  const isSignedIn = false; // Placeholder for authentication state

  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-white/70 backdrop-blur-md z-50 ">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO: Clicking this takes you Home (or Dashboard if logged in) */}

        <Link
          to={isSignedIn ? "/dashboard" : "/"}
          className="flex items-center gap-2 group"
        >
          <Image
            src="/orange-logo.png"
            alt="ChefSense Logo"
            width={100}
            height={100}
            className="w-14 sm:w-20 "
          />
        </Link>

        {/* MAIN NAV: Only visible on Tablets and Desktops (hidden on Mobile) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
          {isSignedIn && (
            <Link
              to="/dashboard"
              className="hover:text-brand-600 transition-colors flex gap-1.5 items-center"
            >
              <LayoutDashboard className="w-4 h-4" />
              Explore
            </Link>
          )}
          <Link
            to="/recipes"
            className="hover:text-brand-600 transition-colors flex gap-1.5 items-center"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            to="/pantry"
            className="hover:text-brand-600 transition-colors flex gap-1.5 items-center"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>

        {/* RIGHT SIDE: Action Buttons (Login/Signup or User Profile) */}
        <div className="flex items-center space-x-4">
          {/* IF NOT LOGGED IN: Show Sign In / Get Started buttons */}
          <>
            <Link to="/sign-in">
              <Button
                variant="ghost"
                className="text-stone-600 hover:text-brand-600 hover:bg-brand-50 font-medium"
              >
                Sign In
              </Button>
            </Link>

            <Link to="/sign-up">
              <Button variant="primary" className="rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </>
        </div>
      </nav>
    </header>
  );
}

export default Header;
