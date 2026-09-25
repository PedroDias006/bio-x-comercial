/**
 * As cinco linhas de produto da BIO-X.
 *
 * Cada solução vira uma página em /solucoes/[slug] automaticamente — não é
 * preciso criar arquivo novo para publicar uma linha. Basta acrescentar um
 * objeto aqui com o mesmo formato.
 *
 * ⚠ Todo o conteúdo saiu dos folders e vídeos recebidos em 26/08/2026.
 * Onde falta material, o campo `pendencias` diz o que pedir ao cliente — e a
 * página mostra um aviso em vez de inventar texto.
 */

import type { Idioma } from "@/i18n/config";
import { traducoesDasSolucoes } from "./solucoes.traducoes";

export type Solucao = {
  slug: string;
  nome: string;
  /** Aparece como sobrenome do título. Ex.: "Agricultura" + "Única". */
  categoria: "Agricultura" | "Saneamento" | "Pecuária";
  resumo: string;
  /** Frase de capa da página da solução. */
  chamada: string;
  descricao: string;
  imagem: string;
  beneficios: string[];
  /** Microorganismos da fórmula. `cientifico` sai em itálico. */
  composicao: { grupo: string; cientifico: string }[];
  /** Blocos livres de conteúdo técnico. */
  detalhes?: { titulo: string; texto: string }[];
  /** Número de destaque da página, quando existe. */
  destaque?: { valor: string; legenda: string };
  pendencias?: string[];
};

