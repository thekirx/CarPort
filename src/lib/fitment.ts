import type { FitmentResult, Suspension, Vehicle, WheelVariant } from "@/data/types";

export function evaluateFitment(vehicle: Vehicle, wheel: WheelVariant, suspension: Suspension): FitmentResult {
  if (wheel.pcd !== vehicle.pcd) {
    return { verdict: "no_fit", reasons: [`Bolt pattern ${wheel.pcd} does not match ${vehicle.pcd}.`] };
  }
  if (wheel.centreBore < vehicle.hubBore) {
    return { verdict: "no_fit", reasons: [`Centre bore ${wheel.centreBore} mm is too small for the ${vehicle.hubBore} mm hub.`] };
  }
  if (wheel.diameter < vehicle.diameterWindow[0] || wheel.diameter > vehicle.diameterWindow[1]) {
    return { verdict: "no_fit", reasons: [`${wheel.diameter} in falls outside the illustrated diameter window.`] };
  }
  if (wheel.width < vehicle.widthWindow[0] || wheel.width > vehicle.widthWindow[1]) {
    return { verdict: "no_fit", reasons: [`${wheel.width}J falls outside the illustrated width window.`] };
  }
  if (wheel.offset < vehicle.offsetWindow[0] || wheel.offset > vehicle.offsetWindow[1]) {
    return { verdict: "no_fit", reasons: [`ET${wheel.offset} sits outside the illustrated stock-height no-rub window.`] };
  }
  if (suspension !== "stock") {
    return {
      verdict: "staff_check",
      reasons: ["Modified suspension needs a fitter to confirm tyre profile, clearance, camber and brake space."],
      clearanceNote: "Send a side photo and current wheel/tyre specs to the shop."
    };
  }
  if (!vehicle.validated) {
    return {
      verdict: "staff_check",
      reasons: ["This sample vehicle record has not been signed off by Carport's fitment lead."],
      clearanceNote: "The team will verify the complete setup before any reservation."
    };
  }
  return {
    verdict: "fits",
    reasons: ["Bolt pattern, bore, diameter, width and stock-height offset window align."],
    clearanceNote: "Illustrative match only—final tyre and brake clearance is confirmed at the shop."
  };
}
