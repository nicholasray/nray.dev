import { createContext, useContext } from "react";
import { useMemo } from "react";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PanelContextInterface {
  onClose: () => void;
}

const PanelContext = createContext<PanelContextInterface | null>(null);

interface DialogProps extends ComponentPropsWithoutRef<"div"> {
  onClose: () => void;
}

const DialogRoot = ({ onClose, ...props }: DialogProps) => {
  const value = useMemo(
    () => ({
      onClose,
    }),
    [onClose]
  );

  return createPortal(
    <PanelContext.Provider value={value}>
      <div {...props} />
    </PanelContext.Provider>,
    document.body
  );
};

interface PanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ElementType<any>;
  className?: string;
  children?: React.ReactNode;
}

const Panel = ({ as: Component = "div", ...props }: PanelProps) => {
  const el = useRef<HTMLElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { onClose } = useContext(PanelContext)!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.target instanceof Node && !el.current?.contains(e.target)) {
        onClose();
      }
    }

    // In React 18, useEffect runs synchronously after a user event like a click
    // so defer it to another task so that the click handler doesn't fire until after the
    // dialog is shown.
    // https://github.com/facebook/react/issues/24657#issuecomment-1150119055
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClick);
    });

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return <Component ref={el} {...props} />;
};

const Dialog = Object.assign(DialogRoot, { Panel });

export default Dialog;
