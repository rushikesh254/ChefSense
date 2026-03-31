import { useUser } from "@/context/AuthContext";
import { Link } from "react-router-dom";

function Footer() {
  // get current logged-in user
  const { user } = useUser();
  // console.log(user);

  // Chefsense links
  const Chefsense = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "About",
      to: "/about",
    },
    {
      name: "Profile",
      to: user ? "/profile" : "/sign-up",
    },
  ];

  // product links
  const product = [
    {
      name: "Dashboard",
      to: user ? "/dashboard" : "/sign-up",
    },
    {
      name: "My Recipes",
      to: user ? "/saved-recipes" : "/sign-up",
    },
    {
      name: "Scan Pantry",
      to: user ? "/pantry" : "/sign-up",
    },
    {
      name: "AI Recipes",
      to: user ? "/pantry-recipes" : "/sign-up",
    },
  ];

  // resources links
  const resources = [
    {
      name: "How it works",
      to: "/how-it-works",
    },
    {
      name: "FAQs",
      to: "/faqs",
    },
    {
      name: "Contact",
      to: "/contact",
    },
  ];

  return (
    // footer
    <footer className="border-t border-stone-200 bg-white">
      {/* main container */}
      <div className="mx-auto max-w-7xl px-5 py-10">
        {/* grid layout */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* logo + description */}
          <div className="col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="ChefSense logo"
                className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
              />

              {/* brand name */}
              <span className="text-xl sm:text-2xl font-bold text-black">
                ChefSense
              </span>
            </Link>

            {/* short description */}
            <p className="text-sm text-stone-500 max-w-sm font-medium">
              Smart cooking powered by AI. Transform your leftover ingredients
              into delicious meals, reduce waste, and eat better every single
              day.
            </p>
          </div>

          {/* chefsense links */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase  mb-4">
              ChefSense
            </h4>

            {/* links list */}
            <ul className="space-y-4">
              {Chefsense.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-brand-600 "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* product links */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase  mb-4">
              Product
            </h4>

            {/* links list */}
            <ul className="space-y-4">
              {product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className=" flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-brand-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* resources links */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase  mb-4">
              Resources
            </h4>

            {/* links list */}
            <ul className="space-y-4">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-brand-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom section */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* copyright */}
          <p className="text-sm text-stone-400 font-medium">
            &copy; 2026 ChefSense. All rights reserved.
          </p>

          {/* credit section */}
          <div className="flex items-center gap-2 text-sm text-stone-400 font-medium">
            <span>
              Made with{" "}
              <span className="text-red-500 animate-pulse inline-block">
                💗
              </span>{" "}
              by
            </span>

            {/* github link */}
            <a
              href="https://github.com/rushikesh254"
              className="text-black font-bold hover:text-brand-600 px-3 py-1 bg-stone-50 hover:bg-stone-100 rounded-full"
            >
              Rushikesh
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
