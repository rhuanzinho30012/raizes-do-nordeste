import { useEffect, useState } from 'react'
import { fetchCardapio } from '../services/api'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'

const FILTROS = [
  { chave: 'todos', label: 'Todos' },
  { chave: 'promocao', label: 'Promoções' },
  { chave: 'maisVendido', label: 'Mais vendidos' },
  { chave: 'vegetariano', label: 'Vegetarianos' },
]

export default function Cardapio() {
  const [status, setStatus] = useState('carregando') // carregando | erro | vazio | ok
  const [produtos, setProdutos] = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [busca, setBusca] = useState('')
  const [simulacao, setSimulacao] = useState('normal')
  const { adicionar } = useCart()

  function carregar() {
    setStatus('carregando')
    fetchCardapio('u1', {
      forceError: simulacao === 'erro',
      forceEmpty: simulacao === 'vazio',
    })
      .then((dados) => {
        if (dados.length === 0) {
          setStatus('vazio')
        } else {
          setProdutos(dados)
          setStatus('ok')
        }
      })
      .catch(() => setStatus('erro'))
  }

  useEffect(carregar, [simulacao])

  const produtosFiltrados = produtos
    .filter((p) => (filtro === 'todos' ? true : p[filtro]))
    .filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))

  return (
    <div className="container">
      <h1>Cardápio</h1>

      <div className="demo-toolbar">
        <label htmlFor="simulacao">
          Simular estado (evidência do plano de testes):
        </label>
        <select id="simulacao" value={simulacao} onChange={(e) => setSimulacao(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="erro">Forçar erro de carregamento</option>
          <option value="vazio">Forçar cardápio vazio</option>
        </select>
      </div>

      <input
        type="search"
        className="busca-input"
        placeholder="Buscar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="filtros">
        {FILTROS.map((f) => (
          <button
            key={f.chave}
            type="button"
            className={`chip ${filtro === f.chave ? 'chip-ativo' : ''}`}
            onClick={() => setFiltro(f.chave)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {status === 'carregando' && <LoadingState label="Carregando cardápio..." />}
      {status === 'erro' && (
        <ErrorState message="Não foi possível carregar o cardápio." onRetry={carregar} />
      )}
      {status === 'vazio' && (
        <EmptyState
          title="Nenhum produto disponível nesta unidade"
          description="Tente novamente mais tarde ou escolha outra unidade."
        />
      )}
      {status === 'ok' && produtosFiltrados.length === 0 && (
        <EmptyState
          title="Nenhum produto encontrado"
          description="Tente ajustar a busca ou os filtros."
        />
      )}
      {status === 'ok' && produtosFiltrados.length > 0 && (
        <div className="products-grid">
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} onAdicionar={adicionar} />
          ))}
        </div>
      )}
    </div>
  )
}
