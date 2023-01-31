import { useMemo, useState } from "react";
import { StraightLayout } from "../../layouts/straight/StraightLayout";
import { EditorCommandPalette } from "../../pages/editor/actions/EditorCommandPalette";
import { EditorPageStateProvider } from "../../pages/editor/actions/editorPageContext";
import {
  createEditorPageState,
  EditorPageState,
} from "../../pages/editor/actions/EditorPageState";
import { CommandDefinition } from "../command/CommandDefinition";
import { HStack } from "../layout/HStask";
import { VStack } from "../layout/VStack";
import { NiceButton } from "../nice/NiceButton";
import { NiceH1, NiceH2, NiceH3 } from "../nice/NiceH";
import { Note } from "../note/Note";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { ComboboxDemo } from "./ComboboxDemo";
import { HighlightedCommand } from "./commandFilter";
import { CommandPaletteFrame } from "./CommandPaletteFrame";

interface PageState {
  commandPaletteVisible: boolean;
}

const demoCommands: CommandDefinition[] = [
  {
    action() {
      console.log("This is the demo command #1");
    },
    id: "command1",
    title: "Demo command 1",
  },
  {
    action() {
      console.log("This is the demo command #2");
    },
    id: "command2",
    title: "Demo command 2",
  },
  {
    action() {
      console.log("This is the demo command #3");
    },
    id: "command3",
    title: "Demo command 3",
  },
];

const demoShortcuts: KeyboardShortcut[] = [
  {
    commandId: "command2",
    key: "Ctrl+Example",
  },
];

const demoNotes: Note[] = Array.from({ length: 30 }).map((_v, i) => ({
  body: `Hello, this is a note #${i}`,
  id: `note-${i}`,
  title: `Demo note ${i}`,
}));

function CommandPaletteShowcase(): JSX.Element {
  return (
    <StraightLayout title="<CommandPalette> demo">
      <VStack className="CommandPaletteShowcase">
        <NiceH1>Command palette</NiceH1>
        <CommandPaletteFrameExample />
        <CommandPaletteExample />
        <NiceH3>Headless UI original combo box</NiceH3>
        <ComboboxDemo />
      </VStack>
    </StraightLayout>
  );
}

export default CommandPaletteShowcase;

function CommandPaletteFrameExample() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = ["One", "Two", "Three"] as const;

  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);

  const filteredOptions = useMemo(() => {
    return options.filter((v) => v.toLowerCase().includes(input.toLowerCase()));
  }, [options, input]);

  return (
    <>
      <NiceH2>&lt;CommandPaletteFrame&gt;</NiceH2>
      <p>
        <NiceButton onClick={() => setVisible(true)}>Open</NiceButton>
      </p>
      <CommandPaletteFrame
        focusTargetId="demoCommandPaletteFrameFocus"
        getKey={(v) => v}
        input={input}
        onInput={setInput}
        onSelect={(v) => {
          console.log(v);
          setVisible(false);
        }}
        open={visible}
        options={filteredOptions}
        renderEmptyItem={() => <>No match</>}
        renderItem={(v) => <>{v}</>}
      />
    </>
  );
}

function CommandPaletteExample() {
  const [state, setState] = useState(
    createEditorPageState({
      commands: demoCommands,
      notes: demoNotes,
      shortcuts: demoShortcuts,
    })
  );

  const onCommandSelect = (
    command: Note | HighlightedCommand<EditorPageState> | null
  ) => {
    console.log("# command", command);
    setState((v) => ({ ...v, commandPaletteVisible: false }));
  };

  return (
    <EditorPageStateProvider value={[state, setState]}>
      <NiceH2>&lt;CommandPalette&gt;</NiceH2>
      <p>* No shortcuts are prepared in this demo page.</p>
      <HStack>
        <NiceButton
          onClick={() =>
            setState((v) => ({ ...v, commandPaletteVisible: true }))
          }
        >
          Open
        </NiceButton>
        <NiceButton
          onClick={() =>
            setState((v) => ({ ...v, commandPaletteVisible: true }))
          }
        >
          Select file...
        </NiceButton>
      </HStack>
      <EditorCommandPalette
        open={state.commandPaletteVisible}
        onSelect={onCommandSelect}
      />
    </EditorPageStateProvider>
  );
}
