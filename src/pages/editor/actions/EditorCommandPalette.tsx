import { useEffect, useState } from "react";
import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import {
  HighlightedCommand,
  useFilteredCommand,
} from "../../../domains/commandPalette/commandFilterHooks";
import { CommandPaletteFrame } from "../../../domains/commandPalette/CommandPaletteFrame";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";
import { EditorCommandListItem } from "./EditorCommandListItem";

export type CommandPaletteSelectHandler<State> = (
  command: CommandDefinition<State> | null
) => void;

export interface EditorCommandPaletteProps<State> {
  commands: CommandDefinition<State>[];
  open: boolean;
  onSelect: CommandPaletteSelectHandler<State>;
  shortcuts?: KeyboardShortcut[];
}

export interface CommandPalettePageState {
  commandPaletteVisible: boolean;
}

export function EditorCommandPalette<State>({
  commands,
  open,
  onSelect,
  shortcuts,
}: EditorCommandPaletteProps<State>): JSX.Element {
  const [input, setInput] = useState("");
  const filteredCommands = useFilteredCommand(commands, { keyword: input });

  useEffect(() => {
    setInput("");
  }, [open]);

  const onComboboxChange = (command: HighlightedCommand<State> | null) => {
    onSelect(command);
  };

  return (
    <CommandPaletteFrame
      // className="CommandPallet"
      focusTargetId="commandPalletFocus"
      getKey={(v) => v.id}
      input={input}
      onInput={setInput}
      onSelect={onComboboxChange}
      open={open}
      options={filteredCommands}
      renderEmptyItem={() => <EditorCommandListItem.Empty />}
      renderItem={(command) => (
        <EditorCommandListItem
          command={command}
          key={command.id}
          shortcut={shortcuts?.find((v) => v.commandId === command.id)}
        />
      )}
    />
  );
}
