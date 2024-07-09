import { Dispatch, SetStateAction } from "react";
import { createNewNote } from "../../pages/editor/pageState/EditorPageState";
import { Action } from "../action/Action";
import { createNote } from "./Note";
import { NoteListState } from "./NoteListState";
import { findFocusAfterDeletion } from "./noteListHandlers";

export function createNoteListActions<State extends NoteListState>(
  state: State,
  setState: Dispatch<SetStateAction<State>>,
): Action[] {
  return [
    {
      exec() {
        setState({
          ...state,
          selectedNoteIds: state.notes.map((v) => v.id),
        });
      },
      id: "selectAllNotes",
      patterns: [
        {
          keyboard: "Ctrl+A",
          when: "focus:noteList",
        },
      ],
      title: "Select all notes",
    },
    {
      exec() {
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
          keyboard: "ArrowUp",
          when: "focus:noteList",
        },
      ],
      title: "Focus on the previous note",
    },
    {
      exec() {
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
          keyboard: "ArrowDown",
          when: "focus:noteList",
        },
      ],
      title: "Focus on the next note",
    },
    {
      exec() {
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
          keyboard: "Home",
          when: "focus:noteList",
        },
      ],
      title: "Focus on the first note",
    },
    {
      exec() {
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
          keyboard: "End",
          when: "focus:noteList",
        },
      ],
      title: "Focus on the last note",
    },
    {
      exec() {
        setState({
          ...state,
          editingNoteId: state.focusedNoteId,
          selectedNoteIds: [state.focusedNoteId],
        });
      },
      id: "selectNote",
      patterns: [
        {
          keyboard: "Space",
          when: "focus:noteList",
        },
        {
          keyboard: "Enter",
          when: "focus:noteList",
        },
      ],
      title: "Select the current focus note",
    },
    {
      exec() {
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
          keyboard: "Alt+N",
        },
      ],
      title: "Create a new note",
    },
    {
      exec() {
        const notes = state.notes.filter(
          (v) => !state.selectedNoteIds.includes(v.id),
        );

        const editingNoteId = state.selectedNoteIds.includes(
          state.editingNoteId,
        )
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
          keyboard: "Delete",
          when: "focus:noteList",
        },
      ],
      title: "Delete the selected notes",
    },
  ];
}
