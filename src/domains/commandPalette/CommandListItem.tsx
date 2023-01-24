import { Combobox } from "@headlessui/react";
import { CommandDefinition } from "../command/CommandDefinition";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { highlightFilteredCommandTitle } from "./commandFilter";

export interface CommandListItemProps<State> {
  command: CommandDefinition<State>;
  keyword: string;
  shortcut?: KeyboardShortcut;
}

export function CommandListItem<State>({
  command,
  keyword,
  shortcut,
}: CommandListItemProps<State>): JSX.Element {
  const titleCharacters = highlightFilteredCommandTitle(command.title, keyword);

  //  TODO receive object and skip null check
  if (!titleCharacters) {
    return <></>;
  }

  return (
    <Combobox.Option className="CommandListItem" value={command}>
      {({ active }) => (
        <div
          className={`
            px-2 py-1 flex place-content-between leading-4 cursor-pointer
            hover:bg-slate-300
            ${active ? "bg-slate-300" : "bg-white"}
          `}
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
        </div>
      )}
    </Combobox.Option>
  );
}

CommandListItem.Empty = function CommandListItem_Empty(): JSX.Element {
  return (
    <li className="px-2 py-1 leading-4 cursor-default">
      <small className="text-slate-500">No matching results</small>
    </li>
  );
};
