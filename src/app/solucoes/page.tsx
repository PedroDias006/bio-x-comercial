import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sprout,
  Waves,
  Beef,
  CheckCircle2,
} from "lucide-react";

import { Conteiner } from "@/componentes/ui/Conteiner";
import { solucoes, categorias } from "@/dados/solucoes";
import { urlWhatsapp } from "@/dados/contato";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Soluções BIO-X para agricultura, saneamento e produção animal.",
};

// Configuração visual para cada Linha de Atuação (Seção completa)
const configuracaoCategoria = {
  Agricultura: {
    icone: Sprout,
    numero: "01",
    descricao: "Biotecnologia aplicada ao solo e à produção agrícola.",
    fundoHero: "/imagens/bg-agricultura.jpg", // SUGESTÃO: Foto de lavoura (de ponta a ponta)
  },
  Saneamento: {
    icone: Waves,
    numero: "02",
    descricao: "Equilíbrio biológico para água, efluentes e ambientes.",
    fundoHero: "/imagens/bg-saneamento.jpg", // SUGESTÃO: Foto de água/estação (de ponta a ponta)
  },
  Pecuária: {
    icone: Beef,
    numero: "03",
    descricao: "Soluções voltadas à produção e ao bem-estar animal.",
    fundoHero: "/imagens/bg-pecuaria.jpg", // SUGESTÃO: Foto de pasto/rebanho (de ponta a ponta)
  },
};

