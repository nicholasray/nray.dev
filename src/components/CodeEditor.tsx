import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";

type CodeEditorProps = SandpackProps;

function CodeEditor(props: CodeEditorProps) {
  return (
    <Sandpack
      theme={"auto"}
      options={{
        resizablePanels: false,
      }}
      {...props}
    />
  );
}

export default CodeEditor;
