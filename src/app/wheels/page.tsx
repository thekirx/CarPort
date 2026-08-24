import type { Metadata } from "next";
import { Catalogue } from "@/components/Catalogue";
import { wheels } from "@/data/wheels";

export const metadata: Metadata = { title: "Wheels" };

// A catalogue's hero is the grid. No gradient banner — filters and product first.
export default function WheelsPage() {
  return <>
    <section className="page-head">
      <div className="container">
        <div><span className="eyebrow">Sample catalogue</span><h1>Wheels, by the numbers.</h1></div>
        <p>Filter the illustrative range, then check a wheel against your vehicle before reserving a fitting slot.</p>
      </div>
    </section>
    <section className="section tight concrete"><div className="container"><Catalogue wheels={wheels} /></div></section>
  </>;
}
