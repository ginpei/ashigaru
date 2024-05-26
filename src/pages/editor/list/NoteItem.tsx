import { useEffect, useRef } from "react";
import { useFocusTarget } from "../../../domains/action/focusHooks";
import { Note } from "../../../domains/note/Note";

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
    if (!focused || !refNote.current || focusTarget !== "noteList") {
      return;
    }
    refNote.current.focus();
  }, [focusTarget, focused]);

  return (
    <div
      className={`
      NoteItem
      flex
      ${focused ? "outline-dotted outline-offset-[-2px] outline-gray-500" : ""}
      ${selected ? "bg-gray-400 text-white [[data-focus]_&]:bg-cyan-800" : ""}
      `}
      ref={(v) => focused && onFocusRef(v)}
    >
      <button
        className="grow cursor-pointer px-4 py-2 text-start outline-none hover:underline"
        onClick={onRootClick}
        onFocus={onNoteFocus}
        ref={refNote}
      >
        {note.title}
      </button>
    </div>
  );
}
