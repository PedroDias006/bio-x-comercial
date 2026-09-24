import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  FlaskConical,
  Sparkles,
} from "lucide-react";

import { Conteiner } from "@/componentes/ui/Conteiner";
import { AvisoPendencia } from "@/componentes/ui/AvisoPendencia";
import { solucoes, acharSolucao } from "@/dados/solucoes";
import { urlWhatsapp } from "@/dados/contato";

export function generateStaticParams() {
  return solucoes.map((solucao) => ({
    slug: solucao.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solucao = acharSolucao(slug);

  if (!solucao) return {};

  return {
    title: solucao.nome,
    description: solucao.resumo,
    alternates: {
      canonical: `/solucoes/${solucao.slug}`,
    },
  };
}

export default async function PaginaDaSolucao({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const solucao = acharSolucao(slug);

  if (!solucao) {
    notFound();
  }

  const outrasSolucoes = solucoes
    .filter(
      (item) =>
        item.slug !== solucao.slug &&
        item.categoria === solucao.categoria,
    )
    .slice(0, 3);

  return (
    <main className="overflow-hidden bg-[#fbfcfc]">
      {/* HERO */}
      <section className="pb-16 pt-10 lg:pb-24 lg:pt-14">
        <Conteiner>
          {/* VOLTAR */}
          <Link
            href="/solucoes"
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#638087] transition hover:text-[#008d9e]"
          >
            <ArrowLeft size={15} />
            Todas as soluções
          </Link>

          <div className="relative min-h-[680px] overflow-hidden rounded-[38px] bg-[#dcebed] lg:min-h-[720px]">
            {/* IMAGEM */}
            <Image
              src={solucao.imagem}
              alt={solucao.nome}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            {/* OVERLAYS */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#032b35]/90 via-[#032b35]/55 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#032b35]/45 via-transparent to-transparent" />

            {/* CONTEÚDO */}
            <div className="relative z-10 flex min-h-[680px] flex-col justify-between p-7 text-white sm:p-10 lg:min-h-[720px] lg:p-14">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4de3ed]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-white/80">
                    {solucao.categoria}
                  </span>
                </div>

                <span className="hidden text-xs text-white/55 sm:block">
                  Biotecnologia BIO-X
                </span>
              </div>

              <div className="max-w-[780px]">
                <p className="mb-5 text-sm font-medium text-[#6ce0e7]">
                  {solucao.chamada}
                </p>

                <h1 className="text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[0.84] tracking-[-0.07em]">
                  {solucao.nome}
                </h1>

                <p className="mt-8 max-w-[600px] text-[16px] leading-8 text-white/72">
                  {solucao.descricao}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href={urlWhatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-5 rounded-full bg-[#08c1d1] px-7 py-4 text-sm font-semibold text-[#06333d] transition hover:-translate-y-0.5"
                  >
                    Falar com um técnico
                    <ArrowUpRight size={17} />
                  </a>

                  <a
                    href="#entenda"
                    className="inline-flex items-center gap-3 rounded-full border border-white/25 px-6 py-4 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    Entenda a solução
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* DESTAQUE */}
            {solucao.destaque ? (
              <div className="absolute bottom-8 right-8 z-20 hidden w-[260px] rounded-[26px] border border-white/30 bg-white/90 p-6 text-[#07323d] shadow-xl backdrop-blur-xl md:block lg:bottom-12 lg:right-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#728b91]">
                  Resultado em destaque
                </p>

                <div className="mt-5">
                  <span className="text-5xl font-medium tracking-[-0.06em] text-[#008c9e]">
                    {solucao.destaque.valor}
                  </span>
                </div>

                <p className="mt-4 text-xs leading-5 text-[#637c83]">
                  {solucao.destaque.legenda}
                </p>
              </div>
            ) : null}
          </div>
        </Conteiner>
      </section>

      {/* INTRODUÇÃO */}
      <section id="entenda" className="scroll-mt-28 py-16 lg:py-24">
        <Conteiner>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b9c9]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087f90]">
                  Entenda a solução
                </span>
              </div>

              <h2 className="mt-5 max-w-[520px] text-[clamp(2.5rem,4vw,4.3rem)] font-medium leading-[0.97] tracking-[-0.055em] text-[#07313d]">
                Biologia aplicada
                <br />
                onde ela
                <span className="text-[#00aabe]"> importa.</span>
              </h2>
            </div>

            <div className="lg:pt-3">
              <p className="max-w-[650px] text-xl leading-9 tracking-[-0.02em] text-[#31535c]">
                {solucao.descricao}
              </p>

              <div className="mt-10 h-px bg-[#dbe7e9]" />

              <div className="mt-7 flex items-center gap-3 text-xs text-[#70888e]">
                <FlaskConical
                  size={16}
                  className="text-[#058e9f]"
                />
                Tecnologia desenvolvida para aplicação prática.
              </div>
            </div>
          </div>
        </Conteiner>
      </section>

      {/* BENEFÍCIOS */}
      {solucao.beneficios.length > 0 ? (
        <section className="border-y border-[#e2ebed] bg-white py-20 lg:py-28">
          <Conteiner>
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#008a9b]">
                  O que muda
                </p>

                <h2 className="mt-5 text-[clamp(2.5rem,4vw,4.2rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#07313d]">
                  Benefícios que
                  <br />
                  chegam à
                  <span className="text-[#00aabe]"> prática.</span>
                </h2>

                <p className="mt-7 max-w-[390px] text-sm leading-7 text-[#687f86]">
                  A solução atua de forma integrada ao ambiente, trazendo
                  benefícios para o processo, para a operação e para o
                  resultado.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden rounded-[30px] border border-[#dce8ea] bg-[#dce8ea] sm:grid-cols-2">
                {solucao.beneficios.map((beneficio, index) => (
                  <div
                    key={beneficio}
                    className="group min-h-[190px] bg-[#fbfcfc] p-7 transition hover:bg-[#f2faf9]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e2f6f7]">
                        <Check
                          size={17}
                          strokeWidth={2}
                          className="text-[#018d9e]"
                        />
                      </div>

                      <span className="text-xs text-[#a1b2b6]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-8 max-w-[280px] text-[15px] font-medium leading-7 text-[#153f49]">
                      {beneficio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Conteiner>
        </section>
      ) : null}

      {/* DETALHES */}
      {solucao.detalhes?.length ? (
        <section className="py-20 lg:py-28">
          <Conteiner>
            <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#008b9c]">
                  Mais sobre a tecnologia
                </p>

                <h2 className="mt-5 text-[clamp(2.5rem,4vw,4.2rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#07313d]">
                  O que existe
                  <br />
                  <span className="text-[#00aabe]">por trás da solução.</span>
                </h2>
              </div>

              <p className="max-w-[400px] text-sm leading-7 text-[#6b8289]">
                Cada linha BIO-X foi desenvolvida para atuar em uma necessidade
                específica sem abandonar o princípio biológico que conecta toda
                a tecnologia.
              </p>
            </div>

            <div className="divide-y divide-[#dfe9eb] border-y border-[#dfe9eb]">
              {solucao.detalhes.map((detalhe, index) => (
                <article
                  key={detalhe.titulo}
                  className="group grid gap-6 py-9 lg:grid-cols-[90px_0.7fr_1.3fr] lg:items-start lg:py-11"
                >
                  <span className="text-sm font-semibold text-[#8ca0a5]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#07313d]">
                    {detalhe.titulo}
                  </h3>

                  <p className="max-w-[620px] text-sm leading-7 text-[#637d84]">
                    {detalhe.texto}
                  </p>
                </article>
              ))}
            </div>
          </Conteiner>
        </section>
      ) : null}

      {/* COMPOSIÇÃO */}
      {solucao.composicao.length > 0 ? (
        <section className="bg-[#eaf7f7] py-20 lg:py-28">
          <Conteiner>
            <div className="overflow-hidden rounded-[34px] border border-[#cfe4e6] bg-white">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                <div className="relative overflow-hidden bg-[#073b49] p-9 text-white lg:p-12">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

                  <Sparkles
                    size={26}
                    strokeWidth={1.5}
                    className="text-[#5bd7e0]"
                  />

                  <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#67d9e1]">
                    Composição
                  </p>

                  <h2 className="mt-4 max-w-[380px] text-4xl font-medium leading-[1] tracking-[-0.05em] lg:text-5xl">
                    Pequenos organismos.
                    <br />
                    Grande impacto.
                  </h2>

                  <p className="mt-7 max-w-[350px] text-sm leading-7 text-white/65">
                    A tecnologia BIO-X utiliza microorganismos selecionados
                    para atuar de maneira integrada ao processo.
                  </p>
                </div>

                <div className="p-8 lg:p-12">
                  <div className="divide-y divide-[#e1eaec]">
                    {solucao.composicao.map((item, index) => (
                      <div
                        key={`${item.grupo}-${index}`}
                        className="grid gap-4 py-6 first:pt-0 last:pb-0 sm:grid-cols-[60px_1fr]"
                      >
                        <span className="text-xs font-semibold text-[#9aadb2]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div>
                          <p className="text-base font-semibold text-[#07313d]">
                            {item.grupo}
                          </p>

                          {item.cientifico ? (
                            <p className="mt-1 text-sm italic text-[#71888e]">
                              {item.cientifico}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Conteiner>
        </section>
      ) : null}

      {/* PENDÊNCIAS */}
      {solucao.pendencias.length > 0 ? (
        <section className="py-12">
          <Conteiner>
            <AvisoPendencia itens={solucao.pendencias} />
          </Conteiner>
        </section>
      ) : null}

      {/* OUTRAS SOLUÇÕES */}
      {outrasSolucoes.length > 0 ? (
        <section className="py-20 lg:py-28">
          <Conteiner>
            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#008b9c]">
                  Continue explorando
                </p>

                <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] text-[#07313d]">
                  Outras soluções da linha.
                </h2>
              </div>

              <Link
                href="/solucoes"
                className="hidden items-center gap-2 text-sm font-semibold text-[#078899] sm:flex"
              >
                Ver todas
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {outrasSolucoes.map((item) => (
                <Link
                  key={item.slug}
                  href={`/solucoes/${item.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-[#e1eaeb]">
                    <Image
                      src={item.imagem}
                      alt={item.nome}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#108797]">
                        {item.categoria}
                      </p>

                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-[#07313d]">
                        {item.nome}
                      </h3>
                    </div>

                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d3e1e3] transition group-hover:bg-[#e5f6f7]">
                      <ArrowUpRight
                        size={15}
                        className="text-[#078899]"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Conteiner>
        </section>
      ) : null}

      {/* CTA */}
      <section className="pb-24 lg:pb-32">
        <Conteiner>
          <div className="relative overflow-hidden rounded-[36px] bg-[#dff5f6] p-8 lg:p-14">
            <div className="absolute -right-24 -top-28 h-[360px] w-[360px] rounded-full border border-[#8dd7dd]" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#078899]">
                  Fale com a BIO-X
                </p>

                <h2 className="mt-5 max-w-[650px] text-[clamp(2.4rem,4vw,4.2rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#07313d]">
                  Quer entender como essa solução se aplica ao seu
                  <span className="text-[#00aabe]"> cenário?</span>
                </h2>
              </div>

              <a
                href={urlWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit shrink-0 items-center gap-5 rounded-full bg-[#08bfd0] px-7 py-4 text-sm font-semibold text-[#07323d] transition hover:-translate-y-0.5"
              >
                Falar com um técnico
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </Conteiner>
      </section>
    </main>
  );
}