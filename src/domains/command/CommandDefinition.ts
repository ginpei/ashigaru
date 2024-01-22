/**
 * An executable command.
 * @example
 * const def: CommandDefinition = {
 *   exec() { console.log("Hello, world!"); },
 *   id: "hello",
 *   title: "Hello",
 * };
 *
 * def.exec();
 * @example
 * useKeyboardShortcuts(shortcuts, focusId, (commandId) => {
 *   const def = pickCommandDefinition(commands, commandId);
 *   def.exec(state, setState);
 * });
 * @example
 * {commands.map((v) => (
 *   <button key={v.id} onClick={() => v.exec()}>
 *    {v.title}
 *  </button>
 * )}
 */
export interface CommandDefinition<Args extends any[] = any[]> {
  exec: (...args: Args) => void;

  id: string;

  /**
   * To display in the UI.
   */
  title: string;
}

export function createCommandDefinition<Args extends any[] = any[]>(
  initial?: Partial<CommandDefinition<Args>>,
): CommandDefinition<Args> {
  return {
    exec: initial?.exec ?? (() => {}),
    id: initial?.id ?? "",
    title: initial?.title ?? "",
  };
}

/**
 * @see pickCommandDefinition
 */
export function findCommandDefinition<Args extends any[] = any[]>(
  commands: CommandDefinition<Args>[],
  commandId: string,
): CommandDefinition<Args> | null {
  const def = commands.find((v) => v.id === commandId);
  return def ?? null;
}

/**
 * Returns the command specified by the given ID.
 * Throws an error if not found.
 * @see findCommandDefinition
 */
export function pickCommandDefinition<T extends any[] = any[]>(
  commands: CommandDefinition<T>[],
  commandId: string,
): CommandDefinition<T> {
  const def = findCommandDefinition(commands, commandId);
  if (!def) {
    throw new Error(`Command ID ${commandId} is not defined`);
  }
  return def;
}
