import Head from "next/head";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import {
  CommandDefinition,
  pickCommandDefinition,
} from "../../domains/command/CommandDefinition";
import { Note } from "../../domains/note/Note";
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
  const [state, setState] = useState(
    createEditorPageState({ notes: dummyNotes })
  );

  const commands = useMemo<CommandDefinition[]>(() => {
    return [
      ...editorCommands,
      {
        action() {
          setState((v) => ({ ...v, commandPalletVisible: true }));
        },
        id: "showCommandPallet",
        title: "Show command pallet",
      },
    ];
  }, []);

  useKeyboardShortcuts(editorShortcuts, (commandId) => {
    const def = pickCommandDefinition(commands, commandId);
    def.action();
  });

  // WIP
  useEffect(() => {
    if (state.commandPalletVisible) {
      const commandId = window.prompt("Command", "hello");
      if (commandId) {
        const def = pickCommandDefinition(commands, commandId);
        def.action();
      }
      setState({ ...state, commandPalletVisible: false });
    }
  }, [commands, state]);

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
    </EditorPageStateProvider>
  );
}
