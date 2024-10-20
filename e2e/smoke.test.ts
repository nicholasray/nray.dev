import { expect, test } from "@playwright/test";

test("App loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Nicholas Ray");
});
