import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { WheelCard } from "@/components/WheelCard";
import { brands } from "@/data/brands";
import { builds, reviews } from "@/data/proof";
import { wheels } from "@/data/wheels";

export default function HomePage() {
  return <>
    <section className="hero">
      <Image src="/images/social/carport-storefront.jpg" alt="The Carport Wheels storefront on West Avenue at dusk, illuminated sign above the display floor" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="container hero-content">
        <div className="hero-copy"><span className="eyebrow light">WEST AVENUE · QUEZON CITY</span><h1>FITTED<br /><em>RIGHT.</em></h1><p>Real brands. Honest specs. A wheel and tyre setup checked for your actual car—not guessed from a photo.</p><div className="hero-actions"><Link className="button primary" href="/fitment">Will this fit my car? <ArrowRight size={18} /></Link><Link className="button ghost" href="/wheels">Browse wheels</Link></div></div>
        <div className="hero-proof"><span><b>15</b> model launch set</span><span><b>7</b> wheel brands</span><span><b>0</b> guessed modified fits</span></div>
      </div>
    </section>

    <section className="brand-rail"><div className="container"><span className="rail-label">Brands on the floor</span>{brands.map((brand) => <Link href={`/brands/${brand.slug}`} key={brand.slug}>{brand.name}</Link>)}</div></section>

    <section className="section tight concrete"><div className="container split-heading"><div><span className="eyebrow">THE CARPORT DIFFERENCE</span><h2>Specs first.<br />Stance follows.</h2></div><p>A customer should know why a setup works before seeing a reservation button. That turns “magkano?” into a fitment conversation the shop can stand behind.</p></div><div className="container value-grid">
      <article><span className="icon-box"><Gauge /></span><h3>Measured fitment</h3><p>PCD, bore, diameter, width and offset are checked in a clear order.</p></article>
      <article><span className="icon-box"><ShieldCheck /></span><h3>No false certainty</h3><p>Modified vehicles go to a fitter, with the exact information the shop needs.</p></article>
      <article><span className="icon-box"><Wrench /></span><h3>Installed by the team</h3><p>The journey ends at a fitting slot—not an anonymous checkout screen.</p></article>
    </div></section>

    <section className="section tall asphalt"><div className="container section-heading light"><div><span className="eyebrow light">ILLUSTRATIVE FLOOR STOCK</span><h2>Start with what fits.</h2></div><Link className="text-link light" href="/wheels">See all sample wheels <ArrowRight size={16} /></Link></div><div className="container wheel-grid">{wheels.slice(0, 3).map((wheel) => <WheelCard wheel={wheel} key={wheel.slug} />)}</div></section>

    <section className="fitment-callout"><div className="container fitment-callout-grid"><div><span className="eyebrow light">FITMENT FINDER</span><h2>Your car isn’t a dropdown.</h2><p>Stock height gets a dimensional check. Lowered, lifted, spacer, camber and big-brake setups go straight to a fitter.</p><Link className="button chrome" href="/fitment">Try the live finder <ArrowRight size={18} /></Link></div><div className="fitment-diagram"><div><small>VEHICLE</small><b>Mazda 3</b><span>2019–2025</span></div><i /><div><small>WHEEL</small><b>18×8.5J</b><span>5×114.3 · ET38</span></div><i /><div className="approved"><BadgeCheck /><small>ILLUSTRATED</small><b>Match</b><span>Stock height</span></div></div></div></section>

    <section className="section tight concrete"><div className="container section-heading"><div><span className="eyebrow">REAL SHOP. REAL WORK.</span><h2>Built at Carport.</h2></div><Link className="text-link" href="/builds">View the gallery <ArrowRight size={16} /></Link></div><div className="container build-grid">{builds.slice(0, 4).map((build) => <figure key={build.image}><Image src={build.image} alt={`${build.vehicle} at Carport Wheels`} fill sizes="(max-width: 700px) 90vw, 25vw" /><figcaption><span className="sample-badge">ILLUSTRATIVE CAPTION</span><b>{build.vehicle}</b><small>{build.detail}</small></figcaption></figure>)}</div></section>

    <section className="section reviews-section"><div className="container"><span className="eyebrow light">THE TRUST LOOP</span><h2>Good work should<br />create the next customer.</h2><div className="review-grid">{reviews.map((review) => <blockquote key={review.name}><span className="sample-badge">SAMPLE REVIEW</span><p>“{review.quote}”</p><footer><b>{review.name}</b><span>{review.vehicle}</span></footer></blockquote>)}</div></div></section>

    <section className="final-cta"><div className="container"><span className="eyebrow light">READY WHEN YOUR CAR IS</span><h2>Choose the setup.<br />We’ll check the fit.</h2><div><Link className="button primary" href="/fitment">Find my fitment <ArrowRight size={18} /></Link><a className="button ghost" href="tel:09273679567">Call 0927 367 9567</a></div></div></section>
  </>;
}
