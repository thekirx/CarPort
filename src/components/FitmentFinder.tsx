"use client";

import Link from "next/link";
import { AlertTriangle, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import type { Suspension } from "@/data/types";
import { vehicles } from "@/data/vehicles";
import { wheels } from "@/data/wheels";
import { evaluateFitment } from "@/lib/fitment";
import { peso } from "@/lib/format";

export function FitmentFinder() {
  const [vehicleSlug, setVehicleSlug] = useState("mazda-3");
  const [suspension, setSuspension] = useState<Suspension>("stock");
  const [submitted, setSubmitted] = useState(false);
  const vehicle = vehicles.find((item) => item.slug === vehicleSlug)!;
  const results = useMemo(() => wheels.map((wheel) => ({ wheel, result: evaluateFitment(vehicle, wheel.variants[0], suspension) })).filter((item) => item.result.verdict !== "no_fit"), [vehicle, suspension]);
  const confirmed = results.filter((item) => item.result.verdict === "fits");
  const staff = results.filter((item) => item.result.verdict === "staff_check");

  return (
    <div className="finder-panel">
      <div className="finder-form">
        <div className="step-number">01</div>
        <div><span className="eyebrow">Your vehicle</span><h2>Start with the setup.</h2></div>
        <label>Vehicle model<select value={vehicleSlug} onChange={(event) => { setVehicleSlug(event.target.value); setSubmitted(false); }}>{vehicles.map((item) => <option value={item.slug} key={item.slug}>{item.make} {item.model} · {item.yearLabel}</option>)}</select></label>
        <fieldset><legend>Suspension</legend><div className="choice-grid">{(["stock", "lowered", "lifted", "unknown"] as Suspension[]).map((item) => <label className={suspension === item ? "choice active" : "choice"} key={item}><input type="radio" name="suspension" value={item} checked={suspension === item} onChange={() => { setSuspension(item); setSubmitted(false); }} />{item}</label>)}</div></fieldset>
        <button className="button primary wide" onClick={() => setSubmitted(true)}>Check illustrated fitment <ChevronRight size={18} /></button>
        <p className="microcopy"><ShieldCheck size={16} /> Modified, big-brake, spacer, camber and non-standard tyre setups are checked by a fitter—never guessed online.</p>
      </div>
      <div className="finder-results" aria-live="polite">
        {!submitted ? <div className="result-placeholder"><span className="result-ring">{vehicle.pcd}</span><h3>Ready when you are.</h3><p>We’ll compare bolt pattern, hub bore, diameter, width and offset.</p></div> : confirmed.length ? <>
          <div className="result-heading fits"><CheckCircle2 /><div><span className="eyebrow">Illustrated result</span><h2>{confirmed.length} confirmed sample {confirmed.length === 1 ? "match" : "matches"}</h2></div></div>
          <p className="result-note">This demonstrates the signed-off, stock-height customer path. Production data requires Carport approval.</p>
          {confirmed.slice(0, 3).map(({ wheel }) => <div className="compact-result" key={wheel.slug}><div><span>{wheel.brand}</span><strong>{wheel.model}</strong><small>{wheel.variants[0].diameter}×{wheel.variants[0].width}J · ET{wheel.variants[0].offset}</small></div><div><b>{peso(wheel.variants[0].pricePerSet)}</b><Link href={`/wheels/${wheel.slug}?vehicle=${vehicle.slug}`}>View wheel</Link></div></div>)}
        </> : <>
          <div className="result-heading check"><AlertTriangle /><div><span className="eyebrow">Fitter confirmation required</span><h2>Needs our fitter’s confirmation.</h2></div></div>
          <p className="result-note">{staff[0]?.result.reasons[0] ?? "No safe automated match is available for this illustrated setup."}</p>
          {staff.slice(0, 3).map(({ wheel }) => <div className="compact-result check" key={wheel.slug}><div><span>{wheel.brand}</span><strong>{wheel.model}</strong><small>Candidate only · not confirmed</small></div><a className="text-link" href="https://www.facebook.com/people/Carport-Wheels/61558977561141/" target="_blank" rel="noreferrer">Send to shop</a></div>)}
          <div className="staff-gate"><strong>Reservation stays locked.</strong><span>Send a side photo, current wheel/tyre specs, and any suspension or brake changes.</span></div>
        </>}
      </div>
    </div>
  );
}
