# Carport Wheels — Fitted Right storefront demo

Pitch-grade, mobile-first website prototype for Carport Wheels. It demonstrates the proposed customer journey from fitment discovery to a local reservation confirmation and review-loop preview.

## What is included

- Brand-led homepage using authentic Carport social-media photography
- Sample wheel catalogue and product/specification pages
- Seven sample brand landing pages
- Fifteen-model illustrative fitment finder
- Safety gate for modified and unvalidated setups
- Local-only reservation demonstration
- Build gallery and sample reviews
- Static, no-index Next.js site ready for GitHub and Vercel

## Demo safeguards

This is not a production store. Products, prices, availability, reviews, captions and fitment records are illustrative and visibly labelled. No payment is taken, no message is sent, and reservation form details are not submitted to a server.

Before production, Carport must supply or approve the master logo vector, original-resolution photography, product catalogue, pricing, availability, fitment records, claims and customer reviews.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm test
npm run typecheck
npm run build
```

The build runs a demo-data guard before Next.js compilation.

## Deploy through GitHub and Vercel

1. Push this folder to a GitHub repository.
2. Import that repository into Vercel.
3. Keep the standard Next.js preset and default build settings.
4. Use the preview URL for the pitch; the site intentionally remains `noindex, nofollow`.
5. Do not connect a production domain or remove the demo banner until all client approvals and data replacements are complete.

Photography sources are recorded in `public/images/social/SOURCES.md`.
