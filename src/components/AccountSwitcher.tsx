import { useState, useEffect, useRef } from 'react';
import { Users, ChevronDown, Trash2, CheckCircle2 } from 'lucide-react';
import { getAllStoredAccounts, deleteAccountScanFromDB } from '@/utils/indexedDB';
import { useLanguage } from '@/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface AccountSwitcherProps {
  currentUsername: string | null;
  onSwitchAccount: (username: string) => void;
  triggerRefresh: number;
}

export default function AccountSwitcher({ currentUsername, onSwitchAccount, triggerRefresh }: AccountSwitcherProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [accounts, setAccounts] = useState<{username: string, lastScanDate: number}[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      const stored = await getAllStoredAccounts();
      setAccounts(stored);
    };
    fetchAccounts();
  }, [triggerRefresh, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async (e: React.MouseEvent, username: string) => {
    e.stopPropagation();
    if (confirm('Delete this account data from device?')) {
      await deleteAccountScanFromDB(username);
      setAccounts(prev => prev.filter(a => a.username !== username));
      if (currentUsername === username) {
        window.location.reload();
      }
    }
  };

  if (accounts.length === 0) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
        title="Switch Account"
      >
        <Users size={16} className="text-zinc-600 dark:text-zinc-400" />
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 max-w-[100px] truncate">
          {currentUsername ? `@${currentUsername}` : 'Accounts'}
        </span>
        <ChevronDown size={14} className="text-zinc-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Saved Accounts ({accounts.length})</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {accounts.map(acc => (
                <div 
                  key={acc.username}
                  onClick={() => {
                    onSwitchAccount(acc.username);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 transition-colors"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold text-xs">
                      {acc.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">@{acc.username}</span>
                      <span className="text-[10px] text-zinc-500">
                        {new Date(acc.lastScanDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {currentUsername === acc.username && (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    )}
                    <button 
                      onClick={(e) => handleDelete(e, acc.username)}
                      className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors"
                      title="Remove Account"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
