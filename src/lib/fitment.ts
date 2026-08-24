import type { FitmentCheck, FitmentResult, Suspension, Vehicle, WheelVariant } from "@/data/types";

const et = (value: number) => `ET${value > 0 ? "+" : ""}${value}`;
const pcd = (value: string) => value.replace("x", "\u00d7");

/**
 * Evaluates one wheel variant against one vehicle.
 *
 * Rules run in a fixed order and the first hard failure wins. Every rule that ran
 * is recorded in `checks` so the interface can show its working — the reasoning is
 * the product, not a hidden implementation detail.
 */
export function evaluateFitment(vehicle: Vehicle, wheel: WheelVariant, suspension: Suspension): FitmentResult {
  const checks: FitmentCheck[] = [];
  const fail = (label: string, value: string, reason: string): FitmentResult => {
    checks.push({ label, value, pass: false });
    return { verdict: "no_fit", reasons: [reason], checks };
  };

  if (wheel.pcd !== vehicle.pcd) {
    return fail("Bolt pattern", pcd(wheel.pcd), `Bolt pattern ${wheel.pcd} does not match ${vehicle.pcd}.`);
  }
  checks.push({ label: "Bolt pattern", value: pcd(wheel.pcd), pass: true });

  if (wheel.centreBore < vehicle.hubBore) {
    return fail("Centre bore", `${wheel.centreBore} mm`, `Centre bore ${wheel.centreBore} mm is too small for the ${vehicle.hubBore} mm hub.`);
  }
  checks.push({ label: "Centre bore", value: `${wheel.centreBore} ≥ ${vehicle.hubBore} mm`, pass: true });

  if (wheel.diameter < vehicle.diameterWindow[0] || wheel.diameter > vehicle.diameterWindow[1]) {
    return fail("Diameter", `${wheel.diameter} in`, `${wheel.diameter} in falls outside the illustrated diameter window.`);
  }
  checks.push({ label: "Diameter", value: `${wheel.diameter}" in ${vehicle.diameterWindow[0]}–${vehicle.diameterWindow[1]}"`, pass: true });

  if (wheel.width < vehicle.widthWindow[0] || wheel.width > vehicle.widthWindow[1]) {
    return fail("Width", `${wheel.width}J`, `${wheel.width}J falls outside the illustrated width window.`);
  }
  checks.push({ label: "Width", value: `${wheel.width}J in ${vehicle.widthWindow[0]}–${vehicle.widthWindow[1]}J`, pass: true });

  if (wheel.offset < vehicle.offsetWindow[0] || wheel.offset > vehicle.offsetWindow[1]) {
    return fail("Offset", et(wheel.offset), `${et(wheel.offset)} sits outside the illustrated stock-height no-rub window.`);
  }
  checks.push({ label: "Offset", value: `${et(wheel.offset)} in ${et(vehicle.offsetWindow[0])}–${et(vehicle.offsetWindow[1])}`, pass: true });

  if (suspension !== "stock") {
    checks.push({ label: "Ride height", value: `${suspension[0].toUpperCase()}${suspension.slice(1)} · fitter`, pass: false });
    return {
      verdict: "staff_check",
      reasons: ["Modified suspension needs a fitter to confirm tyre profile, clearance, camber and brake space."],
      clearanceNote: "Send a side photo and current wheel/tyre specs to the shop.",
      checks
    };
  }
  checks.push({ label: "Ride height", value: "Stock", pass: true });

  if (!vehicle.validated) {
    checks.push({ label: "Record signed off", value: "Pending", pass: false });
    return {
      verdict: "staff_check",
      reasons: ["This sample vehicle record has not been signed off by Carport's fitment lead."],
      clearanceNote: "The team will verify the complete setup before any reservation.",
      checks
    };
  }
  checks.push({ label: "Record signed off", value: "Yes", pass: true });

  return {
    verdict: "fits",
    reasons: ["Bolt pattern, bore, diameter, width and stock-height offset window align."],
    clearanceNote: "Illustrative match only—final tyre and brake clearance is confirmed at the shop.",
    checks
  };
}
