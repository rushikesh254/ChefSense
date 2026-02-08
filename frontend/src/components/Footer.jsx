import React from "react";
import { Img as Image } from "@/components/ui/img";
import { Link } from "react-router-dom";

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-stone-900">
        {title}
      </h4>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.to}
              className="text-sm text-stone-600 hover:text-brand-600 transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-gradient-to-b from-stone-50 to-white">
      <div className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-20 h-20">
                <Image
                  src="/logo.png"
                  alt="ChefSense logo"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-lg font-semibold text-stone-900 group-hover:text-brand-600 transition-colors">
                ChefSense
              </span>
            </Link>

            <p className="mt-4 text-sm text-stone-600 max-w-xs ">
              Smart cooking powered by AI.
              <br />
              Reduce waste. Eat better.
            </p>
          </div>

          {/* Product */}
          <FooterColumn
            title="Product"
            links={[
              { name: "Scan Pantry", to: "/dashboard" },
              { name: "AI Recipes", to: "/dashboard" },
              { name: "My Pantry", to: "/pantry" },
              { name: "Pricing", to: "/pricing" },
            ]}
          />

          {/* Resources */}
          <FooterColumn
            title="Resources"
            links={[
              { name: "How it works", to: "/how-it-works" },
              { name: "Help Center", to: "/contact" },
              { name: "FAQs", to: "/faqs" },
              { name: "Contact", to: "/contact" },
            ]}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={[
              { name: "About", to: "/about" },
              { name: "Privacy Policy", to: "/privacy" },
              { name: "Terms of Service", to: "/terms" },
            ]}
          />
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-8 text-sm text-stone-500 md:flex-row">
          <span>© 2026 ChefSense. All rights reserved.</span>

          <span className="flex items-center gap-1">
            Made with <span>💗</span> by{" "}
            <span className="font-semibold hover:text-brand-600 transition-colors cursor-pointer">
              Rushikesh
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
