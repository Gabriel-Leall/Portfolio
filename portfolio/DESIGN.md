---
name: "Gabriel Leal — Portfolio"
description: "Produtos reais, tipografia monumental e sinal azul em um sistema brutalista plano."
colors:
  accent: "#0053c7"
  accent-dark: "#8bbbff"
  signal-blue: "#77adf3"
  signal-blue-dark: "#4477bd"
  paper: "#f2f3f5"
  ink: "#111315"
  muted: "#545d68"
  line: "#111315"
  paper-dark: "#111315"
  ink-dark: "#eef2f6"
  muted-dark: "#a6b1be"
  line-dark: "#718093"
  inverse-light: "#fff"
  preview-caption: "#eef5ff"
  glitch-edge-light: "#edf4ff"
  glitch-edge-deep: "#225ba6"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(112px, min(22.5cqw, 32svh), 400px)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.04em"
    fontVariation: "'wght' 900, 'wdth' 75"
  case-display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(64px, 15vw, 230px)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.04em"
    fontVariation: "'wght' 900, 'wdth' 75"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(56px, 6.4cqw, 112px)"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-0.04em"
    fontVariation: "'wght' 800, 'wdth' 85"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "4.08cqw"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontVariation: "'wght' 850, 'wdth' 80"
  case-headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(26px, 2.6vw, 40px)"
    fontWeight: 850
    lineHeight: 1.12
    letterSpacing: "-0.035em"
    fontVariation: "'wght' 850, 'wdth' 85"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(19px, 1.65vw, 25px)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.015em"
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
  navigation:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(13px, 1.04cqw, 20px)"
    fontWeight: 650
    letterSpacing: "0.015em"
  metadata:
    fontFamily: "Consolas, 'Liberation Mono', monospace"
    fontSize: "clamp(12px, 1cqw, 17px)"
    lineHeight: 1.4
rounded:
  square: "0"
spacing:
  gutter: "3.9cqw"
  gutter-compact: "24px"
  gutter-narrow: "18px"
  tight: "12px"
  small: "18px"
  medium: "24px"
  heading: "28px"
  group: "32px"
  separated: "36px"
  large: "48px"
  section-compact: "64px"
components:
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "10px 14px"
  text-link-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
  language-button:
    textColor: "{colors.muted}"
    rounded: "{rounded.square}"
    padding: "0"
  language-button-selected:
    textColor: "{colors.ink}"
  navigation:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
  project-row:
    textColor: "{colors.ink}"
    padding: "1cqw 16px"
  project-row-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  project-preview:
    backgroundColor: "{colors.paper-dark}"
    rounded: "{rounded.square}"
  preview-band:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.inverse-light}"
    padding: "1cqw 2cqw"
  project-cursor:
    textColor: "{colors.inverse-light}"
  character-portrait:
    rounded: "{rounded.square}"
  contact-link:
    textColor: "{colors.ink}"
    height: "44px"
  footer-contact-action:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.inverse-light}"
    rounded: "{rounded.square}"
    padding: "14px 22px"
    height: "52px"
  next-project-link:
    textColor: "{colors.ink}"
    padding: "24px 0 0"
---

# Design System: Gabriel Leal — Portfolio

## Overview

**Creative North Star: "Projeto em primeiro plano"**

Um índice visual de software com papel frio, tinta densa, tipografia monumental e sinal azul. Capturas reais apresentam os produtos; letras condensadas, linhas fortes e controles quadrados organizam a exploração. A identidade mantém a abertura espaçosa aprovada e uma única apresentação dos cinco projetos, seguida de prática, personagem e contato.

A estética brutalista é plana, com rupturas digitais breves nas interações e movimento coordenado pela rolagem. Archivo conduz a leitura; metadados técnicos usam mono. Os temas claro e escuro preservam composição e geometria. Pausa e movimento reduzido devolvem conteúdo e navegação à apresentação estática.

Atualizado em 2026-10-13 a partir dos estilos e hooks atuais, sob o contrato de `.impeccable/review/brutalist-direction.md` e suas emendas. A alteração de paleta, material, cursor e personagem foi solicitada pelo usuário e substitui esses campos da composição histórica. Esta extração documenta código e decisões confirmadas; a revisão renderizada ainda está pendente e não registra publicação.

