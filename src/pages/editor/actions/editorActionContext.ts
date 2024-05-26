import { createContext, useContext } from "react";
import { CommandDefinition } from "../../../domains/action/CommandDefinition";

const EditorCommandContext = createContext<CommandDefinition[]>([]);

export const EditorCommandContextProvider = EditorCommandContext.Provider;

export function useEditorCommands(): CommandDefinition[] {
  return useContext(EditorCommandContext);
}
