import { CommandDefinition } from "../../domains/command/CommandDefinition";

const modifierKeys = ["Alt", "Control", "Meta", "Shift"];

export function startCommandPallet(commands: CommandDefinition[]): () => void {
  const f = (event: KeyboardEvent) => onKeyDown(event, commands);
  document.addEventListener('keydown', f);
  return () => document.removeEventListener('keydown', f);
}

function onKeyDown(event: KeyboardEvent, commands: CommandDefinition[]) {
  const { altKey, ctrlKey, key, metaKey, shiftKey } = event;

  if (!modifierKeys.includes(key)) {
    console.log('# ', event.type, { altKey, ctrlKey, key, metaKey, shiftKey });
  }

  if (key.toLowerCase() === "p" && ctrlKey && shiftKey) {
    event.preventDefault();
    runCommandPallet(commands);
  }
}

function runCommandPallet(commands: CommandDefinition[]) {
  const id = window.prompt("[WIP] Command?");
  const command = commands.find((v) => v.id === id);
  if (!command) {
    console.log('# Unknown command ID', id);
    return;
  }

  command.action();
}