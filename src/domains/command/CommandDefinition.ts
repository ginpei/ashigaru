export interface CommandDefinition {
  action: () => void;
  id: string;
  title: string;
}
