/**
 * Dados globais do site BIO-X.
 *
 * Nenhum componente guarda esses valores "de cor" — todos importam daqui.
 * Para trocar um número, um slogan ou o domínio, o lugar é este arquivo.
 */

import type { Idioma } from "@/i18n/config";

/** Domínio público. Usado em canonical, Open Graph e sitemap. */
export const urlDoSite =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bioxmicroorganismos.com.br";

export const nomeDaEmpresa = "BIO-X Microorganismos";

export const assinatura = "Por um futuro sustentável";

/**
 * Os três números que abrem a home.
 *
 * ⚠ Procedência: todos saíram dos vídeos institucionais recebidos em 26/08/2026.
 * O registro IBAMA aparece impresso em todos os folders. Confirmar com a
 * empresa antes de publicar, principalmente o "+30 anos" (é o que a narração
 * diz, mas não vimos o ano de fundação em lugar nenhum).
 */
export const numeros = [
  { valor: "+30", unidade: "anos", descricao: "de experiência no agronegócio" },
  { valor: "7733254", unidade: "", descricao: "registro IBAMA / MMA" },
  { valor: "100", unidade: "%", descricao: "natural, sem resíduo químico" },
];

/**
 * Os quatro atributos que a marca literalmente desenha na tela no vídeo
 * institucional (animação de lousa). São o resumo mais curto da proposta.
 */
export const atributos = [
  {
    titulo: "Fácil aplicação",
    descricao: "Entra na operação que já existe, sem equipamento novo.",
  },
  {
    titulo: "Ecologicamente correto",
    descricao: "Microorganismos que já existem na natureza, sem passivo ambiental.",
  },
  {
    titulo: "Economicamente viável",
    descricao: "Substitui parte do insumo químico e reduz o custo por hectare.",
  },
  {
    titulo: "Biodegradável",
    descricao: "Ao fim do processo sobram CO₂ e NO₂, não compostos tóxicos.",
  },
];

/** Missão, visão e valores — do vídeo institucional. */
export const missaoVisaoValores = [
  {
    pilar: "Missão",
    complemento: "Objetivo",
    texto:
      "Unir conhecimento técnico e mais de 30 anos de experiência para entregar sustentabilidade real ao cliente.",
  },
  {
    pilar: "Visão",
    complemento: "Foco",
    texto: "Parceria de sucesso e responsabilidade social.",
  },
  {
    pilar: "Valores",
    complemento: "",
    texto: "Resultados e inovação, economia e valorização de mercado.",
  },
];

/** Menu principal. A ordem é a que aparece no cabeçalho e no rodapé. */
const rotulosDoMenu: Record<Idioma, string[]> = {
  pt: ["A BIO-X", "Soluções", "Resultados", "Clientes"],
  en: ["About BIO-X", "Solutions", "Results", "Clients"],
  es: ["BIO-X", "Soluciones", "Resultados", "Clientes"],
};
const enderecosDoMenu = ["/sobre", "/solucoes", "/resultados", "/clientes"];

/** Menu no idioma pedido. `href` é o caminho base, sem prefixo de idioma. */
export function navegacaoEm(idioma: Idioma) {
  return enderecosDoMenu.map((href, i) => ({ rotulo: rotulosDoMenu[idioma][i], href }));
}

/** Menu em português — mantido para quem ainda importa a lista direto. */
export const navegacao = navegacaoEm("pt");

export const assinaturaEm: Record<Idioma, string> = {
  pt: "Por um futuro sustentável",
  en: "For a sustainable future",
  es: "Por un futuro sostenible",
};

/** Os números e o missão/visão/valores nos três idiomas (mesma ordem acima). */
export const numerosEm: Record<Idioma, typeof numeros> = {
  pt: numeros,
  en: [
    { valor: "+30", unidade: "years", descricao: "of experience in agribusiness" },
    { valor: "7733254", unidade: "", descricao: "IBAMA / MMA registration (Brazil)" },
    { valor: "100", unidade: "%", descricao: "natural, no chemical residue" },
  ],
  es: [
    { valor: "+30", unidade: "años", descricao: "de experiencia en el agronegocio" },
    { valor: "7733254", unidade: "", descricao: "registro IBAMA / MMA (Brasil)" },
    { valor: "100", unidade: "%", descricao: "natural, sin residuos químicos" },
  ],
};

export const missaoVisaoValoresEm: Record<Idioma, typeof missaoVisaoValores> = {
  pt: missaoVisaoValores,
  en: [
    { pilar: "Mission", complemento: "Purpose", texto: "To combine technical expertise and more than 30 years of experience to deliver real sustainability to our clients." },
    { pilar: "Vision", complemento: "Focus", texto: "Successful partnerships and social responsibility." },
    { pilar: "Values", complemento: "", texto: "Results and innovation, savings and market value." },
  ],
  es: [
    { pilar: "Misión", complemento: "Objetivo", texto: "Unir conocimiento técnico y más de 30 años de experiencia para entregar sostenibilidad real al cliente." },
    { pilar: "Visión", complemento: "Enfoque", texto: "Alianzas exitosas y responsabilidad social." },
    { pilar: "Valores", complemento: "", texto: "Resultados e innovación, economía y valorización de mercado." },
  ],
};
