import { Dialog } from "@headlessui/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { NiceInput } from "../../../domains/control/NiceInput";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";
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

  useEffect(() => {
    setInput("");
  }, [open]);

  const filteredCommands = useMemo(() => {
    return commands.filter((v) => v.id.includes(input));
  }, [commands, input]);

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
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <Dialog.Title className="hidden">Command pallet</Dialog.Title>
          <form className="flex [&>*]:flex-1" onSubmit={onSubmit}>
            <NiceInput value={input} onChange={onInputChange} />
          </form>
          <ul className="CommandSuggestions">
            {commands.map((command) => (
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
