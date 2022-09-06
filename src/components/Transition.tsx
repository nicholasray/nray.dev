import clsx from "clsx";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface TransitionProps {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  children: React.ReactNode;
}

interface RootTransitionProps extends TransitionProps {
  show: boolean;
}

interface TransitionContextInterface {
  show: boolean;
  register: (promise: Promise<void>) => void;
}

enum State {
  Unmounted,
  Entering,
  Entered,
  Exiting,
  Exited,
}

const TransitionContext = createContext<TransitionContextInterface | null>(
  null
);

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" || typeof document === "undefined"
    ? useEffect
    : useLayoutEffect;

const waitForAnimation = async (el: HTMLElement) => {
  await Promise.all(el.getAnimations().map((animation) => animation.finished));
};

const TransitionRoot = ({ show, ...props }: RootTransitionProps) => {
  const [state, setState] = useState<State>(State.Unmounted);
  const childTransitions = useRef<Promise<void>[]>([]);
  const registerCallback = useCallback((promise: Promise<void>) => {
    childTransitions.current.push(promise);
  }, []);
  const contextValue = useMemo(
    () => ({
      show,
      register: registerCallback,
    }),
    [show, registerCallback]
  );

  useEffect(() => {
    if (show) {
      setState(State.Entered);
    }
  }, [show]);

  useEffect(() => {
    if (!show) {
      Promise.all(childTransitions.current)
        .catch((e) => {
          console.info(e);
        })
        .then(() => {
          childTransitions.current = [];
          setState(State.Unmounted);
        });
    }
  }, [show]);

  if (state === State.Unmounted && !show) {
    return null;
  }

  return (
    <TransitionContext.Provider value={contextValue}>
      {props.children}
    </TransitionContext.Provider>
  );
};

const Child = ({
  enter = "",
  enterFrom = "",
  enterTo = "",
  leave = "",
  leaveFrom = "",
  leaveTo = "",
  ...props
}: TransitionProps) => {
  const [state, setState] = useState<State>(State.Unmounted);
  const el = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { show, register } = useContext(TransitionContext)!;
  const afterLeave = useRef<VoidFunction[]>([]);

  useEffect(() => {
    let promiseReject: (reason?: unknown) => void;

    register(
      new Promise((resolve, reject) => {
        promiseReject = reject;

        afterLeave.current.push(() => {
          resolve();
        });
      })
    );

    return () => {
      promiseReject();
    };
  }, [register]);

  useIsomorphicLayoutEffect(() => {
    if (!el.current) {
      return;
    }

    // Force style recalc so that transition animations can happen.
    getComputedStyle(el.current).transform;
    setState(show ? State.Entering : State.Exiting);
  }, [show]);

  useIsomorphicLayoutEffect(() => {
    if (state === State.Entering && el.current) {
      waitForAnimation(el.current)
        .then(() => {
          setState(State.Entered);
        })
        .catch((e) => {
          if (e instanceof DOMException) {
            // Likely a result of the user canceling an animation.
            return;
          }

          throw e;
        });

      return;
    }

    if (!show && state === State.Exiting && el.current) {
      waitForAnimation(el.current)
        .then(() => {
          setState(State.Exited);
        })
        .catch((e) => {
          if (e instanceof DOMException) {
            // Likely a result of the user canceling an animation.
            return;
          }

          throw e;
        });

      return;
    }

    if (state === State.Exited) {
      afterLeave.current.forEach((func) => {
        func();
      });
    }
  }, [state]);

  return (
    <div
      ref={el}
      className={clsx(
        { [enter]: show && state <= State.Entering },
        { [enterFrom]: state === State.Unmounted },
        {
          [enterTo]:
            (show && state === State.Entering) ||
            (show && state === State.Entered),
        },
        { [leave]: !show && state >= State.Entering && state <= State.Exiting },
        { [leaveFrom]: !show && state === State.Entered },
        { [leaveTo]: state === State.Exiting || state === State.Exited }
      )}
      {...props}
    ></div>
  );
};

const Transition = Object.assign(TransitionRoot, { Child });

export default Transition;
