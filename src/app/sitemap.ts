import type { MetadataRoute } from "next";
import { urlDoSite, navegacao } from "@/dados/site";
import { solucoes } from "@/dados/solucoes";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["/", ...navegacao.map((item) => item.href)];
  const linhas = solucoes.map((solucao) => `/solucoes/${solucao.slug}`);

  return [...paginas, ...linhas].map((caminho) => ({
    url: new URL(caminho, urlDoSite).toString(),
    lastModified: new Date(),
  }));
}
