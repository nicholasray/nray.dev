import clsx from "clsx";

export enum Breakpoint {
  xs,
  sm,
  md,
  lg,
  xl,
  "2xl",
}

interface ViewportPaddingProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ElementType<any>;
  /** The minimum breakpoint at which padding will be applied. */
  breakpoint?: Breakpoint;
  className?: string;
  children: React.ReactNode;
}

function ViewportPadding({
  as: Component = "div",
  breakpoint: breakpoint = Breakpoint.xs,
  className = "",
  ...props
}: ViewportPaddingProps) {
  return (
    <Component
      className={clsx(
        { "px-4": breakpoint <= Breakpoint.xs },
        { "sm:px-6": breakpoint <= Breakpoint.sm },
        { "md:px-8": breakpoint <= Breakpoint.md },
        className
      )}
      {...props}
    />
  );
}

export default ViewportPadding;
