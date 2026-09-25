import "./globals.css";

/**
 * 404 de último recurso (endereços que nem chegam a ter idioma). O 404 normal,
 * já traduzido, é o src/app/[idioma]/not-found.tsx.
 */
export default function NaoEncontradaRaiz() {
  return (
    <html lang="pt-BR">
      <body>
        <main style={{ padding: "8rem 1.25rem", textAlign: "center" }}>
          <p className="secao-olho">Erro 404</p>
          <h1 className="secao-titulo mt-4">Esta página não existe</h1>
          <p className="secao-apoio mx-auto mt-5 max-w-md">
            <a href="/">Voltar para o início</a> · <a href="/en">English</a> ·{" "}
            <a href="/es">Español</a>
          </p>
        </main>
      </body>
    </html>
  );
}
