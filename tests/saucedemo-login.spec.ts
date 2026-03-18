import { test, expect } from '@playwright/test';
import path from 'path';
import * as XLSX from 'xlsx';

interface LoginRow {
  username: string;
  password: string;
  expectedResult: 'success' | 'error' | 'locked';
}

function readLoginData(): LoginRow[] {
  const excelPath = path.resolve(__dirname, '..', 'LoginData.xlsx');
  const workbook = XLSX.readFile(excelPath);

  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];

  const rawRows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  return rawRows.map((row) => {
    const username = row.Username ?? row.username;
    const password = row.Password ?? row.password;
    const expected = (row.ExpectedResult ?? row.expectedResult ?? 'success') as LoginRow['expectedResult'];

    return {
      username: String(username),
      password: String(password),
      expectedResult: expected,
    };
  });
}

const loginData = readLoginData();

if (loginData.length === 0) {
  test('saucedemo login – no Excel rows found', async () => {
    throw new Error(
      'No rows found in LoginData.xlsx. Ensure it has at least one data row with Username, Password and ExpectedResult columns.'
    );
  });
} else {
  for (const { username, password, expectedResult } of loginData) {
    test(`saucedemo login – ${username} – ${expectedResult}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');

      await page.getByPlaceholder('Username').fill(username);
      await page.getByPlaceholder('Password').fill(password);
      await page.getByRole('button', { name: 'Login' }).click();

      if (expectedResult === 'success') {
        // Successful login should navigate to the products inventory page
        await expect(page).toHaveURL(/.*inventory\.html/);
      } else {
        // For invalid or locked users we expect an error message on the login page
        const errorLocator = page.locator('[data-test="error"]');
        await expect(errorLocator).toBeVisible();
      }
    });
  }
}
