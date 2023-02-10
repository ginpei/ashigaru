import { Note } from "../../../domains/note/Note";

export interface OpenNoteTabProps {
  active: boolean;
  note: Note;
  onSelect: (noteId: string) => void;
  onClose: (noteId: string) => void;
}

export function OpenNoteTab({
  active,
  note,
  onSelect,
  onClose,
}: OpenNoteTabProps): JSX.Element {
  return (
    <span
      className="OpenNoteTab flex border cursor-pointer hover:border-black"
      key={note.id}
    >
      <button
        className={`px-1 ${active ? "font-bold" : ""}`}
        onClick={() => onSelect(note.id)}
      >
        {note.title}
      </button>
      <button
        className="hover:bg-gray-300 w-4"
        onClick={() => onClose(note.id)}
      >
        ×
      </button>
    </span>
  );
}
