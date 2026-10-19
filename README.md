# Limp Brilhe | Landing page

Site de uma página para a Limp Brilhe: limpeza de vidros, lustres, pedrarias e pós-obra,
remoção de marca d'água e impermeabilização de vidros. Instagram: @limp_brilhe

## Estrutura

```
Limpbrilhe/
├── index.html      # a página inteira
├── css/style.css   # visual (cores no topo, em :root)
├── js/main.js      # abertura com o rodinho, janela que limpa com o dedo, antes/depois, menu
├── assets/img/     # logo (versão redesenhada, trocar pela oficial)
└── assets/video/   # 5 reels do Instagram (em parceria com @compact.limp, uso autorizado)
```

## Interações

- Abertura: a tela começa embaçada e um rodinho limpa tudo na técnica do "S" (uma vez por visita, com botão "Pular")
- Janela embaçada no topo: o visitante passa o dedo ou o mouse para limpar o vidro
- Trabalhos reais: 5 vídeos verticais. No computador rodam ao passar o mouse, no celular roda só o que está na tela; ao tocar, abrem em tela cheia com som
- Antes e depois com barra de arrastar
- Bolhas de sabão subindo no topo e reflexo de brilho nos cards e botões

## Como abrir

Abra o `index.html` no navegador. Não precisa instalar nada.
Para ver a abertura de novo, feche a aba ou abra em janela anônima.

## Pendências (marcadas com TODO no código)

- Número de WhatsApp em `js/main.js` (`WHATSAPP`). Enquanto estiver vazio, os botões abrem o Direct do Instagram
- Logo oficial em alta resolução em `assets/img/`
- Fotos reais de antes e depois (hoje é uma ilustração)
- Comprimir os vídeos (hoje somam 51 MB; o de 65 s tem 20 MB)
- Confirmar a descrição dos serviços e as respostas das dúvidas
- Cidade e região de atendimento
