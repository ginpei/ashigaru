import { useCallback, useEffect } from "react";
import { CommandDefinition, execCommand } from "./CommandDefinition";
import { ConditionFunctionMap } from "./Condition";
import { KeyboardShortcut, findShortcut } from "./KeyboardShortcut";
import { keyboardEventToInputCommand } from "./keyboardEventManipulators";

export function useKeyboardShortcuts2(
  shortcuts: KeyboardShortcut[],
  conditions: ConditionFunctionMap,
  onCommand: (commandId: string, args: any[]) => void,
): void {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const input = keyboardEventToInputCommand(event);

      const shortcut = findShortcut(shortcuts, input, conditions);
      if (!shortcut) {
        return;
      }

      event.preventDefault();
      onCommand(shortcut.commandId, shortcut.args ?? []);
    },
    [conditions, onCommand, shortcuts],
  );

  useKeyDown(onKeyDown);
}

export function useShortcutRunner(
  commands: CommandDefinition[],
  shortcuts: KeyboardShortcut[],
  conditions: ConditionFunctionMap,
) {
  useKeyboardShortcuts2(shortcuts, conditions, (commandId, args) => {
    execCommand(commands, commandId, args);
  });
}

function useKeyDown(
  callback: (event: KeyboardEvent) => void,
  d?: Document,
): void {
  useEffect(() => {
    const handler = (event: Event | KeyboardEvent) => {
      // when you select from `<datalist>`, it becomes `Event` instead of `KeyboardEvent`
      if (!(event instanceof KeyboardEvent)) {
        return;
      }

      callback(event);
    };

    const d2 = d ?? document;
    d2.addEventListener("keydown", handler);
    return () => d2.removeEventListener("keydown", handler);
  }, [callback, d]);
}
