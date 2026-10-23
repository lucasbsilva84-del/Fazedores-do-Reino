Cria o site institucional da Fazedores do Reino com tipografia expressiva, animações na rolagem, navegação responsiva e área imersiva separada em `/vr/`.

Inclui servidor local sem dependências, modelos de issues/PR e GitHub Actions apenas para validação. Não configura hospedagem, domínio ou deploy.

Closes #1
Closes #2

Relacionado a #3: identidade oficial, fotos de alta resolução e tour real permanecem pendentes.

Validação: `npm run check` passou (sintaxe e teste HTTP); QA local confirmou a página inicial, navegação para /vr/ e controles direita/centralizar. Viewport mobile e headset não testados.

Limitações: imagem inicial provisória de baixa resolução; área imersiva é uma demonstração abstrata, sem panorama real ou WebXR. Endereço e programação completa aguardam validação.

Execução: `npm run dev` → http://localhost:4173; área imersiva em /vr/.