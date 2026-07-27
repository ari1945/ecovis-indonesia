import { t, type Lang } from '../i18n';

export type Category =
  | 'Tax Alerts'
  | 'Accounting Updates'
  | 'Audit Insights'
  | 'Legal Updates'
  | 'Indonesia Business'
  | 'Investment';

export type Block =
  | { type: 'para'; text: string }
  | { type: 'heading'; id: string; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] };

export type Article = {
  slug: string;
  category: Category;
  date: string;
  readTime: string;
  author: string;
  authorTitle: string;
  authorBio: string;
  /** Card + hero title, localized. */
  title: [string, string];
  /** Card excerpt, localized. */
  excerpt: [string, string];
  /** Article standfirst. English only — see note below. */
  lede: string;
  /**
   * Article bodies are intentionally English-only: the design team localized
   * the interface, categories and navigation but left the long-form technical
   * copy untranslated pending a professional translation pass.
   */
  body: Block[];
  toc: { text: string; href: string }[];
};

export const CATEGORIES: Category[] = [
  'Tax Alerts',
  'Accounting Updates',
  'Audit Insights',
  'Legal Updates',
  'Indonesia Business',
  'Investment',
];

const CATEGORY_ID: Record<Category, string> = {
  'Tax Alerts': 'Alert Pajak',
  'Accounting Updates': 'Pembaruan Akuntansi',
  'Audit Insights': 'Wawasan Audit',
  'Legal Updates': 'Pembaruan Hukum',
  'Indonesia Business': 'Bisnis Indonesia',
  Investment: 'Investasi',
};

export function categoryLabel(lang: Lang, category: Category): string {
  return t(lang, category, CATEGORY_ID[category]);
}

