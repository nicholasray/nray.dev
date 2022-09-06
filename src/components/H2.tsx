import clsx from "clsx";

const colors = {
  darkGray: "text-gray-900",
  white: "text-white",
};

interface HeadingProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ElementType<any>;
  className?: string;
  color?: keyof typeof colors;
  children: React.ReactNode;
}

function H2({
  as: Component = "h2",
  className = "",
  color = "darkGray",
  ...props
}: HeadingProps) {
  return (
    <Component
      className={clsx(
        "text-3xl font-extrabold tracking-tight sm:text-4xl",
        colors[color],
        className
      )}
      {...props}
    />
  );
}

export default H2;
