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
