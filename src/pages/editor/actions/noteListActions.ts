import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";
import { EditorPageState } from "./EditorPageState";

export const noteListShortcuts: KeyboardShortcut[] = [
  {
    commandId: "selectAllNotes",
    key: "Ctrl+A",
    when: "noteListFocus",
  },
  {
    commandId: "focusPreviousNote",
    key: "ArrowUp",
    when: "noteListFocus",
  },
  {
    commandId: "focusNextNote",
    key: "ArrowDown",
    when: "noteListFocus",
  },
];

export const noteListCommands: CommandDefinition<EditorPageState>[] = [
  {
    action(state) {
      console.log("select", state.notes);
    },
    id: "selectAllNotes",
    title: "Select all notes",
  },
  {
    action(state, setState) {
      const { editingNoteId, notes } = state;
      const index = notes.findIndex((v) => v.id === editingNoteId);
      const prevNote = index < 1 ? notes[0] : notes[index - 1];
      if (!prevNote) {
        return;
      }
      setState({ ...state, editingNoteId: prevNote.id });
    },
    id: "focusPreviousNote",
    title: "Focus on the previous note",
  },
  {
    action(state, setState) {
      const { editingNoteId, notes } = state;
      const index = notes.findIndex((v) => v.id === editingNoteId);
      const nextNote =
        index < 0
          ? notes[0]
          : index >= notes.length
          ? notes.at(-1)
          : notes[index + 1];
      if (!nextNote) {
        return;
      }
      setState({ ...state, editingNoteId: nextNote.id });
    },
    id: "focusNextNote",
    title: "Focus on the next note",
  },
];
