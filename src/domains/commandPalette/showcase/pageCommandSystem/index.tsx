import {
  CommandDefinition,
  pickCommandDefinition,
} from "../../../command/CommandDefinition";
import { VStack } from "../../../layout/VStack";
import { NiceCode } from "../../../nice/NiceCode";
import { NiceH1 } from "../../../nice/NiceH";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";
import { KeyboardShortcut } from "../../../shortcut/KeyboardShortcut";
import { useFocusTarget } from "../../../shortcut/focusHooks";
import { useKeyboardShortcuts } from "../../../shortcut/keyboardShortcutHooks";

const commands: CommandDefinition[] = [
  {
    exec() {
      window.alert("Command 1");
    },
    id: "command1",
    title: "Command 1",
  },
];

const shortcuts: KeyboardShortcut[] = [
  {
    commandId: "command1",
    key: "Ctrl+Alt+1",
  },
];

const options = ["One", "Two", "Three"] as const;

export function PageCommandSystemPage(): JSX.Element {
  const focusId = useFocusTarget();

  useKeyboardShortcuts(shortcuts, focusId, (commandId) => {
    const command = pickCommandDefinition(commands, commandId);
    command.exec(0, () => {});
  });

  return (
    <StraightLayout title="Command demos">
      <VStack>
        <NiceH1>Page command system</NiceH1>
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
    </StraightLayout>
  );
}

PageCommandSystemPage.path = "commandPalette/pageCommandSystem" as const;
