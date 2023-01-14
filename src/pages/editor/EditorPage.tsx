import Head from "next/head";
import { CSSProperties, useMemo, useState } from "react";
import {
  CommandDefinition,
  pickCommandDefinition,
} from "../../domains/command/CommandDefinition";
import { EditorCommandPalette } from "../../domains/commandPalette/EditorCommandPalette";
import { Note } from "../../domains/note/Note";
import { useFocusTarget } from "../../domains/shortcut/focusHooks";
import { useKeyboardShortcuts } from "../../domains/shortcut/keyboardShortcutHooks";
import { editorCommands } from "./actions/editorCommands";
import { EditorPageStateProvider } from "./actions/editorPageContext";
import { createEditorPageState } from "./actions/EditorPageState";
import { editorShortcuts } from "./actions/editorShortcuts";
import { Editor } from "./editor/Editor";
import { ListPane } from "./list/ListPane";
import { NavBar } from "./navBar/NavBar";

export interface EditorPageProps {}

const dummyNotes: Note[] = Array.from({ length: 30 }).map((_v, i) => ({
  body: `Hello, this is a note #${i}`,
  id: `note-${i}`,
  title: `Note ${i}`,
}));

const rootStyle: CSSProperties = {
  gridTemplate: `
    "navbar navbar" 2rem
    "list   editor" auto
    / 300px auto
  `,
};

export function EditorPage(): JSX.Element {
  const focusId = useFocusTarget();
  console.log("# focusId", focusId); // TODO pass to shortcut runner

  const [state, setState] = useState(
    createEditorPageState({ notes: dummyNotes })
  );

  const commands = useMemo<CommandDefinition[]>(() => {
    return [
      ...editorCommands,
      {
        action() {
          setState((v) => ({ ...v, commandPaletteVisible: true }));
        },
        id: "showCommandPalette",
        title: "Show command palette",
      },
    ];
  }, []);

  useKeyboardShortcuts(editorShortcuts, (commandId) => {
    const def = pickCommandDefinition(commands, commandId);
    def.action();
  });

  const onCommandSelect = (command: CommandDefinition | null) => {
    command?.action();
    setState((v) => ({ ...v, commandPaletteVisible: false }));
  };

  return (
    <EditorPageStateProvider value={[state, setState]}>
      <div
        className="EditorPage grid h-[100vh] [&>*]:overflow-auto"
        style={rootStyle}
      >
        <Head>
          <title>Editor</title>
        </Head>
        <header style={{ gridArea: "navbar" }}>
          <NavBar />
        </header>
        <div style={{ gridArea: "list" }}>
          <ListPane />
        </div>
        <div style={{ gridArea: "editor" }}>
          <Editor />
        </div>
      </div>
      <EditorCommandPalette
        commands={commands}
        open={state.commandPaletteVisible}
        onSelect={onCommandSelect}
        shortcuts={editorShortcuts}
      />
    </EditorPageStateProvider>
  );
}
