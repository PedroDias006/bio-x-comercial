import type { Idioma } from "@/i18n/config";

/**
 * Bandeiras desenhadas em SVG (leves, nítidas em qualquer tela e sem
 * depender de emoji — o Windows não mostra emoji de bandeira).
 * Brasil = português, Estados Unidos = inglês, Espanha = espanhol.
 */
export function Bandeira({ idioma, className = "" }: { idioma: Idioma; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`circulo-${idioma}`}>
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <g clipPath={`url(#circulo-${idioma})`}>
        {idioma === "pt" && (
          <>
            <rect width="32" height="32" fill="#009c3b" />
            <path d="M16 5.5 29 16 16 26.5 3 16Z" fill="#ffdf00" />
            <circle cx="16" cy="16" r="6.2" fill="#002776" />
            <path d="M10 14.6c3.9-.9 8.2-.5 11.9 1.4" stroke="#fff" strokeWidth="1.2" fill="none" />
          </>
        )}
        {idioma === "en" && (
          <>
            <rect width="32" height="32" fill="#fff" />
            {[0, 2, 4, 6, 8, 10, 12].map((i) => (
              <rect key={i} y={i * 2.4615} width="32" height="2.4615" fill="#b22234" />
            ))}
            <rect width="16" height="17.23" fill="#3c3b6e" />
            {[
              [3, 3], [7, 3], [11, 3], [5, 6.2], [9, 6.2], [13, 6.2],
              [3, 9.4], [7, 9.4], [11, 9.4], [5, 12.6], [9, 12.6], [13, 12.6],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill="#fff" />
            ))}
          </>
        )}
        {idioma === "es" && (
          <>
            <rect width="32" height="32" fill="#aa151b" />
            <rect y="8" width="32" height="16" fill="#f1bf00" />
            <rect x="8" y="12.5" width="4" height="7" rx="1" fill="#aa151b" opacity=".85" />
          </>
        )}
      </g>
      <circle cx="16" cy="16" r="15.5" fill="none" stroke="rgba(0,0,0,.12)" />
    </svg>
  );
}
