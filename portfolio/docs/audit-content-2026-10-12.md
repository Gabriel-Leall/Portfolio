# Auditoria de conteúdo, UX e acessibilidade

Data: 12 de outubro de 2026. Escopo: aplicação em `Portfolio/`, antes da reconstrução visual. Público confirmado: recrutadores e equipes de produto. Direção desejada: experiência experimental e imersiva, com imagens de direção antes da implementação.

Esta auditoria registra o estado anterior à reconstrução. As referências de linha abaixo correspondem aos arquivos examinados nessa etapa e podem mudar depois das alterações. A análise foi somente leitura, baseada em código, assets e extração dos links e textos dos currículos. Os comportamentos indicados como riscos derivados da implementação ainda exigem reprodução no navegador. Não houve alteração das fontes da aplicação nesta tarefa.

## Método e fontes

- Skill `web-design-guidelines`: `C:/Users/Gabriel/.agents/skills/web-design-guidelines/SKILL.md`.
- [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), consultadas em 12/10/2026.
- Skill `pdf`: `C:/Users/Gabriel/.codex/plugins/cache/openai-primary-runtime/pdf/26.1007.11041/skills/pdf/SKILL.md`.
- Código dos componentes, recursos bilíngues, metadados HTML e inventário de `public/`.
- `public/cv-pt.pdf` e `public/cv-en.pdf`: conteúdo textual e hyperlinks extraídos com `pypdf`. Não foi realizada revisão visual dos currículos e nenhum PDF foi editado.

Os URLs abaixo são endereços encontrados nas fontes existentes. Esta auditoria não certifica disponibilidade pública atual, propriedade das contas ou estado funcional dos serviços externos. Endereços claramente substituíveis/placeholder foram separados dos demais.

## Inventário a preservar

### Identidade e posicionamento

- Nome público: Gabriel Leal. Nome nos currículos: Gabriel Leal de Lima.
- Posicionamento da página: Front-End Developer / Desenvolvedor Front-End.
- Posicionamento nos currículos: Junior Front-End Developer & UI/UX Designer.
- Biografia: curiosidade sobre como produtos digitais são construídos; transformação de ideias em produtos funcionais e interativos; uso de React, Next.js e TypeScript; atenção a performance, escalabilidade, UI/UX e acessibilidade.
- Interesses pessoais informados: vôlei e RPG de mesa.
- Não há depoimentos, premiações ou resultados de clientes verificáveis anexados à aplicação.

Fontes: `src/i18n/index.ts:18-26,39-47,109-118,137-145`; os dois currículos.

### Contatos

| Canal | Endereço encontrado | Evidência |
| --- | --- | --- |
| Email | `gabrielleal7153@gmail.com` | `AboutProfile.tsx:16`, `ContactFooter.tsx:116,199`, ambos PDFs |
| GitHub | `https://github.com/Gabriel-Leall` | `AboutProfile.tsx:9`, `ContactFooter.tsx:127`, ambos PDFs |
| LinkedIn a padronizar | `https://www.linkedin.com/in/gabriel-llim/` | `ContactFooter.tsx:132` e hyperlink dos dois PDFs |
| X | `https://x.com/brook_kael` | `AboutProfile.tsx:15`, `ContactFooter.tsx:137` |
| Portfolio/canonical | `https://gabriel-leal.vercel.app/` | `index.html:25,41,56`, ambos PDFs |

`AboutProfile.tsx:12` contém um LinkedIn diferente, `https://linkedin.com/in/gabriel-leal`. A concordância entre footer e ambos os currículos sustenta padronizar `/in/gabriel-llim/`.

### Currículos

