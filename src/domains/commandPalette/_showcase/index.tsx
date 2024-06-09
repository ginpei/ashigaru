import { VStack } from "../../layout/VStack";
import { NiceH1, NiceH3 } from "../../nice/NiceH";
import { NiceSection } from "../../nice/NiceSection";
import { StraightLayout } from "../../pageLayout/straight/StraightLayout";
import { ComboboxDemo } from "./ComboboxDemo";
import { CommandPaletteExample } from "./CommandPaletteExample";
import { CommandPaletteFrameExample } from "./CommandPaletteFrameExample";

export function CommandPaletteShowcase(): JSX.Element {
  return (
    <StraightLayout title="<CommandPalette> demo">
      <NiceSection heading="Command palette" level="1">
        <CommandPaletteFrameExample />
        <VStack>
          <CommandPaletteExample />
        </VStack>
        <VStack>
          <NiceH3>Headless UI original combo box</NiceH3>
          <ComboboxDemo />
        </VStack>
      </NiceSection>
    </StraightLayout>
  );
}

CommandPaletteShowcase.path = "commandPalette" as const;
