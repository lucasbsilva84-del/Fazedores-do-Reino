# Fazedores do Reino

Site institucional em desenvolvimento. Execução exclusivamente local; sem domínio, deploy ou integração com hospedagem.

## Executar

Requer Node.js 20 ou superior. Sem dependências externas.

```sh
npm run dev
```

Abra http://localhost:4173. A experiência 360° fica separada em http://localhost:4173/vr/.

```sh
npm run check
```

## Organização

- `public/`: site institucional, estilos e interações.
- `public/vr/`: laboratório 360° isolado. Panorama ilustrativo; não é uma captura da igreja nem VR estereoscópico/WebXR.
- `scripts/`: servidor HTTP local.
- `docs/issues/`: especificações de referência; issues reais #1, #2, #3 e #5 no GitHub.
- `.github/`: modelos de issue, PR e verificação automática sem deploy.

## Conteúdo

Nome, perfil Instagram e culto domingo às 18h foram extraídos da referência enviada. Endereço, agenda detalhada e imagens oficiais precisam ser fornecidos pela igreja. Não há cadastro, coleta de dados, doações ou envio de formulários nesta versão.

## Fluxo Git

`main` contém a base; `feat/church-experience` reúne a implementação para revisão em PR. Use commits por mudança coesa. PR #4 reúne a entrega. Issues #1, #2 e #5 acompanham a implementação; #3 registra conteúdo oficial pendente. Não fazer merge automático.

## Referência visual

A revisão usa abertura vermelha, títulos serifados, composição circular de fotos, ondas e seções em preto e creme. Veja `docs/REFERENCE.md`. Galeria com filtros e perguntas expansíveis; movimento acompanha a rolagem e respeita movimento reduzido.

Para atualizar a cópia local já clonada:

```sh
git switch feat/church-experience
git pull --ff-only origin feat/church-experience
npm run dev
```
