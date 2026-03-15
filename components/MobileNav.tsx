"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

export default function MobileNav({ links }: { links: NavItem[] }) {

  const [open,setOpen] = useState(false);

  function closeMenu(){
    setOpen(false);
  }

  return (

    <div className="mobile-nav">

      <button
        className="menu-toggle"
        aria-label="Toggle navigation"
        onClick={()=>setOpen(!open)}
      >
        ☰
      </button>

      <div
        className={`menu-overlay ${open ? "open" : ""}`}
        onClick={closeMenu}
      />

      <nav className={`mobile-menu ${open ? "open" : ""}`}>

        {links.map((item)=>(
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