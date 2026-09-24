"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, MousePointer2, Plus, Minus, RotateCcw } from "lucide-react";
import { Conteiner } from "@/componentes/ui/Conteiner";
import { totalDeClientes } from "@/dados/clientes";
import estados from "@/dados/mapa-brasil.json";
import { presencas, totalDeUFs } from "@/dados/presenca";
import styles from "./ProvaSocial.module.css";
const regioes = ["Todas", "Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

export function ProvaSocial() {
  const [regiao, setRegiao] = useState("Todas");
  const [selecionado, setSelecionado] = useState("");
  const [zoom, setZoom] = useState(1);
  const estado = estados.find((item) => item.id === selecionado);
  const registro = presencas[selecionado];
  const visiveis = estados.filter((item) => regiao === "Todas" || item.regiao === regiao);
  const totalVisivel = visiveis.filter((item) => presencas[item.id]).length;
  function escolherEstado(id: string) {
    setSelecionado(id);
    setZoom(1);
  }
  function escolherRegiao(valor: string) {
    setRegiao(valor);
    const lista = estados.filter((item) => valor === "Todas" || item.regiao === valor);
    if (!lista.some((item) => item.id === selecionado)) setSelecionado("");
    setZoom(1);
  }
  const cx = zoom > 1 && estado ? Math.min(440, Math.max(150, estado.x)) : 300;
  const cy = zoom > 1 && estado ? Math.min(440, Math.max(150, estado.y)) : 290;
  return (
    <section id="presenca" className="scroll-mt-28 bg-white py-20 lg:py-28" aria-labelledby="presenca-titulo">
      <Conteiner>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-[var(--biox-turquesa-escuro)]">Onde a BIO-X faz parte</p>
            <h2 id="presenca-titulo" className="mt-4 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">Tecnologia que chega ao campo.</h2>
            <p className="mt-5 text-base leading-7 text-[var(--texto-suave)]">Explore os estados, as regiões e as localidades onde a BIO-X está presente.</p>
          </div>
          <div className={styles.presencaNumero}><strong>{String(totalDeUFs).padStart(2, "0")}</strong><span>unidades da federação<br />com presença registrada</span></div>
        </div>
        <div className="mt-9 flex flex-wrap gap-2" aria-label="Filtrar por região">
          {regioes.map((item) => <button key={item} type="button" aria-pressed={regiao === item} onClick={() => escolherRegiao(item)} className={`min-h-11 rounded-full px-5 text-sm font-medium transition ${regiao === item ? "bg-[var(--biox-950)] text-white" : "bg-[var(--fundo)] text-[var(--texto-suave)] hover:bg-[var(--linha)]"}`}>{item}</button>)}
        </div>
        <div className={`mt-6 grid overflow-hidden rounded-[28px] border border-[var(--linha)] lg:grid-cols-[1.65fr_.75fr] ${styles.painel}`}>
          <div className={`relative p-4 sm:p-7 ${styles.areaMapa}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[var(--texto-suave)]">{regiao === "Todas" ? "Brasil" : regiao} · {totalVisivel} {totalVisivel === 1 ? "UF com presença" : "UFs com presença"}</span>
              <div className="flex gap-1">
                <button type="button" disabled={zoom === 1} onClick={() => setZoom(Math.max(1, zoom - .5))} aria-label="Diminuir mapa" className="mapa-controle"><Minus size={17} /></button>
                <button type="button" disabled={zoom === 2} onClick={() => setZoom(Math.min(2, zoom + .5))} aria-label="Ampliar estado selecionado" className="mapa-controle"><Plus size={17} /></button>
                <button type="button" onClick={() => setZoom(1)} aria-label="Restaurar mapa" className="mapa-controle"><RotateCcw size={16} /></button>
              </div>
            </div>
            <svg viewBox={`${cx - 300 / zoom} ${cy - 290 / zoom} ${600 / zoom} ${580 / zoom}`} className="mx-auto mt-2 aspect-[30/29] w-full max-w-[580px]" role="group" aria-label="Mapa interativo dos estados do Brasil">
              <defs>
                {Object.entries(presencas).map(([id, item]) => (
                  <pattern key={id} id={`foto-${id}`} width="1" height="1" patternContentUnits="objectBoundingBox">
                    <image href={item.imagem} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                    <rect width="1" height="1" fill={selecionado === id ? "rgba(3, 29, 39, .16)" : "rgba(3, 29, 39, .34)"} />
                  </pattern>
                ))}
              </defs>
              {estados.map((item) => {
                const ativo = item.id === selecionado;
                const fora = regiao !== "Todas" && item.regiao !== regiao;
                return <path key={item.id} d={item.d} role="button" tabIndex={fora ? -1 : 0} aria-label={`${item.nome}, ${item.regiao}${presencas[item.id] ? `, destaque: ${presencas[item.id].destaque}` : ', sem localidade registrada'}`} aria-pressed={ativo} aria-controls="presenca-detalhe" onClick={() => { escolherEstado(item.id); if (fora) setRegiao("Todas"); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); escolherEstado(item.id); if (fora) setRegiao("Todas"); } }} fill={presencas[item.id] ? `url(#foto-${item.id})` : "#dce6e8"} stroke={ativo ? "var(--biox-turquesa)" : "white"} strokeWidth={ativo ? 3 : 1} vectorEffect="non-scaling-stroke" opacity={fora ? .22 : 1} className={styles.estado}><title>{item.nome}</title></path>;
              })}
              {estados.filter((item) => presencas[item.id]).map((item) => <g key={item.id} pointerEvents="none" aria-hidden="true" opacity={regiao !== "Todas" && item.regiao !== regiao ? .25 : 1}>
                {item.id === "DF" && <><path d={`M ${item.x} ${item.y} l 21 -16 h 12`} fill="none" stroke="#073747" strokeWidth="1" vectorEffect="non-scaling-stroke" /><rect x={item.x + 29} y={item.y - 24} width="24" height="17" rx="4" fill="white" /></>}
                <text x={item.id === "DF" ? item.x + 41 : item.x} y={item.id === "DF" ? item.y - 12 : item.y} textAnchor="middle" fill={item.id === "DF" ? "#073747" : "white"} fontSize={item.id === "DF" ? "10" : "12"} fontWeight="700">{item.id}</text>
              </g>)}
            </svg>
            <div className="flex flex-wrap gap-4 text-xs text-[var(--texto-suave)]"><span className="flex items-center gap-2"><i className={`size-3 rounded-full ${styles.amostraFoto}`} />Estado com presença e vocação local</span><span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-[#dce6e8]" />Sem localidade informada</span></div>
            <a href="https://servicodados.ibge.gov.br/api/docs/malhas?versao=3" target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-[var(--texto-suave)] underline underline-offset-2">Base cartográfica: IBGE</a>
          </div>
          <div className={`p-6 sm:p-9 ${styles.lateral}`}>
            <label htmlFor="estado-biox" className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--texto-suave)]">Ir direto ao estado</label>
            <select id="estado-biox" value={selecionado} onChange={(e) => escolherEstado(e.target.value)} className="mt-3 w-full rounded-xl border border-[var(--linha)] bg-white p-3 text-base"><option value="">Selecione um estado</option>{visiveis.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}</select>
            <div id="presenca-detalhe" className="mt-7" aria-live="polite" aria-atomic="true">
              {!estado ? (
                <div className={styles.estadoVazio}><span><MousePointer2 size={22} aria-hidden="true" /></span><h3>Escolha um estado</h3><p>Clique no mapa para descobrir a presença da BIO-X e a força produtiva que marca cada lugar.</p></div>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--biox-turquesa-escuro)]">{estado.regiao}</p>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight">{estado.nome}</h3>
                  {registro ? <>
                    <div className={styles.destaqueLocal}><span>Vocação em destaque</span><strong>{registro.destaque}</strong></div>
                    <p className="mt-4 text-sm leading-6 text-[var(--texto-suave)]">{registro.resumo}</p>
                    {registro.regioes && <div className={styles.regioesRegistradas}><span>Região de atuação</span>{registro.regioes.map((reg) => <strong key={reg}>{reg}</strong>)}</div>}
                    <details key={`locais-${selecionado}`} className={styles.listaRecolhida}>
                      <summary>Ver {registro.locais.length} {registro.locais.length === 1 ? "localidade" : "localidades"}</summary>
                      <div className={styles.listaLocais} role="region" aria-label={`Localidades em ${estado.nome}`}><ul>{registro.locais.map((local) => <li key={local}><MapPin size={14} aria-hidden="true" />{local}</li>)}</ul></div>
                    </details>
                    {registro.culturas && <details key={`culturas-${selecionado}`} className={styles.aplicacoes}><summary>Ver aplicações registradas</summary><div className="mt-2 flex flex-wrap gap-2">{registro.culturas.map((cultura) => <span key={cultura} className="rounded-full bg-[var(--fundo)] px-3 py-1.5 text-xs text-[var(--texto-suave)]">{cultura}</span>)}</div></details>}
                    <Link href="/resultados" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--biox-turquesa-escuro)] hover:underline">Conhecer os resultados <ArrowUpRight size={17} /></Link>
                  </> : <><p className="mt-4 text-sm leading-6 text-[var(--texto-suave)]">Ainda não há localidades informadas para esta unidade da federação.</p><Link href="/solucoes" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--biox-turquesa-escuro)] hover:underline">Explorar as soluções <ArrowUpRight size={17} /></Link></>}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4"><p className="max-w-3xl text-xs leading-5 text-[var(--texto-suave)]">Localidades informadas pela BIO-X e registros de campo. A ausência de registro no mapa não indica indisponibilidade de atendimento.</p><Link href="/clientes" className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--biox-900)] hover:underline">{totalDeClientes} empresas na carteira <ArrowUpRight size={15} /></Link></div>
      </Conteiner>
    </section>
  );
}
