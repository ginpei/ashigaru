import { useMemo } from "react";
import { CommandDefinition } from "../command/CommandDefinition";
import { CommandFilter, filterCommands } from "./commandFilter";

export function useFilteredCommand<State>(
  commands: CommandDefinition<State>[],
  filter: CommandFilter
): CommandDefinition<State>[] {
  return useMemo(() => {
    return filterCommands(commands, filter);
  }, [commands, filter]);
}
