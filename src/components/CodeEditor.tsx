"use client";

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
        },
        editorHeight: 350,
      }}
      {...props}
    />
  );
}

export default CodeEditor;
