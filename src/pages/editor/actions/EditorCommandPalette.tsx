import { useEffect, useState } from "react";
import {
  highlightCommands,
  HighlightedCommand,
} from "../../../domains/commandPalette/commandFilterHooks";
import { CommandPaletteFrame } from "../../../domains/commandPalette/CommandPaletteFrame";
import { Note } from "../../../domains/note/Note";
import { editorCommands, editorShortcuts } from "./editorActions";
import { EditorCommandListItem } from "./EditorCommandListItem";
import { useEditorPageState } from "./editorPageContext";
import { EditorPageState } from "./EditorPageState";

export interface EditorCommandPaletteProps {
  open: boolean;
  onSelect: (option: Option | null) => void;
}

type Option = Note | HighlightedCommand<EditorPageState>;

export interface CommandPalettePageState {
  // TODO remove because visibility is managed outside
  commandPaletteVisible: boolean;
}

// TODO prepare alias of CommandDefinition<EditorPageState>

export function EditorCommandPalette({
  open,
  onSelect,
}: EditorCommandPaletteProps): JSX.Element {
  const [input, setInput] = useState("");
  const state = useEditorPageState();
  const options = useOptions(input, state.notes);

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
            shortcut={editorShortcuts?.find((v) => v.commandId === option.id)}
          />
        ) : (
          option.title
        )
      }
    />
  );
}

function useOptions(input: string, notes: Note[]): Option[] {
  if (input.startsWith(">")) {
    const keyword = input.slice(1).trim();
    return highlightCommands(editorCommands, { keyword });
  }

  return notes;
}
