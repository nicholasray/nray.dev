import { expect, test } from "@playwright/test";

test("App loads", async ({ page }) => {
  await page.goto("/");

  expect(page).toHaveTitle("Nicholas Ray");
});
