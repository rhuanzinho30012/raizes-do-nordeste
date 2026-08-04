import { produtos, usuarioMock } from './mockData'

const DELAY_MS = 900

function wait(ms = DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchCardapio(unidadeId, opts = {}) {
  await wait()
  if (opts.forceError) {
    throw new Error('Não foi possível carregar o cardápio. Tente novamente.')
  }
  if (opts.forceEmpty) {
    return []
  }
  return produtos
}

export async function login({ email, senha }) {
  await wait(600)
  if (email === usuarioMock.email && senha === usuarioMock.senha) {
    return { ...usuarioMock }
  }
  throw new Error('E-mail ou senha inválidos.')
}

export async function cadastrar({ nome, email, cpf, telefone }) {
  await wait(700)
  if (email === usuarioMock.email) {
    throw new Error('Já existe uma conta cadastrada com este e-mail.')
  }
  return { nome, email, cpf, telefone, pontosFidelidade: 0 }
}

export async function processarPagamento({ metodo, total }) {
  await wait(1400)
  if (metodo === 'cartao_recusado') {
    return { aprovado: false, mensagem: 'Pagamento recusado pela operadora do cartão.' }
  }
  return {
    aprovado: true,
    mensagem: 'Pagamento aprovado!',
    valorPago: total,
    codigoTransacao: `TXN-${Date.now()}`,
  }
}

export async function fetchStatusPedido(pedidoId) {
  await wait(500)
  return { pedidoId, etapaAtual: 'preparo', tempoEstimadoMin: 25 }
}