export const ARTICLES: Article[] = [
  {
    slug: 'vat-12',
    category: 'Tax Alerts',
    date: 'Jul 2026',
    readTime: '6 min read',
    author: 'Piesta Dinamika',
    authorTitle: 'Tax & Advisory Partner',
    authorBio:
      'Leads tax compliance and dispute engagements for foreign-owned and domestic groups at ECOVIS Indonesia.',
    title: [
      'VAT at 12%: Transition Rules Every Business Should Review',
      'PPN 12%: Aturan Transisi yang Perlu Ditinjau Setiap Bisnis',
    ],
    excerpt: [
      'How the luxury-goods carve-out works in practice, and what to update in your invoicing and ERP systems now.',
      'Cara kerja pengecualian barang mewah dalam praktik, dan yang perlu diperbarui di sistem faktur dan ERP Anda sekarang.',
    ],
    lede:
      'How the luxury-goods carve-out works in practice, and what to update in your invoicing and ERP systems before your first affected filing period.',
    body: [
      {
        type: 'para',
        text: 'Indonesia’s standard VAT rate moved to 12% under the HPP Law, but the way it applies in practice is more nuanced than a single headline number. For most businesses the immediate work is operational: updating invoicing, ERP tax codes and contract wording before the first affected filing period.',
      },
      { type: 'heading', id: 'who', text: 'Who is affected, and when' },
      {
        type: 'para',
        text: 'The rate applies to taxable deliveries of goods and services (BKP/JKP). The practical friction is timing — which tax point (saat terutang) falls under the new rate, and how to treat contracts and advance payments that straddle the transition date.',
      },
      {
        type: 'list',
        items: [
          'Registered VAT entities (PKP) issuing e-Faktur for standard-rated supplies',
          'Importers and businesses accounting for VAT on imported services',
          'Companies with long-term contracts priced VAT-inclusive',
        ],
      },
      { type: 'heading', id: 'carveout', text: 'The luxury-goods carve-out in practice' },
      {
        type: 'para',
        text: 'A carve-out applies the higher effective rate only to specific luxury categories, while other supplies are computed on a different taxable base. The distinction matters for pricing and for how you configure tax codes — misclassification is the most common error we see in first-period reviews.',
      },
      {
        type: 'quote',
        text: 'Most transition errors are not calculation mistakes — they are timing and classification mistakes in the ERP configuration.',
      },
      { type: 'heading', id: 'checklist', text: 'What to update now' },
      {
        type: 'list',
        items: [
          'Reconfigure ERP/accounting tax codes and test on a sample of invoices',
          'Review VAT-inclusive contract clauses and re-paper where needed',
          'Brief AR/AP and procurement teams on the effective transition date',
          'Reconcile the first two filing periods closely against e-Faktur output',
        ],
      },
      {
        type: 'para',
        text: 'If your systems are already on Coretax, validate that the migrated tax profiles reflect the correct rate and base before the cutover period, rather than after your first rejected e-Faktur.',
      },
    ],
    toc: [
      { text: 'Who is affected, and when', href: '#who' },
      { text: 'The luxury-goods carve-out', href: '#carveout' },
      { text: 'What to update now', href: '#checklist' },
    ],
  },
  {
    slug: 'coretax-year-one',
    category: 'Tax Alerts',
    date: 'Jun 2026',
    readTime: '7 min read',
    author: 'Piesta Dinamika',
    authorTitle: 'Tax & Advisory Partner',
    authorBio:
      'Leads tax compliance and Coretax migration engagements for foreign-owned and domestic groups at ECOVIS Indonesia.',
    title: [
      'Filing Under Coretax: Lessons From the First Full Year',
      'Pelaporan di Coretax: Pelajaran dari Tahun Pertama',
    ],
    excerpt: [
      'Practical fixes for the most common e-Faktur and e-Bupot migration issues we see across client systems.',
      'Solusi praktis untuk masalah migrasi e-Faktur dan e-Bupot yang paling umum kami temui di sistem klien.',
    ],
    lede:
      'Practical fixes for the most common e-Faktur and e-Bupot migration issues we have seen across client systems in the first full year of Coretax.',
    body: [
      {
        type: 'para',
        text: 'A year into Coretax, the pattern of problems is clear. Most are not disputes over tax positions — they are master-data and access issues that surface at the worst possible moment, on the day a return or an e-Faktur is due.',
      },
      { type: 'heading', id: 'access', text: 'Access and authorisation come first' },
      {
        type: 'para',
        text: 'The single biggest cause of missed deadlines is authorisation. Roles for signing, drafting and viewing are assigned per person, and a director’s certificate expiring quietly is enough to block issuance for a whole entity.',
      },
      {
        type: 'list',
        items: [
          'Maintain a role matrix mapping each Coretax function to a named backup person',
          'Track digital-certificate expiry dates centrally, not per user',
          'Confirm the PIC for signing is not the only person with the signing role',
        ],
      },
      { type: 'heading', id: 'efaktur', text: 'Where e-Faktur breaks' },
      {
        type: 'para',
        text: 'Rejected e-Faktur are usually caused by counterparty NPWP/NIK data that no longer matches Coretax’s validated records, or by tax-code mappings carried over incorrectly from the legacy system.',
      },
      {
        type: 'quote',
        text: 'Validate your ten largest customers and suppliers in Coretax before month-end — not while an invoice is being rejected.',
      },
      { type: 'heading', id: 'bupot', text: 'e-Bupot reconciliation' },
      {
        type: 'para',
        text: 'Withholding (e-Bupot) mismatches between what you report and what counterparties expect are best caught monthly. Reconcile bukti potong issued against your GL withholding accounts before filing, so corrections happen inside the period rather than through amendments.',
      },
    ],
    toc: [
      { text: 'Access and authorisation', href: '#access' },
      { text: 'Where e-Faktur breaks', href: '#efaktur' },
      { text: 'e-Bupot reconciliation', href: '#bupot' },
    ],
  },
  {
    slug: 'pt-pma-2026',
    category: 'Indonesia Business',
    date: 'Jun 2026',
    readTime: '8 min read',
    author: 'ECOVIS Corporate Services',
    authorTitle: 'Company Establishment Team',
    authorBio:
      'Handles PT PMA establishment, OSS licensing and corporate secretarial matters for foreign investors entering Indonesia.',
    title: [
      'Setting Up a PT PMA in 2026: A Step-by-Step Guide',
      'Mendirikan PT PMA di 2026: Panduan Langkah demi Langkah',
    ],
    excerpt: [
      'Capital requirements, OSS risk-based licensing and realistic timelines for foreign investors entering Indonesia.',
      'Persyaratan modal, perizinan berbasis risiko OSS, dan lini waktu realistis bagi investor asing yang masuk Indonesia.',
    ],
    lede:
      'Capital requirements, OSS risk-based licensing and realistic timelines for foreign investors establishing a limited liability company in Indonesia.',
    body: [
      {
        type: 'para',
        text: 'A PT PMA is the standard vehicle for foreign-owned business in Indonesia. The rules are stable, but the sequence and the sector-specific details determine whether setup takes weeks or months.',
      },
      { type: 'heading', id: 'capital', text: 'Capital and ownership' },
      {
        type: 'para',
        text: 'As a baseline, a PT PMA is expected to have an investment plan above IDR 10 billion excluding land and buildings, with paid-up capital that reflects the business plan. Foreign ownership limits depend on the business classification (KBLI) and the Positive Investment List.',
      },
      {
        type: 'list',
        items: [
          'Confirm the correct KBLI codes and any foreign-ownership cap first — everything else follows',
          'Plan paid-up capital in line with the stated investment value',
          'Check whether your activity requires a local partner or minimum divestment',
        ],
      },
      { type: 'heading', id: 'oss', text: 'OSS risk-based licensing' },
      {
        type: 'para',
        text: 'Licensing runs through the OSS system on a risk basis. Low-risk activities need only a business identification number (NIB); medium and high-risk activities add standard certificates and permits that must be verified after issuance.',
      },
      {
        type: 'quote',
        text: 'The NIB is the beginning of licensing, not the end — build verification of standard certificates into your launch timeline.',
      },
      { type: 'heading', id: 'timeline', text: 'A realistic timeline' },
      {
        type: 'para',
        text: 'Deed of establishment and Ministry of Law approval are typically fast. The variable is sector licensing and post-establishment registrations — tax, BPJS and any activity-specific permits — which is where most first-time investors underestimate the calendar.',
      },
    ],
    toc: [
      { text: 'Capital and ownership', href: '#capital' },
      { text: 'OSS risk-based licensing', href: '#oss' },
      { text: 'A realistic timeline', href: '#timeline' },
    ],
  },
  {
    slug: 'pmk-172-tp',
    category: 'Tax Alerts',
    date: 'May 2026',
    readTime: '6 min read',
    author: 'Piesta Dinamika',
    authorTitle: 'Transfer Pricing Partner',
    authorBio: 'Leads transfer pricing documentation and dispute engagements at ECOVIS Indonesia.',
    title: [
      'PMK-172 Transfer Pricing Documentation: Deadlines and Thresholds',
      'Dokumentasi Transfer Pricing PMK-172: Tenggat dan Ambang',
    ],
    excerpt: [
      'Which entities must prepare Master File and Local File, and why the availability deadline is earlier than you think.',
      'Entitas mana yang wajib menyiapkan Master File dan Local File, dan mengapa availability deadline lebih awal dari yang Anda kira.',
    ],
    lede:
      'Which entities must prepare a Master File and Local File, and why the availability deadline is earlier than many groups expect.',
    body: [
      {
        type: 'para',
        text: 'PMK-172 consolidates Indonesia’s transfer pricing rules into a single regulation. The obligations are not new in principle, but the consolidation is a good prompt to re-check whether your documentation is both required and available on time.',
      },
      { type: 'heading', id: 'who', text: 'Who must document' },
      {
        type: 'para',
        text: 'The three-tiered documentation model applies based on revenue and related-party transaction thresholds. Groups above the thresholds must maintain a Local File and Master File, and the largest groups a Country-by-Country Report.',
      },
      {
        type: 'list',
        items: [
          'Local File — required once revenue or related-party transaction values exceed the stated thresholds',
          'Master File — required for members of a group meeting the threshold',
          'CbCR — for groups above the consolidated revenue limit',
        ],
      },
      { type: 'heading', id: 'deadline', text: 'The availability deadline that catches groups out' },
      {
        type: 'quote',
        text: 'Documentation must be available by four months after year-end — well before the annual return is filed. Preparing it at filing time is already late.',
      },
      { type: 'heading', id: 'arm', text: 'Arm’s-length substance, not just format' },
      {
        type: 'para',
        text: 'A file that exists but does not properly benchmark the tested transactions offers little protection in an audit. The benchmarking analysis and the functional analysis are where examinations focus.',
      },
    ],
    toc: [
      { text: 'Who must document', href: '#who' },
      { text: 'The availability deadline', href: '#deadline' },
      { text: 'Arm’s-length substance', href: '#arm' },
    ],
  },
  {
    slug: 'psak-ifrs-2026',
    category: 'Accounting Updates',
    date: 'May 2026',
    readTime: '5 min read',
    author: 'Pieter, Uways & Partners',
    authorTitle: 'Audit & Assurance',
    authorBio:
      'Provides statutory audit and financial-reporting advice to foreign-owned groups at ECOVIS Indonesia.',
    title: ['PSAK vs IFRS in 2026: The Differences That Still Matter', 'PSAK vs IFRS di 2026: Perbedaan yang Masih Penting'],
    excerpt: [
      'A concise difference memo for group controllers consolidating Indonesian subsidiaries.',
      'Memo perbedaan ringkas untuk group controller yang mengonsolidasikan anak usaha Indonesia.',
    ],
    lede:
      'A concise difference memo for group controllers consolidating Indonesian subsidiaries into an IFRS group reporting package.',
    body: [
      {
        type: 'para',
        text: 'Indonesian PSAK is largely converged with IFRS, which lulls some group controllers into assuming the local numbers will drop straight into consolidation. A short list of differences and timing gaps is worth checking every year.',
      },
      { type: 'heading', id: 'convergence', text: 'Converged, but not identical timing' },
      {
        type: 'para',
        text: 'PSAK adopts IFRS standards on a deliberate timeline, so the effective date of a new or amended standard in Indonesia can lag the international one. For a group closing on the latest IFRS, that gap must be bridged in the reporting package.',
      },
      {
        type: 'list',
        items: [
          'Track effective-date differences for recently amended standards',
          'Identify any locally retained treatments not present in IFRS',
          'Document consolidation adjustments so they are repeatable each period',
        ],
      },
      { type: 'heading', id: 'practical', text: 'Where controllers spend the most time' },
      {
        type: 'quote',
        text: 'The recurring effort is not the big standards — it is the small, repeatable reconciliation items that nobody has written down.',
      },
      {
        type: 'para',
        text: 'Building a standing bridge schedule between statutory PSAK financials and the group package removes most of the year-end friction and makes the audit smoother on both sides.',
      },
    ],
    toc: [
      { text: 'Converged, not identical', href: '#convergence' },
      { text: 'Where time goes', href: '#practical' },
    ],
  },
  {
    slug: 'uu-pdp-employers',
    category: 'Legal Updates',
    date: 'Apr 2026',
    readTime: '6 min read',
    author: 'ECOVIS Advisory',
    authorTitle: 'Risk & Compliance',
    authorBio: 'Advises on data governance, internal controls and regulatory compliance at ECOVIS Indonesia.',
    title: [
      'UU PDP in Force: Data-Protection Duties for Employers',
      'UU PDP Berlaku: Kewajiban Perlindungan Data bagi Pemberi Kerja',
    ],
    excerpt: [
      'What Indonesia’s personal data protection law means for HR files, payroll data and cross-border transfers.',
      'Apa arti UU Perlindungan Data Pribadi Indonesia bagi berkas HR, data penggajian, dan transfer lintas negara.',
    ],
    lede:
      'What Indonesia’s Personal Data Protection Law means for HR files, payroll data and cross-border transfers of employee information.',
    body: [
      {
        type: 'para',
        text: 'With the transition period over, the Personal Data Protection Law (UU PDP) now applies in full. For most companies the highest-volume personal data is employee data — which makes HR and payroll the first place to look.',
      },
      { type: 'heading', id: 'basis', text: 'A lawful basis for employee data' },
      {
        type: 'para',
        text: 'Processing employee data needs a defined basis, and consent is often not the right one in an employment context. Mapping what you hold, why, and for how long is the foundational step.',
      },
      {
        type: 'list',
        items: [
          'Inventory HR and payroll data and its retention periods',
          'Define the lawful basis for each processing purpose',
          'Review access rights to payroll and personnel files',
        ],
      },
      { type: 'heading', id: 'transfers', text: 'Cross-border transfers to HQ' },
      {
        type: 'quote',
        text: 'Sending payroll or HR data to an overseas parent is a cross-border transfer — it needs an adequate safeguard, not just an intra-group habit.',
      },
      { type: 'heading', id: 'breach', text: 'Breach readiness' },
      {
        type: 'para',
        text: 'The law introduces notification duties. A short, tested incident procedure — who is told, in what timeframe, and by whom — is far more useful than a long policy nobody has rehearsed.',
      },
    ],
    toc: [
      { text: 'A lawful basis', href: '#basis' },
      { text: 'Cross-border transfers', href: '#transfers' },
      { text: 'Breach readiness', href: '#breach' },
    ],
  },
  {
    slug: 'audit-foreign-owned',
    category: 'Audit Insights',
    date: 'Apr 2026',
    readTime: '6 min read',
    author: 'Pieter, Uways & Partners',
    authorTitle: 'Audit & Assurance',
    authorBio: 'Signs statutory audits for foreign-owned companies and groups at ECOVIS Indonesia.',
    title: [
      'Audit Requirements for Foreign-Owned Companies in Indonesia',
      'Persyaratan Audit untuk Perusahaan Milik Asing di Indonesia',
    ],
    excerpt: [
      'When a statutory audit becomes mandatory — thresholds, deadlines and what first-year audits typically uncover.',
      'Kapan audit statutori menjadi wajib — ambang, tenggat, dan apa yang biasanya terungkap dari audit tahun pertama.',
    ],
    lede:
      'When a statutory audit becomes mandatory — the thresholds, the deadlines and what first-year audits typically uncover.',
    body: [
      {
        type: 'para',
        text: 'A PT PMA is not automatically exempt from audit because it is small. Several triggers make an audit mandatory, and foreign-owned companies frequently meet at least one of them.',
      },
      { type: 'heading', id: 'triggers', text: 'What triggers a mandatory audit' },
      {
        type: 'list',
        items: [
          'Assets or turnover above the statutory thresholds',
          'Companies that raise funds from the public or issue debt instruments',
          'Entities required to audit by their line of business or by shareholders',
        ],
      },
      { type: 'heading', id: 'deadline', text: 'Deadlines that align with reporting' },
      {
        type: 'para',
        text: 'The audit needs to be complete in time for the annual general meeting and for the corporate income tax return, whose attachment expectations assume audited figures where an audit applies.',
      },
      {
        type: 'quote',
        text: 'First-year audits almost always surface the same three things: incomplete fixed-asset registers, related-party balances, and revenue cut-off.',
      },
      { type: 'heading', id: 'prepare', text: 'Preparing for a smooth first audit' },
      {
        type: 'para',
        text: 'Clean fixed-asset records, reconciled intercompany balances and a documented revenue recognition policy remove most first-year audit friction before the auditors arrive.',
      },
    ],
    toc: [
      { text: 'What triggers an audit', href: '#triggers' },
      { text: 'Deadlines', href: '#deadline' },
      { text: 'Preparing well', href: '#prepare' },
    ],
  },
  {
    slug: 'priority-sectors',
    category: 'Investment',
    date: 'Mar 2026',
    readTime: '7 min read',
    author: 'ECOVIS Advisory',
    authorTitle: 'Market Entry',
    authorBio: 'Advises inbound investors on structuring, incentives and market entry at ECOVIS Indonesia.',
    title: [
      'Indonesia’s Priority Sectors: Where Incentives Are Strongest',
      'Sektor Prioritas Indonesia: Di Mana Insentif Paling Kuat',
    ],
    excerpt: [
      'Tax holidays, allowances and import facilities mapped against the government’s downstreaming agenda.',
      'Tax holiday, tunjangan, dan fasilitas impor dipetakan terhadap agenda hilirisasi pemerintah.',
    ],
    lede:
      'Tax holidays, allowances and import facilities mapped against the government’s downstreaming and energy-transition agenda.',
    body: [
      {
        type: 'para',
        text: 'Indonesia’s incentive framework is deliberately targeted. The strongest reliefs cluster around pioneer industries, downstream processing and activities the government wants to localise.',
      },
      { type: 'heading', id: 'holidays', text: 'Tax holidays and allowances' },
      {
        type: 'para',
        text: 'Pioneer industries can access a corporate income tax holiday for a period tied to investment scale, while a broader set of activities qualifies for an investment allowance instead.',
      },
      {
        type: 'list',
        items: [
          'Tax holiday — for qualifying pioneer industries at scale',
          'Investment allowance — a deduction for a wider set of eligible activities',
          'Import facilities — relief on capital-goods and raw-material imports',
        ],
      },
      { type: 'heading', id: 'downstream', text: 'Downstreaming and critical minerals' },
      {
        type: 'quote',
        text: 'The clearest incentives follow the downstreaming agenda — processing value onshore rather than exporting raw material.',
      },
      { type: 'heading', id: 'apply', text: 'Applying with substance' },
      {
        type: 'para',
        text: 'Incentives are approvals, not entitlements. Aligning the KBLI, the investment plan and the facility applied for — and being able to evidence delivery — is what turns eligibility into a granted facility.',
      },
    ],
    toc: [
      { text: 'Holidays and allowances', href: '#holidays' },
      { text: 'Downstreaming', href: '#downstream' },
      { text: 'Applying with substance', href: '#apply' },
    ],
  },
  {
    slug: 'wage-bpjs-2026',
    category: 'Indonesia Business',
    date: 'Mar 2026',
    readTime: '5 min read',
    author: 'ECOVIS Payroll',
    authorTitle: 'Payroll & Employment',
    authorBio: 'Runs outsourced payroll, BPJS and PPh 21 for multinational employers at ECOVIS Indonesia.',
    title: ['2026 Minimum Wage and BPJS Updates by Province', 'Pembaruan Upah Minimum dan BPJS 2026 per Provinsi'],
    excerpt: [
      'Provincial wage decisions and social-security ceiling changes to reflect in January payroll runs.',
      'Keputusan upah provinsi dan perubahan batas jaminan sosial untuk dicerminkan pada penggajian Januari.',
    ],
    lede:
      'Provincial wage decisions and social-security ceiling changes to reflect in the January payroll run — and the compliance dates that follow.',
    body: [
      {
        type: 'para',
        text: 'Every year, provincial minimum-wage decisions and BPJS parameter changes land close together and take effect from January. Reflecting them late means retroactive corrections and unhappy employees.',
      },
      { type: 'heading', id: 'wage', text: 'Provincial minimum wages' },
      {
        type: 'para',
        text: 'Minimum wages are set provincially (UMP) and often at city/regency level (UMK), so a company operating in several locations manages several rates. The right base rate depends on the place of work, not the head office.',
      },
      {
        type: 'list',
        items: [
          'Confirm the applicable UMP/UMK for each work location',
          'Update payroll master data before the January cycle',
          'Check that allowances counted toward the minimum are treated correctly',
        ],
      },
      { type: 'heading', id: 'bpjs', text: 'BPJS ceilings and contributions' },
      {
        type: 'quote',
        text: 'A changed BPJS Kesehatan salary ceiling quietly changes the contribution for every employee above it — update it once, centrally.',
      },
      { type: 'heading', id: 'pph21', text: 'PPh 21 knock-on effects' },
      {
        type: 'para',
        text: 'Wage and contribution changes flow into PPh 21. Validating the January calculation against the new parameters avoids a cascade of monthly corrections later in the year.',
      },
    ],
    toc: [
      { text: 'Provincial wages', href: '#wage' },
      { text: 'BPJS ceilings', href: '#bpjs' },
      { text: 'PPh 21 effects', href: '#pph21' },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

/** Same-category articles first, topped up to three from the rest of the feed. */
export function relatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return ARTICLES.slice(0, limit);

  const sameCategory = ARTICLES.filter((a) => a.slug !== slug && a.category === current.category);
  const rest = ARTICLES.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function authorInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}
