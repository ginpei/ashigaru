import { useEffect, useRef } from "react";
import { Note } from "../../../domains/note/Note";
import { useFocusTarget } from "../../../domains/shortcut/focusHooks";

export interface NoteItemProps {
  focused: boolean;
  note: Note;
  selected: boolean;
  onClick: (note: Note) => void;
  onFocus: (noteId: string) => void;
  onFocusRef: (el: HTMLElement | null) => void;
}

export function NoteItem({
  focused,
  note,
  selected,
  onClick,
  onFocus,
  onFocusRef,
}: NoteItemProps): JSX.Element {
  const focusTarget = useFocusTarget();
  const refNote = useRef<HTMLButtonElement>(null);

  const onRootClick = () => {
    onClick(note);
  };

  const onNoteFocus = () => {
    onFocus(note.id);
  };

  useEffect(() => {
    if (!focused || !refNote.current || focusTarget !== "noteListFocus") {
      return;
    }
    refNote.current.focus();
  }, [focusTarget, focused]);

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
        className="grow outline-none text-start px-4 py-2 cursor-pointer hover:underline"
        onClick={onRootClick}
        onFocus={onNoteFocus}
        ref={refNote}
      >
        {note.title}
      </button>
    </div>
  );
}
