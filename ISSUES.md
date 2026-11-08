---
title: Issues
description: Issues observed in the AutomationExercise website and test environment
---

## Documented Issues

### Signup form does not validate ZIP code and phone number

**Description:** The signup form appears to accept invalid ZIP code and phone
number values without displaying field validation.

**Found by:** Exploratory testing of the account registration form.

**Reproduction:** Open the signup form, enter invalid values in the ZIP code and
phone number fields, and submit the form. The values are accepted without a
validation message.

**Reproducible:** Yes, according to the observed behavior.

### Dev site intermittently displays a queue-full page

**Description:** The dev site sometimes displays its queue-full page instead of
the homepage. This prevents UI tests from proceeding and appears to be an
environment-capacity issue rather than a test assertion failure.

**Found by:** Playwright UI test runs against the dev environment.

**Reproduction:** Run `npm run test:ui` against dev while the site is under
heavy load. The homepage may display the queue-full message. The UI setup
retries a limited number of times, then reports an environment failure if the
message remains.

**Reproducible:** Intermittently.
