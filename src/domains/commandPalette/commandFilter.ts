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

/**
 * @returns `null` if not matched
 */
export function highlightFilteredCommandTitle(
  title: string,
  keyword: string
): { highlight: boolean; character: string }[] | null {
  const highlighted: ReturnType<typeof highlightFilteredCommandTitle> = [];

  let kIndex = 0;
  for (const tChar of title) {
    const kChar = keyword[kIndex] ?? "";
    if (tChar.toLowerCase() === kChar.toLowerCase()) {
      highlighted.push({ character: tChar, highlight: true });
      kIndex += 1;
    } else {
      highlighted.push({ character: tChar, highlight: false });
    }
  }

  if (kIndex !== keyword.length) {
    return null;
  }

  return highlighted;
}
