import type { Metadata } from "next";
import type { ReactNode } from "react";
import { alternativas, idiomaDe, type Idioma } from "@/i18n/config";

const titulos: Record<Idioma, { titulo: string; descricao: string }> = {
  pt: { titulo: "Resultados", descricao: "Dias de campo, parcelas comparativas e depoimentos de produtores que usam a tecnologia BIO-X." },
  en: { titulo: "Results", descricao: "Field days, side-by-side plots and testimonials from farmers who use BIO-X technology." },
  es: { titulo: "Resultados", descricao: "Días de campo, parcelas comparativas y testimonios de productores que usan la tecnología BIO-X." },
};

/** A página é de cliente ("use client"), então o título da aba mora aqui. */
export async function generateMetadata({ params }: { params: Promise<{ idioma: string }> }): Promise<Metadata> {
  const idioma = idiomaDe((await params).idioma);
  return {
    title: titulos[idioma].titulo,
    description: titulos[idioma].descricao,
    alternates: alternativas(idioma, "/resultados"),
  };
}

export default function LayoutResultados({ children }: { children: ReactNode }) {
  return children;
}
