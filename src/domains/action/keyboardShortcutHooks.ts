import { useCallback, useEffect } from "react";
import { ConditionFunctionMap } from "./Condition";
import { KeyboardShortcut, findShortcut } from "./KeyboardShortcut";
import { useFocusTarget } from "./focusHooks";
import { keyboardEventToInputCommand } from "./keyboardEventManipulators";

/**
 * @deprecated TODO replace with 2
 */
export function useKeyboardShortcuts(
  defs: KeyboardShortcut[],
  onCommand: (commandId: string, args: any[]) => void,
): void {
  const focusId = useFocusTarget();

  useKeyDown((event) => {
    const input = keyboardEventToInputCommand(event);

    const def = defs.find(
      (v) => v.key === input && (!v.when || v.when === focusId),
    );
    if (!def) {
      return;
    }

    event.preventDefault();
    onCommand(def.commandId, def.args ?? []);
  });
}

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
