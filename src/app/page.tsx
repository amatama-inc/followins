"use client";

import { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Lock, Printer, ArrowLeft, HelpCircle, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ZipUploader from '@/components/ui/ZipUploader';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import PrivacySection from '@/components/landing/PrivacySection';
import PricingSection from '@/components/landing/PricingSection';
import FAQ from '@/components/landing/FAQ';
import DummyAd from '@/components/shared/DummyAd';
import dynamic from 'next/dynamic';

const HistoryWidget = dynamic(() => import('@/components/dashboard/HistoryWidget'), { ssr: false });
const MetricCards = dynamic(() => import('@/components/dashboard/MetricCards'));
const UserTable = dynamic(() => import('@/components/ui/UserTable'));
const GrowthChart = dynamic(() => import('@/components/charts/GrowthChart'));
const RelationshipPieChart = dynamic(() => import('@/components/charts/RelationshipPieChart'));
const CohortChart = dynamic(() => import('@/components/charts/CohortChart'));
const MutualStats = dynamic(() => import('@/components/landing/MutualStats'));
const SeasonalityRadar = dynamic(() => import('@/components/charts/SeasonalityRadar'));
const LoyalFollowers = dynamic(() => import('@/components/landing/LoyalFollowers'));
const AccountHealthRatio = dynamic(() => import('@/components/dashboard/AccountHealthRatio'));
const NewUnfollowersAlert = dynamic(() => import('@/components/dashboard/NewUnfollowersAlert'));
const PendingRequests = dynamic(() => import('@/components/dashboard/PendingRequests'));
const PDFDownloadModal = dynamic(() => import('@/components/pdf/PDFDownloadModal').then(mod => mod.PDFDownloadModal), { ssr: false });
import { parseInstagramZip, ParseResult } from '@/utils/instagramParser';
import { obfuscate } from '@/utils/crypto';
import { saveHistory, HistoryRecord, saveLastScanData, getLastScanData, getUnlockedAccounts, addUnlockedAccount } from '@/utils/storage';
import { track } from '@vercel/analytics';
import { saveAccountScanToDB, getAccountScanFromDB } from '@/utils/indexedDB';

let secureCache: { unfollowers: string[], fans: string[], mutuals: string[], newUnfollowers: string[], kutuLoncat: string[] } | null = null;

export default function Home() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [parseCompleted, setParseCompleted] = useState(false);
  const [result, setResult] = useState<ParseResult | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasHistoryForDivider, setHasHistoryForDivider] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('followins_history');
      if (stored && JSON.parse(stored).length > 0) {
        setHasHistoryForDivider(true);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Update URL to trigger Vercel Analytics page view tracking
      if (status === 'done') {
        window.history.pushState(null, '', '/dashboard');
      } else if (status === 'idle') {
        window.history.pushState(null, '', '/');
      }
    }
    
    // Vercel Analytics tracking (Custom Events)
    if (status === 'done') {
      try {
        track('Dashboard_Viewed');
      } catch (e) {}
    } else if (status === 'idle') {
      try {
        track('Landing_Viewed');
      } catch (e) {}
    }
  }, [status]);
  
  const [isDemo, setIsDemo] = useState(false);
  
  // States for new features
  const [newUnfollowers, setNewUnfollowers] = useState<string[]>([]);
  const [kutuLoncat, setKutuLoncat] = useState<string[]>([]);
  const [isFirstScan, setIsFirstScan] = useState(false);
  const [accountMode, setAccountMode] = useState<'public' | 'private'>('public');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  const handleSwitchAccount = async (username: string) => {
    try {
      const stored = await getAccountScanFromDB(username);
      if (stored) {
        setIsDemo(false);
        setStatus('loading');
        setParseCompleted(false);
        
        secureCache = {
          unfollowers: stored.data.unfollowers,
          fans: stored.data.fans,
          mutuals: stored.data.mutuals,
          newUnfollowers: stored.newUnfollowers || [],
          kutuLoncat: stored.kutuLoncat || []
        };

        const currentIsPremium = getUnlockedAccounts().includes(stored.username || 'my_account');
        
        const dataForState = { ...stored.data };
        if (!currentIsPremium) {
          dataForState.unfollowers = stored.data.unfollowers.slice(0, 250);
          dataForState.fans = stored.data.fans.slice(0, 250);
          dataForState.mutuals = stored.data.mutuals.slice(0, 250);
        }

        setResult(dataForState);
        setNewUnfollowers(!currentIsPremium ? (stored.newUnfollowers || []).slice(0, 250) : (stored.newUnfollowers || []));
        setKutuLoncat(!currentIsPremium ? (stored.kutuLoncat || []).slice(0, 250) : (stored.kutuLoncat || []));
        setIsFirstScan(stored.isFirstScan || false);
        
        try {
          localStorage.setItem('followins_latest_session', JSON.stringify({
            result: stored.data,
            newUnfollowers: stored.newUnfollowers || [],
            kutuLoncat: stored.kutuLoncat || [],
            isFirstScan: stored.isFirstScan || false
          }));
        } catch (e) {}

        setTimeout(() => {
          setParseCompleted(true);
        }, 8000);
      }
    } catch (error) {
      console.error('Failed to switch account:', error);
    }
  };

  const isPremium = result ? getUnlockedAccounts().includes(result.ownerUsername || 'my_account') : false;

  const handleUnlock = () => {
    if (result && result.ownerUsername) {
      addUnlockedAccount(result.ownerUsername);
    }
    
    // Force a re-render by creating a new object reference, restoring full data
    if (secureCache && result) {
      setResult({
        ...result,
        unfollowers: secureCache.unfollowers,
        fans: secureCache.fans,
        mutuals: secureCache.mutuals
      });
      setNewUnfollowers(secureCache.newUnfollowers);
      setKutuLoncat(secureCache.kutuLoncat);
    }
  };

  const resetApp = () => {
    setStatus('idle');
    setIsDemo(false);
  };

  const handleRestore = () => {
    try {
      const stored = localStorage.getItem('followins_latest_session');
      if (stored) {
        const session = JSON.parse(stored);
        if (session && session.result) {
          setIsDemo(false);
          setStatus('loading');
          setParseCompleted(false);
          
          secureCache = {
            unfollowers: session.result.unfollowers,
            fans: session.result.fans,
            mutuals: session.result.mutuals,
            newUnfollowers: session.newUnfollowers || [],
            kutuLoncat: session.kutuLoncat || []
          };

          const currentIsPremium = getUnlockedAccounts().includes(session.result.ownerUsername || 'my_account');
          
          const dataForState = { ...session.result };
          if (!currentIsPremium) {
            dataForState.unfollowers = session.result.unfollowers.slice(0, 250);
            dataForState.fans = session.result.fans.slice(0, 250);
            dataForState.mutuals = session.result.mutuals.slice(0, 250);
          }

          setResult(dataForState);
          setNewUnfollowers(!currentIsPremium ? (session.newUnfollowers || []).slice(0, 250) : (session.newUnfollowers || []));
          setKutuLoncat(!currentIsPremium ? (session.kutuLoncat || []).slice(0, 250) : (session.kutuLoncat || []));
          setIsFirstScan(session.isFirstScan || false);
          
          setTimeout(() => {
            setParseCompleted(true);
          }, 8000);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDemo = () => {
    setIsDemo(true);
    setStatus('loading');
    
    setTimeout(() => {
      const demoData = {
        ownerUsername: "demo_user",
        unfollowers: Array.from({ length: 42 }).map((_, i) => obfuscate(`unfollower_user_${i}`)),
        fans: Array.from({ length: 128 }).map((_, i) => obfuscate(`fan_user_${i}`)),
        mutuals: Array.from({ length: 350 }).map((_, i) => obfuscate(`mutual_user_${i}`)),
        totalUnfollowersCount: 42,
        totalFansCount: 128,
        totalMutualsCount: 350,
        oldestFollowers: [
          { username: obfuscate("selenagomez"), timestamp: 1546300800 },
          { username: obfuscate("taylorswift"), timestamp: 1548979200 },
          { username: obfuscate("zendaya"), timestamp: 1551398400 },
          { username: obfuscate("tomholland"), timestamp: 1554076800 },
          { username: obfuscate("chrishemsworth"), timestamp: 1556668800 }
        ],
        pendingRequests: [
          { username: obfuscate("private_user_1"), timestamp: 1672531200 },
          { username: obfuscate("secret_account"), timestamp: 1675209600 },
          { username: obfuscate("hidden_profile"), timestamp: 1677628800 }
        ],
        followersCount: 478,
        followingCount: 392,
        timeline: [
          { date: "2023-01", followers: 12, following: 5 },
          { date: "2023-02", followers: 18, following: 8 },
          { date: "2023-03", followers: 25, following: 12 },
          { date: "2023-04", followers: 40, following: 20 },
          { date: "2023-05", followers: 35, following: 15 },
          { date: "2023-06", followers: 55, following: 30 }
        ],
        cohortData: [
          { year: "2020", fans: 5, mutuals: 50, unfollowers: 10 },
          { year: "2021", fans: 15, mutuals: 80, unfollowers: 15 },
          { year: "2022", fans: 45, mutuals: 120, unfollowers: 12 },
          { year: "2023", fans: 63, mutuals: 100, unfollowers: 5 }
        ],
        mutualStats: { youFirst: 120, themFirst: 180, sameDay: 50 },
        seasonalityData: [
          { month: "Jan", followers: 45 },
          { month: "Feb", followers: 52 },
          { month: "Mar", followers: 68 },
          { month: "Apr", followers: 80 },
          { month: "Mei", followers: 75 },
          { month: "Jun", followers: 90 },
          { month: "Jul", followers: 85 },
          { month: "Agu", followers: 110 },
          { month: "Sep", followers: 95 },
          { month: "Okt", followers: 70 },
          { month: "Nov", followers: 60 },
          { month: "Des", followers: 105 }
        ]
      };
      
      const allNewUnf = ["unfollower_user_0", "unfollower_user_1", "unfollower_user_2", "unfollower_user_3"].map(obfuscate);
      const allKutu = ["unfollower_user_1", "unfollower_user_3"].map(obfuscate);
      
      secureCache = {
        unfollowers: demoData.unfollowers,
        fans: demoData.fans,
        mutuals: demoData.mutuals,
        newUnfollowers: allNewUnf,
        kutuLoncat: allKutu
      };

      const currentIsPremium = getUnlockedAccounts().includes(demoData.ownerUsername || 'my_account');
      
      const dataForState = { ...demoData };
      if (!currentIsPremium) {
        dataForState.unfollowers = demoData.unfollowers.slice(0, 250);
        dataForState.fans = demoData.fans.slice(0, 250);
        dataForState.mutuals = demoData.mutuals.slice(0, 250);
      }
      
      setResult(dataForState as any);
      setNewUnfollowers(!currentIsPremium ? allNewUnf.slice(0, 250) : allNewUnf);
      setKutuLoncat(!currentIsPremium ? allKutu.slice(0, 250) : allKutu);
      setIsFirstScan(false);
      
      try {
        localStorage.setItem('followins_latest_session', JSON.stringify({
          result: demoData,
          newUnfollowers: allNewUnf,
          kutuLoncat: allKutu,
          isFirstScan: false
        }));
      } catch(e) {}
      
      // Save demo to IndexedDB for Account Switcher testing
      saveAccountScanToDB(demoData.ownerUsername, demoData as ParseResult, allNewUnf, allKutu, false).then(() => {
        setTriggerRefresh(prev => prev + 1);
      });
      
      setParseCompleted(true);
    }, 8000);
  };

  const handleFile = async (file: File) => {
    setIsDemo(false);
    setStatus('loading');
    setParseCompleted(false);
    
    const startTime = Date.now();
    const data = await parseInstagramZip(file);
    const elapsed = Date.now() - startTime;
    
    if (elapsed < 8000) {
      await new Promise(r => setTimeout(r, 8000 - elapsed));
    }
    
    // Feature: Historical Tracker & Kutu Loncat Detector
    const trackerUsername = data.ownerUsername || 'my_account';
    
    let finalNewUnf: string[] = [];
    let finalKutuLoncat: string[] = [];
    let finalIsFirstScan = false;

    const lastScan = getLastScanData(trackerUsername);
    if (lastScan) {
      // Find new unfollowers (in current unfollowers, but not in last scan's unfollowers)
      finalNewUnf = data.unfollowers.filter(u => !lastScan.unfollowers.includes(u));
      setNewUnfollowers(finalNewUnf);
      
      // Find Kutu Loncat (was in fans or mutuals, now in unfollowers)
      finalKutuLoncat = finalNewUnf.filter(u => lastScan.fans.includes(u) || lastScan.mutuals.includes(u));
      setKutuLoncat(finalKutuLoncat);
      finalIsFirstScan = false;
      setIsFirstScan(false);
    } else {
      setNewUnfollowers([]);
      setKutuLoncat([]);
      finalIsFirstScan = true;
      setIsFirstScan(true);
    }
    
    // 1. Simpan original ke cache memori (anti F12)
    secureCache = {
      unfollowers: data.unfollowers,
      fans: data.fans,
      mutuals: data.mutuals,
      newUnfollowers: finalNewUnf,
      kutuLoncat: finalKutuLoncat
    };

    const currentIsPremium = getUnlockedAccounts().includes(data.ownerUsername || 'my_account');

    // 2. Buat versi terpotong untuk React State jika gratisan
    const dataForState = { ...data };
    if (!currentIsPremium) {
      dataForState.unfollowers = data.unfollowers.slice(0, 250);
      dataForState.fans = data.fans.slice(0, 250);
      dataForState.mutuals = data.mutuals.slice(0, 250);
    }
    
    setNewUnfollowers(!currentIsPremium ? finalNewUnf.slice(0, 250) : finalNewUnf);
    setKutuLoncat(!currentIsPremium ? finalKutuLoncat.slice(0, 250) : finalKutuLoncat);
    
    // Save current data for next scan (this uses original full data thanks to ParseResult being the full object originally)
    saveLastScanData(trackerUsername, data.unfollowers, data.fans, data.mutuals);
    
    setResult(dataForState);
    
    // Simpan ke LocalStorage dan dapatkan riwayat lengkap
    const newHistory = saveHistory({
      unfollowers: data.unfollowers.length,
      fans: data.fans.length,
      mutuals: data.mutuals.length
    });
    setHistory(newHistory);
    
    try {
      // Selalu simpan full data ke LocalStorage, terenkripsi via crypto.ts
      localStorage.setItem('followins_latest_session', JSON.stringify({
        result: data, // data is the original full ParseResult here
        newUnfollowers: finalNewUnf,
        kutuLoncat: finalKutuLoncat,
        isFirstScan: finalIsFirstScan
      }));
    } catch (e) {
      console.warn("Storage is full, cannot save session.");
    }
    
    // Multi-Account Support: Save to IndexedDB (No quota limits)
    if (data.ownerUsername) {
      await saveAccountScanToDB(data.ownerUsername, data, finalNewUnf, finalKutuLoncat, finalIsFirstScan);
      setTriggerRefresh(prev => prev + 1);
    }
    
    setParseCompleted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 text-zinc-900 font-sans relative">
      <div className="relative z-10 flex flex-col min-h-screen">
      <div className="print:hidden sticky top-0 z-[100]">
        <Header 
          showNav={status === 'idle'} 
          currentUsername={result?.ownerUsername || null}
          onSwitchAccount={handleSwitchAccount}
          triggerRefresh={triggerRefresh}
        />
      </div>
        
        <main className="flex-1 flex flex-col">
          {status === 'idle' && (
            <>
              {/* Clean Minimalist Hero */}
              <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 pt-10 pb-12 md:pb-20 gap-8 lg:gap-12">
                
                {/* Left Column */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center relative z-10 text-center lg:text-left lg:pr-4">
                  <h1 className="text-fluid-h1 font-black tracking-tight mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <span className="text-zinc-900">
                      {t('heroTitle1')}
                    </span>
                    <br />
                    <span className="text-zinc-900">
                      {t('heroTitle2')}
                    </span>
                  </h1>
                  
                  <p className="text-fluid-p text-zinc-600 max-w-xl leading-relaxed mx-auto lg:mx-0 font-light mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
                    {t('heroDesc')}
                  </p>

                  {/* Feature Checklist */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-nowrap items-center justify-center lg:justify-start gap-1 sm:gap-2 lg:gap-3 text-xs sm:text-sm font-medium text-zinc-700 w-full"
                  >
                    <div className="flex items-center gap-1 sm:gap-2 bg-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-zinc-200 shadow-sm whitespace-nowrap">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                      <span>{language === 'en' ? 'No Data Stored' : 'Data Aman'}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 bg-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-zinc-200 shadow-sm whitespace-nowrap">
                      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                      <span>{language === 'en' ? 'Instant Results' : 'Hasil Instan'}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 bg-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-zinc-200 shadow-sm whitespace-nowrap">
                      <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 shrink-0" />
                      <span>{language === 'en' ? 'Fully Private' : '100% Privat'}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-full lg:w-1/2 flex flex-col items-center lg:items-end justify-center relative z-10 mt-8 lg:mt-0"
                >
                  <div id="upload-section" className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden scroll-mt-24">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="relative z-10">
                      <ZipUploader onFileSelect={handleFile} />
                      
                      <div className="w-full mt-6 text-center">
                        <button 
                          onClick={handleDemo}
                          className="text-xs md:text-sm font-medium tracking-wider text-zinc-400 hover:text-emerald-400 transition-all underline underline-offset-4 decoration-zinc-700 hover:decoration-emerald-400"
                        >
                          {language === 'en' ? "View Live Demo" : "Lihat Contoh Hasil (Demo)"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
            {hasHistoryForDivider && <hr className="w-full border-zinc-300" />}

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-7xl mx-auto px-6 md:px-12"
            >
              <HistoryWidget onRestore={handleRestore} />
            </motion.div>
            
            <hr className="w-full border-zinc-300" />
            
            <div className="w-full flex justify-center py-6">
              <DummyAd variant="in-feed" className="!my-0 max-w-full" />
            </div>

            <hr className="w-full border-zinc-300" />

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
              <HowItWorks />
            </motion.div>

            <hr className="w-full border-zinc-300" />
            
            <div className="w-full flex justify-center py-6">
              <DummyAd variant="in-feed" className="!my-0 max-w-full" />
            </div>

            <hr className="w-full border-zinc-300" />

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
              <Features />
            </motion.div>

            <hr className="w-full border-zinc-300" />
            
            <div className="w-full flex justify-center py-6">
              <DummyAd variant="in-feed" className="!my-0 max-w-full" />
            </div>

            <hr className="w-full border-zinc-300" />

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
              <PrivacySection />
            </motion.div>

            <div className="w-full flex justify-center py-6">
              <DummyAd variant="in-feed" className="!my-0 max-w-full" />
            </div>

            <hr className="w-full border-zinc-300" />

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
              <PricingSection />
            </motion.div>

            <hr className="w-full border-zinc-300" />

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
              <FAQ />
            </motion.div>
          </>
        )}

        {status === 'loading' && (
          <div className="w-full flex justify-center pt-4 pb-8 md:pt-8 md:pb-20 px-6">
            <LoadingScreen 
              isReady={parseCompleted} 
              onContinue={() => setStatus('done')} 
            />
          </div>
        )}

        {status === 'done' && result && (
          <div className="w-full px-4 md:px-8 pt-8 pb-12 md:pb-20 max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6 items-start">
            <div className="flex-1 w-full flex flex-col gap-5 items-center min-w-0">
            <div className="w-full flex flex-wrap gap-4 justify-between items-center mb-2 print:hidden">
              <button 
                onClick={() => { setStatus('idle'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 font-medium transition-colors bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-sm hover:shadow"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}
              </button>

              <div className="flex bg-white p-1 rounded-lg border border-zinc-200 shadow-sm">
                <button 
                  onClick={() => setAccountMode('public')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${accountMode === 'public' ? 'bg-zinc-100 text-zinc-900 shadow-inner' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  <Globe className="w-3.5 h-3.5 inline mr-1.5"/>
                  {language === 'en' ? 'Public Mode' : 'Mode Publik'}
                </button>
                <button 
                  onClick={() => setAccountMode('private')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${accountMode === 'private' ? 'bg-zinc-100 text-zinc-900 shadow-inner' : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                  <Lock className="w-3.5 h-3.5 inline mr-1.5"/>
                  {language === 'en' ? 'Private Mode' : 'Mode Private'}
                </button>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6 pb-6 bg-white border border-zinc-200 rounded-xl p-6 md:p-8 shadow-sm"
            >
              <div>
                <h2 className="text-fluid-h2 font-black text-zinc-900 tracking-tight">
                  {result.ownerUsername ? `@${result.ownerUsername}` : t('summaryTitle')}
                </h2>
                <p className="text-xl text-zinc-600 font-light mt-4">
                  {result.ownerUsername ? `${t('summaryTitle')} • ${t('summaryDesc')}` : t('summaryDesc')}
                </p>
              </div>
              <div className="flex w-full lg:w-auto gap-2 md:gap-3 flex-col sm:flex-row print:hidden mt-2 lg:mt-0">
                <button 
                  onClick={() => setIsPdfModalOpen(true)}
                  className="w-full sm:w-auto px-4 lg:px-6 py-2.5 lg:py-3 text-xs lg:text-sm font-medium rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors shadow-sm flex items-center justify-center gap-1.5 lg:gap-2 whitespace-nowrap"
                >
                  <Printer className="w-4 h-4" />
                  {language === 'en' ? 'Save PDF' : 'Simpan PDF'}
                </button>
                <button 
                  onClick={resetApp}
                  className="w-full sm:w-auto px-4 lg:px-8 py-2.5 lg:py-3 text-xs lg:text-sm font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-sm whitespace-nowrap flex items-center justify-center"
                >
                  {t('checkAnotherBtn')}
                </button>
              </div>
            </motion.div>
            
            {/* Ad: Top Dashboard Leaderboard */}
            <div className="w-full flex justify-center pb-2">
              <DummyAd variant="in-feed" className="!my-0 max-w-full" />
            </div>

            {/* Fitur Baru: New Unfollowers Alert */}
            <NewUnfollowersAlert newUnfollowers={newUnfollowers} kutuLoncat={kutuLoncat} isFirstScan={isFirstScan} accountMode={accountMode} />

            {isDemo && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full bg-white bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 dark-no-gradient p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm gap-6 print:hidden relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Zap className="w-32 h-32 text-blue-600" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-2xl tracking-tight mb-2 flex items-center gap-3 text-blue-900 dark-title">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                    </span>
                    {language === 'en' ? "Demo Mode" : "Mode Demo"}
                  </h3>
                  <p className="text-base text-blue-700 dark-desc">{language === 'en' ? "This is sample data. Upload your own ZIP file to see real insights." : "Ini adalah contoh data acak. Unggah file ZIP Anda sendiri untuk melihat data asli."}</p>
                </div>
                <button 
                  onClick={() => { setStatus('idle'); setIsDemo(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="relative z-10 px-6 py-3 bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 dark-button-blue font-medium rounded-xl transition-colors shrink-0 shadow-sm"
                >
                  {language === 'en' ? "Upload My File" : "Unggah File Saya"}
                </button>
              </motion.div>
            )}
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full">
              <MetricCards 
                unfollowers={result.totalUnfollowersCount || result.unfollowers.length}
                fans={result.totalFansCount || result.fans.length}
                mutuals={result.followersCount > 0 ? (result.totalFansCount ? result.followersCount - result.totalFansCount : result.mutuals.length) : 0}
                accountMode={accountMode}
              />
            </motion.div>

            <div className="w-full flex flex-col md:flex-row gap-5 items-stretch">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full md:w-1/2 flex">
                <RelationshipPieChart 
                  unfollowers={result.totalUnfollowersCount || result.unfollowers.length}
                  fans={result.totalFansCount || result.fans.length}
                  mutuals={result.followersCount > 0 ? (result.totalFansCount ? result.followersCount - result.totalFansCount : result.mutuals.length) : 0}
                />
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full md:w-1/2 flex">
                <MutualStats data={result.mutualStats} />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full">
              <GrowthChart data={result.timeline} />
            </motion.div>
            
            {/* Ad: In-Article Divider */}
            <div className="w-full flex justify-center py-2">
              <DummyAd variant="in-feed" className="!my-0 max-w-full" />
            </div>

            <div className="w-full flex flex-col md:flex-row gap-5 items-stretch">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full md:w-1/2 flex">
                <AccountHealthRatio 
                  followers={result.followersCount} 
                  following={result.followingCount} 
                />
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full md:w-1/2 flex">
                <LoyalFollowers data={result.oldestFollowers} accountMode={accountMode} />
              </motion.div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-5 items-stretch">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full lg:w-3/5 flex">
                <CohortChart data={result.cohortData} />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full lg:w-2/5 flex">
                <SeasonalityRadar data={result.timeline} />
              </motion.div>
            </div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full">
              <PendingRequests data={result.pendingRequests} />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="w-full">
              <UserTable 
                unfollowers={result.unfollowers}
                fans={result.fans}
                mutuals={result.mutuals}
                ownerUsername={result.ownerUsername || 'my_account'}
                isPremium={isPremium}
                onUnlock={handleUnlock}
                totalUnfollowersCount={result.totalUnfollowersCount || result.unfollowers.length}
                totalFansCount={result.totalFansCount || result.fans.length}
                totalMutualsCount={result.totalMutualsCount || result.mutuals.length}
                accountMode={accountMode}
              />
            </motion.div>
            </div>
            
            {/* Sidebar Dummy Ad */}
            <div className="hidden xl:block w-[300px] sticky top-24 shrink-0 print:hidden">
              <DummyAd variant="sidebar" className="w-full h-full" />
            </div>
          </div>
        )}
        </main>
  
        <div className="print:hidden">
          <Footer />
        </div>

        {/* Floating Action Buttons (Global) */}
        {status === 'idle' && (
          <div className="fixed bottom-20 md:bottom-32 right-6 lg:right-12 z-[90] print:hidden flex flex-col gap-4 items-center">
            
            {/* Tombol Donasi (Kopi) */}
            <a 
              href="https://trakteer.id/393foru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden"
              title="Support Us"
            >
              <img 
                src="/coffee.png" 
                alt="Trakteer Coffee"
                className="w-full h-full object-cover"
              />
            </a>

            {/* Tombol Tutorial (Bantuan) */}
            <button 
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:bg-emerald-600 hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] active:scale-95 transition-all duration-200"
              aria-label="Tutorial"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
        )}

        <PDFDownloadModal 
          isOpen={isPdfModalOpen} 
          onClose={() => setIsPdfModalOpen(false)} 
          isPremium={isPremium} 
          data={result} 
          language={language as 'en' | 'id'} 
        />
      </div>
    </div>
  );
}
