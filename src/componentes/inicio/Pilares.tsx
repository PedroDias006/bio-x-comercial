"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Beef, Droplets, Leaf, Microscope, MoveUpRight, Sprout } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Conteiner } from "@/componentes/ui/Conteiner";
import styles from "./Pilares.module.css";
import { rota, type Idioma } from "@/i18n/config";
import { useIdioma } from "@/i18n/ProvedorIdioma";

/**
 * Parte visual de cada pilar (igual em todos os idiomas).
 * `imagem` preenche a pirâmide; `foto` aparece no cartão ao lado.
 * São fotos diferentes de propósito — a mesma foto não se repete na seção.
 */
const basePilares = [
  // Os nomes destes dois arquivos são históricos; esta imagem é o riacho.
  { imagem: "/imagens/hero/pilar-agricultura.jpg", foto: "/imagens/inicio/pilar-agua.jpg", posicao: "center 58%", icone: Droplets, cor: "#087a8b", fundo: "#edf7f8" },
  { imagem: "/imagens/hero/pilar-saneamento.jpg", foto: "/imagens/inicio/pilar-lavoura.jpg", posicao: "center 62%", icone: Leaf, cor: "#397445", fundo: "#f0f6ec" },
  { imagem: "/imagens/vitrine/gado-nova.png", foto: "/imagens/inicio/animal-bovino.jpg", posicao: "center", icone: Beef, cor: "#8e5940", fundo: "#faf2ec" },
  { imagem: "/imagens/hero/microscopio.jpg", foto: "/imagens/inicio/pilar-ciencia.jpg", posicao: "center 54%", icone: Microscope, cor: "#526e8b", fundo: "#eff3f8" },
  { imagem: "/imagens/hero/biotecnologia-integrada.jpg", foto: "/imagens/hero/biotecnologia-integrada.jpg", posicao: "center 48%", icone: Sprout, cor: "#007f88", fundo: "#eaf7f5" },
];

type TextoPilar = { nome: string; categoria: string; resumo: string; descricao: string; destaque: string; alt: string };

