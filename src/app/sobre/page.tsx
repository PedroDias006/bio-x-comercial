import type { Metadata } from "next";
import Image from "next/image";

import { Conteiner } from "@/componentes/ui/Conteiner";
import { missaoVisaoValores, numeros } from "@/dados/site";
import { registros } from "@/dados/contato";

export const metadata: Metadata = {
  title: "A BIO-X",
  description:
    "Mais de 30 anos de experiência transformados em biotecnologia aplicada à agricultura, saneamento e produção animal.",
};

const etapas = [
  {
    numero: "01",
    titulo: "Origem",
    texto: "Microorganismos benéficos selecionados para atuar de forma natural nos processos biológicos.",
  },
  {
    numero: "02",
    titulo: "Aplicação",
    texto: "A tecnologia é aplicada diretamente no ambiente onde a transformação precisa acontecer.",
  },
  {
    numero: "03",
    titulo: "Equilíbrio",
    texto: "Os microorganismos benéficos favorecem uma nova dinâmica biológica no meio.",
  },
  {
    numero: "04",
    titulo: "Resultado",
    texto: "Mais equilíbrio, eficiência e novas possibilidades para cada cadeia produtiva.",
  },
];

export default function PaginaSobre() {
  return (
    <main className="overflow-hidden bg-[#fbfcfc]">
      {/* HERO - Mantido estruturalmente pois já possui ótima conversão */}
      <section className="relative pb-20 pt-16 lg:pb-28 lg:pt-24">
        <Conteiner>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* TEXTO */}
            <div className="relative z-10">
              <div className="mb-7 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#00bfd0]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#057f91]">
                  A estrutura por trás da BIO-X
                </span>
              </div>

              <h1 className="max-w-[720px] text-[clamp(3rem,5vw,5.8rem)] font-medium leading-[0.93] tracking-[-0.065em] text-[#052f3c]">
                Biologia que
                <br />
                atravessa
                <br />
                <span className="text-[#00aabe]">gerações.</span>
              </h1>

              <p className="mt-8 max-w-[570px] text-[17px] leading-8 text-[#56717a]">
                A BIO-X nasceu da união entre mais de três décadas de
                experiência no agronegócio e no tratamento de efluentes com
                uma das tecnologias mais antigas e eficientes da natureza:
                os microorganismos.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href="#nossa-historia"
                  className="inline-flex items-center gap-4 rounded-full bg-[#04bfd0] px-7 py-4 text-sm font-semibold text-[#04313c] transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Conheça nossa história
                  <span aria-hidden>↘</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-[#607881]">
                  <span className="h-px w-8 bg-[#9ccfd4]" />
                  Ciência aplicada à vida
                </div>
              </div>
            </div>

            {/* COMPOSIÇÃO VISUAL */}
            <div className="relative min-h-[520px] lg:min-h-[640px]">
              <div className="absolute right-0 top-0 h-[88%] w-[88%] overflow-hidden rounded-[38px] shadow-2xl">
                <Image
                  src="/imagens/hero/dia-de-campo-grupo.jpg"
                  alt="Dia de campo BIO-X"
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052e38]/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/80 font-semibold">
                      Experiência que gera inovação
                    </p>
                    <p className="mt-2 max-w-[320px] text-2xl font-medium leading-tight">
                      Conhecimento de campo transformado em tecnologia.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD SOBREPOSTO */}
              <div className="absolute bottom-0 left-0 w-[260px] rounded-[28px] border border-[#dbe9eb] bg-white p-7 shadow-[0_20px_60px_rgba(4,48,60,0.12)] md:w-[300px] z-20">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6a848c]">
                  Uma história construída no campo
                </p>
                <div className="mt-7 flex items-end gap-2">
                  <span className="text-6xl font-medium tracking-[-0.07em] text-[#008b9e]">30</span>
                  <span className="mb-2 text-xl font-semibold text-[#008b9e]">+ anos</span>
                </div>
                <div className="mt-6 h-px bg-[#e4edef]" />
                <p className="mt-5 text-sm leading-6 text-[#5b747c]">
                  Experiência reunindo agronegócio, tratamento de efluentes, pesquisa e aplicação prática.
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
                  Nossa origem
                </span>
              </div>
              <h2 className="mt-6 text-[clamp(2.5rem,4vw,4.4rem)] font-medium leading-[0.97] tracking-[-0.055em] text-[#082f3b]">
                Antes da tecnologia,<br /> veio a <span className="text-[#00aabe]">experiência.</span>
              </h2>

              <div className="mt-12 grid gap-10 md:grid-cols-2">
                <div>
                  <span className="text-sm font-semibold text-[#008da0]">01</span>
                  <h3 className="mt-4 text-xl font-semibold text-[#08313d]">Agronegócio</h3>
                  <p className="mt-4 leading-7 text-[#627b83] text-sm">
                    A vivência de décadas no campo construiu o entendimento dos desafios reais enfrentados diariamente pelos produtores.
                  </p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-[#008da0]">02</span>
                  <h3 className="mt-4 text-xl font-semibold text-[#08313d]">Tratamento de efluentes</h3>
                  <p className="mt-4 leading-7 text-[#627b83] text-sm">
                    Três décadas de experiência em processos de tratamento ampliaram o conhecimento sobre equilíbrio biológico.
                  </p>
                </div>
              </div>

              <div className="mt-10 border-l-[3px] border-[#69cbd3] pl-7">
                <p className="text-xl leading-[1.45] tracking-[-0.025em] text-[#163f49]">
                  Dessa combinação surgiu uma pergunta:
                  <span className="font-semibold block mt-2 text-[#00aabe]">
                    e se a própria biologia pudesse resolver problemas que exigem soluções complexas?
                  </span>
                </p>
              </div>
            </div>

            {/* Coluna de Imagens (Nova Estrutura) */}
            <div className="relative h-[500px] w-full lg:h-[600px]">
              {/* Imagem Principal (Ex: Foto bonita de uma fazenda/campo) */}
              <div className="absolute right-0 top-0 w-4/5 h-4/5 rounded-[32px] overflow-hidden shadow-xl z-10">
                <Image 
                  src="/imagens/placeholder-campo.jpg" // SUGESTÃO: Coloque uma foto aérea de campo ou lavoura aqui
                  alt="Experiência no campo" 
                  fill 
                  className="object-cover" 
                />
              </div>
              {/* Imagem Secundária Sobreposta (Ex: Foto de laboratório/ciência) */}
              <div className="absolute left-0 bottom-0 w-3/5 h-[55%] rounded-[32px] border-8 border-white overflow-hidden shadow-2xl z-20">
                <Image 
                  src="/imagens/placeholder-lab.jpg" // SUGESTÃO: Coloque uma foto de cientista ou microscópio aqui
                  alt="Tecnologia e Laboratório" 
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
                  Tecnologia BIO-X
                </span>
              </div>
              <h2 className="mt-5 max-w-[670px] text-[clamp(2.5rem,4vw,4.3rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#082f3b]">
                Um processo natural.<br />
                <span className="text-[#00aabe]">Uma transformação em cadeia.</span>
              </h2>
            </div>
            <p className="max-w-[420px] text-sm leading-7 text-[#668087]">
              A tecnologia BIO-X atua criando condições favoráveis para que microorganismos benéficos assumam um papel ativo no equilíbrio dos ambientes em que são aplicados.
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
                  <div className="relative h-32 w-full bg-[#f0f7f8] overflow-hidden">
                     <Image 
                        src={`/imagens/placeholder-etapa-${index + 1}.jpg`} // SUGESTÃO: Coloque imagens abstratas ou ícones fotográficos 3D aqui
                        alt={`Ilustração da etapa ${etapa.titulo}`}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
                     />
                  </div>

                  <div className="p-7 relative z-10 flex-1 bg-white">
                    <div className="absolute -top-6 left-7 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-[#00aabe] text-white font-bold shadow-md">
                      {etapa.numero}
                    </div>
                    <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a9298]">
                      Etapa {index + 1}
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
          <div className="relative mt-16 overflow-hidden rounded-[32px] bg-[#073847] p-8 lg:p-12 shadow-xl">
             {/* Textura/Imagem de fundo suave */}
             <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                <Image 
                  src="/imagens/placeholder-textura-micro.jpg" // SUGESTÃO: Imagem de células, solo úmido ou textura abstrata de natureza
                  alt="Textura de fundo"
                  fill
                  className="object-cover"
                />
             </div>
            <div className="relative z-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] text-white items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#66dce6]">
                  O princípio
                </p>
                <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] lg:text-4xl">
                  A natureza fazendo<br /> o trabalho pesado.
                </h3>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <p className="text-sm leading-7 text-white/80">
                  Os microorganismos benéficos atuam em conjunto com o ambiente, influenciando populações neutras e reduzindo condições favoráveis a microorganismos indesejados.
                </p>
                <p className="text-sm leading-7 text-white/80">
                  A base da tecnologia utiliza microorganismos como lactobacilos e leveduras, amplamente conhecidos também por aplicações na indústria alimentícia.
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
                BIO-X em números
              </p>
              <h2 className="mt-5 text-[clamp(2.4rem,4vw,4.2rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#07333e]">
                Experiência que<br /> pode ser medida.
              </h2>
              {/* Imagem de apoio opcional para dar contexto aos números */}
              <div className="mt-8 relative h-48 w-full rounded-2xl overflow-hidden shadow-md hidden lg:block">
                 <Image 
                    src="/imagens/placeholder-grafico-campo.jpg" // SUGESTÃO: Drone sobrevoando plantação ou pessoa segurando tablet no campo
                    alt="Resultados em campo"
                    fill
                    className="object-cover"
                 />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-[#bcdcdf] md:grid-cols-3 shadow-lg">
              {numeros.map((numero) => (
                <div key={numero.descricao} className="min-h-[190px] bg-white p-7 flex flex-col justify-center transition-colors hover:bg-[#f5fbfb]">
                  <div className="flex items-end">
                    <span className="text-5xl font-medium tracking-[-0.06em] text-[#008b9d] lg:text-6xl">
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
              O que sustenta a BIO-X
            </p>
            <h2 className="mx-auto mt-5 max-w-[750px] text-[clamp(2.5rem,4vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#07323e]">
              Três princípios.<br />
              <span className="text-[#00aabe]">Uma mesma direção.</span>
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
                <div className="relative h-48 w-full shrink-0">
                  <Image 
                    src={`/imagens/placeholder-pilar-${index + 1}.jpg`} // SUGESTÃO: 1. Missão (Gente trabalhando), 2. Visão (Horizonte/Futuro), 3. Valores (Aperto de mão/Sustentabilidade)
                    alt={item.pilar}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${index === 1 ? 'from-[#073b49] to-transparent' : 'from-[#f9fbfb] to-transparent'}`}></div>
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
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* Lado Escuro - Imagem Adicionada */}
              <div className="relative bg-[#073b49] p-9 text-white lg:p-12 overflow-hidden flex flex-col justify-center">
                 {/* Imagem de Fundo para Credibilidade */}
                 <div className="absolute inset-0 opacity-30 mix-blend-luminosity">
                    <Image 
                      src="/imagens/placeholder-cientista.jpg" // SUGESTÃO: Cientista em laboratório, microscópio, ou carimbo de aprovação
                      alt="Pesquisa e Validação"
                      fill
                      className="object-cover"
                    />
                 </div>
                 
                 <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5dd7e1]">
                    Credibilidade
                  </p>
                  <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.05em] lg:text-5xl">
                    Pesquisa,<br /> validação e<br /> registro.
                  </h2>
                  <p className="mt-8 max-w-[390px] text-sm leading-7 text-white/80">
                    Tecnologia aplicada precisa de resultado, rastreabilidade e
                    responsabilidade. Por isso, a BIO-X reúne experiência de
                    campo, validação e registros oficiais.
                  </p>
                  <div className="mt-12 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 backdrop-blur-sm text-xs font-medium text-[#7de1e8]">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1ad1dd] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1ad1dd]"></span>
                    </span>
                    Ciência presente no dia a dia
                  </div>
                </div>
              </div>

              {/* Lado Claro - Lista */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#759097]">
                  Registros oficiais
                </p>
                <div className="mt-7 divide-y divide-[#e1eaec]">
                  {registros.map((registro, index) => (
                    <div key={registro.orgao} className="grid gap-4 py-6 md:grid-cols-[50px_1fr_auto] md:items-center hover:bg-slate-50 transition-colors px-2 rounded-xl">
                      <span className="text-xs font-bold text-[#91a4a8]">0{index + 1}</span>
                      <div>
                        <h3 className="font-semibold text-[#07313d] text-lg">{registro.orgao}</h3>
                        {registro.observacao && (
                          <p className="mt-1 text-xs leading-5 text-[#718a90] max-w-[280px]">
                            {registro.observacao}
                          </p>
                        )}
                      </div>
                      <code className="rounded-full bg-[#eff7f7] px-4 py-2 text-xs font-bold tracking-wider text-[#147b89] border border-[#d4ebed]">
                        {registro.numero}
                      </code>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-start gap-4 rounded-[22px] bg-[#eef9f9] p-6 border border-[#d4edef]">
                  <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-[#00aabe] flex items-center justify-center text-white font-bold">✓</div>
                  <p className="text-sm leading-6 text-[#496a73]">
                    A biotecnologia BIO-X Agricultura Única é citada no material institucional como <strong className="text-[#05303c]">aprovada cientificamente pela Universidade Federal de Viçosa</strong>.
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
                src="/imagens/placeholder-cta.jpg" // SUGESTÃO: Lavoura linda verde, ou gotas de água limpa, algo muito positivo e aspiracional.
                alt="Possibilidades com a BIO-X"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             {/* Overlay Escuro para leitura */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#07313d]/90 to-[#07313d]/60 backdrop-blur-[2px]" />

            <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
              <div>
                <p className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#66dbe4] backdrop-blur-md mb-6">
                  Uma ciência. Muitas possibilidades.
                </p>
                <h2 className="max-w-[700px] text-[clamp(2.5rem,4vw,4.4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
                  O próximo desafio também pode começar pela <span className="text-[#66dbe4]">biologia.</span>
                </h2>
              </div>

              <a
                href="/solucoes"
                className="inline-flex shrink-0 items-center justify-center gap-4 rounded-full bg-[#00aabe] hover:bg-[#00c2d8] px-8 py-5 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,170,190,0.3)]"
              >
                Conhecer Nossas Soluções
                <span className="text-xl" aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </Conteiner>
      </section>
    </main>
  );
}