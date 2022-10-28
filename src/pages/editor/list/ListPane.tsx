export interface ListPaneProps {
}

const notes = Array.from({ length: 30 }).map((_v, i) => ({
  id: `note-${i}`,
  title: `Note ${i}`,
}));

export function ListPane(): JSX.Element {
  return (
    <div className="ListPane">
      ListPane
      <div>
        {notes.map((note) => (
          <div key={note.id}>
            {note.title}
          </div>
        ))}
      </div>
    </div>
  );
}
