import React from "react";
import unified from "unified";
import parser from "remark-parse";
import mdast2hast from "remark-rehype";
import compiler from "rehype-react";

import { attacher, handler } from "./zenn-message";

const processor = unified()
  .use(parser)
  .use(attacher)
  .use(mdast2hast, { handlers: { message: handler } })
  .use(compiler, { createElement: React.createElement });

export default processor;
