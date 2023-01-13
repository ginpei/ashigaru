import { Dialog } from "@headlessui/react";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import {
  CommandDefinition,
  findCommandDefinition,
} from "../../../domains/command/CommandDefinition";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";
import { editorCommands } from "../actions/editorCommands";
import { CommandListItem } from "./CommandListItem";

export interface EditorCommandPalletProps {
  commands: CommandDefinition[];
  open: boolean;
  onClose: () => void;
  shortcuts: KeyboardShortcut[];
}

export function EditorCommandPallet({
  commands,
  open,
  onClose,
  shortcuts,
}: EditorCommandPalletProps): JSX.Element {
  const [input, setInput] = useState("");

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const command = findCommandDefinition(editorCommands, input);
    if (!command) {
      return;
    }

    command.action();
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const el = event.currentTarget;
    const { value } = el;
    setInput(value);
  };

  return (
    <Dialog className="EditorCommandPallet" onClose={onClose} open={open}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <Dialog.Title>Command pallet</Dialog.Title>
          <form onSubmit={onSubmit}>
            <input
              className="border-2 border-ginpei"
              value={input}
              onChange={onInputChange}
            />
            <button className="bg-ginpei text-white">Exec</button>
          </form>
          <p>Commands:</p>
          <ul className="list-disc pl-8">
            {commands.map((command) => (
              <CommandListItem
                command={command}
                key={command.id}
                shortcut={shortcuts.find((v) => v.commandId === command.id)}
              />
            ))}
          </ul>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
