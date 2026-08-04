import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cadastrar } from '../services/api'
import { useAuth } from '../context/AuthContext'
import ConsentCheckbox from '../components/ConsentCheckbox'

function validar({ nome, email, cpf, telefone, senha }) {
  const erros = {}
  if (!nome.trim()) erros.nome = 'Informe seu nome completo.'
  if (!email.trim()) {
    erros.email = 'Informe seu e-mail.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    erros.email = 'Informe um e-mail válido.'
  }
  if (!/^\d{11}$/.test(cpf.replace(/\D/g, ''))) {
    erros.cpf = 'CPF deve conter 11 dígitos.'
  }
  if (!/^\d{10,11}$/.test(telefone.replace(/\D/g, ''))) {
    erros.telefone = 'Telefone deve conter DDD + número (10 ou 11 dígitos).'
  }
  if (senha.length < 6) {
    erros.senha = 'A senha deve ter no mínimo 6 caracteres.'
  }
  return erros
}

export default function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', cpf: '', telefone: '', senha: '' })
  const [erros, setErros] = useState({})
  const [aceite, setAceite] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erroApi, setErroApi] = useState(null)
  const { setUsuario, setConsentimentoLGPD } = useAuth()
  const navigate = useNavigate()

  function set(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errosValidacao = validar(form)
    if (!aceite) {
      errosValidacao.consentimento = 'Você precisa aceitar a Política de Privacidade para continuar.'
    }
    setErros(errosValidacao)
    setErroApi(null)
    if (Object.keys(errosValidacao).length > 0) return

    setEnviando(true)
    try {
      const usuario = await cadastrar(form)
      setUsuario({ ...usuario, pontosFidelidade: 0 })
      setConsentimentoLGPD(true)
      navigate('/')
    } catch (e) {
      setErroApi(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="container container-narrow">
      <h1>Criar conta</h1>

      <form onSubmit={handleSubmit} noValidate className="form">
        <div className="form-field">
          <label htmlFor="nome">Nome completo</label>
          <input id="nome" value={form.nome} onChange={(e) => set('nome', e.target.value)} />
          {erros.nome && <p className="field-error">{erros.nome}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
          />
          {erros.email && <p className="field-error">{erros.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            placeholder="000.000.000-00"
            value={form.cpf}
            onChange={(e) => set('cpf', e.target.value)}
          />
          {erros.cpf && <p className="field-error">{erros.cpf}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChange={(e) => set('telefone', e.target.value)}
          />
          {erros.telefone && <p className="field-error">{erros.telefone}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={form.senha}
            onChange={(e) => set('senha', e.target.value)}
          />
          {erros.senha && <p className="field-error">{erros.senha}</p>}
        </div>

        <ConsentCheckbox checked={aceite} onChange={setAceite} error={erros.consentimento} />

        {erroApi && <p className="field-error api-error">{erroApi}</p>}

        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  )
}
