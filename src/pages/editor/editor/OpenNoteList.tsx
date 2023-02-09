import { Note } from "../../../domains/note/Note";
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
  return (
    <div className="EditorTabList bg-gray-100 flex gap-2">
      {notes.map((note) => (
        <OpenNoteTab
          active={activeNoteId === note.id}
          key={note.id}
          note={note}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}
