import { useState } from "react";
import { EditorCommandPalette } from "../../../pages/editor/actions/EditorCommandPalette";
import { EditorActionContextProvider } from "../../../pages/editor/actions/editorActionContext";
import { createEditorPageState } from "../../../pages/editor/pageState/EditorPageState";
import { EditorPageStateProvider } from "../../../pages/editor/pageState/editorPageStateContext";
import { breakActions } from "../../action/Action";
import { ConditionFunctionMap } from "../../action/Condition";
import { useShortcutRunner } from "../../action/keyboardShortcutHooks";
import { HStack } from "../../layout/HStask";
import { NiceButton } from "../../nice/NiceButton";
import { NiceH2 } from "../../nice/NiceH";
import { demoActions, demoNotes } from "./exampleResources";

export function CommandPaletteExample() {
  const [state, setState] = useState(
    createEditorPageState({ notes: demoNotes }),
  );

  const [commands, shortcuts] = breakActions(demoActions);
  const conditions: ConditionFunctionMap = {};

  useShortcutRunner(commands, shortcuts, conditions);

  const onCommandSelect = () => {
    setState((v) => ({ ...v, commandPaletteVisible: "" }));
  };

  return (
    <EditorPageStateProvider value={[state, setState]}>
      <EditorActionContextProvider value={[commands, shortcuts]}>
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
          onClose={onCommandSelect}
        />
      </EditorActionContextProvider>
    </EditorPageStateProvider>
  );
}
