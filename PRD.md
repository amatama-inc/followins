# Product Requirements Document (PRD) - Followins

## 1. Visi Produk
Followins adalah alat analitik Instagram berbasis web yang mengutamakan privasi (privacy-first). Berbeda dengan aplikasi analitik tradisional yang meminta *username* dan *password* Instagram, Followins beroperasi 100% di perangkat pengguna (*Client-Side*) dengan membaca file ekstraksi ZIP resmi dari Instagram. Hal ini menjamin keamanan akun pengguna dari risiko peretasan atau pemblokiran sistem.

## 2. Target Pengguna
- **Pengguna Kasual:** Individu yang penasaran siapa yang tidak melakukan *follow-back* (Kutu Loncat).
- **Kreator Konten / Influencer:** Membutuhkan data pertumbuhan (growth) dan data loyalitas pengikut untuk meningkatkan *Engagement Rate*.
- **Social Media Manager (Agensi B2B):** Membutuhkan ekspor laporan rapi untuk diserahkan kepada klien.

## 3. Fitur Inti (MVP - Telah Diimplementasikan)
- **Ekstraksi Client-Side (JSZip):** Pemrosesan data yang 100% aman di browser tanpa melibatkan server.
- **Sistem CRM Mini:** Kemampuan melabeli akun (Teman, Abaikan, dll) dan melakukan pencarian.
- **Manajemen Multi-Akun (*Cross-Account*):** Beralih profil akun secara instan tanpa perlu re-upload file ZIP, diotaki oleh sistem *IndexedDB* lokal.
- **Paywall "Bait":** Versi gratis yang membatasi tampilan hingga 250 akun pertama secara acak.
- **Rate Limiting Anti-Spam:** Membatasi unggahan ZIP maksimal 20x per bulan per perangkat (menggunakan *FingerprintJS*).
- **Dashboard Visual:** Grafik interaktif untuk visualisasi pertumbuhan (*Growth Chart*), demografi (*Cohort*), retensi pengikut, dan **Filter Rentang Waktu Kustom** (*Custom Date Range*).
- **Infrastruktur Iklan Pasif:** *Mockup layouting* Iklan Google AdSense/Affiliate pada posisi strategis (*Sticky Banner*, *In-Feed*, *Interstitial*, *Sidebar*).
- **Sistem Anti-AdBlocker:** Detektor *ad-block* cerdas untuk memohon *whitelist* atau meminta donasi kompensasi secara persuasif.

---

## 4. Peta Jalan Pengembangan (Future Roadmap)

> [!NOTE] 
> **Status: Backlog (Direncanakan untuk Iterasi Mendatang)**
> Fitur-fitur dan strategi arsitektur di bawah ini merupakan bagian dari visi ekspansi jangka panjang produk. Implementasinya sengaja ditunda (*on-hold*) pada fase MVP saat ini agar kita dapat berfokus mematangkan stabilitas inti, perbaikan UI/UX dasar, dan peluncuran (*soft-launch*). Rencana-rencana ini akan dieksekusi secara bertahap pada pembaruan versi (v2.0) selanjutnya.

#### 4.1. Analitik Tingkat Lanjut & Manajemen
- **Detektor "Ghost Follower":** Menyilangkan (*cross-reference*) data pengikut dengan histori file *Likes* dan *Comments* di dalam ZIP untuk mendeteksi pengikut pasif yang tidak pernah berinteraksi.
- **Super Fans Leaderboard:** Memetakan 10 pengikut paling interaktif berdasarkan frekuensi *likes/comments*, yang sangat berguna untuk program *Giveaway*.

### 4.2. Monetisasi & Sistem Bisnis
- **Integrasi Payment Gateway Otomatis (QRIS):** Mengganti UI simulasi QRIS saat ini dengan API riil (seperti Midtrans atau Xendit) agar transaksi mikro untuk membuka batas *paywall* 250 nama tervalidasi secara instan tanpa tenaga admin.
- **Sistem Monetisasi 2 Pilihan:**
  - **Paket "Premium" (Rp 15.000):**
    - Menembus *paywall* dan membuka 100% data untuk akun Instagram yang sedang dianalisis saat itu.
