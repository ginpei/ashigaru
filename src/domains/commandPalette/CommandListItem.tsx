import { CommandDefinition } from "../command/CommandDefinition";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";

export interface CommandListItemProps<State> {
  command: CommandDefinition<State>;
  shortcut?: KeyboardShortcut;
  onClick?: (command: CommandDefinition<State>) => void;
}

export function CommandListItem<State>({
  command,
  shortcut,
  onClick,
}: CommandListItemProps<State>): JSX.Element {
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
