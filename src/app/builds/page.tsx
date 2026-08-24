import Image from "next/image";
import type { Metadata } from "next";
import { builds, reviews } from "@/data/proof";

export const metadata: Metadata = { title: "Builds" };

// Photography is the hero here — the title sits inside the mosaic rather than above it.
export default function BuildsPage() {
  return <>
    <section className="section tight concrete">
      <div className="container build-grid large">
        <div className="build-intro">
          <span className="eyebrow light">Authentic Carport photography</span>
          <h1>Shop floor, not stock photos.</h1>
          <p>Real imagery from Carport’s own gallery. Captions and reviews stay illustrative until the client approves them.</p>
        </div>
        {builds.map((build) => <figure key={build.image}>
          <Image src={build.image} alt={`${build.vehicle} at Carport Wheels`} fill sizes="(max-width: 700px) 90vw, 33vw" />
          <figcaption><span className="sample-badge">ILLUSTRATIVE CAPTION</span><b>{build.vehicle}</b><small>{build.detail}</small></figcaption>
        </figure>)}
      </div>
    </section>
    <section className="section asphalt"><div className="container review-grid">{reviews.map((review) => <blockquote key={review.name}><span className="sample-badge">SAMPLE REVIEW</span><p>“{review.quote}”</p><footer><b>{review.name}</b><span>{review.vehicle}</span></footer></blockquote>)}</div></section>
  </>;
}
