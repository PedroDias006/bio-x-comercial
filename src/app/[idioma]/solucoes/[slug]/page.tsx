import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Microscope,
} from "lucide-react";

import { Conteiner } from "@/componentes/ui/Conteiner";
import { AvisoPendencia } from "@/componentes/ui/AvisoPendencia";
import { FotoIcone } from "@/componentes/ui/FotoIcone";
import { solucoes, solucoesEm, acharSolucao, nomeDaCategoria, type Solucao } from "@/dados/solucoes";
import { urlWhatsappEm } from "@/dados/contato";
import { comCor, visualDa } from "@/dados/visualSolucoes";
import { alternativas, idiomaDe, rota, type Idioma } from "@/i18n/config";

const textos: Record<Idioma, Record<string, string>> = {
  pt: {
    trilha: "Trilha", solucoes: "Soluções", linha: "Linha {c}", tecnico: "Falar com um técnico", entenda: "Entenda a solução",
    resumo: "Em resumo", natural: "Natural, à base de microrganismos benéficos", grupo: "Grupo de microrganismos",
    grupos: "Grupos de microrganismos na fórmula", beneficiosOp: "Benefícios para a operação",
    biologia: "Biologia aplicada onde ela", importa: "importa.", selo: "100% natural", tecBiox: "Biotecnologia BIO-X",
    emCampo: "em campo", cartao: "natural, à base de microrganismos benéficos.",
    muda: "O que muda", pilaresLinha: "Pilares da linha", beneficiosQue: "Benefícios que chegam", aPratica: "à prática.",
    compromisso: "O compromisso por trás", daLinha: "da linha.",
    integrada: "A solução atua de forma integrada ao ambiente — no processo, na operação e no resultado.",
    comoFunciona: "Como funciona", porTras: "O que existe por trás", daSolucao: "da solução.",
    cadaLinha: "Cada linha BIO-X atua numa necessidade específica, sem abandonar o princípio biológico que conecta toda a tecnologia.",
    composicao: "Composição", pequenos: "Pequenos organismos.", impacto: "Grande impacto.",
    querVer: "Quer ver o {nome} funcionando", cenario: "no seu cenário?",
    avalia: "Um técnico da BIO-X avalia a sua operação e indica a forma certa de aplicação.",
    continue: "Continue explorando", outras: "Outras soluções BIO-X", todas: "Ver todas",
  },
  en: {
    trilha: "Breadcrumb", solucoes: "Solutions", linha: "{c} line", tecnico: "Talk to a specialist", entenda: "Understand the solution",
    resumo: "At a glance", natural: "Natural, based on beneficial microorganisms", grupo: "Group of microorganisms",
    grupos: "Groups of microorganisms in the formula", beneficiosOp: "Benefits for your operation",
    biologia: "Biology applied where it", importa: "matters.", selo: "100% natural", tecBiox: "BIO-X biotechnology",
    emCampo: "in the field", cartao: "natural, based on beneficial microorganisms.",
    muda: "What changes", pilaresLinha: "Line pillars", beneficiosQue: "Benefits you can see", aPratica: "in practice.",
    compromisso: "The commitment behind", daLinha: "the line.",
    integrada: "The solution works in harmony with the environment — in the process, in the operation and in the results.",
    comoFunciona: "How it works", porTras: "What’s behind", daSolucao: "the solution.",
    cadaLinha: "Each BIO-X line addresses a specific need, without leaving behind the biological principle that connects the whole technology.",
    composicao: "Composition", pequenos: "Tiny organisms.", impacto: "Big impact.",
    querVer: "Want to see {nome} at work", cenario: "in your operation?",
    avalia: "A BIO-X specialist will assess your operation and recommend the right way to apply it.",
    continue: "Keep exploring", outras: "Other BIO-X solutions", todas: "See all",
  },
  es: {
    trilha: "Ruta de navegación", solucoes: "Soluciones", linha: "Línea {c}", tecnico: "Hablar con un técnico", entenda: "Entienda la solución",
    resumo: "En resumen", natural: "Natural, a base de microorganismos benéficos", grupo: "Grupo de microorganismos",
    grupos: "Grupos de microorganismos en la fórmula", beneficiosOp: "Beneficios para la operación",
    biologia: "Biología aplicada donde", importa: "importa.", selo: "100% natural", tecBiox: "Biotecnología BIO-X",
    emCampo: "en el campo", cartao: "natural, a base de microorganismos benéficos.",
    muda: "Qué cambia", pilaresLinha: "Pilares de la línea", beneficiosQue: "Beneficios que llegan", aPratica: "a la práctica.",
    compromisso: "El compromiso detrás", daLinha: "de la línea.",
    integrada: "La solución actúa de forma integrada al ambiente: en el proceso, en la operación y en el resultado.",
    comoFunciona: "Cómo funciona", porTras: "Lo que hay detrás", daSolucao: "de la solución.",
    cadaLinha: "Cada línea BIO-X atiende una necesidad específica, sin abandonar el principio biológico que conecta toda la tecnología.",
    composicao: "Composición", pequenos: "Pequeños organismos.", impacto: "Gran impacto.",
    querVer: "¿Quiere ver {nome} funcionando", cenario: "en su operación?",
    avalia: "Un técnico de BIO-X evalúa su operación e indica la forma correcta de aplicación.",
    continue: "Siga explorando", outras: "Otras soluciones BIO-X", todas: "Ver todas",
  },
};

