const specialKeyMap = {
  " ": "Space",
} as const;

/**
 * Builds input commands like `"Ctrl+Alt+Shift+X"`.
 */
export function keyboardEventToInputCommand(event: KeyboardEvent): string {
  const { altKey, ctrlKey, key, metaKey, shiftKey } = event;

  if (isModifierKey(key)) {
    return "";
  }

  // TODO support meta for macOS
  const input = [
    ctrlKey ? "Ctrl" : "",
    altKey ? "Alt" : "",
    !isSymbolKey(key) && shiftKey ? "Shift" : "",
    getNiceKey(key),
  ]
    .filter((v) => v)
    .join("+");
  return input;
}

function isModifierKey(key: string): boolean {
  return key === "Control" || key === "Meta";
}

/**
 * Returns `true` for symbols that might require shift key to input
 * @example
 * isSymbolKey(" "); // => false
 * isSymbolKey("$"); // => true
 * isSymbolKey("a"); // => false
 * isSymbolKey("ArrowUp"); // => false
 */
function isSymbolKey(key: string): boolean {
  const symbols = "_-,;:!?.'\"()[]{}@*/\\&#%`^+<=>|~$";
  return symbols.includes(key);
}

function getNiceKey(key: string): string {
  if (key in specialKeyMap) {
    return specialKeyMap[key as keyof typeof specialKeyMap];
  }

  if (key.length === 1) {
    return key.toUpperCase();
  }

  return key;
}
