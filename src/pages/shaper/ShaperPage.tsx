import { useState } from "react";
import { useKeyboardShortcuts } from "../../domains/action/keyboardShortcutHooks";
import { GridArea, GridFrame } from "../../domains/layout/GridFrame";
import { CommandProvider } from "./action/commandContext";
import { useShaperPageActions } from "./action/shaperPageActionHooks";
import { CanvasPane } from "./canvas/CanvasPane";
import { ListPane } from "./list/ListPane";
import { ShaperNavBar } from "./page/ShaperNavBar";
import { ShaperPageState } from "./page/ShaperPageState";
import { ShaperPageStateContextProvider } from "./page/shaperPageStateContext";
import { ShapeData } from "./shape/ShapeData";

export interface ShaperPageProps {}

const demoShapeData: ShapeData[] = [
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
    left: 90,
    name: "Blue",
    top: 10,
    width: 100,
  },
  {
    color: "white",
    height: 100,
    id: "3",
    left: 20,
    name: "White",
    top: 20,
    width: 100,
  },
];

export function ShaperPage(): JSX.Element {
  return (
    <Provider>
      <GridFrame
        className="h-[100vh] w-[100vw] overflow-hidden"
        gridTemplate={`
          "navbar navbar" 2rem
          "list   canvas" auto
          / 10rem auto
        `}
      >
        <GridArea area="navbar">
          <ShaperNavBar />
        </GridArea>
        <GridArea area="list" scroll>
          <ListPane />
        </GridArea>
        <GridArea area="canvas">
          <CanvasPane />
        </GridArea>
      </GridFrame>
    </Provider>
  );
}

function Provider({ children }: { children: JSX.Element }) {
  const [state, setState] = useState<ShaperPageState>({
    shapes: demoShapeData,
    selectedShapeIds: [],
  });

  const [commands, shortcuts] = useShaperPageActions(state, setState);

  useKeyboardShortcuts(shortcuts, (id) => {
    const command = commands.find((command) => command.id === id);
    command?.exec();
  });

  return (
    <ShaperPageStateContextProvider value={[state, setState]}>
      <CommandProvider value={commands}>
        {children}
        {/* ! */}
      </CommandProvider>
    </ShaperPageStateContextProvider>
  );
}
