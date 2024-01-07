import { useState } from "react";
import { VStack } from "../../layout/VStack";
import { NiceInput } from "../../nice/NiceInput";
import { KeyboardShortcut } from "../KeyboardShortcut";
import { useFocusTarget } from "../focusHooks";
import { useKeyboardShortcuts } from "../keyboardShortcutHooks";
import {
  CommandDefinition,
  pickCommandDefinition,
} from "../../command/CommandDefinition";
import { NiceButton } from "../../nice/NiceButton";

const shortcuts: KeyboardShortcut[] = [
  {
    commandId: "save",
    key: "Ctrl+S",
  },
];

const commands: CommandDefinition[] = [
  {
    exec: () => window.alert("Saved."),
    id: "save",
    title: "Save",
  },
];
export function CommandByKeyboardExample(): JSX.Element {
  const focusId = useFocusTarget();

  useKeyboardShortcuts(shortcuts, focusId, (commandId) => {
    const command = pickCommandDefinition(commands, commandId);
    command.exec(0, () => {});
  });

  const onSaveClick = () => {
    const command = pickCommandDefinition(commands, "save");
    command.exec(0, () => {});
  };

  return (
    <VStack className="CommandByKeyboardExample">
      <p>
        Press the blow button or <code>Ctrl+S</code> to save.
      </p>
      <p>
        <NiceButton onClick={onSaveClick}>Save</NiceButton>
      </p>
    </VStack>
  );
}
