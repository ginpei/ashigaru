import { VStack } from "../../layout/VStack";
import { NiceH3 } from "../../nice/NiceH";
import { NiceSection } from "../../nice/NiceSection";
import { StraightLayout } from "../../pageLayout/straight/StraightLayout";
import { ComboboxDemo } from "./ComboboxDemo";
import { CommandPaletteExample } from "./CommandPaletteExample";
import { CommandPaletteFrameExample } from "./CommandPaletteFrameExample";
import { MyCommandPaletteExample } from "./MyCommandPaletteExample";

export function CommandPaletteShowcase(): JSX.Element {
  return (
    <StraightLayout title="<CommandPalette> demo">
      <NiceSection heading="Command palette" level="1">
        <CommandPaletteFrameExample />
        <MyCommandPaletteExample />
        <hr />
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
