import { Action } from "../../command/Action";
import { VStack } from "../../layout/VStack";
import { NiceH1, NiceH3 } from "../../nice/NiceH";
import { Note } from "../../note/Note";
import { StraightLayout } from "../../pageLayout/straight/StraightLayout";
import { ComboboxDemo } from "./ComboboxDemo";
import { CommandPaletteExample } from "./CommandPaletteExample";
import { CommandPaletteFrameExample } from "./CommandPaletteFrameExample";

export const demoActions: Action[] = [
  {
    exec() {
      console.log("This is the demo command #1");
    },
    id: "command1",
    shortcuts: [],
    title: "Demo command 1",
  },
  {
    exec() {
      console.log("This is the demo command #2");
    },
    id: "command2",
    shortcuts: [
      {
        key: "Ctrl+Example",
      },
    ],
    title: "Demo command 2",
  },
  {
    exec() {
      console.log("This is the demo command #3");
    },
    id: "command3",
    shortcuts: [],
    title: "Demo command 3",
  },
];

export const demoNotes: Note[] = Array.from({ length: 30 }).map((_v, i) => ({
  body: `Hello, this is a note #${i}`,
  id: `note-${i}`,
  title: `Demo note ${i}`,
}));

function CommandPaletteShowcase(): JSX.Element {
  return (
    <StraightLayout title="<CommandPalette> demo">
      <VStack className="CommandPaletteShowcase">
        <NiceH1>Command palette</NiceH1>
        <CommandPaletteFrameExample />
        <CommandPaletteExample />
        <NiceH3>Headless UI original combo box</NiceH3>
        <ComboboxDemo />
      </VStack>
    </StraightLayout>
  );
}

export default CommandPaletteShowcase;
