"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Bot, ChevronLeft, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { urlWhatsappEm } from "@/dados/contato";
import type { Idioma } from "@/i18n/config";
import { useIdioma } from "@/i18n/ProvedorIdioma";
import styles from "./SuporteBiox.module.css";

type Mensagem = { origem: "bot" | "visitante"; texto: string };

type Textos = {
  perguntas: { pergunta: string; resposta: string }[];
  saudacao: string;
  aria: string;
  titulo: string;
  online: string;
  fechar: string;
  frequentes: string;
  verMais: string;
  recomecar: string;
  recomecarCurto: string;
  pessoa: string;
  abrir: string;
  fecharGatilho: string;
  convite: string;
};

const textos: Record<Idioma, Textos> = {
  pt: {
    perguntas: [
      { pergunta: "O que é a BIO-X?", resposta: "A BIO-X desenvolve soluções biotecnológicas com microorganismos benéficos para agricultura, saneamento e produção animal, unindo conhecimento técnico e mais de 30 anos de experiência no agronegócio." },
      { pergunta: "As soluções são naturais?", resposta: "Sim. As soluções são apresentadas pela BIO-X como 100% naturais, biodegradáveis e sem resíduo químico, usando microorganismos que já existem na natureza." },
      { pergunta: "Como funciona na agricultura?", resposta: "Na agricultura, os microorganismos benéficos são integrados ao manejo para favorecer a ciclagem de nutrientes, a atividade microbiológica do solo e o desenvolvimento das plantas." },
      { pergunta: "Como atua no saneamento?", resposta: "No saneamento, a tecnologia biológica auxilia a decomposição da matéria orgânica, a redução de odores e a melhoria da qualidade do efluente em sistemas de tratamento." },
      { pergunta: "Há soluções para animais?", resposta: "Sim. A BIO-X possui linhas para bovinos, aves e suínos, desenvolvidas para integrar saúde, bem-estar e eficiência à rotina da produção animal." },
      { pergunta: "Precisa de equipamento novo?", resposta: "A proposta das soluções BIO-X é entrar na operação que já existe, com aplicação simples e sem exigir equipamento novo. A recomendação específica deve ser confirmada com a equipe técnica." },
      { pergunta: "Quais são os benefícios?", resposta: "Os benefícios variam conforme a aplicação e podem incluir solo mais vivo, plantas mais fortes, melhoria de efluentes, redução de odores e apoio à eficiência da produção animal." },
      { pergunta: "Onde a BIO-X atende?", resposta: "A BIO-X possui registros de aplicações em Minas Gerais e Tocantins, mas a ausência de um estado no mapa não significa indisponibilidade. Um atendente pode confirmar o atendimento na sua região." },
      { pergunta: "Como escolher a solução?", resposta: "A escolha depende do seu objetivo, da operação e do desafio observado. Para uma indicação segura, converse com a equipe BIO-X e informe sua atividade, localização e necessidade." },
    ],
    saudacao: "Olá! Eu sou o assistente BIO-X. Escolha uma dúvida abaixo ou fale diretamente com nossa equipe.",
    aria: "Atendimento BIO-X",
    titulo: "Assistente BIO-X",
    online: "Online para ajudar",
    fechar: "Fechar atendimento",
    frequentes: "Perguntas frequentes",
    verMais: "Ver mais dúvidas",
    recomecar: "Recomeçar conversa",
    recomecarCurto: "Recomeçar",
    pessoa: "Falar com uma pessoa",
    abrir: "Abrir atendimento BIO-X",
    fecharGatilho: "Fechar atendimento BIO-X",
    convite: "Tire suas dúvidas",
  },
  en: {
    perguntas: [
      { pergunta: "What is BIO-X?", resposta: "BIO-X develops biotechnology solutions with beneficial microorganisms for agriculture, sanitation and animal production, combining technical expertise with more than 30 years of experience in agribusiness." },
      { pergunta: "Are the solutions natural?", resposta: "Yes. BIO-X presents its solutions as 100% natural, biodegradable and free of chemical residue, using microorganisms that already exist in nature." },
      { pergunta: "How does it work in agriculture?", resposta: "In agriculture, the beneficial microorganisms are built into crop management to support nutrient cycling, soil microbial activity and plant development." },
      { pergunta: "How does it work in sanitation?", resposta: "In sanitation, the biological technology helps break down organic matter, reduce odors and improve effluent quality in treatment systems." },
      { pergunta: "Are there solutions for animals?", resposta: "Yes. BIO-X has lines for cattle, poultry and pigs, designed to bring health, well-being and efficiency into the daily routine of animal production." },
      { pergunta: "Is new equipment needed?", resposta: "BIO-X solutions are designed to fit into your existing operation, with simple application and no new equipment required. The specific recommendation should be confirmed with the technical team." },
      { pergunta: "What are the benefits?", resposta: "Benefits vary by application and may include healthier soil, stronger plants, better effluents, fewer odors and support for more efficient animal production." },
      { pergunta: "Where does BIO-X operate?", resposta: "BIO-X has recorded applications in the Brazilian states of Minas Gerais and Tocantins, but a state missing from the map doesn’t mean we’re unavailable there. Our team can confirm service in your region." },
      { pergunta: "How do I choose a solution?", resposta: "It depends on your goal, your operation and the challenge you’re facing. For a reliable recommendation, talk to the BIO-X team and tell us about your activity, location and needs." },
    ],
    saudacao: "Hi! I’m the BIO-X assistant. Pick a question below or talk directly to our team.",
    aria: "BIO-X support",
    titulo: "BIO-X Assistant",
    online: "Online to help",
    fechar: "Close support",
    frequentes: "Frequently asked questions",
    verMais: "More questions",
    recomecar: "Restart conversation",
    recomecarCurto: "Restart",
    pessoa: "Talk to a person",
    abrir: "Open BIO-X support",
    fecharGatilho: "Close BIO-X support",
    convite: "Ask us anything",
  },
  es: {
    perguntas: [
      { pergunta: "¿Qué es BIO-X?", resposta: "BIO-X desarrolla soluciones biotecnológicas con microorganismos benéficos para la agricultura, el saneamiento y la producción animal, uniendo conocimiento técnico y más de 30 años de experiencia en el agronegocio." },
      { pergunta: "¿Las soluciones son naturales?", resposta: "Sí. BIO-X presenta sus soluciones como 100% naturales, biodegradables y sin residuos químicos, usando microorganismos que ya existen en la naturaleza." },
      { pergunta: "¿Cómo funciona en la agricultura?", resposta: "En la agricultura, los microorganismos benéficos se integran al manejo para favorecer el ciclo de nutrientes, la actividad microbiológica del suelo y el desarrollo de las plantas." },
      { pergunta: "¿Cómo actúa en el saneamiento?", resposta: "En el saneamiento, la tecnología biológica ayuda a descomponer la materia orgánica, reducir los olores y mejorar la calidad del efluente en los sistemas de tratamiento." },
      { pergunta: "¿Hay soluciones para animales?", resposta: "Sí. BIO-X tiene líneas para bovinos, aves y cerdos, desarrolladas para integrar salud, bienestar y eficiencia en la rutina de la producción animal." },
      { pergunta: "¿Se necesita equipo nuevo?", resposta: "Las soluciones BIO-X están pensadas para integrarse a la operación que ya existe, con aplicación sencilla y sin exigir equipos nuevos. La recomendación específica debe confirmarse con el equipo técnico." },
      { pergunta: "¿Cuáles son los beneficios?", resposta: "Los beneficios varían según la aplicación y pueden incluir un suelo más vivo, plantas más fuertes, mejores efluentes, menos olores y apoyo a la eficiencia de la producción animal." },
      { pergunta: "¿Dónde atiende BIO-X?", resposta: "BIO-X tiene registros de aplicaciones en los estados brasileños de Minas Gerais y Tocantins, pero que un estado no aparezca en el mapa no significa que no atendamos allí. Nuestro equipo puede confirmar la atención en su región." },
      { pergunta: "¿Cómo elijo la solución?", resposta: "Depende de su objetivo, de la operación y del desafío observado. Para una recomendación segura, hable con el equipo de BIO-X e infórmenos su actividad, ubicación y necesidad." },
    ],
    saudacao: "¡Hola! Soy el asistente de BIO-X. Elija una pregunta abajo o hable directamente con nuestro equipo.",
    aria: "Atención BIO-X",
    titulo: "Asistente BIO-X",
    online: "En línea para ayudar",
    fechar: "Cerrar atención",
    frequentes: "Preguntas frecuentes",
    verMais: "Ver más preguntas",
    recomecar: "Reiniciar conversación",
    recomecarCurto: "Reiniciar",
    pessoa: "Hablar con una persona",
    abrir: "Abrir atención BIO-X",
    fecharGatilho: "Cerrar atención BIO-X",
    convite: "Resuelva sus dudas",
  },
};

