import { test, expect } from '@playwright/test';
import testData from '../testData.json';

test.describe('Singlish to Sinhala Automation', () => {

  testData.forEach((data) => {
    test(`Testing Case: ${data.id}`, async ({ page }) => {

      await page.goto('https://www.swifttranslator.com/', {
        waitUntil: 'domcontentloaded',
      });

   
      const inputBox = page.getByPlaceholder('Input Your Singlish Text Here.');
      await inputBox.click();
      await inputBox.fill('');

    
      await inputBox.type(data.input, { delay: 150 });

      
      const outputContainer = page
        .getByText('Sinhala', { exact: true })
        .locator('xpath=ancestor::div[contains(@class,"grid")]')
        .locator('div.w-full.h-80.whitespace-pre-wrap')
        .first();

    
      await expect(outputContainer).toContainText(
        /[\u0D80-\u0DFF]/,
        { timeout: 20000 }
      );

      await page.waitForTimeout(500);

      const actualOutput = (await outputContainer.innerText()).trim();

      console.log(`ID: ${data.id}`);
      console.log(`Expected: ${data.expected}`);
      console.log(`Actual  : ${actualOutput}`);

      expect(actualOutput).toContain(data.expected.trim());
    });
  });

});
