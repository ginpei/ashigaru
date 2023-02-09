import { Note } from "../../../domains/note/Note";

export interface EditorTabListProps {
  activeNoteId: string;
  editingNotes: Note[];
}

export function EditorTabList({
  activeNoteId,
  editingNotes: notes,
}: EditorTabListProps): JSX.Element {
  return (
    <div className="EditorTabList bg-gray-100">
      {notes
        .map((v) => (v.id === activeNoteId ? `[${v.title}]` : v.title))
        .join(", ")}
    </div>
  );
}
