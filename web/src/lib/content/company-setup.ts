// Generated from the design prototype project/CompanySetup.dc.html
// by scripts/extract-company-setup.mjs — copy is verbatim from the approved design.
import type { Bi, Faq, KeyValue, TitleText } from './service-types';

/** PT PMA establishment: same conversion structure, but a dated timeline. */
export type TimelineStep = { n: string; time: Bi; t: Bi; d: Bi };

export type CompanySetupContent = {
  slug: string;
  crumbLast: Bi;
  kicker: Bi;
  heroTitle: Bi;
  heroSub: Bi;
  ctaPrimary: Bi;
  ctaSecondary: Bi;
  situationTitle: Bi;
  howHelpsTitle: Bi;
  scopeTitle: Bi;
  timelineKicker: Bi;
  processTitle: Bi;
  proofTitle: Bi;
  proofBody: Bi;
  quote: Bi;
  quoteBy: Bi;
  guideTitle: Bi;
  guideBody: Bi;
  guidePoints: readonly Bi[];
  guideSubmit: Bi;
  guideSent: Bi;
  faqTitle: Bi;
  ctaTitle: Bi;
  ctaSub: Bi;
  trust: readonly KeyValue[];
  problems: readonly TitleText[];
  solutions: readonly TitleText[];
  scope: readonly TitleText[];
  steps: readonly TimelineStep[];
  proof: readonly KeyValue[];
  faqs: readonly Faq[];
};

