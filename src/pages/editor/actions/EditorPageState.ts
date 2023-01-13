import { Note } from "../../../domains/note/Note";

export interface EditorPageState extends CommandPalletState {
  editingNoteId: string;
  notes: Note[];
}

interface CommandPalletState {
  commandPalletVisible: boolean;
}

export function createEditorPageState(
  initial?: Partial<EditorPageState>
): EditorPageState {
  return {
    commandPalletVisible: initial?.commandPalletVisible ?? false,
    editingNoteId: initial?.editingNoteId ?? "",
    notes: initial?.notes ?? [],
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

  const newNote = { ...notes, ...note } as Note;
  const newNotes = [
    ...notes.slice(0, index),
    newNote,
    ...notes.slice(index + 1),
  ];
  return { ...state, notes: newNotes };
}
