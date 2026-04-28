# UWO Mealplan Calc

## Overview
Chrome extension for students to track meal plan spending and project remaining balances with budget recommendations.

## Category
Tools, Browser Extension, Student Utility

## Status
Portfolio Project (Shipped on Chrome Web Store)

## Tech Stack
- JavaScript
- Chrome Extension API (Manifest V3)
- HTML, CSS
- Chrome Storage API

## Description

A Chrome extension that helps Western University students track and manage their meal plan spending throughout the academic year.

### Key Features

1. **Dynamic Tender Detection**
   - Automatically detects all tender types from transaction history
   - Supports Residence Dollars, Flex Dollars, Campus Dollars, etc.

2. **Real-Time Analysis**
   - Spending analysis generated automatically on meal plan history page
   - No manual data entry required

3. **Daily Spending Tracking**
   - Average daily spending per tender type
   - Trend analysis over time

4. **Projected Balance**
   - Remaining balance projection by end of academic year
   - Based on current spending patterns

5. **Target Recommendations**
   - Daily spending targets to finish on budget
   - Alerts for overspending

6. **Visual Chart**
   - Interactive 30-day spending chart
   - Daily spending patterns visualization

7. **Persistent Settings**
   - Starting balances saved automatically
   - Preferences remembered across sessions
   - Smart defaults (ResDlrs $2,750, Flex $550)

8. **Flexible Time Periods**
   - Calculate based on past month or all-time spending
   - Adjustable date ranges

### How It Works

1. Scans transaction table to detect tender types
2. Calculates current balance and spending patterns
3. Projects balance at end of academic year
4. Provides daily spending recommendations
5. Displays visual chart of last 30 days

### Technical Details

- **Manifest Version**: 3
- **Permissions**: Storage (for preferences)
- **Content Script**: Injected on mealplan.uwo.ca pages
- **Storage**: Chrome local storage API
- **Privacy**: No data collection or transmission, all local

### Settings

- Year Start Date (default: Sept 1, 2025)
- Year End Date (default: Apr 30, 2026)
- Starting Balances per tender type
- Past Month/All Time toggle

## Why It Matters
- Demonstrates browser extension development
- Shows practical utility tool creation
- Evidence of shipping to production (Chrome Web Store)
- Solves real problem for students

## Links
- Chrome Web Store: https://chromewebstore.google.com/detail/uwo-mealplan-calc/ligfhpfnfnmkmoloelfpcjpeajifkmpo
- GitHub: https://github.com/HasNate618/UWO-Mealplan-Calculator

## Media
- Settings View
- Projections Dashboard

---

*This project is good for web development, browser extension, and utility tool roles. It demonstrates ability to identify real problems and ship practical solutions.*
