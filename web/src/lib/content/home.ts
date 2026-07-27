import { bi, t, type Lang } from '../i18n';
import type { ServiceSlug } from '../site';

/** Service cards as they appear on the home grid — shorter labels than the nav. */
const HOME_SERVICES: Array<{ slug: ServiceSlug; name: [string, string]; blurb: [string, string] }> = [
  {
    slug: 'audit',
    name: ['Audit & Assurance', 'Audit & Asurans'],
    blurb: ['Statutory & special-purpose audits under ISA', 'Audit statutori & tujuan khusus sesuai ISA'],
  },
  {
    slug: 'tax',
    name: ['Tax', 'Pajak'],
    blurb: ['Compliance, planning and dispute resolution', 'Kepatuhan, perencanaan, dan penyelesaian sengketa'],
  },
  {
    slug: 'accounting',
    name: ['Accounting', 'Akuntansi'],
    blurb: ['Outsourced bookkeeping & financial reporting', 'Pembukuan alih daya & pelaporan keuangan'],
  },
  {
    slug: 'payroll',
    name: ['Payroll', 'Penggajian'],
    blurb: ['End-to-end payroll, BPJS and PPh 21', 'Penggajian menyeluruh, BPJS, dan PPh 21'],
  },
  {
    slug: 'company-setup',
    name: ['Corporate Services', 'Layanan Korporat'],
    blurb: ['Company setup, licensing and secretarial', 'Pendirian usaha, perizinan, dan sekretariat'],
  },
  {
    slug: 'advisory',
    name: ['Advisory', 'Advisory'],
    blurb: ['Risk, internal audit and market entry', 'Risiko, audit internal, dan masuk pasar'],
  },
  {
    slug: 'corporate-finance',
    name: ['Corporate Finance', 'Keuangan Korporat'],
    blurb: ['M&A, valuation and due diligence', 'M&A, valuasi, dan uji tuntas'],
  },
  {
    slug: 'transfer-pricing',
    name: ['Transfer Pricing', 'Transfer Pricing'],
    blurb: ['Documentation, benchmarking and defense', 'Dokumentasi, benchmarking, dan pembelaan'],
  },
  {
    slug: 'esg',
    name: ['ESG & Sustainability', 'ESG & Keberlanjutan'],
    blurb: ['Sustainability reporting and assurance', 'Pelaporan dan asurans keberlanjutan'],
  },
  {
    slug: 'digital-solutions',
    name: ['Digital Solutions', 'Solusi Digital'],
    blurb: ['Coretax readiness and finance systems', 'Kesiapan Coretax dan sistem keuangan'],
  },
];

/** Industry chips, shared with the Industries page anchors. */
export const INDUSTRIES: Array<{ slug: string; name: [string, string] }> = [
  { slug: 'manufacturing', name: ['Manufacturing', 'Manufaktur'] },
  { slug: 'technology', name: ['Technology', 'Teknologi'] },
  { slug: 'financial-services', name: ['Financial Services', 'Jasa Keuangan'] },
  { slug: 'logistics', name: ['Logistics', 'Logistik'] },
  { slug: 'healthcare', name: ['Healthcare', 'Kesehatan'] },
  { slug: 'consumer-goods', name: ['Consumer Goods', 'Barang Konsumen'] },
  { slug: 'energy', name: ['Energy', 'Energi'] },
  { slug: 'education', name: ['Education', 'Pendidikan'] },
  { slug: 'real-estate', name: ['Real Estate', 'Properti'] },
];

