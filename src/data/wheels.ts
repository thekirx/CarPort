import type { Pcd, StockStatus, Wheel, WheelVariant } from "./types";

type Seed = { brand: string; model: string; image: string; pcd: Pcd; diameter: number; width: number; offset: number; bore: number; price: number; stock: StockStatus; finish: string };

const seeds: Seed[] = [
  { brand: "VLF", model: "VLF30 Low Form", image: "/images/social/carport-social-13.jpg", pcd: "5x114.3", diameter: 18, width: 8.5, offset: 38, bore: 73.1, price: 68000, stock: "in_stock", finish: "Gloss Black / Machined Lip" },
  { brand: "Niche", model: "Vosso M204", image: "/images/social/carport-social-01.jpg", pcd: "5x114.3", diameter: 18, width: 8, offset: 40, bore: 72.6, price: 92000, stock: "low", finish: "Anthracite" },
  { brand: "Rotiform", model: "RSE", image: "/images/social/carport-social-15.jpg", pcd: "5x114.3", diameter: 19, width: 8.5, offset: 42, bore: 72.6, price: 108000, stock: "indent", finish: "Gloss Black" },
  { brand: "Motegi", model: "MR147 CM7", image: "/images/social/carport-social-14.jpg", pcd: "5x114.3", diameter: 18, width: 8.5, offset: 38, bore: 72.6, price: 76000, stock: "in_stock", finish: "Black / Red Ring" },
  { brand: "Fuel", model: "Rebel 6", image: "/images/social/carport-social-03.jpg", pcd: "6x139.7", diameter: 18, width: 9, offset: 20, bore: 106.1, price: 112000, stock: "in_stock", finish: "Matte Black" },
  { brand: "Fuel", model: "Vector", image: "/images/social/carport-social-02.jpg", pcd: "6x139.7", diameter: 20, width: 9, offset: 20, bore: 106.1, price: 138000, stock: "low", finish: "Gunmetal" },
  { brand: "DUB", model: "Push S109", image: "/images/social/carport-social-06.jpg", pcd: "6x139.7", diameter: 20, width: 9, offset: 18, bore: 106.1, price: 148000, stock: "indent", finish: "Gloss Black" },
  { brand: "Asanti", model: "ABL-23 Sigma", image: "/images/social/carport-social-09.jpg", pcd: "6x139.7", diameter: 20, width: 9, offset: 20, bore: 106.1, price: 156000, stock: "low", finish: "Black / Machined Face" },
  { brand: "VLF", model: "VLF05", image: "/images/social/carport-social-13.jpg", pcd: "5x100", diameter: 17, width: 7.5, offset: 40, bore: 73.1, price: 58000, stock: "in_stock", finish: "Hyper Black" },
  { brand: "Motegi", model: "MR116 FS5", image: "/images/social/carport-social-15.jpg", pcd: "4x100", diameter: 17, width: 7, offset: 40, bore: 72.6, price: 64000, stock: "in_stock", finish: "Matte Black" },
  { brand: "Niche", model: "Gamma M191", image: "/images/social/carport-social-01.jpg", pcd: "5x114.3", diameter: 19, width: 8.5, offset: 40, bore: 72.6, price: 118000, stock: "indent", finish: "Bronze" },
  { brand: "Fuel", model: "D694 Covert", image: "/images/social/carport-social-16.jpg", pcd: "5x139.7", diameter: 17, width: 8, offset: 10, bore: 108, price: 98000, stock: "in_stock", finish: "Matte Bronze" }
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const variant = (seed: Seed, index: number): WheelVariant => ({
  sku: `SAMPLE-${slugify(seed.brand).toUpperCase()}-${String(index + 1).padStart(3, "0")}`,
  diameter: seed.diameter,
  width: seed.width,
  offset: seed.offset,
  pcd: seed.pcd,
  centreBore: seed.bore,
  finish: seed.finish,
  pricePerSet: seed.price,
  stock: seed.stock,
  sample: true
});

export const wheels: Wheel[] = seeds.map((seed, index) => ({
  slug: `${slugify(seed.brand)}-${slugify(seed.model)}`,
  brand: seed.brand,
  model: seed.model,
  construction: index % 3 === 0 ? "Flow-formed monoblock" : "Cast monoblock",
  description: "A fitment-led sample listing prepared for the Carport storefront demonstration.",
  image: seed.image,
  variants: [variant(seed, index)],
  sample: true
}));
