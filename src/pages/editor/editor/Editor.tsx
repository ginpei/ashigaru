import { ChangeEventHandler } from "react";
import { Note } from "../../../domains/note/Note";
import { FocusTarget } from "../../../domains/shortcut/FocusTarget";
import { useEditorPageStateContext } from "../actions/editorPageContext";
import { updateEditingNote } from "../actions/EditorPageState";

export interface EditorProps {
  note: Note | undefined;
}

export function Editor({ note }: EditorProps): JSX.Element {
  const [state, setState] = useEditorPageStateContext();
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event
  ) => {
    const { name, value } = event.currentTarget;
    if (name === "title") {
      setState(updateEditingNote(state, { ...note, title: value }));
    } else if (name === "body") {
      setState(updateEditingNote(state, { ...note, body: value }));
    } else {
      throw new Error(`Unknown input name: ${name}`);
    }
  };

  return (
    <div className="Editor grid grid-rows-[2.25rem_auto]">
      <FocusTarget id="noteTitleFocus">
        <input
          className="
            h-9 border border-transparent border-b-gray-200 px-4 text-3xl
            focus:outline-none focus:border-gray-200
          "
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
          className="
            p-4 resize-none border border-transparent
            focus:outline-none focus:border-gray-200
          "
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
