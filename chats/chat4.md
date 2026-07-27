# Potensi pengembangan website

_Started 2026-07-17 08:37 UTC_

---

## User

Apalgi yang dapat dikembangkan dari website ini?

## Assistant

Let me look at what's currently in the project before suggesting improvements.

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

Situs ini sudah cukup lengkap — Home, About, hub Services + 10 sub-jasa, Industries, Insights, Resources, Careers, Contact, plus dokumen Blueprint strategi. Berdasarkan funnel yang sudah dirancang di Blueprint, ini yang paling berdampak untuk dikembangkan berikutnya:

**Mesin konversi (prioritas tertinggi — funnel tahap 3–4)**
- **Landing page lead magnet** — wireframe-nya sudah ada di Blueprint tapi belum dibangun. Halaman fokus-tunggal (form + cover guide, tanpa nav penuh) untuk "PT PMA 2026", "Checklist Audit", "Kalender Pajak 2026".
- **Form konsultasi yang sungguh berfungsi** di Contact — multi-step (jenis jasa → detail → jadwal), bukan cuma tombol.
- **Band CTA global** yang konsisten muncul di tiap halaman jasa.

**Kepercayaan & bukti (funnel tahap 3)**
- **Halaman/section Case Study** — studi kasus ringkas per jasa prioritas.
- **Profil Partner** dengan kredensial (izin KAP, keanggotaan IAPI) — disebut penting di Blueprint tapi belum ada halaman detailnya.
- **Testimoni + logo klien** sebagai komponen reusable.

**Konten & SEO (funnel tahap 1)**
- **Template artikel Insights** (halaman detail satu artikel, dengan schema FAQ + CTA di dalam artikel) — sekarang kemungkinan baru daftar/index.
- **Halaman detail per Industri** untuk SEO long-tail.

**Fungsional / pengalaman**
- **Interaksi nyata**: filter/search di Insights, kalkulator estimasi lingkup audit, kalkulator pajak.
- **Versi mobile/responsif** — semua halaman sekarang fixed 1440px/1240px desktop.
- **Bilingual EN/ID** toggle — audiens PMA asing + klien lokal.
- **Halaman legal**: Privacy, Terms, Cookie (wajib untuk form lead).

Yang mana yang mau saya bangun dulu? Rekomendasi saya: **landing page lead magnet + form konsultasi fungsional**, karena itu langsung menutup funnel yang sudah dirancang tapi belum ada halamannya.

## User

proceed

## Assistant

_[tool: read_file]_

_[tool: read_file]_

Now building the two priorities. First, the lead-magnet landing page (single-focus, per the Blueprint wireframe):

_[tool: read_file]_

I have the vocabulary. Building the lead-magnet landing page:

_[tool: dc_write]_

Landing page done. Now upgrading the Contact form into a functional multi-step wizard:

_[tool: str_replace_edit]_

Now the logic class for the multi-step form:

_[tool: str_replace_edit]_

Both built. Let me verify the landing page and the multi-step form render correctly:

_[tool: show_html]_

_[tool: get_webview_logs]_

Now let me wire the landing page into Resources so it's reachable. Let me check how Resources lists guides:

_[tool: grep]_

The gated guides all point to `#newsletter`. Let me route the "Company Establishment Guide" to the new dedicated landing page:

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Selesai. Dua item prioritas dari funnel Blueprint sekarang jadi halaman nyata:

**GuideLanding.dc.html** — landing lead-magnet fokus-tunggal (nav minimal, split hero + cover guide + form berfungsi dengan validasi & success state, strip social proof). Judul/subjudul bisa di-tweak agar dipakai ulang untuk guide lain. Sudah ditautkan dari kartu "Company Establishment Guide" di Resources.

**Contact.dc.html** — form konsultasi kini wizard 3-langkah (Pilih kebutuhan → Detail → Jadwal + review) dengan progress indicator, validasi, dan konfirmasi personal.

Berikutnya yang bisa saya kerjakan bila mau: profil partner + case study (bukti kepercayaan), atau template detail artikel Insights untuk SEO.

