import { visit } from "unist-util-visit";

import { load, dump } from "js-yaml";

export default function remarkCover() {
  return (tree: any, file: any) => {
    console.log(file);
    visit(tree, "yaml", (node) => {
      console.log(node);
      const result = load(node.value);

      node.value = dump(result);
    });
  };
}
