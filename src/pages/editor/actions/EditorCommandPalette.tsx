import { useEffect, useState } from "react";
import {
  highlightCommands,
  HighlightedCommand,
} from "../../../domains/commandPalette/commandFilter";
import { CommandPaletteFrame } from "../../../domains/commandPalette/CommandPaletteFrame";
import { Note } from "../../../domains/note/Note";
import { EditorCommandListItem } from "./EditorCommandListItem";
import { useEditorPageState } from "./editorPageContext";
import { EditorPageState } from "./EditorPageState";

export interface EditorCommandPaletteProps {
  open: boolean;
  onSelect: (option: Option | null) => void;
}

type Option = Note | HighlightedCommand<EditorPageState>;

export function EditorCommandPalette({
  open,
  onSelect,
}: EditorCommandPaletteProps): JSX.Element {
  const { shortcuts } = useEditorPageState();
  const [input, setInput] = useState("");
  const options = useOptions(input);

  useEffect(() => {
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
      open={open}
      options={options}
      renderEmptyItem={() => <EditorCommandListItem.Empty />}
      renderItem={(option) =>
        "action" in option ? (
          <EditorCommandListItem
            command={option}
            key={option.id}
            shortcut={shortcuts?.find((v) => v.commandId === option.id)}
          />
        ) : (
          option.title
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

  // TODO filter
  return notes;
}
