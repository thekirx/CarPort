import type { Metadata } from "next";
import { FitmentFinder } from "@/components/FitmentFinder";
export const metadata: Metadata = { title: "Fitment Finder" };
export default function FitmentPage() { return <><section className="page-hero compact"><div className="container"><span className="eyebrow light">FITTED RIGHT</span><h1>Check the setup.<br />Then choose the wheel.</h1><p>This interactive demonstration uses an illustrative 15-model launch list. Modified setups are routed to the shop.</p></div></section><section className="section concrete"><div className="container"><FitmentFinder /></div></section></>; }
