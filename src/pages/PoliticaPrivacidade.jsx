export default function PoliticaPrivacidade() {
  return (
    <div className="container container-narrow">
      <h1>Política de Privacidade</h1>
      <p className="hint">Última atualização: janeiro de 2026 — em conformidade com a LGPD (Lei nº 13.709/2018).</p>

      <h2>1. Quais dados coletamos</h2>
      <p>
        Nome, e-mail, CPF, telefone e senha (cadastro); histórico de pedidos e itens do
        carrinho (uso do serviço). Não coletamos dados de cartão — o pagamento é processado
        por um gateway externo.
      </p>

      <h2>2. Finalidade</h2>
      <p>
        Os dados são usados exclusivamente para: autenticar o usuário, processar pedidos,
        calcular pontos de fidelidade e permitir o acompanhamento do status do pedido.
      </p>

      <h2>3. Minimização</h2>
      <p>
        Nenhum dado sensível é exibido por completo em tela (ex.: CPF é armazenado, mas nunca
        mostrado integralmente em telas públicas).
      </p>

      <h2>4. Seus direitos</h2>
      <p>
        Você pode, a qualquer momento, editar seus dados, revogar o consentimento ou solicitar
        a exclusão da sua conta na página <strong>Meus dados</strong>.
      </p>

      <h2>5. Segurança</h2>
      <p>
        Senhas são armazenadas de forma criptografada, a comunicação ocorre via HTTPS e o
        acesso autenticado usa tokens de sessão.
      </p>
    </div>
  )
}
