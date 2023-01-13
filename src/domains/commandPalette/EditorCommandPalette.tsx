import { Dialog } from "@headlessui/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { CommandDefinition } from "../command/CommandDefinition";
import { NiceInput } from "../control/NiceInput";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { useFilteredCommand } from "./commandFilterHooks";
import { CommandListItem } from "./CommandListItem";

export interface EditorCommandPaletteProps {
  commands: CommandDefinition[];
  open: boolean;
  onSelect: (command: CommandDefinition | null) => void;
  shortcuts: KeyboardShortcut[];
}

export function EditorCommandPalette({
  commands,
  open,
  onSelect,
  shortcuts,
}: EditorCommandPaletteProps): JSX.Element {
  const [input, setInput] = useState("");
  const filteredCommands = useFilteredCommand(commands, { keyword: input });

  useEffect(() => {
    setInput("");
  }, [open]);

  const onDialogClose = () => onSelect(null);

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSelect(filteredCommands[0] ?? null);
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const el = event.currentTarget;
    const { value } = el;
    setInput(value);
  };

  return (
    <Dialog className="EditorCommandPallet" onClose={onDialogClose} open={open}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed w-full top-0 mx-auto flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <Dialog.Title className="hidden">Command pallet</Dialog.Title>
          <form className="flex [&>*]:flex-1" onSubmit={onSubmit}>
            <NiceInput value={input} onChange={onInputChange} />
          </form>
          <ul className="CommandSuggestions">
            {filteredCommands.map((command) => (
              <CommandListItem
                command={command}
                key={command.id}
                shortcut={shortcuts.find((v) => v.commandId === command.id)}
                onClick={onSelect}
              />
            ))}
          </ul>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
