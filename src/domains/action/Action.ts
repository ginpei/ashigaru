/**
 * A definition set of a command and its keyboard shortcuts.
 */
export interface Action<Args extends unknown[] = unknown[]> {
  exec: (...args: Args) => void;

  id: string;

  /**
   * Usage patterns: keyboard shortcuts and command options.
   */
  patterns: ActionPattern[];

  /**
   * @deprecated Use `title` in `ActionPattern` instead.
   */
  title?: string;
}

/**
 * KeyboardShortcut definition bound to an action that includes a command.
 * Used as a part of `Action`.
 */
export interface ActionPattern {
  /**
   * Values passed to `exec()`.
   */
  args?: any[] | undefined;

  /**
   * To execute a command by a keyboard input.
   * For example, `Ctrl+Shift+P`.
   */
  keyboard?: string | undefined;

  /**
   * To display in the UI.
   */
  title?: string | undefined;

  /**
   * Conditions.
   * For example, `textFocus && !hasAnchor`.
   */
  when?: string | undefined;
}
