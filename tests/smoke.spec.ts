import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

const viewports = [640, 768, 1024, 1280, 1536];
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
  for (const vw of viewports) {
    test.use({
      viewport: {
        width: vw,
        height: 1000,
      },
    });

    test(`${scenario.label}-${vw}`, async ({ page }) => {
      await page.goto(scenario.path);

      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot();
    });
  }
}
