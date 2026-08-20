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
- **Paywall "Bait":** Versi gratis yang membatasi tampilan hingga 100 akun pertama secara acak.
- **Rate Limiting Anti-Spam:** Membatasi unggahan ZIP maksimal 5x per bulan per perangkat (menggunakan *FingerprintJS*).
- **Dashboard Visual:** Grafik interaktif untuk visualisasi pertumbuhan (*Growth Chart*), demografi (*Cohort*), retensi pengikut, dan **Filter Rentang Waktu Kustom** (*Custom Date Range*).

---

## 4. Peta Jalan Pengembangan (Future Roadmap)

> [!NOTE] 
> **Status: Backlog (Direncanakan untuk Iterasi Mendatang)**
> Fitur-fitur dan strategi arsitektur di bawah ini merupakan bagian dari visi ekspansi jangka panjang produk. Implementasinya sengaja ditunda (*on-hold*) pada fase MVP saat ini agar kita dapat berfokus mematangkan stabilitas inti, perbaikan UI/UX dasar, dan peluncuran (*soft-launch*). Rencana-rencana ini akan dieksekusi secara bertahap pada pembaruan versi (v2.0) selanjutnya.

#### 4.1. Analitik Tingkat Lanjut & Manajemen
- **Manajemen Multi-Akun (Cross-Account Dashboard):** Kemampuan untuk menyimpan dan beralih secara instan antar riwayat analisis dari beberapa akun Instagram yang berbeda di satu perangkat tanpa harus mengunggah ulang *file* ZIP berulang kali (sangat berguna bagi Agensi/Manajer Sosial Media yang memegang banyak akun klien).
- **Detektor "Ghost Follower":** Menyilangkan (*cross-reference*) data pengikut dengan histori file *Likes* dan *Comments* di dalam ZIP untuk mendeteksi pengikut pasif yang tidak pernah berinteraksi.
- **Super Fans Leaderboard:** Memetakan 10 pengikut paling interaktif berdasarkan frekuensi *likes/comments*, yang sangat berguna untuk program *Giveaway*.

### 4.2. Monetisasi & Sistem Bisnis
- **Integrasi Payment Gateway Otomatis (QRIS):** Mengganti UI simulasi QRIS saat ini dengan API riil (seperti Midtrans atau Xendit) agar transaksi mikro untuk membuka batas *paywall* 100 nama tervalidasi secara instan tanpa tenaga admin.
- **Sistem Premium Bertingkat (Multi-Tier Paywall):** Memperluas skema monetisasi dari sistem satu harga menjadi paket berjenjang (*Tiering*). Misalnya: "Paket Dasar" (menampilkan setengah dari total nama) dan "Paket Penuh" (menampilkan seluruh daftar nama 100%).
- **Lisensi Premium Lintas Akun:** Menerapkan skema validasi premium berbasis sesi identitas pengguna (*Device/Browser*), bukan mengikat pada satu profil Instagram. Sehingga, manajer media sosial yang membeli lisensi Premium dapat menggunakannya untuk menembus *paywall* 5 akun klien yang berbeda tanpa harus membayar langganan terpisah per akun.
- **Ekspor Laporan PDF Profesional (White-label):** Generator laporan eksklusif berbentuk PDF/CSV yang memungkinkan Manajer Sosial Media (*Agensi B2B*) mengunggah logo perusahaan mereka sendiri di dokumen laporan.
- **Model Bisnis "Jual Putus" (One-Time Audit):** Skema pembayaran sekali transaksi (bukan langganan) bagi *influencer* yang hanya membutuhkan laporan mendalam secara periodik (misal: audit setiap 3 bulan).
- **Ruang Monetisasi Iklan (Google AdSense & Affiliate):** Memanfaatkan efisiensi biaya server (*Client-Side*) dengan menyisipkan slot iklan yang **tidak mengganggu** untuk meraup pendapatan pasif dari lalu lintas pengguna gratis. Rencana titik penempatan (Ad Placements):
  - **Sticky Banner Bawah (Mobile Friendly):** Iklan *banner* horizontal yang menempel statis di bagian bawah layar perangkat seluler.
  - **In-Feed Ads (Di Sela Tabel CRM):** Iklan *native* yang membaur secara estetik di antara daftar baris akun "Kutu Loncat" atau "Super Fans" agar tidak terlihat seperti iklan *spam*.
  - **Loading Screen Interstitial:** Iklan *Display* besar yang muncul hanya selama beberapa detik ketika sistem JSZip sedang mengekstrak dan memproses file ZIP (waktu tunggu krusial).
  - **Sidebar Kosong (Desktop):** Pemanfaatan ruang kosong di sisi kanan/kiri *dashboard* khusus untuk pengguna *desktop/PC*.

