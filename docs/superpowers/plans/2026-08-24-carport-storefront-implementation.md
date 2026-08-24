# Carport Wheels Storefront Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pitch-grade, mobile-first Carport Wheels storefront that demonstrates the complete fitted-wheel discovery and reservation journey without implying that production inventory, payments, messaging, or back-office systems exist.

**Architecture:** Use a statically generated Next.js App Router application with typed sample-data modules and small, responsibility-focused components. Keep the safety-critical fitment decision in a pure TypeScript function, preserve finder state in URLs, and keep reservation state local to the browser so the demo has no external data transmission.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, Testing Library where component behavior warrants it, `next/font`, static metadata/JSON-LD, GitHub-to-Vercel deployment.

**Spec:** `docs/superpowers/specs/2026-08-24-carport-storefront-design.md`

## Global Constraints

- The build is a demonstration storefront, not a production commerce system.
- The first-viewport primary line is exactly `Fitted Right.`
- Use Archivo for display/body and JetBrains Mono for specifications, SKUs, prices, fitment values, and aligned numeric data.
- Brand colors are exact: Asphalt `#0C0E10`, Graphite `#1A1E22`, Midnight `#121B31`, Carport Crimson `#A6123F`, Deep Wine `#5A0E2E`, Chrome `#C6CDD4`, Concrete `#EDEFF1`, Sodium `#B8811C`, in-stock `#1E7F4F`, and out/indent `#6F7883`.
- Mobile is designed first at 375px; tap targets are at least 44px.
- All products, prices, stock, reviews, builds, and fitment records are illustrative and visibly marked as sample data.
- Modified or unvalidated vehicles return `staff_check`, never `fits`, and cannot proceed directly to reservation.
- No backend, payments, CRM, authentication, SMS/email sending, Meta synchronization, CMS, or production analytics.
- Demo customer data remains local to the browser and is never transmitted.
- Demo deployments are `noindex, nofollow` and disallow crawling.
- Respect `prefers-reduced-motion` and meet WCAG AA contrast on every rendered pairing.
- Use Image Gen for the complete visual concept and central wheel/build imagery before implementing the visible surfaces.
- Do not deploy, create an external repository, or change a domain without explicit user authorization.

---

## File Map

### Project and quality configuration

- `package.json` — scripts and locked dependencies
- `next.config.ts` — static-friendly Next.js configuration
- `tsconfig.json` — strict TypeScript setup
- `vitest.config.ts` — unit-test environment and aliases
- `eslint.config.mjs` — Next.js lint rules
- `postcss.config.mjs` — Tailwind PostCSS integration
- `README.md` — local development and GitHub/Vercel handoff
- `scripts/check-demo-data.mjs` — prevents disabling demo mode while sample records remain

### App routes

- `src/app/layout.tsx` — fonts, metadata defaults, demo banner, shell
- `src/app/page.tsx` — homepage composition
- `src/app/not-found.tsx` — branded recovery page
- `src/app/robots.ts` — noindex-compatible crawler policy
- `src/app/wheels/page.tsx` — catalogue surface
- `src/app/wheels/[slug]/page.tsx` — static product pages
- `src/app/brands/[brand]/page.tsx` — static brand pages
- `src/app/fitment/page.tsx` — finder entry point
- `src/app/fitment/[vehicle]/page.tsx` — static shareable result pages
- `src/app/reserve/[slug]/page.tsx` — reservation workflow
- `src/app/builds/page.tsx` — gallery and reviews

### Domain data and logic

- `src/domain/catalogue.ts` — catalogue and stock types
- `src/domain/fitment.ts` — vehicle/result types and the `evaluateFitment` engine
- `src/domain/fitment.test.ts` — safety-boundary tests
- `src/domain/reservation.ts` — local reservation draft types
- `src/data/brands.ts` — seven sample brands
- `src/data/wheels.ts` — sample wheel models and variants
- `src/data/vehicles.ts` — illustrative 15-model launch list
- `src/data/builds.ts` — sample build gallery records
- `src/data/reviews.ts` — sample review records
- `src/lib/demo.ts` — demo flag and sample guard helpers
- `src/lib/format.ts` — peso and specification formatting
- `src/lib/catalogue.ts` — filtering and lookup helpers

