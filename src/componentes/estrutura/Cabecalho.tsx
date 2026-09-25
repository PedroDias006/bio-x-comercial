"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Conteiner } from "@/componentes/ui/Conteiner";
import { BotaoLink } from "@/componentes/ui/BotaoLink";
import { SeletorDeIdioma } from "@/componentes/estrutura/SeletorDeIdioma";
import { navegacaoEm } from "@/dados/site";
import { urlWhatsappEm } from "@/dados/contato";
import { caminhoSemIdioma, rota, type Idioma } from "@/i18n/config";
import { useIdioma } from "@/i18n/ProvedorIdioma";

const textos: Record<Idioma, { contato: string; inicio: string; abrir: string; fechar: string; principal: string; celular: string }> = {
  pt: { contato: "Falar com a BIO-X", inicio: "BIO-X Microorganismos, página inicial", abrir: "Abrir menu", fechar: "Fechar menu", principal: "Principal", celular: "Principal (celular)" },
  en: { contato: "Talk to BIO-X", inicio: "BIO-X Microorganisms, home page", abrir: "Open menu", fechar: "Close menu", principal: "Main", celular: "Main (mobile)" },
  es: { contato: "Hablar con BIO-X", inicio: "BIO-X Microorganismos, página de inicio", abrir: "Abrir menú", fechar: "Cerrar menú", principal: "Principal", celular: "Principal (móvil)" },
};

/**
 * Barra de navegação — sempre clara, igual à da página inicial.
 *
 * O encolhimento no scroll é feito por CSS (`.nav-casca` + as variáveis em
 * `html[data-nav-rolado]`). Aqui o JS só liga e desliga o atributo quando o
 * scroll cruza o limiar — nada é interpolado por frame.
 */
export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);
  const idioma = useIdioma();
  const t = textos[idioma];
  const caminho = caminhoSemIdioma(usePathname());
  const navegacao = navegacaoEm(idioma);
  const whatsapp = urlWhatsappEm(idioma);

  useEffect(() => {
    const limiar = 24;
    let rolado = false;

    function aoRolar() {
      const passou = window.scrollY > limiar;
      if (passou === rolado) return;
      rolado = passou;
      document.documentElement.dataset.navRolado = String(passou);
    }

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  /* Trava a rolagem do fundo enquanto o menu mobile está aberto. */
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  return (
    <header className="sticky top-0 z-100 flex justify-center pt-0 transition-[padding] duration-400 has-[+*]:pt-0">
      <div className="nav-casca nav-clara flex items-center justify-between backdrop-blur-xl">
        <Link href={rota(idioma, "/")} className="nav-marca" onClick={() => setMenuAberto(false)} aria-label={t.inicio}>
          <Image
            src="/imagens/logos/biox-logo.png"
            alt="BIO-X Microorganismos"
            width={1774}
            height={887}
            priority
            sizes="(min-width: 1024px) 180px, 140px"
            className="logo-nav"
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label={t.principal}>
          {navegacao.map((item) => {
            const ativo = caminho === item.href || caminho.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={rota(idioma, item.href)}
                aria-current={ativo ? "page" : undefined}
                className={`whitespace-nowrap text-sm font-semibold transition ${
                  ativo
                    ? "text-[var(--biox-turquesa-escuro)]"
                    : "text-[var(--texto-suave)] hover:text-[var(--biox-950)]"
                }`}
              >
                {item.rotulo}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <BotaoLink href={whatsapp} externo className="nav-acao hidden xl:inline-flex">
            {t.contato}
          </BotaoLink>

          <SeletorDeIdioma />

          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? t.fechar : t.abrir}
            className="grid size-11 place-items-center rounded-full border border-[var(--linha)] text-[var(--biox-950)] lg:hidden"
          >
            {menuAberto ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuAberto ? (
        <div
          id="menu-mobile"
          className="nav-clara fixed inset-x-0 top-[var(--nav-altura)] bottom-0 z-90 overflow-y-auto lg:hidden"
        >
          <Conteiner className="py-8">
            <nav className="flex flex-col" aria-label={t.celular}>
              {/* Fecha no clique, e não num efeito que observa a rota: chamar
                  setState dentro de useEffect dispara uma renderização em
                  cascata a cada navegação. */}
              {navegacao.map((item) => (
                <Link
                  key={item.href}
                  href={rota(idioma, item.href)}
                  onClick={() => setMenuAberto(false)}
                  className="border-b border-[var(--linha)] py-4 text-lg font-semibold text-[var(--biox-950)]"
                >
                  {item.rotulo}
                </Link>
              ))}
            </nav>
            <BotaoLink href={whatsapp} externo className="mt-8 w-full">
              {t.contato}
            </BotaoLink>
          </Conteiner>
        </div>
      ) : null}
    </header>
  );
}
