// PÁGINA REMOVIDA — pode apagar esta pasta (src/app/[idioma]/na-midia).
// Enquanto ela existir, o endereço /na-midia só mostra a página "não encontrada".
import { notFound } from "next/navigation";

export default function PaginaRemovida() {
  notFound();
}
