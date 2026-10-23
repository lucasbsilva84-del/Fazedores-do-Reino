Implementa o site da Fazedores do Reino seguindo a referência em vídeo: abertura vermelha com títulos serifados, fotos orbitando uma cruz com rolagem e resposta ao ponteiro, divisórias onduladas, faixa preta e galeria sobre creme. Inclui seção fotográfica de encontros, filtros funcionais e perguntas expansíveis.

A experiência 360° permanece separada em `/vr/`, como demonstração ilustrativa. Sem domínio, hospedagem ou deploy; CI apenas de validação.

Closes #1
Closes #2
Closes #5

Relacionado a #3: fotos originais de alta resolução, logo oficial, endereço e panorama real permanecem pendentes.

Validação: `npm run check` passou; navegador local desktop confirmou renderização, imagens sem falhas e ausência de overflow horizontal, filtro Louvor (1 resultado), Todos (4 resultados), pergunta expansível e variação da rotação durante rolagem. Mobile e headset não validados.

Para testar no computador:
```sh
git fetch origin
git switch feat/church-experience
git pull --ff-only origin feat/church-experience
npm run dev
```
Abra http://localhost:4173. A main contém somente o README enquanto este PR aguarda revisão.

Limitações: fotos recortadas do print enviado e ainda em baixa resolução. O laboratório imersivo não é tour real nem WebXR.