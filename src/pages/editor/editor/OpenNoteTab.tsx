import { Note } from "../../../domains/note/Note";

export interface OpenNoteTabProps {
  active: boolean;
  note: Note;
  onClick: (noteId: string) => void;
}

export function OpenNoteTab({
  active,
  note,
  onClick,
}: OpenNoteTabProps): JSX.Element {
  return (
    <span
      className={`
      OpenNoteTab
        border cursor-pointer
        hover:underline
        ${active ? "font-bold" : ""}
      `}
      key={note.id}
      onClick={() => onClick(note.id)}
    >
      {note.title}
    </span>
  );
}
