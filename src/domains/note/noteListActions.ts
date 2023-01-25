import { CommandDefinition } from "../command/CommandDefinition";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { Note } from "./Note";

export interface NoteListState {
  editingNoteId: string;
  focusedNoteId: string;
  notes: Note[];
  selectedNoteIds: string[];
}

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
  {
    commandId: "focusFirstNote",
    key: "Home",
    when: "noteListFocus",
  },
  {
    commandId: "focusLastNote",
    key: "End",
    when: "noteListFocus",
  },
];

export const noteListCommands: CommandDefinition<NoteListState>[] = [
  {
    action(state, setState) {
      setState({
        ...state,
        selectedNoteIds: state.notes.map((v) => v.id),
      });
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
      setState({
        ...state,
        editingNoteId: prevNote.id,
        focusedNoteId: prevNote.id,
        selectedNoteIds: [prevNote.id],
      });
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
      setState({
        ...state,
        editingNoteId: nextNote.id,
        focusedNoteId: nextNote.id,
        selectedNoteIds: [nextNote.id],
      });
    },
    id: "focusNextNote",
    title: "Focus on the next note",
  },
  {
    action(state, setState) {
      const { notes } = state;
      const note = notes[0];
      if (!note) {
        return;
      }
      setState({
        ...state,
        editingNoteId: note.id,
        focusedNoteId: note.id,
        selectedNoteIds: [note.id],
      });
    },
    id: "focusFirstNote",
    title: "Focus on the first note",
  },
  {
    action(state, setState) {
      const { notes } = state;
      const note = notes.at(-1);
      if (!note) {
        return;
      }
      setState({
        ...state,
        editingNoteId: note.id,
        focusedNoteId: note.id,
        selectedNoteIds: [note.id],
      });
    },
    id: "focusLastNote",
    title: "Focus on the last note",
  },
];
