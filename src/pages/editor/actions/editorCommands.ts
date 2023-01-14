import { CommandDefinition } from "../../../domains/command/CommandDefinition";
import { EditorPageState } from "./EditorPageState";
import { noteListCommands } from "./noteListActions";

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
