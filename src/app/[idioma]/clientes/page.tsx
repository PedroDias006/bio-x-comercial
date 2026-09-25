import Image from "next/image";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Coffee,
  Droplets,
  Factory,
  Handshake,
  HardHat,
  Microscope,
  MoreHorizontal,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Conteiner } from "@/componentes/ui/Conteiner";
import { clientesPorSetor, logoDoCliente, totalDeClientes } from "@/dados/clientes";
import { totalDeUFs } from "@/dados/presenca";
import { urlWhatsappEm } from "@/dados/contato";
import { idiomaDe } from "@/i18n/config";
import { textos } from "./textos";

/** Visual de cada setor, na ordem de `clientesPorSetor`. Fotos: Pexels (licença livre). */
const visualDosSetores: { icone: LucideIcon; foto: string; cor: string }[] = [
  { icone: Droplets, foto: "/imagens/clientes/setores/saneamento.jpg", cor: "#0b8797" },
  { icone: Factory, foto: "/imagens/clientes/setores/industria.jpg", cor: "#b7791f" },
  { icone: Coffee, foto: "/imagens/clientes/setores/alimentos.jpg", cor: "#c2410c" },
  { icone: HardHat, foto: "/imagens/clientes/setores/engenharia.jpg", cor: "#2563eb" },
  { icone: MoreHorizontal, foto: "/imagens/clientes/setores/outros.jpg", cor: "#4b6358" },
];

const iconesBeneficios = [TrendingUp, ShieldCheck, Microscope, Users];
const iconesPerfis = [Briefcase, Users, Target];

/** Cartão de uma empresa: logo quando existe, senão o nome em tipografia. */
function CartaoDeCliente({ nome, compacto = false }: { nome: string; compacto?: boolean }) {
  const logo = logoDoCliente(nome);
  return (
    <div
      className={`group flex flex-col items-center justify-center rounded-2xl border border-black/[0.06] bg-white px-5 shadow-[0_10px_30px_-22px_rgba(6,35,43,0.45)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--cor,#00aabe)]/40 hover:shadow-[0_18px_40px_-24px_rgba(6,35,43,0.5)] ${
        compacto ? "h-24 w-52 shrink-0" : "h-28"
      }`}
    >
      {logo ? (
        <span className={`relative block w-full ${compacto ? "h-12" : "h-11"}`}>
          <Image src={logo} alt={nome} fill sizes="200px" className="object-contain" />
        </span>
      ) : (
        <span className="text-center text-lg font-extrabold uppercase tracking-[0.08em] text-[#123542]">
          {nome}
        </span>
      )}
      {!compacto && (
        <span className="mt-2 line-clamp-1 text-center text-[11px] font-semibold text-[#6c868f]">{nome}</span>
      )}
    </div>
  );
}

