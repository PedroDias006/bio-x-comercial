"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Quote,
  ChevronDown,
  Sprout,
  MoveRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { Conteiner } from "@/componentes/ui/Conteiner";
import { depoimentosEm, eventosEm } from "@/dados/depoimentos";
import { useIdioma } from "@/i18n/ProvedorIdioma";
import { textos } from "./textos";

// Página de cliente: o título da aba vem do layout.tsx desta pasta.

export default function PaginaResultados() {
  const idioma = useIdioma();
  const t = textos[idioma];
  const depoimentos = depoimentosEm(idioma);
  const eventos = eventosEm(idioma);
  const carrosselRef = useRef<HTMLDivElement>(null);

  // Função para mover o carrossel clicando nas setas
  const rolarCarrossel = (direcao: "esquerda" | "direita") => {
    if (carrosselRef.current) {
      // Pega a largura do container visível para dar scroll exato de "uma tela"
      const tamanhoScroll = carrosselRef.current.clientWidth * 0.8; 
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
    <div className="bg-[#fbfcfc] selection:bg-[#00aabe] selection:text-white">
      {/* 1. HERO */}
      <section className="relative flex min-h-[90vh] items-center justify-center pt-24 pb-20">
        <Image
          src="/imagens/placeholder-hero-resultados.jpg"
          alt={t.altHero}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041c23]/80 via-[#07313d]/60 to-[#07313d]/90" />

        <Conteiner className="relative z-10 w-full text-center">
          <div className="mx-auto flex flex-col items-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#5ed7df]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                {t.evidencia}
              </span>
            </div>

            <h1 className="max-w-[900px] text-[clamp(3.5rem,7vw,6.5rem)] font-medium leading-[1] tracking-[-0.04em] text-white">
              {t.hero1} <br />
              <span className="text-[#5ed7df]">{t.hero2}</span>
            </h1>

            <p className="mt-8 max-w-[650px] text-lg font-medium leading-relaxed text-white/80 md:text-xl">
              {t.heroApoio}
            </p>
          </div>
        </Conteiner>

        <a
          href="#provas"
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">{t.veja}</span>
          <ChevronDown size={28} className="animate-bounce" />
        </a>
      </section>

      {/* 2. COMO OBSERVAMOS */}
      <section id="provas" className="bg-white py-20 lg:py-28">
        <Conteiner>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-medium tracking-tight text-[#07313d] md:text-5xl">
              {t.diferenca1} <br className="hidden md:block" />
              <span className="text-[#00aabe]">{t.diferenca2}</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.comparacao.map(([titulo, texto], i) => ({
              id: `0${i + 1}`,
              titulo,
              texto,
              img: `/imagens/placeholder-lado-${i + 1}.jpg`,
            })).map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-[24px] bg-[#f4f9f9] border border-[#e0eaec]">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={item.img} 
                    alt={item.titulo} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-[#00aabe] shadow-lg">
                    {item.id}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="mb-3 text-2xl font-bold text-[#07313d]">{item.titulo}</h3>
                  <p className="text-[#5f7880] leading-relaxed">{item.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </Conteiner>
      </section>

      {/* 3. REGISTROS DE CAMPO - LAYOUT NORMAL (Lado a Lado empilhado) */}
      <section className="bg-[#f0f9f9] py-20 lg:py-28">
        <Conteiner>
          <div className="mb-16 md:flex md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#00aabe]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087f90]">
                  {t.diario}
                </span>
              </div>
              <h2 className="text-4xl font-medium tracking-tight text-[#07313d] md:text-5xl">
                {t.lentes1} <br /> <span className="text-[#00aabe]">{t.lentes2}</span>
              </h2>
            </div>
            <p className="mt-6 max-w-sm text-base text-[#5f7880] md:mt-0 md:text-right">
              {t.diasCampo}
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {eventos.map((evento, index) => {
              const invertido = index % 2 === 1;

              return (
                <article
                  key={evento.titulo}
                  className="group relative overflow-hidden rounded-[32px] bg-white shadow-lg border border-[#e2eeee]"
                >
                  <div className={`grid md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.5fr_1fr] ${invertido ? "md:[&>*:first-child]:order-2" : ""}`}>
                    
                    {/* AQUI A IMAGEM VEM DO DADOS/DEPOIMENTOS.TS */}
                    <div className="relative min-h-[400px] w-full lg:min-h-[550px]">
                      <Image
                        src={evento.imagem} // <-- Caminho vem do evento
                        alt={evento.titulo}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute left-6 top-6 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#087b8b] shadow-md backdrop-blur-md">
                        {t.registro} {index + 1}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-8 lg:p-14">
                      <h3 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-[#07313d] lg:text-4xl">
                        {evento.titulo}
                      </h3>
                      <p className="mb-8 text-lg leading-relaxed text-[#5f7880]">
                        {evento.descricao}
                      </p>
                      
                      <div className="mt-auto border-t border-[#dce9eb] pt-6 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00aabe]/10 text-[#00aabe]">
                          <Sprout size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#07313d]">{t.transformacao}</p>
                          <p className="text-xs font-medium text-[#7a9096]">{t.tecLavoura}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Conteiner>
      </section>

      {/* 4. DEPOIMENTOS - CARROSSEL HORIZONTAL COM SETAS DE NAVEGAÇÃO */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden">
        <Conteiner>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-medium tracking-tight text-[#07313d] md:text-5xl">
                {t.quem1} <br />
                <span className="text-[#00aabe]">{t.quem2}</span>
              </h2>
            </div>
            
            {/* Controles do Carrossel (Visíveis apenas em telas médias para cima) */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => rolarCarrossel('esquerda')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#dbe9eb] bg-[#f4f9f9] text-[#07313d] hover:bg-[#00aabe] hover:text-white hover:border-[#00aabe] transition-all"
                aria-label={t.anterior}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => rolarCarrossel('direita')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#dbe9eb] bg-[#f4f9f9] text-[#07313d] hover:bg-[#00aabe] hover:text-white hover:border-[#00aabe] transition-all"
                aria-label={t.proximo}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Indicador Mobile */}
            <div className="flex animate-pulse items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00aabe] md:hidden">
              <span>{t.arraste}</span>
              <MoveRight size={16} />
            </div>
          </div>
        </Conteiner>

        {/* CONTAINER DO CARROSSEL */}
        <div className="pl-6 md:pl-[max(1.5rem,calc((100vw-1200px)/2))]">
          <div 
            ref={carrosselRef}
            className="flex gap-6 overflow-x-auto pb-12 pr-6 md:pr-12 snap-x snap-mandatory scroll-smooth hide-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            
            {depoimentos.map((depoimento, index) => {
              // AQUI DEFINIMOS A IMAGEM DO PRODUTOR:
              // Tenta pegar a "foto" vinda do banco de dados (depoimento.foto). 
              // Se não existir, usa um nome genérico pra vc criar a foto.
              const imgSrc = (depoimento as any).foto || `/imagens/rosto-produtor-${index+1}.jpg`;

              return (
                <article
                  key={depoimento.nome}
                  className="snap-start shrink-0 w-[90vw] md:w-[750px] lg:w-[850px] group flex flex-col sm:flex-row overflow-hidden rounded-[32px] border border-[#dbe9eb] bg-[#fbfcfc] shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* FOTO DO PRODUTOR */}
                  <div className="relative h-64 sm:h-auto sm:w-2/5 overflow-hidden bg-[#d1e4e6] shrink-0">
                    <Image 
                      src={imgSrc} 
                      alt={`${t.fotoDe} ${depoimento.nome}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:bg-gradient-to-r" />
                    <div className="absolute bottom-4 left-4 sm:bottom-auto sm:top-4">
                      <span className="rounded-full bg-[#00aabe] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
                        {depoimento.cultura}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-8 sm:w-3/5">
                    <Quote size={32} className="mb-4 text-[#c1dbdf]" />
                    <p className="mb-8 text-lg font-medium leading-relaxed italic text-[#07313d]">
                      "{depoimento.descricao}"
                    </p>
                    
                    <div className="mt-auto">
                      <h4 className="text-lg font-bold text-[#07313d]">{depoimento.nome}</h4>
                      <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#7a9096]">
                        <MapPin size={16} className="text-[#00aabe]" />
                        {depoimento.cidade}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
            
          </div>
        </div>
      </section>

      {/* 5. VÍDEO EM DESTAQUE */}
      <section className="bg-[#f0f9f9] py-20 lg:py-28 border-t border-[#e2eeee]">
        <Conteiner>
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <p className="mb-4 inline-block rounded-full bg-[#eaf7f8] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00aabe]">
                {t.assista}
              </p>
              <h2 className="text-3xl font-medium tracking-tight text-[#07313d] md:text-5xl">
                {t.acao1} <span className="text-[#00aabe]">{t.acao2}</span>
              </h2>
            </div>
            
            <div className="relative aspect-video w-full overflow-hidden rounded-[40px] bg-black shadow-[0_20px_50px_rgba(7,49,61,0.15)] ring-1 ring-black/5">
              <video 
                className="h-full w-full object-cover"
                controls
                preload="none"
                poster="/imagens/placeholder-video-capa.jpg" 
              >
                <source src="/videos/seu-video-aqui.mp4" type="video/mp4" />
                {t.semVideo}
              </video>
            </div>
          </div>
        </Conteiner>
      </section>
    </div>
  );
}