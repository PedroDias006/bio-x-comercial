import Link from "next/link";
import type { ReactNode } from "react";

type Variante = "primario" | "secundario" | "claro" | "contorno";

const variantes: Record<Variante, string> = {
  primario:
    "bg-[var(--biox-turquesa)] text-[#041e2b] hover:-translate-y-0.5 hover:bg-[var(--biox-turquesa-claro)]",
  secundario:
    "border border-white/25 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/20",
  claro:
    "border border-[var(--linha)] bg-white text-[var(--biox-800)] hover:-translate-y-0.5 hover:border-[var(--biox-turquesa)]",
  contorno:
    "border border-[var(--biox-800)] text-[var(--biox-800)] hover:-translate-y-0.5 hover:bg-[var(--biox-800)] hover:text-white",
};

/**
 * Link com cara de botão. `externo` abre em nova aba e já põe o rel de
 * segurança — usado nos botões de WhatsApp.
 */
export function BotaoLink({
  href,
  children,
  variante = "primario",
  externo = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variante?: Variante;
  externo?: boolean;
  className?: string;
}) {
  const classe = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition ${variantes[variante]} ${className}`;

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classe}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classe}>
      {children}
    </Link>
  );
}
