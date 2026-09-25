import type { Metadata } from "next";
import { Hero } from "@/componentes/inicio/Hero";
import { Pilares } from "@/componentes/inicio/Pilares";
import { VitrineDeLinhas } from "@/componentes/inicio/VitrineDeLinhas";
import { ProvaSocial } from "@/componentes/inicio/ProvaSocial";
import { ChamadaFinal } from "@/componentes/inicio/ChamadaFinal";
import { alternativas, idiomaDe } from "@/i18n/config";

type Props = { params: Promise<{ idioma: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idioma = idiomaDe((await params).idioma);
  return { alternates: alternativas(idioma, "/") };
}

/** Página inicial com apresentação, soluções e resultados da BIO-X. */
export default async function PaginaInicial({ params }: Props) {
  const idioma = idiomaDe((await params).idioma);

  return (
    <>
      <Hero />
      <VitrineDeLinhas />
      <Pilares />
      <ProvaSocial />
      <ChamadaFinal idioma={idioma} />
    </>
  );
}