export default async function PaginaClientes({ params }: { params: Promise<{ idioma: string }> }) {
  const idioma = idiomaDe((await params).idioma);
  const t = textos[idioma];
  const whatsapp = urlWhatsappEm(idioma);

  const todos = clientesPorSetor.flatMap((grupo) => grupo.clientes);
  const metade = Math.ceil(todos.length / 2);
  const faixas = [todos.slice(0, metade), todos.slice(metade)];

  const numeros = [
    { valor: String(totalDeClientes), rotulo: t.numEmpresas },
    { valor: String(clientesPorSetor.length).padStart(2, "0"), rotulo: t.numSetores },
    { valor: String(totalDeUFs).padStart(2, "0"), rotulo: t.numEstados },
    { valor: "+30", rotulo: t.numAnos },
  ];

  return (
    <div className="overflow-hidden bg-[#f4f7f7] selection:bg-[#00aabe] selection:text-white">
      {/* ================= 1. ABERTURA ================= */}
      <section className="relative pb-16 pt-16 lg:pb-24 lg:pt-24">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-[#00c8d2]/10 blur-[120px]" />
        <Conteiner className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cbe3e5] bg-white px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#00c8d2]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087a85]">{t.olho}</span>
              </div>
              <h1 className="text-[clamp(2.8rem,5.6vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.05em] text-[#06232b]">
                {t.h1a} <span className="text-[#00a9b3]">{t.h1b}</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#4a6670]">{t.apoio}</p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#carteira"
                  className="inline-flex items-center gap-3 rounded-full bg-[#06232b] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#00a9b3]"
                >
                  {t.verClientes}
                  <ArrowDown size={17} />
                </a>
                <a
                  href="#parceria"
                  className="inline-flex items-center gap-3 rounded-full border border-[#cbe3e5] bg-white px-7 py-4 text-sm font-bold text-[#06232b] transition hover:border-[#00a9b3]"
                >
                  {t.serParceiro}
                  <ArrowRight size={17} />
                </a>
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[#d7e2e6] pt-8 sm:grid-cols-4">
                {numeros.map((n) => (
                  <div key={n.rotulo}>
                    <dt className="text-4xl font-bold tracking-[-0.04em] text-[#06232b]">{n.valor}</dt>
                    <dd className="mt-1 text-xs font-semibold leading-snug text-[#6c868f]">{n.rotulo}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Mosaico dos setores */}
            <div className="relative lg:col-span-6">
              <div className="grid h-[460px] grid-cols-2 grid-rows-2 gap-3 sm:h-[560px] lg:gap-4">
                {[0, 1, 3].map((indice, posicao) => {
                  const v = visualDosSetores[indice];
                  return (
                    <figure
                      key={indice}
                      className={`relative overflow-hidden rounded-[28px] shadow-[0_24px_50px_-30px_rgba(6,35,43,0.6)] ${posicao === 0 ? "row-span-2" : ""}`}
                    >
                      <Image src={v.foto} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover saturate-[1.1]" priority={posicao === 0} />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                      <figcaption className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-xs font-bold text-white">
                        <span className="grid size-7 place-items-center rounded-full" style={{ background: v.cor }}>
                          <v.icone size={14} />
                        </span>
                        {t.setores[indice].titulo}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-5 py-4 shadow-[0_20px_40px_-20px_rgba(6,35,43,0.45)] sm:left-auto sm:right-8">
                <Handshake className="text-[#00a9b3]" size={26} />
                <p className="text-sm font-bold leading-tight text-[#06232b]">
                  {totalDeClientes} {t.empresas}
                  <span className="block text-xs font-semibold text-[#6c868f]">{t.letreiroOlho}</span>
                </p>
              </div>
            </div>
          </div>
        </Conteiner>
      </section>

      {/* ================= 2. LETREIRO DE LOGOS ================= */}
      <section className="border-y border-[#e1eaec] bg-white py-16 lg:py-20" aria-label={t.letreiroAria}>
        <Conteiner>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#087a85]">{t.letreiroOlho}</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-bold tracking-[-0.035em] text-[#06232b] sm:text-4xl">
            {t.letreiroTitulo}
          </h2>
        </Conteiner>

        <div className="letreiro-faixa mt-12 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {faixas.map((faixa, i) => (
            <div key={i} className="flex overflow-hidden">
              <ul className={`letreiro flex w-max gap-4 pr-4 ${i === 1 ? "letreiro-reverso" : ""}`}>
                {[...faixa, ...faixa].map((nome, j) => (
                  <li key={`${nome}-${j}`} aria-hidden={j >= faixa.length ? true : undefined}>
                    <CartaoDeCliente nome={nome} compacto />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3. CLIENTES POR SETOR ================= */}
      <section id="carteira" className="scroll-mt-24 py-20 lg:py-28">
        <Conteiner>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#087a85]">
                <span className="h-2 w-2 rounded-full bg-[#00c8d2]" />
                {t.carteiraOlho}
              </p>
              <h2 className="mt-5 text-[clamp(2.5rem,4.6vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[#06232b]">
                {t.carteiraTitulo1} <span className="text-[#00a9b3]">{t.carteiraTitulo2}</span>
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-[#4a6670]">{t.carteiraApoio}</p>
          </div>

          <div className="mt-14 space-y-6">
            {clientesPorSetor.map((grupo, i) => {
              const v = visualDosSetores[i];
              const invertido = i % 2 === 1;
              const quantidade = grupo.clientes.length;
              return (
                <article
                  key={grupo.setor}
                  style={{ "--cor": v.cor } as CSSProperties}
                  className="grid overflow-hidden rounded-[36px] border border-black/[0.05] bg-white shadow-[0_30px_60px_-45px_rgba(6,35,43,0.45)] lg:grid-cols-12"
                >
                  <figure className={`relative min-h-[260px] lg:col-span-5 ${invertido ? "lg:order-2" : ""}`}>
                    <Image src={v.foto} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover saturate-[1.1]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute left-6 top-6 grid size-12 place-items-center rounded-2xl text-white shadow-lg" style={{ background: v.cor }}>
                      <v.icone size={22} />
                    </div>
                    <figcaption className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-5xl font-bold tracking-[-0.05em]">{String(quantidade).padStart(2, "0")}</p>
                      <p className="text-sm font-semibold text-white/85">{quantidade === 1 ? t.empresa : t.empresas}</p>
                    </figcaption>
                  </figure>

                  <div className="p-7 sm:p-10 lg:col-span-7">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: v.cor }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-[#06232b]">{t.setores[i].titulo}</h3>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-[#4a6670]">{t.setores[i].texto}</p>
                    <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                      {grupo.clientes.map((nome) => (
                        <li key={nome}>
                          <CartaoDeCliente nome={nome} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </Conteiner>
      </section>

      {/* ================= 4. FAIXA DE CONFIANÇA ================= */}
      <section className="relative isolate overflow-hidden py-24 text-white lg:py-32">
        <Image src="/imagens/clientes/setores/faixa.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover saturate-[1.15]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06232b]/85 via-[#06232b]/60 to-[#06232b]/25" />
        <Conteiner>
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-[clamp(2.4rem,4.6vw,4.4rem)] font-bold leading-[0.98] tracking-[-0.045em]">
                {t.faixaTitulo1} <span className="text-[#6ce8eb]">{t.faixaTitulo2}</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg text-white/85">{t.faixaApoio}</p>
            </div>
            <dl className="grid grid-cols-2 gap-3 lg:col-span-5">
              {numeros.map((n) => (
                <div key={n.rotulo} className="rounded-2xl border border-white/15 bg-black/25 p-5 backdrop-blur-md">
                  <dt className="text-4xl font-bold tracking-[-0.04em] text-[#6ce8eb]">{n.valor}</dt>
                  <dd className="mt-1 text-xs font-semibold text-white/80">{n.rotulo}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Conteiner>
      </section>

      {/* ================= 5. PROGRAMA DE PARCERIAS ================= */}
      <section id="parceria" className="scroll-mt-24 py-20 lg:py-28">
        <Conteiner>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cbe3e5] bg-white px-4 py-2">
                <Handshake size={14} className="text-[#00a9b3]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087a85]">{t.parceriaOlho}</span>
              </div>
              <h2 className="text-[clamp(2.5rem,4.6vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[#06232b]">
                {t.parceriaH1} <span className="text-[#00a9b3]">{t.parceriaH2}</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4a6670]">{t.parceriaApoio}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icone: TrendingUp, titulo: t.expansao, texto: t.expansaoTexto },
                  { icone: ShieldCheck, titulo: t.retencao, texto: t.retencaoTexto },
                ].map((item) => (
                  <div key={item.titulo} className="rounded-2xl border border-[#e1eaec] bg-white p-5">
                    <item.icone size={22} className="text-[#00a9b3]" />
                    <h3 className="mt-3 font-bold text-[#06232b]">{item.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#6c868f]">{item.texto}</p>
                  </div>
                ))}
              </div>
            </div>
            <figure className="relative h-[420px] overflow-hidden rounded-[36px] shadow-[0_30px_60px_-35px_rgba(6,35,43,0.55)] lg:col-span-6 lg:h-[540px]">
              <Image src="/imagens/clientes/setores/parceria.jpg" alt={t.altParceria} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
              <figcaption className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-[#06232b] backdrop-blur">
                {t.porque}
              </figcaption>
            </figure>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold tracking-[-0.035em] text-[#06232b] md:text-4xl">
              {t.oferecemos1} <span className="text-[#00a9b3]">{t.oferecemos2}</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {t.beneficios.map(([titulo, texto], i) => {
              const Icone = iconesBeneficios[i];
              return (
                <article key={titulo} className="group rounded-[28px] border border-[#e1eaec] bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf7f8] text-[#00a9b3] transition group-hover:bg-[#00a9b3] group-hover:text-white">
                    <Icone size={24} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-[#06232b]">{titulo}</h3>
                  <p className="mt-3 leading-relaxed text-[#4a6670]">{texto}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-20 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#087a85]">{t.modelosOlho}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-[#06232b] md:text-5xl">
                {t.formato1} <span className="text-[#00a9b3]">{t.formato2}</span>
              </h2>
            </div>
            <p className="max-w-sm leading-relaxed text-[#4a6670] lg:text-right">{t.formatoApoio}</p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {t.perfis.map(([titulo, texto], i) => {
              const Icone = iconesPerfis[i];
              return (
                <div key={titulo} className="relative overflow-hidden rounded-[28px] border border-[#dbe9eb] bg-white p-9">
                  <div className="absolute left-0 top-0 h-1.5 w-full bg-[#00a9b3]" />
                  <Icone size={36} strokeWidth={1.3} className="text-[#00a9b3]" />
                  <h3 className="mt-6 text-2xl font-bold text-[#06232b]">{titulo}</h3>
                  <p className="mt-3 leading-relaxed text-[#4a6670]">{texto}</p>
                </div>
              );
            })}
          </div>
        </Conteiner>
      </section>

      {/* ================= 6. CHAMADA FINAL ================= */}
      <section className="pb-24 lg:pb-32">
        <Conteiner>
          <div className="flex flex-col overflow-hidden rounded-[40px] bg-[#073b49] shadow-2xl lg:flex-row">
            <div className="flex flex-col justify-center p-10 lg:w-[55%] lg:p-16">
              <span className="mb-6 w-fit rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80">
                {t.jornada}
              </span>
              <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {t.construir1} <span className="text-[#6ce8eb]">{t.construir2}</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">{t.whatsappApoio}</p>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#00c8d2] px-8 py-4 text-base font-bold text-[#06232b] transition hover:bg-white"
              >
                {t.falarExpansao}
                <ArrowUpRight size={20} />
              </a>
            </div>
            <div className="flex flex-col justify-center border-t border-white/10 bg-[#0a4c59] p-10 lg:w-[45%] lg:border-l lg:border-t-0 lg:p-16">
              <h3 className="mb-8 text-xl font-bold text-white">{t.passos}</h3>
              <ol className="space-y-7">
                {t.etapas.map(([titulo, texto], i) => (
                  <li key={titulo} className="flex gap-4">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${i === 0 ? "bg-[#6ce8eb] text-[#06232b]" : "border border-white/30 text-white"}`}>
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-white">{titulo}</h4>
                      <p className="mt-1 text-sm text-white/65">{texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Conteiner>
      </section>
    </div>
  );
}
