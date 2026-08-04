import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { processarPagamento } from '../services/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import ConsentCheckbox from '../components/ConsentCheckbox'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'

const METODOS = [
  { chave: 'pix', label: 'Pix' },
  { chave: 'cartao', label: 'Cartão de crédito' },
  { chave: 'cartao_recusado', label: 'Cartão de crédito (simular recusa)' },
]

export default function Checkout() {
  const { itens, total, limparCarrinho } = useCart()
  const { consentimentoLGPD, setConsentimentoLGPD } = useAuth()
  const [metodo, setMetodo] = useState('pix')
  const [aceite, setAceite] = useState(consentimentoLGPD)
  const [erroConsentimento, setErroConsentimento] = useState(null)
  const [statusPagamento, setStatusPagamento] = useState('idle') // idle | processando | aprovado | recusado | erro
  const [mensagem, setMensagem] = useState('')
  const navigate = useNavigate()

  if (itens.length === 0 && statusPagamento === 'idle') {
    navigate('/carrinho')
    return null
  }

  async function handlePagamento() {
    if (!aceite) {
      setErroConsentimento('Você precisa aceitar a Política de Privacidade antes de pagar.')
      return
    }
    setErroConsentimento(null)
    setConsentimentoLGPD(true)
    setStatusPagamento('processando')

    try {
      const resultado = await processarPagamento({ metodo, total })
      if (resultado.aprovado) {
        setStatusPagamento('aprovado')
        setMensagem(resultado.mensagem)
        limparCarrinho()
      } else {
        setStatusPagamento('recusado')
        setMensagem(resultado.mensagem)
      }
    } catch (e) {
      setStatusPagamento('erro')
      setMensagem(e.message)
    }
  }

  if (statusPagamento === 'aprovado') {
    return (
      <div className="container container-narrow">
        <div className="state-box state-success">
          <p className="state-title">✓ {mensagem}</p>
          <p>Seu pedido foi confirmado e enviado para a cozinha.</p>
          <Link to="/acompanhamento" className="btn btn-primary">
            Acompanhar pedido
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container container-narrow">
      <h1>Pagamento</h1>

      <div className="resumo">
        <div className="resumo-linha resumo-total">
          <span>Total do pedido</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      <fieldset className="form-field">
        <legend>Forma de pagamento</legend>
        {METODOS.map((m) => (
          <label key={m.chave} className="radio-label">
            <input
              type="radio"
              name="metodo"
              value={m.chave}
              checked={metodo === m.chave}
              onChange={() => setMetodo(m.chave)}
            />
            {m.label}
          </label>
        ))}
      </fieldset>

      <p className="hint">
        Dados bancários não são armazenados por este sistema — o pagamento é processado
        por um gateway externo.
      </p>

      <ConsentCheckbox checked={aceite} onChange={setAceite} error={erroConsentimento} />

      {statusPagamento === 'processando' && <LoadingState label="Processando pagamento..." />}
      {statusPagamento === 'recusado' && (
        <ErrorState message={mensagem} onRetry={() => setStatusPagamento('idle')} />
      )}
      {statusPagamento === 'erro' && (
        <ErrorState message={mensagem} onRetry={() => setStatusPagamento('idle')} />
      )}

      <button
        type="button"
        className="btn btn-primary btn-full"
        onClick={handlePagamento}
        disabled={statusPagamento === 'processando'}
      >
        {statusPagamento === 'processando' ? 'Processando...' : 'Confirmar pagamento'}
      </button>
    </div>
  )
}
