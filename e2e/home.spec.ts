import { test, expect } from '@playwright/test';

test.describe('Home Page - Quality & Functional', () => {
  test('should load the homepage and display the hero section', async ({ page }) => {
    await page.goto('/');

    // Check title or main heading
    const heroTitle1 = page.locator('h1').first();
    await expect(heroTitle1).toBeVisible();

    // Check feature checklist items
    await expect(page.getByText('Instant Results').or(page.getByText('Hasil Instan'))).toBeVisible();
    await expect(page.getByText('Fully Private').or(page.getByText('100% Privat'))).toBeVisible();
  });

  test('should open the demo dashboard when clicking Demo Mode', async ({ page }) => {
    await page.goto('/');

    // Wait for Next.js to fully hydrate the page before interacting
    await page.waitForTimeout(2000);

    // Wait for the button to be visible and stable
    const demoButton = page.getByRole('button', { name: /View Live Demo|Lihat Contoh Hasil/i });
    await expect(demoButton).toBeVisible();
    await demoButton.click();

    // Assert that the loading screen appears
    const terminalHeader = page.getByText(/Terminal - /i);
    await expect(terminalHeader).toBeVisible({ timeout: 5000 });

    // Wait for the Continue button to become enabled after 8 seconds of demo loading
    // Using a more lenient selector
    const continueBtn = page.locator('button', { hasText: /Continue|Lanjutkan/i });
    await expect(continueBtn).toBeEnabled({ timeout: 15000 });
    await continueBtn.click({ force: true });

    // The app sets status to 'done', showing the dashboard
    const demoBannerText = page.getByText(/Demo Mode|Mode Demo/i);
    await expect(demoBannerText).toBeVisible({ timeout: 5000 });

    // Verify some metrics in dashboard
    await expect(page.getByText('unfollower_user_0')).toBeVisible({ timeout: 10000 });
  });

  test('language switch functionality', async ({ page }) => {
    await page.goto('/');
    
    const langSwitcher = page.locator('button').filter({ hasText: /ID|EN/ });
    if (await langSwitcher.count() > 0) {
      await langSwitcher.first().click();
      // Should show the localized text (use first() to avoid strict mode violations)
      await expect(page.getByText(/Followins/).first()).toBeVisible();
    }
  });
});
