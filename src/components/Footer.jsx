import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>© 2026 Raízes do Nordeste. Todos os direitos reservados.</p>
      <Link to="/politica-de-privacidade">Política de Privacidade (LGPD)</Link>
    </footer>
  )
}
