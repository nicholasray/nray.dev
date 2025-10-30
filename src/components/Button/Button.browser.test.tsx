import { Button } from "./Button";
import { render } from "vitest-browser-react";

it("renders correctly", async () => {
  const screen = await render(<Button>Submit</Button>);

  await expect.element(screen.getByText("Submit")).toBeInTheDocument();

  expect(screen.container).toMatchSnapshot();
});