export function homeContent(lang: Lang) {
  return {
    kicker: t(lang, 'Global Expertise. Local Commitment.', 'Keahlian Global. Komitmen Lokal.'),
    heroTitle: t(lang, 'Helping Businesses Succeed in Indonesia', 'Membantu Bisnis Sukses di Indonesia'),
    heroSub: t(
      lang,
      'Integrated audit, tax, accounting, payroll and business advisory services — backed by the global ECOVIS network.',
      'Layanan audit, pajak, akuntansi, penggajian, dan advisory bisnis yang terintegrasi — didukung jaringan global ECOVIS.',
    ),
    cta: t(lang, 'Schedule a Consultation', 'Jadwalkan Konsultasi'),
    explore: t(lang, 'Explore Our Services', 'Jelajahi Layanan Kami'),

    servicesKicker: t(lang, 'What we do', 'Yang kami lakukan'),
    servicesTitle: t(
      lang,
      'One integrated team for every stage of your business',
      'Satu tim terintegrasi untuk setiap tahap bisnis Anda',
    ),
    allServices: t(lang, 'All services', 'Semua layanan'),

    indKicker: t(lang, 'Who we serve', 'Yang kami layani'),
    indTitle: t(lang, 'Sector knowledge that goes deeper', 'Pengetahuan sektor yang lebih mendalam'),
    allIndustries: t(lang, 'All industries', 'Semua industri'),

    whyIdKicker: t(lang, 'Why Indonesia', 'Mengapa Indonesia'),
    whyIdTitle: t(
      lang,
      "Southeast Asia's largest economy is open for business",
      'Ekonomi terbesar Asia Tenggara terbuka untuk bisnis',
    ),
    whyIdP1: t(
      lang,
      'A G20 economy with a young workforce, a fast-growing digital sector and a government agenda focused on downstream industry, energy transition and foreign investment.',
      'Ekonomi G20 dengan angkatan kerja muda, sektor digital yang tumbuh pesat, dan agenda pemerintah yang berfokus pada hilirisasi industri, transisi energi, dan investasi asing.',
    ),
    whyIdP2: t(
      lang,
      'Priority sectors include manufacturing, the digital economy, healthcare, renewable energy and critical minerals processing.',
      'Sektor prioritas mencakup manufaktur, ekonomi digital, kesehatan, energi terbarukan, dan pengolahan mineral kritis.',
    ),
    whyIdLink: t(lang, 'Read our Indonesia investment guides', 'Baca panduan investasi Indonesia kami'),

    whyEcKicker: t(lang, 'Why Ecovis', 'Mengapa Ecovis'),
    whyEcTitle: t(
      lang,
      'Global reach, delivered by partners who know Indonesia',
      'Jangkauan global, dijalankan oleh partner yang memahami Indonesia',
    ),

    insKicker: t(lang, 'Latest insights', 'Wawasan terbaru'),
    insTitle: t(lang, 'Knowledge for doing business in Indonesia', 'Pengetahuan untuk berbisnis di Indonesia'),
    allInsights: t(lang, 'All insights', 'Semua wawasan'),

    ctaTitle: t(
      lang,
      'Planning to invest or expand in Indonesia?',
      'Berencana berinvestasi atau berekspansi di Indonesia?',
    ),
    ctaSub: t(
      lang,
      'Talk to a partner — first consultations are without obligation.',
      'Bicara dengan partner — konsultasi pertama tanpa kewajiban.',
    ),

    statsSource: t(
      lang,
      'Network figures: ECOVIS International annual network report 2025. Indonesia figures on this page: BPS and World Bank data, 2025 releases. Reviewed annually — last reviewed July 2026.',
      'Angka jaringan: laporan tahunan jaringan ECOVIS International 2025. Angka Indonesia di halaman ini: data BPS dan Bank Dunia, rilis 2025. Ditinjau tahunan — terakhir ditinjau Juli 2026.',
    ),

    services: HOME_SERVICES.map((service) => ({
      name: bi(lang, service.name),
      blurb: bi(lang, service.blurb),
      href: `/${lang}/services/${service.slug}`,
    })),

    industries: INDUSTRIES.map((industry) => ({
      name: bi(lang, industry.name),
      href: `/${lang}/industries#${industry.slug}`,
    })),

    stats: [
      { value: '90+', label: t(lang, 'Countries across 5 continents', 'Negara di 5 benua') },
      { value: '16,000+', label: t(lang, 'Professionals worldwide', 'Profesional di seluruh dunia') },
      { value: 'Top 15', label: t(lang, 'Global audit & advisory network', 'Jaringan audit & advisory global') },
      { value: '9', label: t(lang, 'Years serving clients in Indonesia', 'Tahun melayani klien di Indonesia') },
      { value: '3', label: t(lang, 'Specialized member firms in Indonesia', 'Firma anggota khusus di Indonesia') },
    ],

    idStats: [
      {
        value: '#1',
        label: t(lang, 'Largest economy in Southeast Asia — a G20 member', 'Ekonomi terbesar di Asia Tenggara — anggota G20'),
      },
      {
        value: '280M+',
        label: t(lang, 'Population, the world’s 4th largest market', 'Populasi, pasar terbesar ke-4 di dunia'),
      },
      {
        value: '~5%',
        label: t(
          lang,
          'Consistent annual GDP growth over the past decade',
          'Pertumbuhan PDB tahunan konsisten selama satu dekade',
        ),
      },
      {
        value: '30',
        label: t(
          lang,
          'Median age — a young, digitally active workforce',
          'Usia median — angkatan kerja muda dan aktif digital',
        ),
      },
    ],

    whyPoints: [
      {
        num: '01',
        title: t(lang, 'Global network', 'Jaringan global'),
        text: t(
          lang,
          'Cross-border engagements coordinated through ECOVIS teams in 90+ countries.',
          'Penugasan lintas negara dikoordinasikan melalui tim ECOVIS di 90+ negara.',
        ),
      },
      {
        num: '02',
        title: t(lang, 'Local expertise', 'Keahlian lokal'),
        text: t(
          lang,
          'Licensed Indonesian professionals who navigate OSS, DJP and OJK requirements daily.',
          'Profesional Indonesia berlisensi yang menavigasi ketentuan OSS, DJP, dan OJK setiap hari.',
        ),
      },
      {
        num: '03',
        title: t(lang, 'Integrated services', 'Layanan terintegrasi'),
        text: t(
          lang,
          'Audit, tax, accounting, payroll and advisory under one engagement team.',
          'Audit, pajak, akuntansi, penggajian, dan advisory dalam satu tim penugasan.',
        ),
      },
      {
        num: '04',
        title: t(lang, 'Partner-led engagement', 'Dipimpin partner'),
        text: t(
          lang,
          'Direct access to partners — not layers of account managers.',
          'Akses langsung ke partner — bukan berlapis account manager.',
        ),
      },
      {
        num: '05',
        title: t(lang, 'Multilingual professionals', 'Profesional multibahasa'),
        text: t(
          lang,
          'Working fluently in English and Bahasa Indonesia, with network support in 60+ languages.',
          'Bekerja lancar dalam bahasa Inggris dan Indonesia, dengan dukungan jaringan di 60+ bahasa.',
        ),
      },
      {
        num: '06',
        title: t(lang, 'Cross-border capability', 'Kapabilitas lintas negara'),
        text: t(
          lang,
          'One point of contact for inbound structuring, expansion and group reporting.',
          'Satu titik kontak untuk penataan masuk, ekspansi, dan pelaporan grup.',
        ),
      },
    ],
  };
}
