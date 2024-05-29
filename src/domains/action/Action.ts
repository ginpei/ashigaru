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
type ActionPattern = Partial<
  Omit<KeyboardShortcut, "commandId"> & { title: string }
>;

/**
 * Break down a list of actions into commands, keyboard shortcuts, and command option patterns.
 */
export function breakActions<Args extends any[] = any[]>(
  actions: Action<Args>[],
): [CommandDefinition<Args>[], KeyboardShortcut[], ActionPattern[]] {
  const commands: CommandDefinition<Args>[] = [];
  const shortcuts: KeyboardShortcut[] = [];
  const options: ActionPattern[] = [];

  for (const action of actions) {
    const [command, shortcutList, newOptions] = breakAction(action);
    commands.push(command);
    for (const shortcut of shortcutList) {
      shortcuts.push(shortcut);
    }
    for (const option of newOptions) {
      options.push(option);
    }
  }

  return [commands, shortcuts, options];
}

/**
 * Break down aa actions into a command, keyboard shortcuts, and command option patterns.
 */
function breakAction<Args extends any[] = any[]>(
  action: Action<Args>,
): [CommandDefinition<Args>, KeyboardShortcut[], ActionPattern[]] {
  const { patterns, ...command } = action;

  const shortcuts: KeyboardShortcut[] = [];
  const commandPatterns: ActionPattern[] = [];
  for (const pattern of patterns) {
    if (pattern.key) {
      shortcuts.push(
        createKeyboardShortcut({
          ...pattern,
          commandId: command.id,
        }),
      );
    }

    if (pattern.title) {
      commandPatterns.push({
        ...createKeyboardShortcut({
          ...pattern,
          commandId: command.id,
        }),
        title: pattern.title,
      });
    }
  }

  return [command, shortcuts, commandPatterns];
}