export const companySetup: CompanySetupContent = {
  slug: "company-setup",
  crumbLast: ["PT PMA Establishment", "Pendirian PT PMA"],
  kicker: ["Corporate Services · PT PMA", "Layanan Korporat · PT PMA"],
  heroTitle: ["Set up your Indonesian company right — before you commit capital", "Dirikan perusahaan Indonesia Anda dengan benar — sebelum menanamkan modal"],
  heroSub: ["End-to-end PT PMA establishment for foreign investors: from checking the investment list and minimum capital, through deed and OSS risk-based licensing, to the registrations you need before you can hire, invoice and open a bank account.", "Pendirian PT PMA menyeluruh untuk investor asing: dari memeriksa daftar investasi dan modal minimum, melalui akta dan perizinan berbasis risiko OSS, hingga pendaftaran yang Anda butuhkan sebelum bisa merekrut, menagih, dan membuka rekening bank."],
  ctaPrimary: ["Schedule a setup session", "Jadwalkan sesi pendirian"],
  ctaSecondary: ["Get the PT PMA guide", "Dapatkan panduan PT PMA"],

  situationTitle: ["Where foreign investors get stuck", "Di mana investor asing tersendat"],
  howHelpsTitle: ["One team from structuring to first invoice", "Satu tim dari penataan hingga faktur pertama"],
  scopeTitle: ["Everything the setup actually requires", "Semua yang benar-benar dibutuhkan pendirian"],
  timelineKicker: ["The setup timeline", "Lini waktu pendirian"],
  processTitle: ["From decision to operating entity", "Dari keputusan hingga entitas beroperasi"],
  proofTitle: ["The advisor stays after the company is formed", "Advisor tetap ada setelah perusahaan terbentuk"],
  proofBody: ["Incorporation is the easy part — staying compliant is the work. Because we also run your tax, accounting and payroll, the entity we build for you is one we keep compliant afterwards, with a single team and a single point of contact from your home country's time zone.", "Pendirian adalah bagian mudahnya — tetap patuh adalah pekerjaannya. Karena kami juga menjalankan pajak, akuntansi, dan penggajian Anda, entitas yang kami bangun untuk Anda adalah entitas yang kami jaga kepatuhannya setelahnya, dengan satu tim dan satu titik kontak dari zona waktu negara asal Anda."],
  quote: ["\"They flagged a foreign-ownership cap in our KBLI code that would have forced a restructure six months in. We changed the plan before signing the deed.\"", "\"Mereka menandai batas kepemilikan asing pada kode KBLI kami yang akan memaksa restrukturisasi enam bulan kemudian. Kami mengubah rencana sebelum menandatangani akta.\""],
  quoteBy: ["Managing Director — inbound logistics venture", "Managing Director — ventura logistik inbound"],

  guideTitle: ["Setting Up a PT PMA in 2026: Step by Step", "Mendirikan PT PMA di 2026: Langkah demi Langkah"],
  guideBody: ["Capital requirements, OSS risk-based licensing, realistic timelines and the post-incorporation registrations most guides leave out — written for foreign investors. We'll email the PDF and add you to our monthly briefing.", "Persyaratan modal, perizinan berbasis risiko OSS, lini waktu realistis, dan pendaftaran pasca-pendirian yang sering dilewatkan panduan lain — ditulis untuk investor asing. Kami akan mengirim PDF via email dan menambahkan Anda ke briefing bulanan kami."],
  guidePoints: [
    ["Minimum capital & the investment plan", "Modal minimum & rencana investasi"],
    ["OSS risk-based licensing walkthrough", "Panduan perizinan berbasis risiko OSS"],
    ["The post-incorporation checklist", "Checklist pasca-pendirian"],
  ],
  guideSubmit: ["Email me the guide", "Kirim panduan ke email saya"],
  guideSent: ["Thank you — check your inbox", "Terima kasih — cek kotak masuk Anda"],

  faqTitle: ["PT PMA questions we hear most", "Pertanyaan PT PMA yang paling sering kami dengar"],
  ctaTitle: ["Planning your entry into Indonesia?", "Merencanakan masuk ke Indonesia?"],
  ctaSub: ["Bring us your business activity and we'll map the structure, licenses and timeline — no obligation.", "Bawakan aktivitas usaha Anda dan kami akan memetakan struktur, izin, dan lini waktunya — tanpa kewajiban."],

  trust: [
    { k: ["End-to-end", "Menyeluruh"], v: ["Deed, OSS licensing, NIB and post-setup registrations.", "Akta, perizinan OSS, NIB, dan pendaftaran pasca-pendirian."] },
    { k: ["Structuring first", "Penataan dulu"], v: ["KBLI and ownership checked before you sign.", "KBLI dan kepemilikan diperiksa sebelum Anda menandatangani."] },
    { k: ["Stays compliant", "Tetap patuh"], v: ["Same team runs tax, accounting and payroll after.", "Tim yang sama menjalankan pajak, akuntansi, dan penggajian setelahnya."] },
    { k: ["Investor-focused", "Fokus investor"], v: ["Guidance in your time zone and language.", "Panduan dalam zona waktu dan bahasa Anda."] },
  ],

  problems: [
    { t: ["The wrong KBLI locks in the wrong structure", "KBLI yang salah mengunci struktur yang salah"], d: ["Ownership caps on the Positive Investment List are tied to your business classification — picking it blind forces a costly restructure.", "Batas kepemilikan pada Daftar Positif Investasi terkait klasifikasi usaha Anda — memilihnya tanpa arah memaksa restrukturisasi yang mahal."] },
    { t: ["Minimum-capital rules misread", "Aturan modal minimum salah dibaca"], d: ["Confusion between the investment plan, issued capital and cash to deposit stalls setup or over-commits funds.", "Kebingungan antara rencana investasi, modal ditempatkan, dan kas yang disetor menghambat pendirian atau mengunci dana berlebih."] },
    { t: ["OSS risk-based licensing from abroad", "Perizinan berbasis risiko OSS dari luar negeri"], d: ["The online single submission system is hard to navigate without a local presence and the right documents.", "Sistem OSS sulit dinavigasi tanpa kehadiran lokal dan dokumen yang tepat."] },
    { t: ["Post-incorporation gaps", "Celah pasca-pendirian"], d: ["The deed is done, but no NPWP, no bank account, no BPJS — so you still cannot invoice or hire.", "Akta selesai, tetapi tanpa NPWP, tanpa rekening bank, tanpa BPJS — sehingga Anda masih belum bisa menagih atau merekrut."] },
  ],

  solutions: [
    { t: ["Structuring advice before you commit", "Saran penataan sebelum Anda berkomitmen"], d: ["We confirm the KBLI, ownership limits and capital plan that fit your activity — before the deed is drawn.", "Kami memastikan KBLI, batas kepemilikan, dan rencana modal yang sesuai aktivitas Anda — sebelum akta dibuat."] },
    { t: ["Full incorporation handled locally", "Pendirian penuh ditangani lokal"], d: ["Deed, Ministry approval, NIB and OSS licenses managed end to end by our team on the ground.", "Akta, persetujuan Kemenkumham, NIB, dan izin OSS dikelola menyeluruh oleh tim kami di lapangan."] },
    { t: ["Every registration to go live", "Setiap pendaftaran untuk mulai beroperasi"], d: ["NPWP, PKP, domicile, bank-account support and BPJS so you can operate from day one.", "NPWP, PKP, domisili, dukungan rekening bank, dan BPJS agar Anda bisa beroperasi sejak hari pertama."] },
    { t: ["A compliance calendar from day one", "Kalender kepatuhan sejak hari pertama"], d: ["Corporate, tax and reporting deadlines set up so nothing is missed after launch.", "Tenggat korporat, pajak, dan pelaporan disiapkan agar tak ada yang terlewat setelah peluncuran."] },
  ],

  scope: [
    { t: ["Structuring & KBLI advice", "Saran penataan & KBLI"], d: ["Ownership limits, capital plan and the right business classification.", "Batas kepemilikan, rencana modal, dan klasifikasi usaha yang tepat."] },
    { t: ["PT PMA establishment", "Pendirian PT PMA"], d: ["Deed of establishment and Ministry of Law & Human Rights approval.", "Akta pendirian dan persetujuan Kemenkumham."] },
    { t: ["OSS risk-based licensing", "Perizinan berbasis risiko OSS"], d: ["NIB and the business licenses your risk category requires.", "NIB dan izin usaha yang diperlukan kategori risiko Anda."] },
    { t: ["Tax & VAT registration", "Pendaftaran pajak & PPN"], d: ["NPWP, PKP for VAT and initial tax setup.", "NPWP, PKP untuk PPN, dan setup pajak awal."] },
    { t: ["Post-incorporation setup", "Setup pasca-pendirian"], d: ["Domicile, bank-account support and BPJS registration.", "Domisili, dukungan rekening bank, dan pendaftaran BPJS."] },
    { t: ["Corporate secretarial", "Sekretaris perusahaan"], d: ["Annual GMS, statutory registers and ongoing compliance.", "RUPS tahunan, daftar statutori, dan kepatuhan berkelanjutan."] },
  ],

  steps: [
    { n: "1", time: ["Week 1", "Minggu 1"], t: ["Structuring & feasibility", "Penataan & kelayakan"], d: ["We confirm the KBLI, foreign-ownership position and minimum-capital plan for your intended activity.", "Kami memastikan KBLI, posisi kepemilikan asing, dan rencana modal minimum untuk aktivitas yang Anda tuju."] },
    { n: "2", time: ["Week 1–2", "Minggu 1–2"], t: ["Name & documents", "Nama & dokumen"], d: ["Company-name reservation and preparation of the deed, shareholder and director documents.", "Reservasi nama perusahaan dan penyiapan akta, dokumen pemegang saham dan direksi."] },
    { n: "3", time: ["Week 2–3", "Minggu 2–3"], t: ["Deed & legal entity", "Akta & badan hukum"], d: ["Notarial deed of establishment and approval from the Ministry of Law & Human Rights.", "Akta pendirian notaris dan persetujuan Kementerian Hukum & HAM."] },
    { n: "4", time: ["Week 3–4", "Minggu 3–4"], t: ["NIB & OSS licensing", "NIB & perizinan OSS"], d: ["Business identification number and the licenses your OSS risk category requires.", "Nomor Induk Berusaha dan izin yang diperlukan kategori risiko OSS Anda."] },
    { n: "5", time: ["Week 4–5", "Minggu 4–5"], t: ["Tax & registrations", "Pajak & pendaftaran"], d: ["NPWP, PKP for VAT, domicile, bank-account support and BPJS registration.", "NPWP, PKP untuk PPN, domisili, dukungan rekening bank, dan pendaftaran BPJS."] },
    { n: "6", time: ["Ongoing", "Berkelanjutan"], t: ["Operate & comply", "Beroperasi & patuh"], d: ["Bookkeeping, tax, payroll and secretarial work under one team and one point of contact.", "Pembukuan, pajak, penggajian, dan sekretaris perusahaan di bawah satu tim dan satu titik kontak."] },
  ],

  proof: [
    { k: ["OSS", "OSS"], v: ["Risk-based licensing handled locally", "Perizinan berbasis risiko ditangani lokal"] },
    { k: ["KBLI", "KBLI"], v: ["Classification and ownership checked first", "Klasifikasi dan kepemilikan diperiksa lebih dulu"] },
    { k: ["One team", "Satu tim"], v: ["Setup, tax, accounting & payroll together", "Pendirian, pajak, akuntansi & penggajian bersama"] },
    { k: ["90+", "90+"], v: ["Countries in the ECOVIS network", "Negara dalam jaringan ECOVIS"] },
  ],

  faqs: [
    { q: ["What is the minimum capital for a PT PMA?", "Berapa modal minimum untuk PT PMA?"], a: ["The general rule is a minimum investment plan above IDR 10 billion per business classification (KBLI), excluding land and buildings, with a portion paid up as issued capital. Some sectors and structures differ, and the investment plan is separate from the cash you must deposit on day one — we size both to your actual business in the first session.", "Aturan umumnya adalah rencana investasi minimum di atas IDR 10 miliar per klasifikasi usaha (KBLI), di luar tanah dan bangunan, dengan sebagian disetor sebagai modal ditempatkan. Sejumlah sektor dan struktur berbeda, dan rencana investasi terpisah dari kas yang harus disetor pada hari pertama — kami menghitung keduanya sesuai bisnis nyata Anda di sesi pertama."] },
    { q: ["Can foreigners own 100% of the company?", "Bisakah asing memiliki 100% perusahaan?"], a: ["It depends on the business activity. The Positive Investment List sets ownership limits by KBLI code — many sectors allow 100% foreign ownership, while others cap it or require a local partner. Choosing the correct KBLI is the single most important early decision, and getting it wrong forces a restructure later.", "Tergantung aktivitas usaha. Daftar Positif Investasi menetapkan batas kepemilikan per kode KBLI — banyak sektor mengizinkan kepemilikan asing 100%, sementara yang lain membatasi atau mensyaratkan mitra lokal. Memilih KBLI yang tepat adalah keputusan awal terpenting, dan salah memilih memaksa restrukturisasi kemudian."] },
    { q: ["How long does incorporation take?", "Berapa lama pendirian?"], a: ["With documents in order, the deed, Ministry of Law approval and NIB can be completed in a few weeks. Sector-specific licenses under OSS risk-based licensing add time depending on your risk category. We give you a realistic timeline mapped to your specific activity, not a generic estimate.", "Dengan dokumen lengkap, akta, persetujuan Kemenkumham, dan NIB dapat diselesaikan dalam beberapa minggu. Izin spesifik sektor di bawah perizinan berbasis risiko OSS menambah waktu tergantung kategori risiko Anda. Kami memberi lini waktu realistis sesuai aktivitas spesifik Anda, bukan estimasi generik."] },
    { q: ["What do we need before we can operate?", "Apa yang kami butuhkan sebelum bisa beroperasi?"], a: ["Beyond the deed and NIB, you typically need a business license appropriate to your OSS risk level, tax registration (NPWP and PKP for VAT), a domicile arrangement, a corporate bank account, and BPJS registration before hiring. We handle these post-incorporation registrations as part of the engagement.", "Selain akta dan NIB, Anda biasanya membutuhkan izin usaha sesuai tingkat risiko OSS, pendaftaran pajak (NPWP dan PKP untuk PPN), pengaturan domisili, rekening bank perusahaan, dan pendaftaran BPJS sebelum merekrut. Kami menangani pendaftaran pasca-pendirian ini sebagai bagian dari penugasan."] },
    { q: ["Do you help after the company is set up?", "Apakah Anda membantu setelah perusahaan berdiri?"], a: ["Yes — that is the point. The same team runs your bookkeeping, tax compliance, payroll and corporate secretarial work, so the entity stays compliant with one point of contact instead of being handed off after incorporation.", "Ya — itulah intinya. Tim yang sama menjalankan pembukuan, kepatuhan pajak, penggajian, dan pekerjaan sekretaris perusahaan Anda, sehingga entitas tetap patuh dengan satu titik kontak alih-alih ditinggalkan setelah pendirian."] },
  ],
};
