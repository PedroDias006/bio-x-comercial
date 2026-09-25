import type { Metadata } from "next";
import type { ReactNode } from "react";
import { alternativas, idiomaDe, type Idioma } from "@/i18n/config";

const titulos: Record<Idioma, { titulo: string; descricao: string }> = {
  pt: { titulo: "Clientes e parcerias", descricao: "Empresas que confiam na BIO-X e o programa de parcerias para distribuidores, cooperativas e consultores." },
  en: { titulo: "Clients and partnerships", descricao: "Companies that trust BIO-X and our partnership program for distributors, cooperatives and consultants." },
  es: { titulo: "Clientes y alianzas", descricao: "Empresas que confían en BIO-X y el programa de alianzas para distribuidores, cooperativas y consultores." },
};

/** A página é de cliente ("use client"), então o título da aba mora aqui. */
export async function generateMetadata({ params }: { params: Promise<{ idioma: string }> }): Promise<Metadata> {
  const idioma = idiomaDe((await params).idioma);
  return {
    title: titulos[idioma].titulo,
    description: titulos[idioma].descricao,
    alternates: alternativas(idioma, "/clientes"),
  };
}

export default function LayoutClientes({ children }: { children: ReactNode }) {
  return children;
}
