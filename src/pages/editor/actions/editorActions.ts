import { Dispatch, SetStateAction } from "react";
import { Action } from "../../../domains/action/Action";
import { CommandDefinition } from "../../../domains/action/CommandDefinition";
import { giveFocusOn } from "../../../domains/action/domFocusManipulators";
import { EditorPageState, closeNoteState } from "../pageState/EditorPageState";

export type EditorPageCommand = CommandDefinition<
  [EditorPageState, Dispatch<SetStateAction<EditorPageState>>]
>;

export function createEditorPageActions(
  state: EditorPageState,
  setState: Dispatch<SetStateAction<EditorPageState>>,
): Action[] {
  return [
    {
      exec() {
        giveFocusOn("noteList");
      },
      id: "focusOnNoteList",
      patterns: [
        {
          keyboard: "Ctrl+Shift+E",
        },
      ],
      title: "Focus on the note list",
    },
    {
      exec() {
        giveFocusOn("noteTitleFocus");
      },
      id: "focusOnNoteTitle",
      patterns: [
        {
          keyboard: "Ctrl+0",
        },
      ],
      title: "Focus on the note title input",
    },
    {
      exec() {
        giveFocusOn("noteBodyFocus");
      },
      id: "focusOnEditor",
      patterns: [
        {
          keyboard: "Ctrl+1",
        },
      ],
      title: "Focus on the editor",
    },
    {
      exec() {
        setState(closeNoteState(state, state.editingNoteId));
      },
      id: "closeEditingNote",
      patterns: [
        {
          keyboard: "Alt+W",
        },
      ],
      title: "Close editing note",
    },
  ];
}