**Key Characteristics:**

- Capturas reais como evidência dos produtos, com texto vivo e links nativos.
- Archivo variável monumental e condensada; mono nos metadados técnicos.
- Campos neutros, sinal azul, bordas fortes e controles quadrados.
- Profundidade plana, preview levemente inclinado e personagem sem moldura.
- GSAP e Lenis como melhoria opcional, com foco visível e conteúdo estático acessível.

## Colors

A paleta usa fundos neutros de alto contraste e reserva a única cor de interface para o azul.

### Primary

- **Azul de ação** — accent: hover, foco, seleção de texto, navegação atual e ecos de glitch no tema claro.
- **Azul claro de ação** — accent-dark: o mesmo papel interativo no tema escuro. A área orbital de contato mantém tinta e papel fixos; o diretório abaixo acompanha o tema.
- **Azul de sinal** — signal-blue e signal-blue-dark: segunda faixa decorativa dos cortes de texto em cada tema.
- **Azul fixo do preview** — a faixa de legenda e o preenchimento do cursor usam accent do tema claro nos dois temas; seus textos preservam branco e preview-caption.
- **Arestas do personagem** — signal-blue, glitch-edge-light e glitch-edge-deep: separação temporária das três faixas da imagem. Não são novas superfícies ou cores de conteúdo.

### Neutral

- **Papel frio** — paper: fundo claro e primeiro plano da linha selecionada no tema claro.
- **Tinta** — ink e line: texto e divisórias do tema claro; paper-dark: fundo do tema escuro, do preview e da cena orbital de contato.
- **Contexto claro** — muted: tecnologias e prosa secundária no tema claro.
- **Texto noturno** — ink-dark: primeiro plano sobre a superfície escura.
- **Contexto noturno** — muted-dark: metadados e controles no tema escuro e no contato.
- **Divisão noturna** — line-dark: bordas e separadores sobre fundo escuro.
- **Branco de sinal** — inverse-light: legenda principal e cursor sobre a captura real.
- **Legenda fria** — preview-caption: tecnologias sobre a faixa azul fixa.

**The Blue Signal Rule.** Azul é a única cor cromática da interface; capturas reais e personagem preservam suas próprias cores de conteúdo.

**The Same Grammar Rule.** Ao trocar o tema, preserve hierarquia, composição e geometria; troque fundo, primeiro plano, contexto e linha em conjunto.

As faixas de cor da sidecar usam apenas amostras ordenadas da paleta observada. A fonte não define uma escala tonal autônoma; essas faixas não acrescentam tokens ou valores interpolados.

## Typography

**Display Font:** Archivo variável, com Arial e sans-serif como fallback.
**Body Font:** A mesma Archivo para apresentação, prosa e ações.
**Label/Mono Font:** Consolas, Liberation Mono e monospace para tecnologias, contexto técnico, números e controles de experiência.

A Archivo é self-hosted em `/fonts/archivo-latin.woff2`, com peso variável de 100 a 900, largura de 62% a 125% e `font-display: swap`. Peso, condensação e escala constroem o contraste. Caixa alta caracteriza nome, títulos, navegação, links sociais e rótulos de prática; não transforma toda a prosa em título.

### Hierarchy

- **Display** — nome em duas linhas, com Gabriel e Leal preenchidos por tinta sem contorno, preservando contraste nos dois temas. O frontmatter descreve o desktop; até 900px a escala passa a 27cqw. O h1 possui um nome completo acessível e os glifos visuais são decorativos.
- **Case display** — título condensado com quebra permitida. Nomes longos usam `clamp(40px, 10.8vw, 166px)`; até 700px, títulos comuns usam `clamp(60px, 18vw, 126px)` e longos `clamp(32px, 10.7vw, 75px)`.
- **Headline** — declaração Sobre, forte e condensada. Até 900px usa `clamp(48px, 8cqw, 80px)`; até 600px, `clamp(42px, 11.5cqw, 68px)`. SplitText atua só na camada visual, mantendo um rótulo acessível completo no h2.
- **Title** — nomes do índice. Até 900px usam `clamp(34px, 6.2cqw, 52px)`; até 600px, 38px. O último nome tem uma escala própria menor para caber sem perder o acesso.
- **Case headline** — títulos de contexto, capacidades e tecnologias; a continuação tem rótulo menor e nome grande próprio.
- **Body** — prosa do case em até 65ch. A biografia usa `clamp(18px, 1.3cqw, 22px)`, linha 1.55 e medida de 44ch antes das adaptações compactas.
- **Label** — ações enquadradas, sem condensar o texto até perder legibilidade. A navegação tem peso e tracking próprios, registrados no frontmatter.
- **Metadata** — tecnologias e contexto técnico em mono; os números do índice usam `font-variant-numeric: tabular-nums`.

