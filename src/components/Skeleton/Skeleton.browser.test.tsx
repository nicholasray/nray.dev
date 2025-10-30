import { render } from "vitest-browser-react";
import { Skeleton } from "./Skeleton";

it("renders correctly", async () => {
  const screen = await render(<Skeleton data-testid="skeleton" />);

  await expect.element(screen.getByTestId("skeleton")).toBeInTheDocument();

  expect(screen.container).toMatchSnapshot();
});
