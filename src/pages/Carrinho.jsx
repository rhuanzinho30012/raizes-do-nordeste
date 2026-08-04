import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import EmptyState from '../components/EmptyState'

export default function Carrinho() {
  const {
    itens,
    alterarQuantidade,
    remover,
    definirObservacao,
    cupom,
    setCupom,
    subtotal,
    desconto,
    total,
  } = useCart()
  const navigate = useNavigate()

  if (itens.length === 0) {
    return (
      <div className="container">
        <h1>Carrinho</h1>
        <EmptyState
          title="Seu carrinho está vazio"
          description="Adicione produtos do cardápio para continuar."
          action={
            <Link to="/cardapio" className="btn btn-primary">
              Ver cardápio
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="container container-narrow">
      <h1>Carrinho</h1>

      <div className="cart-list">
        {itens.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <strong>{item.nome}</strong>
              <span>R$ {item.preco.toFixed(2)}</span>
            </div>

            <div className="cart-item-qtd">
              <button type="button" onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}>
                −
              </button>
              <span>{item.quantidade}</span>
              <button type="button" onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>
                +
              </button>
            </div>

            <input
              type="text"
              className="observacao-input"
              placeholder="Observações (ex: sem cebola)"
              value={item.observacao}
              onChange={(e) => definirObservacao(item.id, e.target.value)}
            />

            <button type="button" className="btn-link btn-remover" onClick={() => remover(item.id)}>
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="cupom-field">
        <label htmlFor="cupom">Cupom de desconto</label>
        <input
          id="cupom"
          placeholder="Ex: NORDESTE10"
          value={cupom}
          onChange={(e) => setCupom(e.target.value)}
        />
      </div>

      <div className="resumo">
        <div className="resumo-linha">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        {desconto > 0 && (
          <div className="resumo-linha resumo-desconto">
            <span>Desconto</span>
            <span>- R$ {desconto.toFixed(2)}</span>
          </div>
        )}
        <div className="resumo-linha resumo-total">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      <button type="button" className="btn btn-primary btn-full" onClick={() => navigate('/checkout')}>
        Finalizar Pedido
      </button>
    </div>
  )
}
