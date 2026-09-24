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