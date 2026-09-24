import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cabecalho } from "@/componentes/estrutura/Cabecalho";
import { Rodape } from "@/componentes/estrutura/Rodape";
import { SuporteBiox } from "@/componentes/estrutura/SuporteBiox";
import { urlDoSite } from "@/dados/site";
import "./globals.css";

const titulo = "BIO-X Microorganismos | Por um futuro sustentável";
const descricao =
  "Biotecnologia 100% natural com microorganismos benéficos para agricultura, saneamento e pecuária. Mais de 30 anos de experiência no agronegócio.";

/* metadataBase fixo (em vez de derivado de headers()) para as páginas
   continuarem estáticas e poderem ser servidas direto do cache/CDN. */
export const metadata: Metadata = {
  metadataBase: new URL(urlDoSite),
  title: {
    default: titulo,
    template: "%s | BIO-X Microorganismos",
  },
  description: descricao,
  applicationName: "BIO-X Microorganismos",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "BIO-X Microorganismos",
    title: titulo,
    description: descricao,
    url: "/",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#041e2b",
  colorScheme: "light",
};

export default function LayoutRaiz({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <a href="#conteudo" className="link-pular">
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
        <SuporteBiox />
      </body>
    </html>
  );
}
