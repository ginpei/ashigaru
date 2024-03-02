// TODO move to domains

import { createContext, useContext } from "react";
import { CommandDefinition } from "../../../domains/action/CommandDefinition";

const CommandContext = createContext<CommandDefinition[]>([]);

export const CommandProvider = CommandContext.Provider;

export function useCommand(id: string): CommandDefinition | undefined {
  const commands = useContext(CommandContext);
  const command = commands.find((v) => v.id === id);
  return command;
}
