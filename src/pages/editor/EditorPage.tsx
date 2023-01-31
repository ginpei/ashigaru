import Head from "next/head";
import { CSSProperties, useMemo, useState } from "react";
import {
  CommandDefinition,
  pickCommandDefinition,
} from "../../domains/command/CommandDefinition";
import { Note } from "../../domains/note/Note";
import {
  useFocusMarkEffect,
  useFocusTarget,
} from "../../domains/shortcut/focusHooks";
import { useKeyboardShortcuts } from "../../domains/shortcut/keyboardShortcutHooks";
import {
  editorCommands,
  EditorPageCommand,
  editorShortcuts,
} from "./actions/editorActions";
import { EditorCommandPalette } from "./actions/EditorCommandPalette";
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

  const commands = useMemo<EditorPageCommand[]>(() => {
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

  const onCommandSelect = (command: Note | EditorPageCommand | null) => {
    if (command) {
      if ("action" in command) {
        command.action(state, setState);
      } else {
        // TODO extract
        setState({
          ...state,
          editingNoteId: command.id,
          focusedNoteId: command.id,
          selectedNoteIds: [command.id],
        });
        // TODO focus on editor
      }
    }

    setState((v) => ({ ...v, commandPaletteVisible: false }));
  };

  return (
    <EditorPageStateProvider value={[state, setState]}>
      <div
        className="EditorPage grid h-[100vh] [&>*]:overflow-hidden"
        style={rootStyle}
      >
        <Head>
          <link rel="shortcut icon" href="/icon-512.png" type="image/png" />
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
        open={state.commandPaletteVisible}
        onSelect={onCommandSelect}
      />
    </EditorPageStateProvider>
  );
}
