"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Handshake,
  TrendingUp,
  ShieldCheck,
  Microscope,
  Users,
  Target,
  Briefcase,
  Waves,
  Factory,
  Coffee,
  HardHat,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  MoveRight
} from "lucide-react";

import { Conteiner } from "@/componentes/ui/Conteiner";
import { urlWhatsapp } from "@/dados/contato";

// Como usamos "use client", caso você precise do metadata, lembre de movê-lo 
// para um layout.tsx ou exportar de um page root separado.

const carteiraClientes = [
  {
    setor: "Saneamento e Água",
    icone: Waves,
    empresas: ["COPASA", "SABESP", "BRK Ambiental", "SAAE", "Codau", "Allonda Ambiental", "Biotec", "Fundação Renova"]
  },
  {
    setor: "Indústria e Mineração",
    icone: Factory,
    empresas: ["Petrobras", "Votorantim", "RHI Magnesita", "AngloGold", "Klabin", "Teksid", "Precon", "Síntese"]
  },
  {
    setor: "Alimentos e Bebidas",
    icone: Coffee,
    empresas: ["Nestlé", "Novartis", "Vigor", "Coca-Cola FEMSA"]
  },
  {
    setor: "Engenharia e Construção",
    icone: HardHat,
    empresas: ["Andrade Gutierrez", "OAS", "Engevix", "CCM Centro Minas", "Mello Azevedo", "Carioca Eng.", "Grupo CAP"]
  },
  {
    setor: "Outros Setores",
    icone: MoreHorizontal,
    empresas: ["SESC", "Caterpillar", "Tiberina"]
  }
];

const beneficios = [
  {
    icone: TrendingUp,
    titulo: "Rentabilidade e Escala",
    texto: "Modelos comerciais estruturados para garantir margem saudável e crescimento constante do seu negócio junto com a BIO-X."
  },
  {
    icone: ShieldCheck,
    titulo: "Proteção de Mercado",
    texto: "Respeitamos a atuação de cada parceiro. Trabalhamos com políticas claras de região e precificação."
  },
  {
    icone: Microscope,
    titulo: "Tecnologia Validada",
    texto: "Você não vende promessas. Ofereça um portfólio testado, validado por universidades e aprovado por gigantes do mercado."
  },
  {
    icone: Users,
    titulo: "Suporte Técnico Mútuo",
    texto: "Nossa equipe caminha ao seu lado. Treinamento de ponta para o seu time comercial e suporte direto a campo."
  }
];

const perfis = [
  {
    icone: Briefcase,
    titulo: "Distribuidores e Revendas",
    texto: "Amplie seu portfólio com soluções biotecnológicas de alto valor agregado. Ideal para empresas já estabelecidas na região."
  },
  {
    icone: Users,
    titulo: "Cooperativas",
    texto: "Leve inovação, produtividade e sustentabilidade para os seus cooperados, garantindo a adoção de tecnologias de ponta."
  },
  {
    icone: Target,
    titulo: "Consultores Agronômicos",
    texto: "Agregue valor à sua recomendação técnica com soluções que resolvem problemas reais de solo, pragas e produtividade."
  }
];

