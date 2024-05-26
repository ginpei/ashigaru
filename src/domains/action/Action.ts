import { CommandDefinition } from "./CommandDefinition";
import { createKeyboardShortcut, KeyboardShortcut } from "./KeyboardShortcut";

/**
 * A definition set of a command and its keyboard shortcuts.
 */
export interface Action<Args extends any[] = any[]>
  extends CommandDefinition<Args> {
  patterns: ActionPattern[];
}

/**
 * KeyboardShortcut definition bound to an action that includes a command.
 * Used as a part of `Action`.
 */
type ActionPattern = Omit<KeyboardShortcut, "commandId">;

/**
 * Break down a list of actions into commands and their keyboard shortcuts.
 */
export function breakActions<Args extends any[] = any[]>(
  actions: Action<Args>[],
): [CommandDefinition<Args>[], KeyboardShortcut[]] {
  const commands: CommandDefinition<Args>[] = [];
  const shortcuts: KeyboardShortcut[] = [];

  for (const action of actions) {
    const [command, shortcutList] = breakAction(action);
    commands.push(command);
    for (const shortcut of shortcutList) {
      shortcuts.push(shortcut);
    }
  }

  return [commands, shortcuts];
}

/**
 * Break down an action into a command and its keyboard shortcuts.
 */
function breakAction<Args extends any[] = any[]>(
  action: Action<Args>,
): [CommandDefinition<Args>, KeyboardShortcut[]] {
  const { patterns, ...command } = action;
  const shortcuts = patterns.map((v) =>
    createKeyboardShortcut({
      ...v,
      commandId: command.id,
    }),
  );

  return [command, shortcuts];
}
