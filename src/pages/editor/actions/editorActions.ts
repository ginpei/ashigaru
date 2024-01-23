import { Dispatch, SetStateAction } from "react";
import { Action, buildActions } from "../../../domains/action/Action";
import { CommandDefinition } from "../../../domains/action/CommandDefinition";
import { KeyboardShortcut } from "../../../domains/action/KeyboardShortcut";
import { giveFocusOn } from "../../../domains/action/domFocusManipulators";
import { noteListActions } from "../../../domains/note/noteListActions";
import { EditorPageState, closeNoteState } from "./EditorPageState";

export type EditorPageCommand = CommandDefinition<
  [EditorPageState, Dispatch<SetStateAction<EditorPageState>>]
>;

const [noteListCommands, noteListShortcuts] = buildActions(noteListActions);

const editorPageActions: Action<
  [EditorPageState, Dispatch<SetStateAction<EditorPageState>>]
>[] = [
  {
    exec() {
      giveFocusOn("noteListFocus");
    },
    id: "focusOnNoteList",
    shortcuts: [
      {
        key: "Ctrl+Shift+E",
      },
    ],
    title: "Focus on the note list",
  },
  {
    exec() {
      giveFocusOn("noteTitleFocus");
    },
    id: "focusOnNoteTitle",
    shortcuts: [
      {
        key: "Ctrl+0",
      },
    ],
    title: "Focus on the note title input",
  },
  {
    exec() {
      giveFocusOn("noteBodyFocus");
    },
    id: "focusOnEditor",
    shortcuts: [
      {
        key: "Ctrl+1",
      },
    ],
    title: "Focus on the editor",
  },
  {
    exec(state, set) {
      set(closeNoteState(state, state.editingNoteId));
    },
    id: "closeEditingNote",
    shortcuts: [
      {
        key: "Alt+W",
      },
    ],
    title: "Close editing note",
  },
];

const [editorCommands2, editorShortcuts2] = buildActions(editorPageActions);

export const editorCommands: CommandDefinition[] = [
  ...noteListCommands,
  ...editorCommands2,
];

export const editorShortcuts: KeyboardShortcut[] = [
  ...noteListShortcuts,
  ...editorShortcuts2,
  {
    commandId: "selectFileInCommandPalette",
    key: "Ctrl+P",
  },
  {
    commandId: "showCommandPalette",
    key: "Ctrl+Shift+P",
  },
];
