import Head from "next/head";
import { CSSProperties, ReactNode, useMemo, useState } from "react";
import { pickCommandDefinition } from "../../domains/action/CommandDefinition";
import { giveFocusOn } from "../../domains/action/domFocusManipulators";
import { useFocusMarkEffect } from "../../domains/action/focusHooks";
import { useKeyboardShortcuts } from "../../domains/action/keyboardShortcutHooks";
import { Note } from "../../domains/note/Note";
import { tick } from "../../domains/time/timeManipulator";
import { EditorCommandPalette } from "./actions/EditorCommandPalette";
import {
  EditorPageCommand,
  editorCommands,
  editorShortcuts,
} from "./actions/editorActions";
import { EditorPane } from "./editor/EditorPane";
import { ListPane } from "./list/ListPane";
import { NavBar } from "./navBar/NavBar";
import {
  createEditorPageState,
  openNoteState,
} from "./pageState/EditorPageState";
import {
  EditorPageStateProvider,
  useEditorPageStateContext,
} from "./pageState/editorPageStateContext";

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
  return (
    <Provider>
      <EditorPageContent />
    </Provider>
  );
}

function Provider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(
    createEditorPageState({
      commands: editorCommands, // TODO remove
      notes: dummyNotes,
      shortcuts: editorShortcuts, // TODO remove
    }),
  );

  return (
    <EditorPageStateProvider value={[state, setState]}>
      {children}
    </EditorPageStateProvider>
  );
}

function EditorPageContent() {
  useFocusMarkEffect();

  const [state, setState] = useEditorPageStateContext();

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
  }, [setState, state.commands]);

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
    <>
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
    </>
  );
}