### UI components

- `src/components/layout/*` — header, footer, shell, mobile navigation, demo banner
- `src/components/brand/*` — replaceable mark and wordmark
- `src/components/primitives/*` — button, sample tag, stock chip, field, empty state
- `src/components/catalogue/*` — product card, filter bar, spec table, finish selector
- `src/components/fitment/*` — finder form, result list, verdict, staff-check panel
- `src/components/reservation/*` — slot picker, details form, summary, success state
- `src/components/proof/*` — brand strip, build card, review card

### Visual assets and tokens

- `design/concepts/*` — generated full-page and workflow reference concepts
- `public/images/wheels/*` — generated wheel renders
- `public/images/builds/*` — generated fitted-car photography
- `src/styles/tokens.css` — brand tokens, typography, spacing, focus, and motion variables
- `src/app/globals.css` — Tailwind import and global element styling

---

### Task 1: Project Foundation and Demo Safety

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `eslint.config.mjs`
- Create: `postcss.config.mjs`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/styles/tokens.css`
- Create: `src/lib/demo.ts`
- Create: `scripts/check-demo-data.mjs`
- Create: `src/app/robots.ts`

**Interfaces:**
- Produces: `SAMPLE_DATA: true`, `SampleRecord`, `assertSampleRecord(record)`, global brand tokens, root layout, and `pnpm check:demo`.
- Consumes: none.

- [ ] **Step 1: Create the Next.js project configuration and scripts**

Define scripts with these exact responsibilities:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "pnpm check:demo && next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "check:demo": "node scripts/check-demo-data.mjs"
  }
}
```

Install stable releases of Next.js, React, React DOM, TypeScript, Tailwind CSS, PostCSS, ESLint, Vitest, and the official Next.js ESLint configuration. Commit the resulting lockfile.

- [ ] **Step 2: Write the failing demo-safety check**

Create `scripts/check-demo-data.mjs` so it scans `src/data/*.ts`. Verify it exits non-zero when `SAMPLE_DATA` is false and a source file contains `sample: true`.

Run: `pnpm check:demo`

Expected before implementation: FAIL because `src/lib/demo.ts` is missing.

- [ ] **Step 3: Implement the demo flag and build guard**

Use this public interface:

```ts
export const SAMPLE_DATA = true as const;

export interface SampleRecord {
  sample: true;
}

export function assertSampleRecord(record: { sample?: boolean }): asserts record is SampleRecord {
  if (record.sample !== true) throw new Error("Demo records must be marked sample: true");
}
```

The check script must parse the exported literal in `src/lib/demo.ts`, not execute arbitrary source files.

- [ ] **Step 4: Add exact brand tokens and font-ready global styles**

Define every color in Global Constraints as a CSS custom property, plus focus-ring, spacing, container, and motion variables. Set Asphalt/Concrete as the default dark pairing; avoid introducing additional brand colors.

- [ ] **Step 5: Add the root layout and crawler policy**

The root layout loads Archivo and JetBrains Mono through `next/font`, renders a persistent demo banner, and exports default metadata with `robots: { index: false, follow: false }`. `robots.ts` returns `Disallow: /` while `SAMPLE_DATA` is true.

- [ ] **Step 6: Run foundation checks**

Run: `pnpm check:demo && pnpm typecheck && pnpm lint`

