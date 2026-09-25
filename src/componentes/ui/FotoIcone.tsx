import Image from "next/image";

/**
 * Miniatura redonda com uma foto real (pintinho, boi, porco…), usada no
 * lugar de ícone. O anel pega a cor do produto pela variável --cor.
 */
export function FotoIcone({
  src,
  tamanho = "p",
}: {
  src: string;
  tamanho?: "p" | "g";
}) {
  const classe =
    tamanho === "g"
      ? "h-20 w-20 ring-[3px] shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
      : "h-10 w-10 ring-2 shadow-[0_4px_14px_rgba(0,0,0,0.4)]";

  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ring-[var(--cor)] ${classe}`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={tamanho === "g" ? "80px" : "40px"}
        className="object-cover"
      />
    </span>
  );
}
