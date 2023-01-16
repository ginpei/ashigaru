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

export function highlightFilteredCommandTitle(
  title: string,
  keyword: string
): { highlight: boolean; character: string }[] {
  const letters = Array.from(keyword.toLowerCase());
  const highlighted: ReturnType<typeof highlightFilteredCommandTitle> =
    Array.from(title).map((titleCharacter) => {
      const index = letters.indexOf(titleCharacter.toLowerCase());
      if (index < 0) {
        return {
          character: titleCharacter,
          highlight: false,
        };
      }

      letters[index] = "";
      return {
        character: titleCharacter,
        highlight: true,
      };
    });
  return highlighted;
}
