import { Note } from "../../../domains/note/Note";

export interface EditorTabListProps {
  activeNoteId: string;
  editingNotes: Note[];
  onSelect: (noteId: string) => void;
}

export function EditorTabList({
  activeNoteId,
  editingNotes: notes,
  onSelect,
}: EditorTabListProps): JSX.Element {
  return (
    <div className="EditorTabList bg-gray-100 flex gap-2">
      {notes.map((note) => (
        <span
          className={`
            border cursor-pointer
            hover:underline
            ${activeNoteId === note.id ? "font-bold" : ""}
          `}
          key={note.id}
          onClick={() => onSelect(note.id)}
        >
          {note.title}
        </span>
      ))}
    </div>
  );
}
