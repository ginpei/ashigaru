import { createNote, Note } from "../../../domains/note/Note";
import { OpenNoteTab } from "./OpenNoteTab";

export interface EditorTabListProps {
  activeNoteId: string;
  openNotes: Note[];
  onSelect: (noteId: string) => void;
}

export function OpenNoteList({
  activeNoteId,
  openNotes: notes,
  onSelect,
}: EditorTabListProps): JSX.Element {
  const spacerNote =
    notes.length < 1 ? createNote({ title: "(No items)" }) : null;

  return (
    <div className="EditorTabList bg-gray-100 flex gap-2 flex-wrap">
      {notes.map((note) => (
        <OpenNoteTab
          active={activeNoteId === note.id}
          key={note.id}
          note={note}
          onClick={onSelect}
        />
      ))}
      {spacerNote && (
        <div className="contents invisible">
          <OpenNoteTab active={true} note={spacerNote} onClick={onSelect} />
        </div>
      )}
    </div>
  );
}
