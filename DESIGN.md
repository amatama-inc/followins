# Followins: Design Document (DESIGN.md)

## 1. Visi Produk
Followins adalah alat pelacak pengikut Instagram yang 100% berbasis privasi (Client-Side) dan menggunakan file ekspor resmi Instagram (.zip) untuk akurasi mutlak tanpa perlu login akun.

## 2. Tema Visual (UI/UX)
- **Tema Utama:** Dukungan Dual Theme (Light & Dark Mode) via setelan lokal `ThemeContext`. Desainnya mengusung sentuhan minimalis, bayangan halus (soft shadow), dan *whitespace* yang lega layaknya aplikasi premium modern.
- **Warna Aksen:** Palet elegan berbasis `Zinc` (abu-abu gelap) untuk kerangka utama, dikombinasikan dengan aksen warna solid (Emerald, Amber, Blue, Pink) untuk tombol dan indikator status.
- **Tipografi Fluid:** *Inter* atau *Geist* (Modern, bersih, mudah dibaca) didukung oleh sistem **Fluid Typography** (menggunakan fungsi CSS `clamp()`) di `globals.css`. Ini memastikan teks dapat membesar/mengecil secara otomatis dan proporsional mengikuti lebar layar pengguna tanpa pergeseran tata letak (*layout shift*) yang mengganggu.
- **Animasi & Interaksi Tingkat Lanjut:** Menggunakan library **Framer Motion** untuk menyajikan *micro-animations* dan efek transisi UI yang kompleks. Komponen *Landing Page* kini dibekali fitur kelas atas: *Infinite Scrolling Marquee* dengan kemampuan *Drag-to-Scroll* pada area Fitur Utama, dan *Auto-Cycling Accordion* di area Privasi yang akan membuka-tutup sendiri layaknya *slideshow* otomatis hingga diinterupsi oleh pengguna. Ini meningkatkan retensi visual secara drastis.
- **Mobile Optimization:** Antarmuka dioptimalkan secara khusus untuk perangkat seluler. Contohnya: grafik batang *Growth Chart* berubah bentuk secara adaptif (*stacked* di *mobile*, *grouped* di laptop), penambahan tombol *Floating Action Button* (FAB) bantuan/tutorial melayang khusus di layar kecil, serta penyembunyian navigasi *Header* (*Clean Header*) saat masuk ke mode *Dashboard* agar ruang layar ponsel lebih lega.
- **Aset Visual & Branding:** Penggunaan gambar latar estetik (`cloud-bg.jpg`, `3d-zip.jpg`) dan pola grid CSS generatif (`linear-gradient`) untuk memberikan kesan 3D dan kedalaman (*depth*) pada area *hero* dan kartu fitur. Identitas merek diperkuat melalui injeksi `logo.png` secara konsisten pada `Header.tsx`, `Footer.tsx`, dan generator ekspor `FollowinsReportPDF.tsx`, serta penyertaan *signature* atribusi "A PROJECT BY AMATAMA.INC" pada *footer*.

## 3. Komponen Utama & Halaman (Routes)
- **Komponen Global:**
  - **`Header.tsx`:** Bilah navigasi atas yang berisi Logo, tombol *Toggle Language* (ID/EN), dan tombol *Toggle Theme* (Light/Dark).
  - **`Footer.tsx`:** Bilah bawah berisi tautan *Privacy Policy*, *Terms of Service*, dan `EmailSupportLink.tsx`.
  - **`ChartContainer.tsx`:** Komponen pembungkus serbaguna untuk menstandarkan tampilan semua grafik (Growth, Cohort, dll) dengan judul dan deskripsi yang rapi.
  - **Contexts & Hooks:** `LanguageContext.tsx` untuk lokalisasi, `ThemeContext.tsx` untuk persistensi tema gelap/terang, dan `useUserFilter.ts` untuk abstraksi logika pencarian/penyortiran data tabel.
- **`/` (Landing Page):**
  - **Hero Section:** Penjelasan singkat yang persuasif.
  - **`Features.tsx` & `HowItWorks.tsx`:** Penjelasan nilai jual dan cara penggunaan alat secara visual.
  - **`FAQ.tsx` & `PrivacySection.tsx`:** Menjawab keraguan pengguna tentang keamanan (100% Client-Side) dan pertanyaan umum.
  - **`HistoryWidget.tsx`:** Menampilkan cuplikan hasil analisis sebelumnya yang tersimpan di memori lokal. Didesain dengan gaya UI "Terminal Hacker" (menggunakan grid generatif dan efek border glow) yang sangat serasi dengan animasi *loading*.
  - **`ZipUploader.tsx` & Live Demo:** Area Drag & Drop yang menerima file ZIP dari Instagram, dilengkapi dengan tombol *Live Demo* untuk melihat pratinjau data simulasi. Ekstraksi ZIP asli dilakukan via `JSZip` secara aman di memori browser. Juga dilengkapi fitur **Rate Limiting** cerdas berbasis `FingerprintJS` untuk membatasi 20 unggahan per perangkat dalam sebulan.
  - **`LoadingScreen.tsx`:** Animasi *loading* bergaya "Terminal Hacker" (menggunakan Framer Motion) yang memberikan *feedback* interaktif kepada pengguna selama proses *parsing* file besar.
