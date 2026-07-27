// Generated from the design prototype project/DigitalSolutions.dc.html
// by scripts/extract-services.mjs — copy is verbatim from the approved design.
import type { ServiceContent } from '../service-types';

export const digitalSolutions: ServiceContent = {
  slug: "digital-solutions",
  kicker: ["Digital Solutions", "Solusi Digital"],
  heroTitle: ["Make your finance systems and Coretax speak the same language", "Buat sistem keuangan Anda dan Coretax berbicara bahasa yang sama"],
  heroSub: ["Coretax readiness, e-Faktur and e-Bupot integration, accounting-system selection and process automation — so tax filings reconcile to your ledger without the monthly manual scramble.", "Kesiapan Coretax, integrasi e-Faktur dan e-Bupot, pemilihan sistem akuntansi, dan otomatisasi proses — agar pelaporan pajak terrekonsiliasi dengan buku besar tanpa kerepotan manual tiap bulan."],
  ctaPrimary: ["Book a systems review", "Pesan telaah sistem"],
  ctaSecondary: ["Get the Coretax readiness guide", "Dapatkan panduan kesiapan Coretax"],

  situationTitle: ["Where systems and tax fall out of step", "Di mana sistem dan pajak menjadi tidak selaras"],
  howHelpsTitle: ["Systems that reconcile by design", "Sistem yang terrekonsiliasi by design"],
  scopeTitle: ["Finance technology, end to end", "Teknologi keuangan, ujung ke ujung"],
  processTitle: ["Mapped, tested, then automated", "Dipetakan, diuji, lalu diotomatiskan"],
  proofTitle: ["Vendor-neutral, and we run the numbers ourselves", "Vendor-neutral, dan kami sendiri yang menjalankan angkanya"],
  proofBody: ["We are not tied to a single software vendor, so system selection is based on your needs, not a reseller margin. And because our own teams use these systems to file your tax and keep your books, we implement for how the work is actually done — not a demo workflow.", "Kami tidak terikat pada satu vendor perangkat lunak, sehingga pemilihan sistem didasarkan pada kebutuhan Anda, bukan margin reseller. Dan karena tim kami sendiri menggunakan sistem ini untuk melaporkan pajak dan menjaga pembukuan Anda, kami mengimplementasikan sesuai cara kerja nyata — bukan alur demo."],
  quote: ["\"Our ERP output never matched the Coretax format, so every filing was manual. They mapped the fields, automated the reconciliation, and month-end went from days to hours.\"", "\"Output ERP kami tidak pernah cocok dengan format Coretax, jadi setiap pelaporan manual. Mereka memetakan field-nya, mengotomatiskan rekonsiliasinya, dan akhir bulan berubah dari hitungan hari menjadi jam.\""],
  quoteBy: ["Finance Manager — manufacturing subsidiary", "Finance Manager — anak usaha manufaktur"],

  guideTitle: ["Coretax Readiness Guide", "Panduan Kesiapan Coretax"],
  guideBody: ["The master-data, mapping and testing steps that decide whether your ERP feeds Coretax cleanly — and the errors that cause the most filing rejections. We'll email the PDF and add you to our monthly briefing.", "Langkah master-data, pemetaan, dan pengujian yang menentukan apakah ERP Anda mengumpankan Coretax dengan bersih — serta kesalahan yang paling banyak menyebabkan penolakan pelaporan. Kami akan mengirim PDF via email dan menambahkan Anda ke briefing bulanan kami."],
  guidePoints: [
    ["Master-data alignment steps", "Langkah penyelarasan master-data"],
    ["The most common filing rejections", "Penolakan pelaporan yang paling umum"],
    ["What to automate first", "Apa yang diotomatiskan lebih dulu"],
  ],
  guideSubmit: ["Email me the guide", "Kirim panduan ke email saya"],
  guideSent: ["Thank you — check your inbox", "Terima kasih — cek kotak masuk Anda"],

  faqTitle: ["Digital questions we hear most", "Pertanyaan digital yang paling sering kami dengar"],
  ctaTitle: ["Manual reconciliation eating your month-end?", "Rekonsiliasi manual menyita akhir bulan Anda?"],
  ctaSub: ["Tell us your systems and we'll scope where automation pays off first — no obligation.", "Beri tahu sistem Anda dan kami akan menentukan di mana otomatisasi paling menguntungkan lebih dulu — tanpa kewajiban."],

  trust: [
    { k: ["Coretax-ready", "Siap Coretax"], v: ["Master-data mapping, testing and clean filing.", "Pemetaan master-data, pengujian, dan pelaporan bersih."] },
    { k: ["ERP integration", "Integrasi ERP"], v: ["e-Faktur and e-Bupot wired to your ledger.", "e-Faktur dan e-Bupot tersambung ke buku besar Anda."] },
    { k: ["Vendor-neutral", "Vendor-neutral"], v: ["System choice based on need, not reseller margin.", "Pilihan sistem berdasarkan kebutuhan, bukan margin reseller."] },
    { k: ["Automation", "Otomatisasi"], v: ["Recurring reconciliations done without manual work.", "Rekonsiliasi berulang selesai tanpa kerja manual."] },
  ],

  problems: [
    { t: ["ERP output that does not fit Coretax", "Output ERP yang tidak cocok Coretax"], d: ["Tax IDs, codes and file formats do not line up, so every filing needs a manual fix.", "NPWP, kode, dan format file tidak sejajar, sehingga setiap pelaporan perlu perbaikan manual."] },
    { t: ["Manual book-to-tax reconciliation", "Rekonsiliasi buku-ke-pajak manual"], d: ["Month-end is lost to matching the ledger against tax filings by hand.", "Akhir bulan habis untuk mencocokkan buku besar dengan pelaporan pajak secara manual."] },
    { t: ["Choosing a system blind", "Memilih sistem tanpa arah"], d: ["Selecting an accounting or ERP platform without knowing how it must feed tax and reporting.", "Memilih platform akuntansi atau ERP tanpa tahu bagaimana ia harus mengumpankan pajak dan pelaporan."] },
    { t: ["Errors that repeat every month", "Kesalahan yang berulang tiap bulan"], d: ["The same rejections and adjustments recur because the root cause is never mapped out.", "Penolakan dan koreksi yang sama terulang karena akar masalah tidak pernah dipetakan."] },
  ],

  solutions: [
    { t: ["System-to-Coretax mapping and testing", "Pemetaan sistem-ke-Coretax dan pengujian"], d: ["Master data aligned and submissions tested until filings pass cleanly.", "Master data diselaraskan dan submission diuji hingga pelaporan lolos bersih."] },
    { t: ["Automated tax-to-ledger reconciliation", "Rekonsiliasi pajak-ke-buku otomatis"], d: ["Filings tie back to the books without manual matching.", "Pelaporan cocok kembali dengan buku tanpa pencocokan manual."] },
    { t: ["Vendor-neutral selection support", "Dukungan pemilihan vendor-neutral"], d: ["The right-sized system chosen for your needs, then implemented.", "Sistem berukuran tepat dipilih untuk kebutuhan Anda, lalu diimplementasikan."] },
    { t: ["Implemented for the real workflow", "Diimplementasikan untuk alur kerja nyata"], d: ["Configured by the teams that will actually run your tax and books.", "Dikonfigurasi oleh tim yang benar-benar menjalankan pajak dan pembukuan Anda."] },
  ],

  scope: [
    { t: ["Coretax readiness", "Kesiapan Coretax"], d: ["Master-data alignment, mapping and submission testing.", "Penyelarasan master-data, pemetaan, dan pengujian submission."] },
    { t: ["e-Faktur & e-Bupot", "e-Faktur & e-Bupot"], d: ["ERP integration for e-invoicing and withholding documents.", "Integrasi ERP untuk e-invoicing dan dokumen pemotongan."] },
    { t: ["System selection", "Pemilihan sistem"], d: ["Vendor-neutral shortlisting sized to your operation.", "Shortlist vendor-neutral yang disesuaikan dengan operasi Anda."] },
    { t: ["System implementation", "Implementasi sistem"], d: ["Setup, migration and go-live support for finance systems.", "Setup, migrasi, dan dukungan go-live untuk sistem keuangan."] },
    { t: ["Process automation", "Otomatisasi proses"], d: ["Reconciliations, validations and month-end checks automated.", "Rekonsiliasi, validasi, dan pemeriksaan akhir bulan diotomatiskan."] },
    { t: ["Integration & reporting", "Integrasi & pelaporan"], d: ["Data flows connecting systems, tax and reporting.", "Arus data yang menghubungkan sistem, pajak, dan pelaporan."] },
  ],

  steps: [
    { n: "1", t: ["Systems review", "Telaah sistem"], d: ["We map your current systems, data flows and the points where they break.", "Kami memetakan sistem, arus data, dan titik di mana semuanya rusak."] },
    { n: "2", t: ["Design", "Desain"], d: ["A target mapping and integration design for Coretax and reporting.", "Desain pemetaan target dan integrasi untuk Coretax dan pelaporan."] },
    { n: "3", t: ["Build", "Bangun"], d: ["Field mapping, extraction and validation configured and connected.", "Pemetaan field, ekstraksi, dan validasi dikonfigurasi dan disambungkan."] },
    { n: "4", t: ["Test", "Uji"], d: ["Submissions and reconciliations tested until they run clean.", "Submission dan rekonsiliasi diuji hingga berjalan bersih."] },
    { n: "5", t: ["Automate & support", "Otomatisasi & dukungan"], d: ["Recurring steps automated, with support as volumes grow.", "Langkah berulang diotomatiskan, dengan dukungan seiring pertumbuhan volume."] },
  ],

  proof: [
    { k: ["Coretax", "Coretax"], v: ["Filings that pass without manual fixes", "Pelaporan yang lolos tanpa perbaikan manual"] },
    { k: ["Days to hours", "Hari ke jam"], v: ["Typical month-end reconciliation gain", "Peningkatan rekonsiliasi akhir bulan tipikal"] },
    { k: ["Neutral", "Netral"], v: ["No single-vendor lock-in", "Tanpa keterikatan satu vendor"] },
    { k: ["1 team", "1 tim"], v: ["Systems, tax and books together", "Sistem, pajak, dan pembukuan bersama"] },
  ],

  faqs: [
    { q: ["What does Coretax readiness actually involve?", "Apa sebenarnya cakupan kesiapan Coretax?"], a: ["It is mostly master-data and mapping work: aligning tax IDs, transaction and document codes, and the file formats your ERP produces with what Coretax expects, then testing submissions until they pass cleanly. Get the mapping right once and filings stop bouncing; get it wrong and every month is a manual fix.", "Sebagian besar adalah pekerjaan master-data dan pemetaan: menyelaraskan NPWP, kode transaksi dan dokumen, serta format file yang dihasilkan ERP Anda dengan yang diharapkan Coretax, lalu menguji submission hingga lolos bersih. Pemetaan yang benar sekali membuat pelaporan berhenti ditolak; yang salah membuat setiap bulan jadi perbaikan manual."] },
    { q: ["Can you integrate our ERP with e-Faktur and e-Bupot?", "Bisakah Anda mengintegrasikan ERP kami dengan e-Faktur dan e-Bupot?"], a: ["Yes. We map your ERP output to the e-Faktur and e-Bupot requirements, set up the extraction and validation, and reconcile the tax documents back to the ledger so what you file matches what you booked.", "Ya. Kami memetakan output ERP Anda ke persyaratan e-Faktur dan e-Bupot, menyiapkan ekstraksi dan validasi, serta merekonsiliasi dokumen pajak kembali ke buku besar sehingga yang Anda laporkan cocok dengan yang Anda bukukan."] },
    { q: ["We do not have an accounting system yet — can you help us choose?", "Kami belum punya sistem akuntansi — bisakah Anda membantu memilih?"], a: ["Yes, and we do it vendor-neutrally. We size the requirement to your operation, shortlist suitable systems, and support selection and implementation — including how the system will feed Coretax and your reporting from day one.", "Ya, dan kami melakukannya secara vendor-neutral. Kami menyesuaikan kebutuhan dengan operasi Anda, menyusun shortlist sistem yang sesuai, dan mendukung pemilihan serta implementasi — termasuk bagaimana sistem akan mengumpankan Coretax dan pelaporan Anda sejak hari pertama."] },
    { q: ["What can realistically be automated?", "Apa yang realistis bisa diotomatiskan?"], a: ["The recurring, rule-based work: tax-to-ledger reconciliations, withholding calculations, e-invoice generation and validation, and month-end checks. Automation removes the manual steps where errors and delays accumulate, so your team spends time on review rather than data entry.", "Pekerjaan berulang berbasis aturan: rekonsiliasi pajak-ke-buku besar, perhitungan pemotongan, pembuatan dan validasi e-invoice, serta pemeriksaan akhir bulan. Otomatisasi menghapus langkah manual tempat kesalahan dan keterlambatan menumpuk, sehingga tim Anda menghabiskan waktu untuk telaah alih-alih entri data."] },
    { q: ["How does this connect to your tax and accounting teams?", "Bagaimana ini terhubung dengan tim pajak dan akuntansi Anda?"], a: ["Directly. The same firm files your tax and keeps your books using these systems, so we implement for the real workflow and the numbers reconcile end to end — rather than handing over a configuration that looks right in a demo but breaks at month-end.", "Langsung. Firma yang sama melaporkan pajak dan menjaga pembukuan Anda menggunakan sistem ini, sehingga kami mengimplementasikan sesuai alur kerja nyata dan angka terrekonsiliasi ujung ke ujung — bukan menyerahkan konfigurasi yang tampak benar di demo tetapi rusak saat akhir bulan."] },
  ],
};