- Português: `/cv-pt.pdf`, 59.755 bytes.
- Inglês: `/cv-en.pdf`, 58.095 bytes.
- Download atual escolhe o documento por idioma em `AboutProfile.tsx:292-303`.
- Os documentos citam Sistemas de Informação na UFPI desde 06/2022 e certificado profissional Google UX iniciado em julho/2025, ambos com indicação de andamento. Não promover essas informações a diploma ou certificado concluído.
- Também aparecem experiência na Juá, projetos AAA Picos, Naurial, Barber-Schedule e Axis. Esses itens não equivalem a novos cases prontos para a página: não há, para todos eles, assets e links no dataset atual.
- Há métricas nos PDFs que diferem das do site. Nenhuma deve ser tratada como validação independente de impacto sem documentação adicional.

### Projetos

O dataset da página contém cinco projetos, cada um com versões PT/EN em `src/components/FeaturedProjects.tsx:18-635`.

#### Syndesis

- ID: `syndesis`; categoria atual: `KNOWLEDGE WORKSPACE`.
- Workspace visual para explorar conexões entre notas Markdown, conceitos e referências em um canvas.
- Os arquivos permanecem no computador; a organização fica armazenada no navegador. A descrição enfatiza privacidade e controle sobre o conhecimento.
- Não inferir sync em nuvem, edição bidirecional de serviços externos ou writeback para a pasta conectada.
- Stack declarada: React, TypeScript, Astro, Tailwind CSS, IndexedDB.
- Imagem, thumbnail e banner: `/images/syndesis.webp`.
- Demo PT/EN: `https://syndesis.vercel.app/`.
- Repositório PT/EN: `https://github.com/Gabriel-Leall/Syndesis`.
- As listas de resultados, métricas, responsabilidades e processo estão vazias; não preencher com números ou credenciais inventados.

Referências: `FeaturedProjects.tsx:20-121`; links em `49-50,94-95`.

#### Kodan

- ID: `kodan`; categoria atual: `DEVELOPER TRAINING`.
- Preparação para entrevistas técnicas por desafios de leitura de código: análise de trechos, identificação de problemas e explicação do raciocínio.
- O texto informa feedback das respostas e acompanhamento da evolução por ELO.
- Stack declarada: Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Better Auth.
- Imagem, thumbnail e banner: `/images/kodan.webp`.
- Demo PT/EN: `https://kodan.vercel.app/inicio`.
- Repositório PT/EN: `https://github.com/juninhos-comunidade/kodan`.
- As listas de resultados, métricas, responsabilidades e processo estão vazias.

Referências: `FeaturedProjects.tsx:125-244`; links em `156-157,209-210`.

#### Bon

- ID: `bon`; categoria atual: `DESKTOP PRODUCTIVITY`.
- Aplicativo desktop que reúne tarefas, hábitos, Pomodoro, notas e calendário num workspace personalizável.
- O texto informa widgets, interface React com Tauri/Rust, persistência local SQLite e painel rápido por atalho global.
- Stack declarada: React, TypeScript, Tauri, Rust, SQLite, Tailwind CSS.
- Imagem, thumbnail e banner: `/images/bon.webp`.
- Repositório PT/EN: `https://github.com/Gabriel-Leall/Bon`.
- Não há demo web no dataset. Não criar um botão de demo sem destino existente.
- As listas de resultados, métricas, responsabilidades e processo estão vazias.

Referências: `FeaturedProjects.tsx:248-356`; repositório em `278,326`.

#### Naurial

- ID e título: `Naurial`; categoria atual: `EDUCATIONAL PLATFORM`.
- Assistente de estudos com IA personalizada. O texto inglês é mais amplo, mencionando professor, parceiro de estudos e mentor de carreira.
- Stack declarada nas tags: React, TypeScript, Tailwind, Next.js, Figma, Supabase, AI.
- Imagem, thumbnail e banner: `/images/Naurial.webp`.
- Demo PT: `https://naurial.vercel.app/pt`.
- Demo EN: `https://naurial.vercel.app/en`.
- Repositório nos dois idiomas: `https://github.com/Gabriel-Leall/naurial.git`.
- O papel de liderança Front-End e design UX/UI também aparece nos currículos; o tamanho de uma equipe de três pessoas aparece somente no dataset EN.
- Evitar publicar métricas de performance/negócio sem método, período ou documento de suporte.

