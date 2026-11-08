---
title: PartsTrader Playwright Automation Framework
description: Playwright and TypeScript UI and API tests for AutomationExercise
---

## Overview

Playwright and TypeScript automation for AutomationExercise. The framework
covers two UI checkout scenarios and four verifyLogin API scenarios. Faker
provides dynamic test data, and environment settings support dev and test.

## Test Coverage

* UI Test Case 14: Register while checking out
* UI Test Case 15: Register before checkout
* API 7-10: verifyLogin success, missing parameter, unsupported method, and
  invalid credentials

## Project Structure

```text
.
|-- .github/
|   \-- workflows/
|       \-- playwright.yml
|-- config/
|   \-- environment.ts
|-- pages/
|   |-- home-page.ts
|   |-- payment-page.ts
|   \-- signup-page.ts
|-- tests/
|   |-- api-tests/
|   |   \-- api-tests.test.ts
|   |-- data/
|   |   \-- test-data.ts
|   |-- helpers/
|   |   |-- api-account.ts
|   |   |-- complete-order.ts
|   |   |-- environment-availability.ts
|   |   \-- register-user.ts
|   \-- ui-tests/
|       \-- place-order.test.ts
|-- .env.example
|-- GETTING_STARTED.md
|-- package.json
|-- package-lock.json
|-- playwright.config.ts
|-- tsconfig.json
\-- biome.json
```

## Setup and Usage

See [GETTING_STARTED.md](GETTING_STARTED.md) for prerequisites, local
environment setup, and instructions for running the tests. See [ISSUES.md](ISSUES.md)
for issues found during the exercise.
