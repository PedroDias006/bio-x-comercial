"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Bot, ChevronLeft, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { urlWhatsapp } from "@/dados/contato";
import styles from "./SuporteBiox.module.css";

type Mensagem = { origem: "bot" | "visitante"; texto: string };

const perguntas = [
  {
    pergunta: "O que é a BIO-X?",
    resposta: "A BIO-X desenvolve soluções biotecnológicas com microorganismos benéficos para agricultura, saneamento e produção animal, unindo conhecimento técnico e mais de 30 anos de experiência no agronegócio.",
  },
  {
    pergunta: "As soluções são naturais?",
    resposta: "Sim. As soluções são apresentadas pela BIO-X como 100% naturais, biodegradáveis e sem resíduo químico, usando microorganismos que já existem na natureza.",
  },
  {
    pergunta: "Como funciona na agricultura?",
    resposta: "Na agricultura, os microorganismos benéficos são integrados ao manejo para favorecer a ciclagem de nutrientes, a atividade microbiológica do solo e o desenvolvimento das plantas.",
  },
  {
    pergunta: "Como atua no saneamento?",
    resposta: "No saneamento, a tecnologia biológica auxilia a decomposição da matéria orgânica, a redução de odores e a melhoria da qualidade do efluente em sistemas de tratamento.",
  },
  {
    pergunta: "Há soluções para animais?",
    resposta: "Sim. A BIO-X possui linhas para bovinos, aves e suínos, desenvolvidas para integrar saúde, bem-estar e eficiência à rotina da produção animal.",
  },
  {
    pergunta: "Precisa de equipamento novo?",
    resposta: "A proposta das soluções BIO-X é entrar na operação que já existe, com aplicação simples e sem exigir equipamento novo. A recomendação específica deve ser confirmada com a equipe técnica.",
  },
  {
    pergunta: "Quais são os benefícios?",
    resposta: "Os benefícios variam conforme a aplicação e podem incluir solo mais vivo, plantas mais fortes, melhoria de efluentes, redução de odores e apoio à eficiência da produção animal.",
  },
  {
    pergunta: "Onde a BIO-X atende?",
    resposta: "A BIO-X possui registros de aplicações em Minas Gerais e Tocantins, mas a ausência de um estado no mapa não significa indisponibilidade. Um atendente pode confirmar o atendimento na sua região.",
  },
  {
    pergunta: "Como escolher a solução?",
    resposta: "A escolha depende do seu objetivo, da operação e do desafio observado. Para uma indicação segura, converse com a equipe BIO-X e informe sua atividade, localização e necessidade.",
  },
];

const saudacao: Mensagem = {
  origem: "bot",
  texto: "Olá! Eu sou o assistente BIO-X. Escolha uma dúvida abaixo ou fale diretamente com nossa equipe.",
};

export function SuporteBiox() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([saudacao]);
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const fim = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aberto) fim.current?.scrollIntoView({ behavior: "smooth" });
  }, [aberto, mensagens]);

  function responder(indice: number) {
    const item = perguntas[indice];
    setMensagens((atuais) => [...atuais, { origem: "visitante", texto: item.pergunta }, { origem: "bot", texto: item.resposta }]);
  }

  function reiniciar() {
    setMensagens([saudacao]);
    setMostrarTodas(false);
  }

  return (
    <aside className={styles.suporte} aria-label="Atendimento BIO-X">
      {aberto && (
        <section className={styles.chat} role="dialog" aria-modal="false" aria-labelledby="chat-biox-titulo">
          <header className={styles.cabecalho}>
            <span className={styles.miniatura}><Image src="/imagens/hero/agente-biox.png" alt="" fill sizes="44px" /></span>
            <div><strong id="chat-biox-titulo">Assistente BIO-X</strong><span><i /> Online para ajudar</span></div>
            <button type="button" onClick={() => setAberto(false)} aria-label="Fechar atendimento"><X size={19} /></button>
          </header>

          <div className={styles.conversa}>
            {mensagens.map((mensagem, indice) => (
              <div key={`${indice}-${mensagem.texto}`} className={mensagem.origem === "bot" ? styles.mensagemBot : styles.mensagemVisitante}>
                {mensagem.origem === "bot" && <Bot size={15} aria-hidden="true" />}
                <p>{mensagem.texto}</p>
              </div>
            ))}

            <div className={styles.opcoes} aria-label="Perguntas frequentes">
              {(mostrarTodas ? perguntas : perguntas.slice(0, 5)).map((item, indice) => (
                <button key={item.pergunta} type="button" onClick={() => responder(indice)}>{item.pergunta}</button>
              ))}
              {!mostrarTodas && <button type="button" className={styles.mais} onClick={() => setMostrarTodas(true)}>Ver mais dúvidas</button>}
            </div>
            <div ref={fim} />
          </div>

          <footer className={styles.rodapeChat}>
            <button type="button" onClick={reiniciar} aria-label="Recomeçar conversa" title="Recomeçar"><RotateCcw size={17} /></button>
            <a href={urlWhatsapp} target="_blank" rel="noreferrer noopener"><MessageCircle size={17} /> Falar com uma pessoa <Send size={14} /></a>
          </footer>
        </section>
      )}

      <button
        type="button"
        className={styles.gatilho}
        aria-label={aberto ? "Fechar atendimento BIO-X" : "Abrir atendimento BIO-X"}
        aria-expanded={aberto}
        onClick={() => setAberto((valor) => !valor)}
      >
        <span className={styles.status} aria-hidden="true" />
        <Image src="/imagens/hero/agente-biox.png" alt="" fill sizes="82px" priority />
        {aberto && <span className={styles.fechar}><ChevronLeft size={17} /></span>}
      </button>
      {!aberto && <span className={styles.convite}>Tire suas dúvidas</span>}
    </aside>
  );
}
