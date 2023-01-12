export interface CommandDefinition {
  action: () => void;
  id: string;
  title: string;
}

/**
 * Returns the command specified by the given ID.
 * Throws an error if not found.
 */
export function pickCommandDefinition(commands: CommandDefinition[], commandId: string): CommandDefinition {
  const def = commands.find((v) => v.id === commandId);
  if (!def) {
    throw new Error(`Command ID ${commandId} is not defined`);
  }
  return def;
}
