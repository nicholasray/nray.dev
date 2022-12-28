import CodeEditor from "@components/CodeEditor";
import app from "./demos/react-scroll-animations/App.tsx?raw";
import useIntersectionObserver from "./demos/react-scroll-animations/useIntersectionObserver.ts?raw";
import styles from "./demos/react-scroll-animations/styles.css?raw";

function ScrollDemo() {
  return (
    <CodeEditor
      template="react-ts"
      files={{
        "/App.tsx": app,
        "/useIntersectionObserver.ts": useIntersectionObserver,
        "/styles.css": styles,
      }}
    />
  );
}

export default ScrollDemo;
