import { DocumentPlusIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { ComponentPropsWithoutRef, useCallback, useRef, useState } from "react";
import { FocusTarget } from "../../../domains/action/FocusTarget";
import { Note } from "../../../domains/note/Note";
import { focusNotesState } from "../../../domains/note/NoteListState";
import { openNoteState } from "../actions/EditorPageState";
import { useEditorPageStateContext } from "../actions/editorPageContext";
import { NoteItem } from "./NoteItem";
import { useListScrollEffect } from "./noteListUiHooks";
import { pickCommandDefinition } from "../../../domains/action/CommandDefinition";
import { editorCommands } from "../actions/editorActions";

export interface ListPaneProps {}

export function ListPane(): JSX.Element {
  const [state, setState] = useEditorPageStateContext();
  const { focusedNoteId, notes, selectedNoteIds } = state;
  const [elFocusItem, setElFocusItem] = useState<HTMLElement | null>(null);
  const refList = useRef<HTMLDivElement>(null);

  useListScrollEffect(elFocusItem, refList.current);

  const onNewNoteClick = useCallback(() => {
    // TODO receive command list over context
    const command = pickCommandDefinition(editorCommands, "createNewNote");
    command.exec(state, setState);
  }, [setState, state]);

  const onNoteSelect = useCallback(
    (note: Note) => {
      setState(openNoteState(state, note.id));
    },
    [setState, state],
  );

  const onNoteFocus = useCallback(
    (noteId: string) => {
      setState(focusNotesState(state, noteId));
    },
    [setState, state],
  );

  return (
    <section className="ListPane flex h-full flex-col">
      <div className="flex justify-between">
        <h1 className="px-4 text-lg font-bold">Notes</h1>
        <span className="flex">
          <ListHeaderButton onClick={onNewNoteClick} title="New note">
            <DocumentPlusIcon className="w-4" />
          </ListHeaderButton>
          <ListHeaderButton disabled title="Filter">
            <FunnelIcon className="w-4" />
          </ListHeaderButton>
        </span>
      </div>
      <FocusTarget id="noteListFocus">
        <div className="overflow-auto" ref={refList} tabIndex={0}>
          {notes.map((note) => (
            <NoteItem
              focused={focusedNoteId === note.id}
              key={note.id}
              note={note}
              selected={selectedNoteIds.includes(note.id)}
              onClick={onNoteSelect}
              onFocus={onNoteFocus}
              onFocusRef={setElFocusItem}
            />
          ))}
        </div>
      </FocusTarget>
    </section>
  );
}

function ListHeaderButton(props: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className="
        border border-transparent px-4
        hover:border-gray-400 hover:bg-gray-100
        focus-visible:border-gray-400 focus-visible:bg-gray-100
        disabled:border-transparent disabled:bg-gray-50 disabled:text-gray-400
      "
      {...props}
    />
  );
}
