import { CommandDefinition } from "../command/CommandDefinition";

export interface CommandFilter {
  keyword: string;
}

export interface HighlightedCharacter {
  character: string;
  highlight: boolean;
}

/**
 * @returns `null` if not matched
 */
export function highlightFilteredCommandTitle(
  title: string,
  keyword: string
): HighlightedCharacter[] | null {
  const highlighted: HighlightedCharacter[] = [];

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
