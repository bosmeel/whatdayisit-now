"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

export default function MobileNav({ links }: { links: NavItem[] }) {

  const [open,setOpen] = useState(false);

  return (

    <div className="mobile-nav">

      <button
        className="menu-toggle"
        onClick={()=>setOpen(!open)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <nav className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map((item)=>(
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
            onClick={()=>setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

    </div>

  );

}