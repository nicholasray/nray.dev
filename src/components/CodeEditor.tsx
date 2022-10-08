import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";

type CodeEditorProps = SandpackProps;

function CodeEditor(props: CodeEditorProps) {
  return <Sandpack template="react-ts" theme={nightOwl} {...props} />;
}

export default CodeEditor;
