# Texto atualizado para colar no documento entregável

Este arquivo contém a revisão das seções que zeraram (4, 8, 9, 10, 11) no `Entrega_do_Aluno.pdf`
original. Copie o conteúdo relevante para o seu Word/documento final, ajustando o que fizer
sentido para o seu jeito de escrever — o objetivo aqui é te dar a base correta (com evidência
real), não substituir sua redação.

**Antes de copiar**: substitua `<SEU-USUARIO>` e `<URL-DO-DEPLOY>` pelos valores reais depois
que você fizer o deploy (ver README.md, seção "Deploy").

---

## 4. Modelagem e Arquitetura da Interface (revisado)

*(mantenha o texto original de Front-End/Back-End/Banco de Dados/Serviços Externos — o que
faltava era o mapa de navegação e os estados, adicionados abaixo)*

### Mapa de Navegação

O fluxo de telas do protótipo segue a estrutura abaixo (ver `docs/diagramas/fluxo-navegacao.html`,
exportado como imagem na página seguinte):

Home → Cardápio → Carrinho → Checkout/Pagamento → Pedido Confirmado → Acompanhamento

Telas de apoio, acessíveis a qualquer momento pelo menu: Login, Cadastro, Meus Dados (controle
LGPD), Painel Administrativo (Gerente), Política de Privacidade.

### Estados da interface

Cada tela que depende de dados assíncronos trata três estados, implementados como componentes
reutilizáveis (`LoadingState`, `EmptyState`, `ErrorState` em `src/components/`):

| Tela | Carregando | Vazio | Erro |
|---|---|---|---|
| Cardápio | spinner + "Carregando cardápio..." | "Nenhum produto disponível/encontrado" | "Não foi possível carregar" + botão Tentar novamente |
| Carrinho | — | "Seu carrinho está vazio" + atalho para o cardápio | — |
| Checkout | "Processando pagamento..." | — | "Pagamento recusado" + possibilidade de tentar de novo |
| Acompanhamento | "Buscando status do pedido..." | "Nenhum pedido em andamento" | — |

A página Cardápio inclui um seletor "Simular estado" para permitir demonstrar os três estados
sem depender de uma falha real — usado exclusivamente para fins de evidência acadêmica.

### Consistência visual

Todos os botões, cartões de produto, campos de formulário e estados reutilizam os mesmos
componentes (`ProductCard`, `.btn-primary`/`.btn-secondary`, `.form-field`) definidos em
`src/styles/global.css`, garantindo os mesmos paddings, cores e tipografia em todas as telas.

### Multicanalidade

A interface foi construída mobile-first (RNF01) e testada em três breakpoints (`global.css`):
até 640px (smartphone/totem), 640–960px (tablet) e acima de 960px (desktop/web). O seletor de
unidade na Home simula o cenário de múltiplas lojas físicas atendidas pelo mesmo front-end.

---

## 8. Wireframes e Estrutura de Interface (revisado)

O protótipo funcional substitui os wireframes estáticos — todas as telas abaixo estão
implementadas e navegáveis em `<URL-DO-DEPLOY>`:

- **Home** (`/`): banner, seletor de unidade, destaques carregados dinamicamente, atalho para o
  programa de fidelidade.
- **Cardápio** (`/cardapio`): busca, filtros (categoria, promoção, mais vendido, vegetariano),
  grade de produtos, estados de carregando/vazio/erro.
- **Carrinho** (`/carrinho`): lista de itens com quantidade e observação, cupom de desconto
  (`NORDESTE10`), resumo de valores.
- **Checkout** (`/checkout`): seleção de forma de pagamento, consentimento LGPD, estado de
  processamento, fluxo de recusa com nova tentativa (RN01–RN03 do UC01).
- **Acompanhamento** (`/acompanhamento`): linha do tempo do pedido (recebido → preparo → saiu/
  disponível → finalizado), atualizando automaticamente.
