import { Node } from "unist";
import unified, { Processor } from "unified";
import { VFile } from "vfile";

class MyParser {
  text: string;
  file: VFile;

  constructor(text: string, file: VFile) {
    this.text = text;
    this.file = file;
  }

  parse(): Node {
    return {
      type: "",
    };
  }
}

export function parser(this: Processor) {
  this.Parser = MyParser;
}

const a = unified().use(parser).parse("# hoge");

console.log(a);
