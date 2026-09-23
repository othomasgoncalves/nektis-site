"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SimboloCompleto } from "@/components/Simbolo";

const LINKS = [
  { href: "#o-que-fazemos", label: "O que fazemos" },
  { href: "#como-trabalhamos", label: "Como trabalhamos" },
  { href: "#quem-somos", label: "Quem somos" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const heroTrack = document.getElementById("hero-track");
    const threshold = heroTrack ? heroTrack.offsetHeight * 0.88 : window.innerHeight * 2;

    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/75 backdrop-blur-md backdrop-saturate-150 transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="#top" className="flex items-center gap-2" aria-label="Nektis — início">
            <SimboloCompleto className="h-8 w-auto" />
            <span className="font-display text-lg text-roxo">Nektis</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-normal text-roxo transition-colors hover:text-lilas"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contato"
            className="hidden rounded-full bg-roxo px-5 py-2.5 text-sm font-normal text-offwhite transition-colors hover:bg-roxo/90 lg:inline-flex lg:items-center"
          >
            Falar com a gente
          </a>

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className="h-0.5 w-6 bg-roxo" />
            <span className="h-0.5 w-6 bg-roxo" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col lg:hidden"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
            background: "linear-gradient(180deg, #ffffff 0%, #ffffff 55%, #efe5fe 100%)",
          }}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <SimboloCompleto className="h-8 w-auto" />
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={closeMenu}
              className="flex h-11 w-11 items-center justify-center text-2xl text-roxo"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-display text-3xl text-roxo"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={closeMenu}
              className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-roxo px-6 py-3 text-base text-offwhite"
            >
              Falar com a gente
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
