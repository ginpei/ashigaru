import { Dispatch, SetStateAction } from "react";
import { createNewNote } from "../../pages/editor/actions/EditorPageState";
import { Action } from "../action/Action";
import { createNote } from "./Note";
import { NoteListState } from "./NoteListState";
import { findFocusAfterDeletion } from "./noteListHandlers";

export const noteListActions: Action<
  [NoteListState, Dispatch<SetStateAction<NoteListState>>]
>[] = [
  {
    exec(state, setState) {
      setState({
        ...state,
        selectedNoteIds: state.notes.map((v) => v.id),
      });
    },
    id: "selectAllNotes",
    patterns: [
      {
        key: "Ctrl+A",
        when: "noteListFocus",
      },
    ],
    title: "Select all notes",
  },
  {
    exec(state, setState) {
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
    patterns: [
      {
        key: "ArrowUp",
        when: "noteListFocus",
      },
    ],
    title: "Focus on the previous note",
  },
  {
    exec(state, setState) {
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
    patterns: [
      {
        key: "ArrowDown",
        when: "noteListFocus",
      },
    ],
    title: "Focus on the next note",
  },
  {
    exec(state, setState) {
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
    patterns: [
      {
        key: "Home",
        when: "noteListFocus",
      },
    ],
    title: "Focus on the first note",
  },
  {
    exec(state, setState) {
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
    patterns: [
      {
        key: "End",
        when: "noteListFocus",
      },
    ],
    title: "Focus on the last note",
  },
  {
    exec(state, setState) {
      setState({
        ...state,
        editingNoteId: state.focusedNoteId,
        selectedNoteIds: [state.focusedNoteId],
      });
    },
    id: "selectNote",
    patterns: [
      {
        key: "Space",
        when: "noteListFocus",
      },
      {
        key: "Enter",
        when: "noteListFocus",
      },
    ],
    title: "Select the current focus note",
  },
  {
    exec(state, setState) {
      // TODO give empty ID and generate once saved
      const note = createNote({
        id: crypto.randomUUID(),
        title: "Untitled",
      });
      setState(createNewNote(state, note));
    },
    id: "createNewNote",
    patterns: [
      {
        key: "Alt+N",
      },
    ],
    title: "Create a new note",
  },
  {
    exec(state, setState) {
      const notes = state.notes.filter(
        (v) => !state.selectedNoteIds.includes(v.id),
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
    patterns: [
      {
        key: "Delete",
        when: "noteListFocus",
      },
    ],
    title: "Delete the selected notes",
  },
];
