import { CommandDefinition } from "../command/CommandDefinition";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { highlightFilteredCommandTitle } from "./commandFilter";

export interface CommandListItemProps<State> {
  command: CommandDefinition<State>;
  keyword: string;
  shortcut?: KeyboardShortcut;
  onClick?: (command: CommandDefinition<State>) => void;
}

export function CommandListItem<State>({
  command,
  keyword,
  shortcut,
  onClick,
}: CommandListItemProps<State>): JSX.Element {
  const titleCharacters = highlightFilteredCommandTitle(command.title, keyword);
  const onItemClick = () => onClick?.(command);

  return (
    <li
      className={`
        px-2 py-1 flex place-content-between leading-4 cursor-pointer
        hover:bg-slate-300
      `}
      onClick={onItemClick}
    >
      <span>
        {titleCharacters.map((c, i) =>
          c.highlight ? (
            <b className="text-cyan-800" key={`${c}-${i}`}>
              {c.character}
            </b>
          ) : (
            c.character
          )
        )}
      </span>
      {shortcut && (
        <>
          {" "}
          <code className="bg-gray-100 text-xs">{shortcut.key}</code>
        </>
      )}
    </li>
  );
}
