import { CommandDefinition } from "../command/CommandDefinition";

export interface CommandFilter {
  keyword: string;
}

export interface HighlightedCharacter {
  character: string;
  highlight: boolean;
}

export type Highlighted<T> = T & {
  highlightedCharacters: HighlightedCharacter[];
};

// TODO replace with Highlighted
export interface HighlightedCommand<Args extends any[] = any[]>
  extends CommandDefinition<Args> {
  highlightedCharacters: HighlightedCharacter[];
}

/**
 * @returns `null` if not matched
 */
// TODO rename
export function highlightFilteredCommandTitle(
  title: string,
  keyword: string,
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

// TODO find better name
// TODO accept anything other than commands
export function highlightCommands<Args extends any[] = any[]>(
  commands: CommandDefinition<Args>[],
  filter: CommandFilter,
) {
  const filtered: HighlightedCommand<Args>[] = [];
  for (const command of commands) {
    const highlightedCharacters = highlightFilteredCommandTitle(
      command.title,
      filter.keyword,
    );
    if (highlightedCharacters) {
      filtered.push({ ...command, highlightedCharacters });
    }
  }
  return filtered;
}
