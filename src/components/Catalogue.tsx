"use client";

import { useMemo, useState } from "react";
import type { Wheel } from "@/data/types";
import { WheelCard } from "./WheelCard";

export function Catalogue({ wheels }: { wheels: Wheel[] }) {
  const [brand, setBrand] = useState("all");
  const [diameter, setDiameter] = useState("all");
  const shown = useMemo(() => wheels.filter((wheel) =>
    (brand === "all" || wheel.brand === brand) &&
    (diameter === "all" || String(wheel.variants[0].diameter) === diameter)
  ), [brand, diameter, wheels]);

  return (
    <>
      <div className="filter-bar">
        <label>Brand<select value={brand} onChange={(event) => setBrand(event.target.value)}><option value="all">All brands</option>{[...new Set(wheels.map((wheel) => wheel.brand))].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Diameter<select value={diameter} onChange={(event) => setDiameter(event.target.value)}><option value="all">All sizes</option>{[...new Set(wheels.map((wheel) => wheel.variants[0].diameter))].sort().map((item) => <option key={item}>{item} inch</option>)}</select></label>
        <div className="filter-count"><span>{shown.length}</span> sample wheels</div>
      </div>
      {shown.length ? <div className="wheel-grid">{shown.map((wheel) => <WheelCard key={wheel.slug} wheel={wheel} />)}</div> : <div className="empty-state"><h2>No sample wheels match.</h2><button className="button secondary" onClick={() => { setBrand("all"); setDiameter("all"); }}>Reset filters</button></div>}
    </>
  );
}
