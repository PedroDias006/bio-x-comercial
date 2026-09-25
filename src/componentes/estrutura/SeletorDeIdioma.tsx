"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bandeira } from "@/componentes/ui/Bandeira";
import {
  caminhoSemIdioma,
  cookieIdioma,
  idiomas,
  nomeDoIdioma,
  rota,
  type Idioma,
} from "@/i18n/config";
import { useIdioma } from "@/i18n/ProvedorIdioma";

const rotuloDoGrupo: Record<Idioma, string> = {
  pt: "Escolher idioma",
  en: "Choose language",
  es: "Elegir idioma",
};

/**
 * As três bandeiras da navbar. O clique grava a escolha num cookie (vale por
 * um ano, para as próximas visitas) e abre a mesma página no outro idioma.
 */
export function SeletorDeIdioma({ className = "" }: { className?: string }) {
  const atual = useIdioma();
  const caminho = usePathname();
  const router = useRouter();

  function trocar(novo: Idioma) {
    if (novo === atual) return;
    document.cookie = `${cookieIdioma}=${novo}; path=/; max-age=31536000; samesite=lax`;
    const hash = window.location.hash;
    router.push(`${rota(novo, caminhoSemIdioma(caminho))}${hash}`);
  }

  return (
    <div
      role="group"
      aria-label={rotuloDoGrupo[atual]}
      className={`flex items-center gap-1 rounded-full border border-[var(--linha)] bg-white/70 p-1 ${className}`}
    >
      {idiomas.map((idioma) => {
        const ativo = idioma === atual;
        return (
          <button
            key={idioma}
            type="button"
            lang={idioma}
            onClick={() => trocar(idioma)}
            aria-pressed={ativo}
            aria-label={nomeDoIdioma[idioma]}
            title={nomeDoIdioma[idioma]}
            className={`grid size-8 place-items-center rounded-full transition ${
              ativo
                ? "bg-[var(--biox-turquesa)]/15 ring-2 ring-[var(--biox-turquesa)]"
                : "opacity-60 grayscale-[35%] hover:opacity-100 hover:grayscale-0"
            }`}
          >
            <Bandeira idioma={idioma} className="size-6" />
          </button>
        );
      })}
    </div>
  );
}
