export const unidades = [
  { id: 'u1', nome: 'Raízes do Nordeste - Recife Centro', cidade: 'Recife/PE' },
  { id: 'u2', nome: 'Raízes do Nordeste - Fortaleza Aldeota', cidade: 'Fortaleza/CE' },
  { id: 'u3', nome: 'Raízes do Nordeste - São Paulo Pinheiros', cidade: 'São Paulo/SP' },
]

export const produtos = [
  {
    id: 1,
    nome: 'Baião de Dois',
    categoria: 'Pratos',
    preco: 24.9,
    vegetariano: false,
    promocao: false,
    maisVendido: true,
    descricao: 'Arroz, feijão de corda, queijo coalho e carne seca.',
  },
  {
    id: 2,
    nome: 'Carne de Sol com Macaxeira',
    categoria: 'Pratos',
    preco: 34.9,
    vegetariano: false,
    promocao: true,
    maisVendido: true,
    descricao: 'Carne de sol grelhada, macaxeira frita e manteiga de garrafa.',
  },
  {
    id: 3,
    nome: 'Cuscuz Nordestino',
    categoria: 'Pratos',
    preco: 14.9,
    vegetariano: true,
    promocao: false,
    maisVendido: false,
    descricao: 'Cuscuz de milho com ovo, queijo coalho e manteiga.',
  },
  {
    id: 4,
    nome: 'Tapioca de Queijo Coalho',
    categoria: 'Lanches',
    preco: 12.5,
    vegetariano: true,
    promocao: false,
    maisVendido: true,
    descricao: 'Tapioca recheada com queijo coalho derretido.',
  },
  {
    id: 5,
    nome: 'Bolo de Rolo',
    categoria: 'Sobremesas',
    preco: 9.9,
    vegetariano: true,
    promocao: false,
    maisVendido: false,
    descricao: 'Fatia de bolo de rolo tradicional pernambucano.',
  },
  {
    id: 6,
    nome: 'Suco de Cajá',
    categoria: 'Bebidas',
    preco: 8.0,
    vegetariano: true,
    promocao: true,
    maisVendido: false,
    descricao: 'Suco natural de cajá gelado.',
  },
]

export const usuarioMock = {
  nome: 'Rhuan Pablo',
  email: 'rhuan@teste.com',
  senha: '123456',
  cpf: '000.000.000-00',
  telefone: '(81) 90000-0000',
  pontosFidelidade: 120,
}

export const statusPedido = [
  { chave: 'recebido', label: 'Pedido recebido' },
  { chave: 'preparo', label: 'Em preparo' },
  { chave: 'saiu', label: 'Saiu para entrega' },
  { chave: 'disponivel', label: 'Disponível para retirada' },
  { chave: 'finalizado', label: 'Finalizado' },
]
