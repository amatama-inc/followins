self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch to allow PWA installation (requires basic fetch handler)
self.addEventListener('fetch', (event) => {
  // We can just pass through requests since Next.js handles caching well,
  // but having a fetch listener is required by some browsers to qualify as a PWA.
  return;
});

// Handle periodic background sync for notifications
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-reminder') {
    event.waitUntil(checkAndShowReminder());
  }
});

async function checkAndShowReminder() {
  // Since we can't access localStorage directly in Service Worker,
  // we could use IndexedDB. But for a simple offline reminder,
  // we'll just show the notification if the sync triggers.
  // In a real scenario, we'd check IndexedDB for the last upload date.
  
  const title = 'Waktunya Cek Instagram Kamu!';
  const options = {
    body: 'Sudah cukup lama sejak terakhir kali kamu mengecek siapa yang unfollow. Yuk periksa sekarang!',
    icon: '/icon.png',
    badge: '/icon.png',
    vibrate: [100, 50, 100],
    data: {
      url: '/'
    }
  };

  self.registration.showNotification(title, options);
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // If a window is already open, focus it
      for (let i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
