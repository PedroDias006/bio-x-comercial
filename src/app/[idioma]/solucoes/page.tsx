import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { Conteiner } from "@/componentes/ui/Conteiner";
import { solucoesEm, nomeDaCategoria, type Solucao } from "@/dados/solucoes";
import { urlWhatsappEm } from "@/dados/contato";
import { alternativas, idiomaDe, rota, type Idioma } from "@/i18n/config";
import { comCor, visualDa } from "@/dados/visualSolucoes";
import { FotoIcone } from "@/componentes/ui/FotoIcone";

const textos: Record<Idioma, Record<string, string>> = {
  pt: {
    titulo: "Soluções", descricao: "Soluções BIO-X para agricultura, saneamento e produção animal.",
    olho: "Nossas soluções", h1a: "Uma biologia.", h1b: "Muitos destinos.",
    apoio: "O mesmo princípio biológico aplicado a diferentes desafios. Escolha a linha e conheça a tecnologia ideal para o seu cenário.",
    produtos: "Produtos", verSecao: "Ver seção", linha: "Linha {c}", conhecer: "Conhecer o produto", tecnico: "Falar com um técnico",
    beneficios: "Principais benefícios", pilares: "Pilares da linha", natural: "100% natural", proximo: "Próximo",
    fale: "Fale com a BIO-X", cta1: "Quer entender como essa solução se aplica ao seu", cta2: "cenário?",
  },
  en: {
    titulo: "Solutions", descricao: "BIO-X solutions for agriculture, sanitation and animal production.",
    olho: "Our solutions", h1a: "One biology.", h1b: "Many destinations.",
    apoio: "The same biological principle applied to different challenges. Pick a line and discover the right technology for your situation.",
    produtos: "Products", verSecao: "See section", linha: "{c} line", conhecer: "View product", tecnico: "Talk to a specialist",
    beneficios: "Key benefits", pilares: "Line pillars", natural: "100% natural", proximo: "Next",
    fale: "Talk to BIO-X", cta1: "Want to know how this solution applies to your", cta2: "situation?",
  },
  es: {
    titulo: "Soluciones", descricao: "Soluciones BIO-X para agricultura, saneamiento y producción animal.",
    olho: "Nuestras soluciones", h1a: "Una biología.", h1b: "Muchos destinos.",
    apoio: "El mismo principio biológico aplicado a diferentes desafíos. Elija la línea y conozca la tecnología ideal para su escenario.",
    produtos: "Productos", verSecao: "Ver sección", linha: "Línea {c}", conhecer: "Conocer el producto", tecnico: "Hablar con un técnico",
    beneficios: "Principales beneficios", pilares: "Pilares de la línea", natural: "100% natural", proximo: "Siguiente",
    fale: "Hable con BIO-X", cta1: "¿Quiere entender cómo se aplica esta solución a su", cta2: "escenario?",
  },
};

