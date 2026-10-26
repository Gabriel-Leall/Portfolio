# Auditoria técnica — linha de base de 12/10/2026

Escopo: estado local do aplicativo em `Portfolio/`, antes da reconstrução visual solicitada. As referências abaixo são do código encontrado no início da auditoria; arquivos e linhas podem mudar durante a implementação. Não houve edição da implementação nesta auditoria. O `git status --short` inicial estava vazio; os documentos e artefatos não rastreados posteriores foram criados durante esta tarefa.

Skill aplicada: `web-design-guidelines`, com as [diretrizes oficiais atuais](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). Inspeção adicional de arquitetura, configuração, dependências e build. A auditoria de conteúdo/design e a verificação visual em navegador são tratadas separadamente.

## Resultado executivo

O build existente funciona. Os problemas prioritários são o diálogo de projetos sem gestão de foco/rolagem, a entrega do conteúdo condicionada a animações demoradas, a aplicação incompleta de movimento reduzido, referências SEO a arquivos inexistentes e a ausência de verificação TypeScript. O projeto possui muita infraestrutura de interface genérica para uma página de portfólio, duas famílias de bibliotecas de animação e dependências com avisos conhecidos.

Não foi demonstrada exploração remota do site estático. Os avisos da árvore de ferramentas não equivalem automaticamente a vulnerabilidades acessíveis no site publicado.

## Validação executada

Diretório de trabalho: `C:\Users\Gabriel\Documents\VsCode\GitHub\Portfolio\Portfolio`.

| Comando | Resultado |
| --- | --- |
| `npm run build` | Falhou inicialmente por permissões do sandbox: esbuild não conseguiu ler diretórios ancestrais/resolver `vite.config.ts`. Não foi falha do código. |
| `node node_modules/vite/bin/vite.js build` | Executado com acesso ampliado após o erro ambiental; exit code 0. Vite 6.3.5, 2.127 módulos transformados, 15,98 s. |
| `node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' audit --json` | Consulta concluída com exit code 1 devido aos avisos. 34 pacotes sinalizados: 2 críticos, 23 altos, 7 moderados, 2 baixos. |
| `node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' audit --omit=dev --json` | Consulta concluída: 1 pacote sinalizado, severidade alta, `lodash`. A captura via PowerShell terminou com exit 0 da serialização; o resultado JSON, e não esse exit code composto, foi usado na análise. |
| `node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' explain lodash --omit=dev` | `lodash@4.17.21`, introduzido por `recharts@2.15.4` e também pela árvore de desenvolvimento do LHCI. |

As primeiras consultas npm dentro do sandbox falharam por acesso à rede/cache; a repetição autorizada retornou os resultados acima. Nenhum `install`, `audit fix` ou alteração de lockfile foi executado.

### Tamanho gerado no build inicial

| Artefato | Bruto | Gzip |
| --- | ---: | ---: |
| JavaScript principal | 494,61 kB | 169,59 kB |
| CSS principal | 102,20 kB | 16,25 kB |
| LightRays | 51,71 kB | 15,58 kB |
| SkillsPlayground | 30,53 kB | 13,66 kB |
| FeaturedProjects | 20,72 kB | 6,38 kB |
| AboutProfile | 6,30 kB | 2,51 kB |

O build também informou que os dados `caniuse-lite` tinham 12 meses. Estes valores são medidas de artefatos, não medições de Lighthouse, LCP, INP ou CLS em navegador. Não foi executado teste automatizado de acessibilidade nem pentest.

## Achados priorizados

Severidade: **P1** compromete acesso ou função central; **P2** é problema relevante de qualidade/confiabilidade; **P3** é manutenção ou melhoria secundária.

### P1 — diálogo de projeto inacessível e conteúdo sem rolagem própria

- `src/components/ProjectModal.tsx:101` bloqueia a rolagem do body.
- `src/components/ProjectModal.tsx:139` e `:143` usam contêineres genéricos, sem `role="dialog"`, `aria-modal`, associação com título, foco inicial, contenção de Tab ou restauração do foco.
- `src/components/ProjectModal.tsx:149` usa `overflow-hidden`, sem altura máxima de viewport e sem área `overflow-y-auto`. Conteúdo extenso pode sair da tela com o body bloqueado.
- `src/components/ProjectModal.tsx:152` contém botão de fechar apenas com ícone, sem nome acessível.

Correção: diálogo nativo ou primitiva acessível, título associado, foco/restauração, Escape, `max-height` e rolagem interna. Preferir links reais para demo/código (`:239`, `:253`). A lógica de Escape existente é positiva, mas não resolve os demais requisitos.

