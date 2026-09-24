import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const raiz = path.resolve("public/imagens/clientes/logos");
const backup = path.resolve("output/logos-antes-do-refino");

// Recortes removem exclusivamente linhas e sobras herdadas da prancha original.
const recortes = {
  "allonda-ambiental.png": { left: 4, top: 9, width: 64, height: 34 },
  "andrade-gutierrez.png": { left: 9, top: 8, width: 71, height: 27 },
  "brk-ambiental.png": { left: 4, top: 7, width: 57, height: 29 },
  "caterpillar.png": { left: 5, top: 5, width: 128, height: 64 },
  "codau.png": { left: 5, top: 8, width: 63, height: 27 },
  "engevix.png": { left: 4, top: 8, width: 61, height: 27 },
  "grupo-cap.png": { left: 8, top: 4, width: 73, height: 46 },
  "mello-azevedo.png": { left: 9, top: 9, width: 67, height: 27 },
  "nestle.png": { left: 5, top: 6, width: 80, height: 21 },
  "precon.png": { left: 5, top: 5, width: 75, height: 29 },
  "sintese.png": { left: 4, top: 5, width: 47, height: 32 },
  "teksid.png": { left: 5, top: 5, width: 68, height: 31 },
  "tiberina.png": { left: 7, top: 5, width: 132, height: 62 },
  "votorantim-cimentos.png": { left: 5, top: 5, width: 67, height: 31 },
};

await fs.mkdir(backup, { recursive: true });
const arquivos = (await fs.readdir(raiz)).filter((arquivo) => arquivo.endsWith(".png"));

for (const arquivo of arquivos) {
  const origem = path.join(raiz, arquivo);
  const copia = path.join(backup, arquivo);

  try {
    await fs.access(copia);
  } catch {
    await fs.copyFile(origem, copia);
  }

  let imagem = sharp(await fs.readFile(origem), { failOn: "none" });
  if (recortes[arquivo]) imagem = imagem.extract(recortes[arquivo]);

  const buffer = await imagem
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .resize({ width: 720, height: 260, fit: "inside", kernel: sharp.kernel.lanczos3, withoutEnlargement: false })
    .sharpen({ sigma: 0.75, m1: 0.7, m2: 1.8 })
    .extend({ top: 18, bottom: 18, left: 24, right: 24, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();

  await fs.writeFile(origem, buffer);
}

console.log(`${arquivos.length} logotipos refinados; originais preservados em ${backup}`);
