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

// TODO remove and rename this file no to hook
export function useFilteredCommand<State>(
  commands: CommandDefinition<State>[],
  filter: CommandFilter
): HighlightedCommand<State>[] {
  return useMemo(() => {
    return highlightCommands<State>(commands, filter);
  }, [commands, filter]);
}

export function highlightCommands<State>(
  commands: CommandDefinition<State>[],
  filter: CommandFilter
) {
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
}
