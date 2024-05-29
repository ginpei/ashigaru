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
 * Break down a list of actions into commands and their keyboard shortcuts.
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
 * Break down an action into a command and its keyboard shortcuts.
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
