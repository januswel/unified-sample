import unified from "unified";
import { Node } from "unist";
import { VFileCompatible } from "vfile";
import { inspect } from "unist-util-inspect";

const print: unified.Plugin = () => {
  return (tree: Node, file: VFileCompatible) => {
    console.log(inspect(tree));
  };
};

export default print;
