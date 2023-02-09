import { CommandDefinition } from "../command/CommandDefinition";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { findFocusAfterDeletion } from "./noteListHandlers";
import { NoteListState } from "./NoteListState";

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
  {
    commandId: "selectNote",
    key: "Space",
    when: "noteListFocus",
  },
  {
    commandId: "selectNote",
    key: "Enter",
    when: "noteListFocus",
  },
  {
    commandId: "deleteNote",
    key: "Delete",
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
      const { focusedNoteId, notes } = state;
      const index = notes.findIndex((v) => v.id === focusedNoteId);
      const prevNote = index < 1 ? notes[0] : notes[index - 1];
      if (!prevNote) {
        return;
      }
      setState({
        ...state,
        focusedNoteId: prevNote.id,
      });
    },
    id: "focusPreviousNote",
    title: "Focus on the previous note",
  },
  {
    action(state, setState) {
      const { focusedNoteId, notes } = state;
      const index = notes.findIndex((v) => v.id === focusedNoteId);
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
        focusedNoteId: nextNote.id,
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
        focusedNoteId: note.id,
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
        focusedNoteId: note.id,
      });
    },
    id: "focusLastNote",
    title: "Focus on the last note",
  },
  {
    action(state, setState) {
      setState({
        ...state,
        editingNoteId: state.focusedNoteId,
        selectedNoteIds: [state.focusedNoteId],
      });
    },
    id: "selectNote",
    title: "Select the current focus note",
  },
  {
    action(state, setState) {
      const notes = state.notes.filter(
        (v) => !state.selectedNoteIds.includes(v.id)
      );

      const editingNoteId = state.selectedNoteIds.includes(state.editingNoteId)
        ? ""
        : state.editingNoteId;
      const focusedNoteId = findFocusAfterDeletion(state);

      setState({
        ...state,
        editingNoteId,
        focusedNoteId,
        notes,
        selectedNoteIds: [],
      });
    },
    id: "deleteNote",
    title: "Delete the selected notes",
  },
];
