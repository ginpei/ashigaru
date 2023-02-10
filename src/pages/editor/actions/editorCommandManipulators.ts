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
    const i1 = openNoteIds.findIndex((v) => v === note1.id);
    const i2 = openNoteIds.findIndex((v) => v === note2.id);
    return (i1 < 0 ? result.length : i1) - (i2 < 0 ? result.length : i2);
  });

  return result;
}
