const specialKeyMap = {
  " ": "Space",
} as const;

/**
 * Builds input commands like `"Ctrl+Alt+Shift+X"`.
 */
export function keyboardEventToInputCommand(event: KeyboardEvent): string {
  // TODO support meta for macOS
  const { altKey, ctrlKey, key, metaKey, shiftKey } = event;
  const input = [
    ctrlKey ? "Ctrl" : "",
    altKey ? "Alt" : "",
    shiftKey ? "Shift" : "",
    getNiceKey(key),
  ]
    .filter((v) => v)
    .join("+");
  return input;
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
