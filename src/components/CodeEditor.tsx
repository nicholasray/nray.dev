import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";

type CodeEditorProps = SandpackProps;

function CodeEditor(props: CodeEditorProps) {
  return (
    <Sandpack
      options={{
        classes: {
          "sp-layout": "!block",
        },
        editorHeight: 350,
      }}
      {...props}
    />
  );
}

export default CodeEditor;
