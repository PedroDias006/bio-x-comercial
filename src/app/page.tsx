import { Hero } from "@/componentes/inicio/Hero";
import { Pilares } from "@/componentes/inicio/Pilares";
import { VitrineDeLinhas } from "@/componentes/inicio/VitrineDeLinhas";
import { ProvaSocial } from "@/componentes/inicio/ProvaSocial";
import { ChamadaFinal } from "@/componentes/inicio/ChamadaFinal";

/** Página inicial com apresentação, soluções e resultados da BIO-X. */
export default function PaginaInicial() {
  return (
    <>
      <Hero />
      <VitrineDeLinhas />
      <Pilares />
      <ProvaSocial />
      <ChamadaFinal />
    </>
  );
}