**The Type Roles Rule.** Construa títulos e prosa com Archivo, peso, largura e escala; reserve a família mono para os papéis técnicos já estabelecidos.

**The Legible Context Rule.** Texto secundário mantém contraste e conteúdo, sem depender do glitch ou da rolagem para ser lido.

## Layout

O container principal estabelece `container-type: inline-size`. A home responde à sua própria largura com cqw; os cases usam vw e clamps. O recuo principal é gutter; até 900px passa a gutter-compact e até 360px a gutter-narrow. O case usa recuo de 3.9vw, passando a 24px até 700px.

A abertura reserva `min-height: calc(100svh - 6.8cqw)` para identidade e introdução, com Gabriel à esquerda e Leal à direita. A introdução reúne três colunas em desktop, duas até 900px e uma até 600px. Projetos e currículo são acessíveis por ações enquadradas na base.

O trabalho tem um estágio próprio: índice de 47%, dock de 49% começando em 46.7% da largura e perspectiva de 1100px. Até 900px, as áreas refluem em preview, índice e indicação para Sobre. O preview tem 88% da largura compacta e 94% até 600px. Todos os nomes continuam âncoras reais; hover, foco e seleção por rolagem escolhem a captura.

A navegação compacta abre uma lista vertical. Até 600px, a biografia vira uma coluna e o diretório do rodapé organiza identidade acima de dois grupos de links. Cases usam pares de colunas para contexto e informação, passando a uma coluna até 700px. Intervalos entre seções são amplos e fluidos; controles, legendas e listas usam os passos de espaçamento registrados.

Sobre tem fundo transparente, grid limitado a 1160px, espaço superior de 32px e intervalo desktop de 36–96px entre personagem e texto. O retrato tem máximo de 360px em desktop e 280px até 600px. O contato é uma cena orbital com convite circular central e diretório posterior. A cena tem 155svh em desktop, 125svh até 900px e 90svh com mínimo de 540px até 600px; o palco é sticky de 100svh em desktop e relativo no mobile. O diretório usa duas colunas, identidade e navegação, e passa a uma até 600px; os dois grupos de links permanecem lado a lado.

A barra de rolagem é visualmente escondida com `scrollbar-width: none` e regras WebKit. O scroll continua utilizável. Lenis coordena roda e âncoras com GSAP quando habilitado; touch e teclado mantêm comportamento nativo. A suspensão temporária da abertura devolve os estilos e a largura anteriores ao concluir.

**The Reachable Work Rule.** Preserve ordem de leitura e acesso a todos os projetos quando a sobreposição desktop vira uma coluna.

## Elevation & Depth

Não há sombras de elevação: o token elevation e o `box-shadow` do preview são `none`. Divisórias de 1–2px, inversão de neutros e campos de cor comunicam agrupamento e estado. A leve rotação do preview (1.5deg) e sua resposta tridimensional ao ponteiro são uma assinatura de movimento, sem restaurar uma sombra difusa.

As três faixas do glitch do personagem usam filtros `drop-shadow` como arestas cromáticas deslocadas. Elas aparecem só no corte e não representam altura, superfície elevada ou moldura.

**The Flat Field Rule.** Use linhas, contraste e inversão para organizar superfícies; mantenha a elevação plana.

## Shapes

