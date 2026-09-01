"use client";

import { useLanguage } from '@/i18n/LanguageContext';
import { ShieldCheck, Check, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureItem = ({ icon: Icon, text, isFaded, iconColor, textStyle }: { icon?: any, text: string, isFaded?: boolean, iconColor?: string, textStyle?: string }) => (
  <li className={`flex items-start gap-3 ${isFaded ? 'opacity-50' : ''}`}>
    {Icon ? (
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor || 'text-emerald-500'}`} />
    ) : (
      <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
      </span>
    )}
    <span className={`text-sm ${textStyle || 'text-zinc-700'}`}>{text}</span>
  </li>
);

export default function PricingSection() {
  const { language } = useLanguage();

  const handleUploadClick = () => {
    const el = document.getElementById('upload-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24" id="pricing">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-fluid-h2 font-black text-zinc-900 mb-4 tracking-tight">
          {language === 'en' ? 'Unlock Your Full Instagram Insights' : 'Buka Semua Data Instagram-mu'}
        </h2>
        <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto font-light">
          {language === 'en' 
            ? 'Stop guessing who unfollowed you. Choose a plan to reveal hidden accounts and get full access to your data.' 
            : 'Berhenti menebak siapa yang unfollow kamu. Pilih paket di bawah untuk membuka akun yang disembunyikan dan dapatkan akses penuh.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Premium Plan */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm flex flex-col relative transition-all hover:shadow-md"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">Premium (Personal)</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-zinc-900">Rp 25.000</span>
              <span className="text-sm font-medium text-zinc-500">/ akun</span>
            </div>
            <p className="text-sm text-zinc-500 mt-2">
              {language === 'en' ? 'One-time payment. Perfect for personal use to check a single account.' : 'Bayar sekali. Cocok untuk penggunaan pribadi pada 1 akun.'}
            </p>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <FeatureItem icon={Check} text={language === 'en' ? 'Reveal All Hidden Accounts' : 'Buka Semua Akun yang Disembunyikan'} />
            <FeatureItem icon={Check} text={language === 'en' ? 'Export Data to PDF' : 'Ekspor Laporan ke PDF'} />
            <FeatureItem text={language === 'en' ? 'Contains Advertisements' : 'Masih Terdapat Iklan'} isFaded textStyle="text-zinc-500" />
            <FeatureItem text={language === 'en' ? 'Locked to 1 Username & 1 Device' : 'Terkunci di 1 Username & 1 Perangkat'} isFaded textStyle="text-zinc-500" />
          </ul>

          <button 
            className="w-full py-3.5 bg-zinc-100 text-zinc-900 font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
            onClick={handleUploadClick}
          >
            {language === 'en' ? 'Upload ZIP to start' : 'Unggah ZIP untuk mulai'}
          </button>
        </motion.div>

        {/* Premium+ Plan */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border-2 border-teal-600 p-8 shadow-xl shadow-teal-500/10 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1.5 bg-teal-600"></div>
          <div className="absolute top-5 right-5 bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-teal-100">
            <Star size={12} className="fill-teal-600" /> {language === 'en' ? 'BEST VALUE' : 'PALING UNTUNG'}
          </div>

          <div className="mb-6 mt-2">
            <h3 className="text-2xl font-bold text-zinc-900 mb-2 flex items-center gap-1">
              Premium<span className="text-teal-600">+</span> <span className="text-lg font-medium text-zinc-400 ml-1">(Pro)</span>
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-zinc-900">Rp 50.000</span>
              <span className="text-sm font-medium text-zinc-500">/ {language === 'en' ? 'year' : 'tahun'}</span>
            </div>
            <p className="text-sm text-zinc-500 mt-2">
              {language === 'en' ? 'Universal license key. Best for creators with multiple accounts.' : 'Lisensi universal. Solusi hemat untuk kreator atau multi-akun.'}
            </p>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <FeatureItem icon={Check} text={language === 'en' ? 'Reveal All Hidden Accounts' : 'Buka Semua Akun yang Disembunyikan'} iconColor="text-teal-600" textStyle="text-zinc-700 font-medium" />
            <FeatureItem icon={ShieldCheck} text={language === 'en' ? 'Use on Unlimited Accounts & Devices' : 'Bebas Pakai di Banyak Akun & Perangkat'} iconColor="text-teal-600" textStyle="text-zinc-900 font-bold" />
            <FeatureItem icon={Zap} text={language === 'en' ? '100% Ad-Free Experience' : '100% Bersih Tanpa Iklan'} iconColor="text-teal-600 fill-teal-600" textStyle="text-zinc-900 font-bold" />
            <FeatureItem icon={Check} text={language === 'en' ? 'Premium PDF Reports' : 'Ekspor Laporan PDF Premium'} iconColor="text-teal-600" textStyle="text-zinc-700 font-medium" />
          </ul>

          <button 
            className="w-full py-3.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/30"
            onClick={handleUploadClick}
          >
            {language === 'en' ? 'Upload ZIP to start' : 'Unggah ZIP untuk mulai'}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
