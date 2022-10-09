import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";

type CodeEditorProps = SandpackProps;

function CodeEditor(props: CodeEditorProps) {
  return (
    <Sandpack
      template="react-ts"
      theme={nightOwl}
      options={{
        classes: {
          "sp-layout": "flex-col h-[700px]",
          "sp-preview-iframe": "!min-h-[350px]",
        },
        editorHeight: 350,
      }}
      {...props}
    />
  );
}

export default CodeEditor;
