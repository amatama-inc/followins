"use client";

import LegalPageLayout from '@/components/LegalPageLayout';
import { useLanguage } from '@/i18n/LanguageContext';
import EmailSupportLink from '@/components/EmailSupportLink';
export default function TermsAndConditions() {
  const { language } = useLanguage();

  return (
    <LegalPageLayout>
      {language === 'id' ? (
        <div className="space-y-6 text-fluid-p text-zinc-400 leading-relaxed text-justify">
          <h1 className="text-fluid-h2 font-extrabold text-white mb-2 text-left">Syarat & Ketentuan</h1>
          <p className="text-sm text-zinc-500 mb-8 text-left">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p>Selamat datang di Followins. Dengan mengakses dan menggunakan layanan kami, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, mohon untuk tidak menggunakan layanan kami.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">1. Deskripsi Layanan</h2>
          <p>Followins adalah alat bantu berbasis web yang memungkinkan pengguna untuk membandingkan daftar pengikut (followers) dan yang diikuti (following) Instagram dari file ZIP ekspor data, serta mengekspor hasil analisis (seperti laporan PDF). Layanan ini disediakan &quot;sebagaimana adanya&quot; tanpa jaminan apa pun.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">2. Penggunaan Layanan Secara Wajar</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Anda setuju untuk menggunakan layanan ini hanya untuk tujuan pribadi, non-komersial, dan mematuhi hukum yang berlaku.</li>
            <li>Anda bertanggung jawab penuh atas data yang Anda ekspor dari layanan kami (termasuk laporan PDF). Anda setuju untuk tidak menggunakan data yang diekspor untuk tujuan ilegal, pelecehan, pencemaran nama baik, atau niat buruk lainnya.</li>
            <li>Anda dilarang keras mencoba memanipulasi, meretas (hack), atau merekayasa balik (reverse-engineer) komponen *paywall*, limitasi gratis, atau fitur keamanan apa pun dari layanan ini.</li>
            <li>Tindakan penyalahgunaan atau penghindaran sistem pembayaran akan mengakibatkan pemblokiran akses ke layanan secara permanen tanpa pengembalian dana.</li>
          </ul>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">3. Layanan Premium & Pembayaran</h2>
          <p>Followins menawarkan fitur *Premium* (seperti membuka batasan filter, sortir, dan melihat semua data secara penuh). Pembayaran diproses melalui penyedia gerbang pembayaran berlisensi (Midtrans).</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Semua transaksi bersifat final. Harap pastikan layanan kami berjalan sesuai harapan pada mode gratis (meskipun dibatasi) sebelum melakukan pembelian.</li>
            <li>Akses Premium berlaku sesuai dengan durasi atau kuota paket yang Anda beli terhitung dari waktu transaksi berhasil dikonfirmasi.</li>
          </ul>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">4. Kebijakan Pengembalian Dana (Refund)</h2>
          <p>Karena sifat produk digital ini, kami <strong className="text-white">TIDAK MENYEDIAKAN PENGEMBALIAN DANA (REFUND)</strong> setelah akses Premium berhasil diberikan. Pengecualian hanya dapat diberikan (atas diskresi kami sepenuhnya) jika terjadi kesalahan teknis fatal dari pihak kami yang menyebabkan layanan premium sama sekali tidak dapat digunakan selama lebih dari 48 jam.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">5. Batasan Tanggung Jawab</h2>
          <p>Followins tidak berafiliasi, didukung oleh, atau terkait secara resmi dengan Instagram atau Meta Platforms, Inc. Kami tidak bertanggung jawab atas kerugian, kehilangan data, atau penangguhan akun Instagram Anda yang mungkin terjadi (karena aplikasi ini murni bekerja secara pasif secara luring dan tidak pernah berinteraksi dengan API Instagram Anda secara langsung). Selanjutnya, kami juga tidak bertanggung jawab atas bagaimana Anda mendistribusikan atau menggunakan data yang diekspor dari aplikasi kami.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">6. Perubahan Syarat & Ketentuan</h2>
          <p>Kami berhak untuk memodifikasi atau mengganti Syarat dan Ketentuan ini kapan saja. Anda diharapkan untuk memeriksa halaman ini secara berkala agar menyadari setiap perubahan. Penggunaan layanan kami yang berkelanjutan setelah modifikasi merupakan penerimaan Anda terhadap syarat baru tersebut.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">7. Hubungi Kami</h2>
          <p>Jika Anda memiliki pertanyaan mengenai Syarat dan Ketentuan ini, silakan hubungi kami melalui <EmailSupportLink />.</p>
        </div>
      ) : (
        <div className="space-y-6 text-fluid-p text-zinc-400 leading-relaxed text-justify">
          <h1 className="text-fluid-h2 font-extrabold text-white mb-2 text-left">Terms & Conditions</h1>
          <p className="text-sm text-zinc-500 mb-8 text-left">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p>Welcome to Followins. By accessing and using our services, you agree to be bound by the following Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">1. Description of Service</h2>
          <p>Followins is a web-based utility tool that allows users to compare Instagram followers and following lists from a data export ZIP file, and export the analysis results (e.g., as PDF reports). The service is provided &quot;as is&quot; without any warranties.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">2. Acceptable Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You agree to use this service only for personal, non-commercial purposes, and in compliance with applicable laws.</li>
            <li>You are solely responsible for the data you export from our service (including PDF reports). You agree not to use the exported data for illegal, harassing, defamatory, or malicious purposes.</li>
            <li>You are strictly prohibited from attempting to manipulate, hack, or reverse-engineer the paywall components, free limitations, or any security features of this service.</li>
            <li>Any abuse or circumvention of the payment system will result in permanent blocking of access to the service without a refund.</li>
          </ul>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">3. Premium Services & Payments</h2>
          <p>Followins offers *Premium* features (such as unlocking limits on filters, sorting, and viewing full data). Payments are processed through a licensed payment gateway provider (Midtrans).</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>All transactions are final. Please ensure our service runs as expected in free mode (albeit limited) before making a purchase.</li>
            <li>Premium access applies according to the duration or package quota you purchased, starting from the time the transaction is successfully confirmed.</li>
          </ul>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">4. Refund Policy</h2>
          <p>Due to the nature of this digital product, we <strong className="text-white">DO NOT PROVIDE REFUNDS</strong> once Premium access is successfully granted. Exceptions can only be given (at our sole discretion) if a fatal technical error occurs on our end that renders the premium service completely unusable for more than 48 hours.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">5. Limitation of Liability</h2>
          <p>Followins is not affiliated with, endorsed by, or officially connected to Instagram or Meta Platforms, Inc. We are not responsible for any damages, data loss, or suspension of your Instagram account that may occur (since this app works purely passively offline and never interacts with your Instagram API directly). Furthermore, we are not responsible for how you distribute or use the data exported from our application.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">6. Changes to Terms</h2>
          <p>We reserve the right to modify or replace these Terms and Conditions at any time. You are expected to check this page periodically to become aware of any changes. Your continued use of our service after any modification constitutes your acceptance of the new terms.</p>

          <h2 className="text-fluid-h3 font-bold text-white mt-8 mb-4 text-left">7. Contact Us</h2>
          <p>If you have any questions regarding these Terms and Conditions, please contact us via our <EmailSupportLink />.</p>
        </div>
      )}
    </LegalPageLayout>
  );
}
