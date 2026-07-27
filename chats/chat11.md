# Evaluasi rancangan website

_Started 2026-07-26 07:11 UTC_

---

## User

Aku kan evaluasi menyuluruh dan saran perbaikan rancangan website ini

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: list_files]_

_[tool: grep]_

_[tool: read_file]_

Cukup konteks. Menyusun laporan evaluasi di `Evaluation.dc.html`.

_[tool: dc_write]_

_[tool: ready_for_verification]_

`Evaluation.dc.html` sekarang berisi laporan evaluasi lengkap: kartu skor 8 dimensi (skor keseluruhan 5,6/10), 6 kekuatan, 17 temuan berperingkat P0–P2 yang bisa difilter dan dibuka satu per satu (bukti + rekomendasi + dampak/upaya), roadmap 3 gelombang, dan 6 quick win.

Inti temuannya: desain dan copy-nya sudah kuat — yang lemah adalah **bukti** (nol foto, nol testimoni, nol nomor izin), **kepatuhan** (formulir tanpa label & tanpa consent PDP, kontras di bawah WCAG AA), dan **SEO/multibahasa** (toggle EN/ID tanpa URL sehingga versi Indonesia tak pernah terindeks).

Sebut nomor temuan yang mau dieksekusi (mis. "kerjakan P0-4 dan P0-5") dan langsung saya terapkan ke halaman terkait.

## User

Check didn’t complete

## Assistant

_[tool: show_html]_

_[tool: ready_for_verification]_

Pemeriksaan sebelumnya gagal karena error jaringan, bukan masalah di halaman — sudah saya jalankan ulang.

## User

lakukan perbaikan

## Assistant

_[tool: list_files]_

Design system kosong — bahasa visual Ecovis yang ada tetap dipakai. Mengerjakan P0-3, P0-4, P0-5 + quick wins.

_[tool: update_todos]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: grep]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: run_script]_

## Assistant

_[tool: run_script]_

Menandai temuan yang sudah dikerjakan di laporan evaluasi.

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Perbaikan yang sudah diterapkan:

**Formulir (10 halaman)** — label tetap di atas setiap input, placeholder jadi contoh isian, checkbox persetujuan UU PDP dengan tautan Kebijakan Privasi, tombol kirim terkunci sampai persetujuan dicentang, dan janji "kami membalas dalam 1 hari kerja". Berlaku di 9 halaman layanan, Resources, dan langkah 3 wizard Contact.

**Aksesibilitas** — 40 penggantian warna teks agar lolos WCAG AA, skip-link ke `#main` di 22 halaman, `aria-expanded`/`aria-haspopup` pada menu dropdown dan tombol burger, tutup dropdown & drawer dengan Escape, fokus kembali ke tombol menu saat drawer ditutup.

**Kepercayaan** — footer kini memuat izin per entitas, keanggotaan IAPI/IKPI/MAPPI, jam operasional, telepon yang bisa diklik, dan WhatsApp; statistik di Home diberi baris sumber dan tanggal tinjau.

Dua hal perlu Anda isi: nomor izin di footer masih `[nomor izin]`, dan nomor WhatsApp masih `wa.me/6281XXXXXXXX`. Sisanya (foto, studi kasus, halaman industri, rute /en–/id) menunggu aset atau keputusan Anda.

