import type { MetadataRoute } from "next";
import { urlDoSite, navegacao } from "@/dados/site";
import { solucoes } from "@/dados/solucoes";
import { idiomas, rota } from "@/i18n/config";

/** Cada página aparece nas três línguas, já ligadas entre si (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["/", ...navegacao.map((item) => item.href)];
  const linhas = solucoes.map((solucao) => `/solucoes/${solucao.slug}`);
  const absoluta = (caminho: string) => new URL(caminho, urlDoSite).toString();

  return [...paginas, ...linhas].flatMap((caminho) =>
    idiomas.map((idioma) => ({
      url: absoluta(rota(idioma, caminho)),
      lastModified: new Date(),
      alternates: {
        languages: {
          "pt-BR": absoluta(rota("pt", caminho)),
          en: absoluta(rota("en", caminho)),
          es: absoluta(rota("es", caminho)),
        },
      },
    })),
  );
}
