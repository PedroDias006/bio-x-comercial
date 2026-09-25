/**
 * Carteira de clientes.
 *
 * ⚠ ATENÇÃO JURÍDICA — ler antes de publicar.
 *
 * Esta lista veio do slide "Principais Clientes" de uma apresentação INTERNA e
 * dos logos exibidos no vídeo de Saneamento. Um slide de reunião e um site
 * aberto têm exposições completamente diferentes.
 *
 * Enquanto a autorização de uso de marca de cada empresa não chegar, o site
 * mostra apenas os NOMES em texto — nunca os logotipos. É por isso que este
 * arquivo guarda strings e não caminhos de imagem.
 *
 * A flag abaixo controla isso em um lugar só.
 */

import type { Idioma } from "@/i18n/config";

/**
 * Liberado em 25/09/2026 por decisão do responsável pelo site: os logos
 * aparecem na página de clientes. Voltar para `false` esconde os logos e
 * deixa só os nomes, em todo o site, de uma vez.
 */
export const podePublicarClientes = true;

export type GrupoDeClientes = {
  setor: string;
  clientes: string[];
};

export const clientesPorSetor: GrupoDeClientes[] = [
  {
    setor: "Saneamento e água",
    clientes: [
      "COPASA",
      "SABESP",
      "BRK Ambiental",
      "SAAE",
      "Codau",
      "Allonda Ambiental",
      "Biotec",
      "Fundação Renova",
    ],
  },
  {
    setor: "Indústria e mineração",
    clientes: [
      "Petrobras",
      "Votorantim Cimentos",
      "RHI Magnesita",
      "AngloGold Ashanti",
      "Klabin",
      "Teksid",
      "Precon",
      "Síntese",
    ],
  },
  {
    setor: "Alimentos, bebidas e farmacêutica",
    clientes: ["Nestlé", "Novartis", "Vigor", "Coca-Cola FEMSA"],
  },
  {
    setor: "Engenharia e construção",
    clientes: [
      "Andrade Gutierrez",
      "OAS",
      "Engevix",
      "CCM Construtora Centro Minas",
      "Mello Azevedo",
      "Conata Engenharia",
      "Grupo CAP",
    ],
  },
  {
    setor: "Outros",
    clientes: ["SESC", "Caterpillar", "Tiberina"],
  },
];

/** Total de clientes listados — usado como número na página. */
export const totalDeClientes = clientesPorSetor.reduce(
  (soma, grupo) => soma + grupo.clientes.length,
  0,
);

/**
 * Arquivo do logo de cada cliente (versões limpas em /imagens/clientes/marcas).
 * Codau e Conata não têm logo utilizável no acervo: aparecem só com o nome.
 */
const arquivosDosLogos: Record<string, string> = {
  COPASA: "copasa", SABESP: "sabesp", "BRK Ambiental": "brk-ambiental", SAAE: "saae",
  "Allonda Ambiental": "allonda-ambiental", Biotec: "biotec", "Fundação Renova": "fundacao-renova",
  Petrobras: "petrobras", "Votorantim Cimentos": "votorantim-cimentos", "RHI Magnesita": "rhi-magnesita",
  "AngloGold Ashanti": "anglogold-ashanti", Klabin: "klabin", Teksid: "teksid", Precon: "precon", Síntese: "sintese",
  Nestlé: "nestle", Novartis: "novartis", Vigor: "vigor", "Coca-Cola FEMSA": "coca-cola-femsa",
  "Andrade Gutierrez": "andrade-gutierrez", OAS: "oas", Engevix: "engevix",
  "CCM Construtora Centro Minas": "ccm-construtora-centro-minas", "Mello Azevedo": "mello-azevedo", "Grupo CAP": "grupo-cap",
  SESC: "sesc", Caterpillar: "caterpillar", Tiberina: "tiberina",
};

/** Caminho do logo, ou `null` quando não há logo (ou a publicação está travada). */
export function logoDoCliente(nome: string): string | null {
  if (!podePublicarClientes) return null;
  const arquivo = arquivosDosLogos[nome];
  return arquivo ? `/imagens/clientes/marcas/${arquivo}.png` : null;
}

/** Nome de cada setor nos três idiomas, na ordem de `clientesPorSetor`. */
export const setoresEm: Record<Idioma, string[]> = {
  pt: ["Saneamento e água", "Indústria e mineração", "Alimentos, bebidas e farmacêutica", "Engenharia e construção", "Outros setores"],
  en: ["Sanitation and water", "Industry and mining", "Food, beverages and pharma", "Engineering and construction", "Other sectors"],
  es: ["Saneamiento y agua", "Industria y minería", "Alimentos, bebidas y farmacéutica", "Ingeniería y construcción", "Otros sectores"],
};
