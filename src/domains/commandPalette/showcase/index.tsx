import { VStack } from "../../layout/VStack";
import { NiceH1, NiceH3 } from "../../nice/NiceH";
import { StraightLayout } from "../../pageLayout/straight/StraightLayout";
import { ComboboxDemo } from "./ComboboxDemo";
import { CommandPaletteExample } from "./CommandPaletteExample";
import { CommandPaletteFrameExample } from "./CommandPaletteFrameExample";

export function CommandPaletteShowcase(): JSX.Element {
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

CommandPaletteShowcase.path = "commandPalette/CommandPalette" as const;
