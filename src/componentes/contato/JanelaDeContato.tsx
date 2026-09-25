"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight, Check, Loader2, Mail, MessageCircle, Send, X } from "lucide-react";
import { urlWhatsappComTexto } from "@/dados/contato";
import { useIdioma } from "@/i18n/ProvedorIdioma";
import { textosContato } from "./textos";

/**
 * Janela de contato da BIO-X.
 *
 * Todo link de WhatsApp do site (https://wa.me/...) abre esta janela em vez
 * de sair direto para o WhatsApp — assim nenhum botão "Falar com a BIO-X"
 * fica de fora, inclusive os que forem criados depois. Para um link ir
 * direto ao WhatsApp, marque-o com `data-contato-direto`.
 *
 * "Enviar" manda os dados para /api/contato (e-mail). "Falar pelo WhatsApp"
 * abre a conversa com tudo o que a pessoa já preencheu escrito na mensagem.
 */

type Papel = "dono" | "representante" | "";
type Estado = "formulario" | "enviando" | "sucesso" | "email-aberto";
type Campos = { nome: string; email: string; papel: Papel; empresa: string; mensagem: string; site: string };

const ContextoContato = createContext<{ abrir: () => void }>({ abrir: () => {} });

/** Abre a janela de contato a partir de qualquer componente de cliente. */
export function useContato() {
  return useContext(ContextoContato);
}

