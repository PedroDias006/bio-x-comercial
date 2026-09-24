import type { ReactNode } from "react";

/** Largura máxima e respiro lateral padrão de todas as seções. */
export function Conteiner({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