Expected: all commands pass.

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml next.config.ts tsconfig.json vitest.config.ts eslint.config.mjs postcss.config.mjs scripts src/app/layout.tsx src/app/globals.css src/app/robots.ts src/styles src/lib/demo.ts
git commit -m "chore: scaffold Carport storefront demo"
```

---

### Task 2: Typed Sample Catalogue and Formatting

**Files:**
- Create: `src/domain/catalogue.ts`
- Create: `src/data/brands.ts`
- Create: `src/data/wheels.ts`
- Create: `src/lib/format.ts`
- Create: `src/lib/catalogue.ts`
- Create: `src/lib/catalogue.test.ts`

**Interfaces:**
- Produces: `Brand`, `Wheel`, `WheelVariant`, `StockStatus`, `brands`, `wheels`, `formatPeso`, `formatSpec`, `filterWheels`, `getWheelBySlug`, `getBrandBySlug`.
- Consumes: `SampleRecord` from `src/lib/demo.ts`.

- [ ] **Step 1: Write failing catalogue helper tests**

Cover combined filters and exact formatting:

```ts
expect(formatPeso(62000)).toBe("₱62,000");
expect(formatSpec({ diameter: 18, width: 8.5, offset: 35, pcd: "5x114.3" }))
  .toBe("18×8.5 ET+35 · 5×114.3");
expect(filterWheels(wheels, { brand: "rotiform", diameter: 18, stock: "in_stock" }))
  .toHaveLength(1);
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `pnpm test -- src/lib/catalogue.test.ts`

Expected: FAIL because domain modules do not exist.

- [ ] **Step 3: Define exact catalogue types**

```ts
export type StockStatus = "in_stock" | "low" | "indent" | "out";

export interface WheelVariant extends SampleRecord {
  sku: string;
  diameter: number;
  width: number;
  offset: number;
  pcd: `${number}x${number}`;
  centreBore: number;
  loadRating: number;
  finish: string;
  pricePerSet: number;
  stock: StockStatus;
  stockNote?: string;
}

export interface Wheel extends SampleRecord {
  slug: string;
  brand: string;
  model: string;
  construction: string;
  description: string;
  image: string;
  variants: WheelVariant[];
}
```

- [ ] **Step 4: Seed seven brands and approximately 24 wheel models**

Use Niche, Rotiform, Motegi, Asanti, Dub, VLF, and Fuel. Ensure the seed set contains all major PCD families needed by the 15 vehicles and includes in-stock, low, indent, and out variants. All records include `sample: true`.

- [ ] **Step 5: Implement catalogue lookup, filter, and formatter helpers**

Filters operate across variants without mutating source arrays. `getWheelBySlug` and `getBrandBySlug` return `undefined` for unknown slugs.

- [ ] **Step 6: Run tests and quality checks**

Run: `pnpm test -- src/lib/catalogue.test.ts && pnpm typecheck && pnpm check:demo`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/domain/catalogue.ts src/data/brands.ts src/data/wheels.ts src/lib/format.ts src/lib/catalogue.ts src/lib/catalogue.test.ts
git commit -m "feat: add typed sample wheel catalogue"
```

---

### Task 3: Safety-Critical Fitment Engine

**Files:**
- Create: `src/domain/fitment.ts`
- Create: `src/domain/fitment.test.ts`
- Create: `src/data/vehicles.ts`

**Interfaces:**
- Produces: `Suspension`, `Vehicle`, `FitmentVerdict`, `FitmentResult`, `evaluateFitment(vehicle, variant, suspension)`, and `vehicles`.
- Consumes: `WheelVariant` and `SampleRecord`.

- [ ] **Step 1: Write all safety-boundary tests before implementation**

Tests must cover:

```ts
expect(evaluateFitment(vehicle, mismatchPcd, "stock").verdict).toBe("no_fit");
expect(evaluateFitment(vehicle, boreUndersizedByPointOne, "stock").reasons)
  .toContain("Centre bore is too small for this hub.");
