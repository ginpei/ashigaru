import { useMemo } from "react";
import { CommandDefinition } from "../command/CommandDefinition";
import {
  CommandFilter,
  HighlightedCharacter,
  highlightFilteredCommandTitle,
} from "./commandFilter";

export interface HighlightedCommand<State> extends CommandDefinition<State> {
  highlightedCharacters: HighlightedCharacter[];
}

export function useFilteredCommand<State>(
  commands: CommandDefinition<State>[],
  filter: CommandFilter
): HighlightedCommand<State>[] {
  return useMemo(() => {
    const filtered: HighlightedCommand<State>[] = [];
    for (const command of commands) {
      const highlightedCharacters = highlightFilteredCommandTitle(
        command.title,
        filter.keyword
      );
      if (highlightedCharacters) {
        filtered.push({ ...command, highlightedCharacters });
      }
    }
    return filtered;
  }, [commands, filter]);
}
