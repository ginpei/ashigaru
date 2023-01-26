import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { HighlightedCommand } from "./commandFilterHooks";

export interface CommandListItemProps<State> {
  command: HighlightedCommand<State>;
  shortcut?: KeyboardShortcut;
}

export function CommandListItem<State>({
  command,
  shortcut,
}: CommandListItemProps<State>): JSX.Element {
  return (
    <>
      <span>
        {command.highlightedCharacters.map((c, i) =>
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
    </>
  );
}

CommandListItem.Empty = function CommandListItem_Empty(): JSX.Element {
  return (
    <li className="px-2 py-1 leading-4 cursor-default">
      <small className="text-slate-500">No matching results</small>
    </li>
  );
};