expect(evaluateFitment(vehicle, offsetAtMinimum, "stock").verdict).toBe("fits");
expect(evaluateFitment(vehicle, offsetAtMaximum, "stock").verdict).toBe("fits");
expect(evaluateFitment(vehicle, knownGood, "lowered").verdict).toBe("staff_check");
expect(evaluateFitment(unvalidatedVehicle, knownGood, "stock").verdict).toBe("staff_check");
expect(evaluateFitment(vehicle, knownGood, "stock").verdict).toBe("fits");
```

- [ ] **Step 2: Run tests and verify failure**

Run: `pnpm test -- src/domain/fitment.test.ts`

Expected: FAIL because `evaluateFitment` is not implemented.

- [ ] **Step 3: Define vehicle and result types**

```ts
export type Suspension = "stock" | "lowered" | "lifted" | "unknown";
export type FitmentVerdict = "fits" | "staff_check" | "no_fit";

export interface Vehicle extends SampleRecord {
  slug: string;
  make: string;
  model: string;
  variantName?: string;
  yearFrom: number;
  yearTo: number | null;
  pcd: `${number}x${number}`;
  hubBore: number;
  diameterWindow: readonly [number, number];
  widthWindow: readonly [number, number];
  offsetWindow: readonly [number, number];
  segment: "compact" | "sedan" | "crossover" | "pickup" | "suv";
  validated: boolean;
}

export interface FitmentResult {
  verdict: FitmentVerdict;
  reasons: string[];
}
```

- [ ] **Step 4: Implement ordered hard failures and safety gates**

Apply PCD, centre bore, diameter, width, and offset checks in that order. Dimensional hard failures return `no_fit`; modified suspension or unvalidated data returns `staff_check`; only a passing validated stock-height pairing returns `fits`.

- [ ] **Step 5: Seed the illustrative 15-model list**

Include Mazda 3, Honda Civic, Toyota Corolla Altis, Toyota Vios, Honda City, Mitsubishi Mirage G4, Toyota Raize, Suzuki Jimny, Toyota Hilux, Ford Ranger, Nissan Navara, Toyota Fortuner, Mitsubishi Montero Sport, Ford Everest, and Toyota Innova. Clearly flag which small subset is validated solely for demonstrating confirmed-fit behavior.

- [ ] **Step 6: Run focused and full tests**

Run: `pnpm test -- src/domain/fitment.test.ts && pnpm test && pnpm typecheck`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/domain/fitment.ts src/domain/fitment.test.ts src/data/vehicles.ts
git commit -m "feat: add guarded fitment evaluation engine"
```

---

### Task 4: Complete Visual Concept and Production Assets

**Files:**
- Create: `design/concepts/carport-home-desktop.png`
- Create: `design/concepts/carport-home-mobile.png`
- Create: `design/concepts/carport-fitment-mobile.png`
- Create: `design/concepts/carport-product-desktop.png`
- Create: `public/images/wheels/*.webp`
- Create: `public/images/builds/*.webp`
- Create: `src/components/brand/Mark.tsx`
- Create: `src/components/brand/Wordmark.tsx`

**Interfaces:**
- Produces: accepted visual reference images, central wheel/build assets, and replaceable `Mark`/`Wordmark` components.
- Consumes: brand tokens and exact approved copy from the spec.

- [ ] **Step 1: Generate the complete storefront concept before UI coding**

Use the image-generation workflow to create a full desktop homepage, full mobile homepage, fitment workflow state, and product-detail state. The images must use the exact crimson/wine/midnight palette, broad Archivo-like display proportion, mono specifications, realistic premium wheel imagery, open section rhythm, and no generic dashboard-card aesthetic.

- [ ] **Step 2: Inspect every concept at original resolution**

Use `view_image` and record the accepted first-viewport composition, section order, typography hierarchy, spacing, media crops, button treatment, and mobile continuation. Regenerate any concept containing unreadable copy, invented branding, excessive decorative UI, or a palette mismatch.

- [ ] **Step 3: Generate standalone wheel and fitted-car assets**