Controles e mídias têm cantos retos, com o token square. O preview e as capturas do case recebem bordas de 2px; ações e menu usam bordas de 1px; o diretório de contato usa links sem células ou moldura. Idioma usa sublinhado azul deslizante de 2px, sem moldura. A navegação atual tem um traço retangular azul (14 × 3px), sem indicador circular.

O personagem transparente tem proporção 2:3, `object-fit: contain`, fundo transparente e `border: 0` no seu wrapper. A linha de 2px permanece na legenda, abaixo da figura, e não envolve a arte. O cursor do preview é um SVG com texto Ver/View sem caixa ou selo. A emenda de contato autoriza uma única exceção circular na superfície: o convite central sobre o campo orbital. O cursor magnético usa um anel que se adapta aos controles, sem tornar cantos arredondados um padrão global.

Ícones usam SVG do sistema Lucide. Recortes horizontais pertencem aos ecos de glitch e às máscaras de revelação; não cortam informação permanente da página.

## Components

### Links de ação

Âncoras diretas com texto, seta SVG e moldura de 1px. Usam padding de 10px 14px e altura mínima de 48px na home, com variante compacta de 44px; voltar e ações do case têm mínimo de 44px. Hover da home inverte o primeiro plano sobre azul; ações do case mudam o texto para azul. Foco usa contorno de 2px com offset de 6px.

As rotas mantêm abrir em nova aba e teclas modificadoras. Navegação interna move o foco para o título; o retorno restaura posição e foco da home.

### Seleção de idioma e Navigation

GL é um monograma vetorial de dois contornos, sobre bloco de tinta no cabeçalho e estático junto ao nome no diretório de contato. Navegação é caixa alta com peso 650; o estado atual usa azul e um traço horizontal. PT/EN usa dois botões de 44px, rótulos independentes, `aria-pressed` e sublinhado de 2px que desliza em 320ms. Preferência, idioma do documento e PDF de currículo acompanham a seleção; movimento reduzido troca o indicador imediatamente.

Até 900px o menu usa área de 44 × 44px, `aria-expanded` e `aria-controls`; Escape fecha a lista e devolve foco ao botão. Idioma tem mínimo de 44px e largura mínima de 36px em desktop, passando a 32px na variante compacta.

### Índice e preview de projetos

Linhas com nome monumental, número tabular, tecnologias em mono e separador de 2px. A linha selecionada inverte fundo e todo seu texto entre tinta e papel. A seta aparece em hover ou foco no desktop e permanece visível no compacto. O preview é uma única âncora com borda quadrada, captura real e faixa azul fixa; nome e stack continuam texto vivo.

A troca de captura revela a imagem em 0.65s com `expo.out`, máscara horizontal e escala de 1.065 para 1. Nome e metadados entram em 0.42s com `power3.out` e stagger de 0.045s. O dock acompanha a entrada do estágio com scrub de 0.65s, y 150 em desktop ou 64 em telas compactas e rotação de 8 para 0; a resposta ao ponteiro chega a 5/7 graus nos eixos X/Y. As etiquetas do índice entram em 0.7s com stagger de 0.06s e a curva `portfolio-reveal`. Foco no índice conclui a entrada das etiquetas antes de escolher o preview.

### Cursor magnético e preview

Um único portal acompanha o mouse fino no conteúdo da home e dos cases. Ponto de 5px e anel de 24px seguem o ponteiro; sobre ações o anel se ancora ao centro do controle com 16% do deslocamento do mouse e adapta largura/altura ao alvo, limitadas a 260/80px. `quickTo` usa 0.22s com `power3.out`; a mudança de forma dura 0.28s. O cursor usa azul de ação e azul escuro sobre o disco claro do contato.

Dentro do preview, anel e ponto cedem ao SVG azul com contorno branco e texto branco Ver/View de 14px e peso 750, sem caixa ou selo. Saída, cancelamento, foco, scroll, resize, blur, documento oculto e desativação limpam o estado e restauram o ponteiro nativo. Touch e movimento reduzido mantêm o cursor nativo; o acesso por teclado permanece pelos links sem depender do efeito.

### Detalhe de projeto

