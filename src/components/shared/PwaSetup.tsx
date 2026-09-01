'use client';

import { useEffect } from 'react';

export default function PwaSetup() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register Service Worker
      navigator.serviceWorker.register('/sw.js').then(async (registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
        
        // Request Notification Permission
        if ('Notification' in window && Notification.permission === 'default') {
          // We can politely ask for permission
          // In a real app, this should be tied to a user action (like clicking a button)
          // to avoid being blocked by the browser. 
          // For now, we'll try to request it after a short delay.
          setTimeout(() => {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                console.log('Notification permission granted.');
                setupPeriodicSync(registration);
              }
            });
          }, 5000);
        } else if ('Notification' in window && Notification.permission === 'granted') {
          setupPeriodicSync(registration);
        }
      }).catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
    }

    // Client-side fallback check for reminder (if PWA is open but background sync isn't supported)
    checkLocalReminder();
  }, []);

  const setupPeriodicSync = async (registration: ServiceWorkerRegistration) => {
    // Attempt to register periodic background sync if supported
    if ('periodicSync' in registration) {
      try {
        const status = await navigator.permissions.query({
          name: 'periodic-background-sync' as PermissionName,
        });
        
        if (status.state === 'granted') {
          // Register sync for every ~30 days (in milliseconds)
          // Note: Browsers severely limit this based on site engagement.
          await (registration as any).periodicSync.register('check-reminder', {
            minInterval: 30 * 24 * 60 * 60 * 1000, 
          });
          console.log('Periodic sync registered!');
        }
      } catch (error) {
        console.error('Periodic sync could not be registered:', error);
      }
    }
  };

  const checkLocalReminder = () => {
    // If it's been > 30 days since the last visit/upload, trigger a local notification directly if open
    try {
      const lastVisit = localStorage.getItem('followins_last_visit');
      const now = Date.now();
      
      if (lastVisit) {
        const daysPassed = (now - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24);
        if (daysPassed > 30 && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('Waktunya Cek Instagram Kamu!', {
            body: 'Sudah lebih dari 1 bulan sejak terakhir kali kamu mengecek siapa yang unfollow. Yuk periksa sekarang!',
            icon: '/icon.png',
          });
          // Update the visit time so we don't spam
          localStorage.setItem('followins_last_visit', now.toString());
        }
      } else {
        // First visit
        localStorage.setItem('followins_last_visit', now.toString());
      }
    } catch (e) {
      console.error('Failed to check local reminder', e);
    }
  };

  return null; // This component has no UI
}
