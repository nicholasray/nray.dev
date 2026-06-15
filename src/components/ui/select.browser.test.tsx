import { render } from "vitest-browser-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

function ThemeSelect() {
  return (
    <Select items={items}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

it("renders correctly", async () => {
  const screen = await render(<ThemeSelect />);

  await expect.element(screen.getByRole("combobox")).toBeInTheDocument();

  expect(screen.container).toMatchSnapshot();
});

it("opens and selects an option", async () => {
  const screen = await render(<ThemeSelect />);

  await screen.getByRole("combobox").click();
  await screen.getByRole("option", { name: "Dark" }).click();

  await expect.element(screen.getByRole("combobox")).toHaveTextContent("Dark");
});
