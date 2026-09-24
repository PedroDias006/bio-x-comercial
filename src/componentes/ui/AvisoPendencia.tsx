/**
 * Caixa âmbar que lista o que ainda falta o cliente enviar.
 *
 * Ela existe de propósito e é visível em desenvolvimento: é melhor a página
 * dizer "falta material técnico" do que inventar texto de preenchimento.
 * Some sozinha quando o array de pendências fica vazio.
 */
export function AvisoPendencia({ itens }: { itens?: string[] }) {
  if (!itens || itens.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-800">
        Pendente com o cliente
      </p>
      <ul className="mt-3 space-y-2">
        {itens.map((item) => (
          <li key={item} className="text-sm leading-6 text-amber-950">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
