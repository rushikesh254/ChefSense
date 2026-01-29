import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

import { Cookie } from "lucide-react";
import { Refrigerator } from "lucide-react";

const Header = () => {
  const user = false;
  const isSignedIn = true;
  const isLoaded = true;

  /**
   * LOADING STATE
   * If we don't know yet if the user is logged in (checking cookies),
   */
  if (!isLoaded) {
    return (
      <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="w-16 h-8 bg-stone-200 animate-pulse rounded" />
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">



        
        {/* LOGO: Clicking this takes you Home (or Dashboard if logged in) */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 group"
        >
          <Image
            src="/orange-logo.svg"
            alt="ChefSense Logo"
            width={66}
            height={66}
            className="w-20"
          />
        </Link>

        {/* MAIN NAV: Only visible on Tablets and Desktops (hidden on Mobile) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
          <Link
            href="/recipes"
            className="hover:text-orange-600 transition-colors flex gap-1.5 items-center"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="hover:text-orange-600 transition-colors flex gap-1.5 items-center"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>

        {/* RIGHT SIDE: Action Buttons (Login/Signup or User Profile) */}
        <div className="flex items-center space-x-4">
          {/* <HowToCookModal /> */}

          {isSignedIn && user ? (
            // IF LOGGED IN: Show Subscription Badge + User Avatar
            <>{/* Pricing Modal with Built-in Trigger */}</>

            // after login 
          ) : (
            // IF NOT LOGGED IN: Show Sign In / Get Started buttons
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-stone-600 hover:text-orange-600 hover:bg-orange-50 font-medium"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="primary" className="rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
