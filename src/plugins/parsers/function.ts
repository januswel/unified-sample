import { Node } from "unist";
import unified, { Processor } from "unified";
import { VFile } from "vfile";

function parser(this: Processor) {
  this.Parser = parse;

  function parse(text: string, file: VFile): Node {
    return {
      type: "paragraph",
    };
  }
}

const a = unified().use(parser).parse("# hoge");

console.log(a);
