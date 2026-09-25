import { notFound } from "next/navigation";

/** Qualquer endereço que não existe cai aqui e mostra o 404 no idioma certo. */
export default function PaginaInexistente() {
  notFound();
}
