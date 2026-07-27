import { bi, t, type Lang } from './i18n';

/** The canonical production origin. */
const PRODUCTION_URL = 'https://www.ecovisindonesia.com';

/**
 * Absolute origin used for canonicals, hreflang and the sitemap.
 *
 * Set NEXT_PUBLIC_SITE_URL per environment. On a Vercel preview we fall back to
 * that deployment's own URL rather than the production domain, so a preview
 * never emits canonicals pointing at the live site.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL;
  if (vercelUrl && process.env.VERCEL_ENV !== 'production') return `https://${vercelUrl}`;

  return PRODUCTION_URL;
}

/** True only on the real production domain — gates indexing. */
export const IS_PRODUCTION_SITE =
  resolveSiteUrl() === PRODUCTION_URL && process.env.VERCEL_ENV !== 'preview';

/**
 * Contact details are placeholders carried over from the design prototype.
 * The design chats flag these as unverified — replace before go-live.
 */
export const SITE = {
  name: 'ECOVIS Indonesia',
  domain: 'ecovisindonesia.com',
  url: resolveSiteUrl(),
  email: 'info@ecovisindonesia.com',
  phone: '+62 21 2988 8000',
  phoneHref: 'tel:+622129888000',
  // TODO(client): real WhatsApp number — placeholder from the prototype.
  whatsapp: 'https://wa.me/6281XXXXXXXX',
  linkedin: 'https://www.linkedin.com/company/ecovis',
  address: ['Menara Kuningan, 8th Floor', 'Jl. H.R. Rasuna Said Blok X-7 Kav. 5', 'Jakarta Selatan 12940, Indonesia'],
} as const;

/** The ten services, in the order the prototype's nav and grids use. */
export const SERVICE_SLUGS = [
  'audit',
  'tax',
  'accounting',
  'payroll',
  'company-setup',
  'advisory',
  'corporate-finance',
  'transfer-pricing',
  'esg',
  'digital-solutions',
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

const NAV_SERVICE_LABELS: Record<ServiceSlug, [string, string]> = {
  audit: ['Audit & Assurance', 'Audit & Asurans'],
  tax: ['Tax', 'Pajak'],
  accounting: ['Accounting', 'Akuntansi'],
  payroll: ['Payroll', 'Penggajian'],
  'company-setup': ['Corporate Services & PT PMA', 'Layanan Korporat & PT PMA'],
  advisory: ['Advisory', 'Advisory'],
  'corporate-finance': ['Corporate Finance', 'Keuangan Korporat'],
  'transfer-pricing': ['Transfer Pricing', 'Transfer Pricing'],
  esg: ['ESG & Sustainability', 'ESG & Keberlanjutan'],
  'digital-solutions': ['Digital Solutions', 'Solusi Digital'],
};

export function serviceNavItems(lang: Lang) {
  return SERVICE_SLUGS.map((slug) => ({
    slug,
    name: bi(lang, NAV_SERVICE_LABELS[slug]),
    href: `/${lang}/services/${slug}`,
  }));
}

/**
 * Resolves a service's English display label to its route slug. Content
 * extracted from the prototypes references services by name (e.g. the industry
 * chips), so this is the bridge back to a URL.
 */
const LABEL_TO_SLUG: Record<string, ServiceSlug> = {
  'Audit & Assurance': 'audit',
  Tax: 'tax',
  Accounting: 'accounting',
  Payroll: 'payroll',
  'Corporate Services': 'company-setup',
  'Corporate Services & PT PMA': 'company-setup',
  Advisory: 'advisory',
  'Corporate Finance': 'corporate-finance',
  'Transfer Pricing': 'transfer-pricing',
  'ESG & Sustainability': 'esg',
  'Digital Solutions': 'digital-solutions',
};

export function serviceHrefByLabel(lang: Lang, englishLabel: string): string {
  const slug = LABEL_TO_SLUG[englishLabel];
  return slug ? `/${lang}/services/${slug}` : `/${lang}/services`;
}

export function aboutNavItems(lang: Lang) {
  return [
    { label: t(lang, 'Our Story', 'Kisah Kami'), href: `/${lang}/about#story` },
    { label: t(lang, 'Leadership', 'Kepemimpinan'), href: `/${lang}/about#leadership` },
    { label: t(lang, 'Global Network', 'Jaringan Global'), href: `/${lang}/about#network` },
    { label: t(lang, 'Quality & Values', 'Kualitas & Nilai'), href: `/${lang}/about#values` },
    { label: t(lang, 'Careers', 'Karier'), href: `/${lang}/careers` },
  ];
}

export function primaryNavItems(lang: Lang) {
  return [
    { label: t(lang, 'Industries', 'Industri'), href: `/${lang}/industries` },
    { label: t(lang, 'Insights', 'Wawasan'), href: `/${lang}/insights` },
    { label: t(lang, 'Resources', 'Sumber Daya'), href: `/${lang}/resources` },
    { label: t(lang, 'Contact', 'Kontak'), href: `/${lang}/contact` },
  ];
}

/** Shared CTA label used across every hero, band and drawer. */
export function ctaLabel(lang: Lang) {
  return t(lang, 'Schedule a Consultation', 'Jadwalkan Konsultasi');
}

/** The three Indonesian member entities, shown in the footer. */
export function legalEntities(lang: Lang) {
  return [
    {
      name: 'ECOVIS KAP Pieter, Uways & Partners',
      // TODO(client): licence numbers still to be supplied.
      detail: t(lang, 'Audit & Assurance', 'Audit & Asurans') + ' · Izin Usaha KAP No. [nomor izin]',
    },
    {
      name: 'ECOVIS KJPP Toha, Okky, Heru & Partners',
      detail: t(lang, 'Valuation', 'Valuasi') + ' · Izin Usaha KJPP No. [nomor izin]',
    },
    {
      name: 'ECOVIS PT Piesta Dinamika Consult',
      detail: t(lang, 'Tax & Advisory', 'Pajak & Advisory') + ' · Izin Konsultan Pajak No. [nomor izin]',
    },
  ];
}
