import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { totalItens } = useCart()
  const { usuario, logout } = useAuth()

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link to="/" className="logo">
          Raízes do Nordeste
        </Link>
        <nav className="main-nav">
          <NavLink to="/cardapio">Cardápio</NavLink>
          <NavLink to="/carrinho">Carrinho ({totalItens})</NavLink>
          <NavLink to="/acompanhamento">Meu Pedido</NavLink>
          <NavLink to="/dashboard">Painel Admin</NavLink>
          {usuario ? (
            <>
              <NavLink to="/meus-dados">Olá, {usuario.nome.split(' ')[0]}</NavLink>
              <button type="button" className="btn-link" onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <NavLink to="/login">Entrar</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
