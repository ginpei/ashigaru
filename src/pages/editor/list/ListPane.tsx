import { useRef, useState } from "react";
import { Note } from "../../../domains/note/Note";
import { FocusTarget } from "../../../domains/shortcut/FocusTarget";
import {
  useEditorPageState,
  useStartEditingNote,
} from "../actions/editorPageContext";
import { NoteItem } from "./NoteItem";
import { useListScrollEffect } from "./noteListUiHooks";

export interface ListPaneProps {}

export function ListPane(): JSX.Element {
  const { focusedNoteId, notes, selectedNoteIds } = useEditorPageState();
  const [elFocusItem, setElFocusItem] = useState<HTMLElement | null>(null);
  const refList = useRef<HTMLDivElement>(null);
  const startEditingNote = useStartEditingNote();

  useListScrollEffect(elFocusItem, refList.current);

  const onNoteClick = (note: Note) => {
    startEditingNote(note.id);
  };

  return (
    <section className="ListPane h-full flex flex-col">
      <h1 className="font-bold px-4 text-lg">Notes</h1>
      <FocusTarget id="noteListFocus">
        <div className="overflow-auto" ref={refList} tabIndex={0}>
          {notes.map((note) => (
            <NoteItem
              focused={focusedNoteId === note.id}
              key={note.id}
              note={note}
              selected={selectedNoteIds.includes(note.id)}
              onClick={onNoteClick}
              onFocusRef={setElFocusItem}
            />
          ))}
        </div>
      </FocusTarget>
    </section>
  );
}
