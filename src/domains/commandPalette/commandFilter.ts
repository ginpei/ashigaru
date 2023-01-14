import { CommandDefinition } from "../command/CommandDefinition";

export interface CommandFilter {
  keyword: string;
}

export function filterCommands<State>(
  commands: CommandDefinition<State>[],
  filter: CommandFilter
): CommandDefinition<State>[] {
  const input = filter.keyword;
  const filteredCommands = commands.filter((v) => v.id.includes(input));
  return filteredCommands;
}
