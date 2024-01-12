import { useMemo, useState } from "react";
import {
  CommandDefinition,
  pickCommandDefinition,
} from "../../../command/CommandDefinition";
import { VStack } from "../../../layout/VStack";
import { NiceButton } from "../../../nice/NiceButton";
import { NiceCode } from "../../../nice/NiceCode";
import { NiceH1, NiceH2 } from "../../../nice/NiceH";
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
      window.alert("One");
    },
    id: "command1",
    title: "One",
  },
  {
    exec() {
      window.alert("Two");
    },
    id: "command2",
    title: "Two",
  },
  {
    exec() {
      window.alert("Three");
    },
    id: "command3",
    title: "Three",
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
        <p>There are three ways to execute commands:</p>
        <ol className="list-disc ms-8">
          <li>Execute by program</li>
          <li>Execute from command palette</li>
          <li>Execute by keyboard shortcuts</li>
        </ol>
        <p>Here is how to prepare them:</p>
        <ul className="list-decimal ms-8">
          <li>
            <NiceCode>CommandDefinition[]</NiceCode> - Command definitions
          </li>
          <li>
            <NiceCode>KeyboardShortcut[]</NiceCode>- Shortcut definitions
          </li>
          <li>
            <NiceCode>useKeyboardShortcuts()</NiceCode> - Start observing
            keyboard inputs for the shortcuts
          </li>
          <li>
            <NiceCode>{`<CommandPaletteFrame>`}</NiceCode> - Command palette UI
          </li>
          <li>
            <NiceCode>command.exec()</NiceCode> - Execute a command
          </li>
        </ul>
        <NiceH2>Example</NiceH2>
        <p>
          <NiceButton onClick={() => setCommandPaletteVisible(true)}>
            Show command palette
          </NiceButton>
        </p>
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
