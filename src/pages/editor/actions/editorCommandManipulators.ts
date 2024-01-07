import {
  Highlighted,
  HighlightedCommand,
  highlightFilteredCommandTitle,
} from "../../../domains/commandPalette/commandFilter";
import { Note } from "../../../domains/note/Note";
import { EditorPageState } from "./EditorPageState";

export type Option = Highlighted<Note> | HighlightedCommand<EditorPageState>;

export function getNoteOptions(
  notes: Note[],
  openNoteIds: string[],
  editingNoteId: string,
  input: string,
): Option[] {
  const result: Highlighted<Note>[] = [];

  for (const note of notes) {
    const highlightedCharacters = highlightFilteredCommandTitle(
      note.title,
      input,
    );
    if (highlightedCharacters) {
      result.push({ ...note, highlightedCharacters });
    }
  }

  result.sort((note1, note2) => {
    return (
      calcNoteOptionWeight(note2, openNoteIds, editingNoteId) -
      calcNoteOptionWeight(note1, openNoteIds, editingNoteId)
    );
  });

  return result;
}

function calcNoteOptionWeight(
  note: Note,
  openNoteIds: string[],
  editingNoteId: string,
): number {
  if (note.id === editingNoteId) {
    return Number.MAX_SAFE_INTEGER;
  }

  const index = openNoteIds.findIndex((v) => v === note.id);
  if (index < 0) {
    return Number.MIN_SAFE_INTEGER;
  }

  return -index;
}
