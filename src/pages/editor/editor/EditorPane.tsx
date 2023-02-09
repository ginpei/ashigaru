import { pickNotesByIds } from "../../../domains/note/noteListHandlers";
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

  return (
    <div className="EditorPane h-full flex flex-col">
      <OpenNoteList
        activeNoteId={editingNote?.id ?? ""}
        openNotes={openNotes}
        onSelect={(id) => setState(openNoteState(state, id))}
        onClose={(id) => setState(closeNoteState(state, id))}
      />
      <div className="grow grid">
        <Editor note={editingNote} />
      </div>
    </div>
  );
}
