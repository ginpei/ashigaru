import { Combobox, Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { CommandDefinition } from "../command/CommandDefinition";
import { FocusTarget } from "../shortcut/FocusTarget";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { useFilteredCommand } from "./commandFilterHooks";
import { CommandListItem } from "./CommandListItem";

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

export function CommandPalette<State>({
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

  const onDialogClose = () => onSelect(null);

  const onComboboxChange = (command: CommandDefinition) => {
    onSelect(command);
  };

  return (
    <Dialog className="EditorCommandPallet" onClose={onDialogClose} open={open}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <FocusTarget id="commandPaletteFocus">
        <div className="fixed w-full top-0 mx-auto flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white">
            <Dialog.Title className="hidden">Command pallet</Dialog.Title>
            <Combobox<CommandDefinition> onChange={onComboboxChange}>
              <div className="flex [&>*]:flex-1">
                <Combobox.Input
                  className="border-[1px] border-ginpei px-4 py-1 text-black"
                  onChange={(v) => setInput(v.currentTarget.value)}
                  value={input}
                />
              </div>
              <Combobox.Options data-headlessui-state="open" static>
                {filteredCommands.map((command) => (
                  <CommandListItem
                    command={command}
                    key={command.id}
                    shortcut={shortcuts?.find(
                      (v) => v.commandId === command.id
                    )}
                  />
                ))}
                {filteredCommands.length < 1 && <CommandListItem.Empty />}
              </Combobox.Options>
            </Combobox>
          </Dialog.Panel>
        </div>
      </FocusTarget>
    </Dialog>
  );
}
