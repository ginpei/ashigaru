import { Dispatch, SetStateAction } from "react";
import { Action } from "../../Action";

export function getDemoActions1(): Action[] {
  return [
    {
      exec() {
        window.alert("One");
      },
      id: "command1",
      patterns: [{ keyboard: "Ctrl+Alt+1" }],
      title: "One",
    },
    {
      exec() {
        window.alert("Two");
      },
      id: "command2",
      patterns: [],
      title: "Two",
    },
    {
      exec() {
        window.alert("Three");
      },
      id: "command3",
      patterns: [],
      title: "Three",
    },
    {
      exec(message = "(No message)") {
        window.alert(message);
      },
      id: "say",
      patterns: [
        { args: ["Hello World!"], keyboard: "Ctrl+S" },
        { args: ["Yo!"], keyboard: "Ctrl+Shift+S" },
      ],
      title: "Say",
    },
  ];
}

export function getDemoActions2(vars: {
  setCommandPaletteVisible: Dispatch<SetStateAction<boolean>>;
  setPaletteInput: Dispatch<SetStateAction<string>>;
}): Action[] {
  return [
    {
      exec() {
        vars.setPaletteInput("");
        vars.setCommandPaletteVisible(true);
      },
      id: "showCommandPalette",
      patterns: [{ keyboard: "Ctrl+P" }],
      title: "Show command palette",
    },
    {
      exec() {
        vars.setPaletteInput(">");
        vars.setCommandPaletteVisible(true);
      },
      id: "showCommandPaletteForCommand",
      patterns: [{ keyboard: "Ctrl+Shift+P" }],
      title: "Show command palette for Command",
    },
  ];
}
