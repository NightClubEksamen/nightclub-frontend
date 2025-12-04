"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/blog", label: "BLOG" },
  { href: "/book-table", label: "BOOK TABLE" },
  { href: "/contact", label: "CONTACT US" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="relative w-full h-[124px] bg-black/90 border-t-2 border-b-2 border-[#FF2A70] z-20"
    >
    
      <div
        className="
          absolute left-0 top-0 
          w-0 h-0 
          border-t-[32px] border-t-[#FF2A70]
          border-r-[32px] border-r-transparent
        "
      />

    
      <div
        className="
          absolute right-0 top-0 
          w-0 h-0 
          border-t-[32px] border-t-[#FF2A70]
          border-l-[32px] border-l-transparent
        "
      />

    
      <div className="mx-auto flex h-full max-w-6xl items-center px-8">
      
        <div className="flex flex-col">
          <div className="text-2xl font-extrabold tracking-[0.25em] text-white">
            NIGHT<span className="text-[#FF2A70]">CLUB</span>
          </div>
          <span className="mt-1 text-[10px] tracking-[0.3em] text-gray-300 uppercase">
            HAVE A GOOD TIME
          </span>
        </div>


        <nav className="ml-auto flex gap-10 text-xs md:text-sm font-medium tracking-[0.25em] uppercase">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  pb-1 border-b-2
                  transition-colors
                  ${
                    isActive
                      ? "text-[#FF2A70] border-[#FF2A70]"
                      : "text-white border-transparent hover:text-[#FF2A70] hover:border-[#FF2A70]"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
