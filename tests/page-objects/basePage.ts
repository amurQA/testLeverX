import { test } from "../fixtures/test-options.ts";
import { expect } from "@playwright/test";
import users from "../test-data/users.json";

import type { Page } from "@playwright/test";

export type UserData = {
  login: string;
  password: string;
};

export class BasePage {
  constructor(public readonly page: Page) {}

  getUserInfo(name: string): UserData {
    // For reviewers: at real app it is better to hold passwords in github secrets
    expect(users, "Expect that data is set for the test").toBeDefined();
    const resultedUser = users.find((arg: UserData) => arg?.login === name);
    expect(
      resultedUser,
      `Expect that needed user '${name}' is present in the test data`
    ).toBeDefined();
    return resultedUser!;
  }

  @step(() => `Open application`)
  async openApp() {
    await this.page.goto("");
    await this.page.waitForLoadState();
  }
}

export const stepCounter = {
  counter: 0,
};

/**
 * This function is a decorator for methods in Page Object Models (POM) classes to add a step name
 * @param stepNameTemplate - function that returns a step name, accepts method arguments
 * @returns wrapped with test.step test activities
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we need to use any here because of the way we use template functions with any arguments
export function step(stepNameTemplate: (...args: any[]) => string) {
  // return decorator function to change the test function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we need to use any here because of the way we use the decorator
  return function decorator(target: (...args: any[]) => any) {
    // return changed function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async function (this: unknown, ...args: any[]) {
      stepCounter.counter += 1;
      const stepName = stepNameTemplate(args);
      test.info().annotations.push({
        type: `step #${stepCounter.counter}`,
        description: stepName,
      });

      // wrapping the target function with special test.step function
      return await test.step(stepName, async () => {
        // calling the target function with correct 'this'
        return await target.call(this, ...args);
      });
    };
  };
}
