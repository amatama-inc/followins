import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.followins.mobile',
  appName: 'Followins',
  webDir: 'out',
  server: {
    // This points directly to the main domain to integrate the Next.js app in the mobile webview.
    // Replace with the actual production URL, e.g., 'https://followins.app'
    url: 'https://followins.my.id',
    cleartext: true
  }
};

export default config;
