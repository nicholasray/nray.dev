import { visit } from "unist-util-visit";

import { load, dump } from "js-yaml";

function remarkComputedFrontmatter(callback) {
  return (tree, file) => {
    visit(tree, "yaml", (node) => {
      const result = callback(load(node.value), file);

      node.value = dump(result);
    });
  };
}

export default remarkComputedFrontmatter;
