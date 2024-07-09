import { useCallback, useEffect, useState } from "react";
import { giveFocusOn } from "../../../domains/action/domFocusManipulators";
import {
  CommandPaletteFrame,
  CommandPaletteSelectHandler,
} from "../../../domains/commandPalette/CommandPaletteFrame";
import { HighlightedTitle } from "../../../domains/commandPalette/HighlightedTitle";
import { highlightCommands } from "../../../domains/commandPalette/commandFilter";
import { Note } from "../../../domains/note/Note";
import { tick } from "../../../domains/time/timeManipulator";
import { openNoteState } from "../pageState/EditorPageState";
import { useEditorPageStateContext } from "../pageState/editorPageStateContext";
import { EditorCommandListItem } from "./EditorCommandListItem";
import { useEditorActions } from "./editorActionContext";
import { EditorPageCommand } from "./editorActions";
import { Option, getNoteOptions } from "./editorCommandManipulators";

export interface EditorCommandPaletteProps {
  open: EditorCommandPaletteOpenType;
  onClose: (executed: boolean) => void;
}

export type EditorCommandPaletteOpenType = "" | "files" | "commands";

export function EditorCommandPalette({
  open,
  onClose,
}: EditorCommandPaletteProps): React.JSX.Element {
  const [state, setState] = useEditorPageStateContext();
  const [, shortcuts] = useEditorActions();
  const [input, setInput] = useState("");
  const options = useOptions(input);

  const onSelect: CommandPaletteSelectHandler<Option> = useCallback(
    async (command: Note | EditorPageCommand | null) => {
      if (!command) {
        onClose(false);
        return;
      }

      if ("exec" in command) {
        command.exec(state, setState);
        setState((v) => ({ ...v, commandPaletteVisible: "" }));
      } else {
        setState({
          ...openNoteState(state, command.id),
          commandPaletteVisible: "",
        });

        // TODO find better way
        await tick();
        giveFocusOn("noteBodyFocus");
      }

      onClose(true);
    },
    [onClose, setState, state],
  );

  useEffect(() => {
    if (open === "commands") {
      setInput(">");
      return;
    }

    setInput("");
  }, [open]);

  return (
    <CommandPaletteFrame
      // className="CommandPallet"
      emptyMessage="No matching results"
      getKey={(v) => v.id}
      input={input}
      onInput={setInput}
      onSelect={onSelect}
      open={open !== ""}
      options={options}
      renderItem={(option) =>
        "exec" in option ? (
          <EditorCommandListItem
            command={option}
            key={option.id}
            shortcut={shortcuts.find((v) => v.commandId === option.id)}
          />
        ) : (
          <HighlightedTitle chars={option.highlightedCharacters} />
        )
      }
    />
  );
}

function useOptions(input: string): Option[] {
  const [{ editingNoteId, notes, openNoteIds }] = useEditorPageStateContext();
  const [commands] = useEditorActions();

  if (input.startsWith(">")) {
    const keyword = input.slice(1).trim();
    return highlightCommands(commands, { keyword });
  }

  return getNoteOptions(notes, openNoteIds, editingNoteId, input);
}
