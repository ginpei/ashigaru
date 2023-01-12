import { CommandDefinition } from "../../../domains/command/CommandDefinition";

export const editorCommands: CommandDefinition[] = [
  {
    action: () => {
      console.log("Hello World!");
    },
    id: "hello",
    title: "Say hello",
  },
];
