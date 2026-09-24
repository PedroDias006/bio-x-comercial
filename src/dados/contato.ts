/**
 * Canais de contato da BIO-X.
 *
 * ⚠ Procedência de cada item — extraído dos vídeos recebidos em 26/08/2026:
 *
 * - Site, e-mail e telefone fixo aparecem no cartão final do material de contato recebido.
 * - O WhatsApp aparece sobreposto no vídeo da linha de suínos.
 * - O @ de Instagram/Facebook aparece no cartão final do institucional.
 *
 * O DDD 31 é de Belo Horizonte e região metropolitana, mas NÃO temos o
 * endereço físico da empresa em nenhum dos arquivos. Enquanto ele não vier,
 * `endereco` fica nulo e os componentes simplesmente não renderizam o bloco.
 */

export type CanalDeContato = {
  id: string;
  rotulo: string;
  valor: string;
  href: string;
  observacao?: string;
  externo?: boolean;
};

/**
 * Mensagem que já vai escrita quando o visitante abre o WhatsApp.
 * Trocar aqui muda em todos os botões do site de uma vez.
 */
const mensagemWhatsapp = encodeURIComponent(
  "Olá! Vim pelo site da BIO-X e quero saber mais sobre a tecnologia.",
);

export const urlWhatsapp = `https://wa.me/5531998129478?text=${mensagemWhatsapp}`;

export const canaisDeContato: CanalDeContato[] = [
  {
    id: "whatsapp",
    rotulo: "WhatsApp",
    valor: "(31) 99812-9478",
    href: urlWhatsapp,
    observacao: "Canal mais rápido",
    externo: true,
  },
  {
    id: "email",
    rotulo: "E-mail",
    valor: "biox@bioxmicroorganismos.com.br",
    href: "mailto:biox@bioxmicroorganismos.com.br?subject=Contato%20pelo%20site",
  },
  {
    id: "telefone",
    rotulo: "Telefone",
    valor: "(31) 2010-6080",
    href: "tel:+553120106080",
  },
];

export const redesSociais = [
  {
    id: "instagram",
    rotulo: "Instagram",
    valor: "@bioxmicroorganismos",
    href: "https://instagram.com/bioxmicroorganismos",
  },
  {
    id: "facebook",
    rotulo: "Facebook",
    valor: "@bioxmicroorganismos",
    href: "https://facebook.com/bioxmicroorganismos",
  },
];

/**
 * ⚠ PENDENTE — pedir ao cliente.
 * Assim que o endereço chegar, preencher este objeto: o rodapé e a página de
 * contato já sabem renderizá-lo, e o `null` some sozinho.
 */
export const endereco: {
  razaoSocial: string;
  cnpj: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
} | null = null;

/** Registros oficiais que aparecem impressos nos folders. */
export const registros = [
  { orgao: "IBAMA / MMA", numero: "7733254" },
  {
    orgao: "MAPA",
    numero: "Produto protocolado / previamente aprovado",
    observacao: "⚠ pedir o número do registro",
  },
];
