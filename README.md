# Fazedores do Reino

Adaptação de conteúdo em português do projeto Adrian Hajdin/JavaScript Mastery, referência visual Zentry. CSS original preservado integralmente, com as mesmas cores, fontes, classes, recortes e animações. Componentes originais restaurados; identidade e textos adaptados para a igreja.

## Executar

```sh
npm ci
npm run dev -- --host 127.0.0.1
npm run build
npm run lint
```

No PowerShell use npm.cmd se necessário. Abra http://127.0.0.1:5173. Página VR separada em /vr/, sem simulação de panorama real.

Dados e caminhos de mídia em src/config.js. MP4 e fotos oficiais ainda pendentes; a marca recebida é a alternativa temporária, sem mídias de jogos. Vídeos: public/media/abertura-1.mp4 e abertura-2.mp4; preencher videos[].src. Detalhes em docs/MIDIAS.md e docs/CREDITOS.md. Não há envio de formulário configurado.

Issue #8, PR #9, branch feat/cinematic-fazedores. Sem deploy ou merge.
