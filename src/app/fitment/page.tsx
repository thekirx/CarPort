import type { Metadata } from "next";
import { FitmentFinder } from "@/components/FitmentFinder";

export const metadata: Metadata = { title: "Fitment Finder" };

// The finder is the hero. Slim brand band, then straight into the tool.
export default function FitmentPage() {
  return <>
    <section className="page-hero brand compact">
      <div className="container">
        <span className="eyebrow light">Fitted right</span>
        <h1>Check the setup. Then choose the wheel.</h1>
        <p>An illustrative 15-model launch list. Modified setups are routed to the shop, never guessed.</p>
      </div>
    </section>
    <section className="section tight concrete"><div className="container"><FitmentFinder /></div></section>
  </>;
}
