import { useState } from "react";
import { Note } from "../../../domains/note/Note";
import { NoteItem } from "./NoteItem";

export interface ListPaneProps {
}

const notes: Note[] = Array.from({ length: 30 }).map((_v, i) => ({
  body: `Hello, this is a note #${i}`,
  id: `note-${i}`,
  title: `Note ${i}`,
}));

export function ListPane(): JSX.Element {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onNoteClick = (note: Note) => {
    const index = selectedIds.findIndex((v) => v === note.id);
    if (index >= 0) {
      selectedIds.splice(index, 1);
      setSelectedIds([...selectedIds]);
    } else {
      setSelectedIds([...selectedIds, note.id]);
    }
  };

  return (
    <section className="ListPane">
      <h1 className="font-bold px-4 text-lg">Notes</h1>
      <div>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            selected={selectedIds.includes(note.id)}
            onClick={onNoteClick}
          />
        ))}
      </div>
    </section>
  );
}
