import { Note } from "../../../domains/note/Note";

export interface NoteItemProps {
  note: Note;
  selected: boolean;
  onClick: (note: Note) => void;
}

export function NoteItem({
  note,
  selected,
  onClick,
}: NoteItemProps): JSX.Element {
  const onRootClick = () => {
    onClick(note);
  };

  return (
    <div
      className={`NoteItem ${selected ? "bg-cyan-800 text-white" : ""}`}
      onClick={onRootClick}
    >
      <div className="px-4 py-2 cursor-pointer hover:underline">
        {note.title}
      </div>
    </div>
  );
}
