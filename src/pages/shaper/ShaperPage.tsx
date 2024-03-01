import { GridArea, GridFrame } from "../../domains/layout/GridFrame";
import { VStack } from "../../domains/layout/VStack";
import { NiceH1 } from "../../domains/nice/NiceH";
import { StraightLayout } from "../../domains/pageLayout/straight/StraightLayout";
import { CanvasPane } from "./canvas/CanvasPane";
import { ListPane } from "./list/ListPane";

export interface ShaperPageProps {}

export function ShaperPage(): JSX.Element {
  return (
    <StraightLayout className="ShaperPage" title="Home">
      <VStack>
        <NiceH1>ShaperPage</NiceH1>
        <GridFrame
          className="h-96"
          gridTemplate="'list canvas' auto / 100px auto"
        >
          <GridArea area="list">
            <ListPane />
          </GridArea>
          <GridArea area="canvas">
            <CanvasPane />
          </GridArea>
        </GridFrame>
      </VStack>
    </StraightLayout>
  );
}
