import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";
import { noteListShortcuts } from "./noteListActions";

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
