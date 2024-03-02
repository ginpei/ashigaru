import { useEffect } from "react";
import { KeyboardShortcut } from "./KeyboardShortcut";
import { useFocusTarget } from "./focusHooks";
import { keyboardEventToInputCommand } from "./keyboardEventManipulators";

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
