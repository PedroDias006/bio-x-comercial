import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/* eslint-config-next 16 já exporta config flat pronto. Não usar o FlatCompat
   do @eslint/eslintrc aqui: ele tenta serializar o objeto de plugins para
   validar o schema e estoura em "circular structure to JSON". */
const config = [
  ...coreWebVitals,
  ...typescript,
  { ignores: [".next/**", "node_modules/**", "assets/**", "pesquisa/**"] },
];

export default config;
