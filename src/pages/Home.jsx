import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchCardapio } from '../services/api'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { unidades } from '../services/mockData'

export default function Home() {
  const [destaques, setDestaques] = useState(null)
  const [erro, setErro] = useState(null)
  const [unidade, setUnidade] = useState(unidades[0].id)
  const { adicionar } = useCart()

  function carregarDestaques() {
    setErro(null)
    setDestaques(null)
    fetchCardapio(unidade)
      .then((produtos) => setDestaques(produtos.filter((p) => p.maisVendido)))
      .catch((e) => setErro(e.message))
  }

  useEffect(carregarDestaques, [unidade])

  return (
    <div className="container">
      <section className="banner">
        <h1>Sabores típicos nordestinos</h1>
        <p>Peça no App, no site ou em um dos nossos totens de autoatendimento.</p>
      </section>

      <section className="unidade-seletor">
        <label htmlFor="unidade">Unidade</label>
        <select id="unidade" value={unidade} onChange={(e) => setUnidade(e.target.value)}>
          {unidades.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nome} — {u.cidade}
            </option>
          ))}
        </select>
        <Link to="/cardapio" className="btn btn-secondary">
          Ver cardápio completo
        </Link>
      </section>

      <section>
        <h2>Destaques da unidade</h2>
        {destaques === null && !erro && <LoadingState label="Carregando destaques..." />}
        {erro && <ErrorState message={erro} onRetry={carregarDestaques} />}
        {destaques && destaques.length > 0 && (
          <div className="products-grid">
            {destaques.map((produto) => (
              <ProductCard key={produto.id} produto={produto} onAdicionar={adicionar} />
            ))}
          </div>
        )}
      </section>

      <section className="fidelidade-banner">
        <h2>Programa de Fidelidade</h2>
        <p>Acumule pontos a cada pedido e troque por recompensas exclusivas.</p>
        <Link to="/meus-dados" className="btn btn-primary">
          Consultar meus pontos
        </Link>
      </section>
    </div>
  )
}
