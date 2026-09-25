"use client";


import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { ArrowDown, ArrowUpRight, Beef, Droplets, Leaf, Microscope, FlaskConical, Waves } from "lucide-react";
import { urlWhatsappEm } from "@/dados/contato";
import { rota, type Idioma } from "@/i18n/config";
import { useIdioma } from "@/i18n/ProvedorIdioma";
import styles from "./Hero.module.css";

const baseDasAplicacoes = [
  { icone: Leaf, href: "/solucoes/agricultura-unica", imagem: "/imagens/hero/soja-lavoura.jpg" },
  { icone: Droplets, href: "/solucoes/saneamento", imagem: "/imagens/vitrine/saneamento.jpg" },
  { icone: Beef, href: "/solucoes", imagem: "/imagens/vitrine/gado-nova.png" },
];

const textos = {
  pt: {
    aplicacoes: [
      { nome: "Agricultura", titulo: "Vida no solo. Força no campo.", descricao: "Microorganismos benéficos integrados ao manejo da sua lavoura.", alt: "Lavoura de soja no campo" },
      { nome: "Saneamento", titulo: "O equilíbrio começa na água.", descricao: "Biotecnologia aplicada à recuperação de sistemas de tratamento.", alt: "Aplicação da BIO-X em saneamento" },
      { nome: "Produção animal", titulo: "Cuidado que acompanha a produção.", descricao: "Conheça as linhas BIO-X para bovinos, suínos e aves.", alt: "Bovino representando as soluções para produção animal" },
    ],
    selo: "Ciência que conecta a vida",
    titulo1: "Pequenos organismos.", titulo2: "Novas possibilidades.",
    desc1: "A força da natureza encontra a biotecnologia.", desc2: "Soluções para transformar o solo, a água e a produção animal.",
    explorar: "Explore nossas soluções", conversar: "Converse com a BIO-X",
    paineis: "Biotecnologia BIO-X em ação",
    origemAplicacao: "Da origem à aplicação",
    origem: "ORIGEM", micro1: "Microorganismos", micro2: "benéficos",
    aplicacao: "APLICAÇÃO", integ1: "Integrados ao", integ2: "seu manejo",
    nota: "Ciência presente no dia a dia",
    universo: "Universo BIO-X", vivo: "VIVO",
    escala: "ESCALA MICRO.", poss1: "Possibilidades", poss2: "em grande escala.",
    principio: "Um mesmo princípio. Diferentes aplicações.",
    tudo1: "Tudo está", tudo2: "conectado.",
    ariaAplicacoes: "Explore as aplicações da BIO-X",
    aplicada: "Biotecnologia aplicada",
    explorarEssa: "Explore essa solução",
    conheca: "Conheça as soluções",
  },
  en: {
    aplicacoes: [
      { nome: "Agriculture", titulo: "Life in the soil. Strength in the field.", descricao: "Beneficial microorganisms built into your crop management.", alt: "Soybean field" },
      { nome: "Sanitation", titulo: "Balance starts in the water.", descricao: "Biotechnology applied to restoring treatment systems.", alt: "BIO-X applied in sanitation" },
      { nome: "Animal production", titulo: "Care that grows with production.", descricao: "Discover the BIO-X lines for cattle, pigs and poultry.", alt: "Cattle representing the animal production solutions" },
    ],
    selo: "Science that connects life",
    titulo1: "Tiny organisms.", titulo2: "New possibilities.",
    desc1: "The power of nature meets biotechnology.", desc2: "Solutions that transform soil, water and animal production.",
    explorar: "Explore our solutions", conversar: "Talk to BIO-X",
    paineis: "BIO-X biotechnology in action",
    origemAplicacao: "From origin to application",
    origem: "ORIGIN", micro1: "Beneficial", micro2: "microorganisms",
    aplicacao: "APPLICATION", integ1: "Built into", integ2: "your management",
    nota: "Science in everyday work",
    universo: "BIO-X universe", vivo: "LIVE",
    escala: "MICRO SCALE.", poss1: "Possibilities", poss2: "on a large scale.",
    principio: "One principle. Many applications.",
    tudo1: "Everything is", tudo2: "connected.",
    ariaAplicacoes: "Explore BIO-X applications",
    aplicada: "Applied biotechnology",
    explorarEssa: "Explore this solution",
    conheca: "Discover the solutions",
  },
  es: {
    aplicacoes: [
      { nome: "Agricultura", titulo: "Vida en el suelo. Fuerza en el campo.", descricao: "Microorganismos benéficos integrados al manejo de su cultivo.", alt: "Cultivo de soja en el campo" },
      { nome: "Saneamiento", titulo: "El equilibrio empieza en el agua.", descricao: "Biotecnología aplicada a la recuperación de sistemas de tratamiento.", alt: "Aplicación de BIO-X en saneamiento" },
      { nome: "Producción animal", titulo: "Cuidado que acompaña la producción.", descricao: "Conozca las líneas BIO-X para bovinos, cerdos y aves.", alt: "Bovino que representa las soluciones para producción animal" },
    ],
    selo: "Ciencia que conecta la vida",
    titulo1: "Pequeños organismos.", titulo2: "Nuevas posibilidades.",
    desc1: "La fuerza de la naturaleza se une a la biotecnología.", desc2: "Soluciones para transformar el suelo, el agua y la producción animal.",
    explorar: "Explore nuestras soluciones", conversar: "Hable con BIO-X",
    paineis: "Biotecnología BIO-X en acción",
    origemAplicacao: "Del origen a la aplicación",
    origem: "ORIGEN", micro1: "Microorganismos", micro2: "benéficos",
    aplicacao: "APLICACIÓN", integ1: "Integrados a", integ2: "su manejo",
    nota: "Ciencia presente en el día a día",
    universo: "Universo BIO-X", vivo: "VIVO",
    escala: "ESCALA MICRO.", poss1: "Posibilidades", poss2: "a gran escala.",
    principio: "Un mismo principio. Diferentes aplicaciones.",
    tudo1: "Todo está", tudo2: "conectado.",
    ariaAplicacoes: "Explore las aplicaciones de BIO-X",
    aplicada: "Biotecnología aplicada",
    explorarEssa: "Explore esta solución",
    conheca: "Conozca las soluciones",
  },
} satisfies Record<Idioma, unknown>;

