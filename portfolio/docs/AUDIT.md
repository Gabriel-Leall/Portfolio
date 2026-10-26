# Auditoria consolidada do portfólio

Data: 12/10/2026. Projeto: Gabriel Leal. Público: recrutadores e equipes de produto.

**Auditoria e reconstrução implementadas.** O usuário escolheu “Projeto em primeiro plano” nas imagens de direção. O novo site segue o comp aprovado com tipografia variável, índice dos cinco projetos, preview interativo, galeria horizontal e páginas individuais de projeto. Este documento preserva o diagnóstico anterior e registra abaixo as correções e validações do redesign.

## Relatórios e evidências

| Documento | Escopo |
| --- | --- |
| [Auditoria técnica](audit-technical-2026-10-12.md) | Arquitetura, build, dependências, acessibilidade no código e SEO |
| [Conteúdo e UX](audit-content-2026-10-12.md) | Projetos, contatos, currículos, assets, idiomas e navegação |
| [Referência: inspeção visual](reference-motion-audit-2026-10-12.md) | Mike Wilcock em desktop/mobile, interações observadas e adaptação proposta |
| [Referência: implementação pública](reference-motion-source-2026-10-12.md) | HTML/CSS/JS das quatro rotas, mecanismos de movimento e limites da evidência |

As referências de arquivo/linha dos relatórios descrevem o baseline anterior à reconstrução. A auditoria do projeto combina leitura de código e validação de build/dependências; a revisão visual documentada é da referência. Não atribuir ao projeto testes de navegador feitos somente na referência.

## Resultado técnico do baseline

- O build Vite terminou com exit code 0 após resolver uma restrição ambiental de acesso do sandbox. Foram processados 2.127 módulos; o JavaScript principal gerado mede 494,61 kB bruto / 169,59 kB gzip e o CSS, 102,20 kB / 16,25 kB gzip.
- A auditoria npm sinalizou 34 pacotes: 2 críticos, 23 altos, 7 moderados e 2 baixos. Com `--omit=dev`, restou um pacote de severidade alta: `lodash`, alcançado por `recharts`. Não foi demonstrada exploração remota ou uso de função vulnerável com dados externos.
- O fluxo de build não executa TypeScript: faltam compilador/script de verificação, e React 18 está associado a tipos React 19. Não há resultado de typecheck aprovado.
- Não foram medidos Lighthouse, Core Web Vitals, FPS ou consumo de GPU, nem executados pentest ou teste automatizado de acessibilidade. Tamanhos de bundle não são notas de performance.

## Achados prioritários

| Prioridade | Evidência no baseline | Ação necessária |
| --- | --- | --- |
| P1 | Modal sem semântica de diálogo, nome no botão Fechar ou gestão de foco (`ProjectModal.tsx:139-157`) | Diálogo acessível, foco inicial/contido/restaurado e Escape |
| P1 | Modal bloqueia body e não oferece altura máxima/scroll interno (`ProjectModal.tsx:101-108,149`) | Tornar conteúdo e ações alcançáveis em telas pequenas; reproduzir risco de corte |
| P1 | BarberSchedule PT usa repositório `github.com/username/...` e demo divergente (`FeaturedProjects.tsx:610-611`) | Unificar com destinos existentes no registro EN e verificar os links antes da publicação |
| P2 | Hero inicia oculto e mantém atraso de 1,8 s mesmo sem loader (`HeroSection.tsx:33,197-224`) | Conteúdo legível no primeiro frame; movimento como melhoria progressiva |
| P2 | Movimento reduzido cobre apenas parte de raios/cursor/Lenis | Versão estática completa, sem pin, loops ou scroll suave obrigatório |
| P2 | Sidebar some no mobile; projetos horizontais mantêm controles fora da tela no Tab | Navegação por âncoras e acesso aos cinco projetos por teclado/mobile |
| P2 | Documento anuncia PT enquanto conteúdo inicia EN; escolha não persiste | Sincronizar idioma, `lang`, textos e downloads |
| P2 | OG image e sitemap declarados não existem; fallback pode servir HTML nesses URLs | Criar recursos válidos e verificar resposta/tipo no deploy |
| P2 | LinkedIn diverge entre Sobre e footer; métricas de Naurial divergem dos PDFs | Padronizar contato confirmado; retirar números sem evidência da apresentação de resultados |
| P2 | Cursor atualiza estado na raiz a cada mousemove; listeners magnéticos globais | Isolar efeitos, usar refs/transform e medir custo após implementar |
| P2 | Tema chama `startViewTransition` sem fallback e remove foco visível | Feature detection, fonte única de estado e foco identificável |
| P2 | Conteúdo sem `<main>`/skip link; retrato visível em canvas sem descrição | Semântica, acesso direto e imagem informativa acessível |

