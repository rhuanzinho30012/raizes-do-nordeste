import { useState } from 'react'
import { produtos as produtosIniciais } from '../services/mockData'

export default function Dashboard() {
  const [produtos, setProdutos] = useState(produtosIniciais)
  const [aba, setAba] = useState('cardapio')

  function alternarPromocao(id) {
    setProdutos((atual) =>
      atual.map((p) => (p.id === id ? { ...p, promocao: !p.promocao } : p)),
    )
  }

  const totalItensCardapio = produtos.length
  const totalPromocoes = produtos.filter((p) => p.promocao).length
  const ticketMedio = (
    produtos.reduce((soma, p) => soma + p.preco, 0) / produtos.length
  ).toFixed(2)

  return (
    <div className="container">
      <h1>Painel Administrativo (Gerente)</h1>

      <div className="tabs">
        <button
          type="button"
          className={`tab ${aba === 'cardapio' ? 'tab-ativo' : ''}`}
          onClick={() => setAba('cardapio')}
        >
          Cardápio
        </button>
        <button
          type="button"
          className={`tab ${aba === 'relatorios' ? 'tab-ativo' : ''}`}
          onClick={() => setAba('relatorios')}
        >
          Relatórios
        </button>
      </div>

      {aba === 'cardapio' && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Promoção</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.categoria}</td>
                <td>R$ {p.preco.toFixed(2)}</td>
                <td>
                  <button type="button" className="btn btn-secondary" onClick={() => alternarPromocao(p.id)}>
                    {p.promocao ? 'Remover promoção' : 'Ativar promoção'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {aba === 'relatorios' && (
        <div className="reports-grid">
          <div className="report-card">
            <span className="report-value">{totalItensCardapio}</span>
            <span>Itens no cardápio</span>
          </div>
          <div className="report-card">
            <span className="report-value">{totalPromocoes}</span>
            <span>Produtos em promoção</span>
          </div>
          <div className="report-card">
            <span className="report-value">R$ {ticketMedio}</span>
            <span>Preço médio</span>
          </div>
        </div>
      )}
    </div>
  )
}
