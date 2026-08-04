import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Cardapio from './pages/Cardapio'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Acompanhamento from './pages/Acompanhamento'
import Dashboard from './pages/Dashboard'
import MeusDados from './pages/MeusDados'
import PoliticaPrivacidade from './pages/PoliticaPrivacidade'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/acompanhamento" element={<Acompanhamento />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meus-dados" element={<MeusDados />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
