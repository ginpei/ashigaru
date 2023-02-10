export interface KeyboardShortcut {
  commandId: string;
  key: string;
  when?: string;
}

export function createKeyboardShortcut(
  initial?: Partial<KeyboardShortcut>
): KeyboardShortcut {
  return {
    commandId: initial?.commandId ?? "",
    key: initial?.key ?? "",
    when: initial?.when ?? "",
  };
}
