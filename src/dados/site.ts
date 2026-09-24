/**
 * Dados globais do site BIO-X.
 *
 * Nenhum componente guarda esses valores "de cor" — todos importam daqui.
 * Para trocar um número, um slogan ou o domínio, o lugar é este arquivo.
 */

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
export const navegacao = [
  { rotulo: "A BIO-X", href: "/sobre" },
  { rotulo: "Soluções", href: "/solucoes" },
  { rotulo: "Resultados", href: "/resultados" },
  { rotulo: "Clientes", href: "/clientes" },
  { rotulo: "Na mídia", href: "/na-midia" },
];
