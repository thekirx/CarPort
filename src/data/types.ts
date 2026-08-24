export type StockStatus = "in_stock" | "low" | "indent" | "out";
export type Suspension = "stock" | "lowered" | "lifted" | "unknown";
export type Pcd = `${number}x${number}`;

export interface WheelVariant {
  sku: string;
  diameter: number;
  width: number;
  offset: number;
  pcd: Pcd;
  centreBore: number;
  finish: string;
  pricePerSet: number;
  stock: StockStatus;
  sample: true;
}

export interface Wheel {
  slug: string;
  brand: string;
  model: string;
  construction: string;
  description: string;
  image: string;
  variants: WheelVariant[];
  sample: true;
}

export interface Vehicle {
  slug: string;
  make: string;
  model: string;
  yearLabel: string;
  pcd: Pcd;
  hubBore: number;
  diameterWindow: [number, number];
  widthWindow: [number, number];
  offsetWindow: [number, number];
  segment: "compact" | "sedan" | "crossover" | "pickup" | "suv";
  validated: boolean;
  sample: true;
}

export interface FitmentCheck {
  label: string;
  value: string;
  pass: boolean;
}

export interface FitmentResult {
  verdict: "fits" | "staff_check" | "no_fit";
  reasons: string[];
  clearanceNote?: string;
  /** The engine's working, shown to the customer. Order matches the rule order. */
  checks: FitmentCheck[];
}
