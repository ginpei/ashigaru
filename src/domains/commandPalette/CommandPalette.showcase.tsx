import { useState } from "react";
import { CommandDefinition } from "../command/CommandDefinition";
import { NiceButton } from "../control/NiceButton";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { ComboboxDemo } from "./ComboboxDemo";
import {
  CommandPalette,
  CommandPalettePageState,
  CommandPaletteSelectHandler,
} from "./CommandPalette";

const demoCommands: CommandDefinition[] = [
  {
    action() {
      console.log("This is the demo command #1");
    },
    id: "command1",
    title: "Demo command 1",
  },
  {
    action() {
      console.log("This is the demo command #2");
    },
    id: "command2",
    title: "Demo command 2",
  },
  {
    action() {
      console.log("This is the demo command #3");
    },
    id: "command3",
    title: "Demo command 3",
  },
];

const demoShortcuts: KeyboardShortcut[] = [
  {
    commandId: "command2",
    key: "Ctrl+Example",
  },
];

function CommandPaletteShowcase(): JSX.Element {
  const [state, setState] = useState<CommandPalettePageState>({
    commandPaletteVisible: false,
  });

  const onCommandSelect: CommandPaletteSelectHandler<{}> = (command) => {
    console.log("# command", command);
    setState((v) => ({ ...v, commandPaletteVisible: false }));
  };

  return (
    <div className="CommandPaletteShowcase">
      <h1>CommandPaletteShowcase</h1>
      <p>
        <NiceButton
          onClick={() =>
            setState((v) => ({ ...v, commandPaletteVisible: true }))
          }
        >
          Open
        </NiceButton>
      </p>
      <ComboboxDemo />
      <CommandPalette
        commands={demoCommands}
        open={state.commandPaletteVisible}
        onSelect={onCommandSelect}
        shortcuts={demoShortcuts}
      />
    </div>
  );
}

export default CommandPaletteShowcase;
