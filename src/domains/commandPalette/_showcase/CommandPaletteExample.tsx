import { Dispatch, SetStateAction, useState } from "react";
import { EditorCommandPalette } from "../../../pages/editor/actions/EditorCommandPalette";
import {
  createEditorPageState,
  EditorPageState,
} from "../../../pages/editor/actions/EditorPageState";
import { EditorPageStateProvider } from "../../../pages/editor/actions/editorPageContext";
import { breakActions } from "../../action/Action";
import { HStack } from "../../layout/HStask";
import { NiceButton } from "../../nice/NiceButton";
import { NiceH2 } from "../../nice/NiceH";
import { Note } from "../../note/Note";
import { HighlightedCommand } from "../commandFilter";
import { demoActions, demoNotes } from "./exampleResources";

const [demoCommands, demoShortcuts] = breakActions(demoActions);

export function CommandPaletteExample() {
  const [state, setState] = useState(
    createEditorPageState({
      commands: demoCommands,
      notes: demoNotes,
      shortcuts: demoShortcuts,
    }),
  );

  const onCommandSelect = (
    command:
      | Note
      | HighlightedCommand<
          [EditorPageState, Dispatch<SetStateAction<EditorPageState>>]
        >
      | null,
  ) => {
    console.log("# command", command);
    setState((v) => ({ ...v, commandPaletteVisible: "" }));
  };

  return (
    <EditorPageStateProvider value={[state, setState]}>
      <NiceH2>&lt;EditorCommandPalette&gt;</NiceH2>
      <p>* No shortcuts are prepared in this demo page.</p>
      <HStack>
        <NiceButton
          onClick={() =>
            setState((v) => ({ ...v, commandPaletteVisible: "commands" }))
          }
        >
          Open
        </NiceButton>
        <NiceButton
          onClick={() =>
            setState((v) => ({ ...v, commandPaletteVisible: "files" }))
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