- **Sistem Premium Bertingkat (Multi-Tier Paywall) & UI Pricing Section:** Memperluas skema monetisasi dari sistem satu harga menjadi paket berjenjang (*Tiering*). Membangun komponen **Section Harga (Pricing/Packages)** yang menampilkan perbandingan fitur antara "Paket Dasar" (menampilkan sebagian nama) dan "Paket Penuh" (seluruh daftar 100%), serta opsi audit "Jual Putus".
- **Lisensi Premium Lintas Akun & Sistem Kode Akses (License Key):** Menerapkan skema validasi premium menggunakan **Kode Lisensi Unik** (tanpa sistem *Login/Password* demi menjaga arsitektur *Privacy-First*). 
  - Pengguna yang membeli lisensi dapat menggunakan kode tersebut untuk menembus *paywall* pada banyak file akun Instagram (*Cross-Account*) tanpa membayar langganan terpisah.
  - **Dukungan Multi-Device:** Kode lisensi dapat dimasukkan di perangkat lain (misal dari PC ke *Smartphone*), mengizinkan pengguna menikmati fitur premium di gawai yang berbeda.
  - **Anti-Pembajakan (Device Limit):** Tervalidasi melalui Cloudflare KV, satu kode lisensi hanya diizinkan aktif maksimal pada 2-3 ID perangkat unik secara bersamaan untuk mencegah penyalahgunaan berbagi lisensi (*account sharing*) di internet.
- **Paket "Premium" (Rp 15.000):**
  - Menembus *paywall* dan membuka 100% data untuk akun Instagram yang sedang dianalisis saat itu.
  - **Akses Berulang Terbatas:** Pengguna tetap dapat menutup browser atau mengunggah file ZIP baru di kemudian hari *tanpa* harus membayar ulang, **dengan syarat mutlak:** file ZIP tersebut harus dari **username Instagram yang sama** dan diunggah dari **perangkat (device) yang sama** saat pembelian dilakukan.
  - Jika pengguna mencoba mengakses dari perangkat lain (meskipun username-nya sama), atau mengunggah ZIP dari username berbeda di perangkat awal, sistem akan memblokir dan mereka harus membayar Rp 15.000 lagi. Opsi ini **tidak** memberikan kode lisensi.
- **Paket "Premium+" (Rp 50.000):**
  - Pengguna mendapatkan **Kode Lisensi Unik** (tanpa sistem *Login/Password*).
  - **Masa Aktif:** Lisensi berlaku selama **1 tahun** penuh sejak pembelian.
  - **Kebebasan Penuh (*Cross-Account* & *Cross-Device*):** Berbeda dengan paket biasa, pengguna Premium+ dapat login/memasukkan kode di perangkat lain dan bebas mengunggah file ZIP dari **username Instagram mana saja** (tidak dikunci ke satu username tertentu). Sangat cocok untuk pengguna multi-akun atau Agensi B2B.
  - **Batas Perangkat (Device Limit):** Divalidasi melalui Cloudflare KV, satu kode lisensi hanya diizinkan aktif maksimal pada **1 ID perangkat unik** secara bersamaan. Jika lisensi dipakai di perangkat baru, sesi di perangkat lama otomatis akan ditendang/dicabut.
- **Ekspor Laporan PDF Profesional (White-label):** Generator laporan eksklusif berbentuk PDF/CSV yang memungkinkan Manajer Sosial Media (*Agensi B2B*) mengunggah logo perusahaan mereka sendiri di dokumen laporan.
- **Model Bisnis "Jual Putus" (One-Time Audit):** Skema pembayaran sekali transaksi (bukan langganan) bagi *influencer* yang hanya membutuhkan laporan mendalam secara periodik (misal: audit setiap 3 bulan).

