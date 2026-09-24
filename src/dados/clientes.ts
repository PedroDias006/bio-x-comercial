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

/** Vire para `true` só depois que as autorizações de uso de marca chegarem. */
export const podePublicarClientes = false;

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
