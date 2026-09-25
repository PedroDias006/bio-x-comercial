import { NextResponse, type NextRequest } from "next/server";
import { cookieIdioma, ehIdioma, idiomaPadrao, idiomas, type Idioma } from "@/i18n/config";

/**
 * Decide o idioma de cada visita (ver src/i18n/config.ts).
 *
 * - /en/... e /es/...  → seguem direto.
 * - /pt/...            → redireciona para a versão sem prefixo (endereço oficial).
 * - sem prefixo        → se o visitante prefere inglês/espanhol (cookie ou
 *                        navegador), redireciona para /en ou /es; senão serve o
 *                        português por baixo dos panos (rewrite para /pt/...).
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const primeiro = pathname.split("/")[1];

  if (ehIdioma(primeiro)) {
    if (primeiro === idiomaPadrao) {
      const semPrefixo = pathname.replace(/^\/pt(?=\/|$)/, "") || "/";
      return NextResponse.redirect(new URL(`${semPrefixo}${search}`, request.url));
    }
    return NextResponse.next();
  }

  const preferido = idiomaPreferido(request);
  if (preferido !== idiomaPadrao) {
    const destino = pathname === "/" ? `/${preferido}` : `/${preferido}${pathname}`;
    return NextResponse.redirect(new URL(`${destino}${search}`, request.url));
  }

  const interno = pathname === "/" ? "/pt" : `/pt${pathname}`;
  return NextResponse.rewrite(new URL(`${interno}${search}`, request.url));
}

/** Cookie (escolha na bandeira) > Accept-Language (navegador) > português. */
function idiomaPreferido(request: NextRequest): Idioma {
  const salvo = request.cookies.get(cookieIdioma)?.value;
  if (ehIdioma(salvo)) return salvo;

  const cabecalho = request.headers.get("accept-language") ?? "";
  const pedidos = cabecalho
    .split(",")
    .map((parte) => {
      const [codigo, ...params] = parte.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { base: codigo.split("-")[0], peso: q ? Number(q.split("=")[1]) || 0 : 1 };
    })
    .filter((p) => p.base)
    .sort((a, b) => b.peso - a.peso);

  for (const pedido of pedidos) {
    if ((idiomas as readonly string[]).includes(pedido.base)) return pedido.base as Idioma;
  }
  return idiomaPadrao;
}

export const config = {
  // Não passa pelo proxy: arquivos internos do Next, API, imagens e qualquer
  // arquivo com extensão (robots.txt, sitemap.xml, fontes…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