export function generateStaticParams() {
  return solucoes.map((solucao) => ({ slug: solucao.slug }));
}

type Props = { params: Promise<{ idioma: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, idioma: bruto } = await params;
  const idioma = idiomaDe(bruto);
  const solucao = acharSolucao(slug, idioma);
  if (!solucao) return {};

  return {
    title: solucao.nome,
    description: solucao.resumo,
    alternates: alternativas(idioma, `/solucoes/${solucao.slug}`),
  };
}

const doisDigitos = (n: number) => String(n).padStart(2, "0");

/** Linha sem lista de benefícios usa os pilares da chamada. */
function pilaresDa(solucao: Solucao) {
  return solucao.chamada
    .split("·")
    .map((parte) => parte.trim())
    .filter(Boolean);
}

/** Números do cartão "Em resumo" — só o que sai dos dados, nada inventado. */
function numerosDa(solucao: Solucao, t: Record<string, string>) {
  const numeros: { valor: string; legenda: string }[] = [];
  if (solucao.destaque) numeros.push(solucao.destaque);
  numeros.push({ valor: "100%", legenda: t.natural });
  const grupos = new Set(solucao.composicao.map((c) => c.grupo)).size;
  if (grupos) {
    numeros.push({
      valor: doisDigitos(grupos),
      legenda: grupos === 1 ? t.grupo : t.grupos,
    });
  }
  if (solucao.beneficios.length) {
    numeros.push({
      valor: doisDigitos(solucao.beneficios.length),
      legenda: t.beneficiosOp,
    });
  }
  return numeros.slice(0, 3);
}

/** Etiqueta pequena com pontinho colorido, usada no topo de cada bloco. */
function Etiqueta({ children, escura = false }: { children: string; escura?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] ${
        escura ? "text-[var(--cor)]" : "text-[var(--cor-escura)]"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-[var(--cor)]" />
      {children}
    </p>
  );
}

