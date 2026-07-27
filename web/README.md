# Ecovis Indonesia — website

Implementation of the Claude Design handoff bundle in `../project`. Next.js
(App Router) + TypeScript, no CSS framework — the design system is expressed as
CSS custom properties in `src/styles/globals.css` plus CSS Modules per component.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
npm run typecheck
```

## Routing

Every public page lives under a locale segment so both languages are
independently crawlable — the design evaluation flagged the prototype's
toggle-only bilingual mode as a P0 SEO defect.

```
/                            → redirects to /en (middleware)
/[lang]                      → root layout: <html lang>, fonts, metadata
  /(site)                    → adds SiteHeader + SiteFooter
    /                        Home
    /about                   About
    /services                Services hub
    /services/[slug]         10 service pages (9 templated + company-setup)
    /industries              Industries
    /insights                Insights index (client-side category filter)
    /insights/[slug]         9 articles
    /resources               Resources & tax calendar
    /careers                 Careers
    /contact                 3-step consultation wizard
    /privacy                 Privacy policy
    /thank-you               Conversion confirmation (noindex)
    not-found.tsx            404
  /(landing)
    /guides/[slug]           Distraction-free lead-magnet landing (no site chrome)
/admin                       Admin console (second root layout, noindex)
/api/leads                   Form submission stub
/sitemap.xml, /robots.txt
```

`(site)` and `(landing)` are route groups, so the guide landing pages inherit
the locale root layout but not the header and footer — they are single-focus by
design.

## Deployment

Vercel auto-detects the framework. Two settings matter:

- **Root Directory** → `web` (the repo root also holds the design bundle)
- **Environment variable** → `NEXT_PUBLIC_SITE_URL`, set to the deployment's own
  origin, e.g. `https://www.ecovisindonesia.com` on production

`NEXT_PUBLIC_SITE_URL` drives `metadataBase`, canonicals, hreflang and the
sitemap. If it is unset the app falls back to the Vercel deployment URL on
preview, and to the production domain otherwise.

Indexing is gated on that same value (`IS_PRODUCTION_SITE` in `src/lib/site.ts`).
Anything that is not the production domain serves `Disallow: /` in `robots.txt`
**and** a `noindex, nofollow` meta tag, so preview deployments cannot compete
with the live site for the same content. Verify after a deploy:

```bash
curl -s https://<deployment>/robots.txt
curl -s https://<deployment>/en | grep '<link rel="canonical"'
```

## Content and i18n

Copy lives in `src/lib/content/` as `[en, id]` pairs, read with
`bi(lang, pair)` (or `t(lang, en, id)` for inline literals) from
`src/lib/i18n.ts`.

Most of that content was **generated** from the design prototypes rather than
hand-transcribed, so the copy is verbatim. The prototypes express each page as a
`renderVals()` method returning resolved copy for one language; the scripts
evaluate each class twice and zip the results:

```bash
node scripts/extract-services.mjs      # 9 templated service pages + tax
node scripts/extract-company-setup.mjs # PT PMA page (timeline variant)
node scripts/extract-pages.mjs         # About, Industries, Contact, Privacy, …
node scripts/extract-admin.mjs         # Admin console mock dataset
```

Re-run these if the design bundle is updated. Generated files carry a header
saying so — edit the prototype, not the output.

Article bodies (`src/lib/content/articles.ts`) are English-only. That was a
deliberate design decision: the interface, categories and navigation are
bilingual, but the long-form technical copy awaits a professional translation
pass.

## Forms

Every form posts through `submitLead()` in `src/lib/submit.ts` to
`/api/leads`, which validates the payload shape and logs it. **This is a stub.**
Before launch it still needs:

- a real destination (CRM, transactional email, marketing automation)
- spam protection (hCaptcha/Turnstile plus a honeypot field)
- rate limiting per IP
- server-side persistence so a downstream outage cannot drop a lead
- notification routing — which partner receives which service enquiry

Forms carry the accessibility and PDP work the design evaluation asked for:
labels above inputs (placeholders are examples only), explicit consent
checkboxes gating submission, `aria-invalid`/`aria-describedby` on errors.

## Admin console

`/admin` is a **UX reference, not a production CMS**. State is in-memory and
resets on reload. The design bundle's Blueprint (section 09) recommends an
off-the-shelf CMS + CRM and treating this console as the requirements spec.

The AI-assist panel in the block editor drafts an outline locally. A production
build should route generation through a server action holding the provider key
configured in Settings → AI content providers — never ship provider keys to the
browser.

## Still needed from the client

Carried over from the design bundle as explicit placeholders:

- **Licence numbers** — footer shows `[nomor izin]` for all three entities
- **WhatsApp number** — `wa.me/6281XXXXXXXX` in `src/lib/site.ts`
- **Partner names and photos** — About page shows initials and "Nama partner"
- **Contact details** — address, phone and LinkedIn URL are unverified
- **Statistics** — "9 years in Indonesia" and similar figures need confirming
- **Google Maps embed** — Contact page has a styled placeholder; the real embed
  should be gated behind cookie consent
- **Guide PDFs** — the lead magnets have no files attached yet

## Not implemented

The bundle also contains four internal documents — `Blueprint`,
`DevelopmentGuide`, `Evaluation` and `Mobile`. These are strategy and spec
material for the vendor and client, not website pages, and were left in
`../project` as reference.
