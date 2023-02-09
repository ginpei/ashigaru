import { ChangeEventHandler } from "react";
import { Note } from "../../../domains/note/Note";
import { FocusTarget } from "../../../domains/shortcut/FocusTarget";
import { useUpdateEditingNote } from "../actions/editorPageContext";

export interface EditorProps {
  note: Note | undefined;
}

export function Editor({ note }: EditorProps): JSX.Element {
  const updateEditingNote = useUpdateEditingNote();

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event
  ) => {
    const { name, value } = event.currentTarget;
    if (name === "title") {
      updateEditingNote({ ...note, title: value });
    } else if (name === "body") {
      updateEditingNote({ ...note, body: value });
    } else {
      throw new Error(`Unknown input name: ${name}`);
    }
  };

  return (
    <div className="Editor grid grid-rows-[2.25rem_auto]">
      <FocusTarget id="noteTitleFocus">
        <input
          className="h-9 px-4 text-3xl"
          disabled={!note}
          name="title"
          onChange={onChange}
          placeholder="Title"
          type="text"
          value={note?.title ?? ""}
        />
      </FocusTarget>
      <FocusTarget id="noteBodyFocus">
        <textarea
          className="p-4 resize-none"
          disabled={!note}
          name="body"
          onChange={onChange}
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nobis amet illum illo doloribus quo aut. Eius fugiat mollitia illum excepturi repellat, commodi, quasi nihil facilis at eaque, deserunt iusto!"
          value={note?.body ?? ""}
        />
      </FocusTarget>
    </div>
  );
}
