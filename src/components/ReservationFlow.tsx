"use client";

import { Check, ChevronRight, LockKeyhole } from "lucide-react";
import { useState } from "react";

const slots = ["Tue · 10:00 AM", "Tue · 2:00 PM", "Wed · 11:30 AM", "Thu · 3:30 PM"];

export function ReservationFlow({ wheelName }: { wheelName: string }) {
  const [step, setStep] = useState(1);
  const [slot, setSlot] = useState(slots[0]);
  const [name, setName] = useState("");
  if (step === 3) return <div className="reservation-success"><span className="success-icon"><Check /></span><span className="eyebrow">Demo reservation complete</span><h2>Your fitting visit is held.</h2><p>{wheelName} · {slot}</p><div className="success-grid"><div><b>Bring</b><span>The vehicle and current wheel-lock key.</span></div><div><b>After fitting</b><span>We’ll remind you about a re-torque check.</span></div><div><b>Three days later</b><span>A review request closes the trust loop.</span></div></div><p className="microcopy"><LockKeyhole size={16} /> Nothing was transmitted. This demonstration remains in your browser.</p></div>;
  return (
    <div className="reservation-flow">
      <div className="progress"><span className={step >= 1 ? "active" : ""}>1. Slot</span><span className={step >= 2 ? "active" : ""}>2. Details</span><span>3. Done</span></div>
      {step === 1 ? <><h2>Choose an illustrated fitting slot.</h2><div className="slot-grid">{slots.map((item) => <button className={slot === item ? "slot active" : "slot"} onClick={() => setSlot(item)} key={item}>{item}</button>)}</div><button className="button primary wide" onClick={() => setStep(2)}>Continue <ChevronRight size={18} /></button></> : <><h2>Who should the demo hold this for?</h2><label>Customer name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Sample customer" /></label><label>Mobile number<input inputMode="tel" placeholder="09XX XXX XXXX" /></label><p className="microcopy"><LockKeyhole size={16} /> Demo only. Details are not sent or saved to a server.</p><button className="button primary wide" disabled={!name.trim()} onClick={() => setStep(3)}>Confirm demo reservation <ChevronRight size={18} /></button></>}
    </div>
  );
}
