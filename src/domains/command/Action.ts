import { CommandDefinition } from "./CommandDefinition";
import {
  createKeyboardShortcut,
  KeyboardShortcut,
} from "../shortcut/KeyboardShortcut";

export interface Action<State = any> extends CommandDefinition<State> {
  shortcuts: ActionKeyboardShortcut[];
}

type ActionKeyboardShortcut = Pick<KeyboardShortcut, "key" | "when">;

export function buildAction<State = any>(
  action: Action<State>,
): [CommandDefinition<State>, KeyboardShortcut[]] {
  const { shortcuts: actionShortcuts, ...command } = action;
  const shortcuts = actionShortcuts.map((v) =>
    createKeyboardShortcut({
      ...v,
      commandId: command.id,
    }),
  );

  return [command, shortcuts];
}

export function buildActions<State = any>(
  actions: Action<State>[],
): [CommandDefinition<State>[], KeyboardShortcut[]] {
  const commands: CommandDefinition<State>[] = [];
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
