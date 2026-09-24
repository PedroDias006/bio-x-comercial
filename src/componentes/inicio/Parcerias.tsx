import Image from "next/image";
import { clientesPorSetor } from "@/dados/clientes";
import styles from "./Parcerias.module.css";

const arquivos: Record<string, string> = {
  COPASA: "copasa", SABESP: "sabesp", "BRK Ambiental": "brk-ambiental", SAAE: "saae", Codau: "codau", "Allonda Ambiental": "allonda-ambiental", Biotec: "biotec", "Fundação Renova": "fundacao-renova",
  Petrobras: "petrobras", "Votorantim Cimentos": "votorantim-cimentos", "RHI Magnesita": "rhi-magnesita", "AngloGold Ashanti": "anglogold-ashanti", Klabin: "klabin", Teksid: "teksid", Precon: "precon", Síntese: "sintese",
  Nestlé: "nestle", Novartis: "novartis", Vigor: "vigor", "Coca-Cola FEMSA": "coca-cola-femsa", "Andrade Gutierrez": "andrade-gutierrez", OAS: "oas", Engevix: "engevix", "CCM Construtora Centro Minas": "ccm-construtora-centro-minas", "Mello Azevedo": "mello-azevedo", "Conata Engenharia": "conata-engenharia", "Grupo CAP": "grupo-cap", SESC: "sesc", Caterpillar: "caterpillar", Tiberina: "tiberina",
};

const parceiros = clientesPorSetor.flatMap((grupo) => grupo.clientes);

export function Parcerias() {
  return (
    <section id="parcerias-titulo" className={styles.secao} aria-labelledby="parcerias-rotulo">
      <div className={styles.composicao}>
        <div className={styles.rotulo}><span aria-hidden="true" /><h2 id="parcerias-rotulo">Parcerias</h2></div>
        <div className={styles.janela} aria-label="Empresas apresentadas no acervo institucional da BIO-X">
          <ul className={styles.trilho}>
            {[...parceiros, ...parceiros].map((nome, repeticao) => (
              <li key={`${nome}-${repeticao}`} data-logo={arquivos[nome]} aria-hidden={repeticao >= parceiros.length ? "true" : undefined}>
                <Image src={`/imagens/clientes/logos/${arquivos[nome]}.png`} alt={repeticao < parceiros.length ? nome : ""} width={150} height={64} sizes="150px" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
