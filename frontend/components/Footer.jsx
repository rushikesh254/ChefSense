import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="ChefSense Logo"
            width={80}
            height={80}
            className="w-20"
          />
        </div>
        <p className="text-stone-500 text-sm">Made with 💗 by Rushikesh</p>
      </div>
    </footer>
  );
};

export default Footer;
