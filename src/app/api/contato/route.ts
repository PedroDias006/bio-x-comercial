import { NextResponse } from "next/server";

/**
 * Recebe o formulário de contato e envia por e-mail.
 *
 * O envio usa a API do Resend (resend.com — tem plano gratuito). Para ligar:
 *   1. crie uma conta no Resend e verifique o domínio bioxmicroorganismos.com.br;
 *   2. no arquivo .env.local (e nas variáveis da hospedagem), defina:
 *        RESEND_API_KEY=re_...
 *        CONTATO_EMAIL_DESTINO=biox@bioxmicroorganismos.com.br
 *        CONTATO_EMAIL_REMETENTE=site@bioxmicroorganismos.com.br
 *
 * Enquanto a chave não existir, a rota responde 503 e a janela de contato
 * abre o programa de e-mail do visitante com a mensagem já preenchida —
 * nenhum contato se perde.
 */

type Contato = {
  nome?: string;
  email?: string;
  papel?: string;
  empresa?: string;
  mensagem?: string;
  idioma?: string;
  origem?: string;
  site?: string; // campo-isca: robôs preenchem, pessoas não veem
};

const limpar = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escapar = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let dados: Contato;
  try {
    dados = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Robô caiu na isca: finge que deu certo e descarta.
  if (limpar(dados.site)) return NextResponse.json({ ok: true });

  const nome = limpar(dados.nome, 120);
  const email = limpar(dados.email, 160);
  const empresa = limpar(dados.empresa, 160);
  const papel = limpar(dados.papel, 60);
  const mensagem = limpar(dados.mensagem, 3000);
  const origem = limpar(dados.origem, 200);
  const idioma = limpar(dados.idioma, 5);

  if (!nome || !empresa || !papel || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, motivo: "invalido" }, { status: 422 });
  }

  const chave = process.env.RESEND_API_KEY;
  if (!chave) return NextResponse.json({ ok: false, motivo: "nao-configurado" }, { status: 503 });

  const destino = process.env.CONTATO_EMAIL_DESTINO ?? "biox@bioxmicroorganismos.com.br";
  const remetente = process.env.CONTATO_EMAIL_REMETENTE ?? "site@bioxmicroorganismos.com.br";

  const linhas: [string, string][] = [
    ["Nome", nome],
    ["E-mail", email],
    ["Empresa", empresa],
    ["Perfil", papel],
    ["Mensagem", mensagem || "—"],
    ["Página", origem || "—"],
    ["Idioma", idioma || "pt"],
  ];

  const html = `<h2 style="font-family:sans-serif;color:#06232b">Novo contato pelo site</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${linhas
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6c868f;vertical-align:top"><b>${k}</b></td><td style="padding:6px 0;color:#06232b;white-space:pre-wrap">${escapar(v)}</td></tr>`,
    )
    .join("")}</table>`;

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Site BIO-X <${remetente}>`,
      to: [destino],
      reply_to: email,
      subject: `Contato pelo site — ${nome} (${empresa})`,
      html,
      text: linhas.map(([k, v]) => `${k}: ${v}`).join("\n"),
    }),
  });

  if (!resposta.ok) return NextResponse.json({ ok: false, motivo: "falha-envio" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
