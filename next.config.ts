import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /* Existe um package-lock.json solto em C:\Users\pedro que fazia o Next
     eleger a pasta do usuário como raiz do workspace. Fixar aqui evita que
     ele procure arquivos fora do projeto. */
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
