"use client";

import { createContext, useContext, type ReactNode } from "react";
import { idiomaPadrao, type Idioma } from "./config";

const ContextoIdioma = createContext<Idioma>(idiomaPadrao);

/** Deixa o idioma da página disponível para os componentes de cliente. */
export function ProvedorIdioma({
  idioma,
  children,
}: {
  idioma: Idioma;
  children: ReactNode;
}) {
  return <ContextoIdioma.Provider value={idioma}>{children}</ContextoIdioma.Provider>;
}

/** Idioma atual, dentro de componentes "use client". */
export function useIdioma(): Idioma {
  return useContext(ContextoIdioma);
}
