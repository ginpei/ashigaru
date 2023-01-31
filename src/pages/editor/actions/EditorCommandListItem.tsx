import { HighlightedCommand } from "../../../domains/commandPalette/commandFilter";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";

export interface EditorCommandListItemProps<State> {
  command: HighlightedCommand<State>;
  shortcut?: KeyboardShortcut;
}

export function EditorCommandListItem<State>({
  command,
  shortcut,
}: EditorCommandListItemProps<State>): JSX.Element {
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

EditorCommandListItem.Empty = function CommandListItem_Empty(): JSX.Element {
  return (
    <div className="px-2 py-1 leading-4 cursor-default">
      <small className="text-slate-500">No matching results</small>
    </div>
  );
};
