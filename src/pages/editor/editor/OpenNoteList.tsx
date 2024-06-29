import { createNote, Note } from "../../../domains/note/Note";
import { OpenNoteTab } from "./OpenNoteTab";

export interface EditorTabListProps {
  activeNoteId: string;
  openNotes: Note[];
  onSelect: (noteId: string) => void;
  onClose: (noteId: string) => void;
}

export function OpenNoteList({
  activeNoteId,
  openNotes: notes,
  onSelect,
  onClose,
}: EditorTabListProps): React.JSX.Element {
  const spacerNote =
    notes.length < 1 ? createNote({ title: "(No items)" }) : null;

  return (
    <div className="EditorTabList flex flex-wrap gap-2 bg-gray-100 p-1">
      {notes.map((note) => (
        <OpenNoteTab
          active={activeNoteId === note.id}
          key={note.id}
          note={note}
          onSelect={onSelect}
          onClose={onClose}
        />
      ))}
      {spacerNote && (
        <div className="invisible contents">
          <OpenNoteTab
            active={true}
            note={spacerNote}
            onSelect={onSelect}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
}