Detalhamento, linhas e correções sugeridas: [técnica](audit-technical-2026-10-12.md#achados-priorizados) e [conteúdo](audit-content-2026-10-12.md#achados-prioritários). Os riscos de corte/foco fora da tela são sustentados pelo código e precisam de reprodução no navegador; não foram apresentados como teste visual concluído.

## Inventário preservado para a reconstrução

| Projeto | Conteúdo disponível | Destinos existentes no dataset |
| --- | --- | --- |
| Syndesis | Canvas de notas Markdown/referências; arquivos locais e organização no navegador | [Demo](https://syndesis.vercel.app/) · [Código](https://github.com/Gabriel-Leall/Syndesis) |
| Kodan | Leitura, diagnóstico e explicação de código, feedback e evolução por ELO | [Demo](https://kodan.vercel.app/inicio) · [Código](https://github.com/juninhos-comunidade/kodan) |
| Bon | Desktop com tarefas, hábitos, Pomodoro, notas, calendário, widgets e SQLite local | [Código](https://github.com/Gabriel-Leall/Bon); sem demo web no dataset |
| Naurial | Assistente de estudos com IA personalizada | [PT](https://naurial.vercel.app/pt) · [EN](https://naurial.vercel.app/en) · [Código](https://github.com/Gabriel-Leall/naurial.git) |
| BarberSchedule | Disponibilidade, serviços e agendamento para barbearias | [Demo do registro EN](https://barber-schedule-saas.vercel.app/) · [Código do registro EN](https://github.com/Gabriel-Leall/Barber-Schedule.git) |

- Identidade: Gabriel Leal; Front-End Developer, com UI/UX também informado nos currículos. Biografia e cinco projetos têm conteúdo PT/EN. Não inventar cargos, clientes, prêmios, resultados ou datas de conclusão.
- Contatos: `gabrielleal7153@gmail.com`, [GitHub](https://github.com/Gabriel-Leall), [LinkedIn confirmado nos dois PDFs](https://www.linkedin.com/in/gabriel-llim/) e [X](https://x.com/brook_kael).
- Assets: cinco screenshots principais de projetos, retrato `myphoto.webp`, duas imagens adicionais (`naurial2.webp`, `image.webp`) e os dois currículos (`cv-pt.pdf`, `cv-en.pdf`). Manter os arquivos e a seleção de currículo por idioma.
- Não inferir SaaS/nuvem/sincronização para Bon ou Syndesis. Os links acima foram inventariados; a auditoria de conteúdo não certificou disponibilidade pública atual de todos eles.

Inventário completo, stacks, dados biográficos e inconsistências: [conteúdo e UX](audit-content-2026-10-12.md#inventário-a-preservar).

## Referência e tradução proposta para GSAP

A referência [Mike Wilcock](https://mikewilcockdesign.com/) foi inspecionada em desktop e mobile. A fonte pública examinada usa Next.js/React, Lenis e um motor próprio com `requestAnimationFrame`, Web Animations API e CSS. **Não foi encontrada evidência de GSAP nos 11 chunks das quatro rotas auditadas.** Usar GSAP aqui é uma adaptação técnica proposta, não a reprodução da biblioteca usada na referência.

| Intenção observada | Tradução proposta | Condição de acesso |
| --- | --- | --- |
| Nome com fonte variável reagindo à proximidade do cursor | Timeline de entrada + `quickTo`/ticker com medições separadas | Ponteiro fino; nome estático e legível no fallback |
| Lista vertical com preview sticky, foco/hover e card seguidor | CSS sticky + seleção por ScrollTrigger + `quickTo` para posição | Foco seleciona projeto; composição própria para mobile |
| Marquee acelerado pela rolagem | Tween em loop + `ScrollTrigger.getVelocity()` | Pausa fora da tela/aba e em movimento reduzido |
| Trilho de detalhes com drag e inércia | Scroll nativo no mobile; GSAP/Pointer Events no desktop | Botões, teclado e links sem depender de arrastar |
| Declaração com revelação por palavras | Sticky breve + timeline com `scrub` | Texto contínuo acessível e contraste normal no fallback |
| Abertura de case e continuidade entre páginas | Máscaras/transform em timeline curta | Links e leitura independentes da animação; foco no título |

Core + ScrollTrigger cobrem grande parte da proposta. Lenis é opcional; SplitText, Draggable e Inertia só entram se a direção escolhida exigir. Usar `gsap.matchMedia`, cleanup com `gsap.context().revert()` e refresh após fontes/imagens. Não copiar assets da referência ou prometer 60 fps sem medição.

## Inconsistências e limites reconciliados

- O relatório de conteúdo aponta ausência de lazy loading **no ponto de uso** das imagens. O relatório técnico e o wrapper `ImageWithFallback` confirmam que `loading="lazy"` e `decoding="async"` já são aplicados. O achado válido restante é reserva de dimensões/proporção; não registrar lazy loading globalmente ausente.
- O botão “Pause motion” da referência pausa o autoplay do preview, não todo o motor. No novo site, rótulo e alcance da pausa devem coincidir.
- Alguns cliques internos da referência não concluíram a navegação; abrir o href diretamente funcionou. O código tem interceptação e estado `busy`, mas isso não prova a causa daquela ocorrência nem aprovação funcional das transições.
- A direção foi posteriormente aprovada pelo usuário. A fonte da referência continua sendo evidência de sua implementação, e não autorização para copiar seus assets ou atribuir a ela GSAP.

## Correções e validação da reconstrução

| Área | Implementação e evidência |
| --- | --- |
| Projetos e foco | O modal foi substituído por `/work/<id>`, com títulos focáveis, retorno ao projeto de origem e links nativos. Syndesis e BarberSchedule foram conferidos em mobile; Bon não oferece uma demo web inexistente. |
| Hierarquia e conteúdo | Cinco projetos reais na abertura, screenshots existentes, contexto/funcionalidades/stack nos cases e contatos confirmados. Métricas sem evidência foram retiradas. |
| Mobile e teclado | Menu com `aria-expanded`, Escape e foco restaurado; link de salto ao conteúdo; navegação entre cases e retorno à lista verificados no navegador. A galeria também oferece setas e scroll nativo. |
| Idioma e tema | PT/EN, `lang` do documento e currículo correspondem à seleção; idioma e tema persistem após reload, verificado no navegador. |
| Movimento | GSAP e ScrollTrigger carregados dinamicamente, contexto com cleanup, tipografia por proximidade, preview, inércia e marquee. Ponteiro real verificado: letras próximas variam de peso 900 para aproximadamente 698 e sobem cerca de 7 px; o preview respondeu com posição e rotação 3D limitadas. Arraste real verificado: scroll horizontal de 0 para 1025 px durante o gesto, estabilizado em 834 px após inércia/snap, sem abrir o case e com estado de arraste limpo. Pausa manual restaura estilos e desliga scroll suave. Preferência do sistema observada por `matchMedia`; o sistema operacional não foi alterado para emular essa preferência. |
| Fonte e imagens | Archivo variável hospedada localmente com licença OFL; dimensões reservadas nas imagens e lazy loading fora da abertura. Proveniência registrada para os nove rasters existentes. |
| Dependências | Redução do conjunto de bibliotecas para as utilizadas no novo site. `npm audit --json` terminou com exit code 0 e zero vulnerabilidades de produção ou desenvolvimento na validação final. |
| Build e TypeScript | `npm run build` executa `tsc --noEmit` em modo strict e Vite. Ambos passaram; JavaScript principal 183,23 kB / 58,83 kB gzip, GSAP 70,70 kB / 27,91 kB gzip, ScrollTrigger 43,66 kB / 18,16 kB gzip e CSS 23,22 kB / 5,77 kB gzip. Os chunks de movimento são separados; somá-los ao principal é necessário para estimar o carregamento com movimento habilitado. |
| SEO | Título, descrição, canonical, OG/Twitter com PNG próprio de 1200×630, robots e sitemap com home e cinco cases. A aplicação continua sendo uma SPA: cases não possuem HTML próprio pré-renderizado. |

As capturas reais estão em `.impeccable/review/`: desktop 1440×960 solicitado (bitmap 1425 px de largura sem scrollbar), mobile 390×844 solicitado (bitmap final 390 px), largura útil 1265 px e dois cases mobile. O gate de reprodução da abertura passou com 85%; o gate desktop responsivo passou com 83%, sem override. A revisão independente identificou a expansão do grid mobile além do gutter; a correção com `minmax(0,1fr)` foi pontuada como resolvida no Verdict Pass, com `disposition: ship` no escopo desse ajuste. Esses números medem a comparação com o comp e não representam notas de acessibilidade ou desempenho.

Não foram medidos Lighthouse, Core Web Vitals, FPS ou consumo de GPU. Não foram executados pentest nem certificação WCAG. Links externos foram corrigidos conforme as fontes preservadas; disponibilidade atual de todas as demos e recursos SEO na URL pública ainda depende de verificação quando houver publicação autorizada. O build e as verificações aqui são locais.
