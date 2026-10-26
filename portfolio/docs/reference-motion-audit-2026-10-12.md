# Auditoria da referência de movimento

Referência escolhida pelo usuário: [Mike Wilcock](https://mikewilcockdesign.com/). Data: 12/10/2026. Objetivo: orientar os efeitos e a apresentação de projetos no portfólio de Gabriel Leal, destinado a recrutadores e equipes de produto.

## Método e limites

Inspeção da home em Chromium no navegador do aplicativo, viewport desktop de 1440 × 1000 e mobile emulado de 390 × 844, scroll vertical, arraste da galeria no desktop, leitura da árvore de acessibilidade e estilos computados de elementos visíveis. Inspeção da página `/work/fun-arena`. No mobile foram exercitados pausa e menu. Os scripts públicos referenciados pela home foram analisados separadamente em `reference-motion-source-2026-10-12.md`. Capturas em `reference-screenshots/`.

Não foi feita medição de FPS, Core Web Vitals, consumo de GPU ou validação em aparelho físico. Valores de implementação propostos abaixo são pontos de partida; não são parâmetros extraídos da referência. Imagens da referência são evidência da auditoria, não assets licenciados para o site de Gabriel.

## O que a referência faz

### Abertura tipográfica

Nome em duas linhas, uma alinhada à esquerda e outra à direita, dominando o viewport. Navegação fixa pequena; texto de apresentação e ação de ver os projetos ocupam a base. A escala e o desalinhamento geram a identidade antes dos efeitos. O texto permanece HTML selecionável.

### Tipografia reagindo ao ponteiro

A análise dos scripts confirma letras individuais de uma fonte variável que respondem à proximidade do cursor. Esse é o efeito central da abertura; não deve ser confundido com um título animado por scrub de scroll. Uma tradução GSAP pode usar setters rápidos para a variação tipográfica, com limite de atualização e apenas ponteiro fino. Mudanças no peso/largura da fonte também podem custar layout; não tratar isso como operação gratuita de GPU.

### Lista de projetos com prévia

Os projetos são links em linhas grandes, com nome, ano, tipo e ação. Uma área de prévia acompanha a seção à direita; o projeto em evidência muda enquanto a lista atravessa a tela. A fonte pública confirma prioridade de hover e foco, seguida da linha mais próxima do centro do viewport. A prévia sai do dock para seguir o cursor e gira até ±12° conforme a velocidade; depois retorna. Há múltiplas imagens do app e vídeos de scroll dos sites. O cursor circular indica a ação de ver o projeto. A captura mostra uma interface por vez, preservando a compreensão.

No mobile, a prévia passa para uma região larga acima das linhas. A inspeção mediu 335 px de largura por linha e não encontrou overflow horizontal da página (`scrollWidth: 375` dentro de viewport de 390 px com scrollbar). O botão foi acionado e mudou de “Pause motion” para “Play motion”. Ele pausa o autoplay dessa prévia, não necessariamente todo o movimento do site.

### Galeria de detalhes

A seção “Up close” traz um trilho horizontal de capturas grandes com legendas e convite para arrastar ou rolar. O arraste foi exercitado no desktop: a transformação do trilho mudou de `translateX` aproximado de -1082 px para -2441 px. O `skewX` também mudou de sentido durante a interação. O wrapper usa `touch-action: pan-y`, preservando a rolagem vertical enquanto a exploração lateral é tratada pelo componente.

Isso não é a mesma apresentação de projetos pinada horizontalmente que existe hoje no portfólio de Gabriel. A referência alterna uma lista vertical simples e um trilho visual complementar.

### Texto de apresentação ligado ao scroll

Uma declaração em letras grandes progride de texto escuro para texto claro conforme a rolagem avança; palavras de destaque mudam o registro visual. A seção mede cerca de 1500 px no desktop inspecionado, com elemento sticky via CSS. A fonte anima opacidade das palavras de 0,14 a 1; a cor final de spans inspecionados é `rgb(237, 234, 228)` e o destaque final usa azul. O efeito sustenta a leitura em vez de repetir revelação em todas as seções.

### Página do projeto

O case abre com nome grande, definição clara de cliente, papel, plataforma e ano, links externos e imagem principal. Seguem contexto, o que foi feito, interfaces em detalhe, decisões do produto, tecnologia e histórico. As informações têm progressão editorial e demonstram o trabalho. Para Gabriel, campos sem evidência devem ser omitidos, não preenchidos com clientes, métricas ou papéis inventados.

## Tradução proposta para GSAP

| Movimento | Papel no novo portfólio | Implementação proposta | Alternativa acessível |
| --- | --- | --- | --- |
| Nome variável respondendo ao cursor, entrada em máscara | Estabelecer identidade no primeiro viewport | Timeline GSAP para entrada; setter limitado para `font-variation-settings` por proximidade; medir layout e limitar a ponteiro fino | Nome estático legível; fade breve opcional |
| Prévia de projeto em destaque | Associar nome e produto real | Coluna sticky com seleção por ScrollTrigger; `quickTo` para resposta ao ponteiro; trocar imagens com fade | Imagem por projeto no mobile; foco do link seleciona a prévia |
| Galeria com arraste e inércia | Explorar telas e detalhes | Scroll nativo/Pointer Events com controle GSAP; `quickTo` para translação e skew limitado por velocidade; avaliar Draggable somente se necessário | Scroll horizontal nativo, botões anterior/próximo e links sem depender de arraste |
| Letreiro em movimento | Conectar identidade a repertório técnico | Loop GSAP reaproveitado, velocidade moderada, direção coerente com scroll | Linha estática com a mesma informação |
| Texto progredindo na rolagem | Mostrar pensamento sobre desenvolvimento | Timeline com `scrub`, spans decorativos por palavra, texto completo acessível | Texto completo com contraste normal desde o início |
| Entrada de imagens dos cases | Preservar continuidade e ritmo | `clip-path` retangular ou transform discreto; uma sequência principal | Imagens visíveis sem espera |
| Navegação entre cases | Manter continuidade entre índice e detalhe | Transição curta; navegação real funcionando independentemente da animação | Navegação direta e foco no título da página |

Base técnica: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [gsap.matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/) e [gsap.context](https://gsap.com/docs/v3/GSAP/gsap.context/), documentação consultada nesta sessão. A referência utiliza uma implementação própria; esta tabela é a tradução pretendida para GSAP, não uma descrição de GSAP encontrado nela. O autor confirma o motor próprio, com Lenis como única dependência de movimento, na seção “The engine” do [case do próprio portfólio](https://mikewilcockdesign.com/work/portfolio).

## Limites e cuidados da própria referência

O menu mobile abre com `aria-expanded=true`, nome do botão “Close” e links rotulados. Não foi validado um ciclo completo de Tab/Shift+Tab. O botão de menu mede 38 px de altura, abaixo do alvo de 44 px que pretendo usar no portfólio de Gabriel. O efeito de texto começa com baixo contraste e não deve esconder a biografia de quem selecionou movimento reduzido. A pausa da prévia tem escopo local; a tradução deve oferecer uma opção de movimento mais clara.

Cliques internos na sessão inicial não concluíram a navegação: o URL permaneceu na home e o console consultado não apresentou erro. A navegação direta para o href do case funcionou. O código tem interceptação de cliques e uma condição `busy` que suprime cliques durante a transição; isso é uma hipótese coerente, mas não foi demonstrado como causa da ocorrência. Não certificar as transições de rota como funcionalmente aprovadas só porque existem no bundle.

## Direção que passa a orientar as imagens

- Identidade grande e legível; experiências de movimento desenvolvidas em torno do trabalho real.
- Lista vertical dos cinco projetos com uma prévia generosa, seguida de exploração de capturas.
- Cases com contexto, papel confirmado, decisões, tecnologias, imagens e links reais.
- Sobre, currículo e contato profissional no lugar de ofertas de Shopify/Webflow e “start a project”.
- Uma linguagem consistente de duração, aceleração e interrupção. Evitar somar efeito de glitch, canvas de retrato, raios WebGL, cursor com rerender global e scroll pinado da versão atual.

## Requisitos para a implementação

Usar `gsap.matchMedia` para desktop, mobile e movimento reduzido. Limpar timelines e ScrollTriggers com `gsap.context().revert()`. Não ocultar conteúdo essencial até terminar um loader. Limitar `will-change` aos elementos efetivamente animados, pausar loops fora da tela e quando a aba estiver oculta, e atualizar posições após fontes/imagens mudarem o layout. O teste deve cobrir teclado, mobile, interrupção de arraste, redução de movimento e leitura dos cases. Não prometer 60 fps sem medição.
