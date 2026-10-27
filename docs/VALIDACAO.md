# Validação local — 27/10/2026

- Build Vite concluído (37 módulos). Aviso informativo: base Browserslist da referência está antiga.
- ESLint sem erros na versão final.
- HTTP localhost: `/`, `/vr/`, `/src/App.jsx`, `/src/config.js`, `/media/logo.png` e `/fonts/general.woff2` responderam 200 com tipos esperados.
- `git diff --check` sem erros de whitespace.
- Revisão de código: menu mobile, âncoras, sem mídia de jogos, dados institucionais vazios no config; tratamento de erro e timeout de vídeo; exclusão mútua de áudio; contexto GSAP revertido; reduced motion com atualização dinâmica e sem paralaxe/revelação.

Limites: host do navegador automatizado indisponível. Responsividade visual, navegação interativa, console do navegador, transição renderizada e mudanças de preferência em tempo real ainda precisam de conferência em navegador. MP4 e fotos oficiais ausentes impedem aprovar reprodução, áudio, enquadramento de pessoas e fallback com fotografia real. Não há afirmação de aprovação desses cenários.

Roteiro manual: em 390×844 e 1440×900, conferir títulos, overflow, menu e todas as âncoras. Alternar duas vezes a abertura com mouse e teclado. Adicionar MP4, testar áudio ativo/inativo e garantir áudio só da camada atual. Remover cada MP4 e capa, recarregar e conferir saída do carregamento em até 5s. Testar rede lenta e bloqueio de autoplay. Ativar reduced motion e conferir ausência de movimentos de rolagem e vídeos pausados. Abrir `/vr/` diretamente e retornar. Conferir console sem exceções. Após configurar fotos, revisar cada rosto/proporção em ambos os tamanhos.

Nenhum deploy, domínio ou merge executado.
