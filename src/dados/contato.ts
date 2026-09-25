/**
 * Canais de contato da BIO-X.
 *
 * ⚠ Procedência de cada item — extraído dos vídeos recebidos em 26/08/2026:
 *
 * - Site, e-mail e telefone fixo aparecem no cartão final do material de contato recebido.
 * - O WhatsApp aparece sobreposto no vídeo da linha de suínos.
 * - O @ de Instagram/Facebook aparece no cartão final do institucional.
 *
 * Número oficial trocado em 25/09/2026 para (34) 99939-4444 (WhatsApp e telefone).
 * NÃO temos o
 * endereço físico da empresa em nenhum dos arquivos. Enquanto ele não vier,
 * `endereco` fica nulo e os componentes simplesmente não renderizam o bloco.
 */

import type { Idioma } from "@/i18n/config";

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
const mensagensWhatsapp: Record<Idioma, string> = {
  pt: "Olá! Vim pelo site da BIO-X e quero saber mais sobre a tecnologia.",
  en: "Hello! I found BIO-X through the website and would like to learn more about the technology.",
  es: "¡Hola! Llegué por el sitio de BIO-X y quiero saber más sobre la tecnología.",
};

/** Número oficial da BIO-X (WhatsApp e telefone), definido em 25/09/2026. */
export const numeroWhatsapp = "5534999394444";
export const telefoneExibido = "(34) 99939-4444";

/** Link do WhatsApp com uma mensagem qualquer já escrita. */
export function urlWhatsappComTexto(texto: string) {
  return `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(texto)}`;
}

/** Link do WhatsApp com a mensagem já escrita no idioma do visitante. */
export function urlWhatsappEm(idioma: Idioma) {
  return `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagensWhatsapp[idioma])}`;
}

export const urlWhatsapp = urlWhatsappEm("pt");

export const canaisDeContato: CanalDeContato[] = [
  {
    id: "whatsapp",
    rotulo: "WhatsApp",
    valor: telefoneExibido,
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

/** Texto do registro no MAPA em cada idioma (o número do IBAMA não muda). */
export const textoRegistroMapa: Record<Idioma, string> = {
  pt: "Produto protocolado / previamente aprovado",
  en: "Product filed / pre-approved",
  es: "Producto protocolado / previamente aprobado",
};

/** Registros oficiais que aparecem impressos nos folders. */
export const registros = [
  { orgao: "IBAMA / MMA", numero: "7733254" },
  {
    orgao: "MAPA",
    numero: "Produto protocolado / previamente aprovado",
    observacao: "⚠ pedir o número do registro",
  },
];
