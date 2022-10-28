export interface EditorProps {
}

export function Editor(): JSX.Element {
  return (
    <div className="Editor grid grid-rows-[32px_auto] h-full">
      <input className="h-8 text-3xl" type="text" placeholder="Title" />
      <textarea
        className="resize-none"
        placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nobis amet illum illo doloribus quo aut. Eius fugiat mollitia illum excepturi repellat, commodi, quasi nihil facilis at eaque, deserunt iusto!"
      />
    </div>
  );
}
