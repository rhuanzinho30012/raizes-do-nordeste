import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/api'
import { useAuth } from '../context/AuthContext'

function validar({ email, senha }) {
  const erros = {}
  if (!email.trim()) {
    erros.email = 'Informe seu e-mail.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    erros.email = 'Informe um e-mail válido (ex: nome@dominio.com).'
  }
  if (!senha) {
    erros.senha = 'Informe sua senha.'
  } else if (senha.length < 6) {
    erros.senha = 'A senha deve ter no mínimo 6 caracteres.'
  }
  return erros
}

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' })
  const [erros, setErros] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [erroApi, setErroApi] = useState(null)
  const { setUsuario } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const errosValidacao = validar(form)
    setErros(errosValidacao)
    setErroApi(null)
    if (Object.keys(errosValidacao).length > 0) return

    setEnviando(true)
    try {
      const usuario = await login(form)
      setUsuario(usuario)
      navigate('/')
    } catch (e) {
      setErroApi(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="container container-narrow">
      <h1>Entrar</h1>
      <p className="hint">
        Use <strong>rhuan@teste.com</strong> / <strong>123456</strong> para testar o login
        (dado mockado — não é um login real).
      </p>

      <form onSubmit={handleSubmit} noValidate className="form">
        <div className="form-field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-invalid={Boolean(erros.email)}
          />
          {erros.email && <p className="field-error">{erros.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            aria-invalid={Boolean(erros.senha)}
          />
          {erros.senha && <p className="field-error">{erros.senha}</p>}
        </div>

        {erroApi && <p className="field-error api-error">{erroApi}</p>}

        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p>
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  )
}
