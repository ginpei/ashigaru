import { KeyboardShortcut } from "../../../domains/action/KeyboardShortcut";
import { createNote, Note } from "../../../domains/note/Note";
import {
  createNoteListState,
  NoteListState,
} from "../../../domains/note/NoteListState";
import { EditorCommandPaletteOpenType } from "../actions/EditorCommandPalette";
import { EditorPageCommand } from "../actions/editorActions";

export interface EditorPageState extends NoteListState {
  commandPaletteVisible: EditorCommandPaletteOpenType;
  commands: EditorPageCommand[];
  openNoteIds: string[];
  shortcuts: KeyboardShortcut[];
}

export function createEditorPageState(
  initial?: Partial<EditorPageState>,
): EditorPageState {
  return {
    ...createNoteListState(initial),
    commandPaletteVisible: initial?.commandPaletteVisible ?? "",
    commands: initial?.commands ?? [],
    openNoteIds: initial?.openNoteIds ?? [],
    shortcuts: initial?.shortcuts ?? [],
  };
}

export function getEditingNote(state: EditorPageState): Note | null {
  return state.notes.find((v) => v.id === state.editingNoteId) ?? null;
}

export function createNewNote<T extends NoteListState>(
  state: T,
  note: Note,
): T {
  const notes = [...state.notes, note];

  const editingNoteId = note.id;
  const focusedNoteId = note.id;

  return {
    ...state,
    editingNoteId,
    focusedNoteId,
    notes,
    selectedNoteIds: [],
  };
}

export function updateEditingNote(
  state: EditorPageState,
  note: Partial<Note>,
): EditorPageState {
  if (!note.id) {
    throw new Error("Note ID required");
  }

  const { notes } = state;
  const index = notes.findIndex((v) => v.id === state.editingNoteId);
  if (index < 0) {
    throw new Error(`Note not found. ID: ${note.id}`);
  }

  const newNote: Note = { ...notes[index], ...note };
  const newNotes = [
    ...notes.slice(0, index),
    newNote,
    ...notes.slice(index + 1),
  ];
  return { ...state, notes: newNotes };
}

export function openNoteState(
  state: EditorPageState,
  id: string,
): EditorPageState {
  const openNoteIds = state.openNoteIds.includes(id)
    ? state.openNoteIds
    : state.openNoteIds.concat(id);

  return {
    ...state,
    editingNoteId: id,
    focusedNoteId: id,
    openNoteIds,
    selectedNoteIds: [id],
  };
}

export function closeNoteState(
  state: EditorPageState,
  id: string,
): EditorPageState {
  const editingNoteId = state.editingNoteId === id ? "" : state.editingNoteId;
  const openNoteIds = state.openNoteIds.filter((v) => v !== id);

  return {
    ...state,
    editingNoteId,
    openNoteIds,
  };
}
