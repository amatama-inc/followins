import { ParseResult } from './instagramParser';

const DB_NAME = 'FollowinsDB';
const STORE_NAME = 'AccountScans';
const DB_VERSION = 1;

export interface StoredAccount {
  username: string;
  lastScanDate: number;
  data: ParseResult;
  newUnfollowers: string[];
  kutuLoncat: string[];
  isFirstScan: boolean;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('IndexedDB is not available on server side'));
      return;
    }
    
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Error opening IndexedDB'));
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'username' });
      }
    };
  });
};

export const saveAccountScanToDB = async (username: string, data: ParseResult, newUnfollowers: string[], kutuLoncat: string[], isFirstScan: boolean): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const storedAccount: StoredAccount = {
        username,
        lastScanDate: Date.now(),
        data,
        newUnfollowers,
        kutuLoncat,
        isFirstScan
      };

      const request = store.put(storedAccount);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to save account scan'));
    });
  } catch (error) {
    console.error('saveAccountScanToDB error:', error);
  }
};

export const getAccountScanFromDB = async (username: string): Promise<StoredAccount | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(username);
      
      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result as StoredAccount | undefined;
        resolve(result || null);
      };
      
      request.onerror = () => reject(new Error('Failed to get account scan'));
    });
  } catch (error) {
    console.error('getAccountScanFromDB error:', error);
    return null;
  }
};

export const getAllStoredAccounts = async (): Promise<Pick<StoredAccount, 'username' | 'lastScanDate'>[]> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      
      request.onsuccess = (event) => {
        const results = (event.target as IDBRequest).result as StoredAccount[];
        const accounts = results.map(r => ({
          username: r.username,
          lastScanDate: r.lastScanDate
        }));
        accounts.sort((a, b) => b.lastScanDate - a.lastScanDate);
        resolve(accounts);
      };
      
      request.onerror = () => reject(new Error('Failed to get all accounts'));
    });
  } catch (error) {
    console.error('getAllStoredAccounts error:', error);
    return [];
  }
};

export const deleteAccountScanFromDB = async (username: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(username);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to delete account scan'));
    });
  } catch (error) {
    console.error('deleteAccountScanFromDB error:', error);
  }
};