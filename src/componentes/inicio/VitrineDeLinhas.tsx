"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Conteiner } from "@/componentes/ui/Conteiner";
import { solucoesEm, nomeDaCategoria } from "@/dados/solucoes";
import { rota, type Idioma } from "@/i18n/config";
import { useIdioma } from "@/i18n/ProvedorIdioma";
import estilos from "./VitrineDeLinhas.module.css";

/**
 * A vitrine de linhas, na régua da Apple Store.
 *
 * O que faz a prateleira funcionar:
 *
 * - cada cartão tem a cor da coisa que ele vende, não a cor do site. Cinco
 *   cartões brancos iguais viram tabela; cinco cores diferentes viram
 *   prateleira, e o olho separa as linhas antes de ler qualquer palavra;
 * - o céu das fotos se dissolve em um tom claro da própria paisagem,
 *   criando espaço para a leitura sem uma caixa sobre o texto;
 * - o texto fica em dois degraus: a categoria pequena e a chamada grande.
 *   O cartão não tenta explicar a linha inteira;
 * - o trilho encaixa (`scroll-snap`) e o cartão seguinte fica meio à
 *   mostra, dizendo que tem mais coisa ali sem precisar de legenda.
 *
 * A rolagem é a nativa do navegador — já tem inércia, encaixe e aceita o
 * dedo. As setas só empurram o trilho um cartão por vez.
 */

type Tema = {
  /** Fundo do cartão. É ele que aparece em volta e por cima da foto. */
  fundo: string;
  texto: string;
  /** Cor da categoria, que é o texto menor e precisa de menos peso. */
  olho: string;
  foto: string;
  embalagem?: boolean;
  fotoInteira?: boolean;
  posicao?: string;
};

/**
 * Um tema por linha, na mesma chave do slug em `dados/solucoes.ts`.
 * Os fundos claros acompanham os tons das paisagens para integrar a
 * tipografia e as fotos, como no cartão de Agricultura Única.
 */
const temas: Record<string, Tema> = {
  "agricultura-unica": {
    fundo: "bg-[linear-gradient(168deg,#eaf7ee_0%,#c5e6cf_100%)]",
    texto: "text-[#0f3f22]",
    olho: "text-[#2e7d32]",
    foto: "/imagens/vitrine/agricultura-bombona-campo.png",
    posicao: "center center",
  },
  saneamento: {
    fundo: "bg-[linear-gradient(168deg,#edf3e7_0%,#d5e3cd_100%)]",
    texto: "text-[#153e3a]",
    olho: "text-[#326b5e]",
    foto: "/imagens/vitrine/saneamento-vertical.png",
    posicao: "center",
    fotoInteira: true,
  },
  "saude-do-gado": {
    fundo: "bg-[linear-gradient(168deg,#e8eef4_0%,#cbd8e4_100%)]",
    texto: "text-[#173849]",
    olho: "text-[#3e6278]",
    foto: "/imagens/vitrine/gado-vertical.png",
    posicao: "center",
    fotoInteira: true,
  },
  "saude-unica-suinos": {
    fundo: "bg-[linear-gradient(168deg,#e7f0f7_0%,#cbdfea_100%)]",
    texto: "text-[#183e4b]",
    olho: "text-[#406a77]",
    foto: "/imagens/vitrine/suinos-vertical.png",
    posicao: "center",
    fotoInteira: true,
  },
  "saude-unica-aves": {
    fundo: "bg-[linear-gradient(168deg,#ecf2e9_0%,#dce8da_100%)]",
    texto: "text-[#29422e]",
    olho: "text-[#526d3e]",
    foto: "/imagens/vitrine/aves-vertical.png",
    fotoInteira: true,
  },
};

/** Um cartão nunca passa de 395px; é isso que o navegador precisa saber. */
const TAMANHOS =
  "(min-width: 1280px) 395px, (min-width: 1024px) 380px, (min-width: 640px) 340px, 290px";

/**
 * A régua de atalhos que abre a seção, no lugar da fileira de ícones que a
 * Apple põe acima da vitrine.
 *
 * Cada atalho usa um recorte fotográfico do elemento representado, mantendo
 * a leitura rápida da régua sem depender de pictogramas genéricos.
 */
const atalhos = [
  { imagem: "/imagens/atalhos/soja-v2.png", slug: "agricultura-unica" },
  { imagem: "/imagens/atalhos/milho-v2.png", slug: "agricultura-unica" },
  { imagem: "/imagens/atalhos/cana-v2.png", slug: "agricultura-unica" },
  { imagem: "/imagens/atalhos/citros-v2.png", slug: "agricultura-unica" },
  { imagem: "/imagens/atalhos/hortifruti-v2.png", slug: "agricultura-unica" },
  { imagem: "/imagens/atalhos/ete-v2.png", slug: "saneamento" },
  { imagem: "/imagens/atalhos/rios-e-lagoas-v2.png", slug: "saneamento" },
  { imagem: "/imagens/atalhos/fossas-v2.png", slug: "saneamento" },
  { imagem: "/imagens/atalhos/bovinos-v2.png", slug: "saude-do-gado" },
  { imagem: "/imagens/atalhos/suinos-v2.png", slug: "saude-unica-suinos" },
  { imagem: "/imagens/atalhos/aves-v2.png", slug: "saude-unica-aves" },
];

