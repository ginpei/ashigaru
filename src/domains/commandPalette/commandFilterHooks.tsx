import { useMemo } from "react";
import { CommandDefinition } from "../command/CommandDefinition";
import { CommandFilter, isCommandMatched } from "./commandFilter";

export function useFilteredCommand<State>(
  commands: CommandDefinition<State>[],
  filter: CommandFilter
): CommandDefinition<State>[] {
  return useMemo(() => {
    return commands.filter((v) => isCommandMatched(v, filter));
  }, [commands, filter]);
}
