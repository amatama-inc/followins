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
- **Server-Side Rate Limiting:** Keamanan tingkat *Edge* (menggunakan *Cloudflare KV*) untuk mencegah serangan *spam/bot* pada rute aplikasi dengan batas 60 request/menit.
- **Cloudflare Turnstile (Anti-Bot):** Validasi pengunjung *real human* secara otomatis di area gerbang *Upload* (*Client-Side* & *Server Actions*) untuk menghadang robot peretas tanpa merusak *User Experience* (pengganti reCAPTCHA).
- **QA Automation & CI/CD Pipeline:** Uji keamanan dan kualitas *End-to-End* menggunakan **Playwright**, serta pemindaian kebocoran kunci rahasia (*Secret Scanning* via *Gitleaks*) yang otomatis berjalan pada **GitHub Actions** setiap kali kode dikirim ke repositori.
- **Distribusi Multi-Platform (PWA & Android Native):** Aplikasi tidak hanya berjalan di web, tetapi dapat diinstal ke *Homescreen* (PWA) lengkap dengan dukungan *Service Worker* dan notifikasi lokal, serta dibungkus menjadi aplikasi **Android Native** mandiri melalui *Capacitor* untuk distribusi di Google Play Store.
- **Optimasi Konversi & SEO:** Implementasi *Sitemap.xml* dan *Robots.txt* dinamis untuk mendongkrak visibilitas organik dan dominasi mesin pencari Google.
- **In-App Support & Email Routing (Resend):** Mengganti tautan `mailto:` tradisional dengan komponen `ContactSupportModal` *(Built-in)*, yang terhubung ke Next.js Server Actions dan API Resend untuk mengirimkan *support ticket* langsung ke *inbox* admin tanpa meninggalkan aplikasi.
- **Multi-Tier Pricing UI:** Membangun *Pricing Section* responsif untuk membandingkan opsi monetisasi (Paket Premium Rp 25.000 vs Premium+ Rp 50.000) dengan simulasi *Paywall Modal* yang intuitif untuk mengunci fungsi sortir dan tampilan nama lengkap.

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
  - **Paket "Premium" (Rp 25.000):**
    - Menembus *paywall* dan membuka 100% data untuk akun Instagram yang sedang dianalisis saat itu. **(Catatan: Iklan akan tetap tampil di paket ini).**
    - **Akses Berulang Terbatas:** Pengguna tetap dapat menutup browser atau mengunggah file ZIP baru di kemudian hari *tanpa* harus membayar ulang, **dengan syarat mutlak:** file ZIP tersebut harus dari **username Instagram yang sama** dan diunggah dari **perangkat (device) yang sama** saat pembelian dilakukan.
    - Jika pengguna mencoba mengakses dari perangkat lain (meskipun username-nya sama), atau mengunggah ZIP dari username berbeda di perangkat awal, sistem akan memblokir dan mereka harus membayar Rp 25.000 lagi. Opsi ini **tidak** memberikan kode lisensi.
  - **Paket "Premium+" (Rp 50.000):**
    - Pengguna mendapatkan **Kode Lisensi Unik** (tanpa sistem *Login/Password*).
    - **Bebas Iklan (Ad-Free):** Seluruh slot iklan (Banner, In-Feed, Interstitial) dihilangkan 100% demi kenyamanan dan kesan profesional.
    - **Masa Aktif:** Lisensi berlaku selama **1 tahun** penuh sejak pembelian.
    - **Kebebasan Penuh (*Cross-Account* & *Cross-Device*):** Berbeda dengan paket biasa, pengguna Premium+ dapat login/memasukkan kode di perangkat lain dan bebas mengunggah file ZIP dari **username Instagram mana saja** (tidak dikunci ke satu username tertentu). Sangat cocok untuk pengguna multi-akun atau Agensi B2B.
    - **Batas Perangkat (Device Limit):** Divalidasi melalui Cloudflare KV, satu kode lisensi hanya diizinkan aktif maksimal pada **1 ID perangkat unik** secara bersamaan. Jika lisensi dipakai di perangkat baru, sesi di perangkat lama otomatis akan ditendang/dicabut.
