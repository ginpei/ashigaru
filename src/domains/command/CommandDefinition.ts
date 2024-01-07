import { Dispatch, SetStateAction } from "react";

export interface CommandDefinition<State = any> {
  exec: (state: State, setState: Dispatch<SetStateAction<State>>) => void;
  id: string;
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
