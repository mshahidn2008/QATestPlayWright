import { test, expect } from '@playwright/test';

test.describe('Tricentis Vehicle Data Form Validation', () => {
  test('should successfully fill and submit vehicle data form', async ({ page }) => {
    // Navigate to the application
    await page.goto('https://sampleapp.tricentis.com/102/app.php');
    
    // Verify page loaded correctly
    await expect(page).toHaveTitle(/Tricentis Vehicle Insurance - Enter Vehicle Data/);
    
    // Fill Make dropdown
    await page.locator('#make').selectOption(['BMW']);
    
    // Fill Model dropdown
    await page.locator('#model').selectOption(['Scooter']);
    
    // Fill Cylinder Capacity
    await page.locator('#cylindercapacity').fill('2000');
    
    // Fill Engine Performance
    await page.locator('#engineperformance').fill('100');
    
    // Fill Date of Manufacture
    await page.getByRole('textbox', { name: 'MM/DD/YYYY' }).fill('01/15/2020');
    
    // Select Number of Seats
    await page.locator('#numberofseats').selectOption(['5']);
    
    // Select Right Hand Drive
    await page.getByRole('paragraph').getByText('Yes').click();
    
    // Select Number of Seats for Motorcycle
    await page.locator('#numberofseatsmotorcycle').selectOption(['2']);
    
    // Select Fuel Type
    await page.locator('#fuel').selectOption(['Petrol']);
    
    // Fill Payload
    await page.locator('#payload').fill('500');
    
    // Fill Total Weight
    await page.locator('#totalweight').fill('1500');
    
    // Fill List Price
    await page.locator('#listprice').fill('35000');
    
    // Fill License Plate Number
    await page.locator('#licenseplatenumber').fill('ABC-1234');
    
    // Fill Annual Mileage
    await page.locator('#annualmileage').fill('12000');
    
    // Click Next button to submit form
    await page.getByRole('button', { name: 'Next »' }).click();
    
    // Verify navigation to next page
    await expect(page).toHaveTitle(/Tricentis Vehicle Insurance - Enter Insurant Data/);
  });

  test('should validate all form fields are present', async ({ page }) => {
    await page.goto('https://sampleapp.tricentis.com/102/app.php');
    
    // Verify all form fields are visible
    await expect(page.locator('#make')).toBeVisible();
    await expect(page.locator('#model')).toBeVisible();
    await expect(page.locator('#cylindercapacity')).toBeVisible();
    await expect(page.locator('#engineperformance')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'MM/DD/YYYY' })).toBeVisible();
    await expect(page.locator('#numberofseats')).toBeVisible();
    await expect(page.locator('#fuel')).toBeVisible();
    await expect(page.locator('#listprice')).toBeVisible();
    await expect(page.locator('#licenseplatenumber')).toBeVisible();
    await expect(page.locator('#annualmileage')).toBeVisible();
  });

  test('should validate dropdown options', async ({ page }) => {
    await page.goto('https://sampleapp.tricentis.com/102/app.php');
    
    // Verify Make dropdown has expected options
    await expect(page.locator('#make option[value="BMW"]')).toHaveCount(1);
    await expect(page.locator('#make option[value="Audi"]')).toHaveCount(1);
    await expect(page.locator('#make option[value="Ford"]')).toHaveCount(1);
    await expect(page.locator('#make option[value="Honda"]')).toHaveCount(1);
    await expect(page.locator('#make option[value="Mercedes Benz"]')).toHaveCount(1);
    
    // Verify Fuel Type dropdown has expected options
    await expect(page.locator('#fuel option[value="Petrol"]')).toHaveCount(1);
    await expect(page.locator('#fuel option[value="Diesel"]')).toHaveCount(1);
    await expect(page.locator('#fuel option[value="Electric Power"]')).toHaveCount(1);
    await expect(page.locator('#fuel option[value="Gas"]')).toHaveCount(1);
  });
});
