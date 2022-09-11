import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

const scenarios = [
  {
    label: "Home Page",
    path: "/",
  },
  {
    label: "Blog",
    path: "/blog/analyzing-search-performance",
  },
];

for (const scenario of scenarios) {
  test(scenario.label, async ({ page }, testInfo) => {
    await page.goto(scenario.path);

    await page.waitForLoadState("networkidle");
    await page.screenshot({
      fullPage: true,
      path: `./tests/${scenario.label}-${testInfo.project.name.replace(
        ":",
        "-"
      )}.png`,
    });
    await expect(page).toHaveScreenshot({
      // fullPage: true,
    });
  });
}