type Props = { params: Promise<{ idioma: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idioma = idiomaDe((await params).idioma);
  return { title: textos[idioma].titulo, description: textos[idioma].descricao, alternates: alternativas(idioma, "/solucoes") };
}

const doisDigitos = (n: number) => String(n).padStart(2, "0");

/** Para a linha sem lista de benefícios, usa os pilares da chamada. */
function destaquesDo(solucao: Solucao) {
  if (solucao.beneficios.length) return solucao.beneficios.slice(0, 6);
  return solucao.chamada
    .split("·")
    .map((parte) => parte.trim())
    .filter(Boolean);
}

export default async function PaginaSolucoes({ params }: Props) {
  const idioma = idiomaDe((await params).idioma);
  const t = textos[idioma];
  const solucoes = solucoesEm(idioma);
  const whatsapp = urlWhatsappEm(idioma);
  const total = solucoes.length;

  return (
    <div className="bg-[#f4f7f7] selection:bg-[#00c8d2] selection:text-[#041e2b]">
      {/* 1. ABERTURA + ÍNDICE DOS PRODUTOS */}
      <section className="relative overflow-hidden bg-[#f4f7f7] pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-[#00c8d2]/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-[#00c8d2]/15"
        />

        <Conteiner className="relative">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cbe3e5] bg-[#eaf7f8] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#00c8d2]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087a85]">
                {t.olho}
              </span>
            </div>

            <h1 className="text-4xl font-medium leading-[1.02] tracking-tight text-[#06232b] md:text-6xl lg:text-7xl">
              {t.h1a}
              <br />
              <span className="text-[#00a9b3]">{t.h1b}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-[#4a6670]">
              {t.apoio}
            </p>
          </div>

          {/* Índice: um cartão por produto, levando à seção dele */}
          <nav
            aria-label={t.produtos}
            className="-mx-6 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16 lg:grid-cols-5 lg:gap-4"
          >
            {solucoes.map((solucao, i) => {
              const visual = visualDa(solucao.slug);
              return (
                <a
                  key={solucao.slug}
                  href={`#${solucao.slug}`}
                  style={comCor(visual)}
                  className="group relative isolate flex aspect-[4/5] w-[72vw] max-w-[280px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl bg-[linear-gradient(150deg,var(--cor-escura),color-mix(in_srgb,var(--cor-escura)_55%,#06232b))] p-4 text-white shadow-[0_10px_30px_-12px_rgba(4,30,43,0.5)] transition-transform duration-300 hover:-translate-y-1 sm:w-auto sm:max-w-none sm:aspect-[3/4]"
                >
                  <Image
                    src={visual.fundo}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 72vw"
                    className="-z-10 object-cover saturate-[1.15] transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: visual.foco }}
                  />
                  <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/65 to-transparent" />

                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black/25 px-2 py-0.5 text-[11px] font-bold tracking-[0.15em] text-white">
                      {doisDigitos(i + 1)}
                    </span>
                    <FotoIcone src={visual.icone} tamanho="p" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--cor)]">
                      {nomeDaCategoria(solucao.categoria, idioma)}
                    </p>
                    <p className="mt-1 text-lg font-bold leading-tight">
                      {solucao.nome}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/70 transition-colors group-hover:text-white">
                      {t.verSecao}
                      <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
                    </span>
                  </div>
                </a>
              );
            })}
          </nav>
        </Conteiner>
      </section>

      {/* 2. UMA SEÇÃO DE TELA CHEIA POR PRODUTO */}
      {solucoes.map((solucao, i) => {
        const visual = visualDa(solucao.slug);
        const textoADireita = visual.lado === "direita";
        const destaques = destaquesDo(solucao);
        const proximo = solucoes[i + 1];

        return (
          <section
            key={solucao.slug}
            id={solucao.slug}
            aria-labelledby={`titulo-${solucao.slug}`}
            style={comCor(visual)}
            className="relative isolate flex min-h-[100svh] scroll-mt-16 items-center overflow-hidden text-white"
          >
            {/* Foto de fundo */}
            <Image
              src={visual.fundo}
              alt=""
              fill
              sizes="100vw"
              quality={85}
              priority={i === 0}
              className="-z-20 object-cover saturate-[1.2] contrast-[1.05]"
              style={{ objectPosition: visual.foco }}
            />

            {/* Camadas de leitura: escurece o lado do texto e deixa a foto
                respirar do outro lado */}
            <div className="absolute inset-0 -z-10 bg-black/25 lg:bg-transparent" />
            <div
              className={`absolute inset-0 -z-10 hidden lg:block ${
                textoADireita
                  ? "bg-gradient-to-l from-black/45 via-black/15 via-35% to-transparent to-60%"
                  : "bg-gradient-to-r from-black/45 via-black/15 via-35% to-transparent to-60%"
              }`}
            />
            {/* Leve sombra no topo só para o cabeçalho fixo ler bem */}
            <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/30 to-transparent" />

            <Conteiner className="relative py-24 [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] lg:py-28">
              <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
                {/* Texto */}
                <div
                  className={`lg:col-span-7 ${
                    textoADireita ? "lg:order-2 lg:col-start-6" : ""
                  }`}
                >
                  <div className="mb-8 flex items-center gap-4">
                    <FotoIcone src={visual.icone} tamanho="g" />
                    <div className="leading-tight">
                      <p className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md [text-shadow:none]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--cor)]" />
                        {t.linha.replace("{c}", nomeDaCategoria(solucao.categoria, idioma))}
                      </p>
                      <p className="text-sm font-semibold text-white/60">
                        {doisDigitos(i + 1)}{" "}
                        <span className="text-white/35">/ {doisDigitos(total)}</span>
                      </p>
                    </div>
                  </div>

                  <h2
                    id={`titulo-${solucao.slug}`}
                    className="text-5xl font-bold leading-[0.92] tracking-[-0.04em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-8xl"
                  >
                    {solucao.nome}
                  </h2>

                  <p className="mt-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-white">
                    <span className="h-0.5 w-10 rounded-full bg-[var(--cor)]" />
                    {solucao.chamada}
                  </p>

                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-white lg:text-xl">
                    {solucao.resumo}
                  </p>

                  <div className="mt-10 flex flex-wrap items-center gap-3">
                    <Link
                      href={rota(idioma, `/solucoes/${solucao.slug}`)}
                      className="inline-flex items-center gap-3 [text-shadow:none] rounded-full bg-white px-7 py-4 text-sm font-bold text-[#041e2b] shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--cor)]"
                    >
                      {t.conhecer}
                      <ArrowUpRight size={18} />
                    </Link>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-white/60 hover:bg-white/15"
                    >
                      {t.tecnico}
                    </a>
                  </div>
                </div>

                {/* Painel de benefícios */}
                <div
                  className={`lg:col-span-5 ${
                    textoADireita ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"
                  }`}
                >
                  <div className="rounded-3xl border border-white/15 bg-black/25 p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
                      {solucao.beneficios.length ? t.beneficios : t.pilares}
                    </p>

                    <ul className="mt-5 divide-y divide-white/10">
                      {destaques.map((item) => (
                        <li key={item} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--cor)] text-black/80">
                            <Check size={14} strokeWidth={2.5} />
                          </span>
                          <span className="text-[15px] font-medium leading-snug text-white/90">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                      <span className="[text-shadow:none] rounded-full bg-[var(--cor)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black/80">
                        {t.natural}
                      </span>
                      {Array.from(new Set(solucao.composicao.map((c) => c.grupo)))
                        .slice(0, 3)
                        .map((grupo) => (
                          <span
                            key={grupo}
                            className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/75"
                          >
                            {grupo}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </Conteiner>

            {/* Chamada para a próxima seção */}
            {proximo && (
              <a
                href={`#${proximo.slug}`}
                className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-md transition-colors hover:text-white md:inline-flex"
              >
                {t.proximo}: {proximo.nome}
                <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            )}
          </section>
        );
      })}

      {/* 3. CTA FINAL */}
      <section className="bg-white py-24 lg:py-32">
        <Conteiner>
          <div className="relative overflow-hidden rounded-[40px] border border-[#cbe3e5] bg-[#dff5f6] p-10 shadow-xl lg:p-20">
            <div className="absolute -right-24 -top-28 h-[360px] w-[360px] rounded-full border border-[#8dd7dd] opacity-50" />
            <div className="absolute bottom-10 right-10 h-[120px] w-[120px] rounded-full border border-[#8dd7dd] opacity-30" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-6 inline-block rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#087a85]">
                  {t.fale}
                </p>
                <h2 className="max-w-[700px] text-4xl font-medium leading-[1.1] tracking-tight text-[#06232b] md:text-5xl">
                  {t.cta1}
                  <span className="font-bold text-[#00a9b3]"> {t.cta2}</span>
                </h2>
              </div>

              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit shrink-0 items-center justify-center gap-4 rounded-full bg-[#073747] px-10 py-5 text-base font-bold text-white transition-all hover:-translate-y-1 hover:bg-[#00a9b3] hover:shadow-2xl"
              >
                {t.tecnico}
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </Conteiner>
      </section>
    </div>
  );
}
