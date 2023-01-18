import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";

type CodeEditorProps = SandpackProps;

function CodeEditor(props: CodeEditorProps) {
  return (
    <Sandpack
      theme={nightOwl}
      options={{
        classes: {
          "sp-layout": "!block",
          "sp-editor": "min-h-[400px]",
          "sp-preview": "min-h-[400px]",
        },
      }}
      {...props}
    />
  );
}

export default CodeEditor;
