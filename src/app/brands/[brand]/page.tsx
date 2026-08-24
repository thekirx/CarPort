import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { brands } from "@/data/brands";
import { wheels } from "@/data/wheels";
import { WheelCard } from "@/components/WheelCard";
export function generateStaticParams() { return brands.map((brand) => ({ brand: brand.slug })); }
export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) { const { brand: slug } = await params; const brand = brands.find((item) => item.slug === slug); if (!brand) notFound(); const items = wheels.filter((wheel) => wheel.brand.toLowerCase() === brand.name.toLowerCase()); return <><section className="page-hero compact"><div className="container"><span className="eyebrow light">SAMPLE BRAND LANDING</span><h1>{brand.name}</h1><p>{brand.blurb} Product availability and specifications shown here are illustrative.</p></div></section><section className="section concrete"><div className="container">{items.length ? <div className="wheel-grid">{items.map((wheel) => <WheelCard key={wheel.slug} wheel={wheel} />)}</div> : <div className="empty-state"><h2>Sample listings are being prepared.</h2><Link className="button primary" href="/wheels">Browse all wheels <ArrowRight size={18} /></Link></div>}</div></section></>; }