const textos: Record<Idioma, {
  pilares: TextoPilar[];
  animais: string[];
  olho: string; titulo: string; apoio: string; ariaNav: string; ariaPiramide: string;
  instrucao: string; rotulo: string; conheca: string;
}> = {
  pt: {
    pilares: [
      { nome: "Saneamento", categoria: "Equilíbrio para a água", resumo: "Água tratada. Um ambiente mais saudável.", descricao: "Tecnologia biológica para melhorar a qualidade do efluente, reduzir odores e acelerar a decomposição da matéria orgânica em sistemas de tratamento.", destaque: "Biorremediação", alt: "Água de um riacho em meio à vegetação e à luz natural" },
      { nome: "Agricultura", categoria: "Vitalidade para o solo", resumo: "Solo mais vivo. Plantas mais fortes.", descricao: "Microorganismos benéficos integrados ao manejo agrícola para favorecer a ciclagem de nutrientes, o desenvolvimento das plantas e uma produção mais sustentável.", destaque: "Agricultura Única", alt: "Vista aérea de uma lavoura verde com um trator em operação" },
      { nome: "Produção animal", categoria: "Cuidado em toda a cadeia", resumo: "Bem-estar e eficiência, lado a lado.", descricao: "Soluções naturais para bovinos, aves e suínos, desenvolvidas para integrar saúde, bem-estar e eficiência à rotina da produção animal.", destaque: "Bovinos · aves · suínos", alt: "Bovino nelore no pasto" },
      { nome: "Ciência", categoria: "Conhecimento que transforma", resumo: "Da pesquisa à biotecnologia aplicada.", descricao: "Conhecimento técnico transforma microorganismos benéficos em soluções que se integram ao manejo do solo, da água e da produção animal.", destaque: "Conhecimento técnico", alt: "Objetivas de um microscópio em um laboratório" },
      { nome: "Inovação", categoria: "Novas possibilidades", resumo: "Conexões que fazem o futuro avançar.", descricao: "Inovação, economia e valorização de mercado orientam a evolução contínua das soluções e o impacto positivo em toda a cadeia.", destaque: "Evolução contínua", alt: "Agricultura, água e produção animal conectadas pela biotecnologia" },
    ],
    animais: ["Bovino nelore no pasto", "Galinha branca em uma criação ao ar livre", "Leitões em uma área de criação ao ar livre"],
    olho: "A estrutura que sustenta a BIO-X",
    titulo: "Cada camada fortalece a próxima.",
    apoio: "Da água à inovação, cinco pilares conectam experiência e ciência para transformar o que realmente importa.",
    ariaNav: "Escolha um dos cinco pilares",
    ariaPiramide: "Pirâmide tridimensional interativa dos cinco pilares da BIO-X",
    instrucao: "Toque em uma camada e descubra sua essência.",
    rotulo: "Pilares BIO-X",
    conheca: "Conheça a BIO-X",
  },
  en: {
    pilares: [
      { nome: "Sanitation", categoria: "Balance for water", resumo: "Treated water. A healthier environment.", descricao: "Biological technology that improves effluent quality, reduces odors and speeds up the breakdown of organic matter in treatment systems.", destaque: "Bioremediation", alt: "Stream water among vegetation in natural light" },
      { nome: "Agriculture", categoria: "Vitality for the soil", resumo: "Livelier soil. Stronger plants.", descricao: "Beneficial microorganisms built into crop management to support nutrient cycling, plant development and more sustainable production.", destaque: "Agricultura Única", alt: "Aerial view of a green field with a tractor at work" },
      { nome: "Animal production", categoria: "Care across the chain", resumo: "Well-being and efficiency, side by side.", descricao: "Natural solutions for cattle, poultry and pigs, designed to bring health, well-being and efficiency into the daily routine of animal production.", destaque: "Cattle · poultry · pigs", alt: "Nelore cattle on pasture" },
      { nome: "Science", categoria: "Knowledge that transforms", resumo: "From research to applied biotechnology.", descricao: "Technical expertise turns beneficial microorganisms into solutions that fit into the management of soil, water and animal production.", destaque: "Technical expertise", alt: "Microscope lenses over a lab sample" },
      { nome: "Innovation", categoria: "New possibilities", resumo: "Connections that move the future forward.", descricao: "Innovation, savings and market value guide the continuous evolution of our solutions and their positive impact across the whole chain.", destaque: "Continuous evolution", alt: "Agriculture, water and animal production connected by biotechnology" },
    ],
    animais: ["Nelore cattle on pasture", "White hen on a free-range farm", "Piglets on a free-range farm"],
    olho: "The structure behind BIO-X",
    titulo: "Each layer strengthens the next.",
    apoio: "From water to innovation, five pillars connect experience and science to transform what really matters.",
    ariaNav: "Choose one of the five pillars",
    ariaPiramide: "Interactive 3D pyramid of the five BIO-X pillars",
    instrucao: "Tap a layer to discover what it stands for.",
    rotulo: "BIO-X pillars",
    conheca: "About BIO-X",
  },
  es: {
    pilares: [
      { nome: "Saneamiento", categoria: "Equilibrio para el agua", resumo: "Agua tratada. Un ambiente más saludable.", descricao: "Tecnología biológica para mejorar la calidad del efluente, reducir olores y acelerar la descomposición de la materia orgánica en sistemas de tratamiento.", destaque: "Biorremediación", alt: "Agua de un arroyo entre la vegetación y la luz natural" },
      { nome: "Agricultura", categoria: "Vitalidad para el suelo", resumo: "Suelo más vivo. Plantas más fuertes.", descricao: "Microorganismos benéficos integrados al manejo agrícola para favorecer el ciclo de nutrientes, el desarrollo de las plantas y una producción más sostenible.", destaque: "Agricultura Única", alt: "Vista aérea de un cultivo verde con un tractor trabajando" },
      { nome: "Producción animal", categoria: "Cuidado en toda la cadena", resumo: "Bienestar y eficiencia, de la mano.", descricao: "Soluciones naturales para bovinos, aves y cerdos, desarrolladas para integrar salud, bienestar y eficiencia a la rutina de la producción animal.", destaque: "Bovinos · aves · cerdos", alt: "Bovino nelore en el pasto" },
      { nome: "Ciencia", categoria: "Conocimiento que transforma", resumo: "De la investigación a la biotecnología aplicada.", descricao: "El conocimiento técnico transforma microorganismos benéficos en soluciones que se integran al manejo del suelo, del agua y de la producción animal.", destaque: "Conocimiento técnico", alt: "Objetivos de un microscopio sobre una muestra de laboratorio" },
      { nome: "Innovación", categoria: "Nuevas posibilidades", resumo: "Conexiones que hacen avanzar el futuro.", descricao: "La innovación, la economía y la valorización de mercado orientan la evolución continua de las soluciones y el impacto positivo en toda la cadena.", destaque: "Evolución continua", alt: "Agricultura, agua y producción animal conectadas por la biotecnología" },
    ],
    animais: ["Bovino nelore en el pasto", "Gallina blanca en una cría al aire libre", "Lechones en un área de cría al aire libre"],
    olho: "La estructura que sostiene a BIO-X",
    titulo: "Cada capa fortalece la siguiente.",
    apoio: "Del agua a la innovación, cinco pilares conectan experiencia y ciencia para transformar lo que realmente importa.",
    ariaNav: "Elija uno de los cinco pilares",
    ariaPiramide: "Pirámide tridimensional interactiva de los cinco pilares de BIO-X",
    instrucao: "Toque una capa y descubra su esencia.",
    rotulo: "Pilares BIO-X",
    conheca: "Conozca BIO-X",
  },
};

