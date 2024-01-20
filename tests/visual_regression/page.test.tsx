import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true,
});
test.describe("pages were not modified", () => {
  test('Main page was not modified', async ({ page }) => {
    await page.goto('https://localhost:3000');
    await expect(page.getByRole("heading", {name: "Articles"})).toHaveScreenshot();
  });
  
  test('Create blog page was not modified', async ({ page }) => {
    await page.goto('https://localhost:3000/post/create');
    await expect(page).toHaveScreenshot({mask: [page.getByRole("heading")]});
  });
});