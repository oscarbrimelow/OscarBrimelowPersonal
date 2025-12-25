export default function RetroDialog({ title, children }) {
  return (
    <div className="dialog">
      <div className="title" style={{ fontSize: 14, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 18, lineHeight: 1.3 }}>{children}</div>
    </div>
  )
}
