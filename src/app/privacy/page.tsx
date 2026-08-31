"use client";

import LegalPageLayout from '@/components/LegalPageLayout';
import { useLanguage } from '@/i18n/LanguageContext';
import EmailSupportLink from '@/components/EmailSupportLink';
export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return (
    <LegalPageLayout>
      {language === 'id' ? (
        <div className="space-y-6 text-fluid-p text-zinc-400 leading-relaxed text-justify">
          <h1 className="text-fluid-h2 font-extrabold text-white mb-2 text-left">Kebijakan Privasi</h1>
          <p className="text-sm text-zinc-500 mb-8 text-left">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p>Selamat datang di Followins. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda menggunakan layanan kami. Followins dirancang dengan pendekatan <strong className="text-white">Privacy-First</strong> yang berarti perlindungan data Anda adalah prioritas utama kami.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">1. Pengumpulan dan Pemrosesan Data</h2>
          <p>Followins adalah aplikasi 100% Client-Side. Ini berarti:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Semua pemrosesan data, perbandingan file ZIP, pembuatan laporan PDF, dan analisis dilakukan <strong>sepenuhnya di dalam browser perangkat Anda</strong>.</li>
            <li>Kami <strong>TIDAK PERNAH</strong> mengunggah file ZIP Instagram Anda, data pengikut, laporan analisis, atau informasi pribadi Anda ke server kami.</li>
            <li>File Anda tidak pernah meninggalkan komputer/perangkat Anda. Kami bahkan tidak memiliki server untuk menyimpan data Anda.</li>
          </ul>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">2. Penyimpanan Lokal (Local Storage)</h2>
          <p>Untuk meningkatkan pengalaman pengguna (seperti menyimpan riwayat *scan*, label akun, dan preferensi bahasa), Followins menggunakan LocalStorage pada browser Anda.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Data ini tetap berada di perangkat Anda secara lokal.</li>
            <li>Anda dapat menghapus data ini kapan saja dengan menghapus data browser (clear cache/site data).</li>
          </ul>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">3. Layanan Pihak Ketiga</h2>
          <p>Kami menggunakan layanan pihak ketiga yang mungkin mengumpulkan informasi non-pribadi secara anonim (seperti jenis browser, geolokasi umum, dan pola klik) untuk keperluan operasional:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Vercel Analytics:</strong> Untuk memantau kecepatan dan performa website.</li>
            <li><strong>FingerprintJS:</strong> Digunakan secara minimalis murni untuk keperluan sistem *Paywall* dan mencegah penyalahgunaan fitur gratis, bukan untuk melacak aktivitas pribadi lintas situs Anda.</li>
            <li><strong>Midtrans:</strong> Sebagai gerbang pembayaran (Payment Gateway). Midtrans akan memproses informasi pembayaran Anda secara aman sesuai dengan kebijakan privasi mereka sendiri. Kami tidak menyimpan detail kartu kredit/pembayaran Anda.</li>
          </ul>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">4. Keamanan Keuangan & Pembayaran</h2>
          <p>Kami tidak mengelola atau menyimpan data sensitif perbankan Anda. Proses transaksi pembayaran diproses sepenuhnya oleh institusi berlisensi (Midtrans). Harap berhati-hati terhadap penipuan (phishing) yang mengatasnamakan Followins di luar platform resmi kami.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">5. Data yang Diekspor (Exported Data)</h2>
          <p>Saat Anda mengekspor data dari Followins (misalnya, mengunduh laporan PDF), file tersebut dibuat dan disimpan secara lokal di perangkat Anda. Kami tidak menyimpan salinan file yang Anda ekspor. Anda bertanggung jawab penuh atas keamanan, privasi, dan distribusi file yang Anda unduh.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">6. Anak-anak di Bawah Umur</h2>
          <p>Layanan kami tidak ditujukan untuk anak-anak di bawah usia 13 tahun. Karena sifat aplikasi ini murni berjalan di sisi klien (Client-Side), kami tidak pernah secara sengaja mengumpulkan informasi pribadi dari siapa pun, termasuk anak-anak.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">7. Perubahan Kebijakan</h2>
          <p>Kami berhak untuk mengubah atau memperbarui Kebijakan Privasi ini kapan saja tanpa pemberitahuan sebelumnya. Kami menyarankan Anda untuk meninjau halaman ini secara berkala.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">8. Hubungi Kami</h2>
          <p>Jika Anda memiliki pertanyaan lebih lanjut mengenai Kebijakan Privasi ini, silakan hubungi kami melalui <EmailSupportLink />.</p>
        </div>
      ) : (
        <div className="space-y-6 text-fluid-p text-zinc-400 leading-relaxed text-justify">
          <h1 className="text-fluid-h2 font-extrabold text-white mb-2 text-left">Privacy Policy</h1>
          <p className="text-sm text-zinc-500 mb-8 text-left">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p>Welcome to Followins. This Privacy Policy explains how we collect, use, and protect your information when you use our services. Followins is designed with a <strong className="text-white">Privacy-First</strong> approach, meaning your data protection is our top priority.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">1. Data Collection and Processing</h2>
          <p>Followins is a 100% Client-Side application. This means:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>All data processing, ZIP file comparison, PDF report generation, and analysis are done <strong>entirely inside your device's browser</strong>.</li>
            <li>We <strong>NEVER</strong> upload your Instagram ZIP file, follower data, analysis reports, or personal information to our servers.</li>
            <li>Your files never leave your computer/device. We don't even have a server to store your data.</li>
          </ul>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">2. Local Storage</h2>
          <p>To improve user experience (such as saving scan history, account labels, and language preferences), Followins uses LocalStorage on your browser.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>This data remains on your device locally.</li>
            <li>You can delete this data at any time by clearing your browser data (clear cache/site data).</li>
          </ul>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">3. Third-Party Services</h2>
          <p>We use third-party services that may anonymously collect non-personal information (such as browser type, general geolocation, and click patterns) for operational purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Vercel Analytics:</strong> To monitor website speed and performance.</li>
            <li><strong>FingerprintJS:</strong> Used minimally purely for the Paywall system and to prevent abuse of free features, not for tracking your cross-site personal activity.</li>
            <li><strong>Midtrans:</strong> As a Payment Gateway. Midtrans will process your payment information securely in accordance with their own privacy policy. We do not store your credit card/payment details.</li>
          </ul>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">4. Financial & Payment Security</h2>
          <p>We do not manage or store your sensitive banking data. Payment transactions are processed entirely by licensed institutions (Midtrans). Please be careful of fraud (phishing) in the name of Followins outside our official platform.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">5. Exported Data</h2>
          <p>When you export data from Followins (for example, downloading a PDF report), the file is created and stored locally on your device. We do not keep a copy of your exported files. You are fully responsible for the security, privacy, and distribution of the files you download.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">6. Children Under Age</h2>
          <p>Our service is not directed to children under the age of 13. Due to the purely Client-Side nature of this application, we never knowingly collect personal information from anyone, including children.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">7. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us via our <EmailSupportLink />.</p>
        </div>
      )}
    </LegalPageLayout>
  );
}
