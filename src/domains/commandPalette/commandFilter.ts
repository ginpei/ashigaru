import { CommandDefinition } from "../command/CommandDefinition";

export interface CommandFilter {
  keyword: string;
}

export function isCommandMatched<State>(
  command: CommandDefinition<State>,
  filter: CommandFilter
): boolean {
  const title = command.title.toLowerCase();
  const { keyword } = filter;
  const keywordCharacters = keyword.toLowerCase().split("");

  let lastIndex = -1;
  return keywordCharacters.every((c) => {
    const index = title.indexOf(c, lastIndex + 1);
    if (index < 0 || index < lastIndex) {
      return false;
    }
    lastIndex = index;
    return true;
  });
}
