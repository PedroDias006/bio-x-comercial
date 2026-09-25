import type { ReactNode } from "react";

/**
 * O layout de verdade (com <html lang>) fica em src/app/[idioma]/layout.tsx,
 * porque o atributo lang muda conforme o idioma da página. Este arquivo só
 * existe porque o Next exige um layout na raiz — ele apenas repassa o conteúdo.
 */
export default function LayoutRaiz({ children }: { children: ReactNode }) {
  return children;
}
