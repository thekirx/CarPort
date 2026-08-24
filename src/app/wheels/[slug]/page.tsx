import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { wheels } from "@/data/wheels";
import { peso, stockLabel } from "@/lib/format";

export function generateStaticParams() { return wheels.map((wheel) => ({ slug: wheel.slug })); }
export default async function WheelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const wheel = wheels.find((item) => item.slug === slug); if (!wheel) notFound(); const variant = wheel.variants[0];
  return <section className="section product-page"><div className="container product-grid"><div className="product-image"><Image src={wheel.image} alt={`${wheel.brand} ${wheel.model}`} fill priority sizes="(max-width: 800px) 100vw, 50vw" /><span className="sample-badge">SAMPLE PRODUCT DATA</span></div><div className="product-copy"><span className="eyebrow">{wheel.brand}</span><h1>{wheel.model}</h1><p className="product-lede">{wheel.description}</p><div className="product-price"><strong>{peso(variant.pricePerSet)}</strong><span>illustrative set of four · fitting included</span></div><div className="stock-row"><span className={`stock ${variant.stock}`}>{stockLabel(variant.stock)}</span><span>Sample availability</span></div><dl className="spec-table"><div><dt>Size</dt><dd>{variant.diameter}×{variant.width}J</dd></div><div><dt>Offset</dt><dd>ET{variant.offset}</dd></div><div><dt>Bolt pattern</dt><dd>{variant.pcd}</dd></div><div><dt>Centre bore</dt><dd>{variant.centreBore} mm</dd></div><div><dt>Finish</dt><dd>{variant.finish}</dd></div><div><dt>Construction</dt><dd>{wheel.construction}</dd></div></dl><div className="product-actions"><Link className="button primary" href={`/fitment?wheel=${wheel.slug}`}>Check against my car <ArrowRight size={18} /></Link><Link className="button secondary" href={`/reserve/${wheel.slug}`}>Preview reservation</Link></div><p className="microcopy"><CheckCircle2 size={16} /> Final tyre sizing, brake clearance and installation are confirmed by Carport.</p></div></div></section>;
}
