import { useState } from "react";
import { EditorCommandPalette } from "../../../pages/editor/actions/EditorCommandPalette";
import { EditorPageStateProvider } from "../../../pages/editor/actions/editorPageContext";
import {
  createEditorPageState,
  EditorPageState,
} from "../../../pages/editor/actions/EditorPageState";
import { HStack } from "../../layout/HStask";
import { NiceButton } from "../../nice/NiceButton";
import { NiceH2 } from "../../nice/NiceH";
import { Note } from "../../note/Note";
import { HighlightedCommand } from "../commandFilter";
import { demoCommands, demoNotes, demoShortcuts } from "./index";

export function CommandPaletteExample() {
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