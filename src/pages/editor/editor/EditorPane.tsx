import { useCallback } from "react";
import { pickNotesByIds } from "../../../domains/note/noteListHandlers";
import { giveFocusOn } from "../../../domains/shortcut/domFocusManipulators";
import { useEditorPageStateContext } from "../actions/editorPageContext";
import { closeNoteState, openNoteState } from "../actions/EditorPageState";
import { Editor } from "./Editor";
import { OpenNoteList } from "./OpenNoteList";

export interface EditorPaneProps {}

export function EditorPane({}: EditorPaneProps): JSX.Element {
  const [state, setState] = useEditorPageStateContext();
  const { editingNoteId, notes, openNoteIds } = state;
  const openNotes = pickNotesByIds(state.notes, openNoteIds);
  const editingNote = notes.find((v) => v.id === editingNoteId);

  const onNoteSelect = useCallback(
    (id: string) => {
      setState(openNoteState(state, id));
      giveFocusOn("noteBodyFocus");
    },
    [setState, state]
  );

  return (
    <div className="EditorPane h-full flex flex-col">
      <OpenNoteList
        activeNoteId={editingNote?.id ?? ""}
        openNotes={openNotes}
        onSelect={onNoteSelect}
        onClose={(id) => setState(closeNoteState(state, id))}
      />
      <div className="grow grid">
        <Editor note={editingNote} />
      </div>
    </div>
  );
}
