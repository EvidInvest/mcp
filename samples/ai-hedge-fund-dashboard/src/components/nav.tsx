"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Portfolio" },
  { href: "/optimize", label: "Optimization" },
  { href: "/risk", label: "Risk" },
  { href: "/earnings", label: "Earnings" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-navy-700 bg-navy-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gold-500 flex items-center justify-center text-navy-950 font-bold text-sm">
            AI
          </div>
          <span className="text-lg font-semibold text-white tracking-tight">
            AI/DC Fund
          </span>
        </Link>
        <nav className="flex gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-navy-700 text-gold-400"
                    : "text-zinc-400 hover:text-white hover:bg-navy-800"
                }`}
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
