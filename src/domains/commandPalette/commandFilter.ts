import { CommandDefinition } from "../command/CommandDefinition";

export interface CommandFilter {
  keyword: string;
}

export function isCommandMatched<State>(
  command: CommandDefinition<State>,
  filter: CommandFilter
): boolean {
  const input = filter.keyword;
  return command.title.toLowerCase().includes(input.toLowerCase());
}
