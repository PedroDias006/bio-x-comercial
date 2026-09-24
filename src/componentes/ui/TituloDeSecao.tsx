/**
 * O trio olho + título + apoio que abre toda seção depois do hero.
 * Os tamanhos vivem em `.secao-*` no globals.css para não divergirem.
 */
export function TituloDeSecao({
  olho,
  titulo,
  apoio,
  alinhamento = "esquerda",
  claro = false,
}: {
  olho?: string;
  titulo: string;
  apoio?: string;
  alinhamento?: "esquerda" | "centro";
  claro?: boolean;
}) {
  const centralizado = alinhamento === "centro";

  return (
    <div className={centralizado ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {olho ? (
        <p
          className="secao-olho mb-4"
          style={claro ? { color: "var(--biox-turquesa-claro)" } : undefined}
        >
          {olho}
        </p>
      ) : null}

      <h2 className="secao-titulo" style={claro ? { color: "#ffffff" } : undefined}>
        {titulo}
      </h2>

      {apoio ? (
        <p
          className="secao-apoio mt-5 text-pretty"
          style={claro ? { color: "rgba(255,255,255,0.72)" } : undefined}
        >
          {apoio}
        </p>
      ) : null}
    </div>
  );
}
