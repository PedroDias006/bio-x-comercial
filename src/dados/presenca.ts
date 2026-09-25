import type { Idioma } from "@/i18n/config";

type Presenca = {
  locais: string[];
  regioes?: string[];
  culturas?: string[];
  resumo: string;
  destaque: string;
  imagem: string;
};

// Localidades informadas pela BIO-X, somadas aos registros de campo existentes.
// Região, distrito e município permanecem distintos: não são uma contagem de cidades.
export const presencas: Record<string, Presenca> = {
  MG: {
    destaque: "Café",
    imagem: "/imagens/presenca/MG-cafe.jpg",
    regioes: ["Triângulo Mineiro"],
    locais: [
      "Aguanil", "Araguari", "Arcos", "Belo Horizonte", "Betim", "Brumadinho",
      "Campo Belo", "Cana Verde", "Carmo do Cajuru", "Contagem", "Cruzeiro dos Peixotos (Uberlândia)",
      "Cruzília", "Florestal", "Guaxupé", "Ijaci", "Indianópolis", "Iraí de Minas",
      "Itumirim", "Juatuba", "Lavras", "Luz", "Mário Campos", "Martinésia (Uberlândia)",
      "Monte Alegre de Minas", "Nova Lima", "Pará de Minas", "Passos", "Patos de Minas",
      "Perdizes", "Pirapora", "Piumhi", "Prata", "Rio Paranaíba", "Santo Antônio do Amparo",
      "Serro Azul", "Sete Lagoas", "Três Corações", "Tupaciguara", "Uberlândia",
    ],
    culturas: ["Hortifrúti e hortaliças", "Cereais e grãos"],
    resumo: "Presença em diferentes regiões de Minas Gerais, incluindo o Triângulo Mineiro.",
  },
  BA: {
    destaque: "Algodão",
    imagem: "/imagens/presenca/BA-algodao.jpg",
    locais: ["Barra da Estiva", "Ibicoara", "Luís Eduardo Magalhães", "Mucugê", "Palmeiras"],
    resumo: "Presença registrada em cinco localidades da Bahia.",
  },
  GO: {
    destaque: "Tomate",
    imagem: "/imagens/presenca/GO-tomate.jpg",
    locais: ["Cristalina"],
    resumo: "Presença da BIO-X em Cristalina, Goiás.",
  },
  TO: {
    destaque: "Soja e grãos",
    imagem: "/imagens/presenca/TO-soja.jpg",
    locais: ["Alvorada", "Goianorte", "Gurupi", "Peixe"],
    culturas: ["Cereais e grãos"],
    resumo: "Presença registrada em Peixe, Goianorte, Alvorada e Gurupi.",
  },
  DF: {
    destaque: "Hortaliças",
    imagem: "/imagens/presenca/DF-hortalicas.jpg",
    locais: ["Brasília"],
    resumo: "Presença da BIO-X em Brasília, no Distrito Federal.",
  },
  SP: {
    destaque: "Cana-de-açúcar",
    imagem: "/imagens/presenca/SP-cana.jpg",
    locais: ["Cristais Paulista", "São Paulo"],
    resumo: "Presença registrada em Cristais Paulista e na capital paulista.",
  },
  MT: {
    destaque: "Soja",
    imagem: "/imagens/presenca/MT-soja.jpg",
    locais: ["Peixoto de Azevedo"],
    resumo: "Presença da BIO-X em Peixoto de Azevedo, Mato Grosso.",
  },
  RO: {
    destaque: "Pecuária",
    imagem: "/imagens/presenca/RO-pecuaria.jpg",
    locais: ["Porto Velho"],
    resumo: "Presença da BIO-X em Porto Velho, Rondônia.",
  },
  PR: {
    destaque: "Trigo",
    imagem: "/imagens/presenca/PR-trigo.jpg",
    locais: ["Medianeira"],
    resumo: "Presença da BIO-X em Medianeira, Paraná.",
  },
};

export const totalDeUFs = Object.keys(presencas).length;

/**
 * Traduções dos textos de cada estado. Nomes de lugares não se traduzem.
 * `culturas` segue a ordem da lista em português.
 */
const traducoes: Record<"en" | "es", Record<string, { destaque: string; resumo: string; culturas?: string[] }>> = {
  en: {
    MG: { destaque: "Coffee", resumo: "Present in different regions of Minas Gerais, including the Triângulo Mineiro.", culturas: ["Fruits and vegetables", "Cereals and grains"] },
    BA: { destaque: "Cotton", resumo: "Recorded presence in five locations in Bahia." },
    GO: { destaque: "Tomato", resumo: "BIO-X is present in Cristalina, Goiás." },
    TO: { destaque: "Soy and grains", resumo: "Recorded presence in Peixe, Goianorte, Alvorada and Gurupi.", culturas: ["Cereals and grains"] },
    DF: { destaque: "Vegetables", resumo: "BIO-X is present in Brasília, in the Federal District." },
    SP: { destaque: "Sugarcane", resumo: "Recorded presence in Cristais Paulista and in the city of São Paulo." },
    MT: { destaque: "Soybean", resumo: "BIO-X is present in Peixoto de Azevedo, Mato Grosso." },
    RO: { destaque: "Livestock", resumo: "BIO-X is present in Porto Velho, Rondônia." },
    PR: { destaque: "Wheat", resumo: "BIO-X is present in Medianeira, Paraná." },
  },
  es: {
    MG: { destaque: "Café", resumo: "Presencia en diferentes regiones de Minas Gerais, incluido el Triângulo Mineiro.", culturas: ["Frutas y hortalizas", "Cereales y granos"] },
    BA: { destaque: "Algodón", resumo: "Presencia registrada en cinco localidades de Bahía." },
    GO: { destaque: "Tomate", resumo: "Presencia de BIO-X en Cristalina, Goiás." },
    TO: { destaque: "Soja y granos", resumo: "Presencia registrada en Peixe, Goianorte, Alvorada y Gurupi.", culturas: ["Cereales y granos"] },
    DF: { destaque: "Hortalizas", resumo: "Presencia de BIO-X en Brasilia, en el Distrito Federal." },
    SP: { destaque: "Caña de azúcar", resumo: "Presencia registrada en Cristais Paulista y en la ciudad de São Paulo." },
    MT: { destaque: "Soja", resumo: "Presencia de BIO-X en Peixoto de Azevedo, Mato Grosso." },
    RO: { destaque: "Ganadería", resumo: "Presencia de BIO-X en Porto Velho, Rondônia." },
    PR: { destaque: "Trigo", resumo: "Presencia de BIO-X en Medianeira, Paraná." },
  },
};

/** Os registros de presença com os textos no idioma pedido. */
export function presencasEm(idioma: Idioma): Record<string, Presenca> {
  if (idioma === "pt") return presencas;
  return Object.fromEntries(
    Object.entries(presencas).map(([uf, item]) => {
      const t = traducoes[idioma][uf];
      return [uf, t ? { ...item, destaque: t.destaque, resumo: t.resumo, culturas: t.culturas ?? item.culturas } : item];
    }),
  );
}
