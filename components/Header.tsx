"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {

  const [menuOpen,setMenuOpen] = useState(false);

  const navLinks = [
  { href: "/days-between", label: "Days Between" },
  { href: "/days-until", label: "Days Until" },
  { href: "/days-since", label: "Days Since" },
  { href: "/age-calculator", label: "Age Calculator" },
  { href: "/business-days-between", label: "Business Days Since" },
  { href: "/business-days-until", label: "Business Days Until" },
  { href: "/birthday-weekday", label: "Birthday Weekday" },
  { href: "/weeks-between", label: "Weeks" },
  { href: "/months-between", label: "Months" },
];

  return (

    <header className="site-header">

      <div className="container header-inner">

        <Link href="/" className="logo-link">
          <img
            src="/icon.svg"
            alt="WhatDayIsIt icon"
            className="logo-icon"
          />
          <span>WhatDayIsIt.now</span>
        </Link>

        {/* desktop nav */}

        <nav className="main-nav desktop-nav">

          {navLinks.map((item)=>(
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}

        </nav>

        {/* mobile button */}

        <button
          className="mobile-menu-button"
          onClick={()=>setMenuOpen(true)}
        >
          ☰
        </button>

      </div>

      {menuOpen && (

        <div className="mobile-menu-overlay">

          <div className="mobile-menu">

            <button
              className="mobile-menu-close"
              onClick={()=>setMenuOpen(false)}
            >
              ✕
            </button>

            <nav className="mobile-nav">

              {navLinks.map((item)=>(
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={()=>setMenuOpen(false)}
                  className="mobile-nav-link"
                >
                  {item.label}
                </Link>
              ))}

            </nav>

          </div>

        </div>

      )}

    </header>

  );

}