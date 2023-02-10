import { useEffect, useState } from "react";
import {
  highlightCommands,
  Highlighted,
  highlightFilteredCommandTitle,
} from "../../../domains/commandPalette/commandFilter";
import { CommandPaletteFrame } from "../../../domains/commandPalette/CommandPaletteFrame";
import { HighlightedTitle } from "../../../domains/commandPalette/HighlightedTitle";
import { Note } from "../../../domains/note/Note";
import { EditorCommandListItem } from "./EditorCommandListItem";
import { getNoteOptions, Option } from "./editorCommandManipulators";
import { useEditorPageStateContext } from "./editorPageContext";

export interface EditorCommandPaletteProps {
  open: EditorCommandPaletteOpenType;
  onSelect: (option: Option | null) => void;
}

export type EditorCommandPaletteOpenType = "" | "files" | "commands";

export function EditorCommandPalette({
  open,
  onSelect,
}: EditorCommandPaletteProps): JSX.Element {
  const [{ shortcuts }] = useEditorPageStateContext();
  const [input, setInput] = useState("");
  const options = useOptions(input);

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
      focusTargetId="commandPalletFocus"
      getKey={(v) => v.id}
      input={input}
      onInput={setInput}
      onSelect={onSelect}
      open={open !== ""}
      options={options}
      renderEmptyItem={() => <EditorCommandListItem.Empty />}
      renderItem={(option) =>
        "action" in option ? (
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
  const [{ commands, notes }] = useEditorPageStateContext();

  if (input.startsWith(">")) {
    const keyword = input.slice(1).trim();
    return highlightCommands(commands, { keyword });
  }

  return getNoteOptions(notes, input);
}