export default function PaginaSolucoes() {
  return (
    <main className="bg-[#fbfcfc] selection:bg-[#00aabe] selection:text-white">
      {/* 1. HEADER SIMPLES */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 text-center">
        <Conteiner>
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cbe3e5] bg-[#eaf7f8] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#00aabe]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087f90]">
                Linhas de Atuação
              </span>
            </div>
            
            <h1 className="text-4xl font-medium tracking-tight text-[#07313d] md:text-5xl lg:text-7xl">
              Uma biologia.<br />
              <span className="text-[#00aabe]">Muitos destinos.</span>
            </h1>
            
            <p className="mt-6 mx-auto max-w-2xl text-lg text-[#5f7880]">
              O mesmo princípio biológico aplicado a diferentes desafios. 
              Explore nossas soluções e encontre a tecnologia ideal para o seu cenário.
            </p>
          </div>
        </Conteiner>
      </section>

      {/* 2. SEÇÕES HORIZONTAIS DE PONTA A PONTA (Edge-to-Edge) */}
      <div className="flex flex-col">
        {categorias.map((categoria) => {
          const solucoesDaCategoria = solucoes.filter(
            (solucao) => solucao.categoria === categoria,
          );

          if (!solucoesDaCategoria.length) return null;

          const config = configuracaoCategoria[categoria as keyof typeof configuracaoCategoria];
          if (!config) return null;
          const Icone = config.icone;

          return (
            <section 
              key={categoria} 
              id={categoria.toLowerCase()} 
              className="relative w-full border-b border-white/10"
            >
              {/* IMAGEM DE FUNDO DA SEÇÃO INTEIRA */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={config.fundoHero}
                  alt={`Fundo da categoria ${categoria}`}
                  fill
                  className="object-cover"
                />
                {/* Overlays para garantir leitura e o tom dark imersivo */}
                <div className="absolute inset-0 bg-[#041c23]/85 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#041c23]/60 via-transparent to-[#041c23]/90" />
              </div>

              {/* CONTEÚDO ALINHADO AO CENTRO PELA GRADE DO SITE */}
              <Conteiner className="relative z-10 py-20 lg:py-32">
                
                {/* Título da Seção/Categoria */}
                <div className="flex items-center gap-4 mb-16 lg:mb-24">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00aabe] text-white shadow-[0_0_20px_rgba(0,170,190,0.4)]">
                    <Icone size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold uppercase tracking-widest text-white/90">
                      Linha {categoria}
                    </h2>
                    <p className="text-[#5ed7df] text-sm font-medium tracking-wide">
                      {config.descricao}
                    </p>
                  </div>
                </div>

                {/* Produtos da categoria */}
                <div className="flex flex-col gap-24 lg:gap-32">
                  {solucoesDaCategoria.map((solucao) => (
                    <div key={solucao.slug} className="group">
                      
                      {/* LAYOUT HORIZONTAL DO PRODUTO */}
                      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-center">
                        
                        {/* 50% ESQUERDA: Textos */}
                        <div className="w-full lg:w-1/2">
                          <p className="text-xs font-bold text-[#5ed7df] mb-4 uppercase tracking-[0.2em] flex items-center gap-3">
                            <span className="h-px w-8 bg-[#5ed7df]/50" />
                            {solucao.chamada}
                          </p>
                          
                          <h3 className="text-5xl lg:text-7xl font-bold text-white leading-[0.9] tracking-[-0.04em] mb-8">
                            {solucao.nome}
                          </h3>
                          
                          <p className="text-lg lg:text-xl text-white/70 leading-relaxed font-light mb-10">
                            {solucao.resumo}
                          </p>
                          
                          <Link
                            href={`/solucoes/${solucao.slug}`}
                            className="inline-flex items-center gap-4 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#041c23] hover:bg-[#5ed7df] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                          >
                            Ver detalhes do produto
                            <ArrowUpRight size={18} />
                          </Link>
                        </div>

                        {/* 50% DIREITA: A Imagem do Galão/Produto (PNG transparente) */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
                          <div className="relative w-full max-w-[320px] lg:max-w-[400px] aspect-[3/4] drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]">
                            <Image 
                              src={solucao.imagem} // <-- IMPORTANTÍSSIMO SER UM .PNG COM FUNDO TRANSPARENTE
                              alt={`Embalagem ${solucao.nome}`}
                              fill
                              className="object-contain transition-transform duration-[1.5s] ease-out group-hover:-translate-y-4"
                            />
                          </div>
                        </div>

                      </div>

                      {/* GRADE DE BENEFÍCIOS NA BASE DO PRODUTO */}
                      {solucao.beneficios.length > 0 && (
                        <div className="mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/10">
                          {/* Limitamos a 4 benefícios na vitrine para o layout horizontal ficar alinhado */}
                          {solucao.beneficios.slice(0, 4).map((beneficio, bIdx) => (
                            <div key={bIdx} className="flex flex-col gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00aabe]/10 border border-[#00aabe]/30 text-[#5ed7df]">
                                <CheckCircle2 size={20} strokeWidth={1.5} />
                              </div>
                              <p className="text-sm font-medium text-white/80 leading-relaxed">
                                {beneficio}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  ))}
                </div>

              </Conteiner>
            </section>
          );
        })}
      </div>

      {/* 3. CTA FINAL */}
      <section className="py-24 lg:py-32 bg-white">
        <Conteiner>
          <div className="relative overflow-hidden rounded-[40px] bg-[#dff5f6] p-10 lg:p-20 shadow-xl border border-[#cbe3e5]">
            <div className="absolute -right-24 -top-28 h-[360px] w-[360px] rounded-full border border-[#8dd7dd] opacity-50" />
            <div className="absolute right-10 bottom-10 h-[120px] w-[120px] rounded-full border border-[#8dd7dd] opacity-30" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="inline-block rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#078899] mb-6">
                  Fale com a BIO-X
                </p>
                <h2 className="max-w-[700px] text-4xl md:text-5xl font-medium tracking-tight text-[#07313d] leading-[1.1]">
                  Quer entender como essa solução se aplica ao seu
                  <span className="text-[#00aabe] font-bold"> cenário?</span>
                </h2>
              </div>

              <a
                href={urlWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit shrink-0 items-center justify-center gap-4 rounded-full bg-[#07313d] hover:bg-[#00aabe] px-10 py-5 text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                Falar com um técnico
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </Conteiner>
      </section>
    </main>
  );
}