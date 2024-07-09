import { Dispatch, SetStateAction, useMemo } from "react";
import { Action } from "../../../domains/action/Action";
import { createNoteListActions } from "../../../domains/note/noteListActions";
import { EditorPageState } from "../pageState/EditorPageState";
import { createEditorPageActions } from "./editorActions";

export function useEditorPageActions(
  state: EditorPageState,
  setState: Dispatch<SetStateAction<EditorPageState>>,
): Action[] {
  return useMemo(() => {
    const actions: Action[] = [
      ...createEditorGlobalActions(state, setState),
      ...createNoteListActions(state, setState),
      ...createEditorPageActions(state, setState),
    ];
    return actions;
  }, [setState, state]);
}

function createEditorGlobalActions(
  state: EditorPageState,
  setState: Dispatch<SetStateAction<EditorPageState>>,
): Action[] {
  return [
    {
      exec() {
        setState((v) => ({ ...v, commandPaletteVisible: "files" }));
      },
      id: "selectFileInCommandPalette",
      patterns: [
        {
          keyboard: "Ctrl+P",
        },
      ],
      title: "Select file in command palette",
    },
    {
      exec() {
        setState((v) => ({ ...v, commandPaletteVisible: "commands" }));
      },
      id: "showCommandPalette",
      patterns: [
        {
          keyboard: "Ctrl+Shift+P",
        },
      ],
      title: "Show command palette",
    },
  ];
}
