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
      
      // අකුරෙන් අකුර type කිරීම
      await inputBox.pressSequentially(data.input, { delay: 100 });

      const outputContainer = page.locator('div.w-full.h-80.whitespace-pre-wrap').first();

      // සිංහල අකුරු එනකම් පොඩ්ඩක් ඉන්න
      await expect(outputContainer).toContainText(/[\u0D80-\u0DFF]/, { timeout: 20000 });

      // මෙතනදී අපි නොපෙනෙන අකුරු අයින් කරලා සසඳනවා
      const actualOutput = (await outputContainer.innerText()).trim();
      
      // Normalize function එකක් පාවිච්චි කරමු invisible characters අයින් කරන්න
      const cleanActual = actualOutput.replace(/[\u200B-\u200D\uFEFF]/g, '');
      const cleanExpected = data.expected.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');

      console.log(`ID: ${data.id} | Expected: ${cleanExpected} | Actual: ${cleanActual}`);

      // දැන් සසඳන්න
      expect(cleanActual).toContain(cleanExpected);
    });
  });
});