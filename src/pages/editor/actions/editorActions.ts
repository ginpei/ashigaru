import { Action, buildActions } from "../../../domains/command/Action";
import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import {
  noteListCommands,
  noteListShortcuts,
} from "../../../domains/note/noteListActions";
import { giveFocusOn } from "../../../domains/shortcut/domFocusManipulators";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";
import { closeNoteState, EditorPageState } from "./EditorPageState";

export type EditorPageCommand = CommandDefinition<EditorPageState>;

const editorPageActions: Action<EditorPageState>[] = [
  {
    action(state, set) {
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
  {
    action() {
      giveFocusOn("noteListFocus");
    },
    id: "focusOnNoteList",
    title: "Focus on the note list",
  },
  {
    action() {
      giveFocusOn("noteTitleFocus");
    },
    id: "focusOnNoteTitle",
    title: "Focus on the note title input",
  },
  {
    action() {
      giveFocusOn("noteBodyFocus");
    },
    id: "focusOnEditor",
    title: "Focus on the editor",
  },
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
  {
    commandId: "focusOnNoteList",
    key: "Ctrl+Shift+E",
  },
  {
    commandId: "focusOnNoteTitle",
    key: "Ctrl+0",
  },
  {
    commandId: "focusOnEditor",
    key: "Ctrl+1",
  },
];
