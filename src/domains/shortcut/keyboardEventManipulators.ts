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
    key.length === 1 ? key.toUpperCase() : key,
  ].filter((v) => v).join("+");
  return input;
}
