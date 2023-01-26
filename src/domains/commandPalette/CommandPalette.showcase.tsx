import { useState } from "react";
import { StraightLayout } from "../../layouts/straight/StraightLayout";
import { CommandDefinition } from "../command/CommandDefinition";
import { HStack } from "../layout/HStask";
import { VStack } from "../layout/VStack";
import { NiceButton } from "../nice/NiceButton";
import { NiceH1, NiceH2, NiceH3 } from "../nice/NiceH";
import { KeyboardShortcut } from "../shortcut/KeyboardShortcut";
import { ComboboxDemo } from "./ComboboxDemo";
import {
  CommandPalette,
  CommandPalettePageState,
  CommandPaletteSelectHandler,
} from "./CommandPalette";
import { CommandPaletteFrame } from "./CommandPaletteFrame";

interface PageState extends CommandPalettePageState {
  filePaletteVisible: boolean;
}

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

const demoFiles: CommandDefinition[] = [
  {
    action() {},
    id: "file://path/to/file1",
    title: "file1",
  },
  {
    action() {},
    id: "file://path/to/file2",
    title: "file2",
  },
  {
    action() {},
    id: "file://path/to/file3",
    title: "file3",
  },
];

function CommandPaletteShowcase(): JSX.Element {
  const [frameVisible, setFrameVisible] = useState(false);
  const [state, setState] = useState<PageState>({
    commandPaletteVisible: false,
    filePaletteVisible: false,
  });

  const onCommandSelect: CommandPaletteSelectHandler<{}> = (command) => {
    console.log("# command", command);
    setState((v) => ({ ...v, commandPaletteVisible: false }));
  };

  const onFileSelect: CommandPaletteSelectHandler<{}> = (command) => {
    console.log("# file", command);
    setState((v) => ({ ...v, filePaletteVisible: false }));
  };

  return (
    <StraightLayout title="<CommandPalette> demo">
      <VStack className="CommandPaletteShowcase">
        <NiceH1>Command palette</NiceH1>
        <NiceH2>&lt;CommandPaletteFrame&gt;</NiceH2>
        <p>
          <NiceButton onClick={() => setFrameVisible(true)}>Open</NiceButton>
        </p>
        <NiceH2>&lt;CommandPalette&gt;</NiceH2>
        <p>* No shortcuts are prepared in this demo page.</p>
        <HStack>
          <NiceButton
            onClick={() =>
              setState((v) => ({ ...v, commandPaletteVisible: true }))
            }
          >
            Open
          </NiceButton>
          <NiceButton
            onClick={() =>
              setState((v) => ({ ...v, filePaletteVisible: true }))
            }
          >
            Select file...
          </NiceButton>
        </HStack>
        <NiceH3>Headless UI original combo box</NiceH3>
        <ComboboxDemo />
        <CommandPaletteFrame
          filter={(input, values) =>
            values.filter((v) => v.toLowerCase().includes(input.toLowerCase()))
          }
          focusTargetId="demoCommandPaletteFrameFocus"
          getKey={(v) => v}
          onSelect={(v) => {
            console.log(v);
            setFrameVisible(false);
          }}
          open={frameVisible}
          options={["One", "Two", "Three"]}
          renderEmptyItem={() => <>No match</>}
          renderItem={(v) => <>{v}</>}
        />
        <CommandPalette
          commands={demoCommands}
          open={state.commandPaletteVisible}
          onSelect={onCommandSelect}
          shortcuts={demoShortcuts}
        />
        <CommandPalette
          commands={demoFiles}
          open={state.filePaletteVisible}
          onSelect={onFileSelect}
        />
      </VStack>
    </StraightLayout>
  );
}

export default CommandPaletteShowcase;
