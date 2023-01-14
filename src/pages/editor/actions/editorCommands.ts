import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { noteListCommands } from "./noteListActions";

export const editorCommands: CommandDefinition[] = [
  ...noteListCommands,
  {
    action: () => {
      console.log("Hello World!");
    },
    id: "hello",
    title: "Say hello",
  },
];
