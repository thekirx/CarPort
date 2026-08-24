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
        <p className="spec-line">{variant.diameter}×{variant.width}J · ET{variant.offset} · {variant.pcd}</p>
        <div className="price-row"><strong>{peso(variant.pricePerSet)}</strong><span>sample set of 4</span></div>
      </div>
    </article>
  );
}