export const solucoes: Solucao[] = [
  {
    slug: "agricultura-unica",
    nome: "Agricultura Única",
    categoria: "Agricultura",
    resumo:
      "Biotecnologia 100% natural aplicável em qualquer cultivo. Revitaliza a microbiota do solo e reduz a dependência de insumo químico.",
    chamada: "A melhor alternativa para a agricultura",
    descricao:
      "Microorganismos benéficos que atuam por duas vias: competem diretamente com os patógenos causadores de doenças e aceleram a digestão da matéria orgânica, liberando nutrientes que a planta absorve com mais eficiência. O resultado aparece na produtividade, no custo por hectare e na saúde do solo ao longo das safras.",
    imagem: "/imagens/hero/soja-lavoura.jpg",
    beneficios: [
      "Aumento da produtividade",
      "Menor custo agregado",
      "Revitaliza a microbiota do solo",
      "Homogeneidade da colheita",
      "Enriquece o solo com substâncias benéficas",
      "Diminuição da incidência de doenças e pragas",
      "Melhor condição vegetal frente ao estresse hídrico",
      "Ecologicamente correto, sem impactos ambientais",
    ],
    composicao: [
      { grupo: "Lactobacilos", cientifico: "Lacticaseibacillus paracasei" },
      { grupo: "Saccharomyces", cientifico: "Saccharomyces cerevisiae" },
      { grupo: "Cianobactérias", cientifico: "Cianofíceas" },
      { grupo: "Lentilactobacillus", cientifico: "Lentilactobacillus parafarraginis" },
    ],
    detalhes: [
      {
        titulo: "Primeira via — competição",
        texto:
          "Os microorganismos da fórmula são predadores naturais dos patógenos causadores de doenças. Ocupam o espaço e o alimento que o patógeno usaria, derrubando a população dele por competição direta.",
      },
      {
        titulo: "Segunda via — digestão acelerada",
        texto:
          "Quebram os compostos do solo e liberam potássio, nitrogênio, cálcio, magnésio, ferro, fósforo e enxofre, além de antioxidantes, aminoácidos, enzimas e vitaminas A, B1, B12 e B5. Também promovem maior permeabilidade do solo, o que facilita o desenvolvimento de raízes primárias e secundárias.",
      },
      {
        titulo: "Culturas com uso comprovado",
        texto:
          "Soja, milho, cana-de-açúcar, citros, hortifrúti e hortaliças, cereais e grãos. O produto é aplicável em qualquer cultivo.",
      },
    ],
    pendencias: [
      "O documentário cita produtividades “de __ a cem por cento a mais do que no padrão da fazenda”. O primeiro número está ilegível no vídeo e não deve ir ao ar sem confirmação.",
      "Obter o estudo da UFV que embasa a frase “aprovado cientificamente pela Viçosa”.",
      "Ficha técnica: dosagem, embalagens disponíveis e modo de aplicação por cultura.",
    ],
  },
  {
    slug: "saneamento",
    nome: "Saneamento",
    categoria: "Saneamento",
    resumo:
      "Biorremediador de alta performance para estações de tratamento, rios, lagoas, fossas sépticas e caixas de gordura.",
    chamada: "Revitalizar. Restaurar.",
    descricao:
      "Biorremediador de alta performance composto por microorganismos na forma líquida, com foco em melhoria de performance e na substituição parcial ou total de produtos químicos. Facultativo, aeróbio e anaeróbio — por isso pode ser aplicado em qualquer modelo de estação de tratamento, e também em lagoas e rios contaminados, sem qualquer tipo de dano ambiental.",
    imagem: "/imagens/produtos/folder-saneamento.jpeg",
    beneficios: [
      "Aplicável em qualquer modelo de estação de tratamento",
      "Atuação imediata, sem período de adaptação",
      "Substitui parcial ou totalmente os produtos químicos",
      "Elimina os gases ofensivos na origem",
      "Sem dano ambiental — microorganismos benéficos naturais",
      "Ajusta os parâmetros analíticos da água tratada",
    ],
    composicao: [
      { grupo: "Bactérias fotossintéticas", cientifico: "" },
      { grupo: "Leveduras", cientifico: "" },
      { grupo: "Bactérias ácido-lácticas", cientifico: "" },
    ],
    detalhes: [
      {
        titulo: "O que elimina",
        texto:
          "Os patógenos causadores de doenças e os produtores diretos dos gases ofensivos — amônia, gás sulfídrico e metilmercaptano, entre outros que contaminam o ar em volta da estação.",
      },
      {
        titulo: "Troca o processo, não só o insumo",
        texto:
          "Induz os microorganismos neutros a atuarem na fermentação natural da matéria, que antes era feita pelo processo oxidativo, devido ao excesso de oxigênio. A matéria orgânica se transforma rapidamente em substâncias benéficas que ajudam a revitalizar o corpo receptor.",
      },
      {
        titulo: "Onde se aplica",
        texto:
          "ETE industrial ou sanitária; rios, lagos e lagoas; fossas sépticas e caixas de gordura.",
      },
    ],
  },
  {
    slug: "saude-do-gado",
    nome: "Saúde do Gado",
    categoria: "Pecuária",
    resumo:
      "Linha para pecuária bovina, 100% natural, sob os pilares de compromisso, sustentabilidade e responsabilidade.",
    chamada: "Tecnologia · Desempenho · Economia · Produtividade",
    descricao:
      "Linha da BIO-X voltada à bovinocultura, apresentada no material institucional sob os pilares de compromisso, sustentabilidade e responsabilidade.",
    imagem: "/imagens/produtos/folder-saude-do-gado.jpeg",
    beneficios: [],
    composicao: [],
    pendencias: [
      "Esta é a linha com menos material no acervo: o folder recebido não traz lista de benefícios, composição nem modo de uso.",
      "Pedir ao cliente o material técnico completo antes de publicar a página.",
    ],
  },
  {
    slug: "saude-unica-suinos",
    nome: "Saúde Única Suínos",
    categoria: "Pecuária",
    resumo:
      "Aplicado no ambiente e na água de bebida, reduz patógenos, diarreia e gases ofensivos na granja.",
    chamada: "Menos antibiótico, mais bem-estar",
    descricao:
      "A saúde dos suínos depende do equilíbrio entre alimentação, água de bebida, instalações e manejo. O BIO-X Saúde Única é uma tecnologia 100% natural que, aplicada no ambiente e na água de bebida, reduz o índice de microrganismos patógenos causadores de doenças como a diarreia, além de diminuir os gases ofensivos — favorecendo o bem-estar dos animais e dos colaboradores.",
    imagem: "/imagens/produtos/folder-saude-unica-suinos.jpeg",
    beneficios: [
      "Redução expressiva na diarreia",
      "Redução no uso de medicamentos e antibióticos",
      "Diminui a refugagem",
      "Reduz a mortalidade",
      "Potencializa o sistema imune",
      "Sanitizante natural para as instalações",
      "Repelente natural",
      "Reduz o uso de produtos químicos",
    ],
    composicao: [
      { grupo: "Levedura", cientifico: "Saccharomyces boulardii" },
      { grupo: "Lactobacilo", cientifico: "Lactobacillus rhamnosus" },
      { grupo: "Lactobacilo", cientifico: "Lactobacillus parafarraginis" },
      { grupo: "Lactobacilo", cientifico: "Lactobacillus casei" },
    ],
    detalhes: [
      {
        titulo: "Onde entra na rotina",
        texto:
          "Na limpeza das instalações e na água de bebida. Não exige mudança de manejo nem equipamento novo.",
      },
    ],
  },
  {
    slug: "saude-unica-aves",
    nome: "Saúde Única Aves",
    categoria: "Pecuária",
    resumo:
      "Melhora conversão alimentar e ganho de peso diário, com modulação da microbiota intestinal.",
    chamada: "CA, GPD e TGI em um só produto",
    descricao:
      "A saúde das aves depende do equilíbrio entre alimentação, água de bebida, instalações e manejo. Tecnologia 100% natural que, aplicada no ambiente e na água de bebida, reduz o índice de microrganismos patógenos causadores de doenças, além de diminuir os gases ofensivos.",
    imagem: "/imagens/produtos/folder-saude-unica-aves.jpeg",
    beneficios: [
      "Melhora da C.A. (Conversão Alimentar)",
      "Incremento positivo no GPD (Ganho de Peso Diário)",
      "Equilíbrio da microbiota intestinal com modulação do TGI",
      "Aumento progressivo no desenvolvimento do sistema imune",
      "Redução dos gases ofensivos no galpão",
    ],
    composicao: [
      { grupo: "Levedura", cientifico: "Saccharomyces boulardii" },
      { grupo: "Lactobacilo", cientifico: "Lactobacillus rhamnosus" },
      { grupo: "Lactobacilo", cientifico: "Lactobacillus parafarraginis" },
      { grupo: "Lactobacilo", cientifico: "Lactobacillus casei" },
    ],
  },
];