Create consistent isolated wheel renders and portfolio-style fitted-car images that match the concept lighting and framing. Images must not contain fabricated Carport logos or readable third-party claims.

- [ ] **Step 4: Convert and optimize assets**

Store production images as WebP with stable dimensions and useful alt-text inventory. Keep concept references in `design/concepts` and production assets in `public/images`.

- [ ] **Step 5: Implement the isolated temporary brand mark**

Create one clean placeholder monogram component and a separate wordmark component. Add an inline comment stating that the master vector replaces only `Mark.tsx`.

- [ ] **Step 6: Commit**

```bash
git add design/concepts public/images src/components/brand
git commit -m "design: add Carport visual concept and storefront assets"
```

---

### Task 5: App Shell and Homepage

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/MobileNav.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/DemoBanner.tsx`
- Create: `src/components/primitives/Button.tsx`
- Create: `src/components/primitives/SampleTag.tsx`
- Create: `src/components/primitives/StockChip.tsx`
- Create: `src/components/proof/BrandStrip.tsx`
- Create: `src/components/catalogue/WheelCard.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/not-found.tsx`

**Interfaces:**
- Produces: responsive shell, navigation, global demo disclosure, homepage, reusable product presentation primitives.
- Consumes: `brands`, `wheels`, `formatPeso`, `Mark`, `Wordmark`, and concept assets.

- [ ] **Step 1: Write component behavior tests for mobile navigation and sample labels**

Verify the menu opens, closes on navigation/Escape, restores focus, and every sample wheel price/stock presentation includes visible `SAMPLE DATA` text.

- [ ] **Step 2: Run focused tests and verify failure**

Run: `pnpm test -- src/components`

Expected: FAIL because shell components do not exist.

- [ ] **Step 3: Implement primitives and responsive shell**

Use semantic anchors/buttons, visible focus states, 44px minimum targets, one primary navigation action, and no decorative header controls. Demo disclosure remains visible but compact.

- [ ] **Step 4: Implement the homepage in concept-matched slices**

Order: hero → brand strip → floor stock → fitment explanation → portfolio proof → booking CTA. Above the fold may contain only brand/navigation, `Fitted Right.`, the positioning sentence, `Will this fit my car?`, `Browse wheels`, and the controlled next-section preview.

- [ ] **Step 5: Compare desktop and mobile first viewports to concepts**

Run the app, capture both viewports, inspect with `view_image`, and fix copy, hierarchy, palette, typography, media framing, spacing, and next-section visibility before continuing.

- [ ] **Step 6: Run tests and checks**

Run: `pnpm test && pnpm typecheck && pnpm lint`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/app src/components/layout src/components/primitives src/components/proof src/components/catalogue/WheelCard.tsx
git commit -m "feat: build branded Carport storefront homepage"
```

---

### Task 6: Catalogue, Brand, and Product Surfaces

**Files:**
- Create: `src/components/catalogue/FilterBar.tsx`
- Create: `src/components/catalogue/CatalogueGrid.tsx`
- Create: `src/components/catalogue/SpecTable.tsx`
- Create: `src/components/catalogue/FinishSelector.tsx`
- Create: `src/components/primitives/EmptyState.tsx`
- Create: `src/app/wheels/page.tsx`
- Create: `src/app/wheels/[slug]/page.tsx`
- Create: `src/app/brands/[brand]/page.tsx`

**Interfaces:**
- Produces: working filters, static brand/product routes, product variant selection, metadata, and JSON-LD.
- Consumes: catalogue types/data/helpers and shared shell/primitives.

- [ ] **Step 1: Write failing filter interaction tests**

Verify combined brand/diameter/PCD/stock filtering, active-filter visibility, reset behavior, and the no-results recovery action.

- [ ] **Step 2: Implement filters and catalogue grid**

Filters use client state without mutating source data. Mobile filters expose current selections even when the control is collapsed.

- [ ] **Step 3: Implement static product and brand routes**

