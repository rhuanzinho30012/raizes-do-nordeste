export default function ErrorState({ message = 'Algo deu errado.', onRetry }) {
  return (
    <div className="state-box state-error" role="alert">
      <p className="state-title">⚠ {message}</p>
      {onRetry && (
        <button type="button" className="btn btn-secondary" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  )
}
