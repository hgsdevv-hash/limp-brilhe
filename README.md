# Limp Brilhe | Landing page

Site de uma página para a Limp Brilhe: limpeza de vidros, lustres, pedrarias e pós-obra,
remoção de marca d'água e impermeabilização de vidros. Instagram: @limp_brilhe

## Estrutura

```
Limpbrilhe/
├── index.html      # a página inteira
├── css/style.css   # visual (cores no topo, em :root)
├── js/main.js      # abertura com o rodinho, janela que limpa com o dedo, vídeos, menu
├── assets/img/     # logo (versão redesenhada, trocar pela oficial) e foto do topo (tirada de um vídeo)
└── assets/video/   # 5 reels do Instagram (em parceria com @compact.limp, uso autorizado):
                    #   *-preview.mp4 = 8 s sem som nos cards, *.mp4 = completo no player, *.jpg = capa
```

## Interações

- Abertura: a tela começa embaçada e um rodinho limpa tudo na técnica do "S" (uma vez por visita, com botão "Pular")
- Janela embaçada no topo: o visitante passa o dedo ou o mouse e aparece a foto de um serviço real
- Trabalhos reais: 5 vídeos verticais. No computador rodam ao passar o mouse, no celular roda só o que está na tela; ao tocar, abrem em tela cheia com som

## Como abrir

Abra o `index.html` no navegador. Não precisa instalar nada.
Para ver a abertura de novo, feche a aba ou abra em janela anônima.

## Visual

O site evita os padrões que deixam páginas com cara de feitas por IA: selo acima do título,
rótulos em caixa alta, texto com degradê, cards iguais com ícone, passos numerados, brilhos,
vidro desfocado, bolhas decorativas e frases genéricas. Textos sem termos técnicos.

WhatsApp: (19) 99170-5557 (em `js/main.js`, `WHATSAPP`)

## Pendências (marcadas com TODO no código)

- Logo oficial em alta resolução em `assets/img/`
- Confirmar a descrição dos serviços e as respostas das dúvidas
- Cidade e região de atendimento
