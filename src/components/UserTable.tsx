"use client";

import { useState, useMemo, useEffect } from 'react';
import { Lock, X, Filter, CheckSquare, Square, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import PaywallModal from './PaywallModal';
import { useLanguage } from '@/i18n/LanguageContext';
import { getUserLabels, saveUserLabel } from '@/utils/storage';
import UserListItem from './UserListItem';
import { useUserFilter } from '@/hooks/useUserFilter';
import DummyAd from './DummyAd';
import React from 'react';

interface UserTableProps {
  unfollowers: string[];
  fans: string[];
  ownerUsername: string;
  isPremium: boolean;
  onUnlock: () => void;
  totalUnfollowersCount: number;
  totalFansCount: number;
  mutuals: string[];
  totalMutualsCount: number;
  accountMode?: 'public' | 'private';
}

export default function UserTable({ unfollowers, fans, mutuals, ownerUsername, isPremium, onUnlock, totalUnfollowersCount, totalFansCount, totalMutualsCount, accountMode = 'public' }: UserTableProps) {
  const { t, formatCompactNumber, language } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'unfollowers' | 'fans' | 'mutuals'>('unfollowers');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editInputValue, setEditInputValue] = useState("");
  
  // CRM Features State
  const [labelFilter, setLabelFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkLabelValue, setBulkLabelValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"random" | "asc" | "desc">("random");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Subsets are handled by the parent component now
  // We use unfollowers and fans directly as they are already filtered if not premium

  useEffect(() => {
    if (ownerUsername) {
      setLabels(getUserLabels(ownerUsername));
    }
  }, [ownerUsername]);

  const handleSaveLabel = (user: string, overrideLabel?: string) => {
    let trimmed = (overrideLabel !== undefined ? overrideLabel : editInputValue).trim();
    if (trimmed === "") {
      trimmed = "Unfollow";
    }
    
    saveUserLabel(ownerUsername, user, trimmed);
    setLabels(prev => {
      const next = { ...prev };
      next[user] = trimmed;
      return next;
    });
    setEditingUser(null);
  };

  const currentList = activeTab === 'unfollowers' ? unfollowers : (activeTab === 'fans' ? fans : mutuals);
  
  const currentTotalCount = activeTab === 'unfollowers' ? totalUnfollowersCount : (activeTab === 'fans' ? totalFansCount : totalMutualsCount);
  const totalHidden = Math.max(0, currentTotalCount - currentList.length);
  
  const { realFilteredCount, displayList } = useUserFilter({
    currentList,
    labels,
    labelFilter,
    searchQuery,
    sortBy,
    currentTotalCount,
  });
  
  const presetOptions = useMemo(() => {
    const defaults = language === 'en' 
      ? ['Unfollowed', 'Ignore', 'Friend'] 
      : ['Unfollow', 'Abaikan', 'Teman'];
    const existingLabels = Array.from(new Set(Object.values(labels).filter(l => l.trim() !== '')));
    return Array.from(new Set([...defaults, ...existingLabels])).slice(0, 6);
  }, [labels, language]);
  
  const uniqueLabelsUsed = useMemo(() => {
    return Array.from(new Set(Object.values(labels).filter(l => l.trim() !== '')));
  }, [labels]);
  


  const labeledCount = currentList.filter(u => !!labels[u]).length;
  const progressPercent = currentList.length > 0 ? Math.round((labeledCount / currentList.length) * 100) : 0;

  const handleSortChange = (val: string) => {
    setCurrentPage(1);
    if ((val === 'asc' || val === 'desc') && !isPremium) {
      setIsModalOpen(true);
      setSortBy('random');
      return;
    }
    setSortBy(val as "random" | "asc" | "desc");
  };

  const handleTabChange = (tab: 'unfollowers' | 'fans' | 'mutuals') => {
    setActiveTab(tab);
    setLabelFilter('all');
    setSearchQuery('');
    setSelectedUsers([]);
    setCurrentPage(1);
  };

  const toggleSelect = (user: string) => {
    setSelectedUsers(prev => prev.includes(user) ? prev.filter(u => u !== user) : [...prev, user]);
  };
  
  const selectAll = () => {
    if (selectedUsers.length === displayList.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers([...displayList]);
    }
  };

  const applyBulkLabel = () => {
    let trimmed = bulkLabelValue.trim();
    if (trimmed === "") {
      trimmed = "Unfollow";
    }
    
    selectedUsers.forEach(user => {
      saveUserLabel(ownerUsername, user, trimmed);
    });
    
    setLabels(prev => {
      const next = { ...prev };
      selectedUsers.forEach(user => {
        next[user] = trimmed;
      });
      return next;
    });
    
    setSelectedUsers([]);
    setBulkLabelValue("");
  };

  const handlePaymentSuccess = async (tier: 'premium' | 'premium+' = 'premium') => {
    setIsModalOpen(false);
    if (tier === 'premium+') {
      const { activatePremiumPlus } = await import('@/utils/storage');
      activatePremiumPlus();
    }
    onUnlock();
  };

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm flex flex-col h-full relative z-10">
      
      <div className="flex flex-row w-full border-b border-zinc-200 bg-zinc-50 overflow-x-auto hide-scrollbar">
        {[
          {
            id: 'unfollowers',
            label: 'Unfollowers',
            count: totalUnfollowersCount,
            activeClass: 'bg-white text-zinc-900 shadow-[inset_0_-2px_0_0_#52525b]',
            countClass: 'text-zinc-400'
          },
          {
            id: 'fans',
            label: accountMode === 'private' ? (language === 'en' ? 'Lurkers' : 'Penyusup') : 'Fans',
            count: totalFansCount,
            activeClass: 'bg-white text-teal-600 shadow-[inset_0_-2px_0_0_#14b8a6]',
            countClass: 'text-teal-400'
          },
          {
            id: 'mutuals',
            label: 'Mutuals',
            count: totalMutualsCount,
            activeClass: 'bg-white text-indigo-600 shadow-[inset_0_-2px_0_0_#4f46e5]',
            countClass: 'text-indigo-400',
            noBorder: true
          }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 min-w-max px-4 sm:min-w-[120px] py-3 md:py-4 text-center font-bold text-xs sm:text-sm md:text-lg transition-colors whitespace-nowrap ${!tab.noBorder ? 'border-r border-zinc-200' : ''} ${
              activeTab === tab.id ? tab.activeClass : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
            }`}
            onClick={() => handleTabChange(tab.id as 'unfollowers' | 'fans' | 'mutuals')}
          >
            {tab.label} <span className={`font-mono text-[10px] sm:text-xs md:text-sm ml-1 ${tab.countClass}`}>({formatCompactNumber(tab.count)})</span>
          </button>
        ))}
      </div>
      
      <div className="p-6 md:p-10 relative flex-1 flex flex-col">
        {selectedUsers.length > 0 && (
          <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[100] bg-zinc-900 text-white p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl border border-zinc-700 md:min-w-[600px]">
            {/* Close button - Absolute on mobile, inline on desktop */}
            <button 
              onClick={() => setSelectedUsers([])}
              className="absolute top-3 right-3 md:static md:top-auto md:right-auto p-1.5 md:p-2 bg-zinc-800 md:bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-700 md:hover:bg-transparent rounded-lg transition-colors order-first md:order-last"
              title={language === 'en' ? "Cancel selection" : "Batal pilih"}
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="flex items-center gap-3 pr-8 md:pr-0 w-full md:w-auto">
              <span className="font-mono bg-zinc-800 px-2.5 py-1 rounded-lg text-zinc-300 font-bold shrink-0">{selectedUsers.length}</span>
              <span className="font-medium text-sm truncate">{language === 'en' ? 'Accounts Selected' : 'Akun Dipilih'}</span>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input 
                type="text"
                placeholder={language === 'en' ? "Type a label..." : "Ketik label..."}
                className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm flex-1 min-w-0 md:w-64 focus:outline-none focus:border-teal-500"
                value={bulkLabelValue}
                onChange={(e) => setBulkLabelValue(e.target.value)}
              />
              <button 
                onClick={applyBulkLabel}
                className="bg-teal-600 hover:bg-teal-500 text-white px-3 py-2 md:px-4 rounded-lg text-sm font-medium transition-colors shrink-0"
              >
                {language === 'en' ? 'Apply' : 'Terapkan'}
              </button>
            </div>
          </div>
        )}

        {/* Gamification Progress Bar */}
        <div className="mb-8 w-full">
          <div className="flex justify-between items-end mb-2 gap-2">
            <div className="min-w-0">
              <h4 className="font-bold text-zinc-800 text-fluid-widget-title truncate">
                {language === 'en' ? 'Cleanup Progress' : 'Progres Beres-beres'}
              </h4>
              <p className="text-[11px] sm:text-xs md:text-sm text-zinc-500 line-clamp-2 leading-tight">
                {language === 'en' 
                  ? `${labeledCount} of ${currentList.length} accounts labeled`
                  : `${labeledCount} dari ${currentList.length} akun telah dilabeli`}
              </p>
            </div>
            <span className="font-mono font-black text-teal-600 text-2xl md:text-3xl shrink-0">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-teal-500 h-2.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-zinc-200 pb-4 relative z-10">
          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-base text-zinc-600 font-light flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <span>{t('showing')}</span> 
              <span className="text-lg md:text-xl font-bold font-mono text-zinc-900">{formatCompactNumber(displayList.length)}</span> 
              <span>{t('from')}</span> 
              <span className="font-medium font-mono text-zinc-900">{formatCompactNumber(realFilteredCount)}</span> 
              <span>{t('accounts')}</span>
            </p>
            <div className="flex items-center gap-2 text-sm">
              <button 
                onClick={selectAll}
                className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 font-medium transition-colors"
              >
                {selectedUsers.length === displayList.length && displayList.length > 0 ? <CheckSquare className="w-4 h-4 text-teal-600" /> : <Square className="w-4 h-4" />}
                {language === 'en' ? 'Select All' : 'Pilih Semua'}
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder={language === 'en' ? "Search user..." : "Cari user..."}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-9 p-2.5"
              />
            </div>

            {/* Grid Container for Dropdowns on Mobile, Flex on Desktop */}
            <div className="grid grid-cols-2 gap-3 w-full md:flex md:flex-row md:w-auto">
              {/* Filter Dropdown */}
              <div className="flex items-center gap-2 w-full">
                <Filter className="w-4 h-4 text-zinc-400 hidden md:block" />
                <select 
                  className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-[13px] md:text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 font-medium cursor-pointer"
                  value={labelFilter}
                  onChange={(e) => {
                    setLabelFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">{language === 'en' ? 'All Accounts' : 'Semua Akun'}</option>
                  <option value="unlabeled">{language === 'en' ? 'No Label' : 'Tanpa Label'}</option>
                  {uniqueLabelsUsed.length > 0 && <optgroup label="Labels">
                    {uniqueLabelsUsed.map((lbl, i) => (
                      <option key={i} value={lbl}>{lbl}</option>
                    ))}
                  </optgroup>}
                </select>
              </div>

              {/* Sort Dropdown */}
              <select 
                className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-[13px] md:text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 font-medium cursor-pointer"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="random">{language === 'en' ? 'Random' : 'Acak (Bawaan)'}</option>
                <option value="asc">{language === 'en' ? 'A to Z' : 'A sampai Z'}{!isPremium && ' 🔒'}</option>
                <option value="desc">{language === 'en' ? 'Z to A' : 'Z sampai A'}{!isPremium && ' 🔒'}</option>
              </select>
            </div>
          </div>
          
          {!isPremium && totalHidden > 0 && (
            <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full uppercase tracking-wider hidden md:block">
              {t('maxRandomFree')}
            </span>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
          {displayList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((user, idx) => {
            const actualIndex = (currentPage - 1) * itemsPerPage + idx;
            const isEditing = editingUser === user;
            const currentLabel = labels[user];
            const isSelected = selectedUsers.includes(user);
            
            return (
              <React.Fragment key={actualIndex}>
                <UserListItem 
                  index={actualIndex + 1}
                  user={user}
                  isEditing={isEditing}
                  currentLabel={currentLabel}
                  isSelected={isSelected}
                  isPremium={isPremium}
                  presetOptions={presetOptions}
                  editInputValue={editInputValue}
                  language={language}
                  onEditChange={setEditInputValue}
                  onSetEditing={setEditingUser}
                  onSaveLabel={handleSaveLabel}
                  onToggleSelect={toggleSelect}
                  onOpenModal={() => setIsModalOpen(true)}
                />
                {(idx + 1) % 5 === 0 && (
                  <li className="col-span-full py-2 md:py-4">
                    <DummyAd variant="in-feed" />
                  </li>
                )}
              </React.Fragment>
            );
          })}
          
          {/* Skeleton Dummy Data untuk Anti-F12 Rule */}
          {!isPremium && totalHidden > 0 && Array.from({ length: 4 }).map((_, i) => (
             <li key={`dummy-${i}`} className="px-5 py-4 bg-zinc-50 border border-zinc-200 border-dashed rounded-xl flex items-center gap-3 select-none opacity-50 shadow-sm">
               <span className="text-xs text-zinc-400 font-mono w-6 text-right select-none">~</span>
               <Lock size={16} className="text-zinc-400" />
               <span className="h-4 w-24 bg-zinc-200 rounded-md"></span>
             </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        {displayList.length > itemsPerPage && (
          <div className="flex items-center justify-between mt-8 border-t border-zinc-200 pt-6">
            <span className="text-sm text-zinc-500 font-medium hidden sm:inline-block">
              {language === 'en' ? 'Showing' : 'Menampilkan'} <span className="font-bold text-zinc-900">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-bold text-zinc-900">{Math.min(currentPage * itemsPerPage, displayList.length)}</span> {language === 'en' ? 'of' : 'dari'} <span className="font-bold text-zinc-900">{displayList.length}</span> {language === 'en' ? 'accounts' : 'akun'}
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden min-[360px]:inline">{language === 'en' ? 'Prev' : 'Sebelumnya'}</span>
              </button>
              <span className="text-xs sm:text-sm text-zinc-500 font-medium sm:hidden whitespace-nowrap px-1">
                {currentPage} / {Math.ceil(displayList.length / itemsPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(Math.ceil(displayList.length / itemsPerPage), p + 1))}
                disabled={currentPage >= Math.ceil(displayList.length / itemsPerPage)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden min-[360px]:inline">{language === 'en' ? 'Next' : 'Selanjutnya'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {!isPremium && totalHidden > 0 && (
          <div className="mt-12 text-center p-5 sm:p-8 md:p-10 bg-white border border-zinc-200 rounded-2xl md:rounded-3xl relative overflow-hidden z-10 shadow-lg">
            <Lock className="mx-auto text-zinc-400 mb-4 opacity-80" size={48} />
            <h4 className="text-2xl sm:text-fluid-h2 font-black font-mono text-zinc-900 mb-3 tracking-tight leading-tight break-words">{t('hiddenNames1')} <span className="text-teal-600">{formatCompactNumber(totalHidden)}</span> {t('hiddenNames2')}</h4>
            <p className="text-sm sm:text-fluid-p text-zinc-600 font-light max-w-2xl mx-auto mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('hiddenDesc') }} />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-4 py-3 sm:px-8 sm:py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium shadow-sm transition-colors text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 mx-auto"
            >
              <Lock size={18} className="sm:w-5 sm:h-5 shrink-0" />
              <span>{t('unlockAll')}</span>
            </button>
          </div>
        )}
      </div>

      <PaywallModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
