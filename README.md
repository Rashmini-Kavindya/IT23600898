# Singlish to Sinhala Translation - Automated Test Suite

This repository contains an automated testing framework designed to evaluate the accuracy of a Singlish to Sinhala translation frontend. The test suite covers various linguistic categories, including question forms, slang, digital terms, and mixed-language inputs.

## 🚀 Overview

The primary goal of this project is to automate the validation of 50+ test cases using **Playwright** and **Python**. The script reads test data from an Excel file, interacts with the web interface, and records the actual output and pass/fail status back into the Excel sheet.

## 🛠️ Prerequisites

Before running the automation script, ensure you have the following installed:
* Python 3.8+
* Playwright (`pip install playwright`)
* Pandas & Openpyxl (`pip install pandas openpyxl`)

## 📂 Project Structure

* `IT23600898_test_automation.py`: The core Python script for UI automation.
* `IT23600898_Test cases.xlsx`: Excel file containing Input, Expected Output, and results.
* `README.md`: Project documentation.

## ⚙️ Execution Instructions

To run the full test suite, use the following command in your terminal:

```powershell
python IT23600898_test_automation.py --excel "D:\IT23600898\IT23600898_Test cases.xlsx" --input-col "Input" --expected-col "Expected output" --wait-ms 10000 --save-every 1 --slow-mo-ms 500