### 4.3. Infrastruktur, Keamanan, & Distribusi
- **Homepage Teaser/Demo Interaktif:** Memberikan animasi kisi-kisi atau simulasi interaktif (*teaser*) di halaman depan sebelum pengguna mengunggah ZIP, agar pengguna mendapat gambaran pasti tentang nilai fitur (*Unfollower* dan Kutu Loncat) yang akan mereka dapatkan, sehingga meningkatkan tingkat konversi unggahan.
- **Sistem Tiket & Formulir Kontak (In-App Support):** Mengganti tautan `mailto:` saat ini dengan sistem formulir pesan bawaan (*built-in*) agar pengguna tidak dipaksa membuka aplikasi *email* eksternal (seperti Outlook/Mail) saat ingin meminta bantuan atau melaporkan *bug*.
- **Pengujian Keamanan & Kualitas (QA E2E):** Pengembangan infrastruktur skrip uji otomatis *End-to-End* (*Playwright*/*Cypress*) untuk mensimulasikan seluruh alur kerja aplikasi demi menjamin keandalan pembaruan fitur, serta audit penetrasi mandiri untuk menutup celah dari pengguna yang ingin mem-*bypass paywall*.
- **Otomatisasi CI/CD & GitHub Actions:** Menerapkan jalur integrasi berkelanjutan yang secara otomatis memindai kebocoran kunci rahasia (*secrets*) dan mencegah kerusakan *build* sebelum kode disebarkan secara publik ke tahap produksi.
- **Strategi Deployment Ganda (Vercel & Cloudflare Pages):** Menjalankan arsitektur peluncuran paralel untuk membandingkan performa *build*, ekosistem *Edge Network*, dan batasan fungsi. Vercel akan diuji coba sebagai target *deploy* pertama (*staging*/evaluasi), dan Cloudflare Pages sebagai target *deploy* kedua (untuk menangani *traffic production* tanpa limitasi komersial AdSense/Paywall).
- **Server-Side Rate Limiting via Cloudflare KV:** Meng-upgrade keamanan anti-spam yang tadinya mengandalkan *Browser LocalStorage/FingerprintJS* menjadi sistem basis data Cloudflare KV (menggantikan rencana awal Vercel KV). Ini menambal kelemahan versi gratis di mana *user* nakal mencoba mereset limit dengan membersihkan *cache* browser, tanpa membebani biaya tambahan (Gratis hingga 100.000 *read requests* per hari).
- **Domain Bootstrapping & Cloudflare:** Peluncuran tahap awal menggunakan domain hemat biaya (`.my.id`) sebelum ditingkatkan ke domain premium (`.app`), dikombinasikan dengan manajemen DNS dan proteksi DDoS dari Cloudflare.
- **Cloudflare Turnstile (Anti-Bot):** Implementasi tantangan transparan pengganti CAPTCHA di area unggah file untuk mencegah skrip robot menguras limit aplikasi.
- **Aplikasi Mobile (Android Native):** Membungkus atau memigrasikan web Next.js ke platform *mobile* menggunakan *framework* seperti Capacitor atau React Native agar aplikasi Followins dapat didistribusikan dan diunduh langsung melalui Google Play Store.
- **PWA (Progressive Web App):** Konfigurasi *manifest* yang mengizinkan web untuk diinstal langsung ke *Home Screen* perangkat seluler iOS dan Android, melewati kerumitan persetujuan *App Store/Play Store*.
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
