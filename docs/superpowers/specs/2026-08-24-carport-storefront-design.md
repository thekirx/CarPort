# Carport Wheels Storefront Demo — Design Specification

## Objective

Build a pitch-grade, mobile-first Carport Wheels storefront that the client can use during the sales meeting. The experience must demonstrate the proposed customer journey—from social interest to validated wheel fitment and a reserved fitting slot—without implying that production inventory, payments, messaging, or back-office systems already exist.

The website is a working sales prototype and a technically reusable Phase 1 foundation. It is not a production commerce system.

## Source of truth

- The Carport Wheels brand book controls positioning, voice, colour, typography, logo treatment, accessibility, and photography direction.
- The approved storefront blueprint controls routes, interaction flows, data types, sample-data safeguards, and technical boundaries.
- When the sources conflict, customer safety and explicit demo labelling take precedence.

## Success criteria

The build is successful when:

1. A prospective client can open the Vercel URL on a phone and understand “Fitted Right” within the first viewport.
2. The client can complete the primary journey: homepage → fitment finder → compatible wheel → reservation → confirmation and review-loop preview.
3. Modified and unvalidated vehicles are never represented as confirmed fits and cannot proceed directly to reservation.
4. Every illustrative product, price, stock count, review, fitment record, and build is visibly identified as sample data.
5. The site works at 375px and at common desktop sizes without clipped content or horizontal page overflow.
6. The static build, tests, lint checks, and production build pass before handoff.
7. The repository is ready to connect to GitHub and deploy through Vercel.

## Scope

### Included

- “Fitted Right” homepage
- Wheel catalogue with client-side filters
- Product and fitment detail pages
- Seven brand landing pages
- Fitment finder covering an illustrative 15-model launch list
- Modified-vehicle and unvalidated-data safety gate
- Reservation flow with slot selection, customer details, confirmation, and review-loop preview
- Filterable build gallery and sample reviews
- Responsive navigation and footer
- Shareable URL state for fitment results
- Static SEO metadata and structured data for relevant routes
- Automated unit tests for the fitment engine
- Demo-data build guard and no-index behavior
- GitHub/Vercel deployment documentation

### Excluded

- Real inventory or inventory administration
- Real payments or deposits
- CRM and persistent customer records
- Authentication and staff permissions
- Meta catalogue synchronization
- SMS or email transmission
- Admin CMS
- Production analytics
- Production fitment advice

## Brand and experience direction

### Positioning

Carport Wheels is the West Avenue shop that gets the fitment right the first time: real brands, honest specifications, and no guesswork. The primary line is “Fitted Right.”

### Visual system

- Asphalt `#0C0E10`
- Graphite `#1A1E22`
- Midnight `#121B31`
- Carport Crimson `#A6123F`
- Deep Wine `#5A0E2E`
- Chrome `#C6CDD4`
- Concrete `#EDEFF1`
- Sodium `#B8811C`
- In-stock green `#1E7F4F`
- Out/indent gray `#6F7883`

Wine-to-Midnight grounds may carry major sections. Crimson is rationed to primary actions, prices, and critical emphasis. Neutral and chrome surfaces should dominate the page.

Typography uses Archivo for display and body copy, with the display width axis set to approximately 112 and a heavy geometric weight. JetBrains Mono is used for specifications, SKUs, prices, fitment values, and aligned numerical data.

The existing Carport monogram is represented by a clearly isolated placeholder component until the approved master vector is supplied. It must be replaceable in one file.

Photography uses authentic imagery from Carport Wheels' own Facebook gallery, with the source recorded in the repository. No AI-generated vehicle, wheel, workshop, or staff photography is used. Social images may be cropped and colour-treated for layout, but must not be altered in a way that misrepresents a product or fitment outcome.

### Voice

Confident, specific shop-floor English and Taglish. Fitment specifications lead; hype, emoji walls, fake urgency, and unsupported authenticity claims are avoided.

## Information architecture

| Route | Purpose |
| --- | --- |
| `/` | Homepage: promise, brands, floor stock, proof, fitment CTA |
| `/wheels` | Filterable catalogue |
| `/wheels/[slug]` | Product, variants, specifications, fitment context |
| `/brands/[brand]` | Static brand landing pages |
| `/fitment` | Finder stepper |
| `/fitment/[vehicle]` | Shareable vehicle results |
| `/reserve/[slug]` | Slot, details, confirmation, review preview |
| `/builds` | Build gallery and reviews |

## Primary customer journey

1. The visitor understands “Fitted Right” and sees a direct “Will this fit my car?” action.
2. The visitor selects year, vehicle, and suspension state.
3. The fitment engine separates confirmed candidates from wheels requiring staff confirmation.
4. A confirmed stock-height match can open a product page with the vehicle context preserved.
5. The visitor chooses a finish and fitting slot, enters demonstration details, and confirms a simulated reservation.
6. The success state explains what to bring, shows a re-torque reminder date, and previews the review request sent three days after fitting.

