import React from "react";
import processor from "./processor";

const SAMPLE = `
:::message
This is a message
:::

:::message
But this is not a message
::

~~~markdown
# Heading 1

**strong**
~~~
`;

function App() {
  return (
    <>
      <h1>This is a Markdown</h1>
      {processor.processSync(SAMPLE).result}
    </>
  );
}

export default App;
