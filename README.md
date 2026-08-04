# Raízes do Nordeste

Front-end em React para a rede de restaurantes Raízes do Nordeste: cardápio multicanal,
carrinho, checkout com pagamento externo, acompanhamento de pedido em tempo real, painel
administrativo e controles de privacidade alinhados à LGPD.

> Cardápio, login e pagamento são simulados (`src/services/api.js`) — não há back-end real.

## Como rodar localmente

Pré-requisitos: [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Abra o endereço que o terminal mostrar (normalmente `http://localhost:5173`).

Login de teste: `rhuan@teste.com` / `123456`.

## Estrutura do projeto

```
src/
  components/   # peças reutilizáveis (Header, ProductCard, LoadingState, EmptyState, ErrorState, ConsentCheckbox, StatusTimeline...)
  pages/        # uma página por rota (Home, Login, Cadastro, Cardapio, Carrinho, Checkout, Acompanhamento, Dashboard, MeusDados...)
  context/      # estado global (carrinho e autenticação/consentimento) via Context API
  services/     # api.js (chamadas simuladas) e mockData.js (cardápio, unidades, usuário de teste)
  styles/       # global.css (mobile-first)
docs/
  diagramas/    # diagrama de casos de uso, jornada do usuário e mapa de navegação/estados
```

## Diagramas

| Arquivo | O que mostra |
|---|---|
| `caso-de-uso.html` | Atores e casos de uso do sistema |
| `jornada-usuario.html` | Fluxo completo do cliente, do cardápio à retirada/entrega |
| `fluxo-navegacao.html` | Mapa de navegação entre telas e estados de carregando/vazio/erro |

## Estados de carregando / vazio / erro

A página **Cardápio** tem um seletor "Simular estado" no topo, útil para visualizar cada
estado sem depender de uma falha real:

- **Normal**: carrega os produtos.
- **Forçar erro de carregamento**: mostra a tela de erro com botão "Tentar novamente".
- **Forçar cardápio vazio**: mostra a tela de "nenhum produto disponível".

No **Checkout**, a forma de pagamento "Cartão de crédito (simular recusa)" demonstra o
fluxo de pagamento recusado.

## Deploy

```bash
git remote add origin https://github.com/<usuario>/raizes-do-nordeste.git
git push -u origin main
```

Em [vercel.com](https://vercel.com), importe o repositório — a Vercel detecta Vite/React
automaticamente e faz o build.

## Build de produção

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve o build localmente para conferir antes do deploy
```
