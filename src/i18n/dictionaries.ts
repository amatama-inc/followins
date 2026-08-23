export const dictionaries = {
  id: {
    // page.tsx
    privacyBadge: "100% Client-Side Privacy",
    heroTitle1: "Lacak Siapa yang Unfollow Kamu,",
    heroTitle2: "Tanpa Login",
    heroDesc: "Caranya gampang, cukup Upload Zip data Instagrammu. Privasi terjamin aman karena data tidak pernah dikirim ke server.",
    summaryTitle: "Ringkasan Akunmu",
    summaryDesc: "Berdasarkan data yang tersimpan di perangkatmu.",
    checkAnotherBtn: "Cek File Lain",
    
    // ZipUploader.tsx
    uploadError: "Mohon unggah file berekstensi .zip dari ekstrak data Instagram.",
    uploadPrompt: "Klik atau Tarik file .zip Instagrammu ke sini",
    uploadDesc: "Datamu 100% aman. Seluruh proses perhitungan dilakukan langsung di HP/Komputermu. Tidak ada data yang dikirim ke server.",
    
    // Header
    langSwitch: "ID / EN",
    navHowItWorks: "Tutorial",
    navFeatures: "Fitur",
    navFaq: "FAQ",
    navUpload: "Coba Sekarang",

    // MetricCards.tsx
    unfollowersDesc: "Tidak Follback Kamu",
    fansDesc: "Tidak Kamu Follback / Fans",
    mutualsDesc: "Mutual / Saling Follow",

    // UserTable.tsx
    showing: "Menampilkan",
    from: "dari",
    accounts: "akun.",
    maxRandomFree: "Maks 100 Username Acak (Versi Gratis)",
    hiddenNames1: "Ada",
    hiddenNames2: "Akun yang Disembunyikan",
    hiddenDesc: "Untuk mencegah penyalahgunaan data, versi gratis hanya menampilkan 100 username <strong>secara acak</strong> (dilindungi sistem menggunakan Base64). <strong>Upgrade Premium</strong> untuk melihat seluruh data.",
    unlockAll: "Buka Semua Akses (Cuma Rp 15.000)",

    // Footer.tsx
    privacyPolicy: "Kebijakan Privasi",
    termsOfService: "Ketentuan Layanan",
    emailSupport: "Email Admin",
    footerText: "Followins. 100% Privasi Aman.",

    // LoadingScreen.tsx
    terminalTitle: "Terminal - Proses Analisis",
    loadingMsg0: "Membaca ZIP ke dalam memori browser...",
    loadingMsg1: "Memindai struktur direktori file...",
    loadingMsg2: "Mengekstrak data list jaringan (string_list_data)...",
    loadingMsg3: "Melakukan dekripsi format JSON Instagram...",
    loadingMsg4: "Menganalisis relasi followers dan following...",
    loadingMsg5: "Memfilter bot dan akun yang dinonaktifkan...",
    loadingMsg6: "Membangun algoritma Himpunan (Sets)...",
    loadingMsg7: "Mengkalkulasi irisan untuk Mutuals...",
    loadingMsg8: "Mencari selisih (Unfollowers dan Fans)...",
    loadingMsg9: "Mengurutkan kronologi riwayat follow...",
    loadingMsg10: "Menganalisis Kutu Loncat & Unfollowers Baru...",
    loadingMsg11: "Mengamankan data dengan enkripsi lokal...",
    loadingMsg12: "Memverifikasi integritas hasil analisis...",
    loadingMsg13: "Menyiapkan antarmuka Dashboard interaktif...",
    loadingMsg14: "Mengalokasikan memori untuk visualisasi grafik...",
    loadingMsg15: "Proses selesai! Menunggu konfirmasi Anda...",
    continueBtn: "Lanjutkan ke Dashboard",

    // MutualStats.tsx
    mutualStatsTitle: "Statistik \"Siapa yang Follow Duluan?\"",
    mutualStatsDesc1: "Dari total",
    mutualStatsDesc2: "data Mutualan berdasarkan waktu follow, ini hasilnya:",
    youFirst: "Kamu Follow Duluan",
    youFirstDesc: "Kasian, kamu menunggu follback mereka lebih dari 24 jam",
    themFirst: "Mereka Follow Duluan",
    themFirstDesc: "Tega banget kamu, mereka menunggu follback kamu lebih dari 24 jam",
    sameDay: "Saling Follow di Hari yang Sama",
    sameDayDesc: "Kalian temen sejati, saling follow dalam kurun waktu kurang dari 24 jam",

    // RelationshipPieChart.tsx
    relTitle: "Persentase Followers VS Following",
    relDesc: "Perbandingan Followers dan Following kamu, berdasarkan data Instagrammu.",
    relNotFollowBack: "Following (Unfollowers Kamu)",
    relMutual: "Mutual (Saling Follow)",
    relFans: "Followers (Fans Kamu)",

    // GrowthChart.tsx
    growthNoData: "Belum ada data",
    growthTitle: "Grafik Penambahan Followers & Following",
    growthDescMonthly: "Berikut adalah detail penambahan followers maupun following setiap bulan pada tahun ",
    growthDescYearly: "Berikut adalah detail penambahan followers maupun following dari tahun ke tahun",
    growthYear: "Tahun",
    growthPerMonth: "Per Bulan",
    growthPerYear: "Per Tahun",
    growthNewFollowers: "Followers Baru",
    growthNewFollowing: "Following Baru",

    // CohortChart.tsx
    cohortTitle: "Fans, Mutualan, dan Unfollower",
    cohortDesc: "Grafik ini mengelompokkan Mutualan, Fans, atau Unfollower. berdasarkan kapan dia mulai terhubung dengan kamu (entah saat mereka mulai follow kamu, atau kamu mulai follow mereka).",
    cohortMutuals: "Mutual",
    cohortFans: "Fans",
    cohortUnfollowers: "Unfollowers",
    cohortOlder: "Data Lama",
    cohortPage: "Halaman",
    cohortNewer: "Data Baru",

    // SeasonalityRadar.tsx
    seasonTitle: "Bulan yang ramai Followers",
    seasonDescAll: "Secara keseluruhan: Di bulan apa Anda paling banyak mendapat pengikut baru?",
    seasonDescYear: "Bulan apa yang paling ramai pengikut baru di tahun",
    seasonAllTime: "Semua Waktu",
    seasonTotalFollowers: "Total Followers Didapat",
    
    // LoyalFollowers.tsx
    loyalTitle: "Followers Paling Setia",
    loyalDesc: "Akun yang paling lama mengikuti Anda",

    // AccountHealthRatio.tsx
    healthTitle: "Rasio Kesehatan Akun",
    healthDesc: "Perbandingan Followers vs Following",
    healthGood: "Akunmu Populer & Sehat",
    healthBad: "Kamu Lebih Banyak Follow Orang",

    // PendingRequests.tsx
    pendingTitle: "Menunggu Persetujuan",
    pendingDesc: "Permintaan follow Anda yang belum di-ACC (akun di-Private)",

    months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],

    // How It Works
    howItWorksTitle: "Cara Menggunakan Followins",
    howItWorksDesc: "Hanya butuh 4 langkah mudah untuk mulai menganalisis akun instagrammu secara mendalam tanpa perlu membagikan username dan password.",
    step1Title: "1. Buka Pengaturan Instagram",
    step1Desc: "Buka aplikasi Instagram, masuk ke Profil > Pengaturan (Garis tiga) > Ketik 'unduh' di kolom pencarian. > pilih 'Unduh Informasi' > setelah itu tunggu sampai muncul 'buat permintaan eksport'.",
    step2Title: "2. Unduh Informasi Anda",
    step2Desc: "klik 'buat permintaan'. > Pilih 'eksport ke device'. > isikan customize dengan 'Followers and Following' saja > Pastikan Anda memilih format JSON (bukan HTML) dan rentang waktu 'Semua waktu' (All time). > terakhir klik 'mulai eksport'.",
    step3Title: "3. Tunggu Email dari Instagram",
    step3Desc: "Instagram akan memproses permintaan Anda. > Biasanya memakan waktu beberapa menit sampai beberapa jam tergantung jumlah data. > setelah selesai unduh filenya. > (jika kamu keluar dari aplikasi, nanti akan ada notifikasi di email, atau ulangi saja langkah nomer 1, ke pengaturan dan ketik 'unduh' lalu pilih 'unduh informasi').",
    step4Title: "4. Unggah File ZIP",
    step4Desc: "Unduh file ZIP dari email Instagram atau halaman unduhan informasi tadi > lalu unggah file zip tersebut langsung di sini > Hasil analitik interaktif dan opsi cetak PDF akan langsung muncul di layarmu!",

    // Features
    featuresTitle: "Kenapa Memilih Followins?",
    featuresDesc: "Analisis mendalam tanpa mengorbankan keamanan akunmu. tanpa harus login pastinya!",
    feat1Title: "Aman dari Banned",
    feat1Desc: "Karena tidak perlu login, akunmu 100% terhindar dari risiko diblokir atau di-*banned* oleh Instagram.",
    feat2Title: "Grafik Informatif",
    feat2Desc: "akan kami sajikan data yang lebih informatif dan interaktif melalui grafik yang mudah dipahami",
    feat3Title: "Super Cepat",
    feat3Desc: "Pemrosesan file jutaan baris data dapat diselesaikan dalam hitungan menit langsung di perangkatmu.",
    feat4Title: "Ekspor Laporan PDF",
    feat4Desc: "Cetak daftar nama dan statistik analisis ke dalam dokumen PDF yang profesional dan mudah dipahami.",
    feat5Title: "Filter & Pencarian Lanjut",
    feat5Desc: "Temukan akun tertentu dengan cepat melalui fitur pencarian, filter status, dan pengurutan cerdas.",
    feat6Title: "Riwayat Analisis Lokal",
    feat6Desc: "Bandingkan perubahan followers dari waktu ke waktu. Riwayat Anda tersimpan aman secara offline di browser device anda (selama belum dihapus atau reset browser).",

    // Privacy
    privacyTitle: "Privasi Pengguna Adalah Prioritas Utama",
    privacyDesc: "Kami tidak pernah menyimpan, mengintip, atau mengirim data Anda ke mana pun.",
    priv1Title: "100% Client-Side",
    priv1Desc: "Kode kami mengekstrak file ZIP dan menghasilkan laporan PDF murni menggunakan memori di browser Anda. Server kami tidak akan menerima atau menyimpan sepeser pun data Anda.",
    priv2Title: "Tidak Perlu Memasukkan Username atau Password",
    priv2Desc: "Banyak aplikasi pihak ketiga yang meminta login instagram. Kami tidak pernah memintanya, karena data kamu dapat diakses dengan menggunakan file zip yang telah di download dari instagram.",
    priv3Title: "Proses Dilakukan Secara Transparan",
    priv3Desc: "Anda bisa melihat sendiri bagaimana proses ekstraksi berjalan. Keamanan bukan hanya sekedar janji, tapi jaminan teknis yang bisa Anda lihat langsung.",

    // FAQ
    faqTitle: "Pertanyaan yang Sering Diajukan",
    faqDesc: "Punya pertanyaan? Mungkin sudah kami jawab di sini.",
    faqCatGeneral: "Umum & Harga",
    faqCatUsage: "Cara Pakai & Teknis",
    faqCatSecurity: "Keamanan & Data",
    q1: "Apakah aplikasi ini gratis?",
    a1: "Iya! Gratis! dan perlu kamu tahu, gratisnya itu premium juga lho... Fitur visualisasi, ringkasan akun, dan grafik 100% gratis. Untuk melihat daftar lengkap nama yang Unfollow dan mengekspor laporan ke PDF, kami membatasi fitur tersebut pada versi gratis dan menawarkan akses Premium (Sekali Bayar) untuk membuka seluruh data tanpa batas bukan hanya 100 username aja.",
    q2: "Berapa lama Instagram mengirim file ZIP saya?",
    a2: "Biasanya hanya memakan waktu 5-15 menit. Namun jika akun Anda memiliki puluhan ribu pengikut atau history yang panjang, bisa memakan waktu hingga beberapa jam.",
    q3: "Mengapa menggunakan format JSON dan bukan HTML?",
    a3: "Sistem Followins membaca data mentah (JSON) untuk menghasilkan perhitungan himpunan (sets) dengan akurasi 100% dan memvisualisasikannya menjadi grafik. Format HTML ditujukan hanya untuk dibaca manusia.",
    q4: "Apakah saya bisa menyimpan daftar nama tersebut ke PDF?",
    a4: "Tentu! Kami menyediakan fitur Ekspor PDF yang dapat menghasilkan dokumen laporan yang rapi dan profesional, lengkap dengan grafik statistik dan daftar nama. Proses pembuatan PDF juga berjalan 100% secara aman di perangkat Anda.",
    q5: "Apakah layanan Premium berupa sistem langganan bulanan?",
    a5: "Tidak. Kami menggunakan sistem bayar putus (One-Time Payment) untuk setiap sesi data 1 nama username saja, jika upload file username yang berbeda mohon untuk melakukan pembayaran lagi ya untuk support kami. Perlu diketahui kami tidak akan melakukan pemotongan atau tagihan otomatis ke akun pembayaran Anda di bulan-bulan berikutnya.",
    q6: "Apakah akun saya bisa diblokir (banned) oleh Instagram jika menggunakan aplikasi atau website ini?",
    a6: "Tidak. Followins 100% aman karena Anda tidak perlu memasukkan username atau password Instagram Anda di sini. Kami tidak berinteraksi dengan API Instagrammu. Sistem kami murni hanya membaca file data mentah Anda yang sudah diunduh secara offline dari perangkatmu sendiri.",
    q7: "Saya sudah mengunggah file ZIP-nya, tapi kenapa ada peringatan error atau data tidak ditemukan?",
    a7: "Pastikan saat meminta data dari Instagram, Anda memilih format JSON (bukan HTML). Selain itu, pastikan file yang Anda unggah masih dalam bentuk aslinya (berakhiran .zip), Anda tidak perlu mengekstrak atau meng-unzip atau mengganti nama file tersebut terlebih dahulu.",
    q8: "Apakah saya bisa menggunakan aplikasi ini di HP (Smartphone)?",
    a8: "Ya, tentu saja bisa! Anda dapat langsung mengunggah file ZIP melalui HP Anda. Namun, untuk pengalaman terbaik—terutama saat melihat grafik dan daftar yang berisi ribuan nama—kami merekomendasikan Anda membukanya menggunakan Komputer atau Laptop.",
    q9: "Mengapa jumlah followers di aplikasi ini sedikit berbeda dengan angka di profil Instagram saya?",
    a9: "Instagram seringkali memiliki jeda (delay) saat memproses file cadangan (backup) data Anda. Akun yang baru saja follow atau unfollow dalam beberapa jam sebelum Anda meminta data mungkin belum masuk ke dalam file ZIP. Selain itu, akun bot/spam yang telah dihapus atau ditangguhkan oleh Instagram biasanya otomatis tidak disertakan dalam file backup.",
    
    // History
    historyTitle: "Analisis akun instagrammu"
  },
  en: {
    // page.tsx
    privacyBadge: "100% Client-Side Privacy",
    heroTitle1: "Track Who Unfollowed You,",
    heroTitle2: "Without Logging In",
    heroDesc: "It's easy—just upload your Instagram ZIP data. Your privacy is 100% guaranteed since no data is ever sent to our servers.",
    summaryTitle: "Your Account Summary",
    summaryDesc: "Based on data saved locally on your device.",
    checkAnotherBtn: "Check Another File",
    
    // ZipUploader.tsx
    uploadError: "Please upload a valid .zip file extracted from Instagram.",
    uploadPrompt: "Click or drag your Instagram .zip file here",
    uploadDesc: "Your data is 100% safe. All calculations are done directly on your device. No data is ever sent to our servers.",
    
    // Header
    langSwitch: "EN / ID",
    navHowItWorks: "Tutorial",
    navFeatures: "Features",
    navFaq: "FAQ",
    navUpload: "Try Now",

    // MetricCards.tsx
    unfollowersDesc: "Not Following Back",
    fansDesc: "Fans (You Don't Follow Back)",
    mutualsDesc: "Mutuals / Following Each Other",

    // UserTable.tsx
    showing: "Showing",
    from: "of",
    accounts: "accounts.",
    maxRandomFree: "Max 100 Random Usernames (Free Version)",
    hiddenNames1: "You have",
    hiddenNames2: "Hidden Accounts",
    hiddenDesc: "To prevent data abuse, the free version only displays 100 <strong>random</strong> usernames (system-protected using Base64). <strong>Upgrade to Premium</strong> to unlock all data.",
    unlockAll: "Unlock Full Access (Only Rp 15.000)",

    // Footer.tsx
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    emailSupport: "Email Support",
    footerText: "Followins. 100% Privacy Guaranteed.",

    // LoadingScreen.tsx
    terminalTitle: "Terminal - Analyzing",
    loadingMsg0: "Reading ZIP file into browser memory...",
    loadingMsg1: "Scanning directory structure...",
    loadingMsg2: "Extracting network list data (string_list_data)...",
    loadingMsg3: "Decrypting Instagram JSON format...",
    loadingMsg4: "Analyzing followers and following relationships...",
    loadingMsg5: "Filtering bots and deactivated accounts...",
    loadingMsg6: "Initializing Set algorithms...",
    loadingMsg7: "Calculating mutual followers...",
    loadingMsg8: "Identifying unfollowers and fans...",
    loadingMsg9: "Sorting chronology of follow history...",
    loadingMsg10: "Analyzing new unfollowers & relationship hoppers...",
    loadingMsg11: "Securing data with local encryption...",
    loadingMsg12: "Verifying analysis result integrity...",
    loadingMsg13: "Preparing interactive Dashboard interface...",
    loadingMsg14: "Allocating memory for chart visualization...",
    loadingMsg15: "Process complete! Waiting for your confirmation...",
    continueBtn: "Continue to Dashboard",

    // MutualStats.tsx
    mutualStatsTitle: "\"Who Followed First?\" Statistics",
    mutualStatsDesc1: "Out of",
    mutualStatsDesc2: "mutuals based on follow time, here are the results:",
    youFirst: "You Followed First",
    youFirstDesc: "Ouch, you waited more than 24 hours for them to follow back.",
    themFirst: "They Followed First",
    themFirstDesc: "You're cold! They waited more than 24 hours for your follow back.",
    sameDay: "Followed Each Other on the Same Day",
    sameDayDesc: "True friends! You followed each other within 24 hours.",

    // RelationshipPieChart.tsx
    relTitle: "Followers vs Following Percentage",
    relDesc: "A comparison of your Followers and Following based on your Instagram data.",
    relNotFollowBack: "Following (Your Unfollowers)",
    relMutual: "Mutuals (Following Each Other)",
    relFans: "Followers (Your Fans)",

    // GrowthChart.tsx
    growthNoData: "No data available",
    growthTitle: "Followers & Following Growth Chart",
    growthDescMonthly: "Here is the monthly breakdown of new followers and following for the year ",
    growthDescYearly: "Here is the year-over-year breakdown of new followers and following.",
    growthYear: "Year",
    growthPerMonth: "Monthly",
    growthPerYear: "Yearly",
    growthNewFollowers: "New Followers",
    growthNewFollowing: "New Following",

    // CohortChart.tsx
    cohortTitle: "Fans, Mutuals, and Unfollowers/Following",
    cohortDesc: "This chart groups your Mutuals, Fans, or Unfollowers based on when you first connected (whether they followed you first, or you followed them first).",
    cohortMutuals: "Mutuals",
    cohortFans: "Fans",
    cohortUnfollowers: "Unfollowers/Following",
    cohortOlder: "Older Data",
    cohortPage: "Page",
    cohortNewer: "Newer Data",

    // SeasonalityRadar.tsx
    seasonTitle: "Months with the Most Followers",
    seasonDescAll: "Historically, which months bring in the most new followers?",
    seasonDescYear: "Which month had the most new followers in",
    seasonAllTime: "All Time",
    seasonTotalFollowers: "Total Followers Gained",
    
    // LoyalFollowers.tsx
    loyalTitle: "Most Loyal Followers",
    loyalDesc: "Accounts that have followed you the longest",

    // AccountHealthRatio.tsx
    healthTitle: "Account Health Ratio",
    healthDesc: "Followers vs Following Comparison",
    healthGood: "Popular & Healthy Account",
    healthBad: "You Follow More People",

    // PendingRequests.tsx
    pendingTitle: "Pending Requests",
    pendingDesc: "Your follow requests that haven't been accepted (Private accounts)",

    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    // How It Works
    howItWorksTitle: "How to Use Followins",
    howItWorksDesc: "It takes just 4 easy steps to start analyzing your Instagram account deeply without ever sharing your username and password.",
    step1Title: "1. Open Instagram Settings",
    step1Desc: "Open the Instagram app, go to Profile > Settings (Hamburger menu) > Type 'download' in the search bar > select 'Download your information' > wait until 'Request a download' appears.",
    step2Title: "2. Download Your Information",
    step2Desc: "Click 'Request a download' > Select 'Export to device' > Choose 'Custom' and select only 'Followers and following' > Make sure to choose the JSON format (not HTML) and 'All time' for the date range > Finally, click 'Create files'.",
    step3Title: "3. Wait for the Email",
    step3Desc: "Instagram will process your request. > This usually takes anywhere from a few minutes up to a couple of hours depending on your data size. > Once done, download the file. > (If you close the app, you'll receive an email notification, or simply repeat step 1: go to settings, type 'download', and select 'download your information').",
    step4Title: "4. Upload the ZIP File",
    step4Desc: "Download the ZIP file from Instagram's email or the download page > then upload it directly here > Your interactive analytics and PDF export options will appear instantly!",

    // Features
    featuresTitle: "Why Choose Followins?",
    featuresDesc: "Deep analytics without compromising your account's safety. And of course, no login required!",
    feat1Title: "Ban-Proof",
    feat1Desc: "Since no login is required, your account is 100% safe from being blocked or banned by Instagram.",
    feat2Title: "Informative Charts",
    feat2Desc: "We present highly informative and interactive data through easy-to-understand charts.",
    feat3Title: "Lightning Fast",
    feat3Desc: "Processing millions of lines of data can be completed in minutes, right on your device.",
    feat4Title: "PDF Report Export",
    feat4Desc: "Print the name list and analytics statistics into a professional and easy-to-understand PDF document.",
    feat5Title: "Advanced Search & Filter",
    feat5Desc: "Find specific accounts quickly through our smart search, status filtering, and advanced sorting features.",
    feat6Title: "Local Analysis History",
    feat6Desc: "Compare follower changes over time. Your history is safely stored offline in your device's browser (as long as it hasn't been cleared or reset).",

    // Privacy
    privacyTitle: "User Privacy is Our Top Priority",
    privacyDesc: "We never store, peek at, or send your data anywhere.",
    priv1Title: "100% Client-Side",
    priv1Desc: "Our code extracts the ZIP file and generates PDF reports purely using your browser's memory. Our servers will never receive or store a single byte of your data.",
    priv2Title: "No Need to Enter Username or Password",
    priv2Desc: "Many third-party apps ask for your Instagram login. We never ask for it, because your data can be accessed securely using the ZIP file you downloaded from Instagram.",
    priv3Title: "A Completely Transparent Process",
    priv3Desc: "You can see for yourself how the extraction process runs. Security isn't just an empty promise, it's a technical guarantee you can witness firsthand.",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqDesc: "Got questions? We've probably answered them here.",
    faqCatGeneral: "General & Pricing",
    faqCatUsage: "Usage & Tech",
    faqCatSecurity: "Security & Data",
    q1: "Is this app free?",
    a1: "Yes, it's free! And just so you know, our free tier feels premium too... Visualizations, account summaries, and charts are 100% free. To view the complete list of names that unfollowed you and export reports to PDF, we offer a One-Time Payment Premium access to unlock all data without limits, not just 100 usernames.",
    q2: "How long does Instagram take to send my ZIP file?",
    a2: "Usually, it only takes 5-15 minutes. However, if your account has tens of thousands of followers or a long history, it can take up to a few hours.",
    q3: "Why use JSON format instead of HTML?",
    a3: "Followins' system reads raw data (JSON) to perform set calculations with 100% accuracy and visualize it into charts. HTML format is intended only for human reading.",
    q4: "Can I save the list of names as a PDF?",
    a4: "Absolutely! We provide a PDF Export feature that generates neat and professional report documents, complete with statistical charts and name lists. The PDF generation process also runs 100% securely on your device.",
    q5: "Is the Premium service a monthly subscription?",
    a5: "No. We use a One-Time Payment system for a single username data session. If you upload a file with a different username, please make another payment to support us. Please note that we will never automatically charge or bill your payment account in subsequent months.",
    q6: "Can my account get blocked or banned by Instagram if I use this app or website?",
    a6: "No. Followins is 100% safe because you never enter your Instagram username or password here. We do not interact with the Instagram API. Our system purely reads your downloaded raw data files offline directly from your own device.",
    q7: "I uploaded the ZIP file, but why do I get an error or a 'data not found' warning?",
    a7: "Make sure you selected the JSON format (not HTML) when requesting your data from Instagram. Also, ensure the file you upload is still in its original format (ending in .zip); you don't need to extract, unzip, or rename the file beforehand.",
    q8: "Can I use this app on my mobile phone (Smartphone)?",
    a8: "Yes, absolutely! You can directly upload the ZIP file using your phone. However, for the best experience—especially when viewing charts and lists containing thousands of names—we highly recommend opening it on a Computer or Laptop.",
    q9: "Why is the follower count in this app slightly different from the number on my Instagram profile?",
    a9: "Instagram often experiences a delay when processing your data backup file. Accounts that recently followed or unfollowed you a few hours before requesting the data might not be included in the ZIP file. Additionally, bot/spam accounts that have been deleted or suspended by Instagram are usually excluded from the backup automatically.",
    
    // History
    historyTitle: "Your Instagram Account Analysis"
  }
};

export type Language = keyof typeof dictionaries;
export type DictionaryKey = keyof typeof dictionaries.id;
