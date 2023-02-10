import { Action, buildActions } from "../../../domains/command/Action";
import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { noteListActions } from "../../../domains/note/noteListActions";
import { giveFocusOn } from "../../../domains/shortcut/domFocusManipulators";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";
import { closeNoteState, EditorPageState } from "./EditorPageState";

export type EditorPageCommand = CommandDefinition<EditorPageState>;

const [noteListCommands, noteListShortcuts] = buildActions(noteListActions);

const editorPageActions: Action<EditorPageState>[] = [
  {
    action() {
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
    action() {
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
    action() {
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
