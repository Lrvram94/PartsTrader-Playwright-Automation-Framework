import type { APIRequestContext, TestInfo } from '@playwright/test';
import { environment } from '../../config/environment';

export async function skipIfEnvironmentUnreachable(
  request: APIRequestContext,
  testInfo: TestInfo,
): Promise<void> {
  try {
    await request.get(environment.baseURL, { timeout: 10_000 });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);

    const message = `Selected environment "${environment.name}" at ${environment.baseURL} is unreachable: ${reason}`;
    process.stderr.write(`${message}\n`);

    if (process.env.CI) {
      throw new Error(message);
    }

    testInfo.skip(true, message);
  }
}