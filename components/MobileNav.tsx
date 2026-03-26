"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

export default function MobileNav({ links }: { links: NavItem[] }) {
  const [open, setOpen] = useState(false);

  function openMenu() {
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div>
      {/* hamburger */}
      <button
        className="menu-toggle"
        aria-label="Open navigation"
        onClick={openMenu}
      >
        ☰
      </button>

      {/* drawer */}
      {open && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            {/* close */}
            <button
              className="mobile-menu-close"
              onClick={closeMenu}
              aria-label="Close navigation"
            >
              ✕
            </button>

            {/* links */}
            <nav className="mobile-nav">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
