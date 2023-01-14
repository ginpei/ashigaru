import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { giveFocusOn } from "../../../domains/shortcut/domFocusManipulators";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";
import { EditorPageState } from "./EditorPageState";
import { noteListCommands, noteListShortcuts } from "./noteListActions";

export const editorCommands: CommandDefinition<EditorPageState>[] = [
  ...noteListCommands,
  {
    action: () => {
      giveFocusOn("noteListFocus");
    },
    id: "focusOnNoteList",
    title: "Focus on the note list",
  },
  {
    action: () => {
      giveFocusOn("noteTitleFocus");
    },
    id: "focusOnNoteTitle",
    title: "Focus on the note title input",
  },
  {
    action: () => {
      giveFocusOn("noteBodyFocus");
    },
    id: "focusOnEditor",
    title: "Focus on the editor",
  },
];

export const editorShortcuts: KeyboardShortcut[] = [
  ...noteListShortcuts,
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
