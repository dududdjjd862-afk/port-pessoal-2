"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

const links = [
  ["Início", "inicio"],
  ["Projetos", "projetos"],
  ["Skills", "skills"],
  ["Trajetória", "trajetoria"],
  ["Sobre", "sobre"],
  ["Contato", "contato"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
      : false,
  );

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const enabled = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", enabled);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55%", threshold: [0.1, 0.4] },
    );
    links.forEach(([, id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const enabled = !dark;
    setDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
    localStorage.setItem("theme", enabled ? "dark" : "light");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[var(--background)]/85 backdrop-blur-xl dark:border-white/5">
      <nav className="container-shell flex h-16 items-center justify-between" aria-label="Navegação principal">
        <a href="#inicio" className="font-mono text-sm font-bold tracking-[0.2em]" aria-label="Ir para o início">
          PORT<span className="text-[var(--accent)]">./FOLIO</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className={`nav-link ${active === id ? "nav-link-active" : ""}`}>
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={toggleTheme} className="icon-button" aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button type="button" onClick={() => setOpen(!open)} className="icon-button md:hidden" aria-expanded={open} aria-label="Abrir menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-black/5 px-5 py-3 md:hidden dark:border-white/5">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm hover:bg-black/5 dark:hover:bg-white/5">
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
