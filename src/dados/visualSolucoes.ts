import type { CSSProperties } from "react";
import { Bird, Droplets, Beef, PiggyBank, Sprout, type LucideIcon } from "lucide-react";

/**
 * Identidade visual de cada solução — usada na listagem (/solucoes) e na
 * página de cada produto (/solucoes/[slug]).
 *
 * - `icone`: foto real recortada (pintinho, boi, porco…) no lugar de ícone
 * - `cor`: cor de destaque, usada sobre fundo escuro/foto
 * - `corEscura`: a mesma cor mais fechada, para texto sobre fundo claro
 * - `fundo`: foto de tela cheia
 * - `foco`: onde fica o assunto da foto (object-position)
 * - `lado`: de que lado fica o texto na listagem
 * - `galeria`: fotos extras mostradas na página do produto
 * - `simbolo`: ícone desenhado, usado nos cartões (evita repetir a foto do ícone)
 * - `composicao`: foto do bloco de composição (uma diferente por produto)
 * - `chamada`: foto de fundo da chamada final (diferente do fundo do topo)
 *
 * Regra da casa: nenhuma foto se repete no site. Cada arquivo tem um só lugar.
 *
 * Para trocar uma foto, basta salvar outra por cima do mesmo arquivo em
 * /public/imagens/solucoes.
 */
export type VisualSolucao = {
  icone: string;
  cor: string;
  corEscura: string;
  fundo: string;
  foco: string;
  lado: "esquerda" | "direita";
  galeria: string[];
  simbolo: LucideIcon;
  composicao: string;
  chamada: string;
};

const pasta = "/imagens/solucoes";

/** Lista as fotos da galeria: galeria/<slug>-1.jpg, -2.jpg… A 1ª é a grande. */
const fotos = (slug: string, quantidade: number) =>
  Array.from({ length: quantidade }, (_, i) => `${pasta}/galeria/${slug}-${i + 1}.jpg`);

export const visualDasSolucoes: Record<string, VisualSolucao> = {
  "agricultura-unica": {
    icone: `${pasta}/icone-agricultura-unica.jpg`,
    cor: "#9ad94f",
    corEscura: "#4a8a1c",
    fundo: `${pasta}/fundo-agricultura-unica.jpg`,
    foco: "50% 60%",
    lado: "esquerda",
    galeria: fotos("agricultura-unica", 6),
    simbolo: Sprout,
    composicao: `${pasta}/composicao-agricultura-unica.jpg`,
    chamada: `${pasta}/cta-agricultura-unica.jpg`,
  },
  saneamento: {
    icone: `${pasta}/icone-saneamento.jpg`,
    cor: "#4fd6e6",
    corEscura: "#0b8797",
    fundo: `${pasta}/fundo-saneamento.jpg`,
    foco: "40% 55%",
    lado: "direita",
    galeria: fotos("saneamento", 3),
    simbolo: Droplets,
    composicao: `${pasta}/composicao-saneamento.jpg`,
    chamada: `${pasta}/cta-saneamento.jpg`,
  },
  "saude-do-gado": {
    icone: `${pasta}/icone-saude-do-gado.jpg`,
    cor: "#f2b84b",
    corEscura: "#a36b0b",
    fundo: `${pasta}/fundo-saude-do-gado.jpg`,
    foco: "65% 60%",
    lado: "esquerda",
    galeria: fotos("saude-do-gado", 4),
    simbolo: Beef,
    composicao: `${pasta}/composicao-saude-do-gado.jpg`,
    chamada: `${pasta}/cta-saude-do-gado.jpg`,
  },
  "saude-unica-suinos": {
    icone: `${pasta}/icone-saude-unica-suinos.jpg`,
    cor: "#ffa3b5",
    corEscura: "#c4506c",
    fundo: `${pasta}/fundo-saude-unica-suinos.jpg`,
    foco: "30% 50%",
    lado: "direita",
    galeria: fotos("saude-unica-suinos", 5),
    simbolo: PiggyBank,
    composicao: `${pasta}/composicao-saude-unica-suinos.jpg`,
    chamada: `${pasta}/cta-saude-unica-suinos.jpg`,
  },
  "saude-unica-aves": {
    icone: `${pasta}/icone-saude-unica-aves.jpg`,
    cor: "#ffd84d",
    corEscura: "#a37a00",
    fundo: `${pasta}/fundo-saude-unica-aves.jpg`,
    foco: "75% 70%",
    lado: "esquerda",
    galeria: fotos("saude-unica-aves", 5),
    simbolo: Bird,
    composicao: `${pasta}/composicao-saude-unica-aves.jpg`,
    chamada: `${pasta}/cta-saude-unica-aves.jpg`,
  },
};

const visualPadrao: VisualSolucao = visualDasSolucoes["agricultura-unica"];

export function visualDa(slug: string): VisualSolucao {
  return visualDasSolucoes[slug] ?? visualPadrao;
}

/** Expõe as cores do produto como variáveis CSS (--cor, --cor-escura). */
export function comCor(visual: VisualSolucao) {
  return {
    "--cor": visual.cor,
    "--cor-escura": visual.corEscura,
  } as CSSProperties;
}
