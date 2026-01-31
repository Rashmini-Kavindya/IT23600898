# Singlish to Sinhala Automation Suite

## Overview
Automated testing project using **Playwright** and **TypeScript** to verify phonetic translation.

## How it works
1. **Mimic Human Behavior**: Uses slow typing to trigger real-time translation logic.
2. **Smart Waiting**: Instead of static sleep, it waits for Sinhala characters to appear in the DOM.
3. **Data-Driven**: Runs multiple scenarios automatically from a JSON file.

## Key Code Logic
- **Typing**: `inputBox.type(data.input, { delay: 150 })`
- **Assertion**: `await expect(outputContainer).toContainText(/[\u0D80-\u0DFF]/)`

## Commands
- Run Tests: `npx playwright test --project=chromium`
- View Report: `npx playwright show-report`
