import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BotaoLink } from "@/componentes/ui/BotaoLink";
import { Conteiner } from "@/componentes/ui/Conteiner";

const etapas = [
  {
    numero: "01",
    titulo: "Selecionar",
    texto: "Microorganismos benéficos para o desafio certo.",
  },
  {
    numero: "02",
    titulo: "Aplicar",
    texto: "Na rotina e no equipamento que a operação já usa.",
  },
  {
    numero: "03",
    titulo: "Comparar",
    texto: "Mesmo solo, mesma safra, resultado lado a lado.",
  },
];

const imagens = [
  {
    src: "/imagens/hero/soja-lavoura.jpg",
    alt: "Equipe técnica observando plantas de soja em dia de campo",
    etiqueta: "Campo · soja",
    classe: "campo-foto-grande",
  },
  {
    src: "/imagens/hero/resultado-pimentao.jpeg",
    alt: "Pimentões verdes recém-colhidos em uma caixa",
    etiqueta: "Resultado · hortifrúti",
    classe: "campo-foto-alta",
  },
  {
    src: "/imagens/hero/microscopio.jpg",
    alt: "Microscópio posicionado sobre uma amostra",
    etiqueta: "Origem · laboratório",
    classe: "campo-foto-media",
  },
  {
    src: "/imagens/hero/laranja-citros.jpg",
    alt: "Solo fértil com matéria orgânica em detalhe",
    etiqueta: "Processo · solo vivo",
    classe: "campo-foto-media",
  },
];

/** Galeria editorial: usa os quadros reais como uma sequência de evidências. */
export function CampoEmFoco() {
  return (
    <section className="secao-institucional campo-em-foco overflow-hidden py-20 lg:py-28">
      <Conteiner>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[var(--biox-turquesa)]" aria-hidden="true" />
              <p className="secao-olho">Caderno de campo</p>
            </div>
            <h2 className="secao-titulo mt-6 max-w-[16ch] text-[var(--biox-950)]">
              Biologia que dá para ver, medir e comparar.
            </h2>
            <p className="secao-apoio mt-6 max-w-2xl text-pretty">
              O acervo da BIO-X acompanha a tecnologia da bancada ao talhão:
              microscopia, aplicação, visitas técnicas e resultados reais de
              produção.
            </p>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-3xl border border-[var(--linha)] bg-[var(--linha)] sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {etapas.map((etapa) => (
              <li key={etapa.numero} className="campo-etapa p-5">
                <p className="font-mono text-xs font-semibold text-[var(--biox-turquesa-escuro)]">
                  {etapa.numero}
                </p>
                <h3 className="mt-3 text-sm font-bold text-[var(--biox-950)]">
                  {etapa.titulo}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-[var(--texto-suave)]">
                  {etapa.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="campo-grade mt-12">
          {imagens.map((imagem, indice) => (
            <figure
              key={imagem.src}
              className={`${imagem.classe} group relative min-h-64 overflow-hidden rounded-[1.7rem] bg-[var(--biox-900)]`}
            >
              <Image
                src={imagem.src}
                alt={imagem.alt}
                fill
                sizes={
                  indice === 0
                    ? "(min-width: 1024px) 58vw, 100vw"
                    : "(min-width: 1024px) 30vw, 100vw"
                }
                className="object-cover transition duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(6,35,43,0.76)_100%)]" aria-hidden="true" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5 text-xs font-bold uppercase tracking-[0.16em] text-white sm:p-6">
                {imagem.etiqueta}
                <ArrowUpRight className="size-5 text-[var(--biox-turquesa-claro)]" aria-hidden="true" />
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-5 border-t border-[var(--linha)] pt-7 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-6 text-[var(--texto-suave)]">
            Conheça as parcelas comparativas, os dias de campo e as aplicações
            documentadas pela equipe técnica.
          </p>
          <BotaoLink href="/resultados" variante="secundario" className="shrink-0">
            Abrir resultados
          </BotaoLink>
        </div>
      </Conteiner>
    </section>
  );
}
