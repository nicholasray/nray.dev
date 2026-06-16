import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";

import HeaderNav from "./HeaderNav";

it("opens and closes the mobile navigation menu", async () => {
  const screen = await render(<HeaderNav />);
  const menuButton = screen.getByRole("button", {
    name: "Open navigation menu",
  });

  await expect.element(menuButton).toHaveAttribute("aria-expanded", "false");

  await menuButton.click();

  await expect.element(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect
    .element(screen.getByRole("dialog"))
    .toHaveAttribute("id", "mobile-navigation");
  const mobileNavigation = screen.getByRole("navigation", {
    name: "Mobile navigation",
  });

  await expect
    .element(mobileNavigation.getByRole("link", { name: "Posts" }))
    .toBeInTheDocument();
  await expect
    .element(mobileNavigation.getByRole("link", { name: "Launch Audit" }))
    .toBeInTheDocument();
  await expect
    .element(mobileNavigation.getByRole("link", { name: "About" }))
    .toBeInTheDocument();

  await screen.getByRole("button", { name: "Close navigation menu" }).click();

  await expect.element(screen.getByRole("dialog")).not.toBeInTheDocument();
});

it("closes the mobile navigation menu with escape", async () => {
  const screen = await render(<HeaderNav />);

  await screen.getByRole("button", { name: "Open navigation menu" }).click();
  await expect.element(screen.getByRole("dialog")).toBeInTheDocument();

  await userEvent.keyboard("{Escape}");

  await expect.element(screen.getByRole("dialog")).not.toBeInTheDocument();
});
