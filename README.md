Singlish to Sinhala Translation Automation (TypeScript)
This project is a professional automated testing suite developed using Playwright and TypeScript. It validates the translation accuracy of the Swift Translator web platform.

 Project Objective
The goal is to ensure that phonetic Singlish input is correctly transformed into Sinhala script through a Data-Driven Testing (DDT) approach.

 Key Technical Solutions (The Fixes)
During the initial execution, the test captured English text instead of Sinhala. I implemented the following best practices to solve this:

1. Human-like Sequential Typing
Standard fill() commands are too fast for the website's conversion engine. I used inputBox.type() with a 150ms delay to simulate human typing, which triggers the JavaScript-based translation logic.

2. Intelligent Syncing (Web-First Assertions)
Since the translation happens asynchronously, I used a Regex-based assertion:

Wait Logic: The script waits for the output container to contain Sinhala Unicode characters [\u0D80-\u0DFF].

Timeout: A 20-second timeout was added to handle slow network responses or server-side delays.

3. Advanced Locators
The output is not in a standard textarea. I used a relative locator to target the specific div holding the Sinhala result based on its proximity to the "Sinhala" heading.

Project Structure
tests/singlish_test.spec.ts: Contains the test logic and smart waiting mechanisms.

testData.json: Stores all 34+ test cases including ID, Input, and Expected result.

playwright.config.ts: Configured for Headed Mode, Screenshots, and Trace collection for easy debugging.

 How to Run
Install dependencies: npm install

Run tests: npx playwright test --project=chromium

View Report: npx playwright show-report
