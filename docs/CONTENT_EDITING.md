# Como editar o conteúdo da comunidade

Edite `public/data/community.json` no VS Code. Salve JSON válido (aspas duplas, sem vírgula após o último item) e atualize o navegador. Coloque fotos em `public/assets/` e referencie por `/assets/nome.jpg`.

## Pastores

`pastors` aceita objetos com `name`, `role`, `photo`, `alt`, `bio`, `url`. Se não houver foto, pode usar `videoUrl` de embed do YouTube. Nomes individuais e retratos precisam ser confirmados pela igreja. Atualmente há o vídeo dos pastores sêniores, divulgado no Beacons oficial; não foram inventados nomes ou retratos.

## Informativo

Em `announcements`: `title`, `text` e `url` opcional (HTTPS).

## Eventos

Em `events`: `title`, `date` (AAAA-MM-DD), `dateLabel` (ex.: data e hora confirmadas), `description`, `location`, `photo`, `alt` e `url`. Nenhum evento futuro foi inventado. O estado vazio aparece enquanto o array está vazio.

## Introdutores e louvor

`ministries.introdutores.photo`: caminho da foto confirmada. `caption`: apresentação da equipe. Ao preencher, a imagem substitui a arte de acolhimento automaticamente. A foto dos introdutores NÃO foi encontrada com identificação confiável. Não substituir por um grupo qualquer.

`ministries.louvor.photo` e `source`: foto e publicação de origem. A versão inicial usa um registro oficial de celebração com músicos ao fundo, não um retrato identificado da equipe completa.

## Localização e modelo

`location.address` e `mapsUrl`: endereço e link de rota. Endereço atual extraído do Beacons oficial: Rua João Adami, 222, Caxias do Sul.

`location.photo`: foto real do espaço; substitui o modelo ilustrativo em CSS. Esse modelo é apenas um estudo visual, não uma planta nem reconstrução da igreja.

`location.embedUrl`: apenas URL de incorporação de www.google.com, maps.google.com ou www.openstreetmap.org. Copie somente o atributo src do iframe oferecido pelo mapa, não o HTML todo.

## Células — preenchimento manual

`cells`: objetos com `name`, `neighborhood`, `schedule`, `address` e `url` opcional. A busca filtra nome e bairro sem diferenciar acentos. O mapa e a lista são configurados separadamente: não há geocodificação automática.

`cellsMapEmbedUrl`: URL HTTPS de incorporação do mapa mantido manualmente nos hosts aceitos acima. Nenhum ponto foi inventado. Cadastre somente locais que a igreja autorizou divulgar.

## Formulário — configuração manual

`contactFormUrl`: link HTTPS para o formulário oficial que você criar (Microsoft Forms, Google Forms etc.). Quando preenchido, o botão abre o formulário. Sem link, aparece apenas uma prévia desabilitada e o contato pelo Instagram. Não há backend nem armazenamento de respostas nesta aplicação.

## Validar

```sh
npm run check
npm run dev
```

Abra http://localhost:4173. Nesta etapa use `feat/community-ministries-events`. Nenhuma hospedagem foi criada.
