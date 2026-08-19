# Followins: Implementation Plan (IMPLEMENTATION_PLAN.md)

Rencana eksekusi langkah demi langkah untuk membangun Minimum Viable Product (MVP) Followins.

## Tahap 1: Setup Proyek & Infrastruktur Dasar
- [x] Inisialisasi `create-next-app` dengan TypeScript dan Tailwind CSS.
- [x] Standardisasi Environment & Version Control: Tambahkan konfigurasi `.env.local`, `.env.example`, dan `.gitignore`.
- [x] Instal library tambahan: `jszip`, `recharts`, `lucide-react`, `framer-motion`.
- [x] Atur tema global (*light mode* by default) di `tailwind.config.ts`.

## Tahap 2: Core Logic (Pengolahan Data Client-Side)
- [x] Buat file utilitas `src/utils/instagramParser.ts`.
- [x] Tulis fungsi membaca Buffer ZIP menggunakan `JSZip` dan perluas parser untuk mendeteksi data tambahan (nama profil, riwayat permintaan *follow*, pengikut terlama).
- [x] Tulis logika **Fuzzy Search** untuk menemukan file bereksistensi `.json` yang mengandung kata `followers` dan `following` tanpa bergantung pada *path* folder yang kaku.
- [x] Tulis fungsi algoritma himpunan (Set) untuk mencari Unfollowers, Fans, dan Mutuals.

## Tahap 3: Halaman Upload & Dashboard UI
- [x] Buat komponen `ZipUploader.tsx` di halaman utama (Drag & Drop UI + Tombol khusus Mobile).
- [x] Hubungkan uploader dengan `instagramParser.ts`.
- [x] Tambahkan fitur "Live Demo" untuk menampilkan contoh hasil analisis tanpa perlu mengunggah file.
- [x] Peningkatan Landing Page: Tambahkan komponen informatif (`Features.tsx`, `HowItWorks.tsx`, `FAQ.tsx`, `PrivacySection.tsx`).
- [x] Tambahkan `HistoryWidget.tsx` untuk menampilkan riwayat upload terakhir dari `LocalStorage` agar pengguna tidak perlu memproses ulang data.
- **`/dashboard` (Hasil Analisis):**
- [x] Buat halaman `/dashboard` yang menerima hasil data JSON.
- [x] Peningkatan Dashboard Analytics: Tambahkan Toggle **Public/Private Mode** untuk mengubah gaya bahasa analitik, pendeteksi Unfollowers Baru & "Kutu Loncat" (berubah istilah menjadi "Mencurigakan" jika Private), daftar Pengikut Setia (Loyal Followers), Permintaan Menggantung (Pending Requests), dan Skor Kesehatan Akun (Account Health Ratio).
- [x] Implementasikan `MetricCards.tsx` (Jumlah followers/unfollowers).
- [x] Implementasikan `GrowthChart.tsx` dan fitur visualisasi lainnya (Cohort, Seasonality Radar, dll).
- [x] Implementasikan `UserTable.tsx` (Menampilkan maksimal 100 akun yang dipilih secara **acak** untuk versi gratis).
- [x] Peningkatan *UserTable* (Mini CRM): Tambahkan tab **Mutuals** (Saling Follow), fitur Label/Tagging akun berwarna, Bulk Actions, fungsi Pencarian (Search), dan Penyortiran (Sort).
- [x] Refaktor *Paywall*: Pindahkan logika pemotongan array (slice data) ke komponen induk (`page.tsx`) agar keamanan terjamin dan mempermudah render.
- [x] **Refaktorisasi & Clean Code:** Ekstraksi logika filter ke custom hook `useUserFilter.ts`, pecah komponen besar menjadi bagian modular (`UserListItem.tsx`, `ChartContainer.tsx`, `LegalPageLayout.tsx`).
- [x] **Fluid Typography & Responsive UI:** Terapkan fungsi `clamp()` di `globals.css` untuk memastikan ukuran teks beradaptasi secara mulus di berbagai perangkat tanpa *breakpoint* kaku, meningkatkan *Premium Feel*.
- [x] **Optimasi Performa (Pagination):** Terapkan Pagination pada `UserTable.tsx` (menampilkan 20 akun per halaman) untuk mencegah *lag* saat merender ribuan elemen DOM (*Performance Boost*).
- [x] **Animasi Interaktif (Framer Motion):** Mengintegrasikan `framer-motion` di `page.tsx` untuk menghadirkan efek transisi *fade-in* dan *scroll-triggered animations* pada hero banner dan komponen widget, menghidupkan antarmuka agar tidak statis.

