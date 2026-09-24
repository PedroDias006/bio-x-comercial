"use client";


import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { ArrowDown, ArrowUpRight, Beef, Droplets, Leaf, Microscope, FlaskConical, Waves } from "lucide-react";
import { urlWhatsapp } from "@/dados/contato";
import styles from "./Hero.module.css";

const aplicacoes = [
  { nome: "Agricultura", icone: Leaf, titulo: "Vida no solo. Força no campo.", descricao: "Microorganismos benéficos integrados ao manejo da sua lavoura.", href: "/solucoes/agricultura-unica", imagem: "/imagens/hero/soja-lavoura.jpg", alt: "Lavoura de soja no campo" },
  { nome: "Saneamento", icone: Droplets, titulo: "O equilíbrio começa na água.", descricao: "Biotecnologia aplicada à recuperação de sistemas de tratamento.", href: "/solucoes/saneamento", imagem: "/imagens/vitrine/saneamento.jpg", alt: "Aplicação da BIO-X em saneamento" },
  { nome: "Produção animal", icone: Beef, titulo: "Cuidado que acompanha a produção.", descricao: "Conheça as linhas BIO-X para bovinos, suínos e aves.", href: "/solucoes", imagem: "/imagens/vitrine/gado-nova.png", alt: "Bovino representando as soluções para produção animal" },
];

export function Hero() {
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
        <p className={styles.selo}><span /> Ciência que conecta a vida</p>
        <h1 id="hero-titulo">Pequenos organismos.<br /><span>Novas possibilidades.</span></h1>
        <p className={styles.descricao}>A força da natureza encontra a biotecnologia.<br className={styles.quebra} /> Soluções para transformar o solo, a água e a produção animal.</p>
        <div className={styles.acoes}>
          <Link href="/solucoes" className={styles.primario}>Explore nossas soluções <ArrowUpRight size={19} /></Link>
          <a href={urlWhatsapp} target="_blank" rel="noreferrer noopener" className={styles.secundario}>Converse com a BIO-X <ArrowUpRight size={17} /></a>
        </div>
      </div>

      <div className={styles.paineis} aria-label="Biotecnologia BIO-X em ação">
        <article className={styles.protocolo}>
          <div className={styles.cabecalhoCard}><span>Da origem à aplicação</span><FlaskConical size={17} /></div>
          <div className={styles.etapa}><span className={styles.numero}>01</span><div><small>ORIGEM</small><strong>Microorganismos<br />benéficos</strong></div><Microscope size={24} /></div>
          <div className={styles.conector} aria-hidden="true"><span /><ArrowDown size={15} /><span /></div>
          <div className={styles.etapa}><span className={styles.numero}>02</span><div><small>APLICAÇÃO</small><strong>Integrados ao<br />seu manejo</strong></div><Leaf size={24} /></div>
          <div className={styles.cardNota}><span className={styles.ponto} />Ciência presente no dia a dia</div>
        </article>
        <article className={styles.micro}>
          <div className={styles.cabecalhoCard}><span>Universo BIO-X</span><span className={styles.sinal}>VIVO</span></div>
          <div className={styles.petri} aria-hidden="true">
            <div className={styles.petriAnel} /><div className={styles.petriAnel} />
            {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ left: `${18 + (i * 31) % 65}%`, top: `${18 + (i * 23) % 61}%`, animationDelay: `${i * -.7}s` }} />)}
            <span className={styles.mira}>+</span>
          </div>
          <div className={styles.microTexto}><small>ESCALA MICRO.</small><strong>Possibilidades<br />em grande escala.</strong></div>
        </article>
        <article className={styles.conexoes}>
          <div className={styles.cabecalhoCard}><span>Um mesmo princípio. Diferentes aplicações.</span><Waves size={18} /></div>
          <h2>Tudo está<br /><span>conectado.</span></h2>
          <div className={styles.ondas} aria-hidden="true">
            <svg viewBox="0 0 500 145" fill="none" preserveAspectRatio="none">
              <path className={ativa === 0 ? styles.ondaAtiva : undefined} d="M0 104 C55 104 54 18 116 32 S178 130 233 101 S329 13 379 46 S447 123 500 52" />
              <path className={ativa === 1 ? styles.ondaAtiva : undefined} d="M0 70 C53 117 87 98 145 73 S213 15 266 48 S337 134 389 97 S460 29 500 43" />
              <path className={ativa === 2 ? styles.ondaAtiva : undefined} d="M0 114 C66 102 82 67 147 90 S222 115 281 69 S359 18 413 52 S463 91 500 91" />
            </svg>
          </div>
          <div className={styles.ambientes} role="group" aria-label="Explore as aplicações da BIO-X">
            {aplicacoes.map(({ nome, icone: Categoria }, indice) => <button key={nome} type="button" aria-pressed={ativa === indice} aria-controls="hero-aplicacao" onClick={() => setAtiva(indice)}><Categoria size={16} /><span>{nome}</span></button>)}
          </div>
        </article>
        <article id="hero-aplicacao" className={styles.destino} aria-live="polite" aria-atomic="true">
          <div className={styles.cabecalhoCard}><span>Biotecnologia aplicada</span><ArrowUpRight size={17} /></div>
          <div className={styles.destinoCorpo} key={aplicacao.nome}>
            <span className={styles.destinoCategoria}>{aplicacao.nome}</span>
            <h3>{aplicacao.titulo}</h3><p>{aplicacao.descricao}</p>
            <Link href={aplicacao.href}>Explore essa solução <ArrowUpRight size={17} /></Link>
          </div>
          <div className={styles.barras} aria-hidden="true">{[28,45,37,65,52,82,68,96,78,100,84,110].map((altura,i)=><i key={i} style={{height: altura / 2, animationDelay: `${i * -.2}s`}} />)}</div>
        </article>
      </div>
      <a href="#linhas" className={styles.descobrir}>Conheça as soluções <ArrowDown size={15} /></a>
    </section>
  );
}
