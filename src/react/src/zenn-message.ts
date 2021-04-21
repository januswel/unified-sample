import unified from "unified";
import { Node, Parent } from "unist";
import visit from "unist-util-visit";
import { VFileCompatible } from "vfile";
import { H } from "mdast-util-to-hast";
import { Paragraph } from "mdast";

import { isParent, isText, isParagraph } from "./util";
import all from "./all";

const MESSAGE_BEGGINING = ":::message\n";
const MESSAGE_ENDING = "\n:::";

// predicator
function isMessage(node: unknown): node is Paragraph {
  if (!isParagraph(node)) {
    return false;
  }

  const { children } = node;

  const firstChild = children[0];
  if (!(isText(firstChild) && firstChild.value.startsWith(MESSAGE_BEGGINING))) {
    return false;
  }

  const lastChild = children[children.length - 1];
  if (!(isText(lastChild) && lastChild.value.endsWith(MESSAGE_ENDING))) {
    return false;
  }

  return true;
}

// transformer
function processFirstChild(children: Array<Node>, identifier: string) {
  const firstChild = children[0];
  const firstValue = firstChild.value as string;
  if (firstValue === identifier) {
    children.shift();
  } else {
    children[0] = {
      ...firstChild,
      value: firstValue.slice(identifier.length),
    };
  }
}

function processLastChild(children: Array<Node>, identifier: string) {
  const lastIndex = children.length - 1;
  const lastChild = children[lastIndex];
  const lastValue = lastChild.value as string;
  if (lastValue === identifier) {
    children.pop();
  } else {
    children[lastIndex] = {
      ...lastChild,
      value: lastValue.slice(0, lastValue.length - identifier.length),
    };
  }
}

function visitor(node: Paragraph, index: number, parent: Parent | undefined) {
  if (!isParent(parent)) {
    return;
  }

  const children = [...node.children];
  processFirstChild(children, MESSAGE_BEGGINING);
  processLastChild(children, MESSAGE_ENDING);

  parent.children[index] = {
    type: "message",
    children,
  };
}

// attacher
export const attacher: unified.Plugin = () => {
  return (tree: Node, _file: VFileCompatible) => {
    visit(tree, isMessage, visitor);
  };
};

// handler to convert from mdast to hast
export function handler(h: H, node: Node) {
  return {
    type: "element",
    tagName: "div",
    properties: {
      className: ["msg"],
    },
    children: all(h, node),
  };
}