- **`/dashboard` (Hasil Analisis):**
  - **`Account Mode Toggle (Public/Private)`:** Fitur baru (di sudut kanan atas *dashboard*) yang menyesuaikan secara dinamis terminologi UI dan fokus analitik berdasarkan jenis akun pengguna. (Contoh: label "Kutu Loncat" pada akun publik berubah menjadi "Mencurigakan" pada akun privat).
  - **`NewUnfollowersAlert.tsx`:** Notifikasi pintar yang mendeteksi unfollower baru dan akun "Kutu Loncat" (Hit & Run) dengan membandingkan data ZIP saat ini dengan hasil pemindaian sebelumnya dari LocalStorage. Terminologi didukung penuh oleh `accountMode`.
  - **`MetricCards.tsx` & `MutualStats.tsx`:** Menampilkan statistik metrik utama (Unfollowers, Fans, Mutual). Memiliki konsistensi ikonografi (*UserMinus*, *Heart*, *Users*) yang tersinkronisasi penuh dengan `HistoryWidget.tsx` untuk membentuk UX yang kohesif.
  - **`AccountHealthRatio.tsx`:** Indikator *gauge* (Framer Motion) untuk rasio perbandingan Followers vs Following guna mengukur tingkat kesehatan akun.
  - **`LoyalFollowers.tsx` & `PendingRequests.tsx`:** Menampilkan daftar pengikut yang bertahan paling lama dan daftar akun yang belum menerima permintaan *follow* Anda.
  - **Visualisasi Data (`Recharts`):**
    - **`GrowthChart.tsx`:** Grafik garis tren Follow/Unfollow.
    - **`RelationshipPieChart.tsx`:** Proporsi pengikut vs yang tidak mengikuti balik.
    - **`CohortChart.tsx`:** Retensi followers.
    - **`SeasonalityRadar.tsx`:** Aktivitas atau rasio followers berdasarkan tipe/waktu (mockup visualisai kompleks).
  - **`UserTable.tsx`:** Tabel canggih yang berfungsi sebagai Mini CRM. Fiturnya meliputi:
    - 3 Tab Utama: Unfollowers, Fans, dan **Mutuals** (Saling mengikuti).
    - Labeling/Tagging warna-warni pada tiap akun (`labelColors.ts`).
    - Bulk Actions untuk pelabelan massal.
    - Fungsi Pencarian (*Search*) dan Filter.
    - Penyortiran (terkunci Paywall untuk *Asc/Desc*).
    - **Sistem Pagination:** Membagi daftar panjang menjadi 20 item per halaman demi mengoptimalkan kecepatan render DOM.
    - Batasan klik profil (maks 100 profil unik/hari untuk versi gratis).
    - Sisa data disembunyikan menggunakan *Skeleton Dummy Data* (Anti-F12).
- **`PDFDownloadModal.tsx` & `FollowinsReportPDF.tsx`:**
  - Fitur untuk mengekspor hasil analisis menjadi dokumen cetak PDF yang bersih menggunakan `@react-pdf/renderer`. Pengguna premium dapat mengunduh seluruh data (ribuah akun), sedangkan versi gratis dibatasi 250 baris pertama. Proses pembuatan (*generate*) PDF sepenuhnya diamankan pada level *Client-Side*.
- **`AccountSwitcher.tsx`:** Antarmuka elegan di bilah navigasi (terintegrasi dengan IndexedDB) yang memungkinkan pengguna menyimpan dan beralih antar riwayat analisis banyak akun Instagram klien secara instan tanpa memuat ulang halaman (*seamless experience*).
- **`PaywallModal.tsx` & Rencana UI Pricing:**
  - Dirender menggunakan `createPortal` pada level tertinggi DOM. Muncul ketika pengguna ingin membuka batasan freemium untuk melihat seluruh akun.
  - Saat ini menampilkan simulasi UI pembayaran QRIS yang interaktif. Akan dikembangkan menjadi *Multi-Tier Pricing Section* untuk membandingkan Paket **Premium** (Rp 25.000, 1 Akun, Iklan Aktif) dan Paket **Premium+** (Rp 50.000, Lintas-Akun, Bebas Iklan/Ad-Free).
- **Halaman Legal Statis:** Menggunakan pembungkus `LegalPageLayout.tsx` untuk konsistensi desain UI.
  - **`/privacy`:** Halaman Kebijakan Privasi yang menegaskan komitmen pengolahan data secara lokal.
  - **`/terms`:** Halaman Syarat dan Ketentuan penggunaan layanan.

## 4. Tech Stack Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Framer Motion (Animasi)
- **Data Parser:** `JSZip`
- **Charts:** `Recharts`
- **PDF Generator:** `@react-pdf/renderer`
- **Device Fingerprinting:** `FingerprintJS`
- **Lokalisasi:** Context API (`LanguageContext.tsx` & `dictionaries.ts`)
- **State & Storage:** LocalStorage (`storage.ts`) & Custom XOR Cipher + Base64 (`crypto.ts`)