Artigo com título acessível, ações reais, captura na proporção original e borda quadrada, contexto, capacidades e tecnologias em listas planas. O próximo projeto usa um link tipográfico amplo. O título entra em 0.85s; figura, contexto, informação e continuação entram em 0.8s ao atingir `top 90%`, com a curva `portfolio-reveal`.

### Personagem e biografia

A arte transparente e sua legenda identificam Gabriel. O contrato mantém base → One Piece → Bleach → base, avançando a cada segunda entrada do mouse durante um glitch de 0.28s, sem timer automático nem repetição em repouso. Imagens decodificadas precedem a troca; pausa, saída e ocultação limpam o efeito. As regras de CSS mantêm touch, ponteiro grosso e movimento reduzido estáticos. Não há moldura ao redor do personagem.

O retrato acompanha a seção de y 70 para −20 com scrub de 0.7s. Parágrafos e linhas de prática entram em 0.72s, y 28 para 0, stagger de 0.075s e `portfolio-reveal`. A declaração Sobre usa SplitText em linhas e palavras, máscaras por palavra, `autoSplit`, `aria: none` e uma camada visual `aria-hidden`; o h2 mantém seu rótulo completo. Após o carregamento da fonte, palavras entram de yPercent 125 e rotação de 4 graus para zero em 0.95s, stagger total de 0.28s e `expo.out`, uma vez em `top 85%`.

### Contato orbital e preferências

A referência The Content Architecture orienta uma cena escura com tipografia circular em torno de um convite central claro; identidade, contato e grupos de links vêm abaixo. O nome Gabriel Leal e termos técnicos existentes compõem o campo decorativo. A chamada continua texto vivo em PT/EN com uma âncora azul para o email confirmado. O círculo é uma exceção local expressamente solicitada, não uma nova linguagem global para controles.

Canvas local desenha no máximo 2300 glifos, DPR limitado a 1.5 e atualização a 30fps. Anéis giram em sentidos alternados, respondem ao ponteiro e se dispersam na saída conforme ScrollTrigger progride. A chegada do disco usa escala 0.83→1 e y 32→0 com scrub de 0.65s. A animação roda somente com cena visível e documento ativo; ResizeObserver e IntersectionObserver, eventos e frame são removidos ao desmontar. SVG decorativo é a alternativa inicial; com movimento reduzido o campo permanece estático e a cena perde o prolongamento de scroll.

O diretório acompanha as cores do tema e reúne GL estático, nome, função profissional, email e dois grupos de links reais: navegação/currículo e redes. Links têm alvo mínimo de 44px. O CTA central tem mínimo de 52px (48px no mobile), padding de 14px 22px (12px 16px no mobile) e troca azul por tinta no hover. Não há newsletter, moldura de células ou faixa final de copyright, voltar ao topo ou pausa. O layout anterior com monograma MorphSVG não é montado no contato atual.

Tema usa um botão de ícone no cabeçalho, alvo mínimo de 44px e nome acessível localizado. Novas visitas usam tema escuro; escolhas salvas continuam respeitadas. `prefers-reduced-motion` mantém conteúdo, foco e navegação estáticos; nenhum controle depende do hover para ser alcançado.

### Movimento e rolagem

A Garganta é uma abertura nativa em SVG baseada no vídeo fornecido pelo usuário em 2026-10-25. Uma fissura horizontal preta forma bordas assimétricas em degraus e faces escuras de laje; a separação evolui para a aproximação através da abertura. Esses perfis substituem os antigos filamentos finos e dentes triangulares. Papel frio externo e máscara vetorial revelam a home sem carregar vídeo, raster ou textura. A fratura começa em 0.08s, a separação em 0.62s e a aproximação/revelação em 1.57s; a sequência termina perto de 2.60s. O vazio preto recua durante a aproximação, em vez de desaparecer cedo. Skip/Escape, cancelamento ao ocultar ou redimensionar, limpeza ao desmontar e prazo fail-open de 4.4s preservam acesso. Durante a abertura, main é inert e o scroll fica suspenso; conclusão restaura estilos, largura e foco. Pausa, movimento reduzido, case e âncoras de seção desviam da abertura. Céu, personagem e título final do clipe não são reproduzidos.