/** Textos da seção. `atalhos` segue a mesma ordem da lista acima. */
const textos: Record<Idioma, { atalhos: string[]; olho: string; titulo: string; ariaAtalhos: string; anteriores: string; proximas: string }> = {
  pt: {
    atalhos: ["Soja e grãos", "Milho", "Cana", "Citros", "Hortifrúti", "ETE", "Rios e lagoas", "Fossas", "Bovinos", "Suínos", "Aves"],
    olho: "As linhas da BIO-X",
    titulo: "Cinco linhas, cada uma com um problema para resolver.",
    ariaAtalhos: "Atalhos por cultura e aplicação",
    anteriores: "Ver as linhas anteriores",
    proximas: "Ver as próximas linhas",
  },
  en: {
    atalhos: ["Soy and grains", "Corn", "Sugarcane", "Citrus", "Fruits & veg", "WWTP", "Rivers & ponds", "Septic tanks", "Cattle", "Pigs", "Poultry"],
    olho: "The BIO-X lines",
    titulo: "Five lines, each one built to solve a problem.",
    ariaAtalhos: "Shortcuts by crop and application",
    anteriores: "See previous lines",
    proximas: "See next lines",
  },
  es: {
    atalhos: ["Soja y granos", "Maíz", "Caña", "Cítricos", "Frutas y hortalizas", "PTAR", "Ríos y lagunas", "Fosas", "Bovinos", "Cerdos", "Aves"],
    olho: "Las líneas de BIO-X",
    titulo: "Cinco líneas, cada una con un problema por resolver.",
    ariaAtalhos: "Accesos por cultivo y aplicación",
    anteriores: "Ver las líneas anteriores",
    proximas: "Ver las próximas líneas",
  },
};

