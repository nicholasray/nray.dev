import { render } from "vitest-browser-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";

function ThemeSelect() {
  return (
    <Select>
      <SelectTrigger showIcon={false} className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}

it("renders correctly", async () => {
  const screen = render(<ThemeSelect />);

  await expect.element(screen.getByRole("combobox")).toBeInTheDocument();

  expect(screen.container).toMatchSnapshot();
});
