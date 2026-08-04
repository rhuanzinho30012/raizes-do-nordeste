import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container container-narrow state-box state-empty">
      <p className="state-title">Página não encontrada</p>
      <Link to="/" className="btn btn-primary">
        Voltar para o início
      </Link>
    </div>
  )
}
