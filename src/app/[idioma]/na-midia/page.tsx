import type { Metadata } from "next";
import { Conteiner } from "@/componentes/ui/Conteiner";
import { TituloDeSecao } from "@/componentes/ui/TituloDeSecao";
import { AvisoPendencia } from "@/componentes/ui/AvisoPendencia";
import { naMidiaEm } from "@/dados/depoimentos";
import { alternativas, idiomaDe, type Idioma } from "@/i18n/config";

const textos: Record<Idioma, { titulo: string; descricao: string; olho: string; chamada: string }> = {
  pt: { titulo: "Na mídia", descricao: "Cobertura de imprensa sobre a tecnologia BIO-X.", olho: "Na mídia", chamada: "O que a imprensa já contou" },
  en: { titulo: "In the media", descricao: "Press coverage of BIO-X technology.", olho: "In the media", chamada: "What the press has said" },
  es: { titulo: "En los medios", descricao: "Cobertura de prensa sobre la tecnología BIO-X.", olho: "En los medios", chamada: "Lo que ha contado la prensa" },
};

type Props = { params: Promise<{ idioma: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idioma = idiomaDe((await params).idioma);
  return { title: textos[idioma].titulo, description: textos[idioma].descricao, alternates: alternativas(idioma, "/na-midia") };
}

export default async function PaginaNaMidia({ params }: Props) {
  const idioma = idiomaDe((await params).idioma);
  const t = textos[idioma];
  const naMidia = naMidiaEm(idioma);

  return (
    <>
      <section className="atmosfera-escura py-16 text-white lg:py-20">
        <Conteiner>
          <TituloDeSecao
            claro
            olho={t.olho}
            titulo={t.chamada}
          />
        </Conteiner>
      </section>

      <section className="py-16 lg:py-24">
        <Conteiner>
          <ul className="max-w-3xl divide-y divide-[var(--linha)] border-y border-[var(--linha)]">
            {naMidia.map((materia) => (
              <li key={materia.titulo} className="py-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--biox-turquesa-escuro)]">
                  {materia.veiculo}
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--biox-950)]">
                  {materia.titulo}
                </h2>
                <time
                  dateTime={materia.dataIso}
                  className="mt-3 block text-sm text-[var(--texto-suave)]"
                >
                  {materia.data}
                </time>
              </li>
            ))}
          </ul>

          {/* Nota interna em português: só aparece na versão pt. */}
          {idioma === "pt" && <div className="mt-12 max-w-3xl">
            <AvisoPendencia
              itens={[
                "Pedir ao cliente o link ou o arquivo da matéria da TV Paranaíba — hoje só temos o trecho embutido no documentário.",
                "Levantar se houve outras aparições em imprensa, revista técnica ou evento do setor.",
              ]}
            />
          </div>}
        </Conteiner>
      </section>
    </>
  );
}