No message is sent and no money is collected.

## Fitment safety model

The fitment engine is a dependency-free TypeScript function returning `fits`, `staff_check`, or `no_fit` with human-readable reasons.

Checks are applied in this order:

1. Bolt pattern must match.
2. Wheel centre bore must not be smaller than the vehicle hub bore.
3. Diameter must fall within the validated diameter window.
4. Width must fall within the validated width window.
5. Offset must fall within the stock-height no-rub window.
6. Any suspension state other than stock returns `staff_check`.
7. Any vehicle not signed off by Carport returns `staff_check`.
8. Only a validated, stock-height vehicle passing every dimensional check returns `fits`.

`staff_check` blocks the reserve action and offers “Send this to the shop for checking.” Lowered, lifted, big-brake, spacer, camber, and non-standard tyre setups are never converted into an automated confirmation.

Seed vehicle specifications are illustrative and default to unvalidated. The demonstration may include explicitly flagged validated pairings solely to show the confirmed-fit experience.

## Demo-data safeguards

- A single `SAMPLE_DATA` flag controls demo mode.
- A site-wide banner states that products, prices, stock, builds, reviews, and fitments are illustrative.
- Prices, stock chips, review cards, build cards, and relevant fitment results carry a visible sample marker.
- All seed records include `sample: true`.
- A build check fails if demo mode is disabled while sample records remain.
- Demo deployments include `noindex, nofollow` and disallow crawling.
- Customer details entered into the reservation demonstration remain local to the browser and are not transmitted.

## Technical architecture

- Next.js App Router with TypeScript
- Static generation for all catalogue, brand, product, and vehicle routes
- Tailwind CSS with brand tokens exposed as CSS custom properties
- Typed data modules for brands, wheels, variants, vehicles, builds, reviews, and fitment overrides
- Pure TypeScript fitment engine with Vitest coverage
- URL search parameters for finder state and shareable results
- Browser-local state for the reservation draft
- `next/font` for Archivo and JetBrains Mono
- No state-management library, component kit, database, CMS, or external API

Components are divided by responsibility: layout, brand, catalogue, fitment, booking, proof, and shared primitives. Page files compose these components and do not contain the full workflow implementation.

## Seed content

- Seven named brand pages: Niche, Rotiform, Motegi, Asanti, Dub, VLF, and Fuel
- Approximately 24 illustrative wheel models and 60 variants
- Fifteen illustrative vehicle records spanning compact cars, sedans, crossovers, pickups, and SUVs
- Approximately 12 illustrative builds and eight reviews

All product names, prices, stock levels, reviews, and fitment details remain samples until replaced with client-approved data.

## Responsive behavior

- Mobile is designed first at 375px.
- The first viewport contains a restrained header, the “Fitted Right” promise, one primary fitment action, one secondary catalogue action, and a controlled preview of the next section.
- Catalogue filters become a compact mobile control without hiding the active filter state.
- Specification tables remain readable through deliberate stacking or contained horizontal scrolling with a visible hint.
- Tap targets are at least 44px and focus states are visible.
- Motion is restrained and disabled or reduced when `prefers-reduced-motion` is active.

## Accessibility and performance

- Semantic headings, landmarks, labels, errors, and status announcements
- Keyboard-operable navigation, filters, finder, finish selector, and reservation flow
- WCAG AA contrast across every actual foreground/background pairing
- No color-only fitment or stock communication
- Optimized static assets and stable media dimensions
- Target Lighthouse mobile performance and accessibility scores of at least 90 on representative pages under an agreed configuration, excluding approved third-party degradation

## Error and empty states

- No catalogue results: explain the active filters and provide a reset action.
- No confirmed fitment: show staff-check candidates where appropriate and provide a clear shop-confirmation action.
- Unknown or modified vehicle: never guess; explain what information the fitter needs.
- Missing product or brand route: branded not-found page with catalogue and fitment links.
- Reservation draft missing or invalid: return the user to the product with a plain explanation.

## Testing and verification

- Unit tests cover PCD mismatch, centre-bore failure by 0.1mm, diameter/width/offset boundaries, modified suspension, unvalidated vehicle, and a known-good pairing.
- Production build, type checking, linting, and demo-data guard must pass.
- Browser verification covers the complete primary journey on desktop and mobile.
- Visual QA compares the approved brand direction with implementation screenshots for hierarchy, typography, palette, spacing, imagery treatment, responsiveness, and interaction states.
- No inert primary controls, broken links, clipped content, accidental horizontal overflow, or unlabeled sample data may remain.

## Deployment and ownership

The repository will include setup and deployment instructions. It will be suitable for a GitHub repository connected to Vercel, with preview deployments produced from branches or pull requests and the production deployment updated from the selected main branch.

No deployment, external repository creation, or domain change is performed without explicit user authorization.
