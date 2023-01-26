import { Note } from "./Note";

export interface NoteListState {
  editingNoteId: string;
  focusedNoteId: string;
  notes: Note[];
  selectedNoteIds: string[];
}

export function createNoteListState(
  initial?: Partial<NoteListState>
): NoteListState {
  return {
    editingNoteId: initial?.editingNoteId ?? "",
    focusedNoteId: initial?.focusedNoteId ?? "",
    notes: initial?.notes ?? [],
    selectedNoteIds: initial?.selectedNoteIds ?? [],
  };
}