const vazio: Campos = { nome: "", email: "", papel: "", empresa: "", mensagem: "", site: "" };
const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function ProvedorContato({ children }: { children: ReactNode }) {
  const [aberta, setAberta] = useState(false);
  const abrir = useCallback(() => setAberta(true), []);

  // Intercepta qualquer clique em link de WhatsApp do site.
  useEffect(() => {
    function aoClicar(evento: MouseEvent) {
      if (evento.defaultPrevented || evento.button !== 0 || evento.metaKey || evento.ctrlKey) return;
      const link = (evento.target as Element | null)?.closest?.("a[href^='https://wa.me/']");
      if (!link || link.hasAttribute("data-contato-direto")) return;
      evento.preventDefault();
      setAberta(true);
    }
    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, []);

  return (
    <ContextoContato.Provider value={{ abrir }}>
      {children}
      {aberta && <Janela aoFechar={() => setAberta(false)} />}
    </ContextoContato.Provider>
  );
}

function Janela({ aoFechar }: { aoFechar: () => void }) {
  const idioma = useIdioma();
  const t = textosContato[idioma];
  const caminho = usePathname();
  const id = useId();
  const [campos, setCampos] = useState<Campos>(vazio);
  const [erros, setErros] = useState<Partial<Record<keyof Campos, string>>>({});
  const [estado, setEstado] = useState<Estado>("formulario");
  const [falhou, setFalhou] = useState(false);
  const primeiroCampo = useRef<HTMLInputElement>(null);

  // Trava a rolagem do fundo, foca o primeiro campo e fecha com Esc.
  useEffect(() => {
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primeiroCampo.current?.focus();
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && aoFechar();
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aoFechar]);

  const mudar = (campo: keyof Campos, valor: string) => {
    setCampos((c) => ({ ...c, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: undefined }));
  };

  const rotuloPapel = campos.papel === "dono" ? t.dono : campos.papel === "representante" ? t.representante : "";

  /** Mensagem pronta com o que já foi preenchido (vai para WhatsApp ou e-mail). */
  function montarMensagem() {
    const linhas = [t.msgOla];
    if (campos.nome.trim()) linhas.push(`${t.msgNome}: ${campos.nome.trim()}`);
    if (campos.email.trim()) linhas.push(`${t.msgEmail}: ${campos.email.trim()}`);
    if (campos.empresa.trim()) linhas.push(`${t.msgEmpresa}: ${campos.empresa.trim()}`);
    if (rotuloPapel) linhas.push(`${t.msgPapel}: ${rotuloPapel.toLowerCase()}`);
    if (campos.mensagem.trim()) linhas.push("", `${t.msgMensagem}: ${campos.mensagem.trim()}`);
    return linhas.join("\n");
  }

  function validar() {
    const novos: typeof erros = {};
    if (!campos.nome.trim()) novos.nome = t.obrigatorio;
    if (!campos.email.trim()) novos.email = t.obrigatorio;
    else if (!emailValido(campos.email)) novos.email = t.emailInvalido;
    if (!campos.papel) novos.papel = t.escolhaPapel;
    if (!campos.empresa.trim()) novos.empresa = t.obrigatorio;
    setErros(novos);
    return Object.keys(novos).length === 0;
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    setFalhou(false);
    if (!validar()) return;
    setEstado("enviando");
    try {
      const resposta = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...campos, papel: rotuloPapel, idioma, origem: caminho }),
      });
      if (resposta.ok) return setEstado("sucesso");
      if (resposta.status === 503) {
        // E-mail ainda não configurado no servidor: abre o e-mail do visitante já preenchido.
        const corpo = encodeURIComponent(montarMensagem());
        window.location.href = `mailto:biox@bioxmicroorganismos.com.br?subject=${encodeURIComponent(t.assunto)}&body=${corpo}`;
        return setEstado("email-aberto");
      }
      throw new Error(String(resposta.status));
    } catch {
      setFalhou(true);
      setEstado("formulario");
    }
  }

  const linkWhatsapp = urlWhatsappComTexto(montarMensagem());

  const campoBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#06232b] outline-none transition placeholder:text-[#9db0b6] focus:border-[#00a9b3] focus:ring-4 focus:ring-[#00c8d2]/15";

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <button type="button" aria-label={t.fechar} onClick={aoFechar} className="absolute inset-0 bg-[#041e2b]/55 backdrop-blur-sm" />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-titulo`}
        className="relative flex max-h-[94svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_40px_120px_-30px_rgba(4,30,43,0.6)] sm:rounded-[28px] md:flex-row"
      >
        {/* Faixa lateral com foto e marca (some no celular) */}
        <aside className="relative hidden w-[34%] shrink-0 overflow-hidden md:block">
          <Image src="/imagens/contato/contato.jpg" alt="" fill sizes="260px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041e2b]/90 via-[#041e2b]/40 to-[#041e2b]/10" />
          <div className="absolute inset-x-6 bottom-6 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6ce8eb]">{t.olho}</p>
            <p className="mt-2 text-lg font-semibold leading-snug">{t.apoio}</p>
          </div>
        </aside>

        <div className="flex min-h-0 flex-1 flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-[#e6eef0] px-6 pb-4 pt-6 sm:px-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087a85] md:hidden">{t.olho}</p>
              <h2 id={`${id}-titulo`} className="text-2xl font-bold tracking-[-0.03em] text-[#06232b]">
                {estado === "sucesso" ? t.sucessoTitulo : estado === "email-aberto" ? t.emailAbertoTitulo : t.titulo}
              </h2>
            </div>
            <button
              type="button"
              onClick={aoFechar}
              aria-label={t.fechar}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-[#dbe5e6] text-[#06232b] transition hover:bg-[#f4f7f7]"
            >
              <X size={18} />
            </button>
          </header>

          {estado === "sucesso" || estado === "email-aberto" ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 py-12 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-[#e3f8f9] text-[#00a9b3]">
                {estado === "sucesso" ? <Check size={30} strokeWidth={2.5} /> : <Mail size={28} />}
              </span>
              <p className="max-w-sm text-base leading-relaxed text-[#4a6670]">
                {estado === "sucesso"
                  ? t.sucessoTexto.replace("{nome}", campos.nome.trim().split(" ")[0]).replace("{email}", campos.email.trim())
                  : t.emailAbertoTexto}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {estado === "email-aberto" && (
                  <a
                    href={linkWhatsapp}
                    data-contato-direto
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-bold text-[#073b1d] transition hover:brightness-95"
                  >
                    <MessageCircle size={17} /> {t.whatsapp}
                  </a>
                )}
                <button type="button" onClick={aoFechar} className="rounded-full bg-[#06232b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#00a9b3]">
                  {t.ok}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={enviar} noValidate className="flex min-h-0 flex-1 flex-col">
              <div className="grid flex-1 gap-4 overflow-y-auto px-6 py-6 sm:grid-cols-2 sm:px-8">
                {/* Campo-isca contra robôs: invisível para pessoas */}
                <input
                  type="text"
                  name="site"
                  tabIndex={-1}
                  autoComplete="off"
                  value={campos.site}
                  onChange={(e) => mudar("site", e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                <Campo id={`${id}-nome`} rotulo={t.nome} erro={erros.nome}>
                  <input
                    ref={primeiroCampo}
                    id={`${id}-nome`}
                    autoComplete="name"
                    value={campos.nome}
                    onChange={(e) => mudar("nome", e.target.value)}
                    placeholder={t.nomeDica}
                    aria-invalid={!!erros.nome}
                    className={`${campoBase} ${erros.nome ? "border-[#e0645c]" : "border-[#d7e2e6]"}`}
                  />
                </Campo>

                <Campo id={`${id}-email`} rotulo={t.email} erro={erros.email}>
                  <input
                    id={`${id}-email`}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={campos.email}
                    onChange={(e) => mudar("email", e.target.value)}
                    placeholder={t.emailDica}
                    aria-invalid={!!erros.email}
                    className={`${campoBase} ${erros.email ? "border-[#e0645c]" : "border-[#d7e2e6]"}`}
                  />
                </Campo>

                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 text-sm font-semibold text-[#06232b]">{t.papel}</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {(["dono", "representante"] as const).map((opcao) => {
                      const ativo = campos.papel === opcao;
                      return (
                        <label
                          key={opcao}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-[15px] font-medium transition ${
                            ativo
                              ? "border-[#00a9b3] bg-[#e9f9fa] text-[#06232b] ring-4 ring-[#00c8d2]/15"
                              : erros.papel
                                ? "border-[#e0645c] text-[#4a6670]"
                                : "border-[#d7e2e6] text-[#4a6670] hover:border-[#9fd3d8]"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`${id}-papel`}
                            value={opcao}
                            checked={ativo}
                            onChange={() => mudar("papel", opcao)}
                            className="size-4 accent-[#00a9b3]"
                          />
                          {opcao === "dono" ? t.dono : t.representante}
                        </label>
                      );
                    })}
                  </div>
                  {erros.papel && <p className="mt-1.5 text-xs font-medium text-[#c2413a]">{erros.papel}</p>}
                </fieldset>

                <Campo id={`${id}-empresa`} rotulo={t.empresa} erro={erros.empresa} largo>
                  <input
                    id={`${id}-empresa`}
                    autoComplete="organization"
                    value={campos.empresa}
                    onChange={(e) => mudar("empresa", e.target.value)}
                    placeholder={t.empresaDica}
                    aria-invalid={!!erros.empresa}
                    className={`${campoBase} ${erros.empresa ? "border-[#e0645c]" : "border-[#d7e2e6]"}`}
                  />
                </Campo>

                <Campo id={`${id}-mensagem`} rotulo={t.mensagem} extra={t.opcional} largo>
                  <textarea
                    id={`${id}-mensagem`}
                    rows={3}
                    value={campos.mensagem}
                    onChange={(e) => mudar("mensagem", e.target.value)}
                    placeholder={t.mensagemDica}
                    className={`${campoBase} resize-none border-[#d7e2e6]`}
                  />
                </Campo>

                {falhou && (
                  <p role="alert" className="rounded-xl bg-[#fdecea] px-4 py-3 text-sm font-medium text-[#a33a33] sm:col-span-2">
                    {t.erro}
                  </p>
                )}
              </div>

              <footer className="border-t border-[#e6eef0] bg-[#fafcfc] px-6 py-4 sm:px-8">
                <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center">
                  <a
                    href={linkWhatsapp}
                    data-contato-direto
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25d366]/60 bg-[#effcf3] px-5 py-3.5 text-sm font-bold text-[#0f6b34] transition hover:bg-[#25d366] hover:text-[#073b1d]"
                  >
                    <MessageCircle size={18} />
                    {t.whatsapp}
                    <ArrowUpRight size={15} className="opacity-60" />
                  </a>
                  <span className="hidden text-xs font-semibold uppercase tracking-widest text-[#9db0b6] sm:block">{t.ou}</span>
                  <button
                    type="submit"
                    disabled={estado === "enviando"}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#06232b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#00a9b3] disabled:opacity-70"
                  >
                    {estado === "enviando" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> {t.enviando}
                      </>
                    ) : (
                      <>
                        <Send size={17} /> {t.enviar}
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-3 text-center text-[11px] text-[#8aa0a6] sm:text-left">{t.privacidade}</p>
              </footer>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Campo({
  id,
  rotulo,
  extra,
  erro,
  largo = false,
  children,
}: {
  id: string;
  rotulo: string;
  extra?: string;
  erro?: string;
  largo?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={largo ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-2 text-sm font-semibold text-[#06232b]">
        {rotulo}
        {extra && <span className="text-xs font-medium text-[#8aa0a6]">({extra})</span>}
      </label>
      {children}
      {erro && <p className="mt-1.5 text-xs font-medium text-[#c2413a]">{erro}</p>}
    </div>
  );
}
