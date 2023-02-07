import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";

type CodeEditorProps = SandpackProps;

function CodeEditor(props: CodeEditorProps) {
  return (
    <Sandpack
      theme={sandpackDark}
      options={{
        resizablePanels: false,
      }}
      {...props}
    />
  );
}

export default CodeEditor;
