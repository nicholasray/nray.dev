import { expect, test } from "@playwright/test";

test("App loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Nicholas Ray");
});

test("Blog archive loads", async ({ page }) => {
  await page.goto("/blog/");
  await expect(page).toHaveTitle("Blog — Nicholas Ray");
  await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
  await expect(
    page.getByRole("link").filter({ hasText: /\S/ }),
  ).not.toHaveCount(0);
});