Use `generateStaticParams`, `generateMetadata`, and branded `notFound()` handling. Product pages include sample price, stock, variant specs, finish selection, fitment entry point, and reservation CTA only when a confirmed vehicle context is present.

- [ ] **Step 4: Add structured data**

Emit sample-safe `Product` JSON-LD without asserting real availability or reviews. Add brand metadata without unsupported authenticity language.

- [ ] **Step 5: Verify mobile specification presentation**

Ensure tables stack or scroll within their own container, show an explicit swipe hint when scrollable, and never cause page-level overflow.

- [ ] **Step 6: Run tests and build**

Run: `pnpm test && pnpm typecheck && pnpm lint && pnpm build`

Expected: PASS and all product/brand routes generate.

- [ ] **Step 7: Commit**

```bash
git add src/components/catalogue src/components/primitives/EmptyState.tsx src/app/wheels src/app/brands
git commit -m "feat: add filterable wheel catalogue and product routes"
```

---

### Task 7: Fitment Finder and Shareable Results

**Files:**
- Create: `src/components/fitment/FinderForm.tsx`
- Create: `src/components/fitment/FitVerdict.tsx`
- Create: `src/components/fitment/ResultList.tsx`
- Create: `src/components/fitment/StaffCheckPanel.tsx`
- Create: `src/lib/fitment-results.ts`
- Create: `src/lib/fitment-results.test.ts`
- Create: `src/app/fitment/page.tsx`
- Create: `src/app/fitment/[vehicle]/page.tsx`

**Interfaces:**
- Produces: URL-driven finder, grouped results, staff-check gate, and shareable vehicle route.
- Consumes: `vehicles`, `wheels`, and `evaluateFitment`.

- [ ] **Step 1: Write failing grouping tests**

Verify that `buildFitmentResults(vehicle, suspension, wheels)` separates results into `confirmed`, `staffCheck`, and omitted hard failures while preserving the full variant specification.

- [ ] **Step 2: Implement result aggregation**

Return:

```ts
interface GroupedFitmentResults {
  confirmed: Array<{ wheel: Wheel; variant: WheelVariant; result: FitmentResult }>;
  staffCheck: Array<{ wheel: Wheel; variant: WheelVariant; result: FitmentResult }>;
}
```

- [ ] **Step 3: Implement the finder form**

Collect year, vehicle, and suspension. Encode the selected state in the URL and navigate to `/fitment/[vehicle]?year=...&susp=...`.

- [ ] **Step 4: Implement result and safety states**

Confirmed results may link to the product with preserved vehicle context. Staff-check results show “Needs our fitter’s confirmation,” block reservation, and offer “Send this to the shop for checking.” No result may rely on color alone.

- [ ] **Step 5: Test keyboard, URL, empty, and modified-vehicle flows**

Verify the complete finder on desktop and at 375px. Confirm a lowered selection never exposes a reserve action.

- [ ] **Step 6: Run checks**

Run: `pnpm test && pnpm typecheck && pnpm lint && pnpm build`

Expected: PASS and 15 vehicle routes generate.

- [ ] **Step 7: Commit**

```bash
git add src/components/fitment src/lib/fitment-results.ts src/lib/fitment-results.test.ts src/app/fitment
git commit -m "feat: add guarded fitment finder workflow"
```

---

### Task 8: Local Reservation and Review-Loop Demonstration

**Files:**
- Create: `src/domain/reservation.ts`
- Create: `src/components/reservation/SlotPicker.tsx`
- Create: `src/components/reservation/ReservationForm.tsx`
- Create: `src/components/reservation/DepositSummary.tsx`
- Create: `src/components/reservation/ConfirmationState.tsx`
- Create: `src/components/reservation/ReviewLoopPreview.tsx`
- Create: `src/components/reservation/ReservationFlow.tsx`
- Create: `src/components/reservation/ReservationFlow.test.tsx`
- Create: `src/app/reserve/[slug]/page.tsx`

