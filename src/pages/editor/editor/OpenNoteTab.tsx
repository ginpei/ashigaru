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
}: OpenNoteTabProps): React.JSX.Element {
  return (
    <span
      className="OpenNoteTab flex cursor-pointer border hover:border-black"
      key={note.id}
    >
      <button
        className={`px-1 ${active ? "font-bold" : ""}`}
        onClick={() => onSelect(note.id)}
      >
        {note.title}
      </button>
      <button
        className="w-4 hover:bg-gray-300"
        onClick={() => onClose(note.id)}
      >
        ×
      </button>
    </span>
  );
}