export function SuporteBiox() {
  const idioma = useIdioma();
  const t = textos[idioma];
  const perguntas = t.perguntas;
  const saudacao: Mensagem = { origem: "bot", texto: t.saudacao };
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
    <aside className={styles.suporte} aria-label={t.aria}>
      {aberto && (
        <section className={styles.chat} role="dialog" aria-modal="false" aria-labelledby="chat-biox-titulo">
          <header className={styles.cabecalho}>
            <span className={styles.miniatura}><Image src="/imagens/hero/agente-biox.png" alt="" fill sizes="44px" /></span>
            <div><strong id="chat-biox-titulo">{t.titulo}</strong><span><i /> {t.online}</span></div>
            <button type="button" onClick={() => setAberto(false)} aria-label={t.fechar}><X size={19} /></button>
          </header>

          <div className={styles.conversa}>
            {mensagens.map((mensagem, indice) => (
              <div key={`${indice}-${mensagem.texto}`} className={mensagem.origem === "bot" ? styles.mensagemBot : styles.mensagemVisitante}>
                {mensagem.origem === "bot" && <Bot size={15} aria-hidden="true" />}
                <p>{mensagem.texto}</p>
              </div>
            ))}

            <div className={styles.opcoes} aria-label={t.frequentes}>
              {(mostrarTodas ? perguntas : perguntas.slice(0, 5)).map((item, indice) => (
                <button key={item.pergunta} type="button" onClick={() => responder(indice)}>{item.pergunta}</button>
              ))}
              {!mostrarTodas && <button type="button" className={styles.mais} onClick={() => setMostrarTodas(true)}>{t.verMais}</button>}
            </div>
            <div ref={fim} />
          </div>

          <footer className={styles.rodapeChat}>
            <button type="button" onClick={reiniciar} aria-label={t.recomecar} title={t.recomecarCurto}><RotateCcw size={17} /></button>
            <a href={urlWhatsappEm(idioma)} target="_blank" rel="noreferrer noopener"><MessageCircle size={17} /> {t.pessoa} <Send size={14} /></a>
          </footer>
        </section>
      )}

      <button
        type="button"
        className={styles.gatilho}
        aria-label={aberto ? t.fecharGatilho : t.abrir}
        aria-expanded={aberto}
        onClick={() => setAberto((valor) => !valor)}
      >
        <span className={styles.status} aria-hidden="true" />
        <Image src="/imagens/hero/agente-biox.png" alt="" fill sizes="82px" />
        {aberto && <span className={styles.fechar}><ChevronLeft size={17} /></span>}
      </button>
      {!aberto && <span className={styles.convite}>{t.convite}</span>}
    </aside>
  );
}
