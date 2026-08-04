import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [itens, setItens] = useState([])
  const [cupom, setCupom] = useState('')

  function adicionar(produto) {
    setItens((atual) => {
      const existente = atual.find((i) => i.id === produto.id)
      if (existente) {
        return atual.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i,
        )
      }
      return [...atual, { ...produto, quantidade: 1, observacao: '' }]
    })
  }

  function remover(produtoId) {
    setItens((atual) => atual.filter((i) => i.id !== produtoId))
  }

  function alterarQuantidade(produtoId, quantidade) {
    if (quantidade <= 0) {
      remover(produtoId)
      return
    }
    setItens((atual) =>
      atual.map((i) => (i.id === produtoId ? { ...i, quantidade } : i)),
    )
  }

  function definirObservacao(produtoId, observacao) {
    setItens((atual) =>
      atual.map((i) => (i.id === produtoId ? { ...i, observacao } : i)),
    )
  }

  function limparCarrinho() {
    setItens([])
    setCupom('')
  }

  const subtotal = useMemo(
    () => itens.reduce((total, i) => total + i.preco * i.quantidade, 0),
    [itens],
  )

  const desconto = cupom.trim().toUpperCase() === 'NORDESTE10' ? subtotal * 0.1 : 0
  const total = subtotal - desconto
  const totalItens = itens.reduce((qtd, i) => qtd + i.quantidade, 0)

  const value = {
    itens,
    adicionar,
    remover,
    alterarQuantidade,
    definirObservacao,
    limparCarrinho,
    cupom,
    setCupom,
    subtotal,
    desconto,
    total,
    totalItens,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider')
  return ctx
}
