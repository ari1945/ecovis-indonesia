// Generated from the design prototype project/Payroll.dc.html
// by scripts/extract-services.mjs — copy is verbatim from the approved design.
import type { ServiceContent } from '../service-types';

export const payroll: ServiceContent = {
  slug: "payroll",
  kicker: ["Payroll", "Penggajian"],
  heroTitle: ["Confidential payroll, run outside your office", "Penggajian rahasia, dijalankan di luar kantor Anda"],
  heroSub: ["End-to-end payroll for local and expatriate staff: salary processing, PPh 21/26 withholding, BPJS administration and payslip delivery — handled discreetly, so sensitive pay data never sits with local admin staff.", "Penggajian menyeluruh untuk staf lokal dan ekspatriat: pemrosesan gaji, pemotongan PPh 21/26, administrasi BPJS, dan pengiriman slip gaji — ditangani secara diskret, sehingga data gaji sensitif tidak pernah berada di tangan staf admin lokal."],
  ctaPrimary: ["Discuss payroll outsourcing", "Diskusikan alih daya penggajian"],
  ctaSecondary: ["Get the payroll guide", "Dapatkan panduan penggajian"],

  situationTitle: ["Why payroll rarely stays simple", "Mengapa penggajian jarang tetap sederhana"],
  howHelpsTitle: ["Paid correctly, filed on time, kept private", "Dibayar benar, dilaporkan tepat waktu, tetap privat"],
  scopeTitle: ["Every part of the pay run", "Setiap bagian dari siklus penggajian"],
  processTitle: ["A discreet monthly pay cycle", "Siklus penggajian bulanan yang diskret"],
  proofTitle: ["Confidentiality is the whole point", "Kerahasiaan adalah intinya"],
  proofBody: ["Processing sits outside your office under strict access controls and Indonesia's personal-data-protection law, so salaries — especially management and expatriate pay — never pass across local admin desks. Because we also handle your tax, PPh 21 reconciles to your filings automatically.", "Pemrosesan berada di luar kantor Anda dengan kendali akses ketat dan UU Perlindungan Data Pribadi Indonesia, sehingga gaji — terutama gaji manajemen dan ekspatriat — tidak pernah melewati meja admin lokal. Karena kami juga menangani pajak Anda, PPh 21 terrekonsiliasi otomatis dengan pelaporan Anda."],
  quote: ["\"Moving payroll off-site solved a real confidentiality problem for our leadership team — and the expatriate tax equalization now just works.\"", "\"Memindahkan penggajian ke luar kantor menyelesaikan masalah kerahasiaan nyata bagi tim pimpinan kami — dan tax equalization ekspatriat kini berjalan mulus.\""],
  quoteBy: ["HR Director — European services group", "Direktur SDM — grup jasa Eropa"],

  guideTitle: ["Indonesia Payroll & Employment Guide", "Panduan Penggajian & Ketenagakerjaan Indonesia"],
  guideBody: ["PPh 21, BPJS ceilings, provincial minimum wages, leave entitlements and termination costs under current manpower rules — the numbers HR and finance need in one reference. We'll email the PDF and add you to our monthly briefing.", "PPh 21, batas BPJS, upah minimum provinsi, hak cuti, dan biaya pemutusan berdasarkan aturan ketenagakerjaan terkini — angka yang dibutuhkan HR dan keuangan dalam satu referensi. Kami akan mengirim PDF via email dan menambahkan Anda ke briefing bulanan kami."],
  guidePoints: [
    ["PPh 21 & BPJS rates and ceilings", "Tarif & batas PPh 21 & BPJS"],
    ["Provincial minimum wages", "Upah minimum provinsi"],
    ["Leave and termination entitlements", "Hak cuti dan pemutusan"],
  ],
  guideSubmit: ["Email me the guide", "Kirim panduan ke email saya"],
  guideSent: ["Thank you — check your inbox", "Terima kasih — cek kotak masuk Anda"],

  faqTitle: ["Payroll questions we hear most", "Pertanyaan penggajian yang paling sering kami dengar"],
  ctaTitle: ["Take payroll off your team's plate", "Lepaskan beban penggajian dari tim Anda"],
  ctaSub: ["Tell us your headcount and pay dates and we'll scope a confidential run — no obligation.", "Beri tahu jumlah karyawan dan tanggal gajian Anda dan kami akan menyusun proses yang rahasia — tanpa kewajiban."],

  trust: [
    { k: ["Off-site & private", "Di luar kantor & privat"], v: ["Processed under UU PDP-compliant access controls.", "Diproses dengan kendali akses sesuai UU PDP."] },
    { k: ["PPh 21 / 26", "PPh 21 / 26"], v: ["Withholding calculated, filed and reconciled to tax.", "Pemotongan dihitung, dilaporkan, dan direkonsiliasi ke pajak."] },
    { k: ["BPJS handled", "BPJS ditangani"], v: ["Kesehatan and Ketenagakerjaan administered in full.", "Kesehatan dan Ketenagakerjaan dikelola sepenuhnya."] },
    { k: ["Expat-ready", "Siap ekspatriat"], v: ["Tax equalization and cross-border coordination.", "Tax equalization dan koordinasi lintas negara."] },
  ],

  problems: [
    { t: ["Salary data too sensitive for local admin", "Data gaji terlalu sensitif untuk admin lokal"], d: ["Leadership and expatriate pay cannot sit with in-house administrative staff.", "Gaji pimpinan dan ekspatriat tidak boleh berada di tangan staf administrasi internal."] },
    { t: ["BPJS and severance are moving targets", "BPJS dan pesangon terus berubah"], d: ["Contribution ceilings and Job-Creation-Law termination formulas change and are easy to misapply.", "Batas iuran dan formula pesangon UU Cipta Kerja berubah dan mudah salah diterapkan."] },
    { t: ["Expatriate tax equalization", "Tax equalization ekspatriat"], d: ["Gross-up, net pay and home-country interaction create errors and disputes.", "Gross-up, gaji net, dan interaksi negara asal memicu kesalahan dan sengketa."] },
    { t: ["Manual runs that miss filings", "Proses manual yang melewatkan pelaporan"], d: ["Spreadsheet payroll drifts out of sync with the PPh 21 and BPJS deadlines.", "Penggajian berbasis spreadsheet melenceng dari tenggat PPh 21 dan BPJS."] },
  ],

  solutions: [
    { t: ["Fully confidential processing", "Pemrosesan sepenuhnya rahasia"], d: ["Runs handled off-site under strict access controls and data-protection rules.", "Proses ditangani di luar kantor dengan kendali akses ketat dan aturan perlindungan data."] },
    { t: ["Current-rule compliance", "Kepatuhan aturan terkini"], d: ["PPh 21/26, BPJS and manpower rules applied at the rates in force.", "PPh 21/26, BPJS, dan aturan ketenagakerjaan diterapkan pada tarif yang berlaku."] },
    { t: ["One provider for the whole picture", "Satu penyedia untuk gambaran utuh"], d: ["Payroll, tax and immigration questions answered by a single coordinated team.", "Pertanyaan penggajian, pajak, dan imigrasi dijawab oleh satu tim terkoordinasi."] },
    { t: ["Reconciled to your tax filings", "Terrekonsiliasi ke pelaporan pajak"], d: ["Withholding ties back to the returns we file — no year-end mismatch.", "Pemotongan cocok dengan SPT yang kami laporkan — tanpa selisih akhir tahun."] },
  ],

  scope: [
    { t: ["Payroll processing", "Pemrosesan penggajian"], d: ["Monthly salary calculation, approvals and payment instructions.", "Perhitungan gaji bulanan, persetujuan, dan instruksi pembayaran."] },
    { t: ["PPh 21 / 26", "PPh 21 / 26"], d: ["Employee income-tax withholding, filing and annual forms.", "Pemotongan PPh karyawan, pelaporan, dan formulir tahunan."] },
    { t: ["BPJS administration", "Administrasi BPJS"], d: ["Kesehatan and Ketenagakerjaan registration and contributions.", "Pendaftaran dan iuran Kesehatan serta Ketenagakerjaan."] },
    { t: ["Expatriate payroll", "Penggajian ekspatriat"], d: ["Gross-up, net arrangements and tax equalization.", "Gross-up, pengaturan net, dan tax equalization."] },
    { t: ["Payslip delivery", "Pengiriman slip gaji"], d: ["Secure individual payslips and management reporting.", "Slip gaji individual yang aman dan pelaporan manajemen."] },
    { t: ["Severance modelling", "Pemodelan pesangon"], d: ["Termination-cost calculations under the Job Creation Law.", "Perhitungan biaya pemutusan berdasarkan UU Cipta Kerja."] },
  ],

  steps: [
    { n: "1", t: ["Setup", "Setup"], d: ["Employee data, pay elements and BPJS registration are loaded securely.", "Data karyawan, elemen gaji, dan pendaftaran BPJS dimuat secara aman."] },
    { n: "2", t: ["Monthly input", "Input bulanan"], d: ["You send hires, leavers and variable pay by the cut-off date.", "Anda mengirim karyawan baru, yang keluar, dan gaji variabel sebelum cut-off."] },
    { n: "3", t: ["Processing", "Pemrosesan"], d: ["Salaries, tax and contributions are calculated and reconciled.", "Gaji, pajak, dan iuran dihitung dan direkonsiliasi."] },
    { n: "4", t: ["Approval & pay", "Persetujuan & bayar"], d: ["You approve the run, then payslips issue and salaries are paid.", "Anda menyetujui proses, lalu slip gaji terbit dan gaji dibayarkan."] },
    { n: "5", t: ["Filing", "Pelaporan"], d: ["PPh 21/26 and BPJS obligations are filed on their deadlines.", "Kewajiban PPh 21/26 dan BPJS dilaporkan pada tenggatnya."] },
  ],

  proof: [
    { k: ["UU PDP", "UU PDP"], v: ["Data handled to Indonesia’s privacy law", "Data ditangani sesuai UU privasi Indonesia"] },
    { k: ["PPh 21", "PPh 21"], v: ["Filed and reconciled to your returns", "Dilaporkan dan direkonsiliasi ke SPT Anda"] },
    { k: ["BPJS", "BPJS"], v: ["Both schemes administered in full", "Kedua program dikelola sepenuhnya"] },
    { k: ["1 team", "1 tim"], v: ["Payroll, tax and immigration together", "Penggajian, pajak, dan imigrasi bersama"] },
  ],

  faqs: [
    { q: ["How do you keep salary data confidential?", "Bagaimana Anda menjaga kerahasiaan data gaji?"], a: ["Processing happens off-site under restricted access, with data handled according to Indonesia’s Personal Data Protection Law (UU PDP). Management and expatriate pay never passes across local administrative desks — which is the main reason many clients outsource in the first place.", "Pemrosesan dilakukan di luar kantor dengan akses terbatas, dan data ditangani sesuai UU Perlindungan Data Pribadi (UU PDP). Gaji manajemen dan ekspatriat tidak pernah melewati meja administrasi lokal — alasan utama banyak klien mengalihdayakan sejak awal."] },
    { q: ["What taxes and contributions do you handle?", "Pajak dan iuran apa yang Anda tangani?"], a: ["We calculate and file PPh 21 for residents and PPh 26 for non-residents, administer BPJS Kesehatan and Ketenagakerjaan, and produce the annual tax forms for employees. Because our tax team files your returns, the withholding reconciles automatically.", "Kami menghitung dan melaporkan PPh 21 untuk penduduk dan PPh 26 untuk non-penduduk, mengelola BPJS Kesehatan dan Ketenagakerjaan, serta menyusun formulir pajak tahunan karyawan. Karena tim pajak kami yang melaporkan SPT Anda, pemotongan terrekonsiliasi otomatis."] },
    { q: ["Can you handle expatriate payroll and tax equalization?", "Bisakah Anda menangani payroll ekspatriat dan tax equalization?"], a: ["Yes. We manage gross-up and net arrangements, tax equalization, and the interaction between Indonesian and home-country obligations, coordinating with ECOVIS teams abroad where a treaty position is involved.", "Ya. Kami mengelola pengaturan gross-up dan net, tax equalization, serta interaksi antara kewajiban Indonesia dan negara asal, berkoordinasi dengan tim ECOVIS di luar negeri bila menyangkut posisi tax treaty."] },
    { q: ["How do BPJS and severance rules affect us?", "Bagaimana aturan BPJS dan pesangon memengaruhi kami?"], a: ["BPJS has both employer and employee contribution rates with income ceilings, and termination costs follow the formulas set under the Job Creation Law. We apply the current rates and model severance so there are no surprises at exit.", "BPJS memiliki tarif iuran pemberi kerja dan karyawan dengan batas penghasilan, dan biaya pemutusan mengikuti formula UU Cipta Kerja. Kami menerapkan tarif berlaku dan memodelkan pesangon agar tidak ada kejutan saat keluar."] },
    { q: ["How does a monthly run work in practice?", "Bagaimana pemrosesan bulanan berjalan dalam praktik?"], a: ["You send changes — new hires, leavers, variable pay — by a cut-off date. We process, produce payslips and reports for your approval, arrange or instruct the salary payments, and file the associated taxes and contributions.", "Anda mengirim perubahan — karyawan baru, yang keluar, gaji variabel — sebelum tanggal cut-off. Kami memproses, menyusun slip gaji dan laporan untuk persetujuan Anda, mengatur atau menginstruksikan pembayaran gaji, dan melaporkan pajak serta iuran terkait."] },
  ],
};
