import { Conteiner } from "@/componentes/ui/Conteiner";
import { BotaoLink } from "@/componentes/ui/BotaoLink";
import { urlWhatsappEm, canaisDeContato } from "@/dados/contato";
import type { Idioma } from "@/i18n/config";

const textos: Record<Idioma, { titulo: string; apoio: string; whatsapp: string; email: string }> = {
  pt: {
    titulo: "Venha fazer parte dessa ideia.",
    apoio: "Conte o que você produz e em que escala. A partir daí a equipe técnica indica a linha certa e o protocolo de aplicação.",
    whatsapp: "Falar no WhatsApp",
    email: "Enviar e-mail",
  },
  en: {
    titulo: "Come be part of this idea.",
    apoio: "Tell us what you produce and at what scale. Our technical team will then recommend the right line and application protocol.",
    whatsapp: "Chat on WhatsApp",
    email: "Send an email",
  },
  es: {
    titulo: "Venga a ser parte de esta idea.",
    apoio: "Cuéntenos qué produce y a qué escala. A partir de ahí, el equipo técnico le indicará la línea adecuada y el protocolo de aplicación.",
    whatsapp: "Hablar por WhatsApp",
    email: "Enviar correo",
  },
};

/** Fechamento da home. A frase é a do próprio institucional da BIO-X. */
export function ChamadaFinal({ idioma }: { idioma: Idioma }) {
  const t = textos[idioma];
  const email = canaisDeContato.find((canal) => canal.id === "email");

  return (
    <section className="atmosfera-hero relative hidden overflow-hidden py-20 text-white md:block lg:py-28">
      <div className="malha-tecnica absolute inset-0" aria-hidden="true" />

      <Conteiner className="relative text-center">
        <h2 className="secao-titulo mx-auto max-w-2xl text-white">
          {t.titulo}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty leading-8 text-white/72">
          {t.apoio}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <BotaoLink href={urlWhatsappEm(idioma)} externo>
            {t.whatsapp}
          </BotaoLink>
          {email ? (
            <BotaoLink href={email.href} variante="secundario" externo>
              {t.email}
            </BotaoLink>
          ) : null}
        </div>
      </Conteiner>
    </section>
  );
}
