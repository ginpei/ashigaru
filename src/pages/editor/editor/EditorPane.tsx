import { useEditorPageStateContext } from "../actions/editorPageContext";
import {
  closeNoteState,
  startEditingNoteState,
} from "../actions/EditorPageState";
import { Editor } from "./Editor";
import { OpenNoteList } from "./OpenNoteList";

export interface EditorPaneProps {}

export function EditorPane({}: EditorPaneProps): JSX.Element {
  const [state, setState] = useEditorPageStateContext();
  const { editingNoteId, notes, openNoteIds } = state;
  const openNotes = notes.filter((v) => openNoteIds.includes(v.id));
  const editingNote = notes.find((v) => v.id === editingNoteId);

  return (
    <div className="EditorPane h-full flex flex-col">
      <OpenNoteList
        activeNoteId={editingNote?.id ?? ""}
        openNotes={openNotes}
        onSelect={(id) => setState(startEditingNoteState(state, id))}
        onClose={(id) => setState(closeNoteState(state, id))}
      />
      <div className="grow grid">
        <Editor note={editingNote} />
      </div>
    </div>
  );
}