#### 4.2.1. SOP Solusi Kebuntuan (*Fallback Resolution*)
Jika di masa depan skema Cloudflare KV terbentur oleh batasan teknis (misal: kebijakan baru Cloudflare, batas API *rate-limit* terlampaui saat web viral, atau pengguna lupa mencatat Kode Lisensi/ID Transaksi), maka model bisnis tidak boleh runtuh. Berikut adalah 3 lapis SOP cadangan untuk memastikan pelanggan yang telah membayar tidak merasa tertipu:
  1. **Tombol "Pulihkan Pembelian" (Restore Purchase):** Menyediakan tombol darurat yang memicu pelacakan ulang berbasis riwayat transaksi *Local Storage* terdahulu sebagai bukti pembayaran sementara.
  2. **Validasi Resi/ID Transaksi QRIS:** Meminta pengguna memasukkan 6 digit terakhir nomor referensi QRIS/Midtrans dari aplikasi m-Banking/GoPay mereka ke dalam *form* khusus untuk melacak ulang pembelian.
  3. **SOP Kompensasi Admin (*Customer Delight*):** Jika sistem di atas gagal (pengguna ganti HP dan lupa ID Transaksi) lalu menghubungi *Support*, admin cukup meminta bukti transfer QRIS. SOP utamanya adalah admin langsung membagikan 1 **Kode Lisensi Premium+ (Rp 50.000) secara gratis** sebagai bentuk kompensasi (karena biaya produksinya Rp 0). Ini dirancang untuk mengubah kekecewaan pelanggan menjadi kepuasan ekstrem yang memicu promosi gratis dari mulut ke mulut (*Word of Mouth*).

### 4.3. Infrastruktur, Keamanan, & Distribusi
- **Homepage Teaser/Demo Interaktif:** Memberikan animasi kisi-kisi atau simulasi interaktif (*teaser*) di halaman depan sebelum pengguna mengunggah ZIP, agar pengguna mendapat gambaran pasti tentang nilai fitur (*Unfollower* dan Kutu Loncat) yang akan mereka dapatkan, sehingga meningkatkan tingkat konversi unggahan.
- **Sistem Tiket & Formulir Kontak (In-App Support):** Mengganti tautan `mailto:` saat ini dengan sistem formulir pesan bawaan (*built-in*) agar pengguna tidak dipaksa membuka aplikasi *email* eksternal (seperti Outlook/Mail) saat ingin meminta bantuan atau melaporkan *bug*.
- **Pengaturan Email Domain Khusus:** Mengonfigurasi *Cloudflare Email Routing* (gratis) atau Zoho Mail untuk menerima dan membalas surel secara profesional menggunakan alamat domain bisnis (contoh: `support@followins.app`), menggantikan penggunaan email pribadi.
- **Pengujian Keamanan & Kualitas (QA E2E):** Pengembangan infrastruktur skrip uji otomatis *End-to-End* (*Playwright*/*Cypress*) untuk mensimulasikan seluruh alur kerja aplikasi demi menjamin keandalan pembaruan fitur, serta audit penetrasi mandiri untuk menutup celah dari pengguna yang ingin mem-*bypass paywall*.
- **Otomatisasi CI/CD & GitHub Actions:** Menerapkan jalur integrasi berkelanjutan yang secara otomatis memindai kebocoran kunci rahasia (*secrets*) dan mencegah kerusakan *build* sebelum kode disebarkan secara publik ke tahap produksi.
- **Strategi Deployment Ganda (Vercel & Cloudflare Pages):** Menjalankan arsitektur peluncuran paralel untuk membandingkan performa *build*, ekosistem *Edge Network*, dan batasan fungsi. Vercel akan diuji coba sebagai target *deploy* pertama (*staging*/evaluasi), dan Cloudflare Pages sebagai target *deploy* kedua (untuk menangani *traffic production* tanpa limitasi komersial AdSense/Paywall).
- **Server-Side Rate Limiting via Cloudflare KV:** Meng-upgrade keamanan anti-spam yang tadinya mengandalkan *Browser LocalStorage/FingerprintJS* menjadi sistem basis data Cloudflare KV (menggantikan rencana awal Vercel KV). Ini menambal kelemahan versi gratis di mana *user* nakal mencoba mereset limit dengan membersihkan *cache* browser, tanpa membebani biaya tambahan (Gratis hingga 100.000 *read requests* per hari).
- **Domain Bootstrapping & Cloudflare:** Peluncuran tahap awal menggunakan domain hemat biaya (`.my.id`) sebelum ditingkatkan ke domain premium (`.app`), dikombinasikan dengan manajemen DNS dan proteksi DDoS dari Cloudflare.
- **Cloudflare Turnstile (Anti-Bot):** Implementasi tantangan transparan pengganti CAPTCHA di area unggah file untuk mencegah skrip robot menguras limit aplikasi.
- **Aplikasi Mobile (Android Native):** Membungkus atau memigrasikan web Next.js ke platform *mobile* menggunakan *framework* seperti Capacitor atau React Native agar aplikasi Followins dapat didistribusikan dan diunduh langsung melalui Google Play Store.
- **PWA (Progressive Web App) & Push Notifications:** Konfigurasi *manifest* yang mengizinkan web diinstal ke *Home Screen* (iOS & Android). Memanfaatkan *Service Workers* untuk mengirimkan **Local Push Notification** sebagai pengingat otomatis (contoh: *"Sudah 1 bulan! Yuk periksa ulang siapa yang unfollow kamu"*), tanpa memerlukan *server backend* (Firebase/OneSignal).
- **Optimasi SEO & Open Graph (OG Tags):** Injeksi meta tags dinamis (*thumbnail* khusus) agar tautan Followins terlihat premium dan meyakinkan saat dibagikan di platform media sosial seperti WhatsApp atau X (Twitter).

