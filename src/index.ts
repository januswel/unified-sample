import unified from "unified";
import parser from "remark-parse";
import mdast2hast from "remark-rehype";
import compiler from "rehype-stringify";

const processor = unified()
  .use(parser)
  .use(mdast2hast)
  .use(compiler)
  .freeze()

processor
  .process('# This is a title')
  .then(html => console.log(html.toString()))
