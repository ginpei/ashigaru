import { CommandDefinition } from "./CommandDefinition";
import { createKeyboardShortcut, KeyboardShortcut } from "./KeyboardShortcut";

export interface Action<Args extends any[] = any[]>
  extends CommandDefinition<Args> {
  shortcuts: ActionKeyboardShortcut[];
}

type ActionKeyboardShortcut = Pick<KeyboardShortcut, "args" | "key" | "when">;

export function buildAction<Args extends any[] = any[]>(
  action: Action<Args>,
): [CommandDefinition<Args>, KeyboardShortcut[]] {
  const { shortcuts: actionShortcuts, ...command } = action;
  const shortcuts = actionShortcuts.map((v) =>
    createKeyboardShortcut({
      ...v,
      commandId: command.id,
    }),
  );

  return [command, shortcuts];
}

export function buildActions<Args extends any[] = any[]>(
  actions: Action<Args>[],
): [CommandDefinition<Args>[], KeyboardShortcut[]] {
  const commands: CommandDefinition<Args>[] = [];
  const shortcuts: KeyboardShortcut[] = [];

  for (const action of actions) {
    const [command, shortcutList] = buildAction(action);
    commands.push(command);
    for (const shortcut of shortcutList) {
      shortcuts.push(shortcut);
    }
  }

  return [commands, shortcuts];
}