## Tahap 4: Sistem Bisnis (Rate Limit & Paywall)
- [x] **Rate Limiting:** Integrasikan `FingerprintJS` untuk mendeteksi ID perangkat (*visitorId*) secara *client-side* dan berikan pembatasan maksimal 5 kali unggah ZIP per bulan per perangkat pada komponen `ZipUploader.tsx`.
- [x] Buat komponen `PaywallModal.tsx` dengan UI *mock-up* pembayaran QRIS.
- [x] **Keamanan Paywall (Anti-F12):** Terapkan pencegahan *Inspect Element* dengan hanya me-render 100 data acak terdekripsi ke DOM, dan sisanya digantikan dengan *Skeleton Dummy Data* hingga pembayaran berhasil. (Dilengkapi dengan enkripsi XOR Cipher + Base64 pada `crypto.ts`).
- [x] **Monetisasi Mikro:** Kunci fitur Sortir Abjad dan batasi klik tautan profil eksternal (maksimal 10 profil unik per hari) di dalam `UserTable` untuk pengguna gratis.

## Tahap 5: Standar Produksi (Keamanan, SEO & Support)
- [x] **Error Handling:** Tambahkan logika pengecekan ekstensi file (harus `.zip`) dan batas maksimal ukuran (100MB) pada `ZipUploader.tsx`.
- [x] **Legal & Support:** Buat komponen `Footer.tsx` dan halaman statis terpisah (`/terms`, `/privacy`) untuk *Privacy Policy*, *Terms of Service*, dan bantuan WhatsApp.
- [x] **Bilingual (i18n):** Siapkan dukungan dua bahasa (Indonesia/Inggris) untuk menjangkau pengguna global (`LanguageContext.tsx`).
- [x] **Dark Mode:** Terapkan dukungan tema Gelap/Terang via `ThemeContext.tsx`.
- [x] **Dukungan Bantuan:** Buat komponen `EmailSupportLink.tsx` terpusat untuk halaman Footer dan halaman Legal.
- [x] **Eksport Laporan PDF:** Mengintegrasikan `@react-pdf/renderer` untuk meng-generate dokumen analitik siap cetak secara *Client-Side*. Terdiri dari tabel data, grafik ringkasan, dan pilihan opsi jumlah unduhan data bagi *Free/Premium users*.
- [x] **Multi-Account Reset:** Tambahkan fungsi bersihkan *cache* untuk memungkinkan pengguna mengecek akun lain tanpa *reload* (diimplementasikan via `resetApp`).

## Tahap 6: Peta Jalan Masa Depan (Future Roadmap - Backlog)
*(Sinkronisasi dari PRD Bagian 4: Fitur ditunda untuk iterasi pasca-MVP)*

**Analitik & Manajemen:**
- [ ] Filter Rentang Waktu Kustom (Custom Date Range).
- [ ] Manajemen Multi-Akun (Cross-Account Dashboard).
- [ ] Detektor "Ghost Follower".
- [ ] "Super Fans" Leaderboard.

**Monetisasi & Bisnis:**
- [ ] Integrasi Payment Gateway Otomatis (Midtrans/Xendit).
- [ ] Sistem Premium Bertingkat (Multi-Tier Paywall).
- [ ] Lisensi Premium Lintas Akun (Cross-Account License).
- [ ] Ekspor Laporan PDF Profesional B2B (White-label Logo).
- [ ] Model Bisnis "Jual Putus" (One-Time Audit).
- [ ] Penempatan Iklan AdSense & Affiliate (Sticky Banner, In-Feed, Interstitial, Sidebar).

**Infrastruktur & Keamanan:**
- [ ] Strategi Deployment Ganda Paralel (Vercel untuk evaluasi, Cloudflare Pages untuk *Production*).
- [ ] Domain Bootstrapping ke `.app` & Manajemen DNS Cloudflare.
- [ ] Server-Side Rate Limiting via Cloudflare KV.
- [ ] Cloudflare Turnstile (Anti-Bot) di area upload ZIP.
- [ ] Otomatisasi CI/CD & GitHub Actions (Pemindaian Secrets & Build).
- [ ] Pengujian Keamanan & Kualitas (QA E2E via Playwright/Cypress).

**Distribusi & Distribusi:**
- [ ] Aplikasi Mobile (Android Native via Capacitor/React Native).
- [ ] PWA Support (Progressive Web App).
- [ ] Optimasi SEO & Open Graph (OG Tags).
- [ ] Homepage Teaser/Demo Interaktif.
- [ ] Sistem Tiket & Formulir Kontak dalam Aplikasi (In-App Support).