/** Nome de cada categoria nos três idiomas (a chave continua em português). */
const nomesDasCategorias: Record<Solucao["categoria"], Record<Idioma, string>> = {
  Agricultura: { pt: "Agricultura", en: "Agriculture", es: "Agricultura" },
  Saneamento: { pt: "Saneamento", en: "Sanitation", es: "Saneamiento" },
  Pecuária: { pt: "Pecuária", en: "Livestock", es: "Ganadería" },
};

export function nomeDaCategoria(categoria: Solucao["categoria"], idioma: Idioma) {
  return nomesDasCategorias[categoria][idioma];
}

/** Uma solução com os textos no idioma pedido (ver solucoes.traducoes.ts). */
function traduzir(solucao: Solucao, idioma: Idioma): Solucao {
  if (idioma === "pt") return solucao;
  const t = traducoesDasSolucoes[idioma][solucao.slug];
  if (!t) return solucao;
  return {
    ...solucao,
    resumo: t.resumo,
    chamada: t.chamada,
    descricao: t.descricao,
    beneficios: t.beneficios,
    composicao: solucao.composicao.map((item, i) => ({
      grupo: t.composicao[i] ?? item.grupo,
      cientifico: t.cientifico?.[i] ?? item.cientifico,
    })),
    detalhes: t.detalhes ?? solucao.detalhes,
    // Notas internas, em português: só aparecem na versão pt.
    pendencias: undefined,
  };
}

/** Todas as soluções, com os textos no idioma pedido. */
export function solucoesEm(idioma: Idioma): Solucao[] {
  return solucoes.map((solucao) => traduzir(solucao, idioma));
}

/** Busca uma solução pelo slug. Usada pela página /solucoes/[slug]. */
export function acharSolucao(slug: string, idioma: Idioma = "pt") {
  const solucao = solucoes.find((item) => item.slug === slug);
  return solucao ? traduzir(solucao, idioma) : undefined;
}

/** As categorias na ordem em que devem aparecer nos filtros e listagens. */
export const categorias = [
  "Agricultura",
  "Saneamento",
  "Pecuária",
] as const;
