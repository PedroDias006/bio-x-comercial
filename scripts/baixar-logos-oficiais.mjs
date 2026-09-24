import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const destino = path.resolve("public/imagens/clientes/logos");
const arquivos = {
  copasa: "Logotipo da Copasa (2024).svg",
  sabesp: "Sabesp.svg",
  petrobras: "Petrobras horizontal logo.svg",
  novartis: "Novartis-Logo-2023.svg",
  caterpillar: "Caterpillar logo.svg",
  klabin: "Klabin.svg",
  vigor: "Vigor Industrial logo.svg",
  "coca-cola-femsa": "Coca-Cola Femsa Logo.png",
  nestle: "Nestlé textlogo.svg",
  "votorantim-cimentos": "Votorantim Cimentos.svg",
  sesc: "Sesc logo.svg",
};

for (const [nome, titulo] of Object.entries(arquivos)) {
  const url = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(titulo)}`;
  const resposta = await fetch(url, { headers: { "User-Agent": "BIO-X-site-logo-refresh/1.0" } });
  if (!resposta.ok) {
    console.warn(`não encontrado: ${nome} (${resposta.status})`);
    continue;
  }

  const entrada = Buffer.from(await resposta.arrayBuffer());
  try {
    const png = await sharp(entrada, { density: 600 })
      .trim()
      .resize({ width: 900, height: 320, fit: "inside", kernel: sharp.kernel.lanczos3 })
      .extend({ top: 24, bottom: 24, left: 32, right: 32, background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toBuffer();
    await fs.writeFile(path.join(destino, `${nome}.png`), png);
    console.log(`atualizado: ${nome}`);
  } catch {
    console.warn(`arquivo inválido: ${nome}`);
  }
}
