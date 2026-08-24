'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Loader2, Download } from 'lucide-react';
import { ParseResult } from '@/utils/instagramParser';
import { pdf } from '@react-pdf/renderer';
import { FollowinsReportPDF } from './FollowinsReportPDF';

interface PDFDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium: boolean;
  data: ParseResult | null;
  language: 'en' | 'id';
}

export const PDFDownloadModal: React.FC<PDFDownloadModalProps> = ({ isOpen, onClose, isPremium, data, language }) => {
  const [selectedLimit, setSelectedLimit] = useState<number>(250);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen || !data) return null;

  const totalItems = Math.max(
    data.totalUnfollowersCount || data.unfollowers.length,
    data.totalFansCount || data.fans.length
  );
  const halfItems = Math.floor(totalItems / 2);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Determine actual limit: -1 means all
      const limit = isPremium ? selectedLimit : 250;
      
      const blob = await pdf(<FollowinsReportPDF data={data} limit={limit} language={language} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Followins_Report_${data.ownerUsername || 'Account'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      onClose();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(language === 'en' ? 'Error generating PDF. Please try again.' : 'Gagal membuat PDF. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const t = {
    title: language === 'en' ? 'Download PDF Report' : 'Unduh Laporan PDF',
    descFree: language === 'en' ? 'Free version is limited to 250 data rows.' : 'Versi gratis dibatasi maksimal 250 baris data.',
    descPremium: language === 'en' ? 'Select how much data to include in the report.' : 'Pilih berapa banyak data yang ingin disertakan dalam laporan.',
    opt100: language === 'en' ? 'First 250 Data' : '250 Data Pertama',
    optHalf: language === 'en' ? `Half Data (${halfItems})` : `Setengah Data (${halfItems})`,
    optAll: language === 'en' ? `All Data (${totalItems})` : `Seluruh Data (${totalItems})`,
    btnGen: language === 'en' ? 'Generate & Download' : 'Buat & Unduh',
    btnGenWait: language === 'en' ? 'Generating...' : 'Membuat...',
    cancel: language === 'en' ? 'Cancel' : 'Batal',
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden"
        >
          <button 
            onClick={onClose}
            disabled={isGenerating}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 border border-zinc-200">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">{t.title}</h3>
          </div>

          <p className="text-sm text-zinc-600 mb-6">
            {isPremium ? t.descPremium : t.descFree}
          </p>

          {isPremium && (
            <div className="flex flex-col gap-3 mb-6">
              <label className={`flex items-center gap-3 p-3 rounded-xl border ${selectedLimit === 250 ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200'} cursor-pointer transition-colors`}>
                <input 
                  type="radio" 
                  name="limit" 
                  value={250} 
                  checked={selectedLimit === 250} 
                  onChange={() => setSelectedLimit(250)}
                  className="w-4 h-4 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="font-medium text-zinc-900">{t.opt100}</span>
              </label>
              
              <label className={`flex items-center gap-3 p-3 rounded-xl border ${selectedLimit === halfItems ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200'} cursor-pointer transition-colors`}>
                <input 
                  type="radio" 
                  name="limit" 
                  value={halfItems} 
                  checked={selectedLimit === halfItems} 
                  onChange={() => setSelectedLimit(halfItems)}
                  className="w-4 h-4 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="font-medium text-zinc-900">{t.optHalf}</span>
              </label>

              <label className={`flex items-center gap-3 p-3 rounded-xl border ${selectedLimit === -1 ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200'} cursor-pointer transition-colors`}>
                <input 
                  type="radio" 
                  name="limit" 
                  value={-1} 
                  checked={selectedLimit === -1} 
                  onChange={() => setSelectedLimit(-1)}
                  className="w-4 h-4 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="font-medium text-zinc-900">{t.optAll}</span>
              </label>
            </div>
          )}

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              disabled={isGenerating}
              className="flex-1 py-2.5 rounded-lg font-medium text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {t.cancel}
            </button>
            <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-[2] py-2.5 rounded-lg font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-80"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.btnGenWait}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {t.btnGen}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
