import { VStack } from "../../layout/VStack";
import { NiceH1 } from "../../nice/NiceH";
import { StraightLayout } from "../../pageLayout/straight/StraightLayout";
import { NiceMenuExample } from "./NiceMenu/NiceMenuExample";

export function MenuShowcase(): JSX.Element {
  return (
    <StraightLayout title="<NiceMenu> demo">
      <VStack className="CommandPaletteShowcase">
        <NiceH1>{"<NiceMenu>"}</NiceH1>
        <NiceMenuExample />
      </VStack>
    </StraightLayout>
  );
}

MenuShowcase.path = "menu/NiceMenu" as const;
