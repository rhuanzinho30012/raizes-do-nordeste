export default function ProductCard({ produto, onAdicionar }) {
  return (
    <div className="card produto-card">
      <div className="produto-card-tags">
        {produto.promocao && <span className="tag tag-promo">Promoção</span>}
        {produto.maisVendido && <span className="tag tag-top">Mais vendido</span>}
        {produto.vegetariano && <span className="tag tag-veg">Vegetariano</span>}
      </div>
      <h3>{produto.nome}</h3>
      <p className="produto-descricao">{produto.descricao}</p>
      <div className="produto-card-footer">
        <span className="preco">R$ {produto.preco.toFixed(2)}</span>
        <button type="button" className="btn btn-primary" onClick={() => onAdicionar(produto)}>
          Adicionar
        </button>
      </div>
    </div>
  )
}
