import type { ReactNode } from "react";

/** Etiqueta pequena de categoria. Usada nos cartões de solução. */
export function Selo({
  children,
  claro = false,
}: {
  children: ReactNode;
  claro?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
        claro
          ? "border-white/25 text-white/80"
          : "border-[var(--linha)] text-[var(--texto-suave)]"
      }`}
    >
      {children}
    </span>
  );
}
