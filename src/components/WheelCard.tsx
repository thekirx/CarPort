import Image from "next/image";
import Link from "next/link";
import type { Wheel } from "@/data/types";
import { peso, stockLabel } from "@/lib/format";

export function WheelCard({ wheel }: { wheel: Wheel }) {
  const variant = wheel.variants[0];
  return (
    <article className="wheel-card">
      <Link href={`/wheels/${wheel.slug}`} className="wheel-image">
        <Image src={wheel.image} alt={`${wheel.brand} ${wheel.model} sample listing`} fill sizes="(max-width: 700px) 88vw, 30vw" />
        <span className="sample-badge">SAMPLE DATA</span>
      </Link>
      <div className="wheel-card-body">
        <div className="card-top"><span>{wheel.brand}</span><span className={`stock ${variant.stock}`}>{stockLabel(variant.stock)}</span></div>
        <h3><Link href={`/wheels/${wheel.slug}`}>{wheel.model}</Link></h3>
        <dl className="spec-grid">
          <div><dt>Dia</dt><dd>{variant.diameter}<small>&quot;</small></dd></div>
          <div><dt>Width</dt><dd>{variant.width}<small>J</small></dd></div>
          <div><dt>Offset</dt><dd>{variant.offset > 0 ? "+" : ""}{variant.offset}</dd></div>
          <div><dt>PCD</dt><dd>{variant.pcd.replace("x", "×")}</dd></div>
        </dl>
        <div className="price-row"><strong>{peso(variant.pricePerSet)}</strong><span>sample set of 4</span></div>
      </div>
    </article>
  );
}
