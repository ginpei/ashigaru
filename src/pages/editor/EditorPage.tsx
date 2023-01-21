import Head from "next/head";
import { CSSProperties, useMemo, useState } from "react";
import {
  CommandDefinition,
  pickCommandDefinition,
} from "../../domains/command/CommandDefinition";
import { CommandPalette } from "../../domains/commandPalette/CommandPalette";
import { Note } from "../../domains/note/Note";
import {
  useFocusMarkEffect,
  useFocusTarget,
} from "../../domains/shortcut/focusHooks";
import { useKeyboardShortcuts } from "../../domains/shortcut/keyboardShortcutHooks";
import { editorCommands, editorShortcuts } from "./actions/editorActions";
import { EditorPageStateProvider } from "./actions/editorPageContext";
import {
  createEditorPageState,
  EditorPageState,
} from "./actions/EditorPageState";
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
  useFocusMarkEffect();

  const [state, setState] = useState(
    createEditorPageState({ notes: dummyNotes })
  );

  const commands = useMemo<CommandDefinition<EditorPageState>[]>(() => {
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

  useKeyboardShortcuts(editorShortcuts, focusId, (commandId) => {
    const def = pickCommandDefinition(commands, commandId);
    def.action(state, setState);
  });

  const onCommandSelect = (
    command: CommandDefinition<EditorPageState> | null
  ) => {
    command?.action(state, setState);
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
      <CommandPalette
        commands={commands}
        open={state.commandPaletteVisible}
        onSelect={onCommandSelect}
        shortcuts={editorShortcuts}
      />
    </EditorPageStateProvider>
  );
}
