import { test, expect } from '@playwright/test';
import testData from '../testData.json';

test.describe('Singlish to Sinhala Automation', () => {

  testData.forEach((data) => {
    test(`Testing Case: ${data.id}`, async ({ page }) => {

      // Page එක load වෙනකම් බලා සිටීම
      await page.goto('https://www.swifttranslator.com/', {
        waitUntil: 'networkidle', // මුළු page එකම load වෙනකම් ඉන්න
      });

      const inputBox = page.getByPlaceholder('Input Your Singlish Text Here.');
      
      // කලින් තිබ්බ text clear කරගැනීම
      await inputBox.fill('');
      
      // අකුරෙන් අකුර type කිරීම (delay එක CI වලට ඉතා වැදගත්)
      await inputBox.pressSequentially(data.input, { delay: 200 });

      // Output එක ලැබෙන div එක සරලව තෝරා ගැනීම
      const outputContainer = page.locator('div.w-full.h-80.whitespace-pre-wrap').first();

      // සිංහල අකුරු ලැබෙනකම් මුලින්ම check කරන්න
      await expect(outputContainer).toContainText(/[\u0D80-\u0DFF]/, { timeout: 30000 });

      // Assertion: ලැබුණු output එක අපේ expected අගයට සමානදැයි බැලීම
      // .toHaveText පාවිච්චි කිරීමෙන් Playwright එක මීට වඩා බලාපොරොත්තු සහගතව වැඩ කරයි
      await expect(outputContainer).toContainText(data.expected.trim(), { 
        timeout: 15000 
      });

      // Debugging logs (GitHub Actions logs වල බලාගත හැක)
      const actualOutput = (await outputContainer.innerText()).trim();
      console.log(`Case ID : ${data.id}`);
      console.log(`Input   : ${data.input}`);
      console.log(`Expected: ${data.expected}`);
      console.log(`Actual  : ${actualOutput}`);
    });
  });

});