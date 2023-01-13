import { useMemo } from "react";
import { CommandDefinition } from "../command/CommandDefinition";

export interface CommandFilter {
  keyword: string;
}

export function useFilteredCommand(
  commands: CommandDefinition[],
  conditions: CommandFilter
): CommandDefinition[] {
  const input = conditions.keyword;
  const filteredCommands = useMemo(() => {
    return commands.filter((v) => v.id.includes(input));
  }, [commands, input]);
  return filteredCommands;
}
