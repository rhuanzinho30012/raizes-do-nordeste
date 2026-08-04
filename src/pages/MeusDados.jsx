import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import EmptyState from '../components/EmptyState'

export default function MeusDados() {
  const { usuario, setUsuario, consentimentoLGPD, revogarConsentimento, excluirDados } = useAuth()
  const [editando, setEditando] = useState(false)
  const [nomeEdicao, setNomeEdicao] = useState(usuario?.nome ?? '')
  const [mensagem, setMensagem] = useState(null)
  const navigate = useNavigate()

  if (!usuario) {
    return (
      <div className="container container-narrow">
        <h1>Meus dados</h1>
        <EmptyState
          title="Você precisa entrar para ver seus dados"
          action={
            <Link to="/login" className="btn btn-primary">
              Fazer login
            </Link>
          }
        />
      </div>
    )
  }

  function salvarEdicao() {
    setUsuario({ ...usuario, nome: nomeEdicao })
    setEditando(false)
    setMensagem('Dados atualizados com sucesso.')
  }

  function handleRevogar() {
    revogarConsentimento()
    setMensagem('Consentimento revogado. Alguns recursos (como checkout) exigirão aceite novamente.')
  }

  function handleExcluir() {
    excluirDados()
    setMensagem(null)
    navigate('/')
  }

  return (
    <div className="container container-narrow">
      <h1>Meus dados</h1>

      {mensagem && <p className="state-box state-success">{mensagem}</p>}

      <div className="dados-card">
        <div className="form-field">
          <label htmlFor="nome">Nome</label>
          {editando ? (
            <input id="nome" value={nomeEdicao} onChange={(e) => setNomeEdicao(e.target.value)} />
          ) : (
            <p>{usuario.nome}</p>
          )}
        </div>
        <div className="form-field">
          <label>E-mail</label>
          <p>{usuario.email}</p>
        </div>
        <div className="form-field">
          <label>CPF</label>
          <p>{usuario.cpf}</p>
        </div>
        <div className="form-field">
          <label>Pontos de fidelidade</label>
          <p>{usuario.pontosFidelidade} pontos</p>
        </div>
        <div className="form-field">
          <label>Consentimento LGPD</label>
          <p>{consentimentoLGPD ? 'Concedido' : 'Não concedido'}</p>
        </div>

        <div className="dados-acoes">
          {editando ? (
            <button type="button" className="btn btn-primary" onClick={salvarEdicao}>
              Salvar
            </button>
          ) : (
            <button type="button" className="btn btn-secondary" onClick={() => setEditando(true)}>
              Editar dados
            </button>
          )}
          <button type="button" className="btn btn-secondary" onClick={handleRevogar}>
            Revogar consentimento
          </button>
          <button type="button" className="btn btn-danger" onClick={handleExcluir}>
            Solicitar exclusão da conta
          </button>
        </div>
      </div>
    </div>
  )
}