**Interfaces:**
- Produces: `ReservationDraft`, `ReservationFlow`, confirmation reference, re-torque date, and review preview.
- Consumes: confirmed vehicle/product context, `formatPeso`, and localStorage.

- [ ] **Step 1: Write failing workflow tests**

Verify slot selection, required-field errors, 20% deposit calculation, local persistence, confirmation state, and absence of network submission. Verify direct access without confirmed fitment context returns the user to the product explanation.

- [ ] **Step 2: Define reservation types**

```ts
export interface ReservationDraft {
  wheelSlug: string;
  variantSku: string;
  vehicleSlug: string;
  slot: string;
  customerName: string;
  mobile: string;
}
```

- [ ] **Step 3: Implement the local-only workflow**

Persist drafts under a namespaced localStorage key. The submit action updates local UI state only and must not call `fetch`, server actions, form endpoints, or third-party SDKs.

- [ ] **Step 4: Implement the success and review loop**

Show a clearly simulated booking reference, what to bring, a re-torque reminder date, and the exact explanation that a review request would arrive three days after fitting. Retain visible demo labelling.

- [ ] **Step 5: Verify safety and privacy**

Use browser network inspection to confirm no customer-entered data leaves the page. Confirm refresh restores the draft and a clear action removes it.

- [ ] **Step 6: Run tests and checks**

