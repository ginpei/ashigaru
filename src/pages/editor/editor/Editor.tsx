export interface EditorProps {
}

export function Editor(): JSX.Element {
  return (
    <div className="Editor grid grid-rows-[2.25rem_auto] h-full">
      <input className="h-9 px-4 text-3xl" type="text" placeholder="Title" />
      <textarea
        className="p-4 resize-none"
        placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nobis amet illum illo doloribus quo aut. Eius fugiat mollitia illum excepturi repellat, commodi, quasi nihil facilis at eaque, deserunt iusto!"
      />
    </div>
  );
}
