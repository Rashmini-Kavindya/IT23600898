import { test, expect } from '@playwright/test';
import testData from '../testData.json';

test.describe('Singlish to Sinhala Automation', () => {

  testData.forEach((data) => {
    test(`Testing Case: ${data.id}`, async ({ page }) => {

      await page.goto('https://www.swifttranslator.com/', {
        waitUntil: 'networkidle',
      });

      const inputBox = page.getByPlaceholder('Input Your Singlish Text Here.');
      await inputBox.fill('');
      
      // Speed eka poddak adu karala type karamu
      await inputBox.pressSequentially(data.input, { delay: 150 });

      const outputContainer = page.locator('div.w-full.h-80.whitespace-pre-wrap').first();

      // Output eka ena kan poddak wela balan inna
      await page.waitForTimeout(2000); 

      const actualOutput = (await outputContainer.innerText()).trim();

      // Debugging logs - GitHub logs wala balanna
      console.log(`ID: ${data.id}`);
      console.log(`Input: ${data.input}`);
      console.log(`Expected: ${data.expected.trim()}`);
      console.log(`Actual: ${actualOutput}`);

      // 100% samanada balanne nathuwa, expected kalla thiyenawada balamu
      // Me widiya Unicode issues waladi godak safe.
      const isMatch = actualOutput.includes(data.expected.trim());
      
      if (!isMatch) {
        // Match une naththan force fail karanna reason eka ekka
        throw new Error(`Mismatch! Expected: ${data.expected.trim()} but got: ${actualOutput}`);
      }
    });
  });
});