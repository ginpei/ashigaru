import { useState } from "react";
import { VStack } from "../../layout/VStack";
import { NiceInput } from "../../nice/NiceInput";
import { KeyboardShortcut } from "../KeyboardShortcut";
import { useFocusTarget } from "../focusHooks";
import { useKeyboardShortcuts } from "../keyboardShortcutHooks";
import { NiceCode } from "../../nice/NiceCode";

const defs: KeyboardShortcut[] = [
  {
    commandId: "command1",
    key: "1",
  },
  {
    commandId: "command2",
    key: "Ctrl+Alt+2",
  },
  {
    commandId: "command3",
    key: "Ctrl+Enter",
    when: "editor",
  },
  {
    commandId: "list:selectAll",
    key: "Ctrl+A",
    when: "list",
  },
  {
    commandId: "list:unselectAll",
    key: "Ctrl+Shift+A",
    when: "list",
  },
];

export function KeyboardShortcutHooksExample(): JSX.Element {
  const focusId = useFocusTarget();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useKeyboardShortcuts(defs, focusId, (commandId) => {
    console.log(commandId);

    // example to run CommandDefinition:
    //   const command = pickCommandDefinition(commands, commandId);
    //   command.exec(state, setState);

    // run hard-coded commands just for example
    if (commandId === "command3") {
      setMessage(input);
      setInput("");
    } else if (
      commandId === "list:selectAll" ||
      commandId === "list:unselectAll"
    ) {
      document
        .querySelectorAll<HTMLInputElement>(
          "[data-focus-target=list] input[type=checkbox]",
        )
        .forEach((v) => (v.checked = commandId === "list:selectAll"));
    }
  });

  return (
    <VStack className="KeyboardShortcutHooksExample">
      <details>
        <summary>Example NiceCode</summary>
        <pre className="bg-slate-100 p-2 text-xs">
          const def = {JSON.stringify(defs, null, 2)};
          {`
const focusId = useFocusTarget();
useKeyboardShortcuts(defs, focusId, (commandId) => {
  console.log(commandId);
});`}
        </pre>
      </details>
      <label className="flex flex-col">
        <div>
          Input your message and hit <NiceCode>Ctrl+Enter</NiceCode> to send:
        </div>
        <NiceInput
          data-focus-target="editor"
          onChange={(v) => setInput(v.target.value)}
          value={input}
        />
      </label>
      <p>
        Message: <span className="text-sm">{message}</span>
      </p>
      <VStack
        className="border p-2 focus-within:border-blue-400"
        data-focus-target="list"
        tabIndex={0}
      >
        <p>
          Press <NiceCode>Ctrl+A</NiceCode> to select all.
        </p>
        <ul>
          <li>
            <label>
              <input type="checkbox" />
              Checkbox 1
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              Checkbox 2
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              Checkbox 3
            </label>
          </li>
        </ul>
      </VStack>
    </VStack>
  );
}
