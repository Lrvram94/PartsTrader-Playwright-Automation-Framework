---
title: Getting Started
description: Set up the PartsTrader Playwright framework, configure an environment, and run its UI and API tests
ms.date: 2026-11-07
ms.topic: tutorial
---

## Purpose

Use this guide to set up the Playwright framework locally, select a target
environment, and run the UI and API tests.

## Getting the Latest Code

Clone the repository and enter its directory:

```bash
git clone https://github.com/Lrvram94/PartsTrader-Playwright-Automation-Framework.git
cd PartsTrader-Playwright-Automation-Framework
```

To update an existing clone:

```bash
git pull origin main
```

## Setting Up the Environment

Install Node.js 22.x and npm. Then install the project dependencies and
Playwright browser binaries:

```bash
npm ci
npx playwright install chromium firefox
```

Copy `.env.example` to `.env` in the repository root.

In Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

On macOS or Linux:

```bash
cp .env.example .env
```

Open `.env` and replace the password placeholders with the exercise-provided
passwords. The template defaults `TEST_ENV` to `dev`; set it to `test` to use
the test environment. The URL override variables may be left blank to use the
configured defaults.

The `.env` file is ignored by Git. Do not commit passwords or other secrets.

There is no application to deploy locally. This repository contains the test
framework; its tests run against the external AutomationExercise website.

## Running the Tests

Run all tests:

```bash
npm test
```

Run only the UI suite or the API suite:

```bash
npm run test:ui
npm run test:api
```

The UI tests run in Chromium and Firefox. The API tests run once in the
browser-free `api` project using Playwright's request fixture.

To run the UI suite in Chromium only:

```bash
npm run test:ui -- --project=chromium
```

To run the UI suite in headed mode:

```bash
npm run test:headed
```

Run the TypeScript check and lint:

```bash
npm run typecheck
npm run lint
```

Playwright creates an HTML report after a run. Open it with:

```bash
npx playwright show-report
```

## Choosing an Environment

Locally, set `TEST_ENV` in `.env` to `dev` or `test`. The framework selects
the matching URL and password variables:

* `dev` uses `DEV_URL` and `DEV_PASSWORD`
* `test` uses `TEST_URL` and `TEST_PASSWORD`

If an optional URL variable is missing, the configured default URL is used.
The matching password variable is required.

In GitHub Actions, open **Actions**, select **Playwright Checks**, then select
**Run workflow**. Choose a test suite (`all`, `ui`, or `api`) and environment
(`dev` or `test`).

The workflow reads `DEV_URL`, `DEV_PASSWORD`, `TEST_URL`, and `TEST_PASSWORD`
from repository Actions secrets. Pushes and pull requests targeting `main`
run the full suite against `dev` by default.

## Test Coverage

The UI suite implements AutomationExercise Test Cases 14 and 15: registering
during checkout and registering before checkout. Page objects in `pages/`
contain UI locators. Shared registration and order helpers are in
`tests/helpers/`.

The API suite implements verifyLogin API cases 7 through 10. API 7 creates an
account before checking valid credentials and attempts to delete it afterward.
The API requests use form encoding as required by the exercise.

Faker generates unique signup details and synthetic payment information.
The selected products are fixed so the cart scenarios use predictable catalog
items.

## Troubleshooting

If startup reports a missing password, confirm that the matching password
variable is present in `.env`. For example, `TEST_ENV=test` requires
`TEST_PASSWORD`.

If the selected site cannot be reached because of a DNS, connection, or timeout
failure, the reachability check skips the test and prints the environment,
URL, and network error. A skipped test did not verify the application behavior.

The UI setup retries the queue-full page a limited number of times. If the
queue remains full, the test reports an environment failure.

For issues observed during the exercise, see [ISSUES.md](ISSUES.md).

The exercise describes the test environment as non-working. Use `dev` for
normal test runs unless you are specifically checking environment selection.

GitHub does not provide repository Actions secrets to workflows triggered by
pull requests from forks. Those runs cannot authenticate using the configured
environment passwords.