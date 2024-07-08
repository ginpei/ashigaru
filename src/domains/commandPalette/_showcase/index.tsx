import { VStack } from "../../layout/VStack";
import { NiceH3 } from "../../nice/NiceH";
import { NiceSection } from "../../nice/NiceSection";
import { StraightLayout } from "../../pageLayout/straight/StraightLayout";
import { ComboboxExample } from "./ComboboxExample";
import { CommandPaletteFrameExample } from "./CommandPaletteFrameExample";
import { MyCommandPaletteExample } from "./MyCommandPaletteExample";

export function CommandPaletteShowcase(): React.JSX.Element {
  return (
    <StraightLayout title="Command palette examples">
      <NiceSection heading="Command palette" level="1">
        <CommandPaletteFrameExample />
        <MyCommandPaletteExample />
        <ComboboxExample />
      </NiceSection>
    </StraightLayout>
  );
}

CommandPaletteShowcase.path = "commandPalette" as const;