export default async function PaginaDaSolucao({ params }: Props) {
  const { slug, idioma: bruto } = await params;
  const idioma = idiomaDe(bruto);
  const t = textos[idioma];
  const solucao = acharSolucao(slug, idioma);
  if (!solucao) notFound();

  const whatsapp = urlWhatsappEm(idioma);
  const categoria = nomeDaCategoria(solucao.categoria, idioma);
  const visual = visualDa(solucao.slug);
  const numeros = numerosDa(solucao, t);
  const temBeneficios = solucao.beneficios.length > 0;
  const outras = solucoesEm(idioma).filter((item) => item.slug !== solucao.slug);

  // Benefícios em linhas cheias: 3 por linha quando a conta fecha melhor
  // (3, 5, 6, 9…), senão 4. Os cartões da última linha crescem para ocupar
  // o espaço — nada de cartão órfão.
  const itensDestaque = temBeneficios ? solucao.beneficios : pilaresDa(solucao);
  const porLinha = itensDestaque.length % 3 === 0 || itensDestaque.length === 5 ? 3 : 4;
  const larguraDoCartao =
    porLinha === 3 ? "lg:basis-[calc(33.333%-0.7rem)]" : "lg:basis-[calc(25%-0.75rem)]";

  // Galeria: a 1ª foto é a grande; o cartão colorido entra na 3ª posição.
  // A arrumação (bento) se ajusta à quantidade de fotos, sem buracos.
  type Bloco = { tipo: "foto"; src: string } | { tipo: "cartao" };
  const [primeira, segunda, ...resto] = visual.galeria;
  const blocosDaGaleria: Bloco[] = [
    ...(primeira ? [{ tipo: "foto" as const, src: primeira }] : []),
    ...(segunda ? [{ tipo: "foto" as const, src: segunda }] : []),
    { tipo: "cartao" as const },
    ...resto.map((src) => ({ tipo: "foto" as const, src })),
  ];
  const grande = "col-span-2 row-span-2";
  const arrumacoes: Record<number, string[]> = {
    2: [grande, "col-span-2 lg:row-span-2"],
    3: [grande, "col-span-2", "col-span-2"],
    4: [grande, "col-span-1", "col-span-1", "col-span-2"],
    5: [grande, "col-span-1", "col-span-1", "col-span-2", "col-span-2 lg:col-span-4"],
    6: [grande, "col-span-1", "col-span-1", "col-span-2", "col-span-2", "col-span-2"],
    7: [grande, "col-span-1", "col-span-1", "col-span-2", "col-span-2", "col-span-1", "col-span-1"],
  };
  const arrumacao = arrumacoes[blocosDaGaleria.length] ?? arrumacoes[7];

  // Sombra de texto: garante leitura sobre foto sem escurecer a foto toda.
  const sombraTexto = "[text-shadow:0_2px_18px_rgba(0,0,0,0.55)]";

  return (
    <div style={comCor(visual)} className="bg-[#f6f6f1] selection:bg-[var(--cor)] selection:text-black">
      {/* ================= 1. CAPA ================= */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden text-white">
        <Image
          src={visual.fundo}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="-z-20 object-cover saturate-[1.2] contrast-[1.05]"
          style={{ objectPosition: visual.foco }}
        />
        <div className="absolute inset-0 -z-10 bg-black/25 lg:bg-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-black/40 via-black/10 to-transparent to-60% lg:block" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/35 to-transparent" />

        <Conteiner className={`relative pb-14 pt-36 lg:pb-20 ${sombraTexto}`}>
          {/* Trilha */}
          <nav aria-label={t.trilha} className="mb-10 flex items-center gap-2 text-xs font-semibold text-white/90">
            <Link href={rota(idioma, "/solucoes")} className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
              <ArrowLeft size={14} />
              {t.solucoes}
            </Link>
            <ChevronRight size={14} className="text-white/30" />
            <span>{categoria}</span>
            <ChevronRight size={14} className="text-white/30" />
            <span className="text-[var(--cor)]">{solucao.nome}</span>
          </nav>

          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-8 flex items-center gap-4">
                <FotoIcone src={visual.icone} tamanho="g" />
                <p className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md [text-shadow:none]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--cor)]" />
                  {t.linha.replace("{c}", categoria)}
                </p>
              </div>

              <h1 className="text-[clamp(3.4rem,9vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.05em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)]">
                {solucao.nome}
              </h1>

              <p className="mt-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-white">
                <span className="h-0.5 w-10 rounded-full bg-[var(--cor)]" />
                {solucao.chamada}
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white lg:text-xl">
                {solucao.resumo}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 [text-shadow:none] rounded-full bg-[var(--cor)] px-7 py-4 text-sm font-bold text-black/85 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  {t.tecnico}
                  <ArrowUpRight size={18} />
                </a>
                <a
                  href="#entenda"
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-white/60 hover:bg-white/15"
                >
                  {t.entenda}
                  <ArrowDown size={16} />
                </a>
              </div>
            </div>

            {/* Em resumo */}
            <aside className="lg:col-span-4">
              <div className="rounded-3xl border border-white/15 bg-black/25 p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
                  {t.resumo}
                </p>
                <dl className="mt-4 divide-y divide-white/10">
                  {numeros.map((n) => (
                    <div key={n.legenda} className="flex items-baseline gap-4 py-4 last:pb-0">
                      <dt className="w-28 shrink-0 text-4xl font-bold tracking-[-0.04em] text-[var(--cor)]">
                        {n.valor}
                      </dt>
                      <dd className="text-sm leading-snug text-white/75">{n.legenda}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Conteiner>
      </section>

      {/* ================= 2. ENTENDA ================= */}
      <section id="entenda" className="scroll-mt-24 py-24 lg:py-32">
        <Conteiner>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Etiqueta>{t.entenda}</Etiqueta>
                <h2 className="mt-6 text-[clamp(2.6rem,4.6vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[#10160f]">
                  {t.biologia}{" "}
                  <span className="text-[var(--cor-escura)]">{t.importa}</span>
                </h2>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-[clamp(1.25rem,1.9vw,1.6rem)] font-medium leading-[1.55] tracking-[-0.015em] text-[#2b332c]">
                {solucao.descricao}
              </p>

              <div className="mt-10 flex flex-wrap gap-2">
                <span className="rounded-full bg-[var(--cor)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black/80">
                  {t.selo}
                </span>
                <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[#3d463e]">
                  {t.linha.replace("{c}", categoria)}
                </span>
                <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[#3d463e]">
                  {t.tecBiox}
                </span>
              </div>
            </div>
          </div>

          {/* Galeria — fotos do produto + um cartão colorido fechando a grade */}
          {primeira && (
            <div className="mt-16 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[260px] lg:mt-24 lg:grid-cols-4 lg:gap-4">
              {blocosDaGaleria.map((bloco, i) =>
                bloco.tipo === "foto" ? (
                  <figure key={bloco.src} className={`relative overflow-hidden rounded-[28px] ${arrumacao[i] ?? "col-span-1"}`}>
                    <Image
                      src={bloco.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover saturate-[1.1] transition-transform duration-700 hover:scale-105"
                    />
                  </figure>
                ) : (
                  <div
                    key="cartao"
                    className={`relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-[var(--cor)] p-6 text-black/85 lg:p-8 ${arrumacao[i] ?? "col-span-1"}`}
                  >
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-black/10" />
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-black/10" />
                    <FotoIcone src={visual.icone} tamanho="p" />
                    <div className="relative">
                      <p className="text-5xl font-bold tracking-[-0.05em] lg:text-6xl">100%</p>
                      <p className="mt-2 text-sm font-semibold leading-snug">
                        {t.cartao}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </Conteiner>
      </section>

      {/* ================= 3. BENEFÍCIOS ================= */}
      <section className="relative isolate overflow-hidden bg-[color-mix(in_oklab,var(--cor)_16%,#ffffff)] py-24 text-[#10160f] lg:py-32">
        <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-[var(--cor)] opacity-30 blur-[140px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-white opacity-70 blur-[120px]" />

        <Conteiner>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Etiqueta>{temBeneficios ? t.muda : t.pilaresLinha}</Etiqueta>
              <h2 className="mt-6 text-[clamp(2.6rem,4.6vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.045em]">
                {temBeneficios ? (
                  <>
                    {t.beneficiosQue}{" "}
                    <span className="text-[var(--cor-escura)]">{t.aPratica}</span>
                  </>
                ) : (
                  <>
                    {t.compromisso}{" "}
                    <span className="text-[var(--cor-escura)]">{t.daLinha}</span>
                  </>
                )}
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-[#4f5a50]">
              {t.integrada}
            </p>
          </div>

          <div className="mt-14 flex flex-wrap gap-3 sm:gap-4">
            {itensDestaque.map((item, i) => (
              <article
                key={item}
                className={`group relative flex min-h-[170px] grow basis-[calc(50%-0.5rem)] flex-col sm:min-h-[200px] ${larguraDoCartao} justify-between rounded-3xl border border-black/[0.05] bg-white p-5 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)] sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cor)] hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.35)]`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--cor)] text-black/80">
                    <Check size={18} strokeWidth={2.6} />
                  </span>
                  <span className="text-sm font-bold text-black/20 transition-colors group-hover:text-[var(--cor-escura)]">
                    {doisDigitos(i + 1)}
                  </span>
                </div>
                <p className="mt-8 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[#1c231d] sm:mt-10 sm:text-lg">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </Conteiner>
      </section>

      {/* ================= 4. COMO FUNCIONA ================= */}
      {solucao.detalhes?.length ? (
        <section className="py-24 lg:py-32">
          <Conteiner>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <Etiqueta>{t.comoFunciona}</Etiqueta>
                  <h2 className="mt-6 text-[clamp(2.6rem,4.6vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[#10160f]">
                    {t.porTras}{" "}
                    <span className="text-[var(--cor-escura)]">{t.daSolucao}</span>
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-[#5b655c]">
                    {t.cadaLinha}
                  </p>
                </div>
              </div>

              <ol className="relative lg:col-span-7">
                {/* linha vertical que liga as etapas */}
                <span className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-[var(--cor)] to-transparent" />
                {solucao.detalhes.map((detalhe, i) => (
                  <li key={detalhe.titulo} className="relative flex gap-6 pb-12 last:pb-0">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--cor)] text-base font-bold text-black/80 shadow-[0_0_0_8px_#f6f6f1]">
                      {doisDigitos(i + 1)}
                    </span>
                    <div className="rounded-3xl border border-black/[0.06] bg-white p-7 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.35)]">
                      <h3 className="text-2xl font-bold tracking-[-0.03em] text-[#10160f]">
                        {detalhe.titulo}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[#4f5a50]">
                        {detalhe.texto}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Conteiner>
        </section>
      ) : null}

      {/* ================= 5. COMPOSIÇÃO ================= */}
      {solucao.composicao.length > 0 ? (
        <section className={solucao.detalhes?.length ? "pb-24 lg:pb-32" : "py-24 lg:py-32"}>
          <Conteiner>
            <div className="grid overflow-hidden rounded-[40px] border border-black/[0.05] bg-white text-[#10160f] shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)] lg:grid-cols-12">
              <div className="relative min-h-[320px] lg:col-span-5">
                <Image
                  src="/imagens/hero/microscopio.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                                <div className="absolute bottom-8 left-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--cor)] text-black/80">
                  <Microscope size={26} />
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:col-span-7 lg:p-14">
                <Etiqueta>{t.composicao}</Etiqueta>
                <h2 className="mt-6 text-[clamp(2.2rem,3.6vw,3.6rem)] font-bold leading-[0.98] tracking-[-0.045em]">
                  {t.pequenos}{" "}
                  <span className="text-[var(--cor-escura)]">{t.impacto}</span>
                </h2>

                <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                  {solucao.composicao.map((item, i) => (
                    <li
                      key={`${item.grupo}-${i}`}
                      className="rounded-2xl border border-black/[0.05] bg-[color-mix(in_oklab,var(--cor)_10%,#f7f7f3)] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-[#10160f]">{item.grupo}</p>
                        <span className="text-xs font-bold text-[var(--cor-escura)]">{doisDigitos(i + 1)}</span>
                      </div>
                      {item.cientifico ? (
                        <p className="mt-1.5 text-sm italic text-[#5b655c]">{item.cientifico}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Conteiner>
        </section>
      ) : null}

      {/* Pendências — aviso de desenvolvimento, some quando o array esvazia */}
      {solucao.pendencias?.length ? (
        <section className="pb-16">
          <Conteiner>
            <AvisoPendencia itens={solucao.pendencias} />
          </Conteiner>
        </section>
      ) : null}

      {/* ================= 6. CHAMADA FINAL ================= */}
      <section className="relative isolate overflow-hidden py-28 text-white lg:py-40">
        <Image
          src={visual.fundo}
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover saturate-[1.2]"
          style={{ objectPosition: visual.foco }}
        />
        <div className="absolute inset-0 -z-10 bg-black/35" />

        <Conteiner className={`text-center ${sombraTexto}`}>
          <div className="mx-auto flex w-fit"><FotoIcone src={visual.icone} tamanho="g" /></div>
          <h2 className="mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5vw,5rem)] font-bold leading-[0.98] tracking-[-0.045em]">
            {t.querVer.replace("{nome}", solucao.nome)}{" "}
            <span className="text-[var(--cor)]">{t.cenario}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
            {t.avalia}
          </p>
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 [text-shadow:none] rounded-full bg-[var(--cor)] px-9 py-5 text-base font-bold text-black/85 shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            {t.tecnico}
            <ArrowUpRight size={20} />
          </a>
        </Conteiner>
      </section>

      {/* ================= 7. OUTRAS SOLUÇÕES ================= */}
      <section className="pb-8 pt-20 lg:pt-28">
        <Conteiner>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5b655c]">
                {t.continue}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#10160f] sm:text-4xl">
                {t.outras}
              </h2>
            </div>
            <Link
              href={rota(idioma, "/solucoes")}
              className="hidden items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[#10160f] transition-colors hover:border-black/30 sm:inline-flex"
            >
              {t.todas}
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {outras.map((item) => {
              const v = visualDa(item.slug);
              return (
                <Link
                  key={item.slug}
                  href={rota(idioma, `/solucoes/${item.slug}`)}
                  style={comCor(v)}
                  className="group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl p-5 text-white shadow-[0_20px_40px_-28px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={v.fundo}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="-z-10 object-cover saturate-[1.15] transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: v.foco }}
                  />
                  <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/65 to-transparent" />
                  <div className="flex items-center justify-between">
                    <FotoIcone src={v.icone} tamanho="p" />
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-colors group-hover:bg-[var(--cor)] group-hover:text-black">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--cor)]">
                      {nomeDaCategoria(item.categoria, idioma)}
                    </p>
                    <p className="mt-1 text-xl font-bold leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">{item.nome}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Conteiner>
      </section>
    </div>
  );
}
