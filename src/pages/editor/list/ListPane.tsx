import { Note } from "../../../domains/note/Note";
import {
  useEditorPageState,
  useStartEditingNote,
} from "../actions/editorPageContext";
import { NoteItem } from "./NoteItem";

export interface ListPaneProps {}

export function ListPane(): JSX.Element {
  const { editingNoteId, notes } = useEditorPageState();
  const startEditingNote = useStartEditingNote();

  const onNoteClick = (note: Note) => {
    startEditingNote(note.id);
  };

  return (
    <section className="ListPane">
      <h1 className="font-bold px-4 text-lg">Notes</h1>
      <div>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            selected={editingNoteId === note.id}
            onClick={onNoteClick}
          />
        ))}
      </div>
    </section>
  );
}
