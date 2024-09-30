import { Button } from "./Button";
import { render } from "vitest-browser-react";

describe("Button", () => {
  it("renders correctly", async () => {
    const screen = render(<Button>Submit</Button>);

    await expect.element(screen.getByText("Submit")).toBeVisible();

    expect(screen.container.firstChild).toMatchSnapshot();
  });
});
