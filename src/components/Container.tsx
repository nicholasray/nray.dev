import clsx from "clsx";

interface ContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ElementType<any>;
  className?: string;
  children: React.ReactNode;
}

function Container({
  as: Component = "div",
  className = "",
  ...props
}: ContainerProps) {
  return (
    <Component className={clsx("mx-auto max-w-7xl", className)} {...props} />
  );
}

export default Container;
