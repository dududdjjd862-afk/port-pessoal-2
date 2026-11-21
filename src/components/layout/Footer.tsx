"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-black/5 py-8 dark:border-white/5">
      <div className="container-shell flex flex-col items-center justify-between gap-4 text-sm text-[var(--muted)] sm:flex-row">
        <p>© 2026 [SEU NOME]. Todos os direitos reservados.</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="icon-button" aria-label="Voltar ao topo">
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
