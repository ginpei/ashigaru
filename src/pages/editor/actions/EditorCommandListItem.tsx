import { Dispatch, SetStateAction } from "react";
import { KeyboardShortcut } from "../../../domains/action/KeyboardShortcut";
import { CommandListEmptyItem } from "../../../domains/commandPalette/CommandListEmptyItem";
import { HighlightedTitle } from "../../../domains/commandPalette/HighlightedTitle";
import { HighlightedCommand } from "../../../domains/commandPalette/commandFilter";

export interface EditorCommandListItemProps<State> {
  command: HighlightedCommand<[State, Dispatch<SetStateAction<State>>]>;
  shortcut: KeyboardShortcut | undefined;
}

export function EditorCommandListItem<State>({
  command,
  shortcut,
}: EditorCommandListItemProps<State>): React.JSX.Element {
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
