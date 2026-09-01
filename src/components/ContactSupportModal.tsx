"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSupport } from '@/contexts/SupportContext';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitTicket } from '@/app/actions/submitTicket';

export default function ContactSupportModal() {
  const { language, t } = useLanguage();
  const { isOpen, closeSupport } = useSupport();
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const content = {
    title: language === 'id' ? 'Hubungi Bantuan' : 'Contact Support',
    desc: language === 'id' ? 'Beri tahu kami masalah atau pertanyaan Anda. Kami akan merespon melalui email secepatnya.' : 'Let us know your issue or question. We will respond via email as soon as possible.',
    categoryLabel: language === 'id' ? 'Kategori' : 'Category',
    catBug: language === 'id' ? 'Laporan Bug' : 'Bug Report',
    catFeature: language === 'id' ? 'Permintaan Fitur' : 'Feature Request',
    catPayment: language === 'id' ? 'Masalah Pembayaran' : 'Payment Issue',
    catOther: language === 'id' ? 'Lainnya' : 'Other',
    emailLabel: language === 'id' ? 'Alamat Email' : 'Email Address',
    emailPlaceholder: 'email@domain.com',
    usernameLabel: language === 'id' ? 'Username Instagram (Opsional)' : 'Instagram Username (Optional)',
    usernamePlaceholder: '@username',
    messageLabel: language === 'id' ? 'Pesan' : 'Message',
    messagePlaceholder: language === 'id' ? 'Jelaskan masalah Anda secara detail...' : 'Describe your issue in detail...',
    sendBtn: language === 'id' ? 'Kirim Pesan' : 'Send Message',
    sendingBtn: language === 'id' ? 'Mengirim...' : 'Sending...',
    successTitle: language === 'id' ? 'Pesan Terkirim!' : 'Message Sent!',
    successDesc: language === 'id' ? 'Terima kasih telah menghubungi kami. Tim kami akan segera meninjau tiket Anda.' : 'Thank you for reaching out. Our team will review your ticket shortly.',
    closeBtn: language === 'id' ? 'Tutup' : 'Close',
  };

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const result = await submitTicket(formData);
    
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong');
    }
  }

  const inputClass = "w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-zinc-500";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">{content.title}</h2>
          <button 
            onClick={closeSupport}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6 max-h-[80vh] overflow-y-auto">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <CheckCircle size={48} className="text-emerald-500" />
              <div>
                <h3 className="text-xl font-medium text-white mb-2">{content.successTitle}</h3>
                <p className="text-zinc-400">{content.successDesc}</p>
              </div>
              <button 
                onClick={closeSupport}
                className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium"
              >
                {content.closeBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-zinc-400 mb-2">{content.desc}</p>
              
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-400/10 rounded-lg border border-red-400/20">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="category" className="text-sm font-medium text-zinc-300">
                  {content.categoryLabel}
                </label>
                <select 
                  id="category" 
                  name="category" 
                  required
                  className={inputClass}
                >
                  <option value="Bug">{content.catBug}</option>
                  <option value="Payment">{content.catPayment}</option>
                  <option value="Feature">{content.catFeature}</option>
                  <option value="Other">{content.catOther}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                  {content.emailLabel}
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  placeholder={content.emailPlaceholder}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="username" className="text-sm font-medium text-zinc-300">
                  {content.usernameLabel}
                </label>
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  placeholder={content.usernamePlaceholder}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-zinc-300">
                  {content.messageLabel}
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  required
                  rows={4}
                  placeholder={content.messagePlaceholder}
                  className={`${inputClass} resize-none`}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium p-3 rounded-lg transition-colors mt-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {content.sendingBtn}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {content.sendBtn}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
