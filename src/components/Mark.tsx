export function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="mark" aria-label="Carport Wheels">
      <span className="mark-symbol" aria-hidden="true">C</span>
      {!compact && <span className="mark-name">CARPORT <b>WHEELS</b></span>}
    </span>
  );
}
