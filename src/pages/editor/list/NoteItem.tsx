import { Note } from "../../../domains/note/Note";

export interface NoteItemProps {
  focused: boolean;
  note: Note;
  selected: boolean;
  onClick: (note: Note) => void;
  onFocusRef: (el: HTMLElement | null) => void;
}

export function NoteItem({
  focused,
  note,
  selected,
  onClick,
  onFocusRef,
}: NoteItemProps): JSX.Element {
  const onRootClick = () => {
    onClick(note);
  };

  return (
    <div
      className={`
      NoteItem
      flex
      ${focused ? "outline-dotted outline-gray-500 outline-offset-[-2px]" : ""}
      ${selected ? "bg-gray-400 [[data-focus]_&]:bg-cyan-800 text-white" : ""}
      `}
      ref={(v) => focused && onFocusRef(v)}
    >
      <button
        className="grow text-start px-4 py-2 cursor-pointer hover:underline"
        onClick={onRootClick}
      >
        {note.title}
      </button>
    </div>
  );
}
