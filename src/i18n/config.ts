/**
 * Idiomas do site.
 *
 * - Português é o padrão e fica SEM prefixo na URL (/solucoes), para não
 *   quebrar nenhum link que já exista.
 * - Inglês e espanhol ficam em /en/... e /es/....
 *
 * Quem decide o idioma de cada visita é o `src/proxy.ts`:
 *   1. a escolha salva no cookie (quando o visitante clica numa bandeira);
 *   2. senão, a preferência do navegador (cabeçalho Accept-Language);
 *   3. senão, português.
 *
 * Os textos ficam junto de cada componente, num objeto `textos` com as três
 * versões — assim quem edita uma frase em português já vê a tradução ao lado.
 */

export const idiomas = ["pt", "en", "es"] as const;
export type Idioma = (typeof idiomas)[number];

export const idiomaPadrao: Idioma = "pt";

/** Nome do cookie que guarda a escolha do visitante. */
export const cookieIdioma = "idioma";

/** Valor do atributo `lang` do <html> e do hreflang de cada idioma. */
export const codigoIso: Record<Idioma, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export const nomeDoIdioma: Record<Idioma, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export function ehIdioma(valor: unknown): valor is Idioma {
  return typeof valor === "string" && (idiomas as readonly string[]).includes(valor);
}

/** Garante um idioma válido (vindo de params, que o TS tipa como string). */
export function idiomaDe(valor: unknown): Idioma {
  return ehIdioma(valor) ? valor : idiomaPadrao;
}

/**
 * Monta o endereço de uma página no idioma pedido.
 *   rota("pt", "/solucoes") → "/solucoes"
 *   rota("en", "/solucoes") → "/en/solucoes"
 *   rota("es", "/")         → "/es"
 */
export function rota(idioma: Idioma, caminho: string): string {
  const limpo = caminho.startsWith("/") ? caminho : `/${caminho}`;
  if (idioma === idiomaPadrao) return limpo;
  return limpo === "/" ? `/${idioma}` : `/${idioma}${limpo}`;
}

/** Tira o prefixo de idioma de um caminho: "/en/solucoes" → "/solucoes". */
export function caminhoSemIdioma(caminho: string): string {
  const partes = caminho.split("/");
  if (ehIdioma(partes[1]) && partes[1] !== idiomaPadrao) {
    const resto = `/${partes.slice(2).join("/")}`;
    return resto === "/" ? "/" : resto.replace(/\/$/, "");
  }
  return caminho || "/";
}

/** `alternates` do metadata: canonical + hreflang das três versões. */
export function alternativas(idioma: Idioma, caminho: string) {
  return {
    canonical: rota(idioma, caminho),
    languages: {
      "pt-BR": rota("pt", caminho),
      en: rota("en", caminho),
      es: rota("es", caminho),
      "x-default": rota("pt", caminho),
    },
  };
}
