import { visit } from "unist-util-visit";
import { parse, stringify } from "yaml";

function remarkComputedFrontmatter(callback) {
  return (tree, file) => {
    visit(tree, "yaml", (node) => {
      const result = callback(parse(node.value), file);

      node.value = stringify(result);
    });
  };
}

export default remarkComputedFrontmatter;
