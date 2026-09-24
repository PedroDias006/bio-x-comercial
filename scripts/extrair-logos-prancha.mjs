import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const origem = path.resolve("public/imagens/clientes/principais-clientes.jpg");
const destino = path.resolve("public/imagens/clientes/logos");
const cor = { r: 7, g: 67, b: 77 };

const recortes = {
  vigor: [484, 27, 68, 28],
  "fundacao-renova": [478, 78, 94, 36],
  "conata-engenharia": [490, 114, 46, 39],
  engevix: [482, 218, 83, 34],
  saae: [482, 270, 86, 36],
  "brk-ambiental": [487, 319, 77, 40],
  oas: [495, 368, 60, 36],
  sesc: [483, 416, 87, 43],
  sabesp: [590, 100, 104, 98],
  nestle: [589, 216, 106, 45],
  sintese: [608, 270, 72, 47],
  "votorantim-cimentos": [593, 320, 98, 43],
  "andrade-gutierrez": [590, 367, 103, 48],
  "grupo-cap": [603, 422, 78, 39],
  "ccm-construtora-centro-minas": [712, 22, 108, 39],
  codau: [728, 67, 80, 23],
  "rhi-magnesita": [713, 106, 108, 39],
  "allonda-ambiental": [713, 158, 108, 33],
  teksid: [716, 319, 96, 42],
  "mello-azevedo": [707, 365, 112, 51],
  precon: [720, 420, 90, 35],
};

for (const [nome, [left, top, width, height]] of Object.entries(recortes)) {
  const { data, info } = await sharp(origem)
    .extract({ left, top, width, height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const saida = Buffer.alloc(info.width * info.height * 4);
  for (let pixel = 0; pixel < info.width * info.height; pixel++) {
    const i = pixel * 4;
    const brilho = data[i] * 0.22 + data[i + 1] * 0.7 + data[i + 2] * 0.08;
    const alpha = Math.max(0, Math.min(255, (brilho - 155) * 4.4));
    saida[i] = cor.r;
    saida[i + 1] = cor.g;
    saida[i + 2] = cor.b;
    saida[i + 3] = alpha;
  }

  const png = await sharp(saida, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width: 840, height: 300, fit: "inside", kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.65, m1: 0.5, m2: 1.5 })
    .extend({ top: 22, bottom: 22, left: 30, right: 30, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await fs.writeFile(path.join(destino, `${nome}.png`), png);
  console.log(`extraído: ${nome}`);
}
