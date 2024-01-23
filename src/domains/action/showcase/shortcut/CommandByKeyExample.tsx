import {
  CommandDefinition,
  pickCommandDefinition,
} from "../../CommandDefinition";
import { VStack } from "../../../layout/VStack";
import { NiceButton } from "../../../nice/NiceButton";
import { NiceCode } from "../../../nice/NiceCode";
import { KeyboardShortcut } from "../../KeyboardShortcut";
import { useKeyboardShortcuts } from "../../keyboardShortcutHooks";

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
  useKeyboardShortcuts(shortcuts, (commandId) => {
    const command = pickCommandDefinition(commands, commandId);
    command.exec();
  });

  const onSaveClick = () => {
    const command = pickCommandDefinition(commands, "save");
    command.exec();
  };

  return (
    <VStack className="CommandByKeyboardExample">
      <p>
        Press the blow button or <NiceCode>Ctrl+S</NiceCode> to save.
      </p>
      <p>
        <NiceButton onClick={onSaveClick}>Save</NiceButton>
      </p>
    </VStack>
  );
}
