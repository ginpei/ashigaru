import { useCallback } from "react";
import { giveFocusOn } from "../../../domains/action/domFocusManipulators";
import { pickNotesByIds } from "../../../domains/note/noteListHandlers";
import { closeNoteState, openNoteState } from "../pageState/EditorPageState";
import { useEditorPageStateContext } from "../pageState/editorPageStateContext";
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
    [setState, state],
  );

  return (
    <div className="EditorPane flex h-full flex-col">
      <OpenNoteList
        activeNoteId={editingNote?.id ?? ""}
        openNotes={openNotes}
        onSelect={onNoteSelect}
        onClose={(id) => setState(closeNoteState(state, id))}
      />
      <div className="grid grow">
        <Editor note={editingNote} />
      </div>
    </div>
  );
}
