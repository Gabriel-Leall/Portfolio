# Auditoria da implementação pública — Mike Wilcock

Data: 12/10/2026. Referência: <https://mikewilcockdesign.com/>.

Este relatório analisa HTML, CSS e JavaScript públicos, por leitura HTTP. A revisão visual no navegador está documentada separadamente. Arquivos baixados ficam em `docs/reference-source/` apenas como evidência de auditoria; não são componentes ou assets para redistribuir no portfólio.

## Conclusão principal

A versão pública auditada usa **Next.js, React, Lenis e um motor de movimento próprio**, combinando `requestAnimationFrame`, Web Animations API (`Element.animate`) e CSS. **Não foi encontrada evidência de GSAP ou seus plugins nos scripts públicos carregados nas quatro rotas auditadas.**

O próprio [estudo de caso deste site](https://mikewilcockdesign.com/work/portfolio) descreve Lenis como a única dependência de movimento e explica que o restante usa um loop de atualização e a API de animação do navegador. A declaração do autor é consistente com os scripts. O [toolkit geral](https://mikewilcockdesign.com/llms.txt) inclui GSAP, mas essa lista não demonstra que GSAP implementa os efeitos deste portfólio.

Portanto, implementar uma experiência inspirada nesta referência com GSAP é uma **tradução técnica proposta**, não uma reprodução de uma implementação GSAP encontrada nela. Essa conclusão se limita às páginas e ao snapshot abaixo, não a todos os sites ou trabalhos do autor.

## Escopo e versões verificadas

As rotas abaixo responderam HTTP 200 e referenciaram os mesmos 11 chunks JavaScript:

- `/` — home, projetos selecionados, trilho visual, statement.
- `/work` — índice de projetos.
- `/work/fun-arena` — estudo de caso de aplicativo.
- `/work/portfolio` — estudo de caso da própria referência.

| Tecnologia | Evidência encontrada | Fonte pública |
| --- | --- | --- |
| Next.js 16.3.3 / App Router | `window.next` informa versão e `appDir: true` | `32fr__pwd5sar.js` |
| React DOM 19.3.0 canary | renderer declara `19.3.0-canary-cbb046ab-20260731` | `32fr__pwd5sar.js` |
| Turbopack | bootstrap e chunks `/_next/static/immutable/` | HTML e `turbopack-0-k80e1ek_m7i.js` |
| Lenis 1.3.26 | versão exportada para `window.lenisVersion` e construtor Lenis | `1_3ge1xpasuvl.js`, offset aproximado 15109 |
| Archivo variável | `@font-face`, eixos largura/peso, itálico | `2-_5b41mpezs6.css` |
| Geist Mono | classe de fonte e uso de `--font-mono` | HTML e CSS |
| Payload CMS | atribuição explícita no estudo de caso e referências de mídia | `/work/portfolio` |

GSAP, ScrollTrigger, SplitText, InertiaPlugin e `registerPlugin` não aparecem nos 11 chunks. Ocorrências de `draggable` correspondem ao atributo HTML/React e a `draggable: false`; não são o plugin Draggable.

As versões representam a versão servida na data da auditoria, não escolhas recomendadas para o projeto de Gabriel.

## Fontes públicas exatas

Os nomes abreviados de arquivos neste relatório têm o prefixo público:

`https://mikewilcockdesign.com/_next/static/immutable/chunks/`

Fontes principais:

- [Controlador de movimento e Lenis — 1_3ge1xpasuvl.js](https://mikewilcockdesign.com/_next/static/immutable/chunks/1_3ge1xpasuvl.js)
- [DockedWork, UpClose e componentes — 0j-pp68jxl0wx.js](https://mikewilcockdesign.com/_next/static/immutable/chunks/0j-pp68jxl0wx.js)
- [CSS — 2-_5b41mpezs6.css](https://mikewilcockdesign.com/_next/static/immutable/chunks/2-_5b41mpezs6.css)
- [Framework/renderer — 32fr__pwd5sar.js](https://mikewilcockdesign.com/_next/static/immutable/chunks/32fr__pwd5sar.js)
- [Estudo de caso e explicação do motor](https://mikewilcockdesign.com/work/portfolio)
- [Descrição pública de rotas e toolkit](https://mikewilcockdesign.com/llms.txt)

Os outros chunks carregados são `2scn0vl4d6twm.js`, `04lyawbuxb6rm.js`, `turbopack-0-k80e1ek_m7i.js`, `3e6ztrz7zvoap.js`, `0f1lzkwp1yfmt.js`, `1va367sn9-_dt.js`, `0c0hxoamwjsbw.js` e `1f7-lt23wv4hh.js`.

Offsets indicados são posições de caracteres no arquivo minificado salvo, para localizar evidências sem fingir que há linhas de código-fonte original disponíveis. O manifesto local registra hashes dos arquivos de evidência.

## Comportamentos confirmados pela implementação

### 1. Rolagem suave e relógio compartilhado

`MotionRoot` instancia Lenis com `lerp: .085`, `smoothWheel: true`, `wheelMultiplier: 1` e `autoRaf: false`. Um único `requestAnimationFrame` chama `lenis.raf(time)`, calcula a velocidade suavizada e atualiza cursor, tipografia, marquees, revelações, parallax e componentes inscritos.

O delta temporal é normalizado pela referência de 60 Hz e limitado. Assim, os coeficientes de interpolação e inércia consideram o tempo entre frames. Medidas são recalculadas em uma fase própria, após resize, ResizeObserver e carregamento de fontes. Elementos fora da viewport e diferenças pequenas frequentemente evitam novas escritas.

Evidência: `1_3ge1xpasuvl.js`, `start()` (~35100), `measure` (~40500), `tick` (46302). Trecho de configuração: `lerp:.085,smoothWheel:!0,wheelMultiplier:1,autoRaf:!1`.

### 2. Hero tipográfico: reação ao cursor, entrada por letras

O nome usa spans por caractere, marcados com `data-k="420"` e `data-in`. A proximidade do cursor determina uma intensidade suavizada, que altera os eixos da fonte: largura de aproximadamente 70 a 125 e peso de 800 a 260. O motor calcula o espaço disponível da linha e limita a expansão para evitar que o texto ultrapasse a composição.

A entrada inicial das letras move `translateY(115%)` até zero, duração de 1300 ms, atraso inicial de 80 ms e stagger de 55 ms. A transformação contínua de largura/peso é **orientada pela proximidade do cursor**. O scroll determina visibilidade/posição, mas não é a fonte principal da deformação das letras do hero.

Evidência: HTML `/`, `1_3ge1xpasuvl.js`, função `kineticFrame` (~50800), `stretchLine`, `enterPage` (43294). A biblioteca SplitText não é necessária nem foi encontrada: a marcação já vem segmentada no HTML.

### 3. Marquee: velocidade responde à rolagem

O marquee se desloca continuamente para a esquerda e acelera com o módulo da velocidade de scroll. A velocidade base é .7 px por unidade de frame normalizada, acrescida de `min(.35 × abs(velocidade), 30)`. A inclinação usa `-.25 × velocidade`, limitada a ±10 graus. A posição retorna ao intervalo ao cruzar metade da largura duplicada.

O cálculo retorna imediatamente quando a seção está fora da viewport ou reduced motion está ativo. Outras fileiras usam uma variação desse mecanismo, com direção, velocidade e skew configurados por atributos.

Evidência: `1_3ge1xpasuvl.js`, `marqueeFrame` (~51700), `rowsFrame` (~52000). Trecho curto: `.7+Math.min(.35*Math.abs(this.vel),30)`.

### 4. Selected work: lista grande + mídia acoplada

O componente `DockedWork` liga títulos de projetos à imagem em uma coluna com CSS sticky. No desktop, o projeto ativo normalmente é a linha cujo centro fica mais próximo do centro da viewport. Hover tem prioridade, e o foco por teclado também seleciona o projeto e ajusta a posição de scroll.

O título ativo interpola largura aproximadamente 88→118, peso 700→400 e opacidade .5→1. O contador, a descrição da plataforma e uma barra de progresso acompanham a seleção. Ao selecionar um projeto, a capa anima de escala 1.08 para 1 em 1200 ms. A mídia interna torna-se visível depois de 600 ms.

O preview desktop é um portal de 320 × 400 px em `position: fixed`; ele interpola entre a posição do dock sticky e a posição do cursor. Ao entrar em hover, o levantamento leva 600 ms; ao retornar ao dock, 900 ms. A rotação segue a velocidade horizontal do cursor, limitada a ±12 graus, com interpolação de posição.

Evidência: `0j-pp68jxl0wx.js`, `DockedWork` (~27700–38100); CSS `.selected-work__dock` (46640) e `.selected-work__card` (48559). Não há morph do layout por FLIP encontrado; o acoplamento é calculado manualmente com posições e escala.

### 5. Selected work: autoplay e pausa

Quando o projeto está visível, ativo, com movimento permitido e sem pausa do usuário, o preview reproduz um vídeo ou alterna screenshots internas. Cada slot inicia com 1400 ms mais 450 ms multiplicados pelo índice do slot; as trocas seguintes ocorrem a cada 1400 ms, com fade de 700 ms.

O vídeo anterior é pausado quando o projeto muda, sai da área elegível ou a pausa é ativada. A animação interna só é habilitada após o atraso de 600 ms da seleção. Slots inativos têm seu próximo instante de troca reiniciado.

O botão exibido como **Pause motion / Play motion** controla esse autoplay de preview. Ele não interrompe Lenis, marquee, deformação tipográfica ou cursor global. O estado usa React e uma variável de módulo (`m`), preservando a escolha em remontagens durante a sessão SPA; não foi encontrado armazenamento persistente dessa escolha em localStorage/sessionStorage.

Evidência: `0j-pp68jxl0wx.js`, `DockedWork`, configuração `m=!1`, efeito `m=v`, condição `!w.current&&!I`, ciclo `1400`, fade `duration:700`.

### 6. Selected work em dispositivos pequenos

O breakpoint principal é 700 px. A coluna de preview torna-se sticky no alto, o frame muda para 16:9 e o card seguidor do cursor desaparece. A escolha do projeto prioriza a linha mais visível e central no espaço útil entre o preview e a base da viewport. O swipe horizontal acima de 40 px troca slides; deslocamentos menores que 8 px são tratados como clique para abrir o projeto ativo.

Isso é uma composição específica para mobile, não uma simples redução do layout desktop. O foco por teclado permanece nos links reais da lista.

Evidência: `0j-pp68jxl0wx.js`, media query `(max-width: 700px)`, seleção `mob`, listeners `pointerup`/`pointercancel`; CSS próximo do offset 49900.

### 7. Up close: trilho horizontal com drag e inércia

O trilho `UpClose` combina deslocamento baseado na passagem vertical da seção com um offset controlado por drag. `pointerdown`, `pointermove`, `pointerup` e `pointercancel` implementam o arrasto. Depois de soltar, a velocidade é atenuada por `Math.pow(.92, deltaNormalizado)`; o trilho interpola posição com fator .2 e recebe skew limitado a ±3 graus por velocidade de scroll/drag.

O movimento fica limitado ao overflow real do trilho. Arrastos maiores que 6 px impedem que a soltura abra involuntariamente um projeto. Fora da viewport, o frame retorna sem atualizar o trilho. Foco visível ajusta o offset para expor o item selecionado.

Em ponteiro coarse ou reduced motion, o CSS conserva rolagem horizontal nativa e scroll snap. Draggable e InertiaPlugin não foram encontrados; esses comportamentos são implementação manual.

Evidência: `0j-pp68jxl0wx.js`, `UpClose` (~42800–45500), e CSS `.up-close__wrap` (50487). Trecho: `s.v*=Math.pow(.92,t)`.

### 8. Statement: sticky e revelação de palavras

A seção ocupa 150vh no desktop, 130vh no mobile. Seu conteúdo é CSS sticky por 100vh. O progresso é calculado no intervalo entre topo da seção e altura da seção menos a viewport. Cada palavra marcada `data-w` aumenta opacidade de .14 para 1, sequencialmente, com um fator de distribuição 1.1.

Em reduced motion o controlador trata o progresso como 1 ao atualizar a seção. A declaração textual acessível permanece como texto contínuo `sr-only`; os spans visuais são `aria-hidden`.

Evidência: HTML `/`, CSS `.statement` (51507), e `1_3ge1xpasuvl.js`, `pinFrame` (~53700). O pin é CSS sticky; não é ScrollTrigger pin.

### 9. Revelações e seções de case study

Revelações usam IntersectionObserver, com margens de entrada de -8%, -12% ou -15% conforme o tipo. Elementos simples entram com opacidade e deslocamento de 48 px por 1100 ms. Palavras mascaradas entram de 110% por 1200 ms e stagger de 40 ms, incluindo variação tipográfica. Contadores usam easing exponencial durante 1800 ms.

O controlador também contempla três tipos de scroll scrub: mídia, galeria e timeline. A mídia abre uma máscara inset, reduz escala de 1.3 para 1 e modifica largura/peso do título. A galeria converte scroll vertical em deslocamento horizontal, contador e barra; a timeline cresce uma linha e ativa etapas. A presença desses mecanismos está confirmada no código compartilhado; a combinação concreta por página depende da marcação `data-scrub` daquela rota.

Evidência: `1_3ge1xpasuvl.js`, `setUpReveals`, `revealIn` (~44800), `measureScrub` (~42200), `scrubFrame` (52401).

### 10. Navegação entre páginas e intro

Um listener global de clique em fase capture intercepta links internos comuns. Ele preserva cliques com modificadores, `_blank`, download, origens externas e algumas rotas técnicas. Para um link interno elegível, chama `preventDefault`; se não houver transição em andamento, inicia `go()`. Cliques durante `busy` são impedidos sem disparar outra navegação. Na mesma rota, o clique solicita voltar ao topo.

`go()` exibe uma cobertura de barras verticais animadas por Web Animations API: 520 ms por barra, stagger de 40 ms. Letras do título entram por 650 ms, com stagger de 16 ms e modificação de fonte variável. O conteúdo anterior se desloca -10vh e perde opacidade. A chamada de navegação ocorre depois que a cobertura se estabelece; a rota nova tem uma entrada de 1000 ms, e as barras saem em 600 ms com stagger de 40 ms.

A transição registra informação temporária em `sessionStorage` na chave `mw-transition`, para retomar a cobertura se necessário. Há timeout de espera pela rota de 12 segundos. O loader inicial usa `mw-intro` para rodar uma vez por sessão, oferece clique/Escape para acelerar a animação em 4× e cancela listeners/animações no cleanup.

Evidência: `1_3ge1xpasuvl.js`, `onClick` (~39300), `go` (~55800), `resumeTransition` (~57300), `uncover` (~58200), `runIntro` (~59210); script inline do HTML.

**Implicação para a revisão visual:** URL imóvel depois de um clique isolado não demonstra ausência de link nem uso de GSAP. O código realmente intercepta navegação e pode adiar ou suprimir um clique enquanto está ocupado. A ocorrência exata deve ser reproduzida no browser; a fonte, sozinha, não identifica por que um clique específico não concluiu.

## Acessibilidade e falhas: mecanismos encontrados, limites

- Reduced motion é consultado no início do controlador; nesse estado ele não instancia Lenis e desabilita transformações interativas, marquees e revelações animadas. AutoplayVideo tem seu próprio listener de mudança de preferência e considera saveData.
- O controlador global conserva o valor inicial de `reduce`; não foi encontrado nele um listener global que reconstrua todos os efeitos quando a preferência do sistema muda durante a sessão. A adaptação do portfólio deve usar media queries reativas, como `gsap.matchMedia`.
- Preview de imagem tem `pointer-events: none`; a operação e o foco estão nos links reais. Existe skip link, texto contínuo para leitores de tela, menu com `inert` e tratamento de foco.
- A folha CSS prevê fallback para ausência de motion-ready e algumas falhas; o bootstrap possui timeouts de 6/8 segundos para conteúdo/intro. Isso não substitui validar todos os estados sem JavaScript e com erro de carregamento.
- O botão Pause motion é local ao autoplay de projeto. Para Gabriel, o rótulo deve corresponder ao escopo real, ou a pausa deve controlar todo o movimento decorativo.
- Não foram medidos FPS, consumo de memória, Lighthouse ou Core Web Vitals nesta auditoria de fonte. Métricas divulgadas pelo estudo de caso são declarações do autor, não medições independentes.

## Tradução proposta para o portfólio com GSAP

| Intenção da referência | Implementação recomendada para Gabriel | Limite de reprodução |
| --- | --- | --- |
| Letras variáveis interativas | fonte variável escolhida para a nova identidade + `quickTo` ou ticker com leituras de layout separadas | validar reflow/custo de font-variation; desktop fine pointer |
| Entrada de nome por máscara | timeline GSAP com spans semânticos e stagger | nome e cargo visíveis imediatamente no fallback |
| Lista de projetos + preview acoplado | CSS sticky; ScrollTrigger calcula seleção; `quickTo` para follower; timeline para troca de mídia | foco tem prioridade; hover não é o único acesso |
| Marquee com impulso de scroll | tween em loop + velocidade baseada em `ScrollTrigger.getVelocity()` | pausa fora de viewport e em reduced motion |
| Trilho explorável | CSS scroll snap no mobile; desktop com GSAP e drag opcional | evitar impor scroll horizontal à leitura de evidências de trabalho |
| Statement progressivo | sticky curto + timeline com `scrub` e opacidade por palavra | texto sempre legível; remover pin/revelação em reduced motion |
| Abertura de case study | máscara de mídia + escala em timeline ScrollTrigger | screenshots reais dos projetos e explicação de decisões técnicas |
| Transição de páginas | timeline GSAP com navegação após cobertura, cleanup e retorno de foco | não atrasar contato ou CV; impedir estados `busy` permanentes |

GSAP core + ScrollTrigger são suficientes para grande parte da direção. Lenis é opcional, não pré-requisito para o resultado. Draggable/Inertia e SplitText só devem ser adicionados se a implementação final precisar desses comportamentos. `gsap.context`/`useGSAP`, cleanup, `ScrollTrigger.refresh` após imagens/fontes e `gsap.matchMedia` devem fazer parte da implementação React.

A direção visual deve manter o foco definido por Gabriel: recrutadores e equipes de produto. A apresentação experimental precisa expor nome, função, projetos, papel no trabalho, raciocínio técnico e acesso ao contato, sem depender de completar toda uma sequência animada.
