import { statusPedido } from '../services/mockData'

export default function StatusTimeline({ etapaAtual }) {
  const indiceAtual = statusPedido.findIndex((s) => s.chave === etapaAtual)

  return (
    <ol className="status-timeline">
      {statusPedido.map((etapa, index) => {
        const concluida = index < indiceAtual
        const atual = index === indiceAtual
        return (
          <li
            key={etapa.chave}
            className={`status-step ${concluida ? 'is-done' : ''} ${atual ? 'is-current' : ''}`}
          >
            <span className="status-dot" />
            <span>{etapa.label}</span>
          </li>
        )
      })}
    </ol>
  )
}