Referências: `FeaturedProjects.tsx:360-508`; links em `423-424,490-491`.

#### BarberSchedule

- ID: `barber-schedule`; título: `BarberSchedule`; categoria atual: `SAAS APPLICATION`.
- Plataforma de agendamento para barbearias. Os currículos descrevem disponibilidade de horários, seleção de serviços, marcação e gestão de atendimentos.
- Stack declarada nas tags: React, Node.js, TypeScript, MongoDB, Stripe, Socket.io. São declarações do dataset, sem validação técnica do repositório externo nesta auditoria.
- Imagem, thumbnail e banner: `/images/barberschedule_thumb_large.webp`.
- Demo do registro EN: `https://barber-schedule-saas.vercel.app/`.
- Repositório do registro EN: `https://github.com/Gabriel-Leall/Barber-Schedule.git`.
- O registro PT possui demo divergente e repositório placeholder; usar como base os endereços do registro EN ao corrigir a inconsistência.
- Evitar reaproveitar resultados quantitativos como prova comercial.

Referências: `FeaturedProjects.tsx:511-634`; endereços EN em `556-557`; endereços PT defeituosos em `610-611`.

### Assets locais

| Arquivo em `public/images/` | Bytes | Uso no baseline |
| --- | ---: | --- |
| `syndesis.webp` | 21.720 | Projeto Syndesis |
| `kodan.webp` | 59.106 | Projeto Kodan |
| `bon.webp` | 42.188 | Projeto Bon |
| `Naurial.webp` | 8.450 | Projeto Naurial |
| `barberschedule_thumb_large.webp` | 12.280 | Projeto BarberSchedule |
| `myphoto.webp` | 27.828 | Retrato da seção Sobre |
| `naurial2.webp` | 26.024 | Não referenciado nos componentes examinados |
| `image.webp` | 24.136 | Não referenciado nos componentes examinados |

O uso atual de imagens dos projetos é um mockup de laptop que pode reduzir a área efetiva de leitura do produto. Na reconstrução, avaliar crops maiores dos assets reais antes de gerar representações substitutas.

## Achados prioritários

### P1 — Modal sem suporte adequado para teclado e leitor de tela

`src/components/ProjectModal.tsx:139-154`: o painel não possui `role="dialog"`, `aria-modal`, título associado, foco inicial, contenção de foco nem restauração do foco no acionador. O botão de fechar em `152-157` não tem nome acessível. O fechamento por ESC existe em `111-117`, mas não resolve entrada e circulação de foco.

Correção: dialog nativo ou primitiva acessível, título associado, botão Fechar rotulado, foco dentro do diálogo e retorno ao acionador. Verificar Tab, Shift+Tab e ESC no navegador.

### P1 — Risco de conteúdo cortado no modal mobile

`src/components/ProjectModal.tsx:101-108,139-160`: o body fica sem scroll; o painel é centralizado com `overflow-hidden`, sem altura máxima ou rolagem interna. Conteúdo longo pode exceder a viewport e deixar ações inacessíveis. Achado derivado do código; reproduzir com os cases mais longos em tela pequena.

Correção: limitar altura pela viewport, permitir `overflow-y:auto` no diálogo, usar contenção de scroll e testar orientação horizontal.

### P1 — BarberSchedule usa destino placeholder em português

`src/components/FeaturedProjects.tsx:610-611`: o repositório é `https://github.com/username/barber-schedule`; a demo PT aponta para `https://barberschedule-demo.vercel.app`. Os equivalentes EN em `556-557` são diferentes e identificam o projeto/autor existentes. Unificar os destinos a partir desses registros, verificando disponibilidade externa antes da publicação.

### P2 — LinkedIn aponta para duas identidades diferentes

