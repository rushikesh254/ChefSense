import React from "react";
import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { name: "Scan Pantry", to: "/dashboard" },
    { name: "AI Recipes", to: "/dashboard" },
    { name: "My Pantry", to: "/pantry" },
  ],
  Resources: [
    { name: "How it works", to: "/how-it-works" },
    { name: "FAQs", to: "/faqs" },
    { name: "Contact", to: "/contact" },
  ],
  Company: [
    { name: "About", to: "/about" },
    { name: "Privacy Policy", to: "/privacy" },
    { name: "Terms of Service", to: "/terms" },
  ],
};

function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="ChefSense logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
              <span className="text-lg font-semibold text-stone-900">
                ChefSense
              </span>
            </Link>
            <p className="mt-4 text-sm text-stone-600 max-w-xs leading-relaxed">
              Smart cooking powered by AI. Reduce waste. Eat better.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-stone-900">
                {title}
              </h4>
              <ul className="mt-4 space-y-3">
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
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-stone-200 pt-6 text-sm text-stone-500 sm:flex-row">
          <span>&copy; 2026 ChefSense. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with 💗 by{" "}
            <a
              href="https://github.com/rushikesh"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-600 transition-colors"
            >
              Rushikesh
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
