"use client";

import { Conteiner } from "@/componentes/ui/Conteiner";
import { BotaoLink } from "@/componentes/ui/BotaoLink";
import { rota, type Idioma } from "@/i18n/config";
import { useIdioma } from "@/i18n/ProvedorIdioma";

const textos: Record<Idioma, { olho: string; titulo: string; apoio: string; botao: string }> = {
  pt: {
    olho: "Erro 404",
    titulo: "Esta página não existe",
    apoio: "O endereço pode ter mudado de lugar. As soluções da BIO-X continuam todas na mesma página.",
    botao: "Ver as soluções",
  },
  en: {
    olho: "Error 404",
    titulo: "This page doesn’t exist",
    apoio: "The address may have moved. All BIO-X solutions are still on the same page.",
    botao: "See the solutions",
  },
  es: {
    olho: "Error 404",
    titulo: "Esta página no existe",
    apoio: "Es posible que la dirección haya cambiado. Todas las soluciones de BIO-X siguen en la misma página.",
    botao: "Ver las soluciones",
  },
};

export default function NaoEncontrada() {
  const idioma = useIdioma();
  const t = textos[idioma];

  return (
    <section className="py-32">
      <Conteiner className="text-center">
        <p className="secao-olho">{t.olho}</p>
        <h1 className="secao-titulo mt-4">{t.titulo}</h1>
        <p className="secao-apoio mx-auto mt-5 max-w-md">{t.apoio}</p>
        <BotaoLink href={rota(idioma, "/solucoes")} className="mt-8">
          {t.botao}
        </BotaoLink>
      </Conteiner>
    </section>
  );
}