`src/components/AboutProfile.tsx:12` diverge de `src/components/ContactFooter.tsx:132`. Os hyperlinks dos dois currículos concordam com o footer. Padronizar `https://www.linkedin.com/in/gabriel-llim/`.

### P2 — Não há navegação de seções no mobile

`src/components/Sidebar.tsx:74`: navegação oculta abaixo de `lg`. `src/App.tsx:93` monta apenas a Sidebar; o componente `Navigation.tsx` existente não é montado. Usuários mobile precisam atravessar a página para chegar ao contato ou retornar às seções.

Correção: navegação visível e compacta, âncoras reais e menu mobile se necessário.

### P2 — Projetos horizontais não acompanham a navegação por teclado

`src/components/FeaturedProjects.tsx:674-690,775-782`: os projetos são deslocados horizontalmente com scroll pinado; cards fora do índice ativo ficam translúcidos e recebem `pointer-events:none`, mas seus botões permanecem no fluxo de Tab. Não há sincronização do card/foco nem controles alternativos do carrossel. O foco pode chegar a controles fora da área visível.

Correção: preferir uma sequência de projetos acessível no fluxo da página ou implementar controles e sincronização explícitos. O fallback com movimento reduzido precisa continuar permitindo acesso a todos os projetos.

### P2 — Movimento reduzido aplicado apenas a parte da experiência

`src/components/HeroSection.tsx:88` condiciona os raios, mas as animações de entrada, parallax e scrub em `28-86` continuam. `FeaturedProjects.tsx:659-698`, `AboutProfile.tsx:46-147,186-195`, `SkillsPlayground.tsx:139-150,175-184` e `ContactFooter.tsx:29-112` também animam sem essa preferência. Não há regra global de redução no CSS ativo.

Correção: planejar uma versão estática completa; condicionar animação em cada mecanismo utilizado e testar mudança de preferência. A existência do hook `useReducedMotion` em partes da aplicação não significa cobertura global.

### P2 — Idioma do documento não acompanha o conteúdo

`index.html:2` fixa `lang="pt-br"`; `src/i18n/index.ts:198` inicia em inglês. `src/components/HeroSection.tsx:138-141` troca apenas i18next e não atualiza o documento ou persiste a escolha. Recarregar retorna a EN.

Correção: resolver preferência inicial, persistir seleção, atualizar `document.documentElement.lang` e manter strings completas nos dois idiomas.

### P2 — Metadados anunciam arquivos ausentes

`index.html:36,52`: Open Graph e Twitter usam `/images/og-image.png`, ausente de `public/images/`. `public/robots.txt:6` anuncia `/sitemap.xml`, ausente do inventário público.

Correção: gerar assets reais e sitemap que reflita a publicação final; confirmar URLs servidas antes de publicar.

### P2 — Falta landmark principal e acesso direto ao conteúdo

`src/App.tsx:96`: o conteúdo principal está em um `div`; não há `<main>` nem link para pular navegação.

Correção: usar landmark principal com ID e skip link visível quando recebe foco.

### P2 — Retrato perde descrição acessível depois de carregar

`src/components/AboutProfile.tsx:206-229`: a imagem com `alt` fica `display:none`; após o carregamento, o elemento visível é um canvas sem nome ou fallback textual. O alt transitório ainda é genérico, `Profile`.

Correção: manter a imagem semântica com descrição significativa; efeitos decorativos devem ser separados e escondidos das tecnologias assistivas.

### P2 — Resultados quantitativos inconsistentes e sem método associado

`src/components/FeaturedProjects.tsx:435-448` declara Lighthouse 98, FCP 0,8 s, +75% no carregamento e +60% em quizzes para Naurial. Os currículos descrevem 15% de redução no carregamento, sem fornecer a mesma metodologia ou cenário. `FeaturedProjects.tsx:568-583` declara 50+ estabelecimentos, -15% procura e +10% engajamento para BarberSchedule.

