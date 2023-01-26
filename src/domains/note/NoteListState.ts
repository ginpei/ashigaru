import { Note } from "./Note";

export interface NoteListState {
  editingNoteId: string;
  focusedNoteId: string;
  notes: Note[];
  selectedNoteIds: string[];
}
