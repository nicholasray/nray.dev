import React from "react";
import { Button, type ButtonProps } from "./Button";

export interface LinkProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
}

const ButtonLink: React.FC<LinkProps> = ({ href, children, ...props }) => {
  return (
    <Button {...props} asChild>
      <a href={href}>{children}</a>
    </Button>
  );
};

export { ButtonLink };
