import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";

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
  return (
    <Dialog className="EditorCommandPallet" onClose={onClose} open={open}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <Dialog.Title>Command pallet</Dialog.Title>
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

interface CommandListItemProps {
  command: CommandDefinition;
  shortcut?: KeyboardShortcut;
}

function CommandListItem({
  command,
  shortcut,
}: CommandListItemProps): JSX.Element {
  return (
    <li>
      {command.title}
      {shortcut && (
        <>
          {" "}
          <code>(${shortcut.key})</code>
        </>
      )}
    </li>
  );
}
