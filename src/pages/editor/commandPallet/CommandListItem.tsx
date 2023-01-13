import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";

export interface CommandListItemProps {
  command: CommandDefinition;
  shortcut?: KeyboardShortcut;
  onClick?: (command: CommandDefinition) => void;
}

export function CommandListItem({
  command,
  shortcut,
  onClick,
}: CommandListItemProps): JSX.Element {
  const onItemClick = () => onClick?.(command);

  return (
    <li onClick={onItemClick}>
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
