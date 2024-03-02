import { ShapeData } from "../shape/ShapeData";

export interface ShaperPageState {
  shapes: ShapeData[];
  selectedShapeIds: string[];
}

export function selectShape(
  state: ShaperPageState,
  ids: string[],
  type: "single" | "append",
): ShaperPageState {
  const selected = state.selectedShapeIds.includes(ids[0]);
  const append = type === "append";
  let selectedShapeIds: typeof state.selectedShapeIds = [];
  if (append) {
    if (selected) {
      // remove
      selectedShapeIds = state.selectedShapeIds.filter((i) => i !== ids[0]);
    } else {
      // add
      selectedShapeIds = [...state.selectedShapeIds, ids[0]];
    }
  } else {
    // select single
    selectedShapeIds = [ids[0]];
  }

  return { ...state, selectedShapeIds };
}