export default function PaginaParcerias() {
  const carrosselRef = useRef<HTMLDivElement>(null);

  const rolarCarrossel = (direcao: "esquerda" | "direita") => {
    if (carrosselRef.current) {
      const tamanhoScroll = carrosselRef.current.clientWidth * 0.7; 
      const novaPosicao =
        carrosselRef.current.scrollLeft +
        (direcao === "direita" ? tamanhoScroll : -tamanhoScroll);

      carrosselRef.current.scrollTo({
        left: novaPosicao,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="bg-[#fbfcfc] selection:bg-[#00aabe] selection:text-white">
      
      {/* 1. HERO - PROPOSTA B2B */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 h-[600px] w-[600px] rounded-full border-[40px] border-[#eaf7f8] opacity-50" />
        <div className="absolute top-40 -left-20 h-[300px] w-[300px] rounded-full border-[20px] border-[#f0f9f9] opacity-70" />

        <Conteiner className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#f0f9f9] px-4 py-2 border border-[#cbe3e5]">
                <Handshake size={14} className="text-[#00aabe]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087f90]">
                  Programa de Parcerias
                </span>
              </div>
              
              <h1 className="text-[clamp(3rem,5vw,5rem)] font-medium leading-[1] tracking-[-0.04em] text-[#07313d]">
                O seu crescimento <br />
                é o nosso <span className="text-[#00aabe]">crescimento.</span>
              </h1>
              
              <p className="mt-6 text-lg leading-relaxed text-[#5f7880] md:text-xl">
                Junte-se à marca que está transformando a biotecnologia a campo. Leve resultados reais para seus clientes e garanta uma nova fonte de rentabilidade para o seu negócio.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#formularioparceria"
                  className="inline-flex items-center gap-3 rounded-full bg-[#00aabe] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#07313d] hover:scale-105 hover:shadow-lg"
                >
                  Quero ser Parceiro
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#modelos"
                  className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold text-[#5f7880] transition hover:text-[#00aabe]"
                >
                  Conhecer modelos
                </a>
              </div>
            </div>

            <div className="relative rounded-[32px] bg-white p-8 lg:p-12 shadow-[0_20px_60px_rgba(7,49,61,0.06)] border border-[#e1eaec]">
              <h3 className="text-xl font-semibold text-[#07313d] mb-8">
                Por que a BIO-X?
              </h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f8] text-[#00aabe]">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#07313d]">Mercado em Expansão</h4>
                    <p className="text-sm text-[#6c868f] leading-relaxed mt-1">A biotecnologia agrícola é o setor que mais cresce no agronegócio mundial.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f8] text-[#00aabe]">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#07313d]">Retenção de Clientes</h4>
                    <p className="text-sm text-[#6c868f] leading-relaxed mt-1">Soluções que entregam resultado geram recompra e fidelização à sua marca.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Conteiner>
      </section>

      {/* 2. CARTEIRA DE CLIENTES - NOVO LAYOUT DARK E HORIZONTAL (Alto Impacto) */}
      <section className="bg-[#07313d] py-20 lg:py-28 relative overflow-hidden">
        {/* Elemento de fundo pra dar textura */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#0a4c59] to-transparent rounded-full opacity-30 -mr-96 -mt-96 pointer-events-none" />

        <Conteiner>
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
            <div className="max-w-3xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5ed7df] mb-4 block">
                Acervo Institucional
              </span>
              <h2 className="text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
                Conexões que <br className="hidden md:block" />
                <span className="text-[#5ed7df]">atravessam setores.</span>
              </h2>
              <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
                O aval de gigantes da indústria atesta a confiabilidade da nossa tecnologia. Conheça as empresas que já comprovaram a força da biologia BIO-X em suas operações.
              </p>
            </div>
            
            <div className="flex flex-col md:items-end gap-6">
              <div className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 shadow-lg">
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  30+ empresas na carteira
                </span>
              </div>
              
              {/* Controles de Navegação Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <button 
                  onClick={() => rolarCarrossel('esquerda')}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-[#00aabe] hover:border-[#00aabe] transition-all"
                  aria-label="Ver anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => rolarCarrossel('direita')}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-[#00aabe] hover:border-[#00aabe] transition-all"
                  aria-label="Ver próximo"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Indicativo Mobile */}
          <div className="flex animate-pulse items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5ed7df] md:hidden mb-6 relative z-10">
            <span>Arraste para explorar</span>
            <MoveRight size={16} />
          </div>
        </Conteiner>

        {/* CONTAINER DO CARROSSEL HORIZONTAL (Rompe a margem propositalmente) */}
        <div className="pl-6 md:pl-[max(1.5rem,calc((100vw-1200px)/2))] relative z-10">
          <div 
            ref={carrosselRef}
            className="flex gap-6 overflow-x-auto pb-12 pr-6 md:pr-12 snap-x snap-mandatory scroll-smooth hide-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {carteiraClientes.map((setor) => {
              const Icone = setor.icone;

              return (
                <div 
                  key={setor.setor} 
                  className="snap-start shrink-0 w-[85vw] md:w-[400px] lg:w-[450px] flex flex-col p-8 lg:p-10 rounded-[32px] bg-[#0a4c59] border border-white/10 hover:border-[#5ed7df]/50 transition-colors duration-300"
                >
                  {/* Cabeçalho do Card Setorial */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00aabe] text-white shadow-lg">
                      <Icone size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-white leading-snug">
                      {setor.setor}
                    </h3>
                  </div>

                  {/* Lista de Empresas (Tags) */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {setor.empresas.map((empresa) => (
                      <span 
                        key={empresa} 
                        className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/90 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-default"
                      >
                        {empresa}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PILARES DA PARCERIA */}
      <section className="bg-white py-20 lg:py-28">
        <Conteiner>
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-medium tracking-tight text-[#07313d] md:text-4xl">
              Nós oferecemos a biotecnologia.<br />
              <span className="text-[#00aabe]">Você fortalece sua autoridade.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {beneficios.map((item, index) => {
              const Icone = item.icone;
              return (
                <article 
                  key={index}
                  className="group flex flex-col justify-between p-8 lg:p-10 rounded-[32px] bg-[#fbfcfc] border border-[#e1eaec] hover:border-[#00aabe]/30 hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7f8] text-[#00aabe] group-hover:bg-[#00aabe] group-hover:text-white transition-colors">
                    <Icone size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#07313d] mb-4">
                      {item.titulo}
                    </h3>
                    <p className="text-[#657e85] leading-relaxed">
                      {item.texto}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Conteiner>
      </section>

      {/* 4. PERFIS DE PARCEIROS */}
      <section id="modelos" className="bg-[#f0f9f9] py-20 lg:py-28 border-t border-[#e0eaec]">
        <Conteiner>
          <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087f90] mb-4 block">
                Modelos de Atuação
              </span>
              <h2 className="text-3xl font-medium tracking-tight text-[#07313d] md:text-5xl">
                O formato ideal <br />
                para o <span className="text-[#00aabe]">seu negócio.</span>
              </h2>
            </div>
            <p className="max-w-sm text-[#5f7880] leading-relaxed lg:text-right">
              Não existe um modelo único. Adaptamos nossa estrutura comercial para atender a realidade e o potencial da sua carteira.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {perfis.map((perfil, idx) => {
              const Icone = perfil.icone;
              return (
                <div key={idx} className="relative bg-white p-10 rounded-[32px] border border-[#dbe9eb] shadow-sm flex flex-col h-full z-10 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-[#00aabe]" />
                  
                  <div className="mb-8 text-[#00aabe]">
                    <Icone size={40} strokeWidth={1.2} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#07313d] mb-4">
                    {perfil.titulo}
                  </h3>
                  
                  <p className="text-[#657e85] leading-relaxed mb-8 flex-1">
                    {perfil.texto}
                  </p>

                  <div className="mt-auto border-t border-[#f0f5f5] pt-6 flex items-center text-sm font-bold text-[#07313d] group cursor-pointer hover:text-[#00aabe] transition-colors">
                    Saber mais detalhes
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </Conteiner>
      </section>

      {/* 5. CTA FINAL - FORMULÁRIO/CONTATO B2B */}
      <section id="formularioparceria" className="py-20 lg:py-32 bg-[#f4f9f9]">
        <Conteiner>
          <div className="rounded-[40px] bg-[#07313d] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-[#0a4c59]">
            
            <div className="p-10 lg:p-16 lg:w-[55%] flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-6 w-fit">
                Inicie sua jornada
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
                Vamos construir o futuro da <span className="text-[#5ed7df]">biotecnologia juntos?</span>
              </h2>
              <p className="text-[#8ba7ae] text-lg mb-10 leading-relaxed max-w-md">
                Preencha as informações preliminares via WhatsApp. Nosso time de Expansão entrará em contato para agendar uma reunião de negócios.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={urlWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#00aabe] px-8 py-4 text-base font-bold text-white transition hover:bg-[#5ed7df] hover:text-[#07313d]"
                >
                  Falar com Expansão
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </div>

            <div className="bg-[#0a4c59] p-10 lg:p-16 lg:w-[45%] flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10">
              <h3 className="text-xl font-bold text-white mb-8">Próximos passos</h3>
              
              <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5ed7df] text-[#07313d] font-bold text-sm">1</div>
                  <div>
                    <h4 className="text-white font-semibold">Alinhamento</h4>
                    <p className="text-[#8ba7ae] text-sm mt-1">Reunião para entender o seu mercado e o seu potencial comercial.</p>
                  </div>
                </div>
                
                <div className="w-0.5 h-6 bg-white/20 ml-4 -my-4" />

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 text-white font-bold text-sm">2</div>
                  <div>
                    <h4 className="text-white font-semibold">Proposta e Acordo</h4>
                    <p className="text-[#8ba7ae] text-sm mt-1">Desenho das margens, região de atuação e assinatura da parceria.</p>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-white/20 ml-4 -my-4" />

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 text-white font-bold text-sm">3</div>
                  <div>
                    <h4 className="text-white font-semibold">Treinamento e Go-Live</h4>
                    <p className="text-[#8ba7ae] text-sm mt-1">Capacitação do seu time e ida a campo para as primeiras negociações.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Conteiner>
      </section>
      
    </main>
  );
}