export function Hero() {
  const idioma = useIdioma();
  const t = textos[idioma];
  const aplicacoes = baseDasAplicacoes.map((base, i) => ({ ...base, ...t.aplicacoes[i] }));
  const [ativa, setAtiva] = useState(0);
  const secao = useRef<HTMLElement>(null);
  const aplicacao = aplicacoes[ativa];


  function mover(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${((event.clientX - bounds.left) / bounds.width - .5) * 18}px`);
    event.currentTarget.style.setProperty("--my", `${((event.clientY - bounds.top) / bounds.height - .5) * 14}px`);
  }
  function repousar() {
    secao.current?.style.setProperty("--mx", "0px");
    secao.current?.style.setProperty("--my", "0px");
  }

  return (
    <section ref={secao} className={styles.hero} onPointerMove={mover} onPointerLeave={repousar} aria-labelledby="hero-titulo">
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.trilhas} aria-hidden="true">
        {[false, true].map((direita) => (
          <svg key={String(direita)} className={direita ? styles.trilhaDireita : styles.trilhaEsquerda} viewBox="0 0 320 260" fill="none">
            {[0, 1, 2, 3, 4, 5].map((i) => <g key={i}>
              <path d={`M-20 ${25 + i * 40} H${100 + i * 12} l24 ${i < 3 ? 20 : -20} H310`} />
              <path className={styles.pulso} style={{ animationDelay: `${i * -.8}s` }} d={`M-20 ${25 + i * 40} H${100 + i * 12} l24 ${i < 3 ? 20 : -20} H310`} />
            </g>)}
          </svg>
        ))}
      </div>

      <div className={styles.conteudo}>
        <p className={styles.selo}><span /> {t.selo}</p>
        <h1 id="hero-titulo">{t.titulo1}<br /><span>{t.titulo2}</span></h1>
        <p className={styles.descricao}>{t.desc1}<br className={styles.quebra} /> {t.desc2}</p>
        <div className={styles.acoes}>
          <Link href={rota(idioma, "/solucoes")} className={styles.primario}>{t.explorar} <ArrowUpRight size={19} /></Link>
          <a href={urlWhatsappEm(idioma)} target="_blank" rel="noreferrer noopener" className={styles.secundario}>{t.conversar} <ArrowUpRight size={17} /></a>
        </div>
      </div>

      <div className={styles.paineis} aria-label={t.paineis}>
        <article className={styles.protocolo}>
          <div className={styles.cabecalhoCard}><span>{t.origemAplicacao}</span><FlaskConical size={17} /></div>
          <div className={styles.etapa}><span className={styles.numero}>01</span><div><small>{t.origem}</small><strong>{t.micro1}<br />{t.micro2}</strong></div><Microscope size={24} /></div>
          <div className={styles.conector} aria-hidden="true"><span /><ArrowDown size={15} /><span /></div>
          <div className={styles.etapa}><span className={styles.numero}>02</span><div><small>{t.aplicacao}</small><strong>{t.integ1}<br />{t.integ2}</strong></div><Leaf size={24} /></div>
          <div className={styles.cardNota}><span className={styles.ponto} />{t.nota}</div>
        </article>
        <article className={styles.micro}>
          <div className={styles.cabecalhoCard}><span>{t.universo}</span><span className={styles.sinal}>{t.vivo}</span></div>
          <div className={styles.petri} aria-hidden="true">
            <div className={styles.petriAnel} /><div className={styles.petriAnel} />
            {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ left: `${18 + (i * 31) % 65}%`, top: `${18 + (i * 23) % 61}%`, animationDelay: `${i * -.7}s` }} />)}
            <span className={styles.mira}>+</span>
          </div>
          <div className={styles.microTexto}><small>{t.escala}</small><strong>{t.poss1}<br />{t.poss2}</strong></div>
        </article>
        <article className={styles.conexoes}>
          <div className={styles.cabecalhoCard}><span>{t.principio}</span><Waves size={18} /></div>
          <h2>{t.tudo1}<br /><span>{t.tudo2}</span></h2>
          <div className={styles.ondas} aria-hidden="true">
            <svg viewBox="0 0 500 145" fill="none" preserveAspectRatio="none">
              <path className={ativa === 0 ? styles.ondaAtiva : undefined} d="M0 104 C55 104 54 18 116 32 S178 130 233 101 S329 13 379 46 S447 123 500 52" />
              <path className={ativa === 1 ? styles.ondaAtiva : undefined} d="M0 70 C53 117 87 98 145 73 S213 15 266 48 S337 134 389 97 S460 29 500 43" />
              <path className={ativa === 2 ? styles.ondaAtiva : undefined} d="M0 114 C66 102 82 67 147 90 S222 115 281 69 S359 18 413 52 S463 91 500 91" />
            </svg>
          </div>
          <div className={styles.ambientes} role="group" aria-label={t.ariaAplicacoes}>
            {aplicacoes.map(({ nome, icone: Categoria }, indice) => <button key={nome} type="button" aria-pressed={ativa === indice} aria-controls="hero-aplicacao" onClick={() => setAtiva(indice)}><Categoria size={16} /><span>{nome}</span></button>)}
          </div>
        </article>
        <article id="hero-aplicacao" className={styles.destino} aria-live="polite" aria-atomic="true">
          <div className={styles.cabecalhoCard}><span>{t.aplicada}</span><ArrowUpRight size={17} /></div>
          <div className={styles.destinoCorpo} key={aplicacao.nome}>
            <span className={styles.destinoCategoria}>{aplicacao.nome}</span>
            <h3>{aplicacao.titulo}</h3><p>{aplicacao.descricao}</p>
            <Link href={rota(idioma, aplicacao.href)}>{t.explorarEssa} <ArrowUpRight size={17} /></Link>
          </div>
          <div className={styles.barras} aria-hidden="true">{[28,45,37,65,52,82,68,96,78,100,84,110].map((altura,i)=><i key={i} style={{height: altura / 2, animationDelay: `${i * -.2}s`}} />)}</div>
        </article>
      </div>
      <a href="#linhas" className={styles.descobrir}>{t.conheca} <ArrowDown size={15} /></a>
    </section>
  );
}
