# Raízes do Nordeste — Front-End (Projeto Multidisciplinar)

Protótipo funcional em React para o estudo de caso "Rede Raízes do Nordeste" (trilha
Front-End). Simula cadastro/login, cardápio multicanal, carrinho, checkout com pagamento
externo simulado, acompanhamento de pedido em tempo real, painel administrativo e os
controles de privacidade exigidos pela LGPD.

> Dados de cardápio, login e pagamento são **mockados** (`src/services/api.js`) — não há
> back-end real. Isso é intencional: o roteiro da disciplina pede simulação, não integração
> real com gateway de pagamento.

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
  styles/       # global.css (mobile-first, RNF01/RNF02)
docs/
  diagramas/    # Diagrama de Casos de Uso, Jornada do Usuário e Mapa de Navegação/Estados (HTML, ver abaixo)
```

## Como ver e exportar os diagramas

Os diagramas ficam em `docs/diagramas/*.html`. São páginas HTML comuns — não precisam de
Figma, Visio ou instalação de nada: **abra o arquivo direto no navegador** (duplo clique ou
`Arquivo > Abrir` no Chrome/Firefox/Edge).

Para colocar a imagem no documento final (Word/PDF):
1. Abra o `.html` no navegador.
2. `Ctrl/Cmd + P` → "Salvar como PDF" (ou tire um print da tela).
3. Cole a imagem/PDF gerado na seção correspondente do seu documento.

| Arquivo | O que mostra | Seção do documento |
|---|---|---|
| `caso-de-uso.html` | Os 5 atores e seus casos de uso, com `<<include>>`/`<<extend>>` | Seção 5 — Diagrama de Casos de Uso |
| `jornada-usuario.html` | Fluxo completo do cliente, com decisões (login/cadastro, pagamento aprovado/recusado) | Seção 7 — Jornada do Usuário |
| `fluxo-navegacao.html` | Mapa de navegação entre telas + estados de carregando/vazio/erro | Seção 4 — Modelagem e Arquitetura da Interface |

## Como demonstrar os estados (carregando / vazio / erro)

A página **Cardápio** tem um seletor "Simular estado" no topo — isso existe só para você
conseguir mostrar/printar cada estado exigido no plano de testes, sem depender de sorte ou
de mexer no código:

- **Normal**: carrega os produtos mockados.
- **Forçar erro de carregamento**: mostra a tela de erro com botão "Tentar novamente".
- **Forçar cardápio vazio**: mostra a tela de "nenhum produto disponível".

No **Checkout**, escolher a forma de pagamento "Cartão de crédito (simular recusa)"
demonstra o fluxo de pagamento recusado (Cenário de Teste 09).

## Deploy (obrigatório para a Entrega Técnica)

O roteiro do professor exige um **link público funcional** — sem isso, o item vale ZERO,
mesmo que o código esteja certo. Passos:

1. Crie um repositório no **seu** GitHub e suba este projeto:
   ```bash
   git remote add origin https://github.com/<seu-usuario>/raizes-do-nordeste.git
   git push -u origin main
   ```
2. Crie uma conta gratuita em [vercel.com](https://vercel.com) (dá para logar com o GitHub).
3. "Add New Project" → selecione o repositório → Vercel detecta Vite/React automaticamente
   → "Deploy".
4. Copie a URL gerada (algo como `https://raizes-do-nordeste-xxxx.vercel.app`).
5. **Antes de entregar**: abra essa URL numa aba anônima/privada para confirmar que carrega
   sem login nenhum — é exatamente isso que o corretor vai fazer.
6. Atualize os links no documento final (Seção 10 — Entrega Técnica) com a URL real do
   deploy e a URL real do repositório (nada de `seuusuario` de exemplo).

## Build de produção

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve o build localmente para conferir antes do deploy
```
