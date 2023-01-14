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
    <li
      className="mb-1 px-2 flex place-content-between leading-4"
      onClick={onItemClick}
    >
      {command.title}
      {shortcut && (
        <>
          {" "}
          <code className="bg-gray-100 text-xs">{shortcut.key}</code>
        </>
      )}
    </li>
  );
}
