import { notFound } from "next/navigation";
import { ReservationFlow } from "@/components/ReservationFlow";
import { wheels } from "@/data/wheels";
export function generateStaticParams() { return wheels.map((wheel) => ({ slug: wheel.slug })); }
export default async function ReservePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const wheel = wheels.find((item) => item.slug === slug); if (!wheel) notFound(); return <><section className="page-hero compact"><div className="container"><span className="eyebrow light">DEMO RESERVATION</span><h1>Hold a fitting slot.</h1><p>{wheel.brand} {wheel.model} · no payment or message is sent.</p></div></section><section className="section concrete"><div className="container narrow"><ReservationFlow wheelName={`${wheel.brand} ${wheel.model}`} /></div></section></>; }
