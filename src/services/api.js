import { produtos, usuarioMock } from './mockData'

const DELAY_MS = 900

function wait(ms = DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Simula a busca do cardápio de uma unidade.
 * `opts.forceError` e `opts.forceEmpty` existem só para demonstrar
 * os estados de erro/vazio exigidos no plano de testes (não é lógica de negócio real).
 */
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

/**
 * Simula o envio do pedido para um gateway de pagamento externo (RF08 / UC01).
 * método 'cartao_recusado' existe só para demonstrar o fluxo alternativo
 * (Cenário de Teste 09 do plano de testes).
 */
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
