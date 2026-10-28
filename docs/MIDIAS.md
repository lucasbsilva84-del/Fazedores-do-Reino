# Mídias e dados pendentes

Edite `src/config.js` somente com dados confirmados.

- Vídeo 1: `public/media/abertura-1.mp4`, origem https://www.instagram.com/reel/De8G6lrRhBD/
- Vídeo 2: `public/media/abertura-2.mp4`, origem https://www.instagram.com/reel/DK8LurRRzG9/
- Após obter os arquivos oficiais MP4 H.264/AAC autorizados, preencha cada `videos[].src` com o respectivo `file`. Links de Instagram não são MP4; não foram baixados.
- Capa: `public/media/capa.jpg`; defina `cover: '/media/capa.jpg'`. Na falta de foto a alternativa é gráfica, sem simular uma fotografia da igreja.
- Fotos oficiais ainda não recebidas: igreja, comunidade, Louvor, Introdutores, eventos, liderança identificada. Preencha `photos`, `gallery` e `leaders`. A única imagem recebida foi a marca, convertida de JPEG para PNG sem alterar o desenho ou inventar transparência.
- Configure `position` e `mobilePosition` por vídeo. `contain` preserva o quadro inteiro de vídeos e fotos, inclusive verticais, sem cortar rostos.
- Confirme endereço, liderança, horários, agenda, células, e-mail e WhatsApp. Formatos: `leaders: [{name, role, photo, bio}]`, `events: [{title, date, description, location}]`, `cells: [{name, location, schedule}]`, `gallery: [{src, alt, caption}]`.
- Não existe envio de formulário. `contactEndpoint` é reserva para integração futura; e-mail e WhatsApp, quando configurados, abrem os respectivos aplicativos.
- `/vr/` precisa de panoramas equiretangulares reais 2:1 ou modelo GLB/GLTF autorizado e integração do visualizador. Preencher `panorama` sozinho não ativa VR.

Validar os MP4 reais em desktop/celular: autoplay silencioso, playsInline, alternância 1/2, áudio somente do ativo, rede lenta e arquivo ausente. Carregamento termina com dados, erro ou em 5 segundos. Reduced motion pausa os vídeos e elimina as animações; ativar áudio é ação explícita de reprodução.

## Vídeo principal recebido

Arquivo snapinsta-1793127643242.mp4 integrado em public/media/abertura-1.mp4 (5.142.032 bytes). videos[0].src já configurado. O segundo MP4 continua pendente; a miniatura de alternância fica oculta enquanto não houver segundo vídeo configurado. CSS original preservado. Build e lint passaram após integração. Reprodução e áudio ainda precisam de conferência visual em navegador.

## Segundo vídeo recebido

Arquivo snapinsta-1793127994724.mp4 integrado em public/media/abertura-2.mp4 (1.800.654 bytes). videos[1].src configurado: os dois vídeos agora estão disponíveis e a miniatura ativa a alternância animada original. Os MP4 não estão mais pendentes. CSS original preservado. Build e lint passaram; reprodução, áudio e transição renderizada ainda precisam de conferência manual em navegador.
