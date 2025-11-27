# testLeverX

Autotests for SauceDemo web application. Tests are written in TypeScript and use the Playwright framework. Tests can be run locally or in the cloud via GitHub Actions.

## Running tests locally

### 0. Install Node.js

Ensure Node.js and npm are installed on your system:

```bash
node -v
npm -v
```

If Node.js is not installed, download and install it from the official website: https://nodejs.org/

### 1. Navigate to project directory

Navigate to the testLeverX project directory:

```bash
cd testLeverX
```

### 2. Install Playwright

Install Playwright browsers:

```bash
npx playwright install
```

### 3. Run tests

Run all tests using the command from package.json:

```bash
npm test
```

### 4. View report

After running tests, if report is not opened automatically, you can open it:

```bash
npm run report
```

## Running tests in GitHub Actions

Tests can be run in the cloud via GitHub Actions without any local setup required.

### 1. Run workflow

1. Go to the workflows page: https://github.com/amurQA/testLeverX/actions/workflows/playwright.yml
2. Click **"Tests for LeverX"**
3. Click **"Run workflow"** and run it for main branch

### 2. View results and download report

1. After the workflow run completes, go to the specific run page
2. For example: https://github.com/amurQA/testLeverX/actions/runs/19722660826
3. In the **"Artifacts"** section, find the `playwright-report` artifact
4. Click on the artifact to download it
5. Extract the archive and open the `index.html` file in your browser to view the report

## Architecture

### 1. Test automation approach

Uses Page Object Model (POM) approach for organizing tests and improving code maintainability. Steps-based approach to debug easier.

### 2. Test organization

Tests are organized by functionality:

- `login.spec.ts` - authentication tests
- `buy.spec.ts` - purchase process tests
- `sort.spec.ts` - product sorting tests

### 3. Data management

Test data is stored in the `tests/test-data/` folder:

- `users.json` - user data for testing

### 4. Page Objects

Page Objects are located in the `tests/page-objects/` folder:

- `basePage.ts` - base class for all pages
- `loginPage.ts` - login page
- `inventoryPage.ts` - product catalog page
- `cartPage.ts` - shopping cart page
- `checkoutInfoPage.ts` - checkout information page
- `checkoutOverviewPage.ts` - checkout overview page
- `checkoutCompletePage.ts` - checkout complete page
- `pageManager.ts` - manager for all pages

### 5. Configuration

Test configuration is managed by the `playwright.config.ts` file. Tests are configured to work with base URL: `https://www.saucedemo.com/`

Tests run in parallel to speed up execution. In CI, 3 workers are used, locally - 4. When running in CI, retries are enabled on failure.
