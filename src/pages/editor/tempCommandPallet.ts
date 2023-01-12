import { CommandDefinition } from "../../domains/command/CommandDefinition";

const modifierKeys = ["Alt", "Control", "Meta", "Shift"];

export function startCommandPallet(commands: CommandDefinition[]): () => void {
  const f = (event: KeyboardEvent) => onKeyDown(event, commands);
  document.addEventListener("keydown", f);
  return () => document.removeEventListener("keydown", f);
}

function onKeyDown(event: KeyboardEvent, commands: CommandDefinition[]) {
  const { altKey, ctrlKey, key, metaKey, shiftKey } = event;

  if (!modifierKeys.includes(key)) {
    console.log("# ", event.type, { altKey, ctrlKey, key, metaKey, shiftKey });
  }

  if (key.toLowerCase() === "p" && ctrlKey && shiftKey) {
    event.preventDefault();
    runCommandPallet(commands);
  }
}

function runCommandPallet(allCommands: CommandDefinition[]) {
  const id = receiveCommand();
  if (!id) {
    return;
  }

  const command = findCommand(id, allCommands);
  if (!command) {
    console.log("# Unknown command ID", id);
    return;
  }

  command.action();
}

function receiveCommand() {
  const id = window.prompt("[WIP] Command?");
  return id;
}

function findCommand(id: string, commands: CommandDefinition[]) {
  const command = commands.find((v) => v.id === id);
  return command;
}
