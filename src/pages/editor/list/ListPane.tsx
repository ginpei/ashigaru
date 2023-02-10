import { useCallback, useRef, useState } from "react";
import { Note } from "../../../domains/note/Note";
import { giveFocusOn } from "../../../domains/shortcut/domFocusManipulators";
import { FocusTarget } from "../../../domains/shortcut/FocusTarget";
import { useEditorPageStateContext } from "../actions/editorPageContext";
import { openNoteState } from "../actions/EditorPageState";
import { NoteItem } from "./NoteItem";
import { useListScrollEffect } from "./noteListUiHooks";

export interface ListPaneProps {}

export function ListPane(): JSX.Element {
  const [state, setState] = useEditorPageStateContext();
  const { focusedNoteId, notes, selectedNoteIds } = state;
  const [elFocusItem, setElFocusItem] = useState<HTMLElement | null>(null);
  const refList = useRef<HTMLDivElement>(null);

  useListScrollEffect(elFocusItem, refList.current);

  const onNoteSelect = useCallback(
    (note: Note) => {
      setState(openNoteState(state, note.id));
      giveFocusOn("noteBodyFocus");
    },
    [setState, state]
  );

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
              onClick={onNoteSelect}
              onFocusRef={setElFocusItem}
            />
          ))}
        </div>
      </FocusTarget>
    </section>
  );
}
