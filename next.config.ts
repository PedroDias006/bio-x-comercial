import type { NextConfig } from "next";

/* Cache no navegador/CDN. As fotos e a fonte quase nunca mudam; quando uma
   foto for trocada por outra com o mesmo nome, o "stale-while-revalidate"
   garante que a nova apareça logo na visita seguinte. */
const umaSemana = 60 * 60 * 24 * 7;
const umAno = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // AVIF é o menor formato; WebP fica de reserva para navegadores antigos.
    formats: ["image/avif", "image/webp"],
    // Larguras geradas: sem 2048/3840, que só pesam no celular e não
    // melhoram nada numa tela de celular ou notebook comum.
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
    // Versões otimizadas ficam guardadas por 31 dias no servidor.
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
  async headers() {
    return [
      {
        source: "/imagens/:caminho*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${umaSemana}, stale-while-revalidate=${umAno}` }],
      },
      {
        source: "/fonts/:caminho*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${umAno}, immutable` }],
      },
    ];
  },
  /* Existe um package-lock.json solto em C:\Users\pedro que fazia o Next
     eleger a pasta do usuário como raiz do workspace. Fixar aqui evita que
     ele procure arquivos fora do projeto. */
  turbopack: {
    root: import.meta.dirname,
  },
  experimental: {
    // Importa só os ícones usados do lucide-react (bundle menor).
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