Run: `pnpm test && pnpm typecheck && pnpm lint && pnpm build`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/domain/reservation.ts src/components/reservation src/app/reserve
git commit -m "feat: add local reservation and review-loop demo"
```

---

### Task 9: Build Gallery, Reviews, and Recovery States

**Files:**
- Create: `src/data/builds.ts`
- Create: `src/data/reviews.ts`
- Create: `src/components/proof/BuildCard.tsx`
- Create: `src/components/proof/ReviewCard.tsx`
- Create: `src/components/proof/BuildFilter.tsx`
- Create: `src/app/builds/page.tsx`
- Modify: `src/app/not-found.tsx`

**Interfaces:**
- Produces: filterable gallery, sample reviews, branded empty/not-found states.
- Consumes: generated build imagery, `SampleTag`, and shared layout.

- [ ] **Step 1: Add typed sample proof data**

Seed approximately 12 builds across the three audience segments and eight reviews. Every record includes `sample: true`, vehicle, wheel, spec line, image, and accessible alt text.

- [ ] **Step 2: Implement gallery filters and proof cards**

Filters operate by vehicle segment/model. Cards use varied editorial media rhythm rather than a repetitive dashboard grid and visibly carry `SAMPLE DATA`.

- [ ] **Step 3: Complete recovery states**

The not-found page links to catalogue and fitment. Gallery empty state resets filters. Missing media keeps stable layout and readable fallback content.

- [ ] **Step 4: Verify responsive media crops and keyboard behavior**

Check desktop and 375px screenshots; ensure crop focal points preserve wheels and no review text is truncated.

- [ ] **Step 5: Run checks and commit**

Run: `pnpm test && pnpm typecheck && pnpm lint && pnpm build`

```bash
git add src/data/builds.ts src/data/reviews.ts src/components/proof src/app/builds src/app/not-found.tsx
git commit -m "feat: add sample build gallery and trust proof"
```

---

### Task 10: SEO, Documentation, and Vercel Readiness

**Files:**
- Modify: route metadata files under `src/app`
- Create: `src/lib/structured-data.ts`
- Create: `src/lib/structured-data.test.ts`
- Create: `README.md`
- Create: `.gitignore`

**Interfaces:**
- Produces: metadata/JSON-LD helpers, documented local setup, GitHub/Vercel handoff, and safe noindex demo behavior.
- Consumes: route data and `SAMPLE_DATA`.

- [ ] **Step 1: Write metadata and structured-data tests**

Verify title/description generation, canonical route shapes, sample-safe product data, and that demo mode emits `noindex, nofollow`.

- [ ] **Step 2: Implement metadata helpers across static routes**

Product, brand, and vehicle pages receive descriptive titles and Open Graph metadata. Do not claim production availability, real reviews, or validated fitment when the underlying sample record does not support it.

- [ ] **Step 3: Document local development and Vercel connection**

README must include prerequisites, install/dev/test/build commands, demo-data warning, asset replacement points, master-logo replacement, GitHub push instructions, and the Vercel “Import Git Repository” workflow. Do not include secrets or imply a deployment was performed.

- [ ] **Step 4: Run full quality gate**

Run: `pnpm check:demo && pnpm test && pnpm typecheck && pnpm lint && pnpm build`

Expected: all commands pass with no warnings that affect correctness.

- [ ] **Step 5: Commit**

```bash
git add src/app src/lib/structured-data.ts src/lib/structured-data.test.ts README.md .gitignore
git commit -m "docs: prepare storefront for GitHub and Vercel"
```

---

### Task 11: Full Browser, Fidelity, and Interaction Verification

**Files:**
- Create: `docs/qa/carport-storefront-fidelity-ledger.md`
- Modify: any implementation files with verified mismatches

**Interfaces:**
- Produces: verified desktop/mobile implementation and a written fidelity ledger.
- Consumes: all completed routes, accepted concept images, and the design specification.

- [ ] **Step 1: Start the production-like local server**

Run: `pnpm build && pnpm start`

Open with Browser/IAB at the normal desktop viewport and at a 375px mobile override.

- [ ] **Step 2: Verify the complete customer journey**

Exercise homepage → fitment → confirmed result → product → reservation → success/review preview. Separately verify lowered and unvalidated vehicles return staff-check and never expose reservation.

- [ ] **Step 3: Capture the latest desktop and mobile screenshots**

Capture homepage, catalogue, product, fitment result, reservation, and success states. Inspect the accepted concepts and current renders with `view_image` in the same QA pass.

- [ ] **Step 4: Write and resolve the fidelity ledger**

For at least five concrete comparison points, record mismatch, concept evidence, render evidence, and fix. Cover copy, first-viewport composition, typography, palette/gradient, asset treatment, spacing/container model, and responsive behavior.

- [ ] **Step 5: Run the above-the-fold copy diff**

Allowed visible hero copy is: `Fitted Right.`, the approved positioning sentence, `Will this fit my car?`, and `Browse wheels`, plus brand/navigation text. Remove or document any additional visible hero copy.

- [ ] **Step 6: Audit accessibility and overflow**

Verify headings, landmarks, labels, errors, status announcements, focus order, Escape behavior, 44px tap targets, reduced motion, contrast, and absence of horizontal page overflow at 375px.

- [ ] **Step 7: Run the final automated gate**

Run: `pnpm check:demo && pnpm test && pnpm typecheck && pnpm lint && pnpm build`

Expected: PASS.

- [ ] **Step 8: Commit final verified state**

```bash
git add .
git commit -m "test: verify Carport storefront experience"
```

---

## Final Acceptance Checklist

- [ ] First viewport communicates `Fitted Right.` on phone and desktop.
- [ ] All seven brand, approximately 24 wheel, and 15 vehicle routes/data sets are present.
- [ ] Fitment hard failures and staff-check gates match the ordered safety rules.
- [ ] Modified and unvalidated vehicles cannot reserve.
- [ ] Sample labels are visible on every illustrative commercial/proof surface.
- [ ] Reservation data remains browser-local and no network submission occurs.
- [ ] Desktop and 375px journeys are complete and visually signed off.
- [ ] No broken links, clipped content, page overflow, inert primary actions, or missing media.
- [ ] Demo mode remains noindex and the demo guard passes.
- [ ] Tests, type checking, linting, and production build pass.
- [ ] README accurately explains GitHub and Vercel handoff without claiming deployment.

