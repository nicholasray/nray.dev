import clsx from "clsx";

const colors = {
  darkGray: "text-gray-700",
  lightGray: "text-gray-400",
};

interface ParagraphProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ElementType<any>;
  className?: string;
  color?: keyof typeof colors;
  children: React.ReactNode;
}

function Paragraph({
  as: Component = "p",
  className = "",
  color = "darkGray",
  ...props
}: ParagraphProps) {
  return (
    <Component
      className={clsx(
        "mt-6 max-w-xl text-lg font-medium",
        colors[color],
        className
      )}
      {...props}
    />
  );
}

export default Paragraph;
