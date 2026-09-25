/**
 * Depoimentos de produtores e cobertura de imprensa.
 *
 * ⚠ ATENÇÃO — os nomes e cargos abaixo são a transcrição EXATA das legendas do
 * documentário recebido em 26/08/2026. Não editar sem conferir o vídeo.
 *
 * Depoimento gravado para vídeo não está automaticamente liberado para uso em
 * site. Enquanto o consentimento de imagem de cada produtor não chegar, a flag
 * abaixo mantém a seção fora do ar.
 */

import type { Idioma } from "@/i18n/config";

/** Vire para `true` só depois que os consentimentos de imagem chegarem. */
export const podePublicarDepoimentos = true;

export type Depoimento = {
  nome: string;
  descricao: string;
  cidade: string;
  /** Cultura ou setor, para agrupar visualmente. */
  cultura: string;
  /** Caminho para a foto do produtor. Ex: "/imagens/produtor-1.jpg" */
  foto?: string;
};

export const depoimentos: Depoimento[] = [
  {
    nome: "Sr. Cláudio",
    descricao: "Produtor rural de hortifrúti e hortaliças",
    cidade: "Uberlândia — MG",
    cultura: "Hortifrúti",
    foto: "/imagens/depoimentos/produtor-1.jpg",
  },
  {
    nome: "Daniel Lopes",
    descricao: "Produtor rural",
    cidade: "Uberlândia e Prata — MG",
    cultura: "Grãos",
    foto: "/imagens/depoimentos/produtor-2.jpg",
  },
  {
    nome: "Arthur Borges",
    descricao:
      "Responsável técnico pelo uso do Bio-X Agricultura Única nos canaviais da Usina Aroeira",
    cidade: "Usina Aroeira",
    cultura: "Cana-de-açúcar",
    foto: "/imagens/depoimentos/produtor-3.jpg",
  },
  {
    nome: "Elson Borges",
    descricao: "Produtor rural de cereais e grãos",
    cidade: "Uberlândia, Cruzeiro dos Peixotos e Martinésia — MG",
    cultura: "Cereais e grãos",
    foto: "/imagens/depoimentos/produtor-4.jpg",
  },
  {
    nome: "Denes Carrijo e Fernando",
    descricao: "Produtores rurais de cereais e grãos — Fazendas 3 Irmãs",
    cidade: "Uberlândia, Cruzeiro dos Peixotos, Monte Alegre — MG e Tocantins — TO",
    cultura: "Cereais e grãos",
    foto: "/imagens/depoimentos/produtor-5.jpg",
  },
];

export type Materia = {
  veiculo: string;
  titulo: string;
  data: string;
  /** ISO, para o <time dateTime>. */
  dataIso: string;
  url?: string;
};

export const naMidia: Materia[] = [
  {
    veiculo: "TV Paranaíba",
    titulo: "Agricultura regenerativa: técnica traz benefícios econômicos",
    data: "24 de março de 2024",
    dataIso: "2024-03-24",
  },
];

/** Eventos e ações de campo — material para a página de resultados. */
export const eventos = [
  {
    titulo: "Dia de Campo BIO-X",
    descricao:
      "Parcelas demonstrativas de soja com placas “Aqui tem BIO-X”, sobrevoo de drone nos talhões, palestra técnica sob tenda e cerca de 40 produtores presentes.",
    imagem: "/imagens/dia-de-campo-grupo.jpg",
  },
  {
    titulo: "Parcelas comparativas a campo",
    descricao:
      "Talhões lado a lado permitem comparar o tratamento convencional e o tratamento com BIO-X no mesmo solo, na mesma safra e sob o mesmo clima.",
    imagem: "/imagens/dia-de-campo-placa.jpg",
  },
];
/* ------------------------------------------------------------------ */
/* Traduções. Nomes de pessoas, fazendas e cidades não se traduzem.     */
/* Mesma ordem das listas acima.                                        */
/* ------------------------------------------------------------------ */

const depoimentosTraduzidos: Record<"en" | "es", Pick<Depoimento, "descricao" | "cidade" | "cultura">[]> = {
  en: [
    { descricao: "Fruit and vegetable grower", cidade: "Uberlândia — MG", cultura: "Fruits & vegetables" },
    { descricao: "Farmer", cidade: "Uberlândia and Prata — MG", cultura: "Grains" },
    { descricao: "Technical lead for the use of Bio-X Agricultura Única in the sugarcane fields of the Aroeira mill", cidade: "Usina Aroeira", cultura: "Sugarcane" },
    { descricao: "Cereal and grain farmer", cidade: "Uberlândia, Cruzeiro dos Peixotos and Martinésia — MG", cultura: "Cereals & grains" },
    { descricao: "Cereal and grain farmers — Fazendas 3 Irmãs", cidade: "Uberlândia, Cruzeiro dos Peixotos, Monte Alegre — MG and Tocantins — TO", cultura: "Cereals & grains" },
  ],
  es: [
    { descricao: "Productor de frutas y hortalizas", cidade: "Uberlândia — MG", cultura: "Frutas y hortalizas" },
    { descricao: "Productor rural", cidade: "Uberlândia y Prata — MG", cultura: "Granos" },
    { descricao: "Responsable técnico del uso de Bio-X Agricultura Única en los cañaverales del ingenio Aroeira", cidade: "Usina Aroeira", cultura: "Caña de azúcar" },
    { descricao: "Productor rural de cereales y granos", cidade: "Uberlândia, Cruzeiro dos Peixotos y Martinésia — MG", cultura: "Cereales y granos" },
    { descricao: "Productores rurales de cereales y granos — Fazendas 3 Irmãs", cidade: "Uberlândia, Cruzeiro dos Peixotos, Monte Alegre — MG y Tocantins — TO", cultura: "Cereales y granos" },
  ],
};

const eventosTraduzidos: Record<"en" | "es", { titulo: string; descricao: string }[]> = {
  en: [
    { titulo: "BIO-X Field Day", descricao: "Soybean demonstration plots with “Aqui tem BIO-X” signs, drone flights over the fields, a technical talk under a tent and around 40 farmers in attendance." },
    { titulo: "Side-by-side field plots", descricao: "Plots next to each other make it possible to compare conventional treatment and BIO-X treatment on the same soil, in the same season and under the same weather." },
  ],
  es: [
    { titulo: "Día de Campo BIO-X", descricao: "Parcelas demostrativas de soja con carteles “Aqui tem BIO-X”, vuelo de dron sobre los lotes, charla técnica bajo carpa y cerca de 40 productores presentes." },
    { titulo: "Parcelas comparativas en campo", descricao: "Lotes lado a lado permiten comparar el tratamiento convencional y el tratamiento con BIO-X en el mismo suelo, en la misma cosecha y bajo el mismo clima." },
  ],
};

export function depoimentosEm(idioma: Idioma): Depoimento[] {
  if (idioma === "pt") return depoimentos;
  return depoimentos.map((d, i) => ({ ...d, ...depoimentosTraduzidos[idioma][i] }));
}

export function eventosEm(idioma: Idioma) {
  if (idioma === "pt") return eventos;
  return eventos.map((e, i) => ({ ...e, ...eventosTraduzidos[idioma][i] }));
}

/** Matérias com a data escrita no idioma. O título da matéria fica no original. */
export function naMidiaEm(idioma: Idioma): Materia[] {
  const formato = new Intl.DateTimeFormat(idioma === "pt" ? "pt-BR" : idioma, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return naMidia.map((m) => ({ ...m, data: formato.format(new Date(m.dataIso)) }));
}
