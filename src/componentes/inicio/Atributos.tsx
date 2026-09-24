import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Sprout, CircleDollarSign, Droplets } from "lucide-react";
import { Conteiner } from "@/componentes/ui/Conteiner";

const beneficios = [
  { icone: Sprout, titulo: "Aplicação simples", texto: "Biotecnologia integrada ao manejo do dia a dia." },
  { icone: Leaf, titulo: "Origem natural", texto: "Microorganismos benéficos encontrados na natureza." },
  { icone: CircleDollarSign, titulo: "Eficiência no processo", texto: "Soluções voltadas à produtividade e ao uso eficiente de recursos." },
  { icone: Droplets, titulo: "Cuidado que conecta", texto: "Tecnologia para o solo, a água e os animais." },
];

export function Atributos() {
  return (
    <section className="secao-institucional bg-white py-16 sm:py-20 lg:py-28" aria-labelledby="tecnologia-titulo">
      <Conteiner>
        <div className="grid items-center gap-9 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
          <div className="relative aspect-[6/5] overflow-hidden rounded-[28px] bg-[var(--fundo)] sm:aspect-[4/3] lg:aspect-[6/5]">
            <Image src="/imagens/hero/microscopio.jpg" alt="Detalhe das lentes de um microscópio sobre uma amostra iluminada" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
          </div>
          <div className="max-w-xl py-2 lg:py-8">
            <p className="text-sm font-semibold tracking-wide text-[var(--biox-turquesa-escuro)]">A tecnologia BIO-X</p>
            <h2 id="tecnologia-titulo" className="mt-5 text-[clamp(2.5rem,4.3vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.045em] text-[var(--biox-950)]">
              Pequenos organismos.<br />
              <span className="text-[var(--biox-turquesa-escuro)]">Grandes possibilidades.</span>
            </h2>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed tracking-[-0.015em] text-[var(--texto-suave)]">
              A força da natureza, aplicada com conhecimento. Microorganismos benéficos ajudam a recuperar o equilíbrio do solo, da água e dos animais.
            </p>
            <Link href="/sobre" className="mt-7 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[var(--biox-turquesa-escuro)] underline-offset-4 hover:underline">
              Conheça a nossa tecnologia <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ul className="mt-12 grid gap-8 border-t border-[var(--linha)] pt-9 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-10 lg:pt-10">
          {beneficios.map(({ icone: Icone, titulo, texto }) => (
            <li key={titulo}>
              <Icone className="size-7 text-[var(--biox-turquesa-escuro)]" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-base font-bold tracking-tight text-[var(--biox-950)]">{titulo}</h3>
              <p className="mt-2 text-base leading-relaxed text-[var(--texto-suave)]">{texto}</p>
            </li>
          ))}
        </ul>
      </Conteiner>
    </section>
  );
}