// A mesma geometria desenha as fatias e define a origem da conexão.
const fatias = [
  { topo: 372, base: 458, yTras: 762, yTopo: 787, yFrente: 812, yBase: 946, yBaseFrente: 1010 },
  { topo: 278, base: 364, yTras: 558, yTopo: 583, yFrente: 608, yBase: 730, yBaseFrente: 786 },
  { topo: 184, base: 270, yTras: 364, yTopo: 389, yFrente: 414, yBase: 532, yBaseFrente: 580 },
  { topo: 92, base: 176, yTras: 178, yTopo: 203, yFrente: 228, yBase: 344, yBaseFrente: 384 },
  { topo: 0, base: 82, yTras: 28, yTopo: 28, yFrente: 28, yBase: 166, yBaseFrente: 196 },
];

type Conexao = { largura: number; altura: number; x: number; y: number; fimX: number; fimY: number; curvaX: number; indice: number };

export function Pilares() {
  const idioma = useIdioma();
  const t = textos[idioma];
  const pilares = basePilares.map((base, i) => ({ ...base, ...t.pilares[i] }));
  const [ativo, setAtivo] = useState(pilares.length - 1);
  const [conexao, setConexao] = useState<Conexao | null>(null);
  const experienciaRef = useRef<HTMLDivElement>(null);
  const torreRef = useRef<SVGSVGElement>(null);
  const destinoRef = useRef<HTMLSpanElement>(null);
  const id = useId().replace(/:/g, "");
  const pilar = pilares[ativo];
  const Icone = pilar.icone;
  const tema = { "--cor-pilar": pilar.cor, "--fundo-pilar": pilar.fundo } as CSSProperties;

  useEffect(() => {
    const experiencia = experienciaRef.current;
    const torre = torreRef.current;
    const destino = destinoRef.current;
    if (!experiencia || !torre || !destino) return;
    let frame = 0;

    const medir = () => {
      const matriz = torre.getScreenCTM();
      if (!matriz) return;
      const area = experiencia.getBoundingClientRect();
      const alvo = destino.getBoundingClientRect();
      const fatia = fatias[ativo];
      // Ponto na metade da aresta externa direita, nunca na camada de baixo.
      const origem = new DOMPoint(
        500 + (fatia.topo + fatia.base) / 2,
        (fatia.yTopo + fatia.yBase) / 2,
      ).matrixTransform(matriz);
      const bordaDaTorre = new DOMPoint(958, 0).matrixTransform(matriz).x - area.left;
      const fimX = alvo.left + alvo.width / 2 - area.left;
      const proxima = {
        largura: area.width, altura: area.height,
        x: origem.x - area.left, y: origem.y - area.top,
        fimX, fimY: alvo.top + alvo.height / 2 - area.top,
        // A curva só começa fora da silhueta de todas as camadas.
        curvaX: Math.min(fimX - 30, bordaDaTorre + 24), indice: ativo,
      };
      setConexao((anterior) => anterior && Object.keys(proxima).every(
        (chave) => anterior[chave as keyof Conexao] === proxima[chave as keyof Conexao],
      ) ? anterior : proxima);
    };
    const agendar = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(medir);
    };
    const observer = new ResizeObserver(agendar);
    observer.observe(experiencia);
    observer.observe(torre);
    observer.observe(destino);
    observer.observe(destino.parentElement!);
    window.addEventListener("resize", agendar);
    agendar();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", agendar);
    };
  }, [ativo]);

  const caminho = conexao ? `M ${conexao.x} ${conexao.y} H ${conexao.curvaX} C ${conexao.curvaX + 34} ${conexao.y}, ${conexao.fimX - 48} ${conexao.fimY}, ${conexao.fimX} ${conexao.fimY}` : "";

  return (
    <section id="pilares" className={styles.secao} aria-labelledby="pilares-titulo">
      <Conteiner>
        <div className={styles.introducao}>
          <div>
            <p className={styles.olho}><span /> {t.olho}</p>
            <h2 id="pilares-titulo">{t.titulo}</h2>
          </div>
          <p>{t.apoio}</p>
        </div>

        <div className={styles.navegacao} role="group" aria-label={t.ariaNav}>
          {pilares.map((item, indice) => (
            <button key={item.nome} type="button" aria-pressed={ativo === indice}
              aria-controls={`${id}-detalhe`} onClick={() => setAtivo(indice)}
              style={{ "--cor-pilar": item.cor } as CSSProperties}>
              <span className={styles.numeroNav}>{String(indice + 1).padStart(2, "0")}</span>
              <span>{item.nome}</span>
              <MoveUpRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className={styles.experiencia} ref={experienciaRef} style={tema}>
          <div className={styles.torre}>
            <svg ref={torreRef} viewBox="0 0 1000 1080" role="group" aria-label={t.ariaPiramide}>
              <defs>
                <pattern id={`${id}-agua`} patternUnits="userSpaceOnUse" width="1000" height="1080">
                  <image href="/imagens/inicio/piramide-agua.webp" x="0" y="700" width="1000" height="390" preserveAspectRatio="xMidYMid slice" />
                </pattern>
                <pattern id={`${id}-agricultura`} patternUnits="userSpaceOnUse" width="1000" height="1080">
                  <image href="/imagens/inicio/piramide-lavoura.webp" x="0" y="500" width="1000" height="360" preserveAspectRatio="xMidYMid slice" />
                </pattern>
                <pattern id={`${id}-animais`} patternUnits="userSpaceOnUse" width="1000" height="1080">
                  <rect x="0" y="330" width="1000" height="300" fill="#dcebed" />
                  <image href="/imagens/inicio/piramide-bovino.webp" x="190" y="330" width="220" height="300" preserveAspectRatio="xMidYMid slice" />
                  <image href="/imagens/inicio/piramide-ave.webp" x="390" y="330" width="220" height="300" preserveAspectRatio="xMidYMid slice" />
                  <image href="/imagens/inicio/piramide-suino.webp" x="590" y="330" width="220" height="300" preserveAspectRatio="xMidYMid slice" />
                </pattern>
                <pattern id={`${id}-ciencia`} patternUnits="userSpaceOnUse" width="1000" height="1080">
                  <image href="/imagens/inicio/piramide-ciencia.webp" x="300" y="170" width="400" height="240" preserveAspectRatio="xMidYMid slice" />
                </pattern>
                <filter id={`${id}-sombra`} x="-20%" y="-20%" width="140%" height="150%">
                  <feDropShadow dx="0" dy="14" stdDeviation="13" floodColor="#123d4b" floodOpacity=".14" />
                </filter>
              </defs>
              <g filter={`url(#${id}-sombra)`}>
                {fatias.map((fatia, indice) => {
                  const item = pilares[indice];
                  const preenchimento = [ `url(#${id}-agua)`, `url(#${id}-agricultura)`, `url(#${id}-animais)`, `url(#${id}-ciencia)`, "#00bfd0" ][indice];
                  return (
                    <g key={item.nome} role="button" tabIndex={0}
                      aria-label={`${indice + 1}. ${item.nome}: ${item.resumo}`}
                      aria-pressed={ativo === indice} aria-controls={`${id}-detalhe`}
                      className={styles.fatia} style={{ "--cor-fatia": item.cor } as CSSProperties}
                      onClick={() => setAtivo(indice)}
                      onKeyDown={(evento) => {
                        if (evento.key === "Enter" || evento.key === " ") {
                          evento.preventDefault();
                          setAtivo(indice);
                        }
                      }}>
                      <title>{`${indice + 1}. ${item.nome}`}</title>
                      {fatia.topo > 0 && <polygon className={styles.faceTopo}
                        points={`500,${fatia.yTras} ${500 + fatia.topo},${fatia.yTopo} 500,${fatia.yFrente} ${500 - fatia.topo},${fatia.yTopo}`}
                        fill={preenchimento} />}
                      <polygon className={styles.faceEsquerda}
                        points={fatia.topo === 0
                          ? `500,${fatia.yTras} 500,${fatia.yBaseFrente} ${500 - fatia.base},${fatia.yBase}`
                          : `${500 - fatia.topo},${fatia.yTopo} 500,${fatia.yFrente} 500,${fatia.yBaseFrente} ${500 - fatia.base},${fatia.yBase}`}
                        fill={preenchimento} />
                      <polygon className={styles.faceDireita}
                        points={fatia.topo === 0
                          ? `500,${fatia.yTras} ${500 + fatia.base},${fatia.yBase} 500,${fatia.yBaseFrente}`
                          : `500,${fatia.yFrente} ${500 + fatia.topo},${fatia.yTopo} ${500 + fatia.base},${fatia.yBase} 500,${fatia.yBaseFrente}`}
                        fill={preenchimento} />
                      <line className={styles.arestaCentral} x1="500" y1={fatia.topo === 0 ? fatia.yTras : fatia.yFrente} x2="500" y2={fatia.yBaseFrente} />
                    </g>
                  );
                })}
              </g>
            </svg>
            <p className={styles.instrucao}><span /> {t.instrucao}</p>
          </div>

          {conexao && conexao.indice === ativo && <svg className={styles.conexao}
            viewBox={`0 0 ${conexao.largura} ${conexao.altura}`} aria-hidden="true">
            <path className={styles.conexaoLinha} d={caminho} />
            <circle className={styles.origemHalo} cx={conexao.x} cy={conexao.y} r="8" />
            <circle className={styles.origem} cx={conexao.x} cy={conexao.y} r="4" />
          </svg>}

          <article id={`${id}-detalhe`} className={styles.detalhe} aria-labelledby={`${id}-nome`} aria-live="polite" aria-atomic="true">
            <span className={styles.destino} ref={destinoRef} aria-hidden="true" />
            <div className={styles.cardInterior} key={pilar.nome}>
              <div className={`${styles.foto} ${ativo === 2 ? styles.fotoAnimais : ""}`}>
                {ativo === 2 ? [
                  { src: "/imagens/inicio/animal-bovino.jpg", alt: t.animais[0] },
                  { src: "/imagens/inicio/animal-ave.jpg", alt: t.animais[1] },
                  { src: "/imagens/inicio/animal-suino.jpg", alt: t.animais[2] },
                ].map((animal) => <div key={animal.src}><Image src={animal.src} alt={animal.alt} fill sizes="(min-width: 901px) 150px, 30vw" /></div>) :
                  <Image src={pilar.foto} alt={pilar.alt} fill sizes="(min-width: 1280px) 500px, (min-width: 901px) 42vw, 90vw" className="object-cover" />}
                <div className={styles.fotoEtiqueta}><Icone size={15} strokeWidth={1.7} aria-hidden="true" /><span>{pilar.categoria}</span></div>
              </div>
              <div className={styles.detalheConteudo}>
                <div className={styles.detalheTopo}>
                  <p className={styles.rotulo}>{t.rotulo}</p>
                  <span className={styles.indice}><b>{String(ativo + 1).padStart(2, "0")}</b><span> / 05</span></span>
                </div>
                <h3 id={`${id}-nome`}>{pilar.nome}</h3>
                <p className={styles.resumo}>{pilar.resumo}</p>
                <p className={styles.descricao}>{pilar.descricao}</p>
                <div className={styles.rodapeCard}>
                  <span className={styles.destaque}>{pilar.destaque}</span>
                  <Link href={rota(idioma, "/sobre")} aria-label={`${t.conheca}: ${pilar.nome}`}><span>{t.conheca}</span><span className={styles.seta}><ArrowUpRight size={19} aria-hidden="true" /></span></Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Conteiner>
    </section>
  );
}