A introdução do nome roda uma vez por visita, perto do topo. Usa `expo.out`: cabeçalho em 0.55s, letras em 1.15s com stagger de 0.035s e início em 0.08s, e introdução em 0.7s com stagger de 0.08s a partir de 0.6s; total de 1.58s. A resposta das letras começa após essa entrada, com `quickTo` de 0.45s, `power3.out`, peso de 900 até 500, deslocamento de até −22px e rotação até 7deg por proximidade. Não se repete ao trocar idioma ou retornar de um case.

ScrollTrigger faz as palavras saírem em sentidos opostos, xPercent −16/+16 em desktop e −6/+6 abaixo de 760px, scrub de 0.5s. Gabriel desloca y até −120 e Leal até −175; abaixo de 760px, até −40 e −54. As rotações são −1.5/+2 graus. O preview responde ao mouse com rotações X/Y de até 5/7deg e `quickTo` de 0.6s. A curva CustomEase `portfolio-reveal` tem pontos `0.05,0.7,0.1,1`.

Ecos de texto usam cortes horizontais azuis de 260ms em um único ciclo stepped por hover fino. ScrambleText acrescenta um corte sobre nomes de projeto com 0.3s, `chars: upperCase`, speed 0.8 e revealDelay 0.04, seguido de fade de 0.08s. Original e nome acessível permanecem estáveis; as sobreposições são decorativas. O letreiro existente tem loop de 30s com `none`, só roda quando visível e o documento ativo, e ajusta temporariamente sua velocidade entre 1 e 3 com resposta de 0.5s.

Lenis usa `autoRaf: false`, `lerp: 0.1`, `smoothWheel: true`, `syncTouch: false` e âncoras com offset de −32px. GSAP ticker envia tempo em milissegundos e o evento scroll atualiza ScrollTrigger. Documento oculto e abertura param o motor; saltos de rota usam `scrollTo` imediato e forçado para cancelar inércia residual. A alternativa nativa permanece disponível se o runtime não carregar.

O gate comum é `motion && !reducedMotion`. Contextos GSAP, SplitText, observadores, listeners, timers e ticker são revertidos ou removidos nas mudanças de preferência e no unmount; Lenis é destruído. CSS também suprime ecos e cursor em movimento reduzido. Cursor e título animado carregam por lazy/Suspense somente com movimento ativo; durante o carregamento ou em falha, ficam o ponteiro nativo e o título estático. Conteúdo, foco e links permanecem utilizáveis na apresentação estática.

## Do's and Don'ts

### Do:

- **Do** use Archivo self-hosted em títulos e prosa, reservando mono aos papéis técnicos existentes.
- **Do** mantenha o azul como único acento da interface e preserve as cores das capturas e do personagem.
- **Do** construa agrupamento com campos neutros, linhas de 1–2px e inversão de estados selecionados.
- **Do** mantenha controles e mídia quadrados, personagem sem moldura e cursor Ver/View sem caixa.
- **Do** preserve texto vivo, âncoras nativas, foco visível, nomes de ação e acesso por teclado.
- **Do** mantenha conteúdo legível com pausa ou movimento reduzido e desfaça os runtimes ao desativá-los.
- **Do** adapte a sobreposição em preview, índice e Sobre nas telas compactas, com todos os projetos alcançáveis.

### Don't:

- **Don't** reintroduza violeta, lilás, rosa ou gradientes como paleta da interface.
- **Don't** adicione sombras de elevação, cantos arredondados ou selos fixos ao preview.
- **Don't** envolva o personagem transparente em uma moldura.
- **Don't** esconda o ponteiro nativo no touch, com movimento reduzido ou quando o cursor personalizado estiver inativo; reserve Ver/View ao preview.
- **Don't** transforme ecos decorativos em texto acessível duplicado, glitches em loops de repouso ou revele informações apenas por hover.
- **Don't** invente chips, inputs, indicadores de status ou resultados de produto ausentes na fonte.
- **Don't** transforme a escala monumental da abertura em um tamanho global para toda a prosa ou todo título.
- **Don't** confunda barra de rolagem escondida com bloqueio permanente de scroll.
