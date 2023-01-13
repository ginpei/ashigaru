export interface CommandDefinition {
  action: () => void;
  id: string;
  title: string;
}

/**
 * @see pickCommandDefinition
 */
export function findCommandDefinition(
  commands: CommandDefinition[],
  commandId: string
): CommandDefinition | null {
  const def = commands.find((v) => v.id === commandId);
  return def ?? null;
}

/**
 * Returns the command specified by the given ID.
 * Throws an error if not found.
 * @see findCommandDefinition
 */
export function pickCommandDefinition(
  commands: CommandDefinition[],
  commandId: string
): CommandDefinition {
  const def = findCommandDefinition(commands, commandId);
  if (!def) {
    throw new Error(`Command ID ${commandId} is not defined`);
  }
  return def;
}
