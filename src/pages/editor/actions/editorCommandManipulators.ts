import {
  Highlighted,
  HighlightedCommand,
  highlightFilteredCommandTitle,
} from "../../../domains/commandPalette/commandFilter";
import { Note } from "../../../domains/note/Note";
import { EditorPageState } from "./EditorPageState";

export type Option = Highlighted<Note> | HighlightedCommand<EditorPageState>;

export function getNoteOptions(notes: Note[], input: string): Option[] {
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

  return result;
}
