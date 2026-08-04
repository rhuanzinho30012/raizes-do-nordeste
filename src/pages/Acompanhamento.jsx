import { useEffect, useState } from 'react'
import { fetchStatusPedido } from '../services/api'
import { statusPedido } from '../services/mockData'
import LoadingState from '../components/LoadingState'
import EmptyState from '../components/EmptyState'
import StatusTimeline from '../components/StatusTimeline'
import { Link } from 'react-router-dom'

const AVANCO_MS = 4000

export default function Acompanhamento() {
  const [carregando, setCarregando] = useState(true)
  const [pedido, setPedido] = useState(null)
  const [etapaIndex, setEtapaIndex] = useState(0)

  useEffect(() => {
    fetchStatusPedido('PED-001').then((dados) => {
      setPedido(dados)
      setEtapaIndex(statusPedido.findIndex((s) => s.chave === dados.etapaAtual))
      setCarregando(false)
    })
  }, [])

  useEffect(() => {
    if (carregando) return
    if (etapaIndex >= statusPedido.length - 1) return
    const timer = setTimeout(() => setEtapaIndex((i) => i + 1), AVANCO_MS)
    return () => clearTimeout(timer)
  }, [carregando, etapaIndex])

  if (carregando) {
    return (
      <div className="container container-narrow">
        <h1>Acompanhar pedido</h1>
        <LoadingState label="Buscando status do pedido..." />
      </div>
    )
  }

  if (!pedido) {
    return (
      <div className="container container-narrow">
        <h1>Acompanhar pedido</h1>
        <EmptyState
          title="Nenhum pedido em andamento"
          description="Finalize um pedido para acompanhar o status aqui."
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
      <h1>Acompanhar pedido</h1>
      <p className="hint">
        Pedido {pedido.pedidoId} — tempo estimado: {pedido.tempoEstimadoMin} min
      </p>
      <StatusTimeline etapaAtual={statusPedido[etapaIndex].chave} />
    </div>
  )
}
