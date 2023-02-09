import {
  useCloseNote,
  useEditorPageState,
  useStartEditingNote,
} from "../actions/editorPageContext";
import { Editor } from "./Editor";
import { OpenNoteList } from "./OpenNoteList";

export interface EditorPaneProps {}

export function EditorPane({}: EditorPaneProps): JSX.Element {
  const { editingNoteId, notes, openNoteIds } = useEditorPageState();
  const startEditingNote = useStartEditingNote();
  const closeNote = useCloseNote();
  const openNotes = notes.filter((v) => openNoteIds.includes(v.id));
  const editingNote = notes.find((v) => v.id === editingNoteId);

  return (
    <div className="EditorPane h-full flex flex-col">
      <OpenNoteList
        activeNoteId={editingNote?.id ?? ""}
        openNotes={openNotes}
        onSelect={startEditingNote}
        onClose={closeNote}
      />
      <div className="grow grid">
        <Editor note={editingNote} />
      </div>
    </div>
  );
}
