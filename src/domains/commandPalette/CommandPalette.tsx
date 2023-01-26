import { useEffect, useState } from "react";
import { CommandDefinition } from "../command/CommandDefinition";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { HighlightedCommand, useFilteredCommand } from "./commandFilterHooks";
import { CommandListItem } from "./CommandListItem";
import { CommandPaletteFrame } from "./CommandPaletteFrame";

export type CommandPaletteSelectHandler<State> = (
  command: CommandDefinition<State> | null
) => void;

export interface CommandPaletteProps<State> {
  commands: CommandDefinition<State>[];
  open: boolean;
  onSelect: CommandPaletteSelectHandler<State>;
  shortcuts?: KeyboardShortcut[];
}

export interface CommandPalettePageState {
  commandPaletteVisible: boolean;
}

export function CommandPalette<State>({
  commands,
  open,
  onSelect,
  shortcuts,
}: CommandPaletteProps<State>): JSX.Element {
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
      renderEmptyItem={() => <CommandListItem.Empty />}
      renderItem={(command) => (
        <CommandListItem
          command={command}
          key={command.id}
          shortcut={shortcuts?.find((v) => v.commandId === command.id)}
        />
      )}
    />
  );
}
