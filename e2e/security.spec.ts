import { test, expect } from '@playwright/test';

test.describe('Security & Performance Checks', () => {
  test('should have basic security headers', async ({ request }) => {
    const response = await request.get('/');
    expect(response.ok()).toBeTruthy();
    
    const headers = response.headers();
    
    // Check for some common security headers that might be configured in Next.js
    // Note: In local dev, some headers might be missing unless explicitly added in next.config.ts
    // We just assert they don't leak server information like X-Powered-By if disabled
    expect(headers['x-powered-by']).toBeUndefined(); // Next.js disables this by default usually if configured
  });

  test('should not store sensitive files globally', async ({ page }) => {
    // Attempting to access an env file should return 404
    const response = await page.request.get('/.env');
    expect(response.status()).toBe(404);
  });
  
  test('should safely handle invalid routes', async ({ page }) => {
    const response = await page.request.get('/api/does-not-exist');
    expect(response.status()).toBe(404);
  });
});
