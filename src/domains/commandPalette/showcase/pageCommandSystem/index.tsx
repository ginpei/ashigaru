import { useMemo, useState } from "react";
import {
  CommandDefinition,
  pickCommandDefinition,
} from "../../../command/CommandDefinition";
import { VStack } from "../../../layout/VStack";
import { NiceButton } from "../../../nice/NiceButton";
import { NiceCode } from "../../../nice/NiceCode";
import { NiceH1 } from "../../../nice/NiceH";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";
import { KeyboardShortcut } from "../../../shortcut/KeyboardShortcut";
import { useFocusTarget } from "../../../shortcut/focusHooks";
import { useKeyboardShortcuts } from "../../../shortcut/keyboardShortcutHooks";
import { CommandListEmptyItem } from "../../CommandListEmptyItem";
import { CommandPaletteFrame } from "../../CommandPaletteFrame";
import { HighlightedTitle } from "../../HighlightedTitle";
import {
  Highlighted,
  highlightFilteredCommandTitle,
} from "../../commandFilter";

const commands: CommandDefinition[] = [
  {
    exec() {
      window.alert("Command 1");
    },
    id: "command1",
    title: "Command 1",
  },
  {
    exec() {
      window.alert("Command 2");
    },
    id: "command2",
    title: "Command 2",
  },
  {
    exec() {
      window.alert("Command 3");
    },
    id: "command3",
    title: "Command 3",
  },
];

const shortcuts: KeyboardShortcut[] = [
  {
    commandId: "command1",
    key: "Ctrl+Alt+1",
  },
];

export function PageCommandSystemPage(): JSX.Element {
  const [paletteInput, setPaletteInput] = useState("");
  const [commandPaletteVisible, setCommandPaletteVisible] = useState(false);
  const focusId = useFocusTarget();

  const filteredOptions = useMemo(() => {
    const result: Highlighted<CommandDefinition>[] = [];
    for (const command of commands) {
      const chars = highlightFilteredCommandTitle(command.title, paletteInput);
      if (chars) {
        result.push({
          highlightedCharacters: chars,
          ...command,
        });
      }
    }
    return result;
  }, [paletteInput]);

  useKeyboardShortcuts(shortcuts, focusId, (commandId) => {
    const command = pickCommandDefinition(commands, commandId);
    command.exec(0, () => {});
  });

  const onCommandSelect = (selected: Highlighted<CommandDefinition> | null) => {
    if (!selected) {
      setCommandPaletteVisible(false);
      return;
    }

    selected.exec(0, () => {});

    setCommandPaletteVisible(false);
  };

  return (
    <StraightLayout title="Command demos">
      <VStack>
        <NiceH1>Page command system</NiceH1>
        <p>
          <NiceButton onClick={() => setCommandPaletteVisible(true)}>
            Show command palette
          </NiceButton>
        </p>
        <ul className="list-decimal ms-8">
          <li>
            Prepare command definitions (
            <NiceCode>CommandDefinition[]</NiceCode>) to execute
          </li>
          <li>
            Prepare shortcut definitions (
            <NiceCode>KeyboardShortcut[]</NiceCode>) to assign
          </li>
          <li>
            Start observing keyboard inputs for the shortcuts by{" "}
            <NiceCode>useKeyboardShortcuts()</NiceCode>
          </li>
          <li>
            Execute the command by the given ID like{" "}
            <NiceCode>command.exec()</NiceCode>
          </li>
        </ul>
        <details>
          <summary>Registered commands in this example</summary>
          <ol className="list-disc ms-8">
            {commands.map((command) => (
              <li key={command.id}>
                {command.title} (<NiceCode>{command.id}</NiceCode>)
              </li>
            ))}
          </ol>
        </details>
        <details>
          <summary>Registered shortcuts in this example</summary>
          <table className="[&_thead]:bg-slate-100 [&_td]:border [&_td]:p-2">
            <thead>
              <tr>
                <th className="border px-2">Command</th>
                <th className="border px-2">Keybinding</th>
                <th className="border px-2">When?</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts.map((shortcut) => (
                <tr key={shortcut.key}>
                  <td>
                    <NiceCode>{shortcut.commandId}</NiceCode>
                  </td>
                  <td>
                    <NiceCode>{shortcut.key}</NiceCode>
                  </td>
                  <td>
                    {(shortcut.when && <NiceCode>shortcut.when</NiceCode>) ||
                      "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </VStack>
      <CommandPaletteFrame
        focusTargetId="demoCommandPaletteFrameFocus"
        getKey={(v) => v.title}
        input={paletteInput}
        onInput={setPaletteInput}
        onSelect={onCommandSelect}
        open={commandPaletteVisible}
        options={filteredOptions}
        renderEmptyItem={() => (
          <CommandListEmptyItem>No match</CommandListEmptyItem>
        )}
        renderItem={(v) => <HighlightedTitle chars={v.highlightedCharacters} />}
      />
    </StraightLayout>
  );
}

PageCommandSystemPage.path = "commandPalette/pageCommandSystem" as const;