### P2 — atraso artificial e conteúdo dependente de animação

- `src/components/PageLoader.tsx:47` e `:59`: sequência de 0,9 s + 0,3 s independente do carregamento real.
- `src/components/HeroSection.tsx:33`: timeline inicia após 1,8 s em todas as visitas, embora o loader só apareça uma vez por sessão.
- `src/components/HeroSection.tsx:197`, `:204`, `:218`, `:224`: nome, headline, descrição e CTA começam `opacity-0`. A headline só começa aproximadamente 2,2 s após a montagem e o CTA termina aproximadamente 3,8 s após a montagem.

Correção: apresentar conteúdo legível no primeiro frame e aplicar movimento como melhoria progressiva, removendo o bloqueio de abertura. Evitar ocultar informações essenciais antes de confirmar inicialização da animação.

### P2 — movimento reduzido aplicado só parcialmente

- `src/components/HeroSection.tsx:28` anima entrada/parallax sem consultar `prefersReducedMotion`; a preferência só controla os raios em `:88`.
- `src/components/ContactFooter.tsx:29`, `src/components/ProcessTimeline.tsx:25`, `src/components/ui/GlitchText.tsx:29` e `src/components/AboutProfile.tsx:46` não têm guarda de movimento reduzido.
- `src/components/Sidebar.tsx:69` e `src/components/HeroSection.tsx:135` sempre solicitam scroll suave.
- `src/main.css:30`, `:34`, `:139`, `:145` declaram loops sem uma regra global de movimento reduzido no CSS lido.

Correção: centralizar a preferência, preservar todos os elementos visíveis no modo reduzido, interromper loops e usar scroll imediato. Há trabalho positivo existente: raios, cursor e Lenis são desativados parcialmente pela preferência.

### P2 — cursor força renderizações no topo da árvore

- `src/App.tsx:36` guarda a posição no componente raiz.
- `src/App.tsx:60` chama `setCursorPosition` para cada `mousemove`; consequentemente toda a subárvore não memoizada recebe nova renderização.
- `src/App.tsx:82` posiciona o cursor via `left`/`top`.
- `src/components/ui/magnetic-button.tsx:23` também instala um listener global por instância e lê `getBoundingClientRect()` mesmo fora do hover.

Correção: retirar o cursor substituto ou isolá-lo com refs/MotionValues e transform; limitar a lógica magnética ao elemento ativo. Validar custo em aparelho real após a reconstrução.

### P2 — SEO aponta para recursos inexistentes

- `index.html:36` e `:52` referenciam `/images/og-image.png`, ausente em `public/` e no build.
- `public/robots.txt:6` declara `/sitemap.xml`, também ausente.
- `vercel.json:5` encaminha qualquer caminho ao HTML; esses URLs ausentes podem receber HTML em vez da imagem/XML esperados no deploy.

Correção: gerar imagem social e sitemap reais, conferir seus tipos/respostas e restringir fallback conforme a arquitetura final. Confirmar o domínio canônico antes de publicar.

### P2 — idioma anunciado difere do conteúdo inicial

- `index.html:2` declara `pt-br`, enquanto `src/i18n/index.ts:198` inicia em `en`.
- A troca de idioma não atualiza `document.documentElement.lang` no código inspecionado.
- `src/components/Sidebar.tsx:3` mantém os nomes das seções em inglês fixo.

Correção: alinhar idioma inicial e atributo `lang`, sincronizar a mudança e traduzir a navegação. Rotas/URLs por idioma podem ser avaliadas se o objetivo incluir indexação bilíngue.

### P2 — build não verifica os tipos

- `package.json:73` declara só `dev`, `build` e `preview`; `build` chama apenas Vite.
- `package.json` não declara `typescript`, e `node_modules/typescript/bin/tsc` não existe no estado auditado.
- `package.json:46` usa React 18, enquanto `:63` e `:64` usam tipos React 19.
- `tsconfig.json:18` habilita modo estrito, mas não existe comando que execute essa verificação no fluxo de build.

Correção: instalar versão explícita de TypeScript, alinhar os tipos com React, adicionar `typecheck` e resolver os erros reais. Não foi declarado que a base passa TypeScript: esse teste não estava disponível.

### P2 — árvore de dependências com avisos de segurança

