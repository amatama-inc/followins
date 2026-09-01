import { useMemo } from 'react';
import { deobfuscate } from '@/utils/crypto';

interface UseUserFilterProps {
  currentList: string[];
  labels: Record<string, string>;
  labelFilter: string;
  searchQuery: string;
  sortBy: "random" | "asc" | "desc";
  currentTotalCount: number;
}

export function useUserFilter({
  currentList,
  labels,
  labelFilter,
  searchQuery,
  sortBy,
  currentTotalCount,
}: UseUserFilterProps) {
  const applyLabelFilter = (list: string[]) => {
    if (labelFilter === 'unlabeled') {
      return list.filter(u => !labels[u]);
    } else if (labelFilter !== 'all') {
      return list.filter(u => labels[u] === labelFilter);
    }
    return list;
  };

  const filteredList = useMemo(() => {
    let list = applyLabelFilter([...currentList]);
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(u => deobfuscate(u).toLowerCase().includes(q));
    }
    return list;
  }, [currentList, labels, labelFilter, searchQuery]);

  const realFilteredCount = useMemo(() => {
    if (searchQuery.trim() === '') {
      if (labelFilter === 'all') return currentTotalCount;
      if (labelFilter === 'unlabeled') {
        const labeledCount = Object.keys(labels).length;
        return Math.max(0, currentTotalCount - labeledCount);
      }
      return currentList.filter(u => labels[u] === labelFilter).length;
    }
    
    const list = applyLabelFilter([...currentList]);
    const q = searchQuery.toLowerCase();
    let matches = 0;
    for (let i = 0; i < list.length; i++) {
      if (deobfuscate(list[i]).toLowerCase().includes(q)) matches++;
    }
    return matches;
  }, [currentList, labels, labelFilter, searchQuery, currentTotalCount]);

  const displayList = useMemo(() => {
    const listToSort = [...filteredList];
    
    if (sortBy === 'asc') {
      listToSort.sort((a, b) => deobfuscate(a).localeCompare(deobfuscate(b)));
    } else if (sortBy === 'desc') {
      listToSort.sort((a, b) => deobfuscate(b).localeCompare(deobfuscate(a)));
    } else {
      // eslint-disable-next-line react-hooks/purity
      listToSort.sort(() => 0.5 - Math.random());
    }
    
    return listToSort.map(deobfuscate);
  }, [filteredList, sortBy]);

  return { filteredList, realFilteredCount, displayList };
}
