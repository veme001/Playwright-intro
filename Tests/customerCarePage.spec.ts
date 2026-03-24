import { test, expect } from '@playwright/test';

test('submit a customer care request', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  await page.getByRole('link', { name: 'contact', exact: true }).click();
  await expect(page.locator('h1.title')).toContainText('Customer Care');

  await page.locator('#name').fill('Test Testesen');
  await page.locator('#email').fill('test.testesen@test.no');
  await page.locator('#phone').fill('12345678');
  await page.locator('#message').fill('I need help please');

  await page.locator('input[value="Send to Customer Care"]').click();
  await expect(page.locator('body')).toContainText('A Customer Care Representative will be contacting you');
});
