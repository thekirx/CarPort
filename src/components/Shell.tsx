"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Mark } from "./Mark";
import { DEMO_NOTICE } from "@/lib/demo";

export function DemoBanner() {
  return <div className="demo-banner"><span>SAMPLE DATA</span>{DEMO_NOTICE}</div>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" onClick={close}><Mark /></Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
        <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          <Link href="/wheels" onClick={close}>Wheels</Link>
          <Link href="/fitment" onClick={close}>Fitment finder</Link>
          <Link href="/builds" onClick={close}>Builds</Link>
          <a className="nav-contact" href="https://www.facebook.com/people/Carport-Wheels/61558977561141/" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Message the shop</a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><Mark /><p>Fitment-first wheels and tyres on West Avenue.</p></div>
        <div><span className="eyebrow">Visit</span><p>West Avenue, Quezon City<br />0927 367 9567</p></div>
        <div><span className="eyebrow">Demo note</span><p>This prototype takes no payment and sends no messages.</p></div>
      </div>
    </footer>
  );
}
