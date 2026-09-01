import { CheckSquare, Square, Tag, Check, X } from 'lucide-react';
import { getLabelColor, getColorClasses } from '@/utils/labelColors';

interface UserListItemProps {
  index: number;
  user: string;
  isEditing: boolean;
  currentLabel?: string;
  isSelected: boolean;
  isPremium: boolean;
  presetOptions: string[];
  editInputValue: string;
  language: string;
  onEditChange: (val: string) => void;
  onSetEditing: (user: string | null) => void;
  onSaveLabel: (user: string, preset?: string) => void;
  onToggleSelect: (user: string) => void;
  onOpenModal: () => void;
}

export default function UserListItem({
  index,
  user,
  isEditing,
  currentLabel,
  isSelected,
  isPremium,
  presetOptions,
  editInputValue,
  language,
  onEditChange,
  onSetEditing,
  onSaveLabel,
  onToggleSelect,
  onOpenModal
}: UserListItemProps) {
  const badgeColor = currentLabel ? getLabelColor(currentLabel) : 'teal';
  const badgeClasses = currentLabel ? getColorClasses(badgeColor) : '';

  return (
    <li className={`bg-white border rounded-xl hover:shadow-sm transition-all group flex flex-col justify-center min-h-[72px] overflow-hidden ${isSelected ? 'border-teal-400 ring-1 ring-teal-400 bg-teal-50/10' : 'border-zinc-200 hover:border-zinc-300'}`}>
      {isEditing ? (
        <div className="p-3 flex flex-col gap-2 bg-zinc-50 h-full w-full justify-center">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              autoFocus
              className="flex-1 text-xs border border-zinc-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
              placeholder={language === 'en' ? "Add label..." : "Beri label..."}
              value={editInputValue}
              onChange={(e) => onEditChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSaveLabel(user);
                if (e.key === 'Escape') onSetEditing(null);
              }}
            />
            <button onClick={() => onSaveLabel(user)} className="p-1.5 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors shrink-0">
              <Check className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onSetEditing(null)} className="p-1.5 bg-zinc-200 text-zinc-600 rounded-md hover:bg-zinc-300 transition-colors shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {presetOptions.map((preset, pIdx) => (
              <button 
                key={pIdx}
                onClick={() => onSaveLabel(user, preset)}
                className="text-[9px] px-1.5 py-0.5 bg-white border border-zinc-200 text-zinc-500 rounded hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-3.5 flex flex-col gap-1.5 w-full relative">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-zinc-400 font-mono text-xs lg:hidden shrink-0">{index}.</span>
              <button 
                onClick={() => onToggleSelect(user)}
                className={`shrink-0 z-20 transition-colors ${isSelected ? 'opacity-100 text-teal-600' : 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 text-zinc-300 hover:text-zinc-500'}`}
              >
                {isSelected ? <CheckSquare className="w-4.5 h-4.5" /> : <Square className="w-4.5 h-4.5" />}
              </button>
              <a 
                href={`https://instagram.com/${user}`} 
                target="_blank" 
                rel="noreferrer" 
                onClick={(e) => {
                    if (!isPremium) {
                      const today = new Date().toISOString().split('T')[0];
                      const key = `followins_clicked_users_${today}`;
                      let clickedUsers: string[] = [];
                      try {
                        clickedUsers = JSON.parse(sessionStorage.getItem(key) || '[]');
                      } catch (_) {}
                      
                      const hasClickedBefore = clickedUsers.includes(user);
                      
                      if (!hasClickedBefore && clickedUsers.length >= 100) {
                        e.preventDefault();
                        onOpenModal();
                      } else if (!hasClickedBefore) {
                        clickedUsers.push(user);
                        sessionStorage.setItem(key, JSON.stringify(clickedUsers));
                      }
                    }
                  }}
                className="block text-sm md:text-base font-medium text-zinc-800 hover:text-teal-600 font-mono truncate transition-colors"
              >
                @{user}
              </a>
            </div>
            <button 
              onClick={() => {
                onSetEditing(user);
                onEditChange(currentLabel || "");
              }}
              className={`p-1.5 rounded-md transition-colors shrink-0 ${currentLabel ? 'opacity-100 text-teal-600 hover:bg-teal-50' : 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}
              title={language === 'en' ? 'Add/Edit Label' : 'Tambah/Edit Label'}
            >
              <Tag className="w-4 h-4" />
            </button>
          </div>
          
          {currentLabel && (
            <div className="pl-6 pr-2 w-full">
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 border rounded-full truncate max-w-full ${badgeClasses}`}>
                {currentLabel}
              </span>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
