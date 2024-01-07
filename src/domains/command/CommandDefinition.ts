import { Dispatch, SetStateAction } from "react";

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
export interface CommandDefinition<State = any> {
  exec: (state: State, setState: Dispatch<SetStateAction<State>>) => void;

  id: string;

  /**
   * To display in the UI.
   */
  title: string;
}

export function createCommandDefinition<State>(
  initial?: Partial<CommandDefinition<State>>,
): CommandDefinition<State> {
  return {
    exec: initial?.exec ?? (() => {}),
    id: initial?.id ?? "",
    title: initial?.title ?? "",
  };
}

/**
 * @see pickCommandDefinition
 */
export function findCommandDefinition<State>(
  commands: CommandDefinition<State>[],
  commandId: string,
): CommandDefinition<State> | null {
  const def = commands.find((v) => v.id === commandId);
  return def ?? null;
}

/**
 * Returns the command specified by the given ID.
 * Throws an error if not found.
 * @see findCommandDefinition
 */
export function pickCommandDefinition<State>(
  commands: CommandDefinition<State>[],
  commandId: string,
): CommandDefinition<State> {
  const def = findCommandDefinition(commands, commandId);
  if (!def) {
    throw new Error(`Command ID ${commandId} is not defined`);
  }
  return def;
}
