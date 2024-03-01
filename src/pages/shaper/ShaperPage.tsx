import { GridArea, GridFrame } from "../../domains/layout/GridFrame";
import { VStack } from "../../domains/layout/VStack";
import { NiceH1 } from "../../domains/nice/NiceH";
import { StraightLayout } from "../../domains/pageLayout/straight/StraightLayout";
import { CanvasPane } from "./canvas/CanvasPane";
import { ListPane } from "./list/ListPane";
import { ShapeData } from "./shape/ShapeData";
import { ShapeDataProvider } from "./shape/shapeDataContext";

export interface ShaperPageProps {}

export function ShaperPage(): JSX.Element {
  const shapeData: ShapeData[] = [
    {
      color: "red",
      height: 100,
      id: "1",
      left: 0,
      name: "Red",
      top: 0,
      width: 100,
    },
    {
      color: "blue",
      height: 100,
      id: "2",
      left: 100,
      name: "Blue",
      top: 0,
      width: 100,
    },
  ];

  return (
    <ShapeDataProvider value={shapeData}>
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
    </ShapeDataProvider>
  );
}
