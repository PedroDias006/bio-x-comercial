"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Conteiner } from "@/componentes/ui/Conteiner";
import { BotaoLink } from "@/componentes/ui/BotaoLink";
import { navegacao } from "@/dados/site";
import { urlWhatsapp } from "@/dados/contato";

/**
 * Barra de navegação.
 *
 * O encolhimento no scroll é feito por CSS (`.nav-casca` + as variáveis em
 * `html[data-nav-rolado]`). Aqui o JS só liga e desliga o atributo quando o
 * scroll cruza o limiar — nada é interpolado por frame.
 */
export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);
  const caminho = usePathname();

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
      <div className={`nav-casca ${caminho === "/" ? "nav-clara" : "nav-institucional"} flex items-center justify-between backdrop-blur-xl`}>
        <Link href="/" className="nav-marca" onClick={() => setMenuAberto(false)} aria-label="BIO-X Microorganismos, página inicial">
          <Image
            src={caminho === "/" ? "/imagens/logos/biox-logo.png" : "/imagens/logos/biox-logo-branco.png"}
            alt="BIO-X Microorganismos"
            width={1774}
            height={887}
            priority
            sizes="(min-width: 1024px) 260px, 210px"
            className="logo-nav"
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label="Principal">
          {navegacao.map((item) => {
            const ativo = caminho === item.href || caminho.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
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

        <div className="flex shrink-0 items-center gap-3">
          <BotaoLink
            href={urlWhatsapp}
            externo
            className="nav-acao hidden sm:inline-flex"
          >
            Falar com a BIO-X
          </BotaoLink>

          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            className="grid size-11 place-items-center rounded-full border border-[var(--linha)] text-[var(--biox-950)] lg:hidden"
          >
            {menuAberto ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuAberto ? (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-[var(--nav-altura)] bottom-0 z-90 overflow-y-auto nav-institucional lg:hidden"
        >
          <Conteiner className="py-8">
            <nav className="flex flex-col" aria-label="Principal (celular)">
              {/* Fecha no clique, e não num efeito que observa a rota: chamar
                  setState dentro de useEffect dispara uma renderização em
                  cascata a cada navegação. */}
              {navegacao.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuAberto(false)}
                  className="border-b border-[var(--linha)] py-4 text-lg font-semibold text-[var(--biox-950)]"
                >
                  {item.rotulo}
                </Link>
              ))}
            </nav>
            <BotaoLink href={urlWhatsapp} externo className="mt-8 w-full">
              Falar com a BIO-X
            </BotaoLink>
          </Conteiner>
        </div>
      ) : null}
    </header>
  );
}
