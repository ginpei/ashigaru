import Head from "next/head";
import { CSSProperties, useMemo, useState } from "react";
import { pickCommandDefinition } from "../../domains/action/CommandDefinition";
import { giveFocusOn } from "../../domains/action/domFocusManipulators";
import { useFocusMarkEffect } from "../../domains/action/focusHooks";
import { useKeyboardShortcuts } from "../../domains/action/keyboardShortcutHooks";
import { Note } from "../../domains/note/Note";
import { tick } from "../../domains/time/timeManipulator";
import { EditorCommandPalette } from "./actions/EditorCommandPalette";
import {
  createEditorPageState,
  openNoteState,
} from "./actions/EditorPageState";
import {
  EditorPageCommand,
  editorCommands,
  editorShortcuts,
} from "./actions/editorActions";
import { EditorPageStateProvider } from "./actions/editorPageContext";
import { EditorPane } from "./editor/EditorPane";
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
  useFocusMarkEffect();

  const [state, setState] = useState(
    createEditorPageState({
      commands: editorCommands,
      notes: dummyNotes,
      shortcuts: editorShortcuts,
    }),
  );

  const commands = useMemo<EditorPageCommand[]>(() => {
    // TODO extract
    return [
      ...state.commands,
      {
        exec() {
          setState((v) => ({ ...v, commandPaletteVisible: "files" }));
        },
        id: "selectFileInCommandPalette",
        title: "Select file in command palette",
      },
      {
        exec() {
          setState((v) => ({ ...v, commandPaletteVisible: "commands" }));
        },
        id: "showCommandPalette",
        title: "Show command palette",
      },
    ];
  }, [state.commands]);

  useKeyboardShortcuts(editorShortcuts, (commandId) => {
    const def = pickCommandDefinition(commands, commandId);
    def.exec(state, setState);
  });

  const onCommandSelect = async (command: Note | EditorPageCommand | null) => {
    if (!command) {
      setState((v) => ({ ...v, commandPaletteVisible: "" }));
      return;
    }

    if ("exec" in command) {
      command.exec(state, setState);
      setState((v) => ({ ...v, commandPaletteVisible: "" }));
    } else {
      setState({
        ...openNoteState(state, command.id),
        commandPaletteVisible: "",
      });

      // TODO find better way
      await tick();
      giveFocusOn("noteBodyFocus");
    }
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
          <EditorPane />
        </div>
      </div>
      <EditorCommandPalette
        open={state.commandPaletteVisible}
        onSelect={onCommandSelect}
      />
    </EditorPageStateProvider>
  );
}
