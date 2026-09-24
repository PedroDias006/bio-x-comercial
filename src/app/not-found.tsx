import { Conteiner } from "@/componentes/ui/Conteiner";
import { BotaoLink } from "@/componentes/ui/BotaoLink";

export default function NaoEncontrada() {
  return (
    <section className="py-32">
      <Conteiner className="text-center">
        <p className="secao-olho">Erro 404</p>
        <h1 className="secao-titulo mt-4">Esta página não existe</h1>
        <p className="secao-apoio mx-auto mt-5 max-w-md">
          O endereço pode ter mudado de lugar. As soluções da BIO-X continuam
          todas na mesma página.
        </p>
        <BotaoLink href="/solucoes" className="mt-8">
          Ver as soluções
        </BotaoLink>
      </Conteiner>
    </section>
  );
}
