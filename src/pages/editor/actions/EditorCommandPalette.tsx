import { useEffect, useState } from "react";
import {
  highlightCommands,
  Highlighted,
  HighlightedCommand,
  highlightFilteredCommandTitle,
} from "../../../domains/commandPalette/commandFilter";
import { CommandPaletteFrame } from "../../../domains/commandPalette/CommandPaletteFrame";
import { HighlightedTitle } from "../../../domains/commandPalette/HighlightedTitle";
import { Note } from "../../../domains/note/Note";
import { EditorCommandListItem } from "./EditorCommandListItem";
import { useEditorPageState } from "./editorPageContext";
import { EditorPageState } from "./EditorPageState";

export interface EditorCommandPaletteProps {
  open: EditorCommandPaletteOpenType;
  onSelect: (option: Option | null) => void;
}

export type EditorCommandPaletteOpenType = "" | "files" | "commands";

type Option = Highlighted<Note> | HighlightedCommand<EditorPageState>;

export function EditorCommandPalette({
  open,
  onSelect,
}: EditorCommandPaletteProps): JSX.Element {
  const { shortcuts } = useEditorPageState();
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
  const { commands, notes } = useEditorPageState();

  if (input.startsWith(">")) {
    const keyword = input.slice(1).trim();
    return highlightCommands(commands, { keyword });
  }

  const highlightedNotes: Highlighted<Note>[] = [];
  for (const note of notes) {
    const highlightedCharacters = highlightFilteredCommandTitle(
      note.title,
      input
    );
    if (highlightedCharacters) {
      highlightedNotes.push({ ...note, highlightedCharacters });
    }
  }
  return highlightedNotes;
}
