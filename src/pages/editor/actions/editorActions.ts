import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";
import { EditorPageState } from "./EditorPageState";
import { noteListCommands, noteListShortcuts } from "./noteListActions";

export const editorCommands: CommandDefinition<EditorPageState>[] = [
  ...noteListCommands,
  {
    action: () => {
      console.log("Hello World!");
    },
    id: "hello",
    title: "Say hello",
  },
];

export const editorShortcuts: KeyboardShortcut[] = [
  ...noteListShortcuts,
  {
    commandId: "showCommandPalette",
    key: "Ctrl+Shift+P",
  },
  {
    commandId: "hello",
    key: "Ctrl+Shift+X",
  },
];
