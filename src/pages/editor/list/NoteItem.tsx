import { Note } from "../../../domains/note/Note";

export interface NoteItemProps {
  note: Note;
  selected: boolean;
  onClick: (note: Note) => void;
}

export function NoteItem({ note, selected, onClick }: NoteItemProps): JSX.Element {
  const onRootClick = () => {
    onClick(note);
  };

  return (
    <div
      className={`NoteItem px-4 ${selected ? "bg-cyan-800 text-white" : ""}`}
      onClick={onRootClick}
    >
      <div className="cursor-pointer hover:underline">{note.title}</div>
    </div>
  );
}
