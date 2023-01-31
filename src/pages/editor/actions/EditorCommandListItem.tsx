import { HighlightedCommand } from "../../../domains/commandPalette/commandFilter";
import { CommandListEmptyItem } from "../../../domains/commandPalette/CommandListEmptyItem";
import { HighlightedTitle } from "../../../domains/commandPalette/HighlightedTitle";
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
      <HighlightedTitle chars={command.highlightedCharacters} />
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
  return <CommandListEmptyItem>No matching results</CommandListEmptyItem>;
};
