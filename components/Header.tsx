"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/days-between", label: "Days Between" },
    { href: "/days-until", label: "Days Until" },
    { href: "/days-since", label: "Days Since" },
    { href: "/age-calculator", label: "Age Calculator" },
    { href: "/business-days-between", label: "Business Days Between" },
    { href: "/business-days-until", label: "Business Days Until" },
    { href: "/birthday-weekday", label: "Birthday Weekday" },
    { href: "/weeks-between", label: "Weeks" },
    { href: "/months-between", label: "Months" },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="logo-link">
            <img src="/icon.svg" alt="WhatDayIsIt icon" className="logo-icon" />
            <span>WhatDayIsIt.now</span>
          </Link>

          {/* desktop nav */}
          <nav className="main-nav">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* mobile toggle */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            ☰
          </button>
        </div>
      </header>

      {/* 🔥 BELANGRIJK: BUITEN HEADER */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button
              className="mobile-menu-close"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            <nav className="mobile-nav">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
