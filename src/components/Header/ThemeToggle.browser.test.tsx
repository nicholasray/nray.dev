import { render } from "vitest-browser-react";

import ThemeToggle from "./ThemeToggle";

it("renders an accessible theme selector", async () => {
  localStorage.clear();

  const screen = await render(<ThemeToggle />);

  await expect
    .element(screen.getByRole("combobox", { name: "Toggle theme" }))
    .toBeInTheDocument();
});
