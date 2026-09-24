# Site BIO-X Microorganismos

Next.js 16 (App Router) + React 19 + Tailwind 4 + TypeScript.
Estrutura baseada no projeto da Rede Unishop, com as pastas em português.

## Rodar

```bash
npm run dev
```

Também disponíveis: `npm run build` (produção) e `npm run lint`.

## Onde mexer

| Quero mudar... | Arquivo |
|---|---|
| Telefone, e-mail, WhatsApp, endereço | `src/dados/contato.ts` |
| Números da home, missão/visão/valores, menu | `src/dados/site.ts` |
| Produtos, benefícios, composição | `src/dados/solucoes.ts` |
| Lista de clientes | `src/dados/clientes.ts` |
| Depoimentos e matérias de imprensa | `src/dados/depoimentos.ts` |
| Cores, fontes, espaçamentos globais | `src/app/globals.css` |

**Nenhum componente guarda texto ou número de cor.** Tudo vem de `src/dados/`.
Para publicar uma linha de produto nova, basta acrescentar um objeto em
`solucoes.ts` — a página `/solucoes/[slug]` e o card na home aparecem sozinhos.

## Estrutura

```
src/
├── app/                     rotas (os nomes viram as URLs)
│   ├── page.tsx             home
│   ├── sobre/
│   ├── solucoes/[slug]/     as 7 linhas, geradas a partir dos dados
│   ├── resultados/
│   ├── clientes/
│   └── na-midia/
├── componentes/
│   ├── ui/                  Conteiner, BotaoLink, TituloDeSecao, Selo
│   ├── estrutura/           Cabecalho, Rodape
│   └── inicio/              seções da home
└── dados/                   TODO o conteúdo do site
```

`public/imagens/` guarda logos, fotos de hero, produtos e clientes.

## Travas de publicação

Duas constantes seguram material que ainda não tem autorização de uso:

- `podePublicarClientes` em `dados/clientes.ts` — logotipos de terceiros
- `podePublicarDepoimentos` em `dados/depoimentos.ts` — imagem dos produtores

Enquanto estiverem em `false`, o site mostra apenas texto e exibe um aviso
listando o que falta. O componente `AvisoPendencia` faz o mesmo nas páginas de
solução que ainda estão sem material técnico — ele some sozinho quando o array
de pendências fica vazio.

## Material de origem

- `DOSSIE-BIO-X.md` — levantamento completo da marca
- `dossie.html` — a versão publicada do dossiê
- `pesquisa/` — frames e legendas extraídos dos 18 vídeos
- `assets/` — recortes originais, antes de irem para `public/imagens/`
