// ARQUIVO ANTIGO — pode apagar esta pasta.
// As páginas agora ficam em src/app/[idioma]/ (uma versão por idioma).
// Este arquivo nunca é exibido: o src/proxy.ts manda toda visita para lá.
import { notFound } from "next/navigation";

export default function PaginaAntiga() {
  notFound();
}
