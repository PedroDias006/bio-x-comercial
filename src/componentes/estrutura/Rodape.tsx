import Image from "next/image";
import Link from "next/link";
import { Conteiner } from "@/componentes/ui/Conteiner";
import { navegacaoEm, assinaturaEm, nomeDaEmpresa } from "@/dados/site";
import {
  canaisDeContato,
  redesSociais,
  endereco,
  registros,
  textoRegistroMapa,
  urlWhatsappEm,
} from "@/dados/contato";
import { solucoes } from "@/dados/solucoes";
import { rota, type Idioma } from "@/i18n/config";

const textos: Record<Idioma, { apoio: string; navegar: string; solucoes: string; contato: string; direitos: string; cep: string; ariaInst: string; ariaSol: string }> = {
  pt: { apoio: "Biotecnologia 100% natural para agricultura, saneamento e pecuária.", navegar: "Navegar", solucoes: "Soluções", contato: "Contato", direitos: "Todos os direitos reservados.", cep: "CEP", ariaInst: "Rodapé — institucional", ariaSol: "Rodapé — soluções" },
  en: { apoio: "100% natural biotechnology for agriculture, sanitation and livestock.", navegar: "Explore", solucoes: "Solutions", contato: "Contact", direitos: "All rights reserved.", cep: "ZIP", ariaInst: "Footer — company", ariaSol: "Footer — solutions" },
  es: { apoio: "Biotecnología 100% natural para agricultura, saneamiento y ganadería.", navegar: "Navegar", solucoes: "Soluciones", contato: "Contacto", direitos: "Todos los derechos reservados.", cep: "CP", ariaInst: "Pie de página — institucional", ariaSol: "Pie de página — soluciones" },
};

export function Rodape({ idioma }: { idioma: Idioma }) {
  const ano = new Date().getFullYear();
  const t = textos[idioma];
  const navegacao = navegacaoEm(idioma);

  return (
    <footer className="atmosfera-escura mt-24 text-white">
      <Conteiner className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            {/* Versão clara do logo. O arquivo oficial só existe na versão
                colorida; esta foi derivada dele trocando o azul-marinho por
                branco e preservando o turquesa do X — que é como a própria
                BIO-X usa a marca sobre fundo escuro nos vídeos. Substituir
                assim que o cliente enviar o arquivo original. */}
            <Image
              src="/imagens/logos/biox-logo-branco.png"
              alt="BIO-X Microorganismos"
              width={1774}
              height={887}
              className="h-14 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-6 text-white/70">
              {assinaturaEm[idioma]}. {t.apoio}
            </p>
          </div>

          <nav aria-label={t.ariaInst}>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
              {t.navegar}
            </h2>
            <ul className="mt-5 space-y-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link
                    href={rota(idioma, item.href)}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.ariaSol}>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
              {t.solucoes}
            </h2>
            <ul className="mt-5 space-y-3">
              {solucoes.map((solucao) => (
                <li key={solucao.slug}>
                  <Link
                    href={rota(idioma, `/solucoes/${solucao.slug}`)}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {solucao.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
              {t.contato}
            </h2>
            <ul className="mt-5 space-y-3">
              {canaisDeContato.map((canal) => (
                <li key={canal.id}>
                  <a
                    href={canal.id === "whatsapp" ? urlWhatsappEm(idioma) : canal.href}
                    target={canal.externo ? "_blank" : undefined}
                    rel={canal.externo ? "noreferrer noopener" : undefined}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {canal.valor}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex gap-4">
              {redesSociais.map((rede) => (
                <li key={rede.id}>
                  <a
                    href={rede.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {rede.rotulo}
                  </a>
                </li>
              ))}
            </ul>

            {/* Só renderiza quando o endereço chegar do cliente. */}
            {endereco ? (
              <address className="mt-5 text-sm not-italic leading-6 text-white/60">
                {endereco.logradouro}
                <br />
                {endereco.bairro} — {endereco.cidade}/{endereco.uf}
                <br />
                {t.cep} {endereco.cep}
              </address>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/12 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {nomeDaEmpresa}. {t.direitos}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {registros.map((registro) => (
              <li key={registro.orgao}>
                {registro.orgao}: {registro.orgao === "MAPA" ? textoRegistroMapa[idioma] : registro.numero}
              </li>
            ))}
          </ul>
        </div>
      </Conteiner>
    </footer>
  );
}
