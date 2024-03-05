import {ComponentProps, RefAttributes, useEffect, useState} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Markdown, {Components, ExtraProps} from "react-markdown";
import remarkGfm from "remark-gfm";

type Props<T> = React.ClassAttributes<HTMLHeadingElement> &
  React.HTMLAttributes<HTMLHeadingElement> &
  ExtraProps;

const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

const toIdSafeString = (value: string) => {
  console.log(value);
  const array = value.split(/(?=[A-Z])/);
  const snakeCaseArray = array.map((word) => word.toLowerCase());
  return snakeCaseArray.join("-");
};

const h1 = (props: Props<HTMLHeadingElement>) => {
  const {node, children, ...rest} = props;
  console.log(props);
  return <h1 contentEditable id="test" children={children} {...rest} />;
};

const components: Partial<Components> = {
  h1: h1,
  h2: h1,
  h3: h1,
  h4: h1,
  h5: h1,
  h6: h1,
};

function App() {
  const [markdown, setMarkdown] = useState(mdStr);

  return (
    <Markdown remarkPlugins={[remarkGfm]} components={components}>
      {markdown}
    </Markdown>
  );
}

export default App;