Não há documentação de medição, período, amostra ou origem vinculada aos resultados no projeto examinado. O registro de um número no código ou currículo não constitui validação independente. Manter conteúdo descritivo e escopo de contribuição; solicitar evidência antes de tratar métricas como prova.

## Outros ajustes para a reconstrução

- `FeaturedProjects.tsx:854-871` e `ProjectModal.tsx:239-265`: navegação externa implementada como botão + `window.open`; usar links reais para preservar abrir em nova aba, copiar endereço e semântica de navegação.
- `Sidebar.tsx:3-9`, `HeroSection.tsx:173`, `FeaturedProjects.tsx:799-800,828`, `ContactFooter.tsx:245`: trechos permanecem em inglês na versão portuguesa.
- `AboutProfile.tsx:246` e `ContactFooter.tsx:185`: nomes acessíveis dos links sociais também ficam em inglês.
- `ContactFooter.tsx:114-121`: erro ao copiar email aparece apenas no console. Disponibilizar `mailto` claramente e feedback de sucesso/erro em região de status.
- `HeroSection.tsx:33`: atraso fixo de 1,8 s na entrada mesmo quando o loader já foi visto. Tornar o conteúdo principal visível sem espera artificial.
- `SkillsPlayground.tsx:55`: hover substitui o nome legível da tecnologia por caracteres aleatórios. O efeito remove a informação justamente durante a inspeção.
- `main.css:58-67`: scrollbar escondida globalmente. Isso reduz percepção da extensão e posição na página.
- `AboutProfile.tsx:184`: retrato com largura fixa de 320 px, em container com padding horizontal, pode ultrapassar viewport de 320 px. Validar a menor largura suportada.
- `FeaturedProjects.tsx:887-891`: imagens sem dimensões explícitas ou lazy loading no ponto de uso; reservar espaço e adiar imagens fora da primeira tela.
- `Sidebar.tsx:98-137`: navegação representada por botões, com rótulos dependentes de hover/estado ativo e sem `aria-current`. Usar âncoras e estado identificável.
- `ProjectModal.tsx:174-176`: a seção “Objetivo Alcançado/Achievement” contém resumos de funcionalidades, não resultados medidos. Um título descritivo como “Sobre o projeto” ou “A proposta” evita sugerir evidência que não foi fornecida.
- `PageLoader.tsx:78-97`: nome aparece em três camadas de texto sem esconder duplicatas decorativas de tecnologias assistivas.

## Direção editorial para recrutadores e equipes de produto

1. Mostrar rapidamente nome, disciplina e uma frase específica sobre o trabalho.
2. Priorizar os cinco projetos existentes com imagens amplas do produto, descrição curta, papel sustentado pelas fontes, tecnologias e links funcionais.
3. Diferenciar produto local/desktop de experiência web; Bon não deve ganhar uma demo web fictícia e Syndesis deve manter a descrição de armazenamento local.
4. Usar a exploração visual para valorizar o trabalho, mantendo navegação, leitura, foco e contato imediatos.
5. Exibir currículo por idioma e contatos consistentes, sem criar dados de disponibilidade, localização, prêmios ou impacto não fornecidos.
6. Revisar imagens de direção antes de codificar, conforme a decisão atual do usuário.

## Verificações posteriores necessárias

- Inspeção visual desktop e mobile, incluindo 320 px e orientação horizontal.
- Fluxo completo por teclado, skip link, foco dos projetos, modal e fechamento/restauração de foco.
- Preferência por movimento reduzido com todos os projetos e contatos acessíveis.
- Alternância PT/EN, persistência, `lang` e downloads de ambos currículos.
- Validação de demos/repositórios/contatos externos e dos arquivos OG/sitemap na publicação final.
- Confirmação de que conteúdo e controles permanecem disponíveis quando animações não executam.

Essas verificações ainda não são resultados desta auditoria de código; devem constar da validação da reconstrução.
