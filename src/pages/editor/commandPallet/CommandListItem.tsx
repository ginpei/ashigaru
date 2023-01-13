import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";

export interface CommandListItemProps {
  command: CommandDefinition;
  shortcut?: KeyboardShortcut;
}

export function CommandListItem({
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
