import { Node } from "unist";
import unified, { Processor } from "unified";
import { VFile } from "vfile";

function compiler(this: Processor) {
  this.Compiler = compile;

  function compile(node: Node, file: VFile): string {
    return "hoge";
  }
}

const a = unified().use(compiler).stringify({ type: "" });

console.log(a);
