import { ConditionFunctionMap, doesConditionMatch } from "./Condition";

/**
 * Defines a shortcut bound to a keyboard input and a command.
 */
export interface KeyboardShortcut {
  args?: any[];
  commandId: string;
  /**
   * You can use modifiers like Ctrl, Shift, Alt in this order.
   *
   * Symbols cannot be used with Shift modifier because it may be required to
   * input it.
   *
   * See `keyboardEventToInputCommand()` to generate this string from a keyboard
   * event.
   * @example
   * v.keyboard = "Enter"
   * v.keyboard = "Ctrl+Shift+Alt+Enter"
   *
   * v.keyboard = "?"
   * v.keyboard = "Ctrl+Alt+?"
   */
  keyboard: string;
  when?: string;
}

export function createKeyboardShortcut(
  initial?: Partial<KeyboardShortcut>,
): KeyboardShortcut {
  return {
    args: initial?.args ?? [],
    commandId: initial?.commandId ?? "",
    keyboard: initial?.keyboard ?? "",
    when: initial?.when ?? "",
  };
}

export function findShortcut(
  shortcuts: KeyboardShortcut[],
  input: string,
  conditions: ConditionFunctionMap,
): KeyboardShortcut | undefined {
  const shortcut = shortcuts.find((shortcut) => {
    return (
      shortcut.keyboard === input &&
      doesConditionMatch(shortcut.when ?? "", conditions)
    );
  });

  return shortcut;
}
