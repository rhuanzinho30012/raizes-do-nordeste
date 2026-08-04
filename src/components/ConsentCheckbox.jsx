import { Link } from 'react-router-dom'

/**
 * Componente reutilizável de consentimento LGPD (RF14).
 * Usado no Cadastro e no Checkout — qualquer tela que colete ou use dados pessoais
 * deve reutilizar este componente em vez de reimplementar o texto/; checkbox.
 */
export default function ConsentCheckbox({ checked, onChange, error }) {
  return (
    <div className="consent-box">
      <label className="consent-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>
          Li e aceito a{' '}
          <Link to="/politica-de-privacidade" target="_blank">
            Política de Privacidade
          </Link>{' '}
          e autorizo o uso dos meus dados exclusivamente para processar meu cadastro e
          meus pedidos, conforme a LGPD.
        </span>
      </label>
      {error && <p className="field-error">{error}</p>}
    </div>
  )
}
