import { notFound } from "next/navigation";
import { ReservationFlow } from "@/components/ReservationFlow";
import { wheels } from "@/data/wheels";

export function generateStaticParams() { return wheels.map((wheel) => ({ slug: wheel.slug })); }

// A form has no hero. Open on step 1.
export default async function ReservePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wheel = wheels.find((item) => item.slug === slug);
  if (!wheel) notFound();
  return <>
    <section className="page-head">
      <div className="container">
        <div><span className="eyebrow">Demo reservation</span><h1>Hold a fitting slot.</h1></div>
        <p>{wheel.brand} {wheel.model} · no payment is taken and no message is sent.</p>
      </div>
    </section>
    <section className="section tight concrete"><div className="container narrow"><ReservationFlow wheelName={`${wheel.brand} ${wheel.model}`} /></div></section>
  </>;
}
