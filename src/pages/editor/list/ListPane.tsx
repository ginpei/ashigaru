import { Note } from "../../../domains/note/Note";
import { FocusTarget } from "../../../domains/shortcut/FocusTarget";
import {
  useEditorPageState,
  useStartEditingNote,
} from "../actions/editorPageContext";
import { NoteItem } from "./NoteItem";

export interface ListPaneProps {}

export function ListPane(): JSX.Element {
  const { focusedNoteId, notes, selectedNoteIds } = useEditorPageState();
  const startEditingNote = useStartEditingNote();

  const onNoteClick = (note: Note) => {
    startEditingNote(note.id);
  };

  return (
    <section className="ListPane">
      <h1 className="font-bold px-4 text-lg">Notes</h1>
      <FocusTarget id="noteListFocus">
        <div tabIndex={0}>
          {notes.map((note) => (
            <NoteItem
              focused={focusedNoteId === note.id}
              key={note.id}
              note={note}
              selected={selectedNoteIds.includes(note.id)}
              onClick={onNoteClick}
            />
          ))}
        </div>
      </FocusTarget>
    </section>
  );
}
