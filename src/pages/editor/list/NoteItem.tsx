import { Note } from "../../../domains/note/Note";

export interface NoteItemProps {
  focused: boolean;
  note: Note;
  selected: boolean;
  onClick: (note: Note) => void;
}

export function NoteItem({
  focused,
  note,
  selected,
  onClick,
}: NoteItemProps): JSX.Element {
  const onRootClick = () => {
    onClick(note);
  };

  return (
    <div
      className={`
      NoteItem
      ${focused ? "outline-dotted outline-gray-500 outline-offset-[-2px]" : ""}
      ${selected ? "bg-gray-400 [[data-focus]_&]:bg-cyan-800 text-white" : ""}
      `}
      onClick={onRootClick}
    >
      <div className="px-4 py-2 cursor-pointer hover:underline">
        {note.title}
      </div>
    </div>
  );
}