- **Painel Administrativo** (`/dashboard`): gestão de cardápio/promoções e relatórios simples
  (ticket médio, itens em promoção).
- **Meus Dados** (`/meus-dados`): edição de dados, revogação de consentimento e exclusão de
  conta — RF/LGPD.

*(Insira aqui prints de cada tela, ou apenas o link, já que o protótipo é navegável.)*

---

## 9. LGPD e Privacidade (revisado)

As medidas descritas anteriormente estão implementadas nas telas a seguir (não apenas
declaradas em texto):

- **Consentimento explícito**: componente `ConsentCheckbox` (`src/components/ConsentCheckbox.jsx`),
  reaproveitado no Cadastro e no Checkout. O envio do formulário é bloqueado com mensagem de erro
  se o usuário não marcar o aceite (ver Cenário de Teste 10).
- **Política de Privacidade**: página dedicada (`/politica-de-privacidade`), linkada no rodapé e
  no próprio checkbox de consentimento.
- **Controle de dados**: página **Meus Dados** (`/meus-dados`) permite editar nome, revogar
  consentimento e solicitar exclusão da conta.
- **Minimização**: o CPF é armazenado no objeto do usuário mas nunca exibido por completo em
  telas públicas; dados de cartão não são coletados pelo formulário (o pagamento é apenas
  simulado — RN03 do UC01).
- **Segurança**: nota explícita na tela de Checkout informando que dados bancários não são
  armazenados internamente.

---

## 10. Entrega Técnica (revisado — SUBSTITUA os links abaixo pelos reais)

## Opção Escolhida
Desenvolvimento Front-End utilizando React (Vite).

## Tecnologias Utilizadas
React, React Router, JavaScript, HTML5, CSS3, Vite.

## Estrutura do Projeto
```
src/
  components/
  pages/
  context/
  services/
  styles/
docs/
  diagramas/
```

## Deploy
Link do sistema: `<URL-DO-DEPLOY>`

## Repositório
`https://github.com/<SEU-USUARIO>/raizes-do-nordeste`

---

## 11. Plano de Testes (revisado — como reproduzir cada cenário no protótipo)

| Cenário | Como reproduzir no protótipo |
|---|---|
| 01 — Cadastro com dados corretos | `/cadastro`, preencher todos os campos válidos + aceitar termos → redireciona para Home logado |
| 02 — Cadastro com e-mail inválido | `/cadastro`, digitar e-mail sem `@` → mensagem de erro inline, envio bloqueado |
| 03 — Login válido | `/login`, usar `rhuan@teste.com` / `123456` → acesso liberado |
| 04 — Login inválido | `/login`, senha errada → "E-mail ou senha inválidos." |
| 05 — Adicionar ao carrinho | `/cardapio`, clicar "Adicionar" → contador do carrinho no header incrementa |
| 06 — Remover do carrinho | `/carrinho`, clicar "Remover" → item some da lista |
| 07 — Responsividade mobile | Redimensionar a janela / DevTools modo mobile → grade de produtos vira 1 coluna |
| 08 — Fluxo de pagamento aprovado | `/checkout`, escolher "Pix" ou "Cartão de crédito" → "Pagamento aprovado!" |
| 09 — Falha de pagamento | `/checkout`, escolher "Cartão de crédito (simular recusa)" → mensagem de recusa + nova tentativa |
| 10 — Consentimento LGPD | `/cadastro` ou `/checkout` sem marcar o checkbox → sistema bloqueia com mensagem |
| 11 — Programa de fidelidade | `/meus-dados` logado → exibe pontos acumulados |
| 12 — Acompanhamento do pedido | `/acompanhamento` após um pagamento aprovado → linha do tempo avança automaticamente |

Cenários extras cobertos pelo protótipo (não estavam no plano original, mas reforçam a
Seção de Qualidade): cardápio em estado de erro/vazio (seletor "Simular estado" em
`/cardapio`) e edição/exclusão de dados pessoais em `/meus-dados`.