- `package.json:70`: Vite 6.3.5. O npm apontou avisos do servidor de desenvolvimento, incluindo leitura arbitrária e bypass de caminhos Windows; a correção proposta é 6.4.4, sem mudança major. [Aviso de leitura por WebSocket](https://github.com/advisories/GHSA-p9ff-h696-f583); [bypass Windows](https://github.com/advisories/GHSA-fx2h-pf6j-xcff).
- `package-lock.json:6118`: `lodash@4.17.21`. A árvore de produção contém `recharts → lodash`, com avisos relacionados a `template`, `unset` e `omit`. [Aviso de injeção em template](https://github.com/advisories/GHSA-r5fr-rjxr-66jc).
- `package.json:60`: LHCI introduz grande árvore de ferramentas com avisos; a sugestão automática de downgrade major do npm não deve ser aplicada sem análise.

Correção: remover dependências não usadas na experiência final, atualizar pacotes necessários e repetir auditoria/build. A existência de `recharts` no manifesto não prova que Lodash entra no bundle entregue: nenhuma chamada vulnerável com dado externo foi identificada na aplicação revisada. O servidor Vite não é parte do site estático publicado.

### P2 — seletor de tema sem fallback e sem foco visível

- `src/components/ui/animated-theme-toggler.tsx:37` chama `document.startViewTransition` incondicionalmente. Em ambientes sem essa API, a troca falha antes de aplicar o tema.
- `src/components/ui/animated-theme-toggler.tsx:75` remove outline e ring sem reposição de `focus-visible`.
- A mutação manual da classe/armazenamento mantém um segundo estado ao lado do `ThemeProvider` em `src/main.tsx:8`.

Correção: usar uma fonte de verdade para tema, feature detection, atualização imediata como fallback e foco claramente visível.

### P2 — sem marco principal ou link de salto na página montada

- `src/App.tsx:96` envolve o conteúdo principal em `div`.
- Não foi encontrado link de salto na árvore montada; a única tag `main` encontrada pertence ao componente genérico de sidebar não usado pela página.

Correção: `<main id="main-content">`, link de salto visível ao foco e navegação por links de âncora. Isso também permite URLs compartilháveis e navegação sem handlers de click.

### P3 — dimensões das imagens não reservadas

- `src/components/FeaturedProjects.tsx:888` passa a imagem sem width/height; o `LaptopMockup` não define aspect ratio da área de imagem.
- `src/components/AboutProfile.tsx:206` e `:224` também omitem dimensões intrínsecas.

Correção: declarar proporções/dimensões adequadas e manter lazy loading abaixo da dobra. O wrapper `ImageWithFallback` já usa `loading="lazy"`, `decoding="async"` e prioridade opcional; não foi medido CLS nesta auditoria.

### P3 — arquitetura e dependências acima da necessidade atual

- `src/components/FeaturedProjects.tsx:18` mistura centenas de linhas de conteúdo bilíngue, links, resultados, renderização e animação no mesmo módulo.
- `package.json:32` e `:41` incluem dois pacotes Lenis; só `lenis` é importado no hook ativo.
- `package.json:37` e `:43` incluem `framer-motion` e `motion`, este com versão `*`. Ambos os caminhos de importação aparecem na aplicação; não se assume duplicação no bundle sem análise do grafo.
- `src/hooks/useGSAP.ts:20` referencia `ctx` dentro do callback que cria `ctx`; é código latente não utilizado, suscetível a acesso antes de inicialização se o hook passar a ser usado.
- `src/hooks/useTextScramble.ts:91` cria intervalos que não são rastreados pelo cleanup da timeline; esse hook também não tem importação ativa encontrada.
- As seções lazy em `src/App.tsx:98`–`:132` são todas montadas de imediato: dividir em chunks não equivale a adiar carregamento até a seção entrar no viewport.

Correção: separar dados tipados de apresentação, manter uma estratégia de animação, retirar código realmente obsoleto após rastrear imports e limitar carregamento de efeitos opcionais. Preservar arquivos do usuário que não pertencem ao trabalho solicitado.

## Pontos positivos e limites

- Aplicação estática sem backend, autenticação, formulário de coleta ou chamadas de API identificadas na árvore principal.
- Imagens locais WebP compactas: a maior imagem pública inspecionada tem aproximadamente 59 kB; as duas versões do currículo estão presentes.
- Contextos GSAP principais têm `revert`, Lenis remove ticker/listeners no cleanup, e LightRays é lazy/condicionado ao desktop.
- Os links sociais existentes em geral incluem `rel="noopener noreferrer"`.
- Há metadados title/description/canonical, robots, viewport responsivo e alternativas textuais nas imagens centrais.
- Nenhum segredo foi identificado na busca textual direcionada. Isso não representa varredura completa de histórico Git nem garantia de ausência de segredos.
- A reconstrução deve ser verificada em desktop/mobile, teclado, movimento reduzido, diálogos, downloads e links. Não são atribuídas notas de acessibilidade ou performance sem medição.
