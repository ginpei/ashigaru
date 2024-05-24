import { Dispatch, SetStateAction } from "react";
import { Action } from "../../../domains/action/Action";
import { ShaperPageState, selectShape } from "../page/ShaperPageState";
import { moveShape } from "../page/sateFunctions/move";
import { ShapeData } from "../shape/ShapeData";
import { addShape, removeShape } from "../shape/shapeStateFunctions";

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
      patterns: [
        {
          key: "Ctrl+A",
          when: "focus:canvas",
        },
      ],
      title: "Select all shapes",
    },
    {
      exec(ids: string[], type: "single" | "append") {
        setState((state) => selectShape(state, ids, type));
      },
      id: "selectShape",
      patterns: [],
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
      patterns: [
        {
          key: "ArrowUp",
          when: "focus:canvas",
          args: ["y", -1],
        },
        {
          key: "Shift+ArrowUp",
          when: "focus:canvas",
          args: ["y", -10],
        },
        {
          key: "Ctrl+ArrowUp",
          when: "focus:canvas",
          args: ["y", -100],
        },
        {
          key: "ArrowRight",
          when: "focus:canvas",
          args: ["x", 1],
        },
        {
          key: "Shift+ArrowRight",
          when: "focus:canvas",
          args: ["x", 10],
        },
        {
          key: "Ctrl+ArrowRight",
          when: "focus:canvas",
          args: ["x", 100],
        },
        {
          key: "ArrowDown",
          when: "focus:canvas",
          args: ["y", 1],
        },
        {
          key: "Shift+ArrowDown",
          when: "focus:canvas",
          args: ["y", 10],
        },
        {
          key: "Ctrl+ArrowDown",
          when: "focus:canvas",
          args: ["y", 100],
        },
        {
          key: "ArrowLeft",
          when: "focus:canvas",
          args: ["x", -1],
        },
        {
          key: "Shift+ArrowLeft",
          when: "focus:canvas",
          args: ["x", -10],
        },
        {
          key: "Ctrl+ArrowLeft",
          when: "focus:canvas",
          args: ["x", -100],
        },
      ],
      title: "Move shape",
    },
    {
      exec() {
        setState((state) => ({ ...state, shortcutListDialogOpen: true }));
      },
      id: "showShortcutList",
      patterns: [
        {
          key: "?",
        },
      ],
      title: "Show shortcut list",
    },
    {
      exec(shape?: ShapeData) {
        const newShape = shape ?? {
          color: "#000000",
          height: 100,
          id: crypto.randomUUID(),
          left: 0,
          name: "New shape",
          top: 0,
          width: 100,
        };
        setState((state) => addShape(state, newShape));
      },
      id: "addShape",
      patterns: [
        {
          key: "Alt+N",
        },
      ],
      title: "Add new shape",
    },
    {
      exec(shapeIds = state.selectedShapeIds) {
        setState((state) => removeShape(state, shapeIds));
      },
      id: "removeShape",
      patterns: [
        {
          key: "Delete",
          // when: "selectionNotEmpty",
        },
        {
          key: "Backspace",
        },
      ],
      title: "Remove new shape",
    },
  ];
}
