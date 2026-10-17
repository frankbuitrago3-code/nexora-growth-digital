"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  ["Servicios", "#servicios"],
  ["Metodología", "#metodologia"],
  ["La agencia", "#agencia"],
  ["Preguntas", "#preguntas"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="#inicio" aria-label="NEXORA, inicio">
          <span className="brand-mark" aria-hidden="true">N<span>.</span></span>
          <span className="brand-word">NEXORA<small>GROWTH & DIGITAL</small></span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span />
        </button>
        <nav
          className={`main-nav${menuOpen ? " is-open" : ""}`}
          id="main-navigation"
          aria-label="Navegación principal"
        >
          {navigation.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="button button-mint nav-button" href="#contacto" onClick={() => setMenuOpen(false)}>
            Solicitar estrategia <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
