import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>© 2026 Raízes do Nordeste — Projeto acadêmico (Trilha Front-End).</p>
      <Link to="/politica-de-privacidade">Política de Privacidade (LGPD)</Link>
    </footer>
  )
}
