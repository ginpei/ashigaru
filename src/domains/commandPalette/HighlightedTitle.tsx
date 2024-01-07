import { HighlightedCharacter } from "./commandFilter";

export interface HighlightedTitleProps {
  chars: HighlightedCharacter[];
}

export function HighlightedTitle({
  chars,
}: HighlightedTitleProps): JSX.Element {
  return (
    <span className="HighlightedTitle">
      {chars.map((c, i) =>
        c.highlight ? (
          <b className="text-cyan-800" key={`${c}-${i}`}>
            {c.character}
          </b>
        ) : (
          c.character
        ),
      )}
    </span>
  );
}
