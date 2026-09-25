import type { Metadata } from "next";
import Image from "next/image";

import { Conteiner } from "@/componentes/ui/Conteiner";
import { missaoVisaoValoresEm, numerosEm } from "@/dados/site";
import { registros, textoRegistroMapa } from "@/dados/contato";
import { alternativas, idiomaDe, rota } from "@/i18n/config";
import { textos } from "./textos";

type Props = { params: Promise<{ idioma: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idioma = idiomaDe((await params).idioma);
  const t = textos[idioma];
  return { title: t.metaTitulo, description: t.metaDescricao, alternates: alternativas(idioma, "/sobre") };
}

export default async function PaginaSobre({ params }: Props) {
  const idioma = idiomaDe((await params).idioma);
  const t = textos[idioma];
  const imagensDasEtapas = [
    "/imagens/sobre/etapa-origem.jpg",
    "/imagens/sobre/etapa-aplicacao.jpg",
    "/imagens/sobre/etapa-equilibrio.jpg",
    "/imagens/sobre/etapa-resultado.jpg",
  ];
  const imagensDosPilares = [
    "/imagens/sobre/pilar-missao.jpg",
    "/imagens/sobre/pilar-visao.jpg",
    "/imagens/sobre/pilar-valores.jpg",
  ];
  const etapas = t.etapas.map(([titulo, texto], i) => ({ numero: `0${i + 1}`, titulo, texto }));
  const numeros = numerosEm[idioma];
  const missaoVisaoValores = missaoVisaoValoresEm[idioma];

  return (
    <div className="overflow-hidden bg-[#fbfcfc]">
      {/* HERO - Mantido estruturalmente pois já possui ótima conversão */}
      <section className="relative pb-20 pt-16 lg:pb-28 lg:pt-24">
        <Conteiner>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* TEXTO */}
            <div className="relative z-10">
              <div className="mb-7 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#00bfd0]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#057f91]">
                  {t.olhoHero}
                </span>
              </div>

              <h1 className="max-w-[720px] text-[clamp(3rem,5vw,5.8rem)] font-medium leading-[0.93] tracking-[-0.065em] text-[#052f3c]">
                {t.hero1}
                <br />
                {t.hero2}
                <br />
                <span className="text-[#00aabe]">{t.hero3}</span>
              </h1>

              <p className="mt-8 max-w-[570px] text-[17px] leading-8 text-[#56717a]">
                {t.heroApoio}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href="#nossa-historia"
                  className="inline-flex items-center gap-4 rounded-full bg-[#04bfd0] px-7 py-4 text-sm font-semibold text-[#04313c] transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {t.historiaBotao}
                  <span aria-hidden>↘</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-[#607881]">
                  <span className="h-px w-8 bg-[#9ccfd4]" />
                  {t.cienciaVida}
                </div>
              </div>
            </div>

            {/* COMPOSIÇÃO VISUAL */}
            <div className="relative min-h-[520px] lg:min-h-[640px]">
              <div className="absolute right-0 top-0 h-[88%] w-[88%] overflow-hidden rounded-[38px] shadow-2xl">
                <Image
                  src="/imagens/dia-de-campo-grupo.jpg"
                  alt={t.altDiaCampo}
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052e38]/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/80 font-semibold">
                      {t.expInovacao}
                    </p>
                    <p className="mt-2 max-w-[320px] text-2xl font-medium leading-tight">
                      {t.conhecCampo}
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD SOBREPOSTO */}
              <div className="absolute bottom-0 left-0 w-[260px] rounded-[28px] border border-[#dbe9eb] bg-white p-7 shadow-[0_20px_60px_rgba(4,48,60,0.12)] md:w-[300px] z-20">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6a848c]">
                  {t.historiaCampo}
                </p>
                <div className="mt-7 flex items-end gap-2">
                  <span className="text-6xl font-medium tracking-[-0.07em] text-[#008b9e]">30</span>
                  <span className="mb-2 text-xl font-semibold text-[#008b9e]">{t.anos}</span>
                </div>
                <div className="mt-6 h-px bg-[#e4edef]" />
                <p className="mt-5 text-sm leading-6 text-[#5b747c]">
                  {t.expReunindo}
                </p>
              </div>
            </div>
          </div>
        </Conteiner>
      </section>

      {/* HISTÓRIA - Adicionado Imagens de Apoio para Storytelling */}
      <section id="nossa-historia" className="border-y border-[#e5edef] bg-white py-20 lg:py-28">
        <Conteiner>
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Coluna de Texto */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b9c9]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087f90]">
                  {t.nossaOrigem}
                </span>
              </div>
              <h2 className="mt-6 text-[clamp(2.5rem,4vw,4.4rem)] font-medium leading-[0.97] tracking-[-0.055em] text-[#082f3b]">
                {t.antes1}<br /> {t.antes2} <span className="text-[#00aabe]">{t.antes3}</span>
              </h2>

              <div className="mt-12 grid gap-10 md:grid-cols-2">
                <div>
                  <span className="text-sm font-semibold text-[#008da0]">01</span>
                  <h3 className="mt-4 text-xl font-semibold text-[#08313d]">{t.agro}</h3>
                  <p className="mt-4 leading-7 text-[#627b83] text-sm">
                    {t.agroTexto}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-[#008da0]">02</span>
                  <h3 className="mt-4 text-xl font-semibold text-[#08313d]">{t.efluentes}</h3>
                  <p className="mt-4 leading-7 text-[#627b83] text-sm">
                    {t.efluentesTexto}
                  </p>
                </div>
              </div>

              <div className="mt-10 border-l-[3px] border-[#69cbd3] pl-7">
                <p className="text-xl leading-[1.45] tracking-[-0.025em] text-[#163f49]">
                  {t.pergunta1}
                  <span className="font-semibold block mt-2 text-[#00aabe]">
                    {t.pergunta2}
                  </span>
                </p>
              </div>
            </div>

            {/* Coluna de Imagens (Nova Estrutura) */}
            <div className="relative h-[500px] w-full lg:h-[600px]">
              {/* Imagem Principal (Ex: Foto bonita de uma fazenda/campo) */}
              <div className="absolute right-0 top-0 w-4/5 h-4/5 rounded-[32px] overflow-hidden shadow-xl z-10">
                <Image 
                  src="/imagens/sobre/historia-campo.jpg"
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  alt={t.altCampo} 
                  fill 
                  className="object-cover" 
                />
              </div>
              {/* Imagem Secundária Sobreposta (Ex: Foto de laboratório/ciência) */}
              <div className="absolute left-0 bottom-0 w-3/5 h-[55%] rounded-[32px] border-8 border-white overflow-hidden shadow-2xl z-20">
                <Image 
                  src="/imagens/sobre/historia-laboratorio.jpg"
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  alt={t.altLab} 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>
          </div>
        </Conteiner>
      </section>

      {/* COMO FUNCIONA - Adicionado suporte a imagens nos cards */}
      <section className="py-20 lg:py-28 relative">
        <Conteiner>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b9c9]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087f90]">
                  {t.tecBiox}
                </span>
              </div>
              <h2 className="mt-5 max-w-[670px] text-[clamp(2.5rem,4vw,4.3rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#082f3b]">
                {t.processo1}<br />
                <span className="text-[#00aabe]">{t.processo2}</span>
              </h2>
            </div>
            <p className="max-w-[420px] text-sm leading-7 text-[#668087]">
              {t.processoApoio}
            </p>
          </div>

          <div className="relative mt-16">
            <div className="absolute left-[10%] right-[10%] top-[37px] hidden h-px bg-[#b8dfe3] lg:block" />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {etapas.map((etapa, index) => (
                <article
                  key={etapa.numero}
                  className="group relative rounded-[28px] border border-[#dce9eb] bg-white overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(4,57,67,0.12)] flex flex-col"
                >
                  {/* Nova Imagem no Card para ilustrar a etapa */}
                  <div className="relative h-44 w-full bg-[#f0f7f8] overflow-hidden">
                     <Image 
                        src={imagensDasEtapas[index]}
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        alt={`${t.ilustracao} ${etapa.titulo}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                  </div>

                  <div className="p-7 relative z-10 flex-1 bg-white">
                    <div className="absolute -top-6 left-7 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-[#00aabe] text-white font-bold shadow-md">
                      {etapa.numero}
                    </div>
                    <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a9298]">
                      {t.etapa} {index + 1}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#092f3b]">
                      {etapa.titulo}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#637c83]">
                      {etapa.texto}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Banner O Princípio com Imagem de Fundo */}
          <div className="relative mt-16 overflow-hidden rounded-[32px] bg-[#073847] p-8 shadow-xl lg:p-12">
             {/* Foto de laboratório: aparece à direita, o texto fica sobre o degradê */}
             <Image
               src="/imagens/sobre/principio-laboratorio.jpg"
               alt={t.altTextura}
               fill
               sizes="100vw"
               className="object-cover object-right"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#073847] via-[#073847]/85 to-[#073847]/35" />
            <div className="relative z-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] text-white items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#66dce6]">
                  {t.principio}
                </p>
                <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] lg:text-4xl">
                  {t.natureza1}<br /> {t.natureza2}
                </h3>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <p className="text-sm leading-7 text-white/80">
                  {t.principio1}
                </p>
                <p className="text-sm leading-7 text-white/80">
                  {t.principio2}
                </p>
              </div>
            </div>
          </div>
        </Conteiner>
      </section>

      {/* NÚMEROS */}
      <section className="bg-[#eaf7f7] py-20 lg:py-24">
        <Conteiner>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div className="pr-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#008d9e]">
                {t.emNumeros}
              </p>
              <h2 className="mt-5 text-[clamp(2.4rem,4vw,4.2rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#07333e]">
                {t.medida1}<br /> {t.medida2}
              </h2>
              {/* Imagem de apoio opcional para dar contexto aos números */}
              <div className="mt-8 relative h-48 w-full rounded-2xl overflow-hidden shadow-md hidden lg:block">
                 <Image 
                    src="/imagens/sobre/numeros-campo.jpg"
                    sizes="30vw"
                    alt={t.altResultados}
                    fill
                    className="object-cover"
                 />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-[#bcdcdf] md:grid-cols-3 shadow-lg">
              {numeros.map((numero) => (
                <div key={numero.descricao} className="min-h-[190px] bg-white p-7 flex flex-col justify-center transition-colors hover:bg-[#f5fbfb]">
                  <div className="flex items-end">
                    <span className={`font-medium tracking-[-0.06em] text-[#008b9d] ${numero.valor.length > 4 ? "text-4xl lg:text-[2.6rem]" : "text-5xl lg:text-6xl"}`}>
                      {numero.valor}
                    </span>
                    <span className="mb-1 ml-1 text-xl font-semibold text-[#008b9d]">
                      {numero.unidade}
                    </span>
                  </div>
                  <p className="mt-4 max-w-[180px] text-sm leading-6 text-[#617a82] font-medium">
                    {numero.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Conteiner>
      </section>

      {/* MISSÃO / VISÃO / VALORES - Humanizado com Fotos */}
      <section className="bg-white py-20 lg:py-28">
        <Conteiner>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#008d9e]">
              {t.sustenta}
            </p>
            <h2 className="mx-auto mt-5 max-w-[750px] text-[clamp(2.5rem,4vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#07323e]">
              {t.principios1}<br />
              <span className="text-[#00aabe]">{t.principios2}</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {missaoVisaoValores.map((item, index) => (
              <article
                key={item.pilar}
                className={`relative flex flex-col overflow-hidden rounded-[30px] border transition-transform hover:-translate-y-1 ${
                  index === 1
                    ? "border-[#0b4b59] bg-[#073b49] text-white shadow-xl"
                    : "border-[#dce9eb] bg-[#f9fbfb] text-[#07313d]"
                }`}
              >
                {/* Imagem Representativa do Pilar */}
                <div className="relative h-56 w-full shrink-0">
                  <Image 
                    src={imagensDosPilares[index]}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    alt={item.pilar}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${index === 1 ? 'from-[#073b49] to-transparent' : 'from-[#f9fbfb] to-transparent'}`}></div>
                </div>

                <div className="relative z-10 p-8 pt-0 flex-1 flex flex-col">
                  <span className={`text-xs font-bold tracking-widest uppercase mb-2 ${index === 1 ? "text-[#66dbe4]" : "text-[#008da0]"}`}>
                    0{index + 1}
                  </span>
                  <h3 className="text-3xl font-medium tracking-[-0.04em]">
                    {item.pilar}
                  </h3>

                  {item.complemento && (
                    <p className={`mt-2 text-sm italic ${index === 1 ? "text-white/60" : "text-[#789096]"}`}>
                      {item.complemento}
                    </p>
                  )}
                  <div className={`my-6 h-px w-full ${index === 1 ? "bg-white/15" : "bg-[#dbe7e9]"}`} />
                  <p className={`text-sm leading-7 ${index === 1 ? "text-white/80" : "text-[#617a82]"}`}>
                    {item.texto}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Conteiner>
      </section>

      {/* REGISTROS - Com foto de credibilidade */}
      <section className="py-20 lg:py-28">
        <Conteiner>
          <div className="overflow-hidden rounded-[36px] border border-[#d8e7e9] bg-white shadow-lg">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              {/* Foto das raízes: a prova visual lado a lado */}
              <figure className="relative min-h-[520px] overflow-hidden bg-[#0d1f14] lg:min-h-full">
                <Image
                  src="/imagens/sobre/credibilidade-raizes.jpg"
                  alt={t.altRaizes}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[50%_60%]"
                />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="absolute inset-x-5 top-5 flex justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.14em]">
                  <span className="rounded-full bg-[#8bd34f] px-3 py-1.5 text-[#0d2a12] shadow-lg">{t.comBiox}</span>
                  <span className="rounded-full bg-white/85 px-3 py-1.5 text-[#33413a] shadow-lg">{t.padraoFazenda}</span>
                </div>
                <figcaption className="absolute inset-x-6 bottom-6 text-white lg:inset-x-8 lg:bottom-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b7ef8a]">{t.ladoALado}</p>
                  <p className="mt-2 max-w-sm text-xl font-medium leading-snug [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">{t.legendaRaizes}</p>
                </figcaption>
              </figure>

              {/* Lado Claro - Lista */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#008d9e]">
                  {t.credibilidade}
                </p>
                <h2 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.05em] text-[#07313d] lg:text-5xl">
                  {t.pesquisa1} {t.pesquisa2} {t.pesquisa3}
                </h2>
                <p className="mt-5 max-w-[460px] text-sm leading-7 text-[#5b747c]">
                  {t.credApoio}
                </p>
                <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.18em] text-[#759097]">
                  {t.registrosOficiais}
                </p>
                <div className="mt-3 divide-y divide-[#e1eaec]">
                  {registros.map((registro, index) => (
                    <div key={registro.orgao} className="grid gap-4 py-6 md:grid-cols-[50px_1fr_auto] md:items-center hover:bg-slate-50 transition-colors px-2 rounded-xl">
                      <span className="text-xs font-bold text-[#91a4a8]">0{index + 1}</span>
                      <div>
                        <h3 className="font-semibold text-[#07313d] text-lg">{registro.orgao}</h3>
                        {idioma === "pt" && registro.observacao && (
                          <p className="mt-1 text-xs leading-5 text-[#718a90] max-w-[280px]">
                            {registro.observacao}
                          </p>
                        )}
                      </div>
                      <code className="rounded-full bg-[#eff7f7] px-4 py-2 text-xs font-bold tracking-wider text-[#147b89] border border-[#d4ebed]">
                        {registro.orgao === "MAPA" ? textoRegistroMapa[idioma] : registro.numero}
                      </code>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-start gap-4 rounded-[22px] bg-[#eef9f9] p-6 border border-[#d4edef]">
                  <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-[#00aabe] flex items-center justify-center text-white font-bold">✓</div>
                  <p className="text-sm leading-6 text-[#496a73]">
                    {t.vicosa1} <strong className="text-[#05303c]">{t.vicosa2}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Conteiner>
      </section>

      {/* FECHAMENTO / CTA - Fundo de Imagem de Alta Conversão */}
      <section className="pb-20 lg:pb-28">
        <Conteiner>
          <div className="relative overflow-hidden rounded-[38px] px-8 py-16 lg:px-16 lg:py-24 shadow-2xl group">
             {/* Imagem de Fundo do CTA */}
             <Image 
                src="/imagens/sobre/cta-campo.jpg"
                sizes="100vw"
                alt={t.altCta}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             {/* Overlay Escuro para leitura */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#07313d]/90 to-[#07313d]/60 backdrop-blur-[2px]" />

            <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
              <div>
                <p className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#66dbe4] backdrop-blur-md mb-6">
                  {t.umaCiencia}
                </p>
                <h2 className="max-w-[700px] text-[clamp(2.5rem,4vw,4.4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
                  {t.proximo1} <span className="text-[#66dbe4]">{t.proximo2}</span>
                </h2>
              </div>

              <a
                href={rota(idioma, "/solucoes")}
                className="inline-flex shrink-0 items-center justify-center gap-4 rounded-full bg-[#00aabe] hover:bg-[#00c2d8] px-8 py-5 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,170,190,0.3)]"
              >
                {t.conhecerSolucoes}
                <span className="text-xl" aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </Conteiner>
      </section>
    </div>
  );
}