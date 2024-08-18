import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Action } from "../../Action";

/**
 * @example
 * const [
 *   commandPaletteVisible,
 *   setCommandPaletteVisible,
 *   paletteInput,
 *   setPaletteInput,
 *   commandPaletteActions,
 * ] = useCommandPalette();
 */
export function useCommandPaletteStates(): readonly [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  string,
  Dispatch<SetStateAction<string>>,
  Action<[]>[],
] {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");

  const actions = useMemo<Action<[]>[]>(() => {
    return [
      {
        exec() {
          setInput("");
          setVisible(true);
        },
        id: "showCommandPalette",
        patterns: [{ keyboard: "Ctrl+P" }],
      },
      {
        exec() {
          setInput(">");
          setVisible(true);
        },
        id: "showCommandPaletteForCommand",
        patterns: [{ keyboard: "Ctrl+Shift+P" }],
      },
    ];
  }, []);

  return [visible, setVisible, input, setInput, actions] as const;
}
