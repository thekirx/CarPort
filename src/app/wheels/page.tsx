import type { Metadata } from "next";
import { Catalogue } from "@/components/Catalogue";
import { wheels } from "@/data/wheels";

export const metadata: Metadata = { title: "Wheels" };
export default function WheelsPage() { return <><section className="page-hero"><div className="container"><span className="eyebrow light">SAMPLE CATALOGUE</span><h1>Wheels, with the<br />numbers that matter.</h1><p>Filter the illustrative range, then check a wheel against your vehicle before reserving a fitting slot.</p></div></section><section className="section concrete"><div className="container"><Catalogue wheels={wheels} /></div></section></>; }
