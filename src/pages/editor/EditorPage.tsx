import Head from "next/head";
import { CSSProperties, ReactNode, useState } from "react";
import { breakActions } from "../../domains/action/Action";
import { ConditionFunctionMap } from "../../domains/action/Condition";
import { focusCondition } from "../../domains/action/domFocusConditions";
import { useFocusMarkEffect } from "../../domains/action/focusHooks";
import { useShortcutRunner } from "../../domains/action/keyboardShortcutHooks";
import { Note } from "../../domains/note/Note";
import { EditorCommandPalette } from "./actions/EditorCommandPalette";
import { EditorActionContextProvider } from "./actions/editorActionContext";
import { useEditorPageActions } from "./actions/editorActionHooks";
import { EditorPane } from "./editor/EditorPane";
import { ListPane } from "./list/ListPane";
import { NavBar } from "./navBar/NavBar";
import { createEditorPageState } from "./pageState/EditorPageState";
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

export function EditorPage(): React.JSX.Element {
  return (
    <Provider>
      <EditorPageContent />
    </Provider>
  );
}

function Provider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(
    createEditorPageState({ notes: dummyNotes }),
  );

  const actions = useEditorPageActions(state, setState);
  const [commands, shortcuts] = breakActions(actions);
  const conditions: ConditionFunctionMap = {
    focus: focusCondition,
  };

  useShortcutRunner(commands, shortcuts, conditions);

  return (
    <EditorPageStateProvider value={[state, setState]}>
      <EditorActionContextProvider value={[commands, shortcuts]}>
        {children}
      </EditorActionContextProvider>
    </EditorPageStateProvider>
  );
}

function EditorPageContent() {
  useFocusMarkEffect();

  const [state, setState] = useEditorPageStateContext();

  const onCommandPaletteClose = async () => {
    setState((v) => ({ ...v, commandPaletteVisible: "" }));
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
        onClose={onCommandPaletteClose}
      />
    </>
  );
}
