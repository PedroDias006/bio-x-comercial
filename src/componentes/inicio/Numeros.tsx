import { Conteiner } from "@/componentes/ui/Conteiner";
import { numeros } from "@/dados/site";

/**
 * Os três números que sustentam a conversa. Ficam logo abaixo do hero
 * porque respondem "por que eu deveria acreditar nisso" antes de qualquer
 * explicação técnica.
 *
 * O `flex-col-reverse` de cada item faz o número aparecer em cima, mas no DOM
 * o <dt> continua vindo antes do <dd>, como a especificação da <dl> pede. Sem
 * isso seria preciso um <dt> sr-only, e o leitor de tela leria a mesma
 * descrição duas vezes seguidas.
 */
export function Numeros() {
  return (
    <section className="border-b border-[var(--linha)] bg-[#f4f6f7] text-[var(--biox-950)]">
      <Conteiner>
        <dl className="grid grid-cols-1 divide-[var(--linha)] sm:grid-cols-3 lg:divide-x">
          {numeros.map((numero) => (
            <div
              key={numero.descricao}
              className="flex flex-col-reverse px-2 py-10 lg:px-8"
            >
              <dt className="mt-3 text-sm leading-6 text-[var(--texto-suave)]">
                {numero.descricao}
              </dt>
              <dd className="text-4xl font-extrabold tracking-[-0.04em] tabular-nums text-[var(--biox-turquesa-escuro)] lg:text-5xl">
                {numero.valor}
                <span className="text-2xl lg:text-3xl">{numero.unidade}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Conteiner>
    </section>
  );
}
