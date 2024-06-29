import { useState } from "react";
import { CommandProvider } from "../../domains/action/commandContext";
import { useShortcutRunner } from "../../domains/action/keyboardShortcutHooks";
import { useShaperPageActions } from "./action/shaperPageActionHooks";
import { useShaperPageConditions } from "./action/shaperPageConditions";
import { CanvasPane } from "./canvas/CanvasPane";
import { ListPane } from "./list/ListPane";
import { ShaperNavBar } from "./page/ShaperNavBar";
import { ShaperPageState } from "./page/ShaperPageState";
import { ShortcutListDialog } from "./page/ShortcutListDialog";
import {
  ShaperPageStateContextProvider,
  useShaperPageStateContext,
} from "./page/shaperPageStateContext";
import { PropertyPane } from "./property/PropertyPane";
import { ShapeData } from "./shape/ShapeData";

export interface ShaperPageProps {}

const demoShapeData: ShapeData[] = [
  {
    color: "#ff0000",
    height: 100,
    id: "1",
    left: 0,
    name: "Red",
    top: 0,
    width: 100,
  },
  {
    color: "#0000ff",
    height: 100,
    id: "2",
    left: 90,
    name: "Blue",
    top: 10,
    width: 100,
  },
  {
    color: "#ffffff",
    height: 100,
    id: "3",
    left: 20,
    name: "White",
    top: 20,
    width: 100,
  },
];

export function ShaperPage(): React.JSX.Element {
  return (
    <Provider>
      <>
        <div
          className="
          grid h-[100vh] w-[100vw] overflow-hidden
          [grid-template:'navbar_navbar_navbar'_2rem_'list_canvas_property'_auto_/_10rem_auto_20rem]
        "
        >
          <div className="grid [grid-area:navbar]">
            <ShaperNavBar />
          </div>
          <div className="grid overflow-auto [grid-area:list]">
            <ListPane />
          </div>
          <div className="grid [grid-area:canvas]">
            <CanvasPane />
          </div>
          <div className="grid overflow-y-auto [grid-area:property]">
            <PropertyPane />
          </div>
        </div>
        <PageDialogs />
      </>
    </Provider>
  );
}

function Provider({ children }: { children: React.JSX.Element }) {
  const [state, setState] = useState<ShaperPageState>({
    shapes: demoShapeData,
    selectedShapeIds: [],
    shortcutListDialogOpen: false,
  });

  const [commands, shortcuts] = useShaperPageActions(state, setState);
  const conditions = useShaperPageConditions();

  useShortcutRunner(commands, shortcuts, conditions);

  return (
    <ShaperPageStateContextProvider value={[state, setState]}>
      <CommandProvider value={commands}>
        {children}
        {/* ! */}
      </CommandProvider>
    </ShaperPageStateContextProvider>
  );
}

function PageDialogs() {
  const [pageState, setPageState] = useShaperPageStateContext();

  return (
    <>
      <ShortcutListDialog
        onClose={() =>
          setPageState((v) => ({ ...v, shortcutListDialogOpen: false }))
        }
        open={pageState.shortcutListDialogOpen}
      />
    </>
  );
}
