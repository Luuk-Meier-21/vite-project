import {
  defaultBlockSchema,
  defaultBlockSpecs,
  defaultProps,
} from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  createReactBlockSpec,
  ReactSlashMenuItem,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import {useState} from "react";
import {RiText} from "react-icons/ri";

const Heading = createReactBlockSpec(
  {
    type: "heading",
    propSchema: {
      ...defaultProps,
    },
    content: "inline",
  },
  {
    render: ({block, contentRef}) => {
      return (
        <h2
          className="text-2xl font-bold"
          aria-description="Title"
          ref={contentRef}
        />
      );
    },
    toExternalHTML: ({block, contentRef}) => <p ref={contentRef} />,
    parse: (element) => {
      return {};
    },
  }
);

// Our block schema, which contains the configs for blocks that we want our
// editor to use.
const blockSchema = {
  // Needs defaults for some reason
  ...defaultBlockSchema,
  heading: Heading.config,
};
// Our block specs, which contain the configs and implementations for blocks
// that we want our editor to use.
const blockSpecs = {
  // Needs defaults for some reason
  ...defaultBlockSpecs,
  heading: Heading,
};

// Creates a slash menu item for inserting a font paragraph block.
const insertHeading: ReactSlashMenuItem<typeof blockSchema> = {
  name: "Insert heading",
  execute: (editor) => {
    const block = editor.getTextCursorPosition().block;
    const blockIsEmpty = block.content?.toString().length === 0;

    if (blockIsEmpty) {
      editor.updateBlock(block, {
        type: "heading",
      });
    } else {
      editor.insertBlocks(
        [
          {
            type: "heading",
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    }
  },
  group: "Text",
  icon: <RiText />,
};

export default function App() {
  const [name, setName] = useState<string | null>("Interface design");
  const editor = useBlockNote({
    // Tells BlockNote which blocks to use.
    blockSpecs: blockSpecs,
    initialContent: [
      {
        type: "heading",
        props: {
          textColor: "red",
        },
        content: "This is some placeholder text",
      },
      {
        type: "paragraph",
        content: "This is some placeholder text",
      },
    ],
    slashMenuItems: [
      // ...getDefaultReactSlashMenuItems(blockSchema),
      insertTitle,
    ],
  });

  editor.onEditorContentChange(() => {
    console.log(editor.topLevelBlocks);
  });

  // Renders the editor instance using a React component.
  return (
    <main
      aria-describedby="name"
      className="w-screen h-screen bg-black flex flex-col gap-y-5"
    >
      <input
        aria-description="Document name"
        id="name"
        className="w-full text-2xl font-bold ring-white ring-1 bg-gray-800"
        type="text"
        value={name || ""}
        onChange={(event) => setName(event?.target.value)}
      />
      <BlockNoteView
        className="ring-1 ring-white bg-gray-800"
        editor={editor}
      />
    </main>
  );
}
