import Image from "next/image";
import type { Idioma } from "@/i18n/config";
import styles from "./InstituicoesParceiras.module.css";

/**
 * Faixa com as instituições parceiras, logo abaixo do topo da página inicial.
 * Os logos andam devagar e em loop; parar o mouse em cima pausa a faixa.
 * Para trocar um logo, salve outro PNG (fundo transparente) por cima do
 * arquivo em /public/imagens/parceiras.
 */
const instituicoes = [
  { arquivo: "ufv", nome: "UFV — Universidade Federal de Viçosa", largura: 448, altura: 380 },
  { arquivo: "ufu", nome: "UFU — Universidade Federal de Uberlândia", largura: 389, altura: 116 },
  { arquivo: "mineragro", nome: "Mineragro", largura: 345, altura: 196 },
  { arquivo: "ufla", nome: "UFLA — Universidade Federal de Lavras", largura: 354, altura: 176 },
  { arquivo: "ipacer", nome: "IPACER", largura: 392, altura: 155 },
  { arquivo: "uniube", nome: "Universidade do Agro — Uniube", largura: 373, altura: 189 },
];

const textos: Record<Idioma, { rotulo: string; apoio: string; aria: string }> = {
  pt: { rotulo: "Instituições parceiras", apoio: "Ciência feita junto com quem é referência", aria: "Logos das instituições parceiras da BIO-X" },
  en: { rotulo: "Partner institutions", apoio: "Science built alongside leading institutions", aria: "Logos of BIO-X partner institutions" },
  es: { rotulo: "Instituciones aliadas", apoio: "Ciencia hecha junto a instituciones de referencia", aria: "Logos de las instituciones aliadas de BIO-X" },
};

// Com só seis logos, repetimos a lista para a faixa nunca ter buraco em telas largas.
const COPIAS = 4;

export function InstituicoesParceiras({ idioma }: { idioma: Idioma }) {
  const t = textos[idioma];
  const faixa = Array.from({ length: COPIAS }, () => instituicoes).flat();

  return (
    <section className={styles.secao} aria-labelledby="parceiras-rotulo">
      <div className={styles.composicao}>
        <div className={styles.rotulo}>
          <span aria-hidden="true" />
          <div>
            <h2 id="parceiras-rotulo">{t.rotulo}</h2>
            <p>{t.apoio}</p>
          </div>
        </div>
        <div className={styles.janela} role="region" aria-label={t.aria}>
          <ul className={styles.trilho}>
            {faixa.map((item, i) => {
              const repetido = i >= instituicoes.length;
              return (
                <li key={`${item.arquivo}-${i}`} data-logo={item.arquivo} aria-hidden={repetido ? "true" : undefined}>
                  <Image
                    src={`/imagens/parceiras/${item.arquivo}.png`}
                    alt={repetido ? "" : item.nome}
                    width={item.largura}
                    height={item.altura}
                    sizes="180px"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
