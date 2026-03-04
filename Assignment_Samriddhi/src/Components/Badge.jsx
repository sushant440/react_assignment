export default function Badge({ type, children }) {
  return <span className={`badge ${type}`}>{children}</span>;
}