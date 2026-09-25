import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Cabecalho } from "@/componentes/estrutura/Cabecalho";
import { Rodape } from "@/componentes/estrutura/Rodape";
import { SuporteBiox } from "@/componentes/estrutura/SuporteBiox";
import { urlDoSite } from "@/dados/site";
import { alternativas, codigoIso, ehIdioma, idiomas, type Idioma } from "@/i18n/config";
import { ProvedorIdioma } from "@/i18n/ProvedorIdioma";
import "../globals.css";

/** As três versões são geradas no build; prefixo desconhecido vira 404 abaixo. */
export function generateStaticParams() {
  return idiomas.map((idioma) => ({ idioma }));
}

const textos: Record<Idioma, { titulo: string; descricao: string; pular: string; og: string }> = {
  pt: {
    titulo: "BIO-X Microorganismos | Por um futuro sustentável",
    descricao:
      "Biotecnologia 100% natural com microorganismos benéficos para agricultura, saneamento e pecuária. Mais de 30 anos de experiência no agronegócio.",
    pular: "Pular para o conteúdo",
    og: "pt_BR",
  },
  en: {
    titulo: "BIO-X Microorganisms | For a sustainable future",
    descricao:
      "100% natural biotechnology with beneficial microorganisms for agriculture, sanitation and livestock. Over 30 years of experience in agribusiness.",
    pular: "Skip to content",
    og: "en_US",
  },
  es: {
    titulo: "BIO-X Microorganismos | Por un futuro sostenible",
    descricao:
      "Biotecnología 100% natural con microorganismos benéficos para agricultura, saneamiento y ganadería. Más de 30 años de experiencia en el agronegocio.",
    pular: "Saltar al contenido",
    og: "es_ES",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string }>;
}): Promise<Metadata> {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) return {};
  const t = textos[idioma];

  /* metadataBase fixo (em vez de derivado de headers()) para as páginas
     continuarem estáticas e poderem ser servidas direto do cache/CDN. */
  return {
    metadataBase: new URL(urlDoSite),
    title: { default: t.titulo, template: `%s | ${t.titulo.split(" | ")[0]}` },
    description: t.descricao,
    applicationName: "BIO-X Microorganismos",
    alternates: alternativas(idioma, "/"),
    openGraph: {
      siteName: "BIO-X Microorganismos",
      title: t.titulo,
      description: t.descricao,
      url: "/",
      locale: t.og,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: t.titulo, description: t.descricao },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#041e2b",
  colorScheme: "light",
};

export default async function LayoutDoIdioma({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ idioma: string }> }>) {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) notFound();

  return (
    <html lang={codigoIso[idioma]} data-scroll-behavior="smooth">
      <body>
        <ProvedorIdioma idioma={idioma}>
          <a href="#conteudo" className="link-pular">
            {textos[idioma].pular}
          </a>
          <Cabecalho />
          <main id="conteudo">{children}</main>
          <Rodape idioma={idioma} />
          <SuporteBiox />
        </ProvedorIdioma>
      </body>
    </html>
  );
}
