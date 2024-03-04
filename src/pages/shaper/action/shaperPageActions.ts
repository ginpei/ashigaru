import { Dispatch, SetStateAction } from "react";
import { Action } from "../../../domains/action/Action";
import { ShaperPageState, selectShape } from "../page/ShaperPageState";
import { moveShape } from "../page/sateFunctions/move";

export function createShaperPageActions(
  state: ShaperPageState,
  setState: Dispatch<SetStateAction<ShaperPageState>>,
): Action[] {
  return [
    ...createShaperPagePredefinedActions(state, setState),
    ...createMoveActions(state, setState),
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
          when: "canvasFocus",
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

function createMoveActions(
  state: ShaperPageState,
  setState: Dispatch<SetStateAction<ShaperPageState>>,
): Action[] {
  return [
    {
      exec(direction: "x" | "y", distance: number) {
        const ids = state.selectedShapeIds;
        setState((state) => moveShape(state, ids, direction, distance));
      },
      id: "moveShape",
      shortcuts: [
        {
          key: "ArrowUp",
          when: "canvasFocus",
          args: ["y", -1],
        },
        {
          key: "Shift+ArrowUp",
          when: "canvasFocus",
          args: ["y", -10],
        },
        {
          key: "Ctrl+ArrowUp",
          when: "canvasFocus",
          args: ["y", -100],
        },
        {
          key: "ArrowRight",
          when: "canvasFocus",
          args: ["x", 1],
        },
        {
          key: "Shift+ArrowRight",
          when: "canvasFocus",
          args: ["x", 10],
        },
        {
          key: "Ctrl+ArrowRight",
          when: "canvasFocus",
          args: ["x", 100],
        },
        {
          key: "ArrowDown",
          when: "canvasFocus",
          args: ["y", 1],
        },
        {
          key: "Shift+ArrowDown",
          when: "canvasFocus",
          args: ["y", 10],
        },
        {
          key: "Ctrl+ArrowDown",
          when: "canvasFocus",
          args: ["y", 100],
        },
        {
          key: "ArrowLeft",
          when: "canvasFocus",
          args: ["x", -1],
        },
        {
          key: "Shift+ArrowLeft",
          when: "canvasFocus",
          args: ["x", -10],
        },
        {
          key: "Ctrl+ArrowLeft",
          when: "canvasFocus",
          args: ["x", -100],
        },
      ],
      title: "Move shape",
    },
  ];
}
