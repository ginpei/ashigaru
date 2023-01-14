import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { KeyboardShortcut } from "../../../domains/shortcut/KeyboardShortcut";

export const noteListShortcuts: KeyboardShortcut[] = [
  {
    commandId: "selectAllNotes",
    key: "Ctrl+A",
    when: "noteListFocus",
  },
  {
    commandId: "focusPreviousNote",
    key: "ArrowUp",
    when: "noteListFocus",
  },
  {
    commandId: "focusNextNote",
    key: "ArrowDown",
    when: "noteListFocus",
  },
];

export const noteListCommands: CommandDefinition[] = [
  {
    action: () => {
      console.log("select");
    },
    id: "selectAllNotes",
    title: "Select all notes",
  },
  {
    action: () => {
      console.log("prev note");
    },
    id: "focusPreviousNote",
    title: "Focus on the previous note",
  },
  {
    action: () => {
      console.log("next note");
    },
    id: "focusNextNote",
    title: "Focus on the next note",
  },
];
