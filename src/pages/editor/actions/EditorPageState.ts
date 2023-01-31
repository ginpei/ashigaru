import { Note } from "../../../domains/note/Note";
import {
  createNoteListState,
  NoteListState,
} from "../../../domains/note/NoteListState";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";
import { EditorPageCommand } from "./editorActions";

export interface EditorPageState extends NoteListState {
  commandPaletteVisible: boolean;
  commands: EditorPageCommand[];
  shortcuts: KeyboardShortcut[];
}

export function createEditorPageState(
  initial?: Partial<EditorPageState>
): EditorPageState {
  return {
    ...createNoteListState(initial),
    commandPaletteVisible: initial?.commandPaletteVisible ?? false,
    commands: initial?.commands ?? [],
    shortcuts: initial?.shortcuts ?? [],
  };
}

export function getEditingNote(state: EditorPageState): Note | null {
  return state.notes.find((v) => v.id === state.editingNoteId) ?? null;
}

export function updateEditingNote(
  state: EditorPageState,
  note: Partial<Note>
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
