import { Node } from "unist";
import unified, { Processor } from "unified";
import { VFile } from "vfile";

class MyCompiler {
  node: Node;
  file: VFile;

  constructor(node: Node, file: VFile) {
    this.node = node;
    this.file = file;
  }

  compile(): string {
    return "foo";
  }
}

export function compiler(this: Processor) {
  this.Compiler = MyCompiler;
}

const a = unified().use(compiler).stringify({ type: "" });

console.log(a);