- **Lisensi Premium Lintas Akun & Sistem Kode Akses (License Key):** Menerapkan skema validasi premium menggunakan **Kode Lisensi Unik** (tanpa sistem *Login/Password* demi menjaga arsitektur *Privacy-First*). 
  - Pengguna yang membeli lisensi dapat menggunakan kode tersebut untuk menembus *paywall* pada banyak file akun Instagram (*Cross-Account*) tanpa membayar langganan terpisah.
  - **Dukungan Multi-Device:** Kode lisensi dapat dimasukkan di perangkat lain (misal dari PC ke *Smartphone*), mengizinkan pengguna menikmati fitur premium di gawai yang berbeda.
  - **Anti-Pembajakan (Device Limit):** Tervalidasi melalui Cloudflare KV, satu kode lisensi hanya diizinkan aktif maksimal pada 2-3 ID perangkat unik secara bersamaan untuk mencegah penyalahgunaan berbagi lisensi (*account sharing*) di internet.
- **Ekspor Laporan PDF Profesional (White-label):** Generator laporan eksklusif berbentuk PDF/CSV yang memungkinkan Manajer Sosial Media (*Agensi B2B*) mengunggah logo perusahaan mereka sendiri di dokumen laporan.
- **Model Bisnis "Jual Putus" (One-Time Audit):** Skema pembayaran sekali transaksi (bukan langganan) bagi *influencer* yang hanya membutuhkan laporan mendalam secara periodik (misal: audit setiap 3 bulan).

#### 4.2.1. SOP Solusi Kebuntuan (*Fallback Resolution*)
Jika di masa depan skema Cloudflare KV terbentur oleh batasan teknis (misal: kebijakan baru Cloudflare, batas API *rate-limit* terlampaui saat web viral, atau pengguna lupa mencatat Kode Lisensi/ID Transaksi), maka model bisnis tidak boleh runtuh. Berikut adalah 3 lapis SOP cadangan untuk memastikan pelanggan yang telah membayar tidak merasa tertipu:
  1. **Tombol "Pulihkan Pembelian" (Restore Purchase):** Menyediakan tombol darurat yang memicu pelacakan ulang berbasis riwayat transaksi *Local Storage* terdahulu sebagai bukti pembayaran sementara.
  2. **Validasi Resi/ID Transaksi QRIS:** Meminta pengguna memasukkan 6 digit terakhir nomor referensi QRIS/Midtrans dari aplikasi m-Banking/GoPay mereka ke dalam *form* khusus untuk melacak ulang pembelian.
  3. **SOP Kompensasi Admin (*Customer Delight*):** Jika sistem di atas gagal (pengguna ganti HP dan lupa ID Transaksi) lalu menghubungi *Support*, admin cukup meminta bukti transfer QRIS. SOP utamanya adalah admin langsung membagikan 1 **Kode Lisensi Premium+ (Rp 50.000) secara gratis** sebagai bentuk kompensasi (karena biaya produksinya Rp 0). Ini dirancang untuk mengubah kekecewaan pelanggan menjadi kepuasan ekstrem yang memicu promosi gratis dari mulut ke mulut (*Word of Mouth*).

### 4.3. Infrastruktur, Keamanan, & Distribusi
- **Pengaturan Email Domain Khusus:** Mengonfigurasi *Cloudflare Email Routing* (gratis) atau Zoho Mail untuk menerima dan membalas surel secara profesional menggunakan alamat domain bisnis (contoh: `support@followins.app`), menggantikan penggunaan email pribadi.
- **Otomatisasi Pemasaran Email:** Setup *mailing list* otomatis untuk mengirim rekap performa mingguan kepada pengguna setia atau *newsletter* tips organik Instagram (memanfaatkan integrasi Resend / Mailchimp).
- **Strategi Deployment Ganda (Vercel & Cloudflare Pages):** Menjalankan arsitektur peluncuran paralel untuk membandingkan performa *build*, ekosistem *Edge Network*, dan batasan fungsi. Vercel akan diuji coba sebagai target *deploy* pertama (*staging*/evaluasi), dan Cloudflare Pages sebagai target *deploy* kedua (untuk menangani *traffic production* tanpa limitasi komersial AdSense/Paywall).
- **Domain Bootstrapping & Cloudflare:** Peluncuran tahap awal menggunakan domain hemat biaya (`.my.id`) sebelum ditingkatkan ke domain premium (`.app`), dikombinasikan dengan manajemen DNS dan proteksi DDoS dari Cloudflare.

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
