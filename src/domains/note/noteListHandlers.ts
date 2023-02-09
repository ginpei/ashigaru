import { Note } from "./Note";
import { NoteListState } from "./NoteListState";

export function findFocusAfterDeletion({
  focusedNoteId,
  selectedNoteIds,
  notes,
}: NoteListState): string {
  if (!selectedNoteIds.includes(focusedNoteId)) {
    return focusedNoteId;
  }

  for (
    let index = notes.findIndex((v) => v.id === focusedNoteId) - 1;
    index >= 0;
    index--
  ) {
    const note = notes[index];
    if (!selectedNoteIds.includes(note.id)) {
      return note.id;
    }
  }

  for (
    let index = notes.findIndex((v) => v.id === focusedNoteId) + 1;
    index < notes.length;
    index++
  ) {
    const note = notes[index];
    if (!selectedNoteIds.includes(note.id)) {
      return note.id;
    }
  }

  return "";
}

export function pickNotesByIds(notes: Note[], ids: string[]): Note[] {
  const targets = ids
    .map((id) => notes.find((v) => v.id === id))
    .filter((v): v is Note => Boolean(v));
  return targets;
}
