export default function LoadingState({ label = 'Carregando...' }) {
  return (
    <div className="state-box state-loading" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  )
}