export function VitrineDeLinhas() {
  const idioma = useIdioma();
  const t = textos[idioma];
  const solucoes = solucoesEm(idioma);
  const trilhoRef = useRef<HTMLUListElement>(null);
  const [noInicio, setNoInicio] = useState(true);
  const solucoesEmLoop = [...solucoes, ...solucoes];

  const sincronizar = useCallback(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;

    const primeiroRepetido = trilho.children[trilho.children.length / 2] as HTMLElement;
    const primeiroOriginal = trilho.children[0] as HTMLElement;
    const pontoDeReinicio = primeiroRepetido?.offsetLeft - primeiroOriginal?.offsetLeft;

    if (pontoDeReinicio > 0 && trilho.scrollLeft >= pontoDeReinicio) {
      trilho.scrollLeft -= pontoDeReinicio;
    }

    setNoInicio(trilho.scrollLeft <= 2);
  }, []);

  useEffect(() => {
    sincronizar();
    window.addEventListener("resize", sincronizar);
    return () => window.removeEventListener("resize", sincronizar);
  }, [sincronizar]);

  function andar(direcao: 1 | -1) {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const cartao = trilho.querySelector("li");
    // Um cartão inteiro mais o gap; sem cartão medido, quase uma tela.
    const passo = cartao ? cartao.clientWidth + 22 : trilho.clientWidth * 0.85;
    trilho.scrollBy({ left: direcao * passo, behavior: "smooth" });
  }

  return (
    <section
      id="linhas"
      className="scroll-mt-28 overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <Conteiner>
        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[var(--biox-turquesa)]"
            />
            <p className="secao-olho">{t.olho}</p>
          </div>

          <h2 className="secao-titulo mt-6">
            {t.titulo}
          </h2>
        </div>
      </Conteiner>

      {/* RÉGUA DE ATALHOS
          Fica encostada no carrossel, sem texto no meio: as duas faixas rolam
          para o lado e precisam ser lidas como uma coisa só — o atalho em
          cima, a linha embaixo. */}
      <nav aria-label={t.ariaAtalhos} className="mt-10 sm:mt-12">
        {/* O `pt-3` existe por causa do `overflow-x-auto`: rolagem horizontal
            também corta na vertical, e sem essa folga o ícone que sobe no
            hover era decepado na borda de cima do trilho. */}
        <ul className="trilho sem-barra flex gap-6 overflow-x-auto scroll-smooth pb-1 pt-3 sm:gap-8">
          {atalhos.map((atalho, i) => {
            return (
              <li key={atalho.imagem} className="shrink-0">
                <Link
                  href={rota(idioma, `/solucoes/${atalho.slug}`)}
                  draggable={false}
                  className="group flex w-[92px] flex-col items-center gap-2.5 sm:w-[104px]"
                >
                  <span className="relative block size-[68px] overflow-hidden rounded-full bg-[var(--fundo)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_24px_-12px_rgba(6,35,43,0.5)] sm:size-[76px]">
                    <Image
                      src={atalho.imagem}
                      alt=""
                      fill
                      sizes="76px"
                      draggable={false}
                      className="select-none object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>

                  {/* Caixa de duas linhas em todos: sem altura fixa, um rótulo
                      que quebrasse desalinharia a fileira inteira. */}
                  <span className="flex h-9 w-full items-start justify-center hyphens-auto break-words text-center text-[12.5px] font-semibold leading-tight text-[var(--texto)] transition-colors duration-200 group-hover:text-[var(--biox-turquesa-escuro)] sm:text-[13.5px]">
                    {t.atalhos[i]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* O trilho sai do Conteiner e recebe a mesma margem por dentro: assim o
          primeiro cartão alinha com o título e o último some na borda da tela,
          em vez de parar num vazio no meio do caminho. */}
      <div className="relative mt-7 sm:mt-8">
        <ul
          ref={trilhoRef}
          onScroll={sincronizar}
          className="trilho sem-barra flex snap-x snap-mandatory gap-[22px] overflow-x-auto scroll-smooth pb-2"
        >
          {solucoesEmLoop.map((solucao, indice) => {
            const tema = temas[solucao.slug];
            if (!tema) return null;

            return (
              <li key={`${solucao.slug}-${indice}`} className="snap-start">
                <Link
                  href={rota(idioma, `/solucoes/${solucao.slug}`)}
                  aria-label={`${solucao.nome} — ${solucao.chamada}`}
                  draggable={false}
                  className={`group relative flex h-[368px] w-[290px] flex-col overflow-hidden rounded-[18px] p-5 transition-shadow duration-300 hover:shadow-[0_30px_70px_-40px_rgba(6,35,43,0.5)] sm:h-[432px] sm:w-[340px] sm:p-6 lg:h-[483px] lg:w-[380px] xl:h-[502px] xl:w-[395px] ${tema.fundo} ${tema.texto}`}
                >
                  {/* A máscara mistura apenas o alto da paisagem com o fundo.
                      O enquadramento e a escala das fotos verticais permanecem. */}
                  <span className={`pointer-events-none absolute block ${tema.fotoInteira ? `inset-0 ${estilos.fotoIntegrada}` : `inset-x-0 bottom-0 ${tema.embalagem ? "h-[65%]" : "h-[56%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)]"}`}`}>
                    <Image
                      src={tema.foto}
                      alt=""
                      fill
                      sizes={TAMANHOS}
                      draggable={false}
                      style={{ objectPosition: tema.posicao ?? "center" }}
                      className={`select-none transition-transform duration-700 ${tema.fotoInteira ? "object-cover" : `group-hover:scale-[1.04] ${tema.embalagem ? "object-contain p-2" : "object-cover"}`}`}
                    />
                  </span>

                  {/* Altura fixa: mantém a chamada na mesma linha de base em
                      todos os cartões, sem disputar espaço com a foto. */}
                  <div className="relative h-[150px] shrink-0 sm:h-[172px]">
                    <p
                      className={`text-[11px] font-bold uppercase tracking-[0.18em] ${tema.olho}`}
                    >
                      {nomeDaCategoria(solucao.categoria, idioma)}
                    </p>

                    <h3 className="mt-2 text-[19px] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-[21px] lg:text-[23px]">
                      {solucao.nome}
                    </h3>

                    <p className="mt-2.5 line-clamp-3 max-w-[22ch] text-[15px] font-medium leading-[1.3] opacity-80 sm:mt-3 sm:text-[16px]">
                      {solucao.chamada}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => andar(-1)}
          aria-hidden={noInicio}
          tabIndex={noInicio ? -1 : undefined}
          aria-label={t.anteriores}
          className={`absolute left-3 top-[calc(50%-4px)] grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#e8eded]/92 text-[var(--biox-950)] backdrop-blur transition duration-300 hover:bg-[#d9e3e4] sm:left-5 sm:size-14 ${
            noInicio ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <ChevronLeft className="size-5 sm:size-6" strokeWidth={2.2} />
        </button>

        <button
          type="button"
          onClick={() => andar(1)}
          aria-label={t.proximas}
          className="absolute right-3 top-[calc(50%-4px)] grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#e8eded]/92 text-[var(--biox-950)] opacity-100 backdrop-blur transition duration-300 hover:bg-[#d9e3e4] sm:right-5 sm:size-14"
        >
          <ChevronRight className="size-5 sm:size-6" strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
}
