export default function EmptyState({ title = 'Nada por aqui', description, action }) {
  return (
    <div className="state-box state-empty">
      <p className="state-title">{title}</p>
      {description && <p className="state-description">{description}</p>}
      {action}
    </div>
  )
}
