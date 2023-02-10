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
  input: string
): Option[] {
  const result: Highlighted<Note>[] = [];

  for (const note of notes) {
    const highlightedCharacters = highlightFilteredCommandTitle(
      note.title,
      input
    );
    if (highlightedCharacters) {
      result.push({ ...note, highlightedCharacters });
    }
  }

  result.sort((note1, note2) => {
    return (
      calcNoteOptionWeight(note1, openNoteIds) -
      calcNoteOptionWeight(note2, openNoteIds)
    );
  });

  return result;
}

function calcNoteOptionWeight(note: Note, openNoteIds: string[]): number {
  const index = openNoteIds.findIndex((v) => v === note.id);
  if (index < 0) {
    return -Number.MIN_SAFE_INTEGER;
  }

  return index;
}
