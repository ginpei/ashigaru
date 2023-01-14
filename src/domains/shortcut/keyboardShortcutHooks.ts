import { useEffect } from "react";
import { keyboardEventToInputCommand } from "./keyboardEventManipulators";
import { KeyboardShortcut } from "./KeyboardShortcut";

export function useKeyboardShortcuts(
  defs: KeyboardShortcut[],
  focusId: string,
  onCommand: (commandId: string) => void
): void {
  useKeyDown((event) => {
    const input = keyboardEventToInputCommand(event);

    const def = defs.find(
      (v) => v.key === input && (!v.when || v.when === focusId)
    );
    if (!def) {
      return;
    }

    event.preventDefault();
    onCommand(def.commandId);
  });
}

function useKeyDown(
  callback: (event: KeyboardEvent) => void,
  d?: Document
): void {
  useEffect(() => {
    const d2 = d ?? document;
    d2.addEventListener("keydown", callback);
    return () => d2.removeEventListener("keydown", callback);
  }, [callback, d]);
}