### 4.4. Proyeksi & Strategi Pendapatan Iklan

Sebagai pelengkap poin monetisasi iklan, arsitektur Followins memiliki **keunggulan strategis** yang tidak dimiliki web pada umumnya, yang dapat melipatgandakan potensi pendapatan iklan (misalnya Google AdSense):

1. **Waktu Singgah Tinggi (High Session Duration):** Pengguna menghabiskan banyak waktu menunggu ekstraksi ZIP (JSZip) dan mengeksplorasi *dashboard* analitik. Durasi singgah yang lama ini memungkinkan unit iklan melakukan *auto-refresh* (pergantian otomatis tanpa *reload* halaman), meningkatkan *Ad Impressions* berlipat ganda dari satu pengunjung.
2. **Biaya Server Nihil (Zero Cost = Pure Profit):** Karena seluruh proses komputasi ekstraksi data berjalan 100% *Client-Side* di peramban (*browser*) pengguna, lonjakan *traffic* jutaan pengunjung tidak akan menambah beban tagihan server bulanan. Pendapatan iklan adalah 100% laba bersih (dikurangi pajak/fee layanan pihak ketiga).
3. **Potensi Arbitrase Internasional (Tier 1 Traffic):** Mengakomodasi translasi bahasa Inggris dapat mendatangkan lalu lintas dari negara-negara Tier 1 (AS, Inggris, Eropa) dengan nilai RPM (Revenue Per Mille) yang secara signifikan lebih tinggi ($10 - $25 per 1.000 tayangan) dibandingkan *traffic* lokal.

#### Simulasi Pendapatan Iklan Bulanan (Traffic Indonesia)
*(Berdasarkan estimasi moderat RPM Indonesia di Niche Teknologi/Media Sosial: Rp 15.000 - Rp 45.000 atau $1 - $3 per 1.000 Pageviews).*

- **Fase Rintisan (10.000 pageviews/bulan):** Est. ~Rp 150.000 - Rp 450.000
- **Fase Menengah (100.000 pageviews/bulan):** Est. ~Rp 1.500.000 - Rp 4.500.000
- **Fase Skala Besar / Viral (1.000.000 pageviews/bulan):** Est. ~Rp 15.000.000 - Rp 45.000.000
