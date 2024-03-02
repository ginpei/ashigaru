import { Dispatch, SetStateAction } from "react";
import { Action } from "../../../domains/action/Action";
import { ShaperPageState, selectShape } from "../page/ShaperPageState";

export function createShaperPageActions(
  state: ShaperPageState,
  setState: Dispatch<SetStateAction<ShaperPageState>>,
): Action[] {
  return [
    ...createShaperPagePredefinedActions(state, setState),
    // ...maybe you can add plugin actions here...
  ];
}

function createShaperPagePredefinedActions(
  state: ShaperPageState,
  setState: Dispatch<SetStateAction<ShaperPageState>>,
): Action[] {
  return [
    {
      exec() {
        setState((state) =>
          selectShape(
            state,
            state.shapes.map((v) => v.id),
            "single",
          ),
        );
      },
      id: "selectAllShapes",
      shortcuts: [
        {
          key: "Ctrl+A",
        },
      ],
      title: "Select all shapes",
    },
    {
      exec(ids: string[], type: "single" | "append") {
        setState((state) => selectShape(state, ids, type));
      },
      id: "selectShape",
      shortcuts: [],
      title: "Select shape",
    },
  ];
}
