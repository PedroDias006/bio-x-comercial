import type { Metadata } from "next";
import { Conteiner } from "@/componentes/ui/Conteiner";
import { TituloDeSecao } from "@/componentes/ui/TituloDeSecao";
import { AvisoPendencia } from "@/componentes/ui/AvisoPendencia";
import { naMidia } from "@/dados/depoimentos";

export const metadata: Metadata = {
  title: "Na mídia",
  description: "Cobertura de imprensa sobre a tecnologia BIO-X.",
};

export default function PaginaNaMidia() {
  return (
    <>
      <section className="atmosfera-escura py-16 text-white lg:py-20">
        <Conteiner>
          <TituloDeSecao
            claro
            olho="Na mídia"
            titulo="O que a imprensa já contou"
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

          <div className="mt-12 max-w-3xl">
            <AvisoPendencia
              itens={[
                "Pedir ao cliente o link ou o arquivo da matéria da TV Paranaíba — hoje só temos o trecho embutido no documentário.",
                "Levantar se houve outras aparições em imprensa, revista técnica ou evento do setor.",
              ]}
            />
          </div>
        </Conteiner>
      </section>
    </>
  );
}
