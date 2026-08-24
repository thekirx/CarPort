import { describe, expect, it } from "vitest";
import { evaluateFitment } from "./fitment";
import type { Vehicle, WheelVariant } from "@/data/types";

const vehicle: Vehicle = {
  slug: "mazda-3",
  make: "Mazda",
  model: "3",
  yearLabel: "2019–2025",
  pcd: "5x114.3",
  hubBore: 67.1,
  diameterWindow: [17, 19],
  widthWindow: [7, 8.5],
  offsetWindow: [35, 45],
  segment: "sedan",
  validated: true,
  sample: true
};

const wheel: WheelVariant = {
  sku: "SAMPLE-VLF30-1885",
  diameter: 18,
  width: 8.5,
  offset: 38,
  pcd: "5x114.3",
  centreBore: 73.1,
  finish: "Gloss Black / Machined Lip",
  pricePerSet: 68000,
  stock: "in_stock",
  sample: true
};

describe("evaluateFitment", () => {
  it("returns fits for a validated stock-height pairing", () => {
    expect(evaluateFitment(vehicle, wheel, "stock").verdict).toBe("fits");
  });

  it("rejects a mismatched bolt pattern", () => {
    expect(evaluateFitment(vehicle, { ...wheel, pcd: "5x100" }, "stock")).toMatchObject({ verdict: "no_fit" });
  });

  it("rejects a centre bore undersized by 0.1 mm", () => {
    expect(evaluateFitment(vehicle, { ...wheel, centreBore: 67 }, "stock")).toMatchObject({ verdict: "no_fit" });
  });

  it("accepts both offset window edges", () => {
    expect(evaluateFitment(vehicle, { ...wheel, offset: 35 }, "stock").verdict).toBe("fits");
    expect(evaluateFitment(vehicle, { ...wheel, offset: 45 }, "stock").verdict).toBe("fits");
  });

  it("requires staff confirmation for modified suspension", () => {
    expect(evaluateFitment(vehicle, wheel, "lowered").verdict).toBe("staff_check");
  });

  it("requires staff confirmation for an unvalidated vehicle", () => {
    expect(evaluateFitment({ ...vehicle, validated: false }, wheel, "stock").verdict).toBe("staff_check");
  });
});
