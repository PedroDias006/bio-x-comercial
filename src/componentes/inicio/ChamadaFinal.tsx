import { Conteiner } from "@/componentes/ui/Conteiner";
import { BotaoLink } from "@/componentes/ui/BotaoLink";
import { urlWhatsapp, canaisDeContato } from "@/dados/contato";

/** Fechamento da home. A frase é a do próprio institucional da BIO-X. */
export function ChamadaFinal() {
  const email = canaisDeContato.find((canal) => canal.id === "email");

  return (
    <section className="atmosfera-hero relative overflow-hidden py-20 text-white lg:py-28">
      <div className="malha-tecnica absolute inset-0" aria-hidden="true" />

      <Conteiner className="relative text-center">
        <h2 className="secao-titulo mx-auto max-w-2xl text-white">
          Venha fazer parte dessa ideia.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty leading-8 text-white/72">
          Conte o que você produz e em que escala. A partir daí a equipe técnica
          indica a linha certa e o protocolo de aplicação.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <BotaoLink href={urlWhatsapp} externo>
            Falar no WhatsApp
          </BotaoLink>
          {email ? (
            <BotaoLink href={email.href} variante="secundario" externo>
              Enviar e-mail
            </BotaoLink>
          ) : null}
        </div>
      </Conteiner>
    </section>
  );
}
