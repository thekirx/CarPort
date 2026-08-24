export function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="mark" aria-label="Carport Wheels">
      <svg className="mark-symbol" viewBox="0 0 924 1178" aria-hidden="true">
        <path d="M0,0 L462,263 L924,0 L924,187 L462,450 L0,187 Z" />
        <path fillRule="evenodd" d="M0,197 L462,460 L924,197 L924,750 L462,1013 L0,750 Z M150,400 L437,564 L437,446 L462,460 L487,446 L487,999 L462,1013 L437,999 L437,894 L150,730 Z M600,382 L655,350 L655,849 L600,880 Z M760,290 L815,259 L815,758 L760,789 Z" />
        <path d="M0,757 L462,1020 L924,757 L924,915 L462,1178 L0,915 Z" />
      </svg>
      {!compact && <span className="mark-name"><strong>CARPORT</strong><small>WHEELS</small></span>}
    </span>
  );
}
