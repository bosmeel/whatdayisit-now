"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type NavItem = {
  href: string;
  label: string;
};

export default function MobileNav({ links }: { links: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* 🔥 FIX: voorkomt hydration mismatch */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="mobile-nav">
      <button
        className="menu-toggle"
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* overlay */}
      <div
        className={`menu-overlay ${open ? "open" : ""}`}
        onClick={closeMenu}
      />

      {/* menu */}
      <nav className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
