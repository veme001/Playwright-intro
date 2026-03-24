import { test, expect } from '@playwright/test';

test.describe('Parabank logged in core features', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');

        await page.locator('input[name="username"]').fill('testesenTest');
        await page.locator('input[name="password"]').fill('tester');
        await page.locator('input[value="Log In"]').click();

        const logoutLink = page.getByRole('link', { name: 'Log Out', exact: true });

        if (!(await logoutLink.isVisible().catch(() => false))) {
        await registerAccount(page);
        }

        await expect(logoutLink).toBeVisible();
    })

    test.afterEach(async ({page}) => {
        await page.getByRole('link', { name: 'Log Out', exact: true }).click();
        await expect(page.locator('input[value="Log In"]')).toBeVisible();
    })

    test('Open new account', async ({page}) => {
        await page.locator('a[href="openaccount.htm"]').click();
        await page.locator('#type').selectOption('0');
        await page.locator('input[value="Open New Account"]').click();

        await expect(page.locator('body')).toContainText('Congratulations, your account is now open.');
    })

    test('Pay bill', async ({page}) => {
        await page.locator('a[href="billpay.htm"]').click();
        await page.locator('input[name="payee.name"]').fill('Test AS');
        await page.locator('input[name="payee.address.street"]').fill('Testcorner 112');
        await page.locator('input[name="payee.address.city"]').fill('Testerdam');
        await page.locator('input[name="payee.address.state"]').fill('Test City');
        await page.locator('input[name="payee.address.zipCode"]').fill('9010');
        await page.locator('input[name="payee.phoneNumber"]').fill('483849923');
        await page.locator('input[name="payee.accountNumber"]').fill('4893423');
        await page.locator('input[name="verifyAccount"]').fill('4893423');
        await page.locator('input[name="amount"]').fill('1000');
        await page.locator('input[value="Send Payment"]').click();

        await expect(page.locator('body')).toContainText('Bill Payment Complete');
        })

        test('Transfer funds between to accounts', async ({page}) => {
        await page.locator('a[href="transfer.htm"]').click();
        await page.locator('#amount').fill('100');
 

        await expect(page.locator('body')).toContainText('Bill Payment Complete');
        })

})

async function registerAccount(page: any) {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await page.locator('a[href="register.htm"]').click();
        const username = Date.now()
        const phoneNumber = Date.now() / 10
        const ssn = Date.now()


        await page.locator('#customer\\.firstName').fill('Test');
        await page.locator('#customer\\.lastName').fill('Testesen');
        await page.locator('#customer\\.address\\.street').fill('Testveien 1');
        await page.locator('#customer\\.address\\.city').fill('Oslo');
        await page.locator('#customer\\.address\\.state').fill('Oslo');
        await page.locator('#customer\\.address\\.zipCode').fill('0001');
        await page.locator('#customer\\.phoneNumber').fill(`${phoneNumber}`);
        await page.locator('#customer\\.ssn').fill(`${ssn}`);
        await page.locator('#customer\\.username').fill(`${username}`);
        await page.locator('#customer\\.password').fill('tester');
        await page.locator('#repeatedPassword').fill('tester');

        await page.locator('input[value="Register"]').click();
    